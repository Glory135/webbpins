import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./admin/pages/create/Create";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Login from "./admin/pages/login/Login";
import Header from "./admin/components/header/Header";
import AdminProfile from "./admin/pages/adminProfile/AdminProfile";
import Categories from "./admin/pages/categories/Categories";
import Register from "./admin/pages/register/Register";
import PageNotFound from "./admin/pages/404/PageNotFound";

function Admin({ isAdmin, setIsAdmin }) {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [template, setTemplate] = useState({});
  const [templateEditMode, setTemplateEditMode] = useState(false);

  return (
    <>
      <Header setIsAdmin={setIsAdmin} />
      <Routes>
        <Route path='/' element={<Login setAdmin={setAdmin} />} exact />
        <Route
          path='/admin/register'
          element={
            <Register
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path='/admin/dashboard'
          element={
            <Dashboard
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
              setTemplate={setTemplate}
              setTemplateEditMode={setTemplateEditMode}
            />
          }
        />
        <Route
          path='/admin/create'
          element={
            <Create
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
              template={template}
              templateEditMode={templateEditMode}
              setTemplateEditMode={setTemplateEditMode}
            />
          }
        />
        <Route
          path='/admin/profile'
          element={
            <AdminProfile
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
            />
          }
        />
        <Route
          path='/admin/cats'
          element={
            <Categories
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
            />
          }
        />

        <Route
          path='*'
          element={
            <PageNotFound
              admin={admin}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              token={token}
              setToken={setToken}
            />
          }
        />
      </Routes>
    </>
  );
}

export default Admin;
