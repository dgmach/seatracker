import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import HomeConfig from 'app/main/home/HomeConfig';
import AdministrativeConfig from 'app/main/administrative/AdministrativeConfig';

const routeConfigs = [HomeConfig, AdministrativeConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/administrative" />
	}
];

export default routes;
