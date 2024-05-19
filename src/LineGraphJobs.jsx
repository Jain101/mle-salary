import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineGraphJobs = ({ data }) => {
    const years = data.map(item => item.year);
    const jobCounts = data.map(item => item.totalJobs);
    //console.log(years, jobCounts);
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Number of Total Jobs',
                data: jobCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Number of Jobs from 2020 to 2024',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Jobs',
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraphJobs;
