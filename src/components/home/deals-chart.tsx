import { Card } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { Area, AreaConfig } from '@ant-design/plots';

import { Text } from '../text';

const DealsChart = () => {
  const config: AreaConfig = {
    data: [],
  };

  return (
    <Card
      style={{
        height: '100%',
      }}
      styles={{
        header: {
          padding: '8px 16px',
        },
        body: {
          padding: '24px 24px 0 24px',
        },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsChart;
