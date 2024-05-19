export async function fetchData() {
    const response = await fetch('/salary.json'); // Replace with your file path
    const data = await response.json(); // Assuming the file is JSON
    return data;
}
