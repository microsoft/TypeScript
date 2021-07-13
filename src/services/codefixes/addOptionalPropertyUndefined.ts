/* @internal */
namespace ts.codefix {
    const addOptionalPropertyUndefined = "addOptionalPropertyUndefined";

    const errorCodes = [
        Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const typeChecker = context.program.getTypeChecker();
            const info = getInfo(context.sourceFile, context.span.start, typeChecker);
            if (!info.length) {
                return undefined;
            }
            // if method, it has to be rewritten to property
            // skip any and unions with any
            // add to existing unions
            // parenthesise conditional types and arrows (the printer should take care of that, but it needs a test)
            // test with destructuring, I've no idea what to do there
            const changes = textChanges.ChangeTracker.with(context, t => addUndefinedToOptionalProperty(t, info));
            return [createCodeFixAction(addOptionalPropertyUndefined, changes, Diagnostics.Add_undefined_to_optional_property_type, addOptionalPropertyUndefined, Diagnostics.Add_undefined_to_all_optional_properties)];
        },
        fixIds: [addOptionalPropertyUndefined],
        getAllCodeActions: context => {
            const { program } = context;
            const checker = program.getTypeChecker();
            const seen = new Map<string, true>();
            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                eachDiagnostic(context, errorCodes, diag => {
                    const info = getInfo(diag.file, diag.start, checker);
                    if (!info.length) {
                        return;
                    }
                    for (const add of info) {
                        if (addToSeen(seen, add.id + "")) {
                            addUndefinedToOptionalProperty(changes, info);
                        }
                    }
                });
            }));
        },
    });

    function getInfo(sourceFile: SourceFile, tokenPos: number, checker: TypeChecker): Symbol[] {
        // The target of the incorrect assignment
        // eg
        // this.definite = 1; -OR- definite = source
        // ^^^^                    ^^^^^^^^
        const targetToken = getTokenAtPosition(sourceFile, tokenPos);
        const isOK = (isIdentifier(targetToken) || isPrivateIdentifier(targetToken))
            && isBinaryExpression(targetToken.parent)
            && targetToken.parent.operatorToken.kind === SyntaxKind.EqualsToken;
        if (!isOK) {
            // TODO: Walk up through lhs instead
            return [];
        }
        const sourceNode = targetToken.parent.right;
        // TODO: Also can apply to function calls, and then you have to get the signature, then its parameters, then the type of a particular parameter
        // TODO: Also skip 'any' and node_modules and if target is not in node_modules or is built-in
        return checker.getExactOptionalUnassignableProperties(checker.getTypeAtLocation(sourceNode), checker.getTypeAtLocation(targetToken))
    }

    function addUndefinedToOptionalProperty(changes: textChanges.ChangeTracker, toAdd: Symbol[]) {
        for (const add of toAdd) {
            const d = add.valueDeclaration
            if (d && (isPropertySignature(d) || isPropertyDeclaration(d)) && d.type) {
                const t = factory.createUnionTypeNode([
                    ...d.type.kind === SyntaxKind.UnionType ? (d.type as UnionTypeNode).types : [d.type],
                    factory.createTypeReferenceNode("undefined")
                ])
                changes.replaceNode(d.getSourceFile(), d.type, t)
            }
        }
    }
}
