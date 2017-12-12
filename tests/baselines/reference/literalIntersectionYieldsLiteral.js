//// [literalIntersectionYieldsLiteral.ts]
export type BaseAttribute<T> = {
    type?: string;
}
export type StringAttribute = BaseAttribute<string> & {
    type: "string";
}
export type NumberAttribute = BaseAttribute<string> & {
    type: "number";
}
export type Attribute = StringAttribute | NumberAttribute;

const foo: Attribute = {
    type: "string"
}


//// [literalIntersectionYieldsLiteral.js]
"use strict";
exports.__esModule = true;
var foo = {
    type: "string"
};
