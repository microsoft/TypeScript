import {SyntacticLintWalker} from "extension-api";

export default class IsNamedFoo extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
    }
}