import React from 'react';

const AdministrativeConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		},
		theme: {
			main: 'mainThemeDark',
			navbar: 'mainThemeDark',
			toolbar: 'mainThemeDark',
			footer: 'mainThemeDark'
		}
	},
	routes: [
		{
			path: '/administrative',
			component: React.lazy(() => import('./listUploads/Administrative'))
		}
	]
};

export default AdministrativeConfig;
