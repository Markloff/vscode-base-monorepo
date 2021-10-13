import {JSXElementConstructor, PropsWithChildren} from "react";

export type RouteConfig = {
  path: string,
  name?: string,
  redirect?: string,
  component?: JSXElementConstructor<PropsWithChildren<any>>,
  childRoutes?: RouteConfig[],
  exact?: boolean
}

export type Routes = {
  routes: RouteConfig[]
}

export type AsyncComponentState = {
  component: JSXElementConstructor<PropsWithChildren<any>>
}
