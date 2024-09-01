//// [tests/cases/compiler/tsxAttributesHasInferrableIndex.tsx] ////

//// [tsxAttributesHasInferrableIndex.tsx]
type AttributeValue = number | string | Date | boolean;
interface Attributes {
    [key: string]: AttributeValue;
}
function createElement(name: string, attributes: Attributes | undefined, ...contents: string[]) {
    return name;
}
namespace createElement {
    export namespace JSX {
        export type Element = string;
    }
}

function Button(attributes: Attributes | undefined, contents: string[]) {
    return '';
}
const b = <Button></Button>
const b2 = <Button someProp=""></Button>


//// [tsxAttributesHasInferrableIndex.js]
"use strict";
function createElement(name, attributes) {
    var contents = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        contents[_i - 2] = arguments[_i];
    }
    return name;
}
function Button(attributes, contents) {
    return '';
}
var b = createElement(Button, null);
var b2 = createElement(Button, { someProp: "" });
