import { Popover } from 'antd';

export const CurrentUser = () => {
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        style={{ padding: 0 }}
        zIndex={999}
      >
        TEST
      </Popover>
    </>
  );
};
