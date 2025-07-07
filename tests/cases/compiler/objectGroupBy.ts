// @target: esnext

const basic = Object.groupBy([0, 2, 8], x => x < 5 ? 'small' : 'large');

const chars = Object.groupBy('a string', c => c);

type Employee = { name: string, role: 'ic' | 'manager' }
const employees: Set<Employee> = new Set();
const byRole = Object.groupBy(employees, x => x.role);

const byNonKey = Object.groupBy(employees, x => x);
