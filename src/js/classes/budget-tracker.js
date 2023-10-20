import { ChartsHandler } from "./charts-handler.js"
import { SummaryHandler } from "./summary-handler.js"

export class BudgetTracker {

    #budgetData

    constructor (budgetData) {

        this.expenseList = {
            Food: {
                category: "Food",
                amount: 1000,
                color: "#ff0000"
            },
            Other: {
                category: "Other",
                amount: 100,
                color: "#00ff00"
            }
        }

        this.budgetList = {
            Food: {
                category: "Food",
                amount: 1000,
                color: "#ff0000"
            },
            Other: {
                category: "Other",
                amount: 100,
                color: "#00ff00"
            }
        }
        //this.budgetData = this.#setBudgetData()
        this.generateSummaryCharts()
        this.setUpExpense()
    }

    #setUpCategories() {
        this.generateSummary()
        this.setUpExpense()
        this.setUpBudget()
    }

    #setBudgetData() {

    }

    generateSummaryCharts() {
        const summaryHandler = new SummaryHandler(this.expenseList, this.budgetList)
        const totalBudgetVsExpensePieChart = summaryHandler.generatePieChartTotalBudgetVsExpense()
        console.log(totalBudgetVsExpensePieChart)
        document.getElementById('pieChartExpenseVersusBudget').appendChild(totalBudgetVsExpensePieChart)
    }

    setUpExpense() {

        const addExpenseModalButton = document.getElementById('addExpenseModalButton')
        this.setUpExpenseModal()
        addExpenseModalButton.addEventListener('click', (event) => {
        const expenseModal = new bootstrap.Modal(document.getElementById('addExpenseModal'))
        expenseModal.show()
        })

        for (const key in this.expenseList) {
            if (Object.hasOwnProperty.call(this.expenseList, key)) {
                const object = this.expenseList[key];
                this.createExpenseListing(object)
            }
        }
    }

    createExpenseListing(expense) {
        const expenseContainer = document.getElementById('expenseList')
            const tableRow = document.createElement('tr')
            tableRow.setAttribute('id', `expense-item-${expense.category}`)
            tableRow.style.backgroundColor = expense.color
            const tableDataCategory = document.createElement('td')
            tableDataCategory.textContent = expense.category
            const tableDataAmount = document.createElement('td')
            tableDataAmount.textContent = expense.amount
            const TableDataDelete = document.createElement('td')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'me2')
            deleteButton.addEventListener('click', () => {
                this.deleteExpense(expense.category)
            }, { once: true}
            )
            TableDataDelete.appendChild(deleteButton)
            tableRow.appendChild(tableDataCategory)
            tableRow.appendChild(tableDataAmount)
            tableRow.appendChild(TableDataDelete)
            expenseContainer.appendChild(tableRow)
    }

    setUpExpenseModal() {
        const expenseModal = document.getElementById('addExpenseModal')
        expenseModal.addEventListener('hidden.bs.modal', () => {
            const form = document.getElementById('addExpenseForm')
            form.reset()
        })

        const addCategoryExpenseButton = document.getElementById('expenseModalAddCategoryButton')
        addCategoryExpenseButton.addEventListener('click', () => {
            document.getElementById('categoryExpenseField').classList.remove('d-none')
        })

        const addExpenseButton = document.getElementById('addExpenseForm')
        addExpenseButton.addEventListener('submit', (event) => {
            event.preventDefault()
            const amount = document.getElementById('expenseModalAmountInput').value
            const category = document.getElementById('expenseModalCategoryInput').value
            console.log(expenseModal)
            expenseModal.hide()
            this.addExpense(amount, category)
        }, { once: true})
    }

    deleteExpense(expense) {
        
        delete this.expenseList[expense]

        const expenseItem = document.getElementById(`expense-item-${expense}`)
        expenseItem.remove()
    }

    addExpense(amount, category) {

        console.log(typeof amount)
        if (category in this.expenseList) {
            this.expenseList[category].amount += parseInt(amount)
        } else {
            this.expenseList[category] = {
                category: category,
                amount: parseInt(amount),
                color: "#ff0000"
            }
        }

        this.#updateListings()
    }


    setUpBudget() {

        for (const key in this.budgetList) {
            if (Object.hasOwnProperty.call(this.budgetList, key)) {
                const object = this.budgetList[key];
                this.createBudgetListing(object)
            }
        }
    }

    createBudgetListing(budget) {
        const budgetContainer = document.getElementById('budgetList')
        const tableRow = document.createElement('tr')
        tableRow.setAttribute('id', `budget-item-${budget.category}`)
        tableRow.style.backgroundColor = budget.color
        const tableDataCategory = document.createElement('td')
        tableDataCategory.textContent = budget.category
        const tableDataAmount = document.createElement('td')
        tableDataAmount.textContent = budget.amount
        const TableDataDelete = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'me2')
        deleteButton.addEventListener('click', () => {
            this.deleteBudgetCategory(budget)
        }
        )
        TableDataDelete.appendChild(deleteButton)
        tableRow.appendChild(tableDataCategory)
        tableRow.appendChild(tableDataAmount)
        tableRow.appendChild(TableDataDelete)
        budgetContainer.appendChild(tableRow)

    const addCategoryExpenseButton = document.getElementById('addCategoryExpenseButton')
    addCategoryExpenseButton.addEventListener('click', () => {
        document.getElementById('categoryExpenseField').classList.remove('d-none')
    })

    const addExpenseButton = document.getElementById('addBudgetButton')
    addExpenseButton.addEventListener('click', () => {
        this.addExpense()
    })
    }

    #updateListings() {
        const expenseContainer = document.getElementById('expenseList')
        expenseContainer.innerHTML = ''
        this.setUpExpense()
    }


}
