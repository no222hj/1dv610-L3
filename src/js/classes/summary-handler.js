import { ChartsHandler } from "./charts-handler.js"

export class SummaryHandler {


    constructor (expenseList, budgetList) {
        this.expenseList = expenseList
        this.budgetList = budgetList
    }


    generatePieChartTotalBudgetVsExpense() {
        const totalBudget = this.#getTotalBudget()
        const totalExpense = this.#getTotalExpense()
        const data = [
            { category: 'Expense', amount: totalExpense, color: '#219C90' },
            { category: 'Budget', amount: totalBudget, color: '#EFC958' }
        ]
        const chartsHandler = new ChartsHandler(data)

        return chartsHandler.getPieChart()
    }

    #formatDataForSimpleCharts(data) {
        const formatedData = []
        data.forEach(element => {
            formatedData.push({ argument: element.category, value: element.amount, color: element.color })
        })
        return formatedData
    }

    #getTotalBudget() {
        let totalBudget = 0
        for (const key in this.budgetList) {
            if (Object.hasOwnProperty.call(this.budgetList, key)) {
                const element = this.budgetList[key];
                totalBudget += element.amount
            }
        }
        return totalBudget
    }

    #getTotalExpense() {
        let totalExpense = 0
        for (const key in this.expenseList) {
            if (Object.hasOwnProperty.call(this.expenseList, key)) {
                const element = this.expenseList[key];
                totalExpense += element.amount
            }
        }
        return totalExpense
    }

}