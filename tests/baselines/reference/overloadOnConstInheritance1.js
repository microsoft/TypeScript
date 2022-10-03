//// [overloadOnConstInheritance1.ts]
interface Base {
    addEventListener(x: string): any;
    addEventListener(x: 'foo'): string;
}
interface Deriver extends Base {
    addEventListener(x: string): any;
    addEventListener(x: 'bar'): string;
}


//// [overloadOnConstInheritance1.js]
