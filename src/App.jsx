import React, { useState, useEffect } from 'react';
import { Card, Table, Spin } from 'antd';
import { fetchData } from './data';
import LineGraphSalary from './components/LineGraphSalary';
import LineGraphJobs from './components/LineGraphJobs';
import MainTable from './components/MainTable';
import { processData } from './utils/preprocess';
import { tabledData } from './utils/tabledata';


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
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="flex flex-row justify-center align-middle text-center loading loading-spinner text-primary"></span>
        <span className='text-primary'>Loading...</span>
      </div>
      // <Spin tip="Loading">{content}</Spin>
    )
  }
  const processedData = processData(data);
  console.log('processedData', processedData);

  const tableData = tabledData(processedData)
  console.log('tableData', tableData);
  return (
    <>
      <div className='min-h-screen'>
        <h1 className='font-serif text-center text-bold text-4xl pt-20 pb-10'>ML Engineers Salaries 2020-24</h1>
        <div className='border-cyan-600 border border-x-4 rounded-md border-y-0'>
          <MainTable tableData={tableData} />
        </div>
        <div className='md:w-1/2 md:h-1/2 flex flex-col md:flex-row p-10'>
          <LineGraphJobs data={tableData} />
          <LineGraphSalary data={tableData} />
        </div>
      </div>
    </>

  );
}

export default App;
