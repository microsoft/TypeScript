// @noImplicitUseStrict: false
// @alwaysStrict: true
interface Foo {
    bar?: any;
    baz?: any;
}

function foobar({ bar = {}, ...opts }: Foo = {}) {
    "use strict";
    "Some other prologue";
    opts.baz(bar);
}

class C {
    constructor({ bar = {}, ...opts }: Foo = {}) {
        "use strict";
        "Some other prologue";
        opts.baz(bar);
    }
}
