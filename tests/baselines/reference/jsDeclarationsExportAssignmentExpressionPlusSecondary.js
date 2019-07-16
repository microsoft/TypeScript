//// [index.js]
const Strings = {
    a: "A",
    b: "B"
};
module.exports = {
    thing: "ok",
    also: "ok",
    desc: {
        item: "ok"
    }
};
module.exports.Strings = Strings;


//// [index.js]
var Strings = {
    a: "A",
    b: "B"
};
module.exports = {
    thing: "ok",
    also: "ok",
    desc: {
        item: "ok"
    }
};
module.exports.Strings = Strings;


//// [index.d.ts]
export declare const thing: string;
export declare const also: string;
export declare namespace desc {
    export const item: string;
}
declare var Strings_1: {
    a: string;
    b: string;
};
export { Strings_1 as Strings };
