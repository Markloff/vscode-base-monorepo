import { Switch, matchPath, withRouter, RouteComponentProps } from 'react-router-dom';
import React from 'react';
import { isRouteElement } from './validate';


type Props = {
	which?: (node: React.ReactNode) => boolean;
}

class _CacheSwitch extends React.Component<RouteComponentProps & Props, any> {

	private _onceMatched = false;

	renderContent = () => {
		const { location, children } = this.props;

		return React.Children.map(children, element => {
			if (!isRouteElement(element)) {
				return null;
			}
			const path = element.props.path;
			const match = matchPath(
				location.pathname,
				{
					...element.props,
					path
				}
			);
			let child: React.ReactNode = null;
			if (match && !this._onceMatched) {
				child = React.cloneElement(element, {
					location,
					computedMatch: match
				})
			}
			this._onceMatched = !!match;
			return child;
		})
	}


	override render(): React.ReactNode {
		const { renderContent } = this;
		return (
			<>
				{renderContent()}
			</>
		);
	}

}


export default withRouter(_CacheSwitch);


