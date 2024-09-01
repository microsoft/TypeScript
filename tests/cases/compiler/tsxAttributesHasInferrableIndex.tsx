// @strict: true
// @jsx: react
// @jsxFactory: createElement
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
