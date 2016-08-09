import {SemanticLintWalker} from "extension-api";
import {LiteralType} from "typescript";

export default class IsValueFoo extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if ((type as LiteralType).text === "foo") {
                error("String literal type 'foo' is forbidden.", node);
            }
        }
    }
}