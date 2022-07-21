import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'

//Screens
import RegisterUi from './Screens/RegisterUi'
import Registration from './Screens/Registration'
import RegistrationII from './Screens/RegistrationII'
import Otp from './Screens/Otp'
import Login from './Screens/Login'
import RegisterSuccess from './Screens/RegisterSuccess'
import LoginDashboard from './Screens/LoginDashboard'
import FormValidation from './RnD/FormValidation'

// layouts
import DefaultLayout from './layouts/DeafultLayout'
import AuthLayout from './layouts/AuthLayout'
import AuthHOC from './layouts/AuthHOC'

const routes = [
  {
    path: '/register',
    layout: DefaultLayout,
    exact: true,
    component: Registration,
  },

  {
    path: '/register-ii',
    layout: DefaultLayout,
    exact: true,
    component: RegistrationII,
  },
  // {
  //   path: '/rnd',
  //   layout: DefaultLayout,
  //   exact: true,
  //   component: FormValidation,
  // },
  {
    path: '/dashboard/qr',
    layout: AuthLayout,
    exact: true,
    component: AuthHOC(LoginDashboard),
  },
  {
    path: '/dashboard',
    layout: AuthLayout,
    exact: true,
    component: AuthHOC(LoginDashboard),
  },
  // {
  //   path: '/register-success',
  //   layout: DefaultLayout,
  //   exact: true,
  //   component: RegisterSuccess,
  // },
  {
    path: '/qr',
    layout: DefaultLayout,
    exact: true,
    component: Login,
  },
  {
    path: '/login',
    layout: DefaultLayout,
    exact: true,
    component: Login,
  },
  {
    path: '/login/otp/qr',
    layout: DefaultLayout,
    exact: true,
    component: Otp,
  },
  {
    path: '/login/otp',
    layout: DefaultLayout,
    exact: true,
    component: Otp,
  },
  {
    path: '/',
    layout: DefaultLayout,
    exact: true,
    component: RegisterUi,
  },
  {
    layout: DefaultLayout,
    component: RegisterUi,
  },
]

const RouterSwitch = ({ location }) => (
  <Switch>
    {routes.map((route) => {
      return (
        <Route
          key={location.pathname}
          exact={route.exact}
          path={route.path}
          component={route.layout(route.component)}
        />
      )
    })}
  </Switch>
)

export default withRouter(RouterSwitch)
