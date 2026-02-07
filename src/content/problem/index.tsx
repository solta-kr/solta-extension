import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyleSheetManager } from 'styled-components';
import { theme } from '../../shared/styles/theme';
import App from './App';

function getProblemId(): string | null {
	const match = location.pathname.match(/\/problem\/(\d+)/);
	return match?.[1] ?? null;
}

function getProblemTitle(): string {
	return document.querySelector('#problem_title')?.textContent?.trim() ?? '';
}

function mount() {
	const header = document.querySelector('.page-header h1');
	if (!header || header.querySelector('#bjst-shadow-host')) return;

	const problemId = getProblemId();
	if (!problemId) return;
	const title = getProblemTitle();

	// Create shadow DOM host
	const host = document.createElement('span');
	host.id = 'bjst-shadow-host';
	host.style.marginLeft = '8px';
	header.appendChild(host);

	const shadow = host.attachShadow({ mode: 'open' });
	const mountPoint = document.createElement('span');
	shadow.appendChild(mountPoint);

	ReactDOM.createRoot(mountPoint).render(
		<React.StrictMode>
			<StyleSheetManager target={shadow as unknown as HTMLElement}>
				<ThemeProvider theme={theme}>
					<App problemId={problemId} title={title} />
				</ThemeProvider>
			</StyleSheetManager>
		</React.StrictMode>,
	);
}

// Observe for dynamic page loads
const observer = new MutationObserver(() => mount());
observer.observe(document.documentElement, { childList: true, subtree: true });
mount();
