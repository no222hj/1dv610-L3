import { StatisticsHandler } from "./statistics-handler.js"

export class BudgetTracker {

    #expenseList

    #budgetList

    #statisticsHandler

    constructor() {

        this.#expenseList = this.#retrieveFromLocalStorage('expenseList')
        this.#budgetList = this.#retrieveFromLocalStorage('budgetList')
        this.#statisticsHandler = new StatisticsHandler()

        this.#setUpExpenseCard()
        this.#setUpBudgetCard()
        this.#generateSummaryCharts()
        this.#setUpBalanceCard()
    }

    getExpenseList() {
        return this.#expenseList
    }

    getBudgetList() {
        return this.#budgetList
    }

    #getTypeOfList(listType) {
        if (listType === 'expense') {
            return this.#expenseList
        } else if (listType === 'budget') {
            return this.#budgetList
        } else {
            throw new Error('BudgetTracker: listType must be either "expense" or "budget"')
        }
    }

    #retrieveFromLocalStorage(key) {
        return window.localStorage.getItem(`${key}`) ? JSON.parse(window.localStorage.getItem(`${key}`)) : {}
    }

    #setUpExpenseCard() {
        this.#setUpModal('expense')
        this.#setUpList('expense')
    }

    #setUpBudgetCard() {
        this.#setUpModal('budget')
        this.#setUpList('budget')
    }

    #setUpModal(cardType) {
        this.#setUpAddItemButton(cardType)
        this.#setUpModalCard(cardType)
    }

    #setUpAddItemButton(cardType) {
        const addListItemButton = document.getElementById(`${cardType}ModalAddButton`)
        addListItemButton.addEventListener('click', (event) => {
            const addItemFormModal = new bootstrap.Modal(document.getElementById(`${cardType}AddModal`))
            addItemFormModal.show()
        })
    }

    #setUpModalCard(cardType) {
        const modalContainer = document.getElementById(`${cardType}ModalContainer`)
        console.log(modalContainer)
        const addItemForm = modalContainer.querySelector('.addItemForm')
        modalContainer.querySelector('.addItemModal').addEventListener('hidden.bs.modal', () => {
            const addItemForm = modalContainer.querySelector('.addItemForm')
            addItemForm.reset()
        })
        modalContainer.querySelector('.addItemForm').addEventListener('submit', (event) => {
            event.preventDefault()
            const inputAmount = addItemForm.querySelector('.modalAmountInput').value
            const inputCategory = addItemForm.querySelector('.modalCategoryInput').value
            modalContainer.querySelector('.closeModalButton').click()
            this.#addListingItem(inputAmount, inputCategory, cardType)
        })
    }


    #setUpList(cardType) {
        const listObject = this.#getTypeOfList(cardType)
        const listContainer = document.getElementById(`${cardType}List`)

        for (const key in listObject) {
            if (Object.hasOwnProperty.call(listObject, key)) {
                const listItem = listObject[key];
                listContainer.appendChild(this.#createListElement(listItem, cardType))
            }
        }
    }

    #createListElement(listItem, cardType) {
        const tableRow = document.createElement('tr')
        tableRow.setAttribute('id', `${cardType}-item-${listItem.category}`)
        tableRow.style.backgroundColor = listItem.color
        const tableDataCategory = document.createElement('td')
        tableDataCategory.style.color = listItem.color
        tableDataCategory.style.fontWeight = 'bold'
        tableDataCategory.textContent = listItem.category
        const tableDataAmount = document.createElement('td')
        tableDataAmount.textContent = listItem.amount
        const TableDataDelete = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'me2')

        deleteButton.addEventListener('click', () => {
            this.#deleteListing(listItem.category, cardType)
        }, { once: true }
        )

        TableDataDelete.appendChild(deleteButton)
        tableRow.appendChild(tableDataCategory)
        tableRow.appendChild(tableDataAmount)
        tableRow.appendChild(TableDataDelete)
        return tableRow
    }

    #addListingItem(amount, category, listType) {
        const list = this.#getTypeOfList(listType)

        if (category in list) {
            list[category].amount += parseInt(amount)
        } else {
            list[category] = {
                category: category,
                amount: parseInt(amount),
                color: this.#setCategoryColor(category)
            }
        }

        this.#updateListings()
    }

    #deleteListing(category, cardType) {
        const listToRemoveFrom = this.#getTypeOfList(cardType)
        delete listToRemoveFrom[category]

        this.#updateListings()
    }

    #setCategoryColor(category) {
        if (category in this.#expenseList) {
            return this.#expenseList[category].color
        } else if (category in this.#budgetList) {
            return this.#budgetList[category].color
        } else {
            return this.#generateRandomColor()
        }
    }

    #generateRandomColor() {
        let color = '#';
        while (color.length < 7 || color === '#000000') {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
        return color
    }

    #updateListings() {
        this.#setListsToLocalStorage()
        this.#clearListingCard('expense')
        this.#clearListingCard('budget')
        this.#clearBalanceCard()
        this.#setUpList('expense')
        this.#setUpList('budget')
        this.#setUpBalanceCard()
        this.#generateSummaryCharts()
    }

    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.#expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.#budgetList))
    }

    #clearListingCard(cardType) {
        const listingContainer = document.getElementById(`${cardType}List`)
        const expenseSummaryContainer = document.getElementById(`${cardType}SummaryContainer`)
        listingContainer.innerHTML = ''
        expenseSummaryContainer.innerHTML = ''
    }

    #generateSummaryCharts() {

        const expenseDoughnut = this.#setUpSummaryChart(this.getExpenseList())
        document.getElementById('expenseSummaryContainer').prepend(expenseDoughnut)

        const budgetDoughnut = this.#setUpSummaryChart(this.getBudgetList())
        document.getElementById('budgetSummaryContainer').prepend(budgetDoughnut)

        console.log(this.#budgetList)
    }

    #setUpSummaryChart(list) {
        try {
            return this.#statisticsHandler.generateDoughnutCategoryChart(list)
        } catch (error) {
            if (error.message === 'SimpleCharts: dataset requires at least two datapoints') {
                const element = document.createElement('p')
                element.classList.add('text-muted')
                element.textContent = 'Add two or more items to see a summary'
                return element
            }
        }
    }

    #setUpBalanceCard () {
        const balance = this.#calculateBalance()
        const balanceNumber = document.getElementById('balanceCard')

        balanceNumber.textContent = `${balance} kr`
        balanceNumber.className = balance >= 0 ? 'text-success' : 'text-danger'
        const budgetColor = 
        balanceNumber.classList.add('fw-bold')
        balanceNumber.classList.add('fs-1')

        const balanceList = {}

        balanceList.expense = {
            category: 'Expense',
            amount: this.#calculateTotalAmount(this.#expenseList),
            color: '#DF2E38'   
        }

        balanceList.budget = {
            category: 'Budget',
            amount: this.#calculateTotalAmount(this.#budgetList),
            color: '#5D9C59'
        }

        const balanceDoughnut = this.#statisticsHandler.generatePieBalanceChart(balanceList)
        document.getElementById('balanceCard').appendChild(balanceDoughnut)
    
    }

    #clearBalanceCard () {
        const balanceNumber = document.getElementById('balanceCard')
        balanceNumber.textContent = ''
        balanceNumber.className = ''
    }

    #calculateBalance () {
        let balance = 0
        for (const key in this.#expenseList) {
            if (Object.hasOwnProperty.call(this.#expenseList, key)) {
                const element = this.#expenseList[key];
                balance -= element.amount
            }
        }
        for (const key in this.#budgetList) {
            if (Object.hasOwnProperty.call(this.#budgetList, key)) {
                const element = this.#budgetList[key];
                balance += element.amount
            }
        }

        return balance
    }

    #calculateTotalAmount (list) {
        let totalAmount = 0
        for (const key in list) {
            if (Object.hasOwnProperty.call(list, key)) {
                const element = list[key];
                totalAmount += element.amount
            }
        }
        return totalAmount
    }
}
