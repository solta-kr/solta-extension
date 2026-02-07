import * as S from './StatusMessage.styled';

interface Props {
	message: string;
	type: 'success' | 'error';
}

export default function StatusMessage({ message, type }: Props) {
	return <S.Container $type={type}>{message}</S.Container>;
}
