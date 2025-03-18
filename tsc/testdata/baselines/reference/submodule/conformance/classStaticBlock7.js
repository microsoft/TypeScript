//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock7.ts] ////

//// [classStaticBlock7.ts]
class C {
    static {
        await 1;
        yield 1;
        return 1;
    }
}

async function f1 () {
    class C {
        static {
            await 1;

            async function ff () {
                await 1;
            }
        }
    }
}

function * f2 () {
    class C {
        static {
            yield 1;

            function * ff () {
                yield 1;
            }
        }
    }
}

function f3 () {
    class C {
        static {
            return 1;

            function ff () {
                return 1
            }
        }
    }
}


//// [classStaticBlock7.js]
class C {
    static {
        await 1;
        yield 1;
        return 1;
    }
}
async function f1() {
    class C {
        static {
            await 1;
            async function ff() {
                await 1;
            }
        }
    }
}
function* f2() {
    class C {
        static {
            yield 1;
            function* ff() {
                yield 1;
            }
        }
    }
}
function f3() {
    class C {
        static {
            return 1;
            function ff() {
                return 1;
            }
        }
    }
}
