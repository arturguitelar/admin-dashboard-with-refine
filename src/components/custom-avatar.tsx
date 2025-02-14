import { Avatar as AntdAvatar } from 'antd';
import { AvatarProps } from 'antd/lib';
import { r } from 'react-router/dist/development/fog-of-war-CCAcUMgB';

type Props = AvatarProps & {
  name?: string;
};

export const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size="small"
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style,
      }}
      {...rest}
    >
      {name}
    </AntdAvatar>
  );
};
