import { useState, useEffect, useCallback } from 'react';
import { fetchWithAuth } from '../../shared/utils/fetch-with-auth';

interface UserInfo {
	name: string;
	avatarUrl: string;
}

interface AuthState {
	loading: boolean;
	loggedIn: boolean;
	user: UserInfo | null;
}

export function useAuth() {
	const [state, setState] = useState<AuthState>({
		loading: true,
		loggedIn: false,
		user: null,
	});
	const [loginLoading, setLoginLoading] = useState(false);
	const [status, setStatus] = useState<{
		message: string;
		type: 'success' | 'error';
	} | null>(null);

	useEffect(() => {
		checkLoginStatus();
	}, []);

	async function checkLoginStatus() {
		try {
			const data = await chrome.storage.local.get([
				'accessToken',
				'userInfo',
			]);
			if (data.accessToken && data.userInfo) {
				setState({
					loading: false,
					loggedIn: true,
					user: data.userInfo as UserInfo,
				});
			} else {
				setState({ loading: false, loggedIn: false, user: null });
			}
		} catch {
			setState({ loading: false, loggedIn: false, user: null });
		}
	}

	const login = useCallback(async () => {
		setLoginLoading(true);
		try {
			const response = await fetchWithAuth(
				'/api/auth/oauth/github/login?client=EXTENSION',
			);
			if (!response.ok) {
				throw new Error(
					`OAuth URL을 가져오는데 실패했습니다: ${response.status}`,
				);
			}
			const data = (await response.json()) as { url: string };
			const authUrl = data.url;

			chrome.identity.launchWebAuthFlow(
				{ url: authUrl, interactive: true },
				async (redirectUrl) => {
					if (chrome.runtime.lastError || !redirectUrl) {
						setStatus({
							message: redirectUrl
								? '로그인에 실패했습니다.'
								: '로그인이 취소되었습니다.',
							type: 'error',
						});
						setLoginLoading(false);
						return;
					}

					try {
						const url = new URL(redirectUrl);
						const token = url.searchParams.get('token');
						if (!token) throw new Error('토큰을 찾을 수 없습니다.');

						await chrome.storage.local.set({
							accessToken: token,
						});

						const userResponse = await fetchWithAuth(
							'/api/members/me',
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							},
						);
						if (!userResponse.ok) {
							throw new Error(
								'사용자 정보를 가져오는데 실패했습니다.',
							);
						}
						const userInfo =
							(await userResponse.json()) as UserInfo;

						await chrome.storage.local.set({ userInfo });

						setState({
							loading: false,
							loggedIn: true,
							user: userInfo,
						});
						setStatus({
							message: '로그인에 성공했습니다!',
							type: 'success',
						});
						setTimeout(() => setStatus(null), 2000);
					} catch {
						setStatus({
							message: '로그인 처리에 실패했습니다.',
							type: 'error',
						});
					} finally {
						setLoginLoading(false);
					}
				},
			);
		} catch (error) {
			const msg =
				error instanceof Error &&
				error.message.includes('Failed to fetch')
					? '서버가 실행되지 않았거나 연결할 수 없습니다.'
					: error instanceof Error
						? error.message
						: '서버 연결에 실패했습니다.';
			setStatus({ message: msg, type: 'error' });
			setLoginLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await chrome.storage.local.remove(['accessToken', 'userInfo']);
			setState({ loading: false, loggedIn: false, user: null });
			setStatus({ message: '로그아웃되었습니다.', type: 'success' });
			setTimeout(() => setStatus(null), 2000);
		} catch {
			setStatus({
				message: '로그아웃에 실패했습니다.',
				type: 'error',
			});
		}
	}, []);

	const clearStatus = useCallback(() => setStatus(null), []);

	return { ...state, loginLoading, status, login, logout, clearStatus };
}
