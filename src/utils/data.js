import Papa from 'papaparse';

// Function to fetch data from the CSV file and parse it into JSON
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
}