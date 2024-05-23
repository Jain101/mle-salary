import React, { useState, useEffect } from 'react';
import { Card, Table, Spin } from 'antd';


function MainTable({tableData }) {
    // const contentStyle = {
    //   padding: 50,
    //   background: 'rgba(0, 0, 0, 0.05)',
    //   borderRadius: 4,
    // };
    // const content = <div style={contentStyle} />;

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
            <Table
                columns={mainColumns}
                dataSource={tableData}
                expandable={{ expandedRowRender }}
                pagination={false}
            />
        </>
    )
}

export default MainTable