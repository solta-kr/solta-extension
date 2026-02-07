import styled from 'styled-components';
import { useAuth } from './hooks/useAuth';
import LoginView from './components/LoginView/LoginView';
import UserInfo from './components/UserInfo/UserInfo';
import UsageGuide from './components/UsageGuide/UsageGuide';
import StatusMessage from './components/StatusMessage/StatusMessage';

const Wrapper = styled.div`
	padding: 20px;
	animation: fadeIn 0.25s ease-out;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-bottom: 20px;
	padding-bottom: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoIcon = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 3px;
	height: 24px;
`;

const Bar = styled.div<{ $h: number }>`
	width: 6px;
	height: ${({ $h }) => $h}px;
	background: linear-gradient(135deg, #ff9a76 0%, #ff7c5c 100%);
	border-radius: 2px;
`;

const Title = styled.h1`
	margin: 0;
	font-size: 18px;
	font-weight: 700;
	color: ${({ theme }) => theme.colors.text};
	letter-spacing: -0.3px;
`;

export default function App() {
	const { loading, loggedIn, user, loginLoading, status, login, logout } =
		useAuth();

	if (loading) return null;

	return (
		<Wrapper>
			<Header>
				<LogoIcon>
					<Bar $h={10} />
					<Bar $h={16} />
					<Bar $h={24} />
				</LogoIcon>
				<Title>Solta</Title>
			</Header>

			{loggedIn && user ? (
				<>
					<UserInfo
						name={user.name}
						avatarUrl={user.avatarUrl}
						onLogout={logout}
					/>
					<UsageGuide />
				</>
			) : (
				<LoginView loading={loginLoading} onLogin={login} />
			)}

			{status && (
				<StatusMessage message={status.message} type={status.type} />
			)}
		</Wrapper>
	);
}
