//// [tests/cases/compiler/asyncFunctionReturnExpressionErrorSpans.ts] ////

//// [asyncFunctionReturnExpressionErrorSpans.ts]
interface Foo {
    bar: {
        baz: {
            inner: {
                thing: string
            }
        }
    }
}

async function asyncFoo(): Promise<Foo> {
    return {
        bar: {
            baz: {
                inner: {
                    thing: 1
                }
            }
        }
    }
}

//// [asyncFunctionReturnExpressionErrorSpans.js]
async function asyncFoo() {
    return {
        bar: {
            baz: {
                inner: {
                    thing: 1
                }
            }
        }
    };
}
