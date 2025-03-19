//// [tests/cases/compiler/narrowCommaOperatorNestedWithinLHS.ts] ////

//// [narrowCommaOperatorNestedWithinLHS.ts]
const otherValue = () => true;
const value: { inner: number | string } = null as any;

function isNumber(obj: any): obj is number {
    return true; // method implementation irrelevant
}

if (typeof (otherValue(), value).inner === 'number') {
    const a = value.inner; // number
    const b: number = (otherValue(), value).inner; // string | number , but should be number
}

if (isNumber((otherValue(), value).inner)) {
    const a = value.inner; // number
    const b: number = (otherValue(), value).inner; // string | number , but should be number
}

//// [narrowCommaOperatorNestedWithinLHS.js]
const otherValue = () => true;
const value = null;
function isNumber(obj) {
    return true; // method implementation irrelevant
}
if (typeof (otherValue(), value).inner === 'number') {
    const a = value.inner; // number
    const b = (otherValue(), value).inner; // string | number , but should be number
}
if (isNumber((otherValue(), value).inner)) {
    const a = value.inner; // number
    const b = (otherValue(), value).inner; // string | number , but should be number
}
