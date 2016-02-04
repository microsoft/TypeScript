//// [parameterDestructuringDeclaration.ts]

interface C {
    ({p: name}): any;
    new ({p: boolean}): any;
}


//// [parameterDestructuringDeclaration.js]


//// [parameterDestructuringDeclaration.d.ts]
interface C {
    ({p: name}: {
        p: any;
    }): any;
    new ({p: boolean}: {
        p: any;
    }): any;
}
