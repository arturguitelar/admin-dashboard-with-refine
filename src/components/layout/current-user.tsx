import { useState } from 'react';
import { Button, Popover } from 'antd';
import { useGetIdentity } from '@refinedev/core';
import { SettingOutlined } from '@ant-design/icons';

import type { User } from '@/graphql/schema.types';

import { CustomAvatar } from '../custom-avatar';
import { Text } from '../text';

export const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Text strong style={{ padding: '12px 20px' }}>
        {user?.name}
      </Text>

      <div
        style={{
          borderTop: '1px solid #d9d9d9',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <Button
          style={{ textAlign: 'left' }}
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setIsOpen(true)}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        zIndex={999}
        content={content}
        styles={{
          body: {
            padding: 0,
          },
        }}
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
