interface Function {
    data: number;
    [x: string]: Object;
}

interface I {
    new(): number;
    apply(a: any, b?: any): void;
    call(thisArg: number, ...argArray: number[]): any;
}

var i: I;
var r1: (a: any, b?: any) => void = i.apply;
var r1b: (thisArg: number, ...argArray: number[]) => void = i.call;
var r1c = i.arguments;
var r1d = i.data;
var r1e = i['hm']; // should be Object

var x: {
    new(): number;
    apply(a: any, b?: any): void;
    call(thisArg: number, ...argArray: number[]): any;
}

var r2: (a: any, b?: any) => void = x.apply;
var r2b: (thisArg: number, ...argArray: number[]) => void = x.call;
var r2c = x.arguments;
var r2d = x.data;
var r2e = x['hm']; // should be Object