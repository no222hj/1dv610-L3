import { StatisticsHandler } from "./statistics-handler.js"

export class BudgetTracker {

    #expenseList 

    #budgetList

    #statisticsHandler

    constructor() {

        this.#expenseList = this.retrieveFromLocalStorage('expenseList')
        this.#budgetList = this.retrieveFromLocalStorage('budgetList')
        this.#statisticsHandler = new StatisticsHandler()

        this.generateSummaryCharts()

        this.setUpExpenseCard()
        this.setUpBudgetCard()
    }

    getExpenseList() {
        return this.#expenseList
    }

    getBudgetList() {
        return this.#budgetList
    }

    #getList(listType) {
        if (listType === 'expense') {
            return this.#expenseList
        } else if (listType === 'budget') {
            return this.#budgetList
        } else {
            throw new Error('BudgetTracker: listType must be either "expense" or "budget"')
        }
    }

    retrieveFromLocalStorage(key) {
        return window.localStorage.getItem(`${key}`) ? JSON.parse(window.localStorage.getItem(`${key}`)) : {}
    }

    generateSummaryCharts() {

        const expenseDoughnut = this.setUpExpenseSummary(this.getExpenseList())
        document.getElementById('expenseSummaryContainer').prepend(expenseDoughnut)

        const budgetDoughnut = this.setUpBudgetSummary(this.getBudgetList())
        document.getElementById('budgetSummaryContainer').prepend(budgetDoughnut)
    }

    setUpExpenseSummary() {
        try {
            return this.statisticsHandler.generateExpenseDoughnutChart()
        } catch (error) {
            if (error.message === 'SimpleCharts: dataset requires at least two datapoints') {
                const element = document.createElement('p')
                element.classList.add('text-muted')
                element.textContent = 'Add two or more expenses to see a summary'
                return element
            }
        }
    }

    setUpBudgetSummary() {
        try {
            return this.statisticsHandler.generateBudgetDoughnutChart()
        } catch (error) {
            if (error.message === 'SimpleCharts: dataset requires at least two datapoints') {
                const element = document.createElement('p')
                element.classList.add('text-muted')
                element.textContent = 'Add two or more budget items to see a summary'
                return element
            }
        }
    }

    setUpExpenseCard() {
        this.#setUpModal('expense')
        this.#setUpList('expense')
    }

    setUpBudgetCard() {
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
            this.addListingItem(inputAmount, inputCategory, cardType)
        })
    }
    

    #setUpList(cardType) {
        const listObject = this.#getList(cardType)
        const listContainer = document.getElementById(`${cardType}List`)

        for (const key in listObject) {
            if (Object.hasOwnProperty.call(listObject, key)) {
                const listItem = listObject[key];
                listContainer.appendChild(this.createListElement(listItem, cardType))
            }
        }
    }

    createListElement(listItem, cardType) {
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

    addListingItem(amount, category, listType) {
        const list = this.#getList(listType)

        if (category in list) {
            list[category].amount += parseInt(amount)
        } else {
            list[category] = {
                category: category,
                amount: parseInt(amount),
                color: this.setCategoryColor(category)
            }
        }

        this.#updateListings()
    }

    #deleteListing(category, cardType) {
        const listToRemoveFrom = this.#getList(cardType)
        delete listToRemoveFrom[category]

        this.#updateListings()
    }

    setCategoryColor(category) {
        if (category in this.expenseList) {
            return this.expenseList[category].color
        } else if (category in this.budgetList) {
            return this.budgetList[category].color
        } else {
            return this.generateRandomColorFromPallete()
        }
    }

    generateRandomColorFromPallete() {
        const colors = [
            '#219C90', '#1F9E87', '#1C9F7F', '#1AA177', '#17926F',
            '#148367', '#11745F', '#0E7557', '#0B7650', '#087748',
            '#E9B824', '#E9B128', '#EAAF2C', '#EAA830', '#EAAB34',
            '#EE9322', '#EE8E26', '#EE892A', '#EE8330', '#EE7D34',
            '#D83F31', '#D83B35', '#D73739', '#D7333D', '#D72F41'
        ]

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
        this.#setUpList('expense')
        this.#setUpList('budget')
        this.generateSummaryCharts()
    }
    

    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.budgetList))
    }

    #clearListingCard(cardType) {
        const listingContainer = document.getElementById(`${cardType}List`)
        const expenseSummaryContainer = document.getElementById(`${cardType}SummaryContainer`)
        listingContainer.innerHTML = ''
        expenseSummaryContainer.innerHTML = ''
    }

}
