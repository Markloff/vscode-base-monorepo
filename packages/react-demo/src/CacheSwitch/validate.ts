import React, { CElement } from 'react';
import { match, OmitNative, RouteProps } from 'react-router';

export function isRouteElement<T extends {} = {}, Path extends string = string>(node: React.ReactNode): node is React.CElement<RouteProps<Path> & OmitNative<T, keyof RouteProps> & {
	computedMatch: match;
}, any> {
	if (!React.isValidElement(node)) {
		return null;
	}
	return (node as CElement<RouteProps<Path> & OmitNative<T, keyof RouteProps>, any>).type.name === 'Route';
}
