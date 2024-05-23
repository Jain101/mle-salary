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

const LineGraphSalary = ({ data }) => {
    const years = data.map(item => item.year);
    const averageSalary = data.map(item => item.averageSalary);
    //console.log(years, averageSalary);
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Average Salary (USD)',
                data: averageSalary,
                borderColor: 'rgb(220,20,60,1)',
                backgroundColor: 'rgb(220,20,60,0.2)',
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
                text: 'Average Salaries from 2020 to 2024',
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
                    text: 'Average Salary',
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineGraphSalary;
