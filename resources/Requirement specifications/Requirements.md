# BudgetTracker App: Requirement Specification


## Introduction


### Intention


The intention of this document is to describe the requirements of the BudgetTracker app. The document will describe the purpose of the app, the features, the usage and the development of the app.


### Purpose


The purpose of the BudgetTracker is to provide a tool to keep track of your budget. The app will calculate and display the total budget and expenses, along with a balance. The app will display useful information both as text and charts.


### Scope


BudgetTracker is a simple budgeting tool. It will feature budget creation, expense creation, balance calculation and charts. The focus here is to be a simple solution to budgeting.


## Functional requirements


### 1. Budget


#### 1.1. Budget view.


##### 1.1.1. Budget view card.


- The app should display a card with the title "Budget".
- With less than two, the app should prompt the user to add a budget category.
- With two or more budget categories, users should be able to view the total budget amount.
- With two or more budget categories, a doughnut chart should be displayed.
- A list of budget categories should be displayed with amounts, colors and a delete category option.
- A add budget category button should be displayed.


#### 1.2. Add budget category.


##### 1.2.1. Add budget category modal.


- Users should be able to add budget categories.
- This should be done through a modal.
- The modal should have an input field for amount.
- The input field should only accept numbers.
- The modal should have an input field for category name.
- The modal should have a "Add" button, adding the new category.
- The modal should have a "Close" button, closing the modal.
- The modal should have a title "Add budget".


##### 1.2.1. Add new budget category.


- Users should be able to add budget categories along with an amount.
- This should add the category and amount to the list of categories.
- This should generate a random color for the category.
- This should update the total budget amount.
- This should update all applicable charts.


#### 1.2.2. Add existing budget category amount.


- Users should be able to add an amount to an existing budget category.
- This should update the amount of the category in the list of categories.
- This should update the total budget amount.
- This should update the balance amount.
- This should update all applicable charts.


#### 1.2.3. Add new budget category, that already exists as an expense category.


- Users should be able to add a budget category that already exists as an expense category.
- This should add the category and amount to the list of categories.
- This should generate the same color as the expense category.
- This should update the total budget amount.
- This should update the balance amount.
- This should update all applicable charts.


#### 1.3. Remove budget category.


##### 1.3.1. Remove budget category.


- Users should be able to remove budget categories.
- This should remove the category and amount from the list of categories.
- This should update the total budget amount.
- This should update the balance amount.
- This should update all applicable charts.


### 2. Expenses


#### 2.1. Expense view.


##### 2.1.1. Expense view card.


- The app should display a card with the title "Expenses".
- With less than two, the app should prompt the user to add an expense category.
- With two or more expense categories, users should be able to view the total expense amount.
- With two or more expense categories, a doughnut chart should be displayed.
- A list of expense categories should be displayed with amounts, colors and a delete category option.
- A add expense category button should be displayed.


#### 2.2. Add expense category.


#### 2.2.1. Add new expense category.


- Users should be able to add expense categories along with a amount.
- This should add the category and amount to the list of categories.
- This should generate a random color for the category.
- This should update the total expense amount.
- This should update the balance amount.
- This should update all applicable charts.


#### 2.2.2. Add existing expense category amount.


- Users should be able to add an amount to an existing expense category.
- This should update the amount of the category in the list of categories.
- This should update the total expense amount.
- This should update the balance amount.
- This should update all applicable charts.


#### 2.2.3. Add new expense category, that already exists as a budget category.


- Users should be able to add a expense category that already exists as a budget category.
- This should add the category and amount to the list of categories.
- This should generate the same color as the budget category.
- This should update the total expense amount.
- This should update the balance amount.
- This should update all applicable charts.


#### 2.3. Remove expense category.


##### 2.3.1. Remove expense category.


- Users should be able to remove expense categories.
- This should remove the category and amount from the list of categories.
- This should update the total expense amount.
- This should update the balance amount.
- This should update all applicable charts.


### 3 Balance


#### 3.1. Balance view.


##### 3.1.1. Balance view card.


- The app should display a card with the title "Balance".
- Users should be able to view the total balance amount.
- With both a budget and expense category, a pie chart should be displayed.
- The chart should display the total budget- and expense amounts.


## Non-functional requirements


### 2.1. Usability


#### 2.1.1. Intuitive


- The app should be intuitive to use.
- The app should be very easy to understand.
- The app should be easy to navigate.


### 2.2. Implementation


#### 2.2.1. Techniques


- The app should be built with HTML, CSS and JavaScript as the main languages.
- The app should be class based.
- The app should be built with Bootstrap as a CSS framework.
- The app should be built with SimpleCharts as a chart library.
- The app should be built with LocalStorage as a database.


