// @target: es6
// repro mostly from https://github.com/Microsoft/TypeScript/issues/25065
function getProperty2<T, K extends keyof T>(obj: T, key: Extract<K, string>): T[K] {
    return obj[key];
}

function getProperty3<T, K extends Extract<keyof T, string>>(obj: T, key: K): T[K] {
    return obj[key];
}

const s = Symbol();
interface StrNum {
    first: string;
    second: number;
    [s]: string;
}
const obj: StrNum = {} as any;

let prop: string;

// should work
prop = getProperty2(obj, 'first');

prop = getProperty3(obj, 'first');

// Should fail
prop = getProperty2(obj, s);

prop = getProperty3(obj, s);
