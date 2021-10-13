import React from "react";
import { RouteConfig, Routes } from "./types";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";



const RouteWithSubRoute: React.FC<RouteConfig> = ({childRoutes, component: Component, path, exact}) => (
  <Route path={path} exact={exact || false} render={props => (
    <Component {...props}>
      {childRoutes && (
        <Switch>
          {childRoutes.map(childRoute => {
            const { path: subPath, component, name } = childRoute
            return <RouteWithSubRoute path={path+subPath} component={component} key={name} name={name} exact={childRoute.exact} />
          })}
        </Switch>
      )}
    </Component>
  )}/>
)

export const RouterView: React.FC<Routes> = (props) => {
  const { routes } = props
  let redirect: JSX.Element
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          if (!route.redirect) {
            return <RouteWithSubRoute {...route} key={index}/>
          }else {
            redirect = <Route path={route.path}><Redirect to={route.redirect} /></Route>
          }
        })}
        {redirect? redirect : null}
      </Switch>
    </Router>
  )
};
