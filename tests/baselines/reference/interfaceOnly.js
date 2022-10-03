//// [interfaceOnly.ts]
interface foo {
    foo();
    f2 (f: ()=> void);
}

//// [interfaceOnly.js]


//// [interfaceOnly.d.ts]
interface foo {
    foo(): any;
    f2(f: () => void): any;
}
