import styled, { css } from 'styled-components';

export const Button = styled.button<{ $running: boolean }>`
	appearance: none;
	border: 1px solid #d0d7de;
	border-radius: 6px;
	padding: 5px 12px;
	font-weight: 600;
	cursor: pointer;
	background: #ffffff;
	color: #24292f;
	font-size: 13px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	transition: all 0.15s ease;
	white-space: nowrap;

	&:hover {
		background: #f6f8fa;
		border-color: #c9d1d9;
	}

	&:active {
		background: #eef1f4;
	}

	${({ $running }) =>
		$running &&
		css`
			border-color: #e5534b;
			color: #e5534b;
			background: #fff5f5;

			&:hover {
				background: #ffebe9;
				border-color: #d1242f;
			}
		`}
`;
