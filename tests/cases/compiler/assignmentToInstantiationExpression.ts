// @strict: true

let obj: { fn?: <T>() => T } = {};
obj.fn<number> = () => 1234;


let getValue: <T>() => T;
getValue<number> = () => 1234;


let getValue2!: <T>() => T;
getValue2<number> = () => 1234;
