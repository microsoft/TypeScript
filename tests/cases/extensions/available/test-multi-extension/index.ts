import {SyntacticLintWalker, SemanticLintWalker} from "extension-api";
import {LiteralType} from "typescript";

export class IsNamedFoo extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "foo") {
                error("Identifier 'foo' is forbidden.", node);
            }
        }
    }
}

export class IsNamedBar extends SyntacticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        if (node.kind === this.ts.SyntaxKind.Identifier) {
            if (node.text.toLowerCase() === "bar") {
                error("Identifier 'bar' is forbidden.", node);
            }
        }
    }
}

export class IsValueFoo extends SemanticLintWalker {
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

export class IsValueBar extends SemanticLintWalker {
    constructor(state) { super(state); }
    visit(node, error) {
        const type = this.checker.getTypeAtLocation(node);
        if (type.flags & this.ts.TypeFlags.StringLiteral) {
            if ((type as LiteralType).text === "bar") {
                error("String literal type 'bar' is forbidden.", node);
            }
        }
    }
}