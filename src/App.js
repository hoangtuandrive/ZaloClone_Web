import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "././routes";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <Router>
      <div className="App">
        <AppProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </AppProvider>
      </div>
    </Router>
  );
}
export default App;
