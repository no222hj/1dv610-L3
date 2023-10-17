import { SimpleCharts } from '../../external/1dv610-L2/src/js/simpleCharts/simple-charts.js'
import { BudgetTracker } from './classes/budget-tracker.js'

const div = document.getElementById('edit-container')

const data = [
    { argument: 'one', value: 2, color: '#219C90' },
    { argument: 'two', value: 4, color: '#EFC958' },
    { argument: 'three', value: 6, color: '#F26B38' }
]
const chart = new SimpleCharts(data)

const svg = chart.plotPieChart()

div.appendChild(svg)

const budgetTracker = new BudgetTracker()

