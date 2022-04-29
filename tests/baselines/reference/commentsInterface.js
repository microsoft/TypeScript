//// [commentsInterface.ts]
/** this is interface 1*/
interface i1 {
}
var i1_i: i1;
interface nc_i1 {
}
var nc_i1_i: nc_i1;
/** this is interface 2 with memebers*/
interface i2 {
    /** this is x*/
    x: number;
    /** this is foo*/
    foo: (/**param help*/b: number) => string;
    /** this is indexer*/
    [/**string param*/i: string]: any;
    /**new method*/
    new (/** param*/i: i1);
    nc_x: number;
    nc_foo: (b: number) => string;
    [i: number]: number;
    /** this is call signature*/
    (/**paramhelp a*/a: number,/**paramhelp b*/ b: number) : number;
    /** this is fnfoo*/
    fnfoo(/**param help*/b: number): string;
    nc_fnfoo(b: number): string;
    // nc_y
    nc_y: number;
}
var i2_i: i2;
var i2_i_x = i2_i.x;
var i2_i_foo = i2_i.foo;
var i2_i_foo_r = i2_i.foo(30);
var i2_i_i2_si = i2_i["hello"];
var i2_i_i2_ii = i2_i[30];
var i2_i_n = new i2_i(i1_i);
var i2_i_nc_x = i2_i.nc_x;
var i2_i_nc_foo = i2_i.nc_foo;
var i2_i_nc_foo_r = i2_i.nc_foo(30);
var i2_i_r = i2_i(10, 20);
var i2_i_fnfoo = i2_i.fnfoo;
var i2_i_fnfoo_r = i2_i.fnfoo(10);
var i2_i_nc_fnfoo = i2_i.nc_fnfoo;
var i2_i_nc_fnfoo_r = i2_i.nc_fnfoo(10);
interface i3 {
    /** Comment i3 x*/
    x: number;
    /** Function i3 f*/
    f(/**number parameter*/a: number): string;
    /** i3 l*/
    l: (/**comment i3 l b*/b: number) => string;
    nc_x: number;
    nc_f(a: number): string;
    nc_l: (b: number) => string;
}
var i3_i: i3;
i3_i = {
    f: /**own f*/ (/**i3_i a*/a: number) => "Hello" + a,
    l: this.f,
    /** own x*/
    x: this.f(10),
    nc_x: this.l(this.x),
    nc_f: this.f,
    nc_l: this.l
};
i3_i.f(10);
i3_i.l(10);
i3_i.nc_f(10);
i3_i.nc_l(10);


//// [commentsInterface.js]
var i1_i;
var nc_i1_i;
var i2_i;
var i2_i_x = i2_i.x;
var i2_i_foo = i2_i.foo;
var i2_i_foo_r = i2_i.foo(30);
var i2_i_i2_si = i2_i["hello"];
var i2_i_i2_ii = i2_i[30];
var i2_i_n = new i2_i(i1_i);
var i2_i_nc_x = i2_i.nc_x;
var i2_i_nc_foo = i2_i.nc_foo;
var i2_i_nc_foo_r = i2_i.nc_foo(30);
var i2_i_r = i2_i(10, 20);
var i2_i_fnfoo = i2_i.fnfoo;
var i2_i_fnfoo_r = i2_i.fnfoo(10);
var i2_i_nc_fnfoo = i2_i.nc_fnfoo;
var i2_i_nc_fnfoo_r = i2_i.nc_fnfoo(10);
var i3_i;
i3_i = {
    f: /**own f*/ function (/**i3_i a*/ a) { return "Hello" + a; },
    l: this.f,
    /** own x*/
    x: this.f(10),
    nc_x: this.l(this.x),
    nc_f: this.f,
    nc_l: this.l
};
i3_i.f(10);
i3_i.l(10);
i3_i.nc_f(10);
i3_i.nc_l(10);


//// [commentsInterface.d.ts]
/** this is interface 1*/
interface i1 {
}
declare var i1_i: i1;
interface nc_i1 {
}
declare var nc_i1_i: nc_i1;
/** this is interface 2 with memebers*/
interface i2 {
    /** this is x*/
    x: number;
    /** this is foo*/
    foo: (/**param help*/ b: number) => string;
    /** this is indexer*/
    [/**string param*/ i: string]: any;
    /**new method*/
    new (/** param*/ i: i1): any;
    nc_x: number;
    nc_foo: (b: number) => string;
    [i: number]: number;
    /** this is call signature*/
    (/**paramhelp a*/ a: number, /**paramhelp b*/ b: number): number;
    /** this is fnfoo*/
    fnfoo(/**param help*/ b: number): string;
    nc_fnfoo(b: number): string;
    nc_y: number;
}
declare var i2_i: i2;
declare var i2_i_x: number;
declare var i2_i_foo: (b: number) => string;
declare var i2_i_foo_r: string;
declare var i2_i_i2_si: any;
declare var i2_i_i2_ii: number;
declare var i2_i_n: any;
declare var i2_i_nc_x: number;
declare var i2_i_nc_foo: (b: number) => string;
declare var i2_i_nc_foo_r: string;
declare var i2_i_r: number;
declare var i2_i_fnfoo: (b: number) => string;
declare var i2_i_fnfoo_r: string;
declare var i2_i_nc_fnfoo: (b: number) => string;
declare var i2_i_nc_fnfoo_r: string;
interface i3 {
    /** Comment i3 x*/
    x: number;
    /** Function i3 f*/
    f(/**number parameter*/ a: number): string;
    /** i3 l*/
    l: (/**comment i3 l b*/ b: number) => string;
    nc_x: number;
    nc_f(a: number): string;
    nc_l: (b: number) => string;
}
declare var i3_i: i3;
