import { Card, List, Space } from 'antd';
import dayjs from 'dayjs';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useList } from '@refinedev/core';

import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from '@/graphql/queries';

import { Text } from '../text';
import LatestActivitiesSkeleton from '../skeleton/latest-activities';
import { CustomAvatar } from '../custom-avatar';

const LatestActivities = () => {
  const {
    data: audits,
    isLoading: isLoadingAudits,
    isError,
    error,
  } = useList({
    resource: 'audits',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const dealIds = audits?.data?.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeals } = useList({
    resource: 'deals',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
    queryOptions: { enabled: !!dealIds?.length },
    pagination: {
      mode: 'off',
    },
    filters: [{ field: 'id', operator: 'in', value: dealIds }],
  });

  if (isError) {
    console.log(error);
    return null;
  }

  const isLoading = isLoadingAudits || isLoadingDeals;

  return (
    <Card
      styles={{
        header: {
          padding: '16px',
        },
        body: {
          padding: '0 1rem',
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
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem' }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audits?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id === String(item.targetId)) ||
              undefined;

            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format('MMM DD, YYYY - HH:mm')}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text>
                        {item.action === 'CREATE' ? 'created' : 'moved'}
                      </Text>
                      <Text strong>{deal?.title}</Text>
                      <Text>{item.action === 'CREATE' ? 'in' : 'to'}</Text>
                      <Text strong>{deal?.stage?.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default LatestActivities;
