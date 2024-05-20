import Papa from 'papaparse';

export const fetchData = async () => {
    return new Promise((resolve, reject) => {
        Papa.parse('https://www.kaggle.com/api/v1/datasets/download/chopper53/machine-learning-engineer-salary-in-2024/salaries.csv', {
            download: true,
            header: true,
            complete: function (results) {
                //console.log('hey1', results.data[0]);
                resolve(results.data);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
    // Papa.parse('https://www.kaggle.com/api/v1/datasets/download/chopper53/machine-learning-engineer-salary-in-2024/salaries.csv', {
    //     download: true,
    //     header: true,
    //     complete: function(results) {
    //         console.log('hey1', results.data[0]);
    //         return results.data;
    //     }
    // });
    
    // const response = await fetch('https://www.kaggle.com/api/v1/datasets/download/chopper53/machine-learning-engineer-salary-in-2024/salaries.csv'); // Replace with your file path
    // const data = await response.json(); // Assuming the file is JSON
    // console.log(data);
    // return data;
}
 
// import salary from '../public/salary.json'

// export const fetchData = async () => {
//     return salary;
// }
