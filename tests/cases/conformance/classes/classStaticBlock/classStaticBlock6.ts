class B {
    static a = 1;
}

class C extends B {
    static {
        let await = 1;
        let arguments = 1;
        let eval = 1;
    }

    static {
        await: if (true) {

        }

        arguments;
        await;
        super();
    }
}

class CC {
    constructor () {
        class C extends B {
            static {
                class CC extends B {
                    constructor () {
                        super();
                    }
                }
                super();
            }
        }
    }
}

async function foo () {
    class C extends B {
        static {
            arguments;
            await;

            async function ff () {
                arguments;
                await;
            }
        }
    }
}

function foo1 () {
    class C extends B {
        static {
            arguments;

            function ff () {
                arguments;
            }
        }
    }
}
