// valid

// no params
() => 1;

// one param, no type
(arg) => 2;

// one param, no type
arg => 2;

// one param, no type with default value
(arg = 1) => 3;

// one param, no type, optional
(arg?) => 4;

// typed param
(arg: number) => 5;

// typed param with default value
(arg: number = 0) => 6;

// optional param
(arg?: number) => 7;

// var arg param
(...arg: number[]) => 8;

// multiple arguments
(arg1, arg2) => 12;
(arg1 = 1, arg2 =3) => 13;
(arg1?, arg2?) => 14;
(arg1: number, arg2: number) => 15;
(arg1: number = 0, arg2: number = 1) => 16;
(arg1?: number, arg2?: number) => 17;
(arg1, ...arg2: number[]) => 18;
(arg1, arg2?: number) => 19;

// in paren
(() => 21);
((arg) => 22);
((arg = 1) => 23);
((arg?) => 24);
((arg: number) => 25);
((arg: number = 0) => 26);
((arg?: number) => 27);
((...arg: number[]) => 28);

// in multiple paren
(((((arg) => { return 32; }))));

// in ternary exression
false ? () => 41 : null;
false ? (arg) => 42 : null;
false ? (arg = 1) => 43 : null;
false ? (arg?) => 44 : null;
false ? (arg: number) => 45 : null;
false ? (arg?: number) => 46 : null;
false ? (arg?: number = 0) => 47 : null;
false ? (...arg: number[]) => 48 : null;

// in ternary exression within paren
false ? (() => 51) : null;
false ? ((arg) => 52) : null;
false ? ((arg = 1) => 53) : null;
false ? ((arg?) => 54) : null;
false ? ((arg: number) => 55) : null;
false ? ((arg?: number) => 56) : null;
false ? ((arg?: number = 0) => 57) : null;
false ? ((...arg: number[]) => 58) : null;

// ternary exression's else clause
false ? null : () => 61;
false ? null : (arg) => 62;
false ? null : (arg = 1) => 63;
false ? null : (arg?) => 64;
false ? null : (arg: number) => 65;
false ? null : (arg?: number) => 66;
false ? null : (arg?: number = 0) => 67;
false ? null : (...arg: number[]) => 68;


// nested ternary expressions
((a?) => { return a; }) ? (b? ) => { return b; } : (c? ) => { return c; };

//multiple levels
(a?) => { return a; } ? (b)=>(c)=>81 : (c)=>(d)=>82;


// In Expressions
((arg) => 90) instanceof Function;
((arg = 1) => 91) instanceof Function;
((arg? ) => 92) instanceof Function;
((arg: number) => 93) instanceof Function;
((arg: number = 1) => 94) instanceof Function;
((arg?: number) => 95) instanceof Function;
((...arg: number[]) => 96) instanceof Function;

'' + ((arg) => 100);
((arg) => 0) + '' + ((arg) => 101);
((arg = 1) => 0) + '' + ((arg = 2) => 102);
((arg?) => 0) + '' + ((arg?) => 103);
((arg:number) => 0) + '' + ((arg:number) => 104);
((arg:number = 1) => 0) + '' + ((arg:number = 2) => 105);
((arg?:number = 1) => 0) + '' + ((arg?:number = 2) => 106);
((...arg:number[]) => 0) + '' + ((...arg:number[]) => 107);
((arg1, arg2?) => 0) + '' + ((arg1,arg2?) => 108);
((arg1, ...arg2:number[]) => 0) + '' + ((arg1, ...arg2:number[]) => 108);


// Function Parameters
function foo(...arg: any[]) { }

foo(
    (a) => 110, 
    ((a) => 111), 
    (a) => {
        return 112;
    },
    (a? ) => 113, 
    (a, b? ) => 114, 
    (a: number) => 115, 
    (a: number = 0) => 116, 
    (a = 0) => 117, 
    (a?: number = 0) => 118, 
    (...a: number[]) => 119, 
    (a, b? = 0, ...c: number[]) => 120,
    (a) => (b) => (c) => 121,
    false? (a) => 0 : (b) => 122
);