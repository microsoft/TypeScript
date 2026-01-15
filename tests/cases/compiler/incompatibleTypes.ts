interface IFoo1 {
    p1(): number;
}

class C1 implements IFoo1 { // incompatible on the return type
    public p1() {
        return "s";
    }
}

interface IFoo2 {
    p1(s:string): number;
}

class C2 implements IFoo2 { // incompatible on the param type
    public p1(n:number) {
        return 0;
    }
}

interface IFoo3 {
    p1: string;
}

class C3 implements IFoo3 { // incompatible on the property type
    public p1: number;
}

interface IFoo4 {
    p1: { a: { a: string; }; b: string; };
}

class C4 implements IFoo4 { // incompatible on the property type
    public p1: { c: { b: string; }; d: string; };
}

function if1(i: IFoo1): void;
function if1(i: IFoo2): void;
function if1(a: any) { }
var c1: C1;
var c2: C2;
if1(c1);


function of1(n: { a: { a: string; }; b: string; }): number;
function of1(s: { c: { b: string; }; d: string; }): string;
function of1(a: any) { return null; }

of1({ e: 0, f: 0 });

interface IMap {
 [key:string]:string;
}

function foo(fn:() => void) {
 
}

function bar() {
 var map:IMap;
 foo(() => {
  map = {};
 });
}

var o1: { a: { a: string; }; b: string; } = { e: 0, f: 0 };

var a1 = [{ e: 0, f: 0 }, { e: 0, f: 0 }, { e: 0, g: 0 }];



var i1c1: { (): string; } = 5;

var fp1: () =>any = a => 0;
