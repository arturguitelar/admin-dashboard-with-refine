import { Form, Input, Modal, Select } from 'antd';
import { useModalForm } from '@refinedev/antd';
import { useGo } from '@refinedev/core';

import { CREATE_COMPANY_MUTATION } from '@/graphql/mutations';

import { CompanyList } from './list';

export const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: 'companies', action: 'list' },
      options: { keepQuery: true },
      type: 'replace',
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });
  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="Create Company"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Company name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter a company name" />
          </Form.Item>

          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            rules={[{ required: true }]}
          >
            <Select placeholder="Please select a sales owner" />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};
