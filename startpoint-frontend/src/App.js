// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import your components
import Home from "./Home";
import Departments from "./Departments";
import DocumentsManager from "./DocumentsManager";
import TitleManager from "./TitleManager";
import UserManager from "./UserManager";
import CohortManager from "./CohortManager";
import OpportunityManager from "./OpportunityManager";
import OpportunityTypes from "./OpportunityTypes";
import OpportunityUser from "./OpportunityUser";
import CompensationTypeManager from "./CompensationTypeManager";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/documents">Documents</Link>
          <Link to="/titles">Titles</Link>
          <Link to="/users">Users</Link>
          <Link to="/cohorts">Cohorts</Link>
          <Link to="/opportunities">Opportunities</Link>
          <Link to="/opportunity-types">Opportunity Types</Link>
          <Link to="/opportunity-users">Opportunity Users</Link>
          <Link to="/compensation-types">Compensation Types</Link>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/documents" element={<DocumentsManager/>} />
            <Route path="/titles" element={<TitleManager />} />
            <Route path="/users" element={<UserManager />} />
            <Route path="/cohorts" element={<CohortManager />} />
            <Route path="/opportunities" element={<OpportunityManager />} />
            <Route path="/opportunity-types" element={<OpportunityTypes />} />
            <Route path="/opportunity-users" element={<OpportunityUser/>} />
            <Route path="/compensation-types" element={<CompensationTypeManager />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
