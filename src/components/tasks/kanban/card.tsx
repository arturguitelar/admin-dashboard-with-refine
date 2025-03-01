import { useMemo } from 'react';
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tag,
  theme,
  Tooltip,
} from 'antd';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

import { User } from '@/graphql/schema.types';
import { getDateColor } from '@/utilities';

import { Text } from '@/components/text';
import { TextIcon } from '@/components/text-icon';
import { CustomAvatar } from '@/components/custom-avatar';

type Props = {
  id: string;
  title: string;
  updateAt?: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User['avatarUrl'];
  }[];
};

export const ProjectCard = ({ id, title, dueDate, users }: Props) => {
  const { token } = theme.useToken();

  const edit = () => {};

  const dropdownItems = useMemo(() => {
    const dropDownItems: MenuProps['items'] = [
      {
        label: 'View Card',
        key: '1',
        icon: <EyeOutlined />,
        onClick: () => {
          edit();
        },
      },
      {
        danger: true,
        label: 'Delete Card',
        key: '2',
        icon: <DeleteOutlined />,
        onClick: () => {},
      },
    ];

    return dropDownItems;
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format('MMM DD'),
    };
  }, [dueDate]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: 'transparent',
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit()}
        extra={
          <Dropdown
            trigger={['click']}
            menu={{
              items: dropdownItems,
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: 'rotate(90deg)',
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <TextIcon style={{ marginRight: '4px' }} />
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: '12px' }} />}
              style={{
                padding: '0 4px',
                marginInlineEnd: '0',
                backgroundColor:
                  dueDateOptions.color === 'default' ? 'transparent' : 'unset',
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== 'default'}
            >
              {dueDateOptions.text}
            </Tag>
          )}

          {!!users?.length && (
            <Space>
              {users.map((user) => (
                <Tooltip>
                  <CustomAvatar name={user.name} src={user.avatarUrl} />
                </Tooltip>
              ))}
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};
