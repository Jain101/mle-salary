
export const getProcessData = (data) => {
    return data.reduce((acc, curr) => {
        const year = curr.work_year;
        const salary = Number(curr.salary_in_usd);
        const jobTitle = curr.job_title;

        if (!year || !jobTitle || isNaN(salary)) {
            return acc;
        }

        if (!acc[year]) {
            acc[year] = { year, totalJobs: 0, totalSalary: 0, jobTitles: {} };
        }

        acc[year].totalJobs += 1;
        acc[year].totalSalary += salary;

        if (!acc[year].jobTitles[jobTitle]) {
            acc[year].jobTitles[jobTitle] = 0;
        }

        acc[year].jobTitles[jobTitle] += 1;

        return acc;
    }, {})
}