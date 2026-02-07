import styled, { css } from 'styled-components';

export const Display = styled.span<{ $running: boolean }>`
	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
		'Liberation Mono', 'Courier New', monospace;
	font-weight: 600;
	background: #f6f8fa;
	border: 1px solid #d0d7de;
	padding: 4px 10px;
	border-radius: 6px;
	color: #57606a;
	font-size: 13px;
	letter-spacing: 0.5px;

	${({ $running }) =>
		$running &&
		css`
			color: #24292f;
			border-color: #c9d1d9;
			background: #ffffff;
		`}
`;
