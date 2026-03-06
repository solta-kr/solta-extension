import styled, { css } from 'styled-components';

type ButtonVariant = 'start' | 'pause' | 'resume' | 'reset';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
	start: css`
		border-color: #1a7f37;
		color: #1a7f37;
		background: #f0fff4;

		&:hover {
			background: #dcfce7;
			border-color: #15803d;
		}
	`,
	pause: css`
		border-color: #e5534b;
		color: #e5534b;
		background: #fff5f5;

		&:hover {
			background: #ffebe9;
			border-color: #d1242f;
		}
	`,
	resume: css`
		border-color: #1a7f37;
		color: #1a7f37;
		background: #f0fff4;

		&:hover {
			background: #dcfce7;
			border-color: #15803d;
		}
	`,
	reset: css`
		border-color: #d0d7de;
		color: #57606a;
		background: #ffffff;
		padding: 5px 8px;

		&:hover {
			background: #f6f8fa;
			border-color: #c9d1d9;
			color: #24292f;
		}
	`,
};

export const Button = styled.button<{ $variant: ButtonVariant }>`
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

	${({ $variant }) => variantStyles[$variant]}
`;
