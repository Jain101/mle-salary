import React, { useState, useEffect } from 'react';
import { Card, Table, Spin } from 'antd';
import { fetchData } from './data';
import LineGraphSalary from './LineGraphSalary';
import LineGraphJobs from './LineGraphJobs';
import NavBar from './NavBar';
import Chat from './Chat';
import Chatbot from './Chatbot';

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

  // const contentStyle = {
  //   padding: 50,
  //   background: 'rgba(0, 0, 0, 0.05)',
  //   borderRadius: 4,
  // };
  // const content = <div style={contentStyle} />;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="flex flex-row justify-center align-middle text-center loading loading-spinner text-primary"></span>
        <span className='taxt-primary'>Loading...</span>
      </div>
      // <Spin tip="Loading">{content}</Spin>
    )
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
      {/* <NavBar /> */}
      <div className='min-h-screen'>
        <h1 className='font-serif text-center text-bold text-4xl p-20'>ML Engineers Salaries 2020-24</h1>
        {/* <Card className='p-10'>
        <p className='text-center'>This is a table of ML Engineers Salaries from 2020 to 2024</p>
      </Card> */}
        {/* <div className='container px-10'> */}
        <div className='border-cyan-600 border border-x-4 rounded-md border-y-0'>
          <Table
            columns={mainColumns}
            dataSource={tableData}
            expandable={{ expandedRowRender }}
            pagination={false}
          />
        </div>
        {/* </div> */}
        <div className='md:w-1/2 md:h-1/2 flex flex-col md:flex-row p-10'>
          <LineGraphJobs data={tableData} />
          <LineGraphSalary data={tableData} />
        </div>
        <Chatbot />
      </div>
    </>

  );
}

export default App;
