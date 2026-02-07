import styled, { css } from 'styled-components';

export const Container = styled.div<{ $type: 'success' | 'error' }>`
	margin-top: 16px;
	padding: 10px 14px;
	border-radius: ${({ theme }) => theme.borderRadius.sm};
	font-size: 13px;
	font-weight: 500;
	text-align: center;
	animation: slideDown 0.25s ease-out;

	${({ $type, theme }) =>
		$type === 'success'
			? css`
					background: rgba(76, 175, 80, 0.1);
					color: ${theme.colors.success};
					border: 1px solid rgba(76, 175, 80, 0.2);
				`
			: css`
					background: rgba(239, 83, 80, 0.1);
					color: ${theme.colors.error};
					border: 1px solid rgba(239, 83, 80, 0.2);
				`}
`;
