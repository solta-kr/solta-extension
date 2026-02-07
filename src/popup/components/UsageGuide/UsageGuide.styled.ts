import styled from 'styled-components';

export const Container = styled.div`
	background: ${({ theme }) => theme.colors.bgSecondary};
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius.md};
	padding: 16px;
`;

export const Title = styled.h3`
	margin: 0 0 14px;
	font-size: 13px;
	font-weight: 600;
	color: ${({ theme }) => theme.colors.primary};
	text-transform: uppercase;
	letter-spacing: 0.8px;
`;

export const Steps = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const Step = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
`;

export const StepNumber = styled.div<{ $color: string }>`
	width: 22px;
	height: 22px;
	border-radius: 50%;
	background: ${({ $color }) => `${$color}1a`};
	color: ${({ $color }) => $color};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 11px;
	font-weight: 700;
	flex-shrink: 0;
	margin-top: 1px;
`;

export const StepText = styled.div`
	font-size: 13px;
	color: ${({ theme }) => theme.colors.textSecondary};
	line-height: 1.5;
`;

export const Highlight = styled.span`
	color: ${({ theme }) => theme.colors.text};
	font-weight: 500;
`;
