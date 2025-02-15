import { DashboardOutlined } from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';

/**
 * A resource in Refine performs these actions:
 * list -> get all records (Read)
 * show -> get a single record (Read)
 * create -> create a record (Create)
 * edit -> update a record (Update)
 * delete -> delete a record (Delete)
 * or clone
 */

export const resources: IResourceItem[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
  },
];
