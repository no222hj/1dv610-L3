import { SimpleCharts } from '../../../external/1dv610-L2/src/js/simpleCharts/simple-charts.js'

export class ChartsHandler {

    #simpleCharts

    #pieChart

    #barChart

    constructor (dataSet) {
        console.log(dataSet)
        this.#simpleCharts = new SimpleCharts(this.#formatDataForSimpleCharts(dataSet))
        this.#pieChart = this.#simpleCharts.plotPieChart()
        this.#barChart = this.#simpleCharts.plotBarChart()
    }

    #formatDataForSimpleCharts(dataSet) {
        const formatedData = []
        dataSet.forEach(element => {
            formatedData.push({ argument: element.category, value: element.amount, color: element.color })
        })
        return formatedData
    }

    getPieChart() {
        return this.#pieChart
    }

    getBarChart() {
        return this.#barChart
    }

}
