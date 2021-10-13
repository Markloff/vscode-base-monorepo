import React, { Component, Fragment, ComponentType, ReactNode } from 'react';

export type CacheRouteProps = {
	component: ComponentType;
	children: ReactNode;
}


export class CacheRoute extends Component<CacheRouteProps, any> {

	constructor(props: CacheRouteProps) {
		super(props);

	}
}

