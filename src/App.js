import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Container from "react-bootstrap/Container";
import Test from "./pages/test.page";
import UserProvider from "./contexts/userProvider";
import ListOverwievProvider from "./contexts/listOverview.provider";
import CustomThemeProvider from "./contexts/themeProvider";
import Header from "./components/Header";
import Overview from "./components/overview/Overview";
import ListDetail from "./components/listDetail/ListDetail";

export default function App() {
  return (
    <Container fluid className="App" style={{ height: "100vh" }}>
      {" "}
      <BrowserRouter>
        <CustomThemeProvider>
          <UserProvider>
            <ListOverwievProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Test />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="listDetail/:listId" element={<ListDetail />} />
                  <Route path="/test" element={<Test />} />
                </Routes>
            </ListOverwievProvider>
          </UserProvider>
        </CustomThemeProvider>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
}
