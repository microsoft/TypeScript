//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck56.ts] ////

//// [generatorTypeCheck56.ts]
function* g() {
    var x = class C {
        *[yield 0]() {
            yield 0;
        }
    };
}

//// [generatorTypeCheck56.js]
function* g() {
    var x = class C {
        *[yield 0]() {
            yield 0;
        }
    };
}
