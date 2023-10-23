# Reflection on Clean Code

## Chapter 2: Meaningful Names

Chapter 2 in Clean Code, "Meaningful Names", brings up the importance of proper naming. That goes for variables, classes, function etc. Many of the principles in this chapter are ones i already were practicing, to some extent. To "Use Intetion-Revealing Names" and "Use Searchable Names" is two of them although reflecting on them make me realize just how important these concepts can be. Both for readability and understandability. Other are ones i've never really thought about before but have in mind now. To "Use Pronounceable Names" in an example here since i many times used wierd and hard to pronounce abbrevitions as names in order to keep them short. In this project (and going forward) i've tried to work with all of the concepts in this chapter in mind since i more or less agree with them all. 

```
    #setListsToLocalStorage() {
        window.localStorage.setItem('expenseList', JSON.stringify(this.expenseList))
        window.localStorage.setItem('budgetList', JSON.stringify(this.budgetList))
    }
```

## Chapter 3: Functions

Chapter 3 in Clean Code, "Functions", press on the importance of writing functions in a readable and straight-forward way. This specific chapter presents alot of interesting principles, which i agree with to varying extent. I do, personally, find all of the principles interesting and useful to keep in mind. The authors of the book however, tend to go a bit overboard in this chapter in my opinion. An example is to keep funktions "Small!". My opinion is that this is something to opt for when sensible, but not something to strive for. To split up functions into smaller ones can for example increase the read- and understandability, but it can also do the opposite. I think it's important to keep in mind that the code should be readable and understandable, and that splitting up functions into smaller ones is one way to achieve that. But it's not the only way, and it's not always the best way. 

Working on this project i've kept the principles in mind and tried to align my code with thme as much as possible. I have tried to be sensible about it though. To have small functions, that does one thing, with one level of abstraction

## Chapter 4: Comments

Chapter 4 really got me thinking. I've never thought much about comments, nor the quality of them, but sure have used them alot. A whole lot. Reviewing previous project show that they are riddled with "Nosiy", "Misleading" over all low quality comments. Not to mention the huge amount of "Mumbling" comments and so on. Working with this project i've really tried to take this chapter to heart. To first and foremost write qualitative code and in that way dont't need comments. When comments have been needed i've tried to refactor the code in order to not need them anyway. When this have failed (seldom actually have) i've tried to write comments that are as qualitative as possible.

## Chapter 5: Formatting

Chapter 5 brings alot of concepts that i'm familiar- and work with. That is not to say i'm mastering any of them. The principles "Vertical Distance", "Vertical Openness" and "Horzontal Density" are all ones i believe i implement in my code and have a good grasp of. That goes for the "Indentation" principle aswell. 
The "Vertical Distance" on the other hand is one i'm not as familiar with, even though the concept is makes a lot of sense. It also turned out to be harder to work with than i first thought. "Conceptual Affinity" and "Vertical Ordering" seems easy to work with in theory, but turned out to be quite the challenge. With this in regard i believe i've managed fairly well, but the code can get out of hand fast and it's easy to make a real mess of the "Vertical Distance". That is especially true when working with methods that call other methods.

## Chapter 6: Objects and Data Structures



## Chapter 7: Error Handling

Keeping error handling manageable has allways been a challenge for me. It's very easy to get lost in error handling and end up with a tangly mess of code. I have worked with several of the principles in this chapter in mind, altough i do believe i already did that prior to some extent. To provide "Context with exceptions" is a must and do save a whole lot of trouble in the long run. The same goes for "Use Exceptions Rather Than Return Codes" and "Write Your Try-Catch-Finally Statement First" to name a few.
Several of the concepts in this chapter feels more applyable to other programming languages than javascript though. "Use Unchecked Exceptions" is an example.

## Chapter 8: Boundaries

Chapter 8 "Exploring and Learning Boundaries" present an interesting, and for me new, way of working with third party code. Using external code has almost allways been a hassle for me. Just to get started can be very time consuming and the documentation only give half the answers on a good day. The idea of using "Learning Tests" seems to me like a really useful tool. Mostly for the future tests in order to use later versions with the learning aspect as a plus. It's not something i've utilized in this project, since the "third party code" is by myself and i know it well. Would this been a bigger project however, with more people involved, i certainly would have tried it out. 
The principles in "Using Code That Does Not Yet Exist" is also interesting but the core concepts are not as new and wrappers for third party interfaces is something i've worked with before, just as in this project. That is not to say i find it easy, or do a very good job. 

## Chapter 9: Unit Tests

Chapter 9 was rather hard to penetrate for me. My experience of testing is limited and unit tests even more so. The chapter is an interesting read but i do believe i need to work further with unit tests in order to fully grasp the concepts.
As i have worked with manual testing in this project alot of the principles in this chapter is not applicable. I have tried to keep the test "Clean and Readable" though, and "One Concept per Test" is something i've tried to keep in mind.

## Chapter 10: Classes

Chapter 10 discuss concepts that has been a part of past courses, or atleast touched upon. It is however challengeing to live up to when programming. That goes for most of the principles discussed in "Encapsulation", "Organizing for Change" and Organizing for Change" but things easily get messy none the less when trying to "just get things to work". 
To keep classes "Small" and "Single Responsibility" is a question of balance in my opinion and i believe this book have a stricter view than what previous teachers have had. If a class is small or not is relative and so is the responsibility of a class. A class can handle several responsibilities on one abstraction level but still have one "reason to change". 

## Chapter 11: Systems

