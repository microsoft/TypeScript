//// [tests/cases/conformance/types/spread/objectSpreadComputedProperty.ts] ////

//// [objectSpreadComputedProperty.ts]
// fixes #12200
function f() {
    let n: number = 12;
    let m: number = 13;
    let a: any = null;
    const o1 = { ...{}, [n]: n };
    const o2 = { ...{}, [a]: n };
    const o3 = { [a]: n, ...{}, [n]: n, ...{}, [m]: m };
}


//// [objectSpreadComputedProperty.js]
// fixes #12200
function f() {
    let n = 12;
    let m = 13;
    let a = null;
    const o1 = Object.assign({}, { [n]: n });
    const o2 = Object.assign({}, { [a]: n });
    const o3 = Object.assign(Object.assign(Object.assign(Object.assign({ [a]: n }, {}), { [n]: n }), {}), { [m]: m });
}
