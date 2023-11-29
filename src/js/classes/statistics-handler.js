import { ChartsInterface } from "./charts-interface.js"

export class StatisticsHandler {

    generatePieBalanceChart(list) {

        const balancePie = this.#generatePieChart(list)
        this.#setUpChartToScaleParent(balancePie)

        return balancePie
    }

    #generatePieChart(list) {
        const chartsInterface = new ChartsInterface(list)
        const pieChart = chartsInterface.getPieChart()
        return pieChart
    }

    generateDoughnutCategoryChart(list) {
        const expenseDoughnut = this.#generateDoughnutChart(list)
        const middleText = this.#getTotalAmount(list)
        this.#setUpChartToScaleParent(expenseDoughnut)
        this.#setUpDoughNutMiddleText(expenseDoughnut, middleText)

        return expenseDoughnut
    }

    #generateDoughnutChart(list) {
        const chartsInterface = new ChartsInterface(list)
        const doughnutChart = chartsInterface.getDougnutChart()
        return doughnutChart
    }

    #setUpChartToScaleParent(chart) {
        chart.setAttribute('width', '100%')
        chart.setAttribute('viewBox', '0 0 400 400')
    }

    #getTotalAmount(list) {
        let totalAmount = 0
        for (const key in list) {
            if (Object.hasOwnProperty.call(list, key)) {
                const element = list[key];
                totalAmount += element.amount
            }
        }
        return totalAmount
    }

    #setUpDoughNutMiddleText(doughnutChart, middleText) {
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
}