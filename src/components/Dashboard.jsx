import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/data';
import LineGraphSalary from './LineGraphSalary';
import LineGraphJobs from './LineGraphJobs';
import MainTable from './MainTable';
import { getProcessData } from '../utils/preprocess';
import { getTableData } from '../utils/tabledata';
import Loader from './Loader';


function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchData();
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
    return <Loader />
  }
  const processedData = getProcessData(data);
  const tableData = getTableData(processedData)

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

export default Dashboard;
