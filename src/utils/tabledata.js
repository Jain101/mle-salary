export const getTableData = (processedData) => {
    return Object.values(processedData).map(item => ({
        key: item.year,
        year: item.year,
        totalJobs: item.totalJobs,
        averageSalary: (item.totalSalary / item.totalJobs).toFixed(2),
        jobTitles: item.jobTitles
    }))
}