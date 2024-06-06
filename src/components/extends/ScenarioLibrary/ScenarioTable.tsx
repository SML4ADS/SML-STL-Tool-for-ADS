import { TableProps, Tag, Space, Table, Card } from "antd";
import { ReactElement } from "react";

export default function ScenarioTable({
  setRoute,
  db,
  setCurrentIndex
}: {
  setRoute: (route: string) => void;
  db: {
    name: string;
    type: string;
    tags: string[];
    [key: string]: any;
  }[];
  setCurrentIndex: (index: number) => void;
}): ReactElement {
  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag: any) => {
            return (
              <Tag color="green" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setRoute("detail");
            setCurrentIndex(record.key);
          }}>View</a>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Scenario List">
      <Table
        columns={columns}
        dataSource={db.map((data, index) => {
          return {
            ...data,
            key: index,
          };
        })}
      />
    </Card>
  );
}
