let response = await fetch('/salary.json'); // Replace with your file path
let data1 = await response.json(); // For CSV data
console.log(data1);

export default data1;
