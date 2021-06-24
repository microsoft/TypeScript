// @target: esnext

class C {
    static {
        await; // illegal
    }
    static {
        await (1); // illegal
    }
    static {
        ({ [await]: 1 }); // illegal
    }
    static {
        class D {
            [await] = 1; // illegal (computed property names are evaluated outside of a class body
        };
    }
    static {
        ({ await }); // illegal short-hand property reference
    }
    static {
        await: // illegal, 'await' cannot be used as a label
        break await; // illegal, 'await' cannot be used as a label
    }
    static {
        function f(await) { }
        const ff = (await) => { }
        const fff = await => { }
    }
}
