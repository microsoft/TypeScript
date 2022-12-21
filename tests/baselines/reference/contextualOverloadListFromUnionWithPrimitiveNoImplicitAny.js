//// [contextualOverloadListFromUnionWithPrimitiveNoImplicitAny.ts]
// must target esnext for `String.normalize` to exist
type Validate = (text: string, pos: number, self: Rule) => number | boolean;
interface FullRule {
    validate: string | RegExp | Validate;
    normalize?: (match: {x: string}) => void;
}

type Rule = string | FullRule;

const obj: {field: Rule} = {
    field: {
        validate: (_t, _p, _s) => false,
        normalize: match => match.x,
    }
};

//// [contextualOverloadListFromUnionWithPrimitiveNoImplicitAny.js]
"use strict";
const obj = {
    field: {
        validate: (_t, _p, _s) => false,
        normalize: match => match.x,
    }
};
