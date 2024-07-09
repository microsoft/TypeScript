// no errors expected below 

interface I {
    new(): number;
}

var i: I;
var r2: number = i();
var r2b: number = new i();
var r2c: (x: any, y?: any) => any = i.apply;

var b: {
    new(): number;
}

var r4: number = b();
var r4b: number = new b();
var r4c: (x: any, y?: any) => any = b.apply;