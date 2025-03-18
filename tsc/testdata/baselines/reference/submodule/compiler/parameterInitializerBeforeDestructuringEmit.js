//// [tests/cases/compiler/parameterInitializerBeforeDestructuringEmit.ts] ////

//// [parameterInitializerBeforeDestructuringEmit.ts]
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


//// [parameterInitializerBeforeDestructuringEmit.js]
function foobar({ bar = {}, ...opts } = {}) {
    "use strict";
    "Some other prologue";
    "use strict";
    "Some other prologue";
    opts.baz(bar);
}
class C {
    constructor({ bar = {}, ...opts } = {}) {
        "use strict";
        "Some other prologue";
        "use strict";
        "Some other prologue";
        opts.baz(bar);
    }
}
