//// [computedPropertyNames30_ES6.ts]
class Base {
}
class C extends Base {
    constructor() {
        super();
        () => {
            var obj = {
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                [(super(), "prop")]() { }
            };
        }
    }
}

//// [computedPropertyNames30_ES6.js]
class Base {
}
class C extends Base {
    constructor() {
        super();
        () => {
            var obj = {
                // Ideally, we would capture this. But the reference is
                // illegal, and not capturing this is consistent with
                //treatment of other similar violations.
                [(super(), "prop")]() { }
            };
        };
    }
}
