type StringMap = { [x: string]: string };

const empty1 = {};
let empty2: {};
const names1 = { a: "foo", b: "bar" };
let names2: { a: string, b: string };
let map: StringMap;
map = { x: "xxx", y: "yyy" };
map = empty1;
map = empty2;
map = names1;
map = names2;

declare function getStringIndexValue<T>(map: { [x: string]: T }): T;
declare function getNumberIndexValue<T>(map: { [x: number]: T }): T;

function f1() {
    const o1 = { a: 1, b: 2 };
    let o2: { a: number, b: number };
    const v1 = getStringIndexValue(o1);
    const v2 = getStringIndexValue(o2);
}

function f2() {
    const o1 = { a: "1", b: "2" };
    let o2: { a: string, b: string };
    const v1 = getStringIndexValue(o1);
    const v2 = getStringIndexValue(o2);
}

function f3() {
    const o1 = { a: 1, b: "2" };
    let o2: { a: number, b: string };
    const v1 = getStringIndexValue(o1);
    const v2 = getStringIndexValue(o2);
}

function f4() {
    const o1 = { 0: "0", 1: "1", count: 2 };
    let o2: { 0: string, 1: string, count: number };    
    const v1 = getStringIndexValue(o1);
    const v2 = getStringIndexValue(o2);
    const v3 = getNumberIndexValue(o1);
    const v4 = getNumberIndexValue(o2);
}
