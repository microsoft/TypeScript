// @target: es2016

const array1 = ['foo', 'bar'] as const;

const value1: string = 'baz';
if (array1.includes(value1)) {
    value1.length;
}

const value2 = 'baz';
if (array1.includes(value2)) {
    value2.length;
}

const value3 = 'bar';
if (array1.includes(value3)) {
    value3.length;
}

const value4 = 'baz';
const result0 = array1.includes(value4);
if (result0) {
    value4.length;
}
