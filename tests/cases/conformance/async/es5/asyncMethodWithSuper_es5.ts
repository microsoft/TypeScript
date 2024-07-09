// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
class A {
    x() {
    }
    y() {
    }
}

class B extends A {
    // async method with only call/get on 'super' does not require a binding
    async simple() {
        // call with property access
        super.x();
        // call additional property.
        super.y();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];
    }

    // async method with assignment/destructuring on 'super' requires a binding
    async advanced() {
        const f = () => {};

        // call with property access
        super.x();

        // call with element access
        super["x"]();

        // property access (read)
        const a = super.x;

        // element access (read)
        const b = super["x"];

        // property access (assign)
        super.x = f;

        // element access (assign)
        super["x"] = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // destructuring assign with element access
        ({ f: super["x"] } = { f });
    }
}
