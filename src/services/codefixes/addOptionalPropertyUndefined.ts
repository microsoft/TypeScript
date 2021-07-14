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

    // The target of the incorrect assignment
    // eg
    // this.definite = 1; -OR- definite = source
    // ^^^^                    ^^^^^^^^
    // TODO: More examples here
    function getTarget(file: SourceFile, pos: number): MemberName | PropertyAccessExpression | undefined {
        const start = getTokenAtPosition(file, pos)
        return isPropertyAccessExpression(start.parent) && start.parent.expression === start ? start.parent
            : isIdentifier(start) || isPrivateIdentifier(start) ? start
            : undefined;
    }

    function getSourceTarget(target: Node | undefined, checker: TypeChecker): { source: Node, target: Node } | undefined {
        if (!target) return undefined
        if (isBinaryExpression(target.parent) && target.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
            return { source: target.parent.right, target: target.parent.left }
        }
        else if (isVariableDeclaration(target.parent) && target.parent.initializer) {
            return { source: target.parent.initializer, target: target.parent.name }
        }
        else if (isCallExpression(target.parent)) {
            const n = checker.getSymbolAtLocation(target.parent.expression)
            if (!n?.valueDeclaration) return undefined
            if (!isExpression(target)) return undefined;
            const i = target.parent.arguments.indexOf(target)
            const name = (n.valueDeclaration as any as SignatureDeclaration).parameters[i].name
            if (isIdentifier(name)) return { source: target, target: name }
        }
        else if (isPropertyAssignment(target.parent) && isIdentifier(target.parent.name) ||
            isShorthandPropertyAssignment(target.parent)) {
            const parentTarget = getSourceTarget(target.parent.parent, checker)
            if (!parentTarget) return undefined
            const prop = checker.getPropertyOfType(checker.getTypeAtLocation(parentTarget.target), (target.parent.name as Identifier).text)
            const declaration = prop?.declarations?.[0]
            if (!declaration) return undefined
            return {
                source: isPropertyAssignment(target.parent) ? target.parent.initializer : target.parent.name,
                target: declaration
            }
        }
        return undefined
    }

    function getInfo(file: SourceFile, pos: number, checker: TypeChecker): Symbol[] {
        const sourceTarget = getSourceTarget(getTarget(file, pos), checker)
        if (!sourceTarget) return []
        const { source: sourceNode, target: targetNode } = sourceTarget
        const target = checker.getTypeAtLocation(targetNode)
        if (target.symbol?.declarations?.some(d => getSourceFileOfNode(d).fileName.match(/(node_modules|^lib\.)/))) return [];
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
