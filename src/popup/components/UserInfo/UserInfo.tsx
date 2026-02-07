import * as S from './UserInfo.styled';

interface Props {
	name: string;
	avatarUrl: string;
	onLogout: () => void;
}

export default function UserInfo({ name, avatarUrl, onLogout }: Props) {
	return (
		<S.Container>
			<S.AvatarRing>
				<S.Avatar src={avatarUrl} alt={name} />
			</S.AvatarRing>
			<S.Details>
				<S.Name>{name}</S.Name>
				<S.Username>@{name}</S.Username>
			</S.Details>
			<S.LogoutButton onClick={onLogout}>로그아웃</S.LogoutButton>
		</S.Container>
	);
}
