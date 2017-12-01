interface ReadonlyData {
    readonly value: string;
}

const data: ReadonlyData = { value: 'foo' };
const clone = { ...data };
clone.value = 'bar';
