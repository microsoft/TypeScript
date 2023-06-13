//// [tests/cases/compiler/slightlyIndirectedDeepObjectLiteralElaborations.ts] ////

//// [slightlyIndirectedDeepObjectLiteralElaborations.ts]
interface Foo {
    a: {
        b: {
            c: {
                d: string
            }
        }
    }
}

let q: Foo["a"] | undefined;
const x: Foo = (void 0, {
    a: q = {
        b: ({
            c: {
                d: 42
            }
        })
    }
});


//// [slightlyIndirectedDeepObjectLiteralElaborations.js]
var q;
var x = (void 0, {
    a: q = {
        b: ({
            c: {
                d: 42
            }
        })
    }
});
