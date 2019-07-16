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
declare var Strings_1: {
    a: string;
    b: string;
};
export declare const thing: string;
export declare const also: string;
export declare namespace desc {
    export const item: string;
}
export { Strings_1 as Strings };
