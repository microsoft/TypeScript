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
    return name;
}
function Button(attributes, contents) {
    return '';
}
var b = createElement(Button, null);
