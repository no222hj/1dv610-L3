# Reflection on Clean Code

## Chapter 2: Meaningful Names

Chapter 2 in Clean Code, "Meaningful Names", brings up the importance of proper naming. That goes for variables, classes, function etc. Many of the principles in this chapter are ones i already were practicing, to some extent. To "Use Intetion-Revealing Names" and "Use Searchable Names" is two of them although reflecting on them make me realize just how important these concepts can be. Both for readability and understandability. Other are ones i've never really thought about before but have in mind now. To "Use Pronounceable Names" in an example here since i many times used wierd and hard to pronounce abbrevitions as names in order to keep them short. In this project (and going forward) i've tried to work with all of the concepts in this chapter in mind since i more or less agree with them all. 

#### Examples from this project

In this example the name "setListsToLocalStorage" is intention-revealing and searchable. It's also pronounceable and easy to understand. That is instead of just naming it setLocalStorage as i would have in the past.

```
    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.budgetList))
    }
```

## Chapter 3: Functions

Chapter 3 in Clean Code, "Functions", press on the importance of writing functions in a readable and straight-forward way. This specific chapter presents alot of interesting principles, which i agree with to varying extent. I do, personally, find all of the principles interesting and useful to keep in mind. The authors of the book however, tend to go a bit overboard in this chapter in my opinion. An example is to keep funktions "Small!". My opinion is that this is something to opt for when sensible, but not something to strive for. To split up functions into smaller ones can for example increase the read- and understandability, but it can also do the opposite. I think it's important to keep in mind that the code should be readable and understandable, and that splitting up functions into smaller ones is one way to achieve that. But it's not the only way, and it's not always the best way. 

Working on this project i've kept the principles in mind and tried to align my code with them as much as possible. I have tried to be sensible about it though. To have small functions, that does one thing, with one level of abstraction.

#### Examples from this project

The example code show a method that call two other. The method is small and does one thing, considering the abstraction level. There is also only one level of abstraction. The two following methods is of lower abstraction level but still maintain the one level each. One could aruge that #setUpModalCard() should be split up further, and perhaps it should. My thought though is that it's small enough to be readable and dividing further might only decrease the understandability.

```
    #setUpModal(cardType) {
        this.#setUpAddItemButton(cardType)
        this.#setUpModalCard(cardType)
    }

    #setUpAddItemButton(cardType) {
        const addListItemButton = document.getElementById(`${cardType}ModalAddButton`)
        addListItemButton.addEventListener('click', (event) => {
            const addItemFormModal = new bootstrap.Modal(document.getElementById(`${cardType}AddModal`))
            addItemFormModal.show()
        })
    }

    #setUpModalCard(cardType) {
        const modalContainer = document.getElementById(`${cardType}ModalContainer`)
        const addItemForm = modalContainer.querySelector('.addItemForm')
        modalContainer.querySelector('.addItemModal').addEventListener('hidden.bs.modal', () => {
            const addItemForm = modalContainer.querySelector('.addItemForm')
            addItemForm.reset()
        })
        modalContainer.querySelector('.addItemForm').addEventListener('submit', (event) => {
            event.preventDefault()
            const inputAmount = addItemForm.querySelector('.modalAmountInput').value
            const inputCategory = addItemForm.querySelector('.modalCategoryInput').value
            modalContainer.querySelector('.closeModalButton').click()
            this.#addListingItem(inputAmount, inputCategory, cardType)
        })
    }
```

## Chapter 4: Comments

Chapter 4 really got me thinking. I've never thought much about comments, nor the quality of them, but sure have used them alot. A whole lot. Reviewing previous project show that they are riddled with "Nosiy", "Misleading" over all low quality comments. Not to mention the huge amount of "Mumbling" comments and so on. Working with this project i've really tried to take this chapter to heart. To first and foremost write qualitative code and in that way dont't need comments. When comments have been needed i've tried to refactor the code in order to not need them anyway. When this have failed (seldom actually have) i've tried to write comments that are as qualitative as possible.

#### Examples from this project



```
    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.budgetList))
    }
```

## Chapter 5: Formatting

Chapter 5 brings alot of concepts that i'm familiar- and work with. That is not to say i'm mastering any of them. The principles "Vertical Distance", "Vertical Openness" and "Horzontal Density" are all ones i believe i implement in my code and have a good grasp of. That goes for the "Indentation" principle aswell. 
The "Vertical Distance" on the other hand is one i'm not as familiar with, even though the concept is makes a lot of sense. It also turned out to be harder to work with than i first thought. "Conceptual Affinity" and "Vertical Ordering" seems easy to work with in theory, but turned out to be quite the challenge. With this in regard i believe i've managed fairly well, but the code can get out of hand fast and it's easy to make a real mess of the "Vertical Distance". That is especially true when working with methods that call other methods.

#### Examples from this project

In this example i've tried to keep the "Vertical Distance" in mind. The method "generateDoughnutCategoryChart(list)" calls four other methods which in turn are placed in the same order as they are called. This way the code is easier to read and understand. Note that this in an example where i feel like i got it "right". In other parts of the code, the inplementation of "vertical distance" were not as obvious.

```
    generateDoughnutCategoryChart(list) {
        const expenseDoughnut = this.#generateDoughnutChart(list)
        const middleText = this.#getTotalAmount(list)
        this.#setUpChartToScaleParent(expenseDoughnut)
        this.#setUpDoughNutMiddleText(expenseDoughnut, middleText)

        return expenseDoughnut
    }

    #generateDoughnutChart(list) {
        const chartsHandler = new ChartsHandler(list)
        const doughnutChart = chartsHandler.getDougnutChart()
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
```

## Chapter 6: Objects and Data Structures

Chapter 6 was a bit confusing at first, until i realized that "Object" in this context refered to the object in "Object Oriented Programming" and not the type "Object". The principles and terminology are to me new, but the core concepts are, for the most part, not. I have for example never before heard about "The Law of Demeter" but i have very seldom not followed said law. 

#### Examples from this project

The example show code from the class StatisticsHandler. The class do adhere to "The Law of Demeter" even though it imports another class, since the class is instantiated and used in the same method. The class implementation is also hidden behind abstraction and use of private methods. 

```
import { ChartsInterface } from "./charts-interface.js"

export class StatisticsHandler {

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
```

## Chapter 7: Error Handling

Keeping error handling manageable has allways been a challenge for me. It's very easy to get lost in error handling and end up with a tangly mess of code. I have worked with several of the principles in this chapter in mind, altough i do believe i already did that prior to some extent. To provide "Context with exceptions" is a must and do save a whole lot of trouble in the long run. The same goes for "Use Exceptions Rather Than Return Codes" and "Write Your Try-Catch-Finally Statement First" to name a few.
Several of the concepts in this chapter feels more applyable to other programming languages than javascript though. "Use Unchecked Exceptions" is an example.

#### Examples from this project

The example show a method with validation as error handling. Exceptions are used and custom error messages to go along for context. The error handling could (and perhaps should) be broken out into a seperate method though.

```
  #setChartData(chartData) {      

    if (chartData === undefined) {
      throw new Error("SimpleCharts: no dataset")
    }
    if (!Array.isArray(chartData)) {
        throw new Error("SimpleCharts: dataset formatting error")
    }
    if (Object.keys(chartData).length < 2) {
      throw new Error("SimpleCharts: dataset requires at least two datapoints")
    }

    chartData.forEach(element => {
      if (!/^(?!0$)\d+(\.\d+)?$/.test(element.value)) {
        throw new Error("SimpleCharts: datapoint value required and has to be a positive number")
      }
      if (typeof element.argument !== "string") {
        throw new Error("SimpleCharts: datapoint argument required and has to be a string")
      }
      if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(element.color)) {
        throw new Error("SimpleCharts: datapoint color required and has to be a string in hex color format")
      }
    })
    this.#setPercentage(chartData)
    this.chartData = chartData
  }
```

## Chapter 8: Boundaries

