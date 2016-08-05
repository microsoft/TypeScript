import {SyntacticLintWalker} from "extension-api";

export default class IsNamedFooOrBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("FOO", "Identifier 'foo' is forbidden.", node);
            }
            if (node.text.toLowerCase() === "bar") {
                error("BAR", "Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class NoShortNames extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.length == 1) {
                error("SINGLE", "Single character identifiers are forbidden", node);
            }
            else if (node.text.length <= 3) {
                error("SHORT", "Short identifiers are forbidden.", node);
            }
        }
    }
}