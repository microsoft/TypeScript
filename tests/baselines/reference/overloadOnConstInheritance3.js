//// [overloadOnConstInheritance3.ts]
interface Base {
    addEventListener(x: string): any;
}
interface Deriver extends Base {
    // shouldn't need to redeclare the string overload
    addEventListener(x: 'bar'): string;
    addEventListener(x: 'foo'): string;
}


//// [overloadOnConstInheritance3.js]
