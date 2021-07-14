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
