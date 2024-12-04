import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Test from "./pages/test.page";
import ListDetailProvider from "./contexts/listDetail.provider";
import UserProviderSimple from "./contexts/userProviderSimple";
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
          <UserProviderSimple>
            <ListOverwievProvider>
              <ListDetailProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Test />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="listDetail/:listId" element={<ListDetail />} />
                  <Route path="/test" element={<Test />} />
                </Routes>
              </ListDetailProvider>
            </ListOverwievProvider>
          </UserProviderSimple>
        </CustomThemeProvider>
      </BrowserRouter>
    </Container>
  );
}
