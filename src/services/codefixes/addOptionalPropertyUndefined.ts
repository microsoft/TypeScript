/* @internal */
namespace ts.codefix {
    const addOptionalPropertyUndefined = "addOptionalPropertyUndefined";

    const errorCodes = [
        Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code,
        Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties.code
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

    function getTarget(file: SourceFile, pos: number) {
        const start = getTokenAtPosition(file, pos)
        if (isPropertyAccessExpression(start.parent) && start.parent.expression === start) {
            return start.parent
        }
        else if (isIdentifier(start) || isPrivateIdentifier(start)) {
            return start
        }
        return undefined
    }

    function getSourceTarget(file: SourceFile, pos: number, checker: TypeChecker) {
        const target = getTarget(file, pos)
        if (!target) return undefined
        if (isBinaryExpression(target.parent) && target.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            return [target.parent.right, target]
        }
        else if (isCallExpression(target.parent)) {
            const n = checker.getSymbolAtLocation(target.parent.expression)
            if (!n?.valueDeclaration) return undefined
            if (!isIdentifier(target)) return undefined;
            const i = target.parent.arguments.indexOf(target)
            const name = (n.valueDeclaration as any as SignatureDeclaration).parameters[i].name
            if (isIdentifier(name)) return [target, name]
        }
        // It's possible to handle destructuring by recording the path up through the structure
        // and following the reverse path down through the right-hand-side, but that's not worth the effort
        return undefined
    }

    function getInfo(file: SourceFile, pos: number, checker: TypeChecker): Symbol[] {
        // The target of the incorrect assignment
        // eg
        // this.definite = 1; -OR- definite = source
        // ^^^^                    ^^^^^^^^
        const sourceTarget = getSourceTarget(file, pos, checker)
        if (!sourceTarget) return []
        const [sourceNode, targetNode] = sourceTarget
        const target = checker.getTypeAtLocation(targetNode)
        if (target.symbol?.declarations?.some(d => getSourceFileOfNode(d).fileName.match(/(node_modules|^lib)/))) return [];
        return checker.getExactOptionalUnassignableProperties(checker.getTypeAtLocation(sourceNode), target)
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
