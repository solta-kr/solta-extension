import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { theme } from '../../shared/styles/theme';
import App from './App';

function mount() {
	if (document.querySelector('#bjst-status-shadow-host')) return;

	// Create shadow DOM host on body for modal overlay
	const host = document.createElement('div');
	host.id = 'bjst-status-shadow-host';
	document.body.appendChild(host);

	const shadow = host.attachShadow({ mode: 'open' });
	const mountPoint = document.createElement('div');
	shadow.appendChild(mountPoint);

	ReactDOM.createRoot(mountPoint).render(
		<React.StrictMode>
			<StyleSheetManager target={shadow as unknown as HTMLElement}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</StyleSheetManager>
		</React.StrictMode>,
	);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', mount);
} else {
	mount();
}
