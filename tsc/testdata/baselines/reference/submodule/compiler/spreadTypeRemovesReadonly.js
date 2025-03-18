//// [tests/cases/compiler/spreadTypeRemovesReadonly.ts] ////

//// [spreadTypeRemovesReadonly.ts]
interface ReadonlyData {
    readonly value: string;
}

const data: ReadonlyData = { value: 'foo' };
const clone = { ...data };
clone.value = 'bar';


//// [spreadTypeRemovesReadonly.js]
const data = { value: 'foo' };
const clone = { ...data };
clone.value = 'bar';
