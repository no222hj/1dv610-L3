import { SimpleCharts } from '../../../node_modules/simpleCharts/src/js/simpleCharts/simple-charts.js'

export class ChartsHandler {

    #simpleCharts

    #pieChart

    #barChart

    #doughnutChart

    constructor (dataSet) {
        this.#simpleCharts = new SimpleCharts(this.#formatDataForSimpleCharts(dataSet))
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

    #formatDataForSimpleCharts(data) {
        const formatedData = []
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const object = data[key];
                formatedData.push({ argument: object.category, value: object.amount, color: object.color })
            }
    }
    return formatedData
    }

}
