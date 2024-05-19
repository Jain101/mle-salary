import React from 'react';
import { Table } from 'antd';
import data from './data';
import LineGraphSalary from './LineGraphSalary';
import LineGraphJobs from './LineGraphJobs';
// import 'antd/dist/antd.css';

// Process data to get the required format
const processedData = data.reduce((acc, curr) => {
  const year = curr.work_year;
  if (!acc[year]) {
    acc[year] = { year, totalJobs: 0, totalSalary: 0, jobTitles: {} };
  }
  acc[year].totalJobs += 1;
  acc[year].totalSalary += curr.salary_in_usd;
  if (!acc[year].jobTitles[curr.job_title]) {
    acc[year].jobTitles[curr.job_title] = 0;
  }
  acc[year].jobTitles[curr.job_title] += 1;
  return acc;
}, {});

const tableData = Object.values(processedData).map(item => ({
  key: item.year,
  year: item.year,
  totalJobs: item.totalJobs,
  averageSalary: (item.totalSalary / item.totalJobs).toFixed(2),
  jobTitles: item.jobTitles
}));

const mainColumns = [
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: 'Number of Total Jobs',
    dataIndex: 'totalJobs',
    key: 'totalJobs',
    sorter: (a, b) => a.totalJobs - b.totalJobs,
  },
  {
    title: 'Average Salary (USD)',
    dataIndex: 'averageSalary',
    key: 'averageSalary',
    sorter: (a, b) => a.averageSalary - b.averageSalary,
  },
];

const expandedRowRender = (record) => {
  const jobTitles = record.jobTitles;
  const jobTitleData = Object.keys(jobTitles).map(title => ({
    key: title,
    jobTitle: title,
    count: jobTitles[title]
  }));

  const expandedColumns = [
    { title: 'Job Title', dataIndex: 'jobTitle', key: 'jobTitle', sorter: (a, b) => a.jobTitle.localeCompare(b.jobTitle) },
    { title: 'Count', dataIndex: 'count', key: 'count', sorter: (a, b) => a.count - b.count },
  ];

  return <Table columns={expandedColumns} dataSource={jobTitleData} pagination={false} />;
};

function App() {
  return (
    <>
      <h1 className='text-center text-bold text-4xl p-10'>ML Engineers Salaries 2020-24</h1>
      <Table
        columns={mainColumns}
        dataSource={tableData}
        expandable={{ expandedRowRender }}
        pagination={false}
      />
      <div className='w-1/2 h-1/2 flex flex-row p-10'>
        <LineGraphJobs data={tableData} />
        <LineGraphSalary data={tableData} />
      </div>

    </>
  );
}

export default App;
