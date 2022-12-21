// ==ORIGINAL==

import { fn } from "./module";
function /*[#|*/f/*|]*/() {
    return Promise.resolve(0).then(fn);
}

// ==ASYNC FUNCTION::Convert to async function==

import { fn } from "./module";
async function f() {
    const res = await Promise.resolve(0);
    return fn(res);
}
