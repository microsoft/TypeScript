// @declaration: true
// @filename: b.ts
export {
    Hash,
    StringHash, StringHash2
};

interface Hash<T> {
    [key: string]: T;
}

type StringHash = Hash<string>;

interface StringHash2 extends Hash<string> {}
// @filename: a.ts
import {StringHash, StringHash2} from "./b";

export {
    doSome
}

const MAP: StringHash = {
    a: "a"
};

const MAP2: StringHash2 = {
    a: "a"
};

function doSome(arg1: string,
                arg2 = MAP,
                arg3 = MAP2) {
}