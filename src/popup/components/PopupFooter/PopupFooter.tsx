import { CLIENT_URL } from '../../../shared/constants/config';
import * as S from './PopupFooter.styled';

interface Props {
	username: string;
	onLogout: () => void;
}

export default function PopupFooter({ username, onLogout }: Props) {
	return (
		<S.Footer>
			<S.ProfileLink
				href={`${CLIENT_URL}/profile/${username}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				프로필 보기 →
			</S.ProfileLink>
			<S.LogoutButton onClick={onLogout}>로그아웃</S.LogoutButton>
		</S.Footer>
	);
}
