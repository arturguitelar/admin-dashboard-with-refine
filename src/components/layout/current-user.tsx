import { Popover } from 'antd';
import { useGetIdentity } from '@refinedev/core';
import type { User } from '@/graphql/schema.types';

import { CustomAvatar } from '../custom-avatar';

export const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        style={{ padding: 0 }}
        zIndex={999}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: 'pointer' }}
        />
      </Popover>
    </>
  );
};
