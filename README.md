## Contact Manager Web App

## 🚀 Live Demo

Visit Here: https://contactformsuhani.netlify.app

## 📌 Overview

This is a responsive and user-friendly Contact Management Web App built using React. It allows users to:

Add new contacts

View a list of contacts

Edit existing contacts

Delete contacts

Search through contacts

All contact data is stored locally in the browser using localStorage.

## 🛠️ Tech Stack Used

React.js – Component-based UI framework

Tailwind CSS – Utility-first CSS framework for styling

react-hook-form – Lightweight form validation and management

lucide-react – Icon library for intuitive UI actions (edit, delete)

uuid – To generate unique IDs for each contact

localStorage – For persistent storage of contact records

## 📽️ Features Demonstrated in the Video

1. Create a Record

Click on Add Contact

Fill the form and hit Save Contact

The contact will be added to the list

2. Display a Record

Contacts are shown in card format with name, email, phone, and address

3. Update a Record

Click the ✏️ Edit icon on any contact card

The form appears with existing values filled in

Edit values and click Update Contact

4. Delete a Record

Click the 🗑️ Delete icon to remove a contact

5. Search Functionality

Type in the search bar to filter contacts by name

## 🎯 Why This Stack?

React provides modular UI components with fast rendering

Tailwind makes it easy to design clean, modern UIs without writing custom CSS

react-hook-form is lightweight and makes form validation seamless

lucide-react offers elegant, modern icons for UI actions

localStorage ensures the data remains persistent across sessions without backend

⚠️ Challenges Faced

Editing vs Creating: Maintaining different states for add and edit was tricky. Solved using a conditional initialValues prop and reset() method from react-hook-form.

Form Reset on Cancel/Edit: Ensured form values reset on new entry or edit mode.

Persistent Storage: Used useEffect to sync contact state with localStorage reliably.

## ✅ How to Use Locally

Clone the repository

Run npm install

Run npm start

Open http://localhost:3000 in your browser
