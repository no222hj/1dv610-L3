import { ChartsHandler } from "./charts-handler.js"
import { SummaryHandler } from "./summary-handler.js"

export class BudgetTracker {

    #budgetData

    constructor (budgetData) {

        this.expenseList = [
            {
                category: "Food",
                amount: 200,
                color: "#ff0000",
                id: 0
            },
            {
                category: "Rent",
                amount: 300,
                color: "#00ff00",
                id: 1
            },
            {
                category: "Transportation",
                amount: 100,
                color: "#0000ff",
                id: 2
            },
            {
                category: "Entertainment",
                amount: 100,
                color: "#ffff00",
                id: 3
            },
            {
                category: "Other",
                amount: 100,
                color: "#00ffff",
                id: 4
            }
        ]

        this.budgetList = [
            {
                category: "Food",
                amount: 1000,
                color: "#ff0000"
            },
            {
                category: "Other",
                amount: 100,
                color: "#00ff00"
            }
        ]
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
        const expenseContainer = document.getElementById('expenseList')
        this.expenseList.forEach(element => {
            const tableRow = document.createElement('tr')
            tableRow.setAttribute('id', `expense-item-${element.id}`)
            tableRow.style.backgroundColor = element.color
            const tableDataCategory = document.createElement('td')
            tableDataCategory.textContent = element.category
            const tableDataAmount = document.createElement('td')
            tableDataAmount.textContent = element.amount
            const TableDataDelete = document.createElement('td')
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete'
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'me2')
            deleteButton.addEventListener('click', () => {
                this.deleteExpense(element)
            }
            )
            TableDataDelete.appendChild(deleteButton)
            tableRow.appendChild(tableDataCategory)
            tableRow.appendChild(tableDataAmount)
            tableRow.appendChild(TableDataDelete)
            expenseContainer.appendChild(tableRow)
        })

        const addCategoryExpenseButton = document.getElementById('addCategoryExpenseButton')
        addCategoryExpenseButton.addEventListener('click', () => {
            document.getElementById('categoryExpenseField').classList.remove('d-none')
        })

        const addExpenseButton = document.getElementById('addExpenseButton')
        addExpenseButton.addEventListener('click', () => {
            this.addExpense()
        })
    }

    deleteExpense(expense) {
        delete this.expenseList[expense.id]
        const expenseItem = document.getElementById(`expense-item-${expense.id}`)
        expenseItem.remove()

        console.log(this.expenseList)
    }



}
