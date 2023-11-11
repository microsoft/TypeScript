//// [tests/cases/conformance/declarationEmit/exportDefaultNamespace.ts] ////

//// [exportDefaultNamespace.ts]
export default function someFunc(): string {
    return 'hello!';
}

someFunc.someProp = 'yo';


/// [Declarations] ////



//// [/.src/exportDefaultNamespace.d.ts]
declare function someFunc(): string;
declare namespace someFunc {
    var someProp: string;
}
export default someFunc;
