import { useDroppable } from '@dnd-kit/core';
import { Badge, Button, Space } from 'antd';

import { Text } from '@/components/text';
import { PlusOutlined } from '@ant-design/icons';

export const KanbanColumn = ({ children }: React.PropsWithChildren) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: '',
    data: '',
  });

  const count = 2;

  const description = 'Description';

  const title = 'TITLE';

  const onAddClickHandler = () => {
    //
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px',
      }}
    >
      <div style={{ padding: '12px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="xs"
              strong
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Text>

            {!!count && <Badge count={count} color="cyan" />}

            <Button
              shape="circle"
              icon={<PlusOutlined />}
              onClick={onAddClickHandler}
            />
          </Space>
        </Space>

        {description}
      </div>

      <div
        style={{
          flex: 1,
          overflowY: active ? 'unset' : 'scroll',
          border: '2px dashed transparent',
          borderColor: isOver ? '#000040' : 'transparent',
          borderRadius: '4px',
        }}
      >
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
