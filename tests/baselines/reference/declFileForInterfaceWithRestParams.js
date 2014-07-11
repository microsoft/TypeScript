//// [declFileForInterfaceWithRestParams.ts]

interface I {
    foo(...x): typeof x;
    foo2(a: number, ...x): typeof x;
    foo3(b: string, ...x: string[]): typeof x;
}

//// [declFileForInterfaceWithRestParams.js]


//// [declFileForInterfaceWithRestParams.d.ts]
interface I {
    foo(...x);
    foo2(a, ...x);
    foo3(b, ...x);
}
