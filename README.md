## Listify

**Listify** is a dynamic Todo List web application built with HTML, CSS, and JavaScript. The app allows users to manage their daily tasks effectively by adding, editing, and deleting todo items. It also includes user input validation, responsive design, and local storage to persist data.

## Features

- **Add Todo Items**: Users can input and add tasks to the todo list.
- **Edit Todo Items**: Users can edit existing tasks directly within the list.
- **Delete Todo Items**: Users can remove tasks they no longer need.
- **Responsive Design**: The layout adjusts based on the screen size, and the input limits change accordingly:
  - Small Screens (≤ 500px): Shorter input limits (12 for usernames, 25 for todos).
  - Medium Screens (> 500px and < 800px): Moderate input limits (15 for usernames, 30 for todos).
  - Large Screens (≥ 800px): Maximum input limits (20 for usernames, 57 for todos).
- **Local Storage**: Todo items and username are stored in local storage, ensuring the data is saved across page reloads.
- **Error Handling**: Alerts users if they try to:
  - Enter an empty todo item.
  - Exceed the character limits in username or todo fields.
- **Empty State Message**: When there are no todos, a message is displayed indicating the list is empty.

## How It Works

### User Interactions

- **Adding a Todo Item**: Users can type a task in the input box and click the "Add" button or press the Enter key to add it to the list. If the input is empty, an error message will be displayed.
- **Editing a Todo Item**: Clicking the edit button allows the user to modify the task. If the user tries to save an empty task, an error message will prompt them to enter a valid task.
- **Deleting a Todo Item**: Clicking the delete button removes the selected task from the list.
- **Clearing All Todos**: Users can clear all tasks at once by clicking the "Clear Todos" button.

### Input Validation and Error Handling

The app handles various input validation scenarios:

- **Maximum Character Limits**: The application enforces character limits based on screen size. If users exceed these limits, the input is truncated, and an error message is shown.
- **Empty Input Handling**: Users receive feedback if they attempt to submit an empty todo item.

### Responsive Design

The app dynamically adjusts the character limits based on the window width:

- **Small Screens (≤ 500px)**: Limits for username input (12 characters) and todo input (25 characters).
- **Medium Screens (> 500px and < 800px)**: Limits for username input (15 characters) and todo input (30 characters).
- **Large Screens (≥ 800px)**: Limits for username input (20 characters) and todo input (57 characters).

### Local Storage

- **Username Persistence**: The username input is stored and loaded from local storage.
- **Todo List Persistence**: The todo list items are stored and retrieved from local storage, allowing the list to persist even after page reloads.

### Overlay Error Message

An overlay with a message displays when users encounter input validation errors, with a close button to dismiss the message.

## How to Run the Project

1. Clone the repository or download the project files.
2. Open the `index.html` file in your web browser.

## Files

- `index.html`: Contains the structure of the application.
- `style.css`: Contains styles for the todo list and other components.
- `script.js`: Contains the main functionality, including event listeners, input validation, local storage management, and error handling.
