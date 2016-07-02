import {SemanticLintWalker} from "extension-api";

export default class IsValueFoo extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if (node.text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
    }
}