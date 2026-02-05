//// [tests/cases/conformance/emitter/es5/asyncGenerators/emitter.asyncGenerators.objectLiteralMethods.es5.ts] ////

//// [O1.ts]
const o1 = {
    async * f() {
    }
}
//// [O2.ts]
const o2 = {
    async * f() {
        const x = yield;
    }
}
//// [O3.ts]
const o3 = {
    async * f() {
        const x = yield 1;
    }
}
//// [O4.ts]
const o4 = {
    async * f() {
        const x = yield* [1];
    }
}
//// [O5.ts]
const o5 = {
    async * f() {
        const x = yield* (async function*() { yield 1; })();
    }
}
//// [O6.ts]
const o6 = {
    async * f() {
        const x = await 1;
    }
}
//// [O7.ts]
const o7 = {
    async * f() {
        return 1;
    }
}


//// [O1.js]
"use strict";
const o1 = {
    async *f() {
    }
};
//// [O2.js]
"use strict";
const o2 = {
    async *f() {
        const x = yield;
    }
};
//// [O3.js]
"use strict";
const o3 = {
    async *f() {
        const x = yield 1;
    }
};
//// [O4.js]
"use strict";
const o4 = {
    async *f() {
        const x = yield* [1];
    }
};
//// [O5.js]
"use strict";
const o5 = {
    async *f() {
        const x = yield* (async function* () { yield 1; })();
    }
};
//// [O6.js]
"use strict";
const o6 = {
    async *f() {
        const x = await 1;
    }
};
//// [O7.js]
"use strict";
const o7 = {
    async *f() {
        return 1;
    }
};
