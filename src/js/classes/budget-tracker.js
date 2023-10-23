import { ChartsHandler } from "./charts-handler.js"
import { SummaryHandler } from "./summary-handler.js"

export class BudgetTracker {

    #budgetData

    constructor(budgetData) {

        this.expenseList = this.retrieveFromLocalStorage('expenseList')
        this.budgetList = this.retrieveFromLocalStorage('budgetList')

        this.generateSummaryCharts()

        this.setUpExpenseCard()
        this.setUpBudgetCard()
    }

    retrieveFromLocalStorage(key) {
        return window.localStorage.getItem(`${key}`) ? JSON.parse(window.localStorage.getItem(`${key}`)) : {}
    }

    generateSummaryCharts() {
        this.summaryHandler = new SummaryHandler(this.expenseList, this.budgetList)
        //const totalBudgetVsExpensePieChart = summaryHandler.generatePieChartTotalBudgetVsExpense()
        //console.log(totalBudgetVsExpensePieChart)
        //document.getElementById('pieChartExpenseVersusBudget').appendChild(totalBudgetVsExpensePieChart)

        const expenseDoughnut = this.setUpExpenseSummary()
        document.getElementById('expenseSummaryContainer').prepend(expenseDoughnut)

        const budgetDoughnut = this.setUpBudgetSummary()
        document.getElementById('budgetSummaryContainer').prepend(budgetDoughnut)
    }

    setUpExpenseSummary() {
        try {
        return this.summaryHandler.generateExpenseDoughnutChart()
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
            return this.summaryHandler.generateBudgetDoughnutChart()
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
        const addExpenseModalButton = document.getElementById('addExpenseModalButton')
        const modalContainer = document.getElementById('expenseModalContainer')
        this.setUpModal(modalContainer)
        addExpenseModalButton.addEventListener('click', (event) => {
        const expenseModal = new bootstrap.Modal(document.getElementById('addExpenseModal'))
        expenseModal.show()
        })
        this.setUpListings(this.expenseList, 'expense')
    }

    setUpBudgetCard() {
        const addBudgetModalButton = document.getElementById('addBudgetModalButton')
        const modalContainer = document.getElementById('budgetModalContainer')
        this.setUpModal(modalContainer)
        addBudgetModalButton.addEventListener('click', (event) => {
        const budgetModal = new bootstrap.Modal(document.getElementById('addBudgetModal'))
        budgetModal.show()
        })
        this.setUpListings(this.budgetList, 'budget')
    }

    setUpListings(typeOfList, typeOfListing) {
        for (const key in typeOfList) {
            if (Object.hasOwnProperty.call(typeOfList, key)) {
                const object = typeOfList[key];
                this.createListElement(object, typeOfListing)
            }
        }
    }

    createListElement(object, typeOfListing) {
        const typeContainer = document.getElementById(`${typeOfListing}List`)
        const tableRow = document.createElement('tr')
        tableRow.setAttribute('id', `${typeOfListing}-item-${object.category}`)
        tableRow.style.backgroundColor = object.color
        const tableDataCategory = document.createElement('td')
        tableDataCategory.style.color = object.color
        tableDataCategory.style.fontWeight = 'bold'
        tableDataCategory.textContent = object.category
        const tableDataAmount = document.createElement('td')
        tableDataAmount.textContent = object.amount
        const TableDataDelete = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'me2')

        deleteButton.addEventListener('click', () => {
            this.deleteListing(object.category, typeOfListing)
        }, { once: true }
        )
        
        TableDataDelete.appendChild(deleteButton)
        tableRow.appendChild(tableDataCategory)
        tableRow.appendChild(tableDataAmount)
        tableRow.appendChild(TableDataDelete)
        typeContainer.appendChild(tableRow)
    }

    deleteListing(category, typeOfListing) {
        let listingParentObject = {}
        if (typeOfListing === 'expense') {
            listingParentObject = this.expenseList
        } else if (typeOfListing === 'budget') {
            listingParentObject = this.budgetList
        }
        this.deleteKeyFromObject(category, listingParentObject)
        this.#updateListings()
    }

    deleteKeyFromObject(key, object) {
        delete object[key]
    }

    setUpModal(modalContainer, typeOfListing) {
        const modal = modalContainer.querySelector('.addItemModal')
        const addItemForm = modalContainer.querySelector('.addItemForm')
        modal.addEventListener('hidden.bs.modal', () => {
            addItemForm.reset()
        })
        addItemForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const amount = addItemForm.querySelector('.modalAmountInput').value
            const category = addItemForm.querySelector('.modalCategoryInput').value
            modal.querySelector('.closeModalButton').click()
            this.addListingItem(amount, category)
        })
    }

    addListingItem(amount, category) {

        if (category in this.expenseList) {
            this.expenseList[category].amount += parseInt(amount)
        } else {
            this.expenseList[category] = {
                category: category,
                amount: parseInt(amount),
                color: this.setCategoryColor(category)
            }
        }

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
        this.setUpListings(this.expenseList, 'expense')
        this.setUpListings(this.budgetList, 'budget')
        this.generateSummaryCharts()
    }

    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.budgetList))
    }

    #clearListingCard(typeOfListing) {
        const listingContainer = document.getElementById(`${typeOfListing}List`)
        const expenseSummaryContainer = document.getElementById(`${typeOfListing}SummaryContainer`)
        listingContainer.innerHTML = ''
        expenseSummaryContainer.innerHTML = ''
    }

}
