// fixes #12200
function f() {
    let n: number = 12;
    let m: number = 13;
    let a: any = null;
    const o1 = { ...{}, [n]: n };
    const o2 = { ...{}, [a]: n };
    const o3 = { [a]: n, ...{}, [n]: n, ...{}, [m]: m };
}
