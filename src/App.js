import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegistrationForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <UserRegistrationForm />
      <UserList />
    </>
  );
}

export default App;
