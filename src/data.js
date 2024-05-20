// export async function fetchData() {
//     const response = await fetch('salary.json'); // Replace with your file path
//     const data = await response.json(); // Assuming the file is JSON
//     console.log(data);
//     return data;
// }

import salary from './salary.json'

export const fetchData = async () => {
    return salary;
}
