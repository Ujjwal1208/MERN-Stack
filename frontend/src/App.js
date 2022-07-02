import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MentorScreen from "./screens/MentorScreen";
import SubscribeScreen from "./screens/SubscribeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/mentor/:id" element={<MentorScreen />}></Route>
            <Route path="/cart">
              <Route path=":id" element={<SubscribeScreen />} />
              <Route path="" element={<SubscribeScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />} exact></Route>
            <Route path="/register" element={<RegisterScreen />} exact></Route>
            <Route path="/profile" element={<ProfileScreen />} exact></Route>
            <Route
              path="/admin/userlist"
              element={<UserListScreen />}
              exact
            ></Route>
            <Route
              path="/admin/user/:id/edit"
              element={<UserEditScreen />}
              exact
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
