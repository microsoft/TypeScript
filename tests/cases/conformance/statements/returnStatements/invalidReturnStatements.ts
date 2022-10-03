// all the following should be error
function fn1(): number {  }
function fn2(): string { }
function fn3(): boolean { }
function fn4(): Date {  }
function fn7(): any {  } // should be valid: any includes void

interface I { id: number }
class C implements I {
    id: number;
    dispose() {}
}
class D extends C {
    name: string;
}
function fn10(): D { return { id: 12 }; } 

function fn11(): D { return new C(); }

