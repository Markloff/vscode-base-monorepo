import React from 'react'
import { Route, Router } from 'react-router-dom';
import { CacheSwitch } from '@tencent/qmfe-react-cache-router';

const A: React.FC = () => {
	return (
		<h4>a</h4>
	)
}

const B: React.FC = () => {
	return (
		<h4>b</h4>
	)
}
const C: React.FC = () => {
	return (
		<h4>c</h4>
	)
}
const Home: React.FC = () => {
    return (
        <div style={{width: '500px', height: '500px', overflow: 'auto'}}>
			home
			<CacheSwitch>
				<Route exact path="/" render={() => <A />} />
				<Route exact path="/b" render={() => <B />} />
				<Route exact path="/c" render={() => <C />} />
			</CacheSwitch>
        </div>
    );
}

export default Home;