Chapter 8 "Exploring and Learning Boundaries" present an interesting, and for me new, way of working with third party code. Using external code has almost allways been a hassle for me. Just to get started can be very time consuming and the documentation only give half the answers on a good day. The idea of using "Learning Tests" seems to me like a really useful tool. Mostly for the future tests in order to use later versions with the learning aspect as a plus. It's not something i've utilized in this project, since the "third party code" is by myself and i know it well. Would this been a bigger project however, with more people involved, i certainly would have tried it out. 
The principles in "Using Code That Does Not Yet Exist" is also interesting but the core concepts are not as new and wrappers for third party interfaces is something i've worked with before, just as in this project. That is not to say i find it easy, or do a very good job. 

#### Examples from this project

The example code show a class from the project used as an interface to the "external" code (my own module SimpleCharts). The class take in data from the project and format it to fit the SimpleCharts module. This way the external code can be replaced with other and the only code that needs to be changed is this interface.

```
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
```

## Chapter 9: Unit Tests

Chapter 9 was rather hard to penetrate for me. My experience of testing is limited and unit tests even more so. The chapter is an interesting read but i do believe i need to work further with unit tests in order to fully grasp the concepts.
As i have worked with manual testing in this project alot of the principles in this chapter is not applicable. I have tried to keep the test "Clean and Readable" though, and "One Concept per Test" is something i've tried to keep in mind.

## Chapter 10: Classes

Chapter 10 discuss concepts that has been a part of past courses, or atleast touched upon. It is however challengeing to live up to when programming. That goes for most of the principles discussed in "Encapsulation", "Organizing for Change" and Organizing for Change" but things easily get messy none the less when trying to "just get things to work". 
To keep classes "Small" and "Single Responsibility" is a question of balance in my opinion and i believe this book have a stricter view than what previous teachers have had. If a class is small or not is relative and so is the responsibility of a class. A class can handle several responsibilities on one abstraction level but still have one "reason to change". 

#### Examples from this project

The example code show a class from the project used as an bridge between two other classes. I have tried to keep it small and with one responsibility. The cohesion could be viewed upon as high. Of course though it could be smaller, split up further and the cohesion could be even higher. The "main" class however is far bigger, with higher cohesion and more responsibilities. 

```
import { ChartsHandler } from "./charts-interface.js"

export class StatisticsHandler {

    generateDoughnutCategoryChart(list) {
        const expenseDoughnut = this.#generateDoughnutChart(list)
        const middleText = this.#getTotalAmount(list)
        this.#setUpChartToScaleParent(expenseDoughnut)
        this.#setUpDoughNutMiddleText(expenseDoughnut, middleText)

        return expenseDoughnut
    }

    #generateDoughnutChart(list) {
        const chartsHandler = new ChartsHandler(list)
        const doughnutChart = chartsHandler.getDougnutChart()
        return doughnutChart
    }

    #setUpChartToScaleParent(chart) {
        chart.setAttribute('width', '100%')
        chart.setAttribute('viewBox', '0 0 400 400')
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

}
```

## Chapter 11: Systems

Just like chapter 9, the principles in this one is harder to grasp. This might have to do with the fact that there is no lecture rearding this, and many of the terms are Java-related (a language im not as comfortable with as Javascript). Architecure is also somthing i personally find hard to work with and often end upp with a poorly structured one, when scaling up a project. 

#### Examples from this project

The example is from the class BudgetTracker and show how the Class StatisticsHandler is instantiated already in the constructor, to later be used at runtime. This can be viewed as an example of not using "Lazy Initialization" discussed in "Separate Constructing a System from Using It". 

```
    constructor() {

        this.#expenseList = this.#retrieveFromLocalStorage('expenseList')
        this.#budgetList = this.#retrieveFromLocalStorage('budgetList')
        this.#statisticsHandler = new StatisticsHandler()

        this.#setUpExpenseCard()
        this.#setUpBudgetCard()
        this.#generateSummaryCharts()
        this.#setUpBalanceCard()
    }
```