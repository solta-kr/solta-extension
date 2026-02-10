import { CLIENT_URL } from '../../../shared/constants/config';
import * as S from './UserInfo.styled';

interface Props {
	name: string;
	avatarUrl: string;
	onLogout: () => void;
}

export default function UserInfo({ name, avatarUrl, onLogout }: Props) {
	return (
		<S.Wrapper>
			<S.Container
				href={`${CLIENT_URL}/profile/${name}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<S.AvatarRing>
					<S.Avatar src={avatarUrl} alt={name} />
				</S.AvatarRing>
				<S.Details>
					<S.Name>{name}</S.Name>
					<S.ProfileHint>프로필 보기 &rarr;</S.ProfileHint>
				</S.Details>
			</S.Container>
			<S.Footer>
				<S.LogoutButton onClick={onLogout}>로그아웃</S.LogoutButton>
			</S.Footer>
		</S.Wrapper>
	);
}
