import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { fetchData } from './data';
import LineGraphSalary from './LineGraphSalary';
import LineGraphJobs from './LineGraphJobs';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
        console.log('fetched data', fetchedData);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }
  console.log('data', data);
  const processedData = data.reduce((acc, curr) => {
    const year = curr.work_year;
    const salary = Number(curr.salary_in_usd);
    const jobTitle = curr.job_title;

    if (!year || !jobTitle || isNaN(salary)) {
      return acc;
    }

    if (!acc[year]) {
      acc[year] = { year, totalJobs: 0, totalSalary: 0, jobTitles: {} };
    }

    acc[year].totalJobs += 1;
    acc[year].totalSalary += salary;

    if (!acc[year].jobTitles[jobTitle]) {
      acc[year].jobTitles[jobTitle] = 0;
    }

    acc[year].jobTitles[jobTitle] += 1;

    return acc;
  }, {});
  console.log('processedData', processedData);
  const tableData = Object.values(processedData).map(item => ({
    key: item.year,
    year: item.year,
    totalJobs: item.totalJobs,
    averageSalary: (item.totalSalary / item.totalJobs).toFixed(2),
    jobTitles: item.jobTitles
  }));
  console.log('tableData', tableData);

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

  return (
    <>
      <h1 className='text-center text-bold text-4xl p-10'>ML Engineers Salaries 2020-24</h1>
      <Table
        columns={mainColumns}
        dataSource={tableData}
        expandable={{ expandedRowRender }}
        pagination={false}
      />
      <div className='md:w-1/2 md:h-1/2 flex flex-col sm:flex-row p-10'>
        <LineGraphJobs data={tableData} />
        <LineGraphSalary data={tableData} />
      </div>
    </>
  );
}

export default App;
