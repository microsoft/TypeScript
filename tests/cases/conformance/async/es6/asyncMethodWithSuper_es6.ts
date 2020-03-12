// @target: ES6
// @lib: esnext
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

        // property access in arrow
        (() => super.x());

        // element access in arrow
        (() => super["x"]());

        // property access in async arrow
        (async () => super.x());

        // element access in async arrow
        (async () => super["x"]());
    }

    async property_access_only_read_only() {
        // call with property access
        super.x();

        // property access (read)
        const a = super.x;

        // property access in arrow
        (() => super.x());

        // property access in async arrow
        (async () => super.x());
    }

    async property_access_only_write_only() {
        const f = () => {};

        // property access (assign)
        super.x = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // property access (assign) in arrow
        (() => super.x = f);

        // property access (assign) in async arrow
        (async () => super.x = f);
    }

    async element_access_only_read_only() {
        // call with element access
        super["x"]();

        // element access (read)
        const a = super["x"];

        // element access in arrow
        (() => super["x"]());

        // element access in async arrow
        (async () => super["x"]());
    }

    async element_access_only_write_only() {
        const f = () => {};

        // element access (assign)
        super["x"] = f;

        // destructuring assign with element access
        ({ f: super["x"] } = { f });

        // element access (assign) in arrow
        (() => super["x"] = f);

        // element access (assign) in async arrow
        (async () => super["x"] = f);
    }

    async * property_access_only_read_only_in_generator() {
        // call with property access
        super.x();

        // property access (read)
        const a = super.x;

        // property access in arrow
        (() => super.x());

        // property access in async arrow
        (async () => super.x());
    }

    async * property_access_only_write_only_in_generator() {
        const f = () => {};

        // property access (assign)
        super.x = f;

        // destructuring assign with property access
        ({ f: super.x } = { f });

        // property access (assign) in arrow
        (() => super.x = f);

        // property access (assign) in async arrow
        (async () => super.x = f);
    }

    async * element_access_only_read_only_in_generator() {
        // call with element access
        super["x"]();

        // element access (read)
        const a = super["x"];

        // element access in arrow
        (() => super["x"]());

        // element access in async arrow
        (async () => super["x"]());
    }

    async * element_access_only_write_only_in_generator() {
        const f = () => {};

        // element access (assign)
        super["x"] = f;

        // destructuring assign with element access
        ({ f: super["x"] } = { f });

        // element access (assign) in arrow
        (() => super["x"] = f);

        // element access (assign) in async arrow
        (async () => super["x"] = f);
    }
}
