import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RecordDetail from "./pages/RecordDetailPage";
import AddRecordForm from "./components/AddRecordForm";
import EditRecord from "./pages/EditRecord";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/records/:id" element={<RecordDetail />} />
          <Route path="/add" element={<AddRecordForm />} />
          <Route path="/records/:id/edit" element={<EditRecord />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
