[![Build Status](https://travis-ci.com/SisDee/Vending-Machine.svg?branch=main)](https://travis-ci.com/SisDee/Vending-Machine)

# Vending-Machine
This is Web application implementation of a vending machine that vends products based upon four (4) denominations of coins and returns coins if there is no item.

**The Web application is required to perform the following functionalities:

•When the application loads, it loads data about all the instances from the products and Coins and visualizes this data in some way. (e.g. A table with all the data). •The application must have some mechanism for refreshing all the data from the API without having to reload the entire application (e.g. A refresh data button). •The application must have some mechanism for refreshing the data of only a section (products or coins). •The application should show the user some indication that it is refreshing/loading new data.

Functional Requirements:

    The database should have a functional audit trail and be represented in a form of a table.
    The screen should be able to show print on-screen data of the coins and products rendered by the vending machine.
    The screen should have a functionality mechanism that allows the data to be updated constantly when required.
    It should be a single-page application.

Non-Functional Requirements:

    The interface of the Web Application should be easy to navigate through.
    The outputs should be mathematically reliable.
    Shows a great amount of data integrity and usability.

Software Framework Description:

AngularJS AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. AngularJS's data binding and dependency injection eliminate much of the code you would otherwise have to write. It's easier to work with and has interface templates available to help save on time on the front-end coding.

Programming languages used: Javascript Python

High-Level Architectural Descriptions The type of software Architecture used is the** Model-View-Controller** (MVC) ,is an architectural pattern that separates an application into three main logical components: the model, the view, and the controller. Each of these components are built to handle specific development aspects of an application. MVC is one of the most frequently used industry-standard web development framework to create scalable and extensible projects.

MVC Components

Following are the components of MVC − Model View Controller

Model The Model component corresponds to all the data-related logic that the user works with. This can represent either the data that is being transferred between the View and Controller components or any other business logic-related data. For example, a Customer object will retrieve the customer information from the database, manipulate it and update it data back to the database or use it to render data.

View The View component is used for all the UI logic of the application. For example, the Customer view will include all the UI components such as text boxes, dropdowns, etc. that the final user interacts with.

Controller Controllers act as an interface between Model and View components to process all the business logic and incoming requests, manipulate data using the Model component and interact with the Views to render the final output. For example, the Customer controller will handle all the interactions and inputs from the Customer View and update the database using the Customer Model. The same controller will be used to view the Customer data.
