//// [declFileForInterfaceWithRestParams.ts]

interface I {
    foo(...x): typeof x;
    foo2(a: number, ...x): typeof x;
    foo3(b: string, ...x: string[]): typeof x;
}

//// [declFileForInterfaceWithRestParams.js]


////[declFileForInterfaceWithRestParams.d.ts]
interface I {
    foo(...x: any[]): any[];
    foo2(a: number, ...x: any[]): any[];
    foo3(b: string, ...x: string[]): string[];
}
