// @declaration: true
// @strict: true

declare function pad(n: number | string): string;

export default (dateString: string, type: 'date' | 'month' | 'year'): string => {
    const [year, month = 1, date = 1] = dateString.split('-')
    return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}
