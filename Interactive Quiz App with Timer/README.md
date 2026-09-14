# React Quiz App

A simple and interactive quiz application built with **React** and **Tailwind CSS**. The app presents multiple-choice questions with a countdown timer, tracks the user's score, provides instant answer feedback, and displays a complete results review at the end.

## ✨ Features

* Multiple-choice quiz questions
* **12-second countdown timer** for each question
* Automatic progression when the timer runs out
* Instant feedback for correct and incorrect answers
* Real-time score tracking
* Detailed results after completing the quiz
* Review of user's answers and correct answers
* Percentage score calculation
* **Try Again** option to restart the quiz
* Circular countdown timer with visual state changes
* Responsive and clean user interface

## 🛠️ Technologies Used

* React
* JavaScript
* Tailwind CSS
* React Hooks

  * `useState`
  * `useEffect`
* SVG for the circular timer

## 🧠 React Concepts Practiced

This project was built as a practice project to strengthen core React concepts, including:

* Managing component state with `useState`
* Handling side effects with `useEffect`
* Creating reusable components
* Conditional rendering
* Event handling
* Working with arrays and objects
* Dynamic class names
* Timer and interval management
* State-based UI updates

## ⚙️ How It Works

Each question has four possible answers. The user has **12 seconds** to select an answer.

When an option is selected:

1. The selected answer is recorded.
2. The answer is checked against the correct answer.
3. The score is updated if the answer is correct.
4. Visual feedback is displayed.
5. The app automatically moves to the next question.

If the timer reaches zero, the question is recorded as unanswered and the quiz automatically continues.

After the final question, the app displays:

* Total score
* Percentage of correct answers
* User's answer for each question
* Correct answer when the user's answer was incorrect or unanswered

The user can then restart the quiz using the **Try Again** button.

## 📂 Project Structure

```text
src/
├── App.jsx
└── ...
```

The main quiz logic and the circular timer component are handled within the application.

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Navigate to the project directory:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local development URL provided by Vite.

## 📸 Preview

Add a screenshot or GIF of the application here.

```text
![React Quiz App](./screenshots/quiz-app.png)
```

## 🎯 Purpose

This project was created as a **React practice project** to improve understanding of state management, effects, conditional rendering, event handling, and timer-based interactions.

## 📌 Future Improvements

Possible future enhancements include:

* Add more quiz questions
* Load questions from an API
* Add different quiz categories
* Add difficulty levels
* Add a progress indicator
* Add a high-score system
* Store results using LocalStorage
* Add animations and transitions

## 📄 License

This project is open source and available for learning and personal use.
