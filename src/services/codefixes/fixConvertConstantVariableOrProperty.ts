/* @internal */
namespace ts.codefix {
    const fixId = "fixConvertConstantVariableOrProperty";
    const errorCodes = [
        Diagnostics.Cannot_assign_to_0_because_it_is_a_constant_or_a_read_only_property.code
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, span } = context;
            const { declaration, kind } = getDeclaration(sourceFile, span.start);
            if (!declaration || !kind) return undefined;

            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, declaration, kind));
            const type = kind === SyntaxKind.ConstKeyword ? "const" : "readonly";
            const changeTo = type === "const" ? "let" : "non-readonly";
            return [createCodeFixAction(fixId, changes, [Diagnostics.Change_0_to_1, type, changeTo], fixId, Diagnostics.Make_all_const_or_readonly_expressions_reassignable)];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const { declaration, kind } = getDeclaration(diag.file, diag.start);
            if (declaration && kind) doChange(changes, context.sourceFile, declaration, kind);
        }),
    });
    function getDeclaration(sourceFile: SourceFile, pos: number): {declaration: VariableStatement | PropertyDeclaration | undefined, kind: SyntaxKind | undefined } {
        const node = getTokenAtPosition(sourceFile, pos);
        const tokenName = node.getText();
        let declaration: VariableStatement | PropertyDeclaration | undefined;
        let kind: SyntaxKind | undefined;
        // The first parent of the property reassignment has [class].[prop]
        if (node.parent.getText().includes(".")) {
            declaration = findChild(sourceFile, (node) => node.kind === SyntaxKind.PropertyDeclaration
                && node.getText().includes(tokenName));
            kind = SyntaxKind.PropertyDeclaration;
        }
        // The first parent with const reaassignment has [variable] = [value]
        else if (node.parent.getText().includes("=")) {
            declaration = findChild(sourceFile, (node) => node.kind === SyntaxKind.VariableStatement
                && node.getText().includes("const") && node.getText().includes(tokenName));
            kind = SyntaxKind.ConstKeyword;
        }
        return { declaration, kind };
    }

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: VariableStatement | PropertyDeclaration, kind: SyntaxKind) {
        if (kind === SyntaxKind.ConstKeyword) {
            const constToken = findChild(node, node => node.kind === SyntaxKind.ConstKeyword);
            if (constToken) {
                const letToken = createToken(SyntaxKind.LetKeyword);
                changes.replaceNode(sourceFile, constToken, letToken);
            }
        }
        else if (kind === SyntaxKind.PropertyDeclaration) {
            const readonlyToken = findChild(node, node => node.kind === SyntaxKind.ReadonlyKeyword);
            if (readonlyToken) {
                changes.delete(sourceFile, readonlyToken);
            }
        }
    }

    export function findChild<T extends Node>(
        n: Node,
        test: (node: T) => boolean
    ): T | undefined {
        const child = find(n.getChildren(), (c): c is T => test(c as T));
        if (child) return child;
        return n.getChildren().map((c) => findChild(c, test)).filter(Boolean)[0];
    }
}
