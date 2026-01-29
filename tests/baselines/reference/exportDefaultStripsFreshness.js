//// [tests/cases/compiler/exportDefaultStripsFreshness.ts] ////

//// [items.ts]
export default {
    foob: "a"
}

export const q = {
    foob: "b"
}
//// [index.ts]
import B, {q} from "./items";

interface IFoo {
    foo: string;
}

function nFoo(x: IFoo) {}


nFoo(q); // for comparison

nFoo(B);


//// [items.js]
export default {
    foob: "a"
};
export const q = {
    foob: "b"
};
//// [index.js]
import B, { q } from "./items";
function nFoo(x) { }
nFoo(q); // for comparison
nFoo(B);
