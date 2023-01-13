import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteWrapper } from './components';
import { DashboardBulletin } from './pages/Dashboard/DashboardBulletin';
import { NewAssessment } from './pages/Assessments/NewAssessment.jsx';
import { AssessmentList } from './pages/Assessments/AssessmentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NewUser } from './pages/User/NewUser';
import { Login } from './pages/Login/Login';

const router = createBrowserRouter([
  {
    element: <DashboardBulletin />,
    path: `/`,
  },
  {
    element: <Login />,
    path: `/login`,
  },
  {
    element: <NewAssessment />,
    path: `/assessment/new`,
  },
  {
    element: <AssessmentList />,
    path: `/assessment/list`,
  },
  {
    element: <NewUser />,
    path: `/user/new`,
  },
]);

function setToken(userToken) {
  sessionStorage.setItem(`token`, JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem(`token`);
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

// const token = getToken();
const token = `true`;

const App = () => token === `true` ?
  <SiteWrapper>
    <RouterProvider
      router={router}
    />
  </SiteWrapper> :
  <Login />;

export default App;
