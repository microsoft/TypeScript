//// [tests/cases/compiler/configFileExtendsAsList.ts] ////

//// [tsconfig1.json]
{
    "compilerOptions": {
        "strictNullChecks": true
    }
}

//// [tsconfig2.json]
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}

//// [index.ts]
function f(x) { } // noImplicitAny error
let y: string;
y.toLowerCase(); // strictNullChecks error

//// [index.js]
function f(x) { } // noImplicitAny error
var y;
y.toLowerCase(); // strictNullChecks error
