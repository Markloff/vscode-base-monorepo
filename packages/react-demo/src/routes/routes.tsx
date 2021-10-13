import {AsyncComponentState, RouteConfig} from "./types";
import React, {JSXElementConstructor} from "react";
import Home from '@/views/Home';
import About from '@/views/About';



const asyncComponent = (importComponent: () => Promise<{default: JSXElementConstructor<any>}>)  => {
  class AsyncComponent extends React.Component<any, AsyncComponentState> {
    constructor(props) {
      super(props);
      this.state = { component: null }
    }
    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({component})
    }
    render() {
      const { component: Component } = this.state
      return Component ? <Component {...this.props} /> : null;
    }
  }
  return AsyncComponent
}

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    component: Home,
    childRoutes: [
      {
        name: 'about',
        path: 'about',
        component: About,
        exact: true
      },
    ]
  }
]

export default routes
