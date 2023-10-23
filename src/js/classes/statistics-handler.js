import { ChartsHandler } from "./charts-interface.js"

export class StatisticsHandler {


    constructor(expenseList, budgetList) {
        this.expenseList = expenseList
        this.budgetList = budgetList
        this.totalExpense = this.#getTotalExpense()
        this.totalBudget = this.#getTotalBudget()
    }

    generateExpenseDoughnutChart() {
        const expenseDoughnut = this.generateDoughnutChart(this.expenseList)
        const middleText = this.totalExpense
        this.setUpChartToScaleParent(expenseDoughnut)
        this.setUpDoughNutMiddleText(expenseDoughnut, middleText)

        return expenseDoughnut
    }

    generateBudgetDoughnutChart() {
        const budgetDoughnut = this.generateDoughnutChart(this.budgetList)
        const middleText = this.totalBudget
        this.setUpChartToScaleParent(budgetDoughnut)
        this.setUpDoughNutMiddleText(budgetDoughnut, middleText)

        return budgetDoughnut
    }

    generateDoughnutChart(data) {
        const chartsHandler = new ChartsHandler(data)
        const doughnutChart = chartsHandler.getDougnutChart()
        return doughnutChart
    }

    setUpChartToScaleParent(chart) {
        chart.setAttribute('width', '100%')
        chart.setAttribute('viewBox', '0 0 400 400')
    }

    setUpDoughNutMiddleText(doughnutChart, middleText) {
        const doughnutChartText = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        doughnutChartText.setAttribute('x', '50%')
        doughnutChartText.setAttribute('y', '50%')
        doughnutChartText.setAttribute('text-anchor', 'middle')
        doughnutChartText.setAttribute('dominant-baseline', 'middle')
        doughnutChartText.setAttribute('font-size', '25px')
        doughnutChartText.setAttribute('lengthAdjust', 'spacingAndGlyphs')
        doughnutChartText.textContent = `${middleText} kr`
        doughnutChart.appendChild(doughnutChartText)
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