//// [tests/cases/conformance/emitter/es2015/asyncGenerators/emitter.asyncGenerators.functionExpressions.es2015.ts] ////

//// [F1.ts]
const f1 = async function * () {
}
//// [F2.ts]
const f2 = async function * () {
    const x = yield;
}
//// [F3.ts]
const f3 = async function * () {
    const x = yield 1;
}
//// [F4.ts]
const f4 = async function * () {
    const x = yield* [1];
}
//// [F5.ts]
const f5 = async function * () {
    const x = yield* (async function*() { yield 1; })();
}
//// [F6.ts]
const f6 = async function * () {
    const x = await 1;
}
//// [F7.ts]
const f7 = async function * () {
    return 1;
}


//// [F1.js]
"use strict";
const f1 = async function* () {
};
//// [F2.js]
"use strict";
const f2 = async function* () {
    const x = yield;
};
//// [F3.js]
"use strict";
const f3 = async function* () {
    const x = yield 1;
};
//// [F4.js]
"use strict";
const f4 = async function* () {
    const x = yield* [1];
};
//// [F5.js]
"use strict";
const f5 = async function* () {
    const x = yield* (async function* () { yield 1; })();
};
//// [F6.js]
"use strict";
const f6 = async function* () {
    const x = await 1;
};
//// [F7.js]
"use strict";
const f7 = async function* () {
    return 1;
};
