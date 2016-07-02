import {SyntacticLintWalker} from "extension-api";

export default class IsNamedX extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, stop, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            for (let i = 0; i<this.args.length; i++) {
                if (node.text.toLowerCase() === this.args[i]) {
                    error(`Identifier ${this.args[i]} is forbidden.`, node);
                }
            }
        }
    }
}