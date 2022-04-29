// @filename: items.ts
export default {
    foob: "a"
}

export const q = {
    foob: "b"
}
// @filename: index.ts
import B, {q} from "./items";

interface IFoo {
    foo: string;
}

function nFoo(x: IFoo) {}


nFoo(q); // for comparison

nFoo(B);
