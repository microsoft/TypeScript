// @target: es5
// @declaration: true

const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

interface Item { id: string; }
const items: Item[] = [{ id: "a" }, { id: "b" }];
const idMap = items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {} as Record<string, Item>);

const counts = ["a", "b", "a"].reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const readonlyNumbers: readonly number[] = [1, 2, 3];
const readonlySum = readonlyNumbers.reduce((acc, curr) => acc + curr, 0);
const readonlyCounts = readonlyNumbers.reduceRight((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
