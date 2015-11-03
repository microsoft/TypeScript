// @allowUnreachableCode: true

interface I {
    id: number;
}

class C implements I {
    id: number;
}

class D<T>{
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>
}

function F(x: string): number { return 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

for(var aNumber: number = 9.9;;){} 
for(var aString: string = 'this is a string';;){}
for(var aDate: Date = new Date(12);;){}
for(var anObject: Object = new Object();;){}

for(var anAny: any = null;;){}
for(var aSecondAny: any = undefined;;){}
for(var aVoid: void = undefined;;){}

for(var anInterface: I = new C();;){}
for(var aClass: C = new C();;){}
for(var aGenericClass: D<string> = new D<string>();;){}
for(var anObjectLiteral: I = { id: 12 };;){}
for(var anOtherObjectLiteral: { id: number } = new C();;){}

for(var aFunction: typeof F = F;;){}
for(var anOtherFunction: (x: string) => number = F;;){}
for(var aLambda: typeof F = (x) => 2;;){}

for(var aModule: typeof M = M;;){}
for(var aClassInModule: M.A = new M.A();;){}
for(var aFunctionInModule: typeof M.F2 = (x) => 'this is a string';;){}