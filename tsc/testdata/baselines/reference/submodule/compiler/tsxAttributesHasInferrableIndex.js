//// [tests/cases/compiler/tsxAttributesHasInferrableIndex.tsx] ////

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
function createElement(name, attributes, ...contents) {
    return name;
}
function Button(attributes, contents) {
    return '';
}
const b = <Button></Button>;
