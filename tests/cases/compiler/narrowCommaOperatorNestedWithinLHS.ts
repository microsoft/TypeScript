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