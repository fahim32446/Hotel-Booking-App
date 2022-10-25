import React, { useContext } from 'react'
import Home from '../src/pages/home/Home'
import Login from '../src/pages/login/Login'
import List from '../src/pages/list/List'
import New from '../src/pages/new/New'
import SinglePage from '../src/pages/single/Single'
import Sidebar from './components/sidebar/Sidebar'
import { hotelColumns, roomColumns, userColumns } from './datatablesource'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import { userInputs, hotelInputs } from './formSource'
import { AuthContext } from './context/AuthContext'
import NewHotel from './pages/newHotel/newHotel'
import NewRoom from './pages/newRoom/newRoom'

const App = () => {


  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>} />
          <Route path="login" element={<Login />} />


          <Route path="users">
            <Route index element={
              <ProtectedRoute>
                <List columns={userColumns} />
              </ProtectedRoute>
            } />
            <Route path=":userId" element={
              <ProtectedRoute>
                <SinglePage />
              </ProtectedRoute>
            } />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>


          <Route path="hotels">
            <Route index element={
              <ProtectedRoute>
                <List columns={hotelColumns} />
              </ProtectedRoute>
            } />

            <Route path=":hotelId" element={
              <ProtectedRoute>
                <SinglePage />
              </ProtectedRoute>
            } />

            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              }
            />
          </Route>


          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":roomId"
              element={
                <ProtectedRoute>
                   <SinglePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
          </Route>







        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App