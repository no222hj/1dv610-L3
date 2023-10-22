import { SimpleCharts } from '../../../node_modules/simpleCharts/src/js/simpleCharts/simple-charts.js'

export class ChartsHandler {

    #simpleCharts

    #pieChart

    #barChart

    #doughnutChart

    constructor (dataSet) {
        this.#simpleCharts = new SimpleCharts(dataSet)
        this.#pieChart = this.#simpleCharts.plotPieChart()
        this.#barChart = this.#simpleCharts.plotBarChart()
        this.#doughnutChart = this.#simpleCharts.plotDoughnutChart()
    }

    getPieChart() {
        return this.#pieChart
    }

    getBarChart() {
        return this.#barChart
    }

    getDougnutChart() {
        return this.#doughnutChart
    }

    #formatDataForSimpleCharts(dataSet) {
        const formatedData = []
        dataSet.forEach(element => {
            formatedData.push({ argument: element.category, value: element.amount, color: element.color })
        })
        return formatedData
    }

}
