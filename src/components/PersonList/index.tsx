import { useMount } from "@/hooks/useMount";
import { useHttp } from "@/util/http";
import { ColumnsType } from "antd/lib/table";
import { Input, Table, Select } from "antd";
import React, { useState } from "react";
import styled from "@emotion/styled";

const { Option } = Select;

interface Project {
  key: string;
  name: string;
  department: string;
  owner: string;
  createdAt: string;
}

const ColunmTitle = styled.span`
  font-weight: 600;
  font-size: 1.6rem;
`;

const columns: ColumnsType<Project> = [
  {
    key: "name",
    dataIndex: "name",
    title: <ColunmTitle>项目</ColunmTitle>,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: "department",
    dataIndex: "department",
    title: <ColunmTitle>部门</ColunmTitle>,
  },
  {
    key: "owner",
    dataIndex: "owner",
    title: <ColunmTitle>负责人</ColunmTitle>,
  },
  {
    key: "createdAt",
    dataIndex: "createdAt",
    title: <ColunmTitle>创建时间</ColunmTitle>,
    sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
  },
];

export default () => {
  const [data, setData] = useState<Project[]>([]);

  const client = useHttp();

  useMount(async () => {
    try {
      const res: RespData<ProjectData[]> = await client("projects");
      const projects: Project[] = res.data.map((project: ProjectData) => {
        const { projectId, name, department, owner, createdAt } = project;
        return {
          key: projectId.toString(),
          name,
          department,
          owner,
          createdAt,
        };
      });
      setData(projects);
    } catch (error) {}
  });

  return (
    <TableContainer>
      <TableTitle>项目列表</TableTitle>
      <SearchBar>
        <Input.Search placeholder={"项目名"} />
        <Select defaultValue="负责人">
          <Option value="" key="1">
            fd
          </Option>
          <Option value="" key="2">
            fd
          </Option>
          <Option value="" key="3">
            fd
          </Option>
        </Select>
      </SearchBar>
      <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
    </TableContainer>
  );
};

const TableContainer = styled.div`
  display: grid;
  row-gap: 1.5rem;
`;

const TableTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 2.4rem;
  font-weight: 600;
`;

const SearchBar = styled.div`
  display: flex;
  width: 40%;
  > :first-of-type {
    margin-right: 1rem;
  }
`;
