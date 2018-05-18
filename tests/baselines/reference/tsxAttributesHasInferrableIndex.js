//// [tsxAttributesHasInferrableIndex.tsx]
type AttributeValue = number | string | Date | boolean;
interface Attributes {
    [key: string]: AttributeValue;
}
function createElement(name: string, attributes: Attributes | undefined, ...contents: string[]) {
    return name;
}
namespace createElement.JSX {
    type Element = string;
}

function Button(attributes: Attributes | undefined, contents: string[]) {
    return '';
}
const b = <Button></Button>


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
