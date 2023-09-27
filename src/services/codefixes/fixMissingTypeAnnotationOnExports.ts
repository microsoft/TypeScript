import {
    ArrayBindingPattern,
    BindingElement,
    BindingPattern,
    ClassDeclaration,
    CodeFixAction,
    CodeFixAllContext,
    CodeFixContext,
    createPrinterWithRemoveComments,
    Debug,
    defaultMaximumTruncationLength,
    DiagnosticAndArguments,
    DiagnosticOrDiagnosticAndArguments,
    Diagnostics,
    EmitHint,
    EntityName,
    ExportAssignment,
    Expression,
    ExpressionWithTypeArguments,
    factory,
    FileTextChanges,
    findAncestor,
    GeneratedIdentifierFlags,
    getEmitScriptTarget,
    getSourceFileOfNode,
    getTokenAtPosition,
    getTrailingCommentRanges,
    hasSyntacticModifier,
    Identifier,
    isArrayBindingPattern,
    isComputedPropertyName,
    isDeclaration,
    isEntityNameExpression,
    isExpression,
    isIdentifier,
    isObjectBindingPattern,
    isOmittedExpression,
    isShorthandPropertyAssignment,
    isValueSignatureDeclaration,
    isVariableDeclaration,
    ModifierFlags,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFlags,
    ObjectBindingPattern,
    ParameterDeclaration,
    PropertyDeclaration,
    SignatureDeclaration,
    SourceFile,
    SyntaxKind,
    textChanges,
    TextSpan,
    Type,
    TypeChecker,
    TypeNode,
    VariableDeclaration,
    VariableStatement,
} from "../_namespaces/ts";
import {
    createCodeFixAction,
    createCombinedCodeActions,
    createImportAdder,
    eachDiagnostic,
    registerCodeFix,
    typeToAutoImportableTypeNode,
} from "../_namespaces/ts.codefix";

const fixId = "fixMissingTypeAnnotationOnExports";
const addAnnotationFix = "add-annotation";
const addInlineTypeAssertion = "add-type-assertion";
const errorCodes = [
    Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code,
    Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function.code,
];
const canHaveExplicitTypeAnnotation = new Set<SyntaxKind>([
    SyntaxKind.GetAccessor,
    SyntaxKind.MethodDeclaration,
    SyntaxKind.PropertyDeclaration,
    SyntaxKind.FunctionDeclaration,
    SyntaxKind.FunctionExpression,
    SyntaxKind.ArrowFunction,
    SyntaxKind.VariableDeclaration,
    SyntaxKind.Parameter,
    SyntaxKind.ExportAssignment,
    SyntaxKind.ClassDeclaration,
    SyntaxKind.ObjectBindingPattern,
    SyntaxKind.ArrayBindingPattern,
]);

const declarationEmitNodeBuilderFlags = NodeBuilderFlags.MultilineObjectLiterals
    | NodeBuilderFlags.WriteClassExpressionAsTypeLiteral
    | NodeBuilderFlags.UseTypeOfFunction
    | NodeBuilderFlags.UseStructuralFallback
    | NodeBuilderFlags.AllowEmptyTuple
    | NodeBuilderFlags.GenerateNamesForShadowedTypeParams
    | NodeBuilderFlags.NoTruncation
    | NodeBuilderFlags.AllowUniqueESSymbolType;

registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const fixes: CodeFixAction[] = [];

        addCodeAction(addAnnotationFix, fixes, context, "full", f => f.addFullAnnotation(context.span));
        addCodeAction(addAnnotationFix, fixes, context, "relative", f => f.addFullAnnotation(context.span));
        addCodeAction(addInlineTypeAssertion, fixes, context, "full", f => f.addInlineAnnotation(context.span));
        addCodeAction(addInlineTypeAssertion, fixes, context, "relative", f => f.addInlineAnnotation(context.span));

        return fixes;
    },
    getAllCodeActions: context => {
        const changes = withChanges(context, "full", f => {
            eachDiagnostic(context, errorCodes, diag => {
                f.addFullAnnotation(diag);
            });
        });
        return createCombinedCodeActions(changes.textChanges);
    },
});
interface Fixer {
    addFullAnnotation(span: TextSpan): DiagnosticOrDiagnosticAndArguments | undefined;
    addInlineAnnotation(span: TextSpan): DiagnosticOrDiagnosticAndArguments | undefined;
}

function addCodeAction(
    fixName: string,
    fixes: CodeFixAction[],
    context: CodeFixContext | CodeFixAllContext,
    typePrinter: "relative" | "full",
    cb: (fixer: Fixer) => DiagnosticOrDiagnosticAndArguments | undefined,
) {
    const changes = withChanges(context, typePrinter, cb);
    if (changes.result) {
        fixes.push(
            createCodeFixAction(
                fixName,
                changes.textChanges,
                changes.result,
                fixId,
                Diagnostics.Add_all_missing_tye_annotations,
            ),
        );
    }
}
function withChanges<T>(
    context: CodeFixContext | CodeFixAllContext,
    typePrinter: "relative" | "full",
    cb: (fixer: Fixer) => T,
): {
    textChanges: FileTextChanges[];
    result: T;
} {
    const changeTracker = textChanges.ChangeTracker.fromContext(context);
    const sourceFile: SourceFile = context.sourceFile;
    const program = context.program;
    const typeChecker: TypeChecker = program.getTypeChecker();
    const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
    const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
    const fixedNodes = new Set<Node>();

    const result = cb({ addFullAnnotation, addInlineAnnotation });
    importAdder.writeFixes(changeTracker);
    return {
        result,
        textChanges: changeTracker.getChanges(),
    };

    function addFullAnnotation(span: TextSpan) {
        const nodeWithDiag = getTokenAtPosition(sourceFile, span.start);
        const nodeWithNoType = findNearestParentWithTypeAnnotation(nodeWithDiag);
        if (nodeWithNoType) {
            return fixupForIsolatedDeclarations(nodeWithNoType);
        }
        return undefined;
    }
    function addInlineAnnotation(span: TextSpan): DiagnosticOrDiagnosticAndArguments | undefined {
        const nodeWithDiag = getTokenAtPosition(sourceFile, span.start);
        const targetNode = findTargetErrorNode(nodeWithDiag, span) as Expression;
        if (!targetNode) return;
        const isExpressionTarget = isExpression(targetNode);
        const isShorthandPropertyAssignmentTarget = isIdentifier(targetNode) && isShorthandPropertyAssignment(targetNode.parent);
        if (!(isExpressionTarget || isShorthandPropertyAssignment)) return undefined;

        const typeNode = inferNodeType(targetNode);
        if (!typeNode) return undefined;

        let replacementNode: Node;
        let replacementTarget: Node;
        if (isShorthandPropertyAssignmentTarget) {
            replacementTarget = targetNode.parent;
            replacementNode = factory.createPropertyAssignment(
                targetNode,
                factory.createAsExpression(
                    targetNode,
                    typeNode,
                ),
            );
        }
        else if (isExpressionTarget) {
            replacementTarget = targetNode;
            replacementNode = factory.createAsExpression(
                targetNode,
                typeNode,
            );
        }
        else {
            Debug.assertNever(targetNode);
        }
        changeTracker.replaceNode(
            sourceFile,
            replacementTarget,
            replacementNode,
        );
        return [Diagnostics.Add_inline_type_assertion_to_0, printTypeNode(typeNode)];
    }

    function findTargetErrorNode(node: Node, span: TextSpan) {
        while (
            node &&
            node.end < span.start + span.length
        ) {
            node = node.parent;
        }
        return node;
    }
    // Currently, the diagnostics for the error is not given in the exact node of which that needs type annotation.
    // If this is coming from an ill-formed AST with syntax errors, you cannot assume that it'll find a node
    // to annotate types, this will return undefined - meaning that it couldn't find the node to annotate types.
    function findNearestParentWithTypeAnnotation(node: Node): Node | undefined {
        while (
            node &&
            (((isObjectBindingPattern(node) || isArrayBindingPattern(node)) &&
                !isVariableDeclaration(node.parent)) || !canHaveExplicitTypeAnnotation.has(node.kind))
        ) {
            node = node.parent;
        }
        return node;
    }

    /**
     * Fixes up to support IsolatedDeclaration by either adding types when possible, or splitting statements and add type annotations
     * for the places that cannot have type annotations (e.g. HeritageClause, default exports, ...)
     */
    function fixupForIsolatedDeclarations(node: Node): DiagnosticOrDiagnosticAndArguments | undefined {
        if (fixedNodes?.has(node)) return undefined;
        fixedNodes?.add(node);
        switch (node.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.VariableDeclaration:
                const decl = node as ParameterDeclaration | PropertyDeclaration | VariableDeclaration;
                return addTypeAnnotation(decl);
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return addTypeToFunctionLikeDeclaration(node as SignatureDeclaration, sourceFile);
            case SyntaxKind.ExportAssignment:
                const defaultExport = node as ExportAssignment;
                if (!defaultExport.isExportEquals) {
                    const type = typeChecker.getTypeAtLocation(defaultExport.expression);
                    const typeNode = typeToTypeNode(type, node);
                    changeTracker.replaceNodeWithNodes(sourceFile, node, [
                        factory.createVariableStatement(
                            /*modifiers*/ undefined,
                            factory.createVariableDeclarationList(
                                [factory.createVariableDeclaration(
                                    "__default",
                                    /*exclamationToken*/ undefined,
                                    typeNode,
                                    defaultExport.expression,
                                )],
                                NodeFlags.Const,
                            ),
                        ),
                        factory.updateExportAssignment(defaultExport, defaultExport?.modifiers, factory.createIdentifier("__default")),
                    ]);
                    return [
                        Diagnostics.Extract_default_export_to_variable,
                    ];
                }
                break;
            // Handling expression like heritage clauses e.g. class A extends mixin(B) ..
            case SyntaxKind.ClassDeclaration:
                return handleClassDeclaration(node as ClassDeclaration, node.parent.parent as ExpressionWithTypeArguments);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return transformDestructuringPatterns(node as BindingPattern);
            default:
                throw new Error(`Cannot find a fix for the given node ${node.kind}`);
        }
    }

    function addTypeToFunctionLikeDeclaration(func: SignatureDeclaration, sourceFile: SourceFile): undefined | DiagnosticOrDiagnosticAndArguments {
        if (func.type) {
            return;
        }

        const type = tryGetReturnType(func);
        if (!type) {
            return;
        }
        const typeNode = typeToTypeNode(type, func);
        addTypesToParametersArray(func.parameters);
        if (typeNode) {
            changeTracker.tryInsertTypeAnnotation(
                sourceFile,
                func,
                typeNode,
            );
            return [Diagnostics.Add_return_type_0, printTypeNode(typeNode)];
        }
    }

    function handleClassDeclaration(classDecl: ClassDeclaration, heritageExpression: ExpressionWithTypeArguments): DiagnosticAndArguments {
        if (heritageExpression.kind !== SyntaxKind.ExpressionWithTypeArguments) {
            throw new Error(`Hey + ${heritageExpression.kind}`);
        }
        const heritageTypeNode = typeToTypeNode(
            typeChecker.getTypeAtLocation(heritageExpression.expression),
            heritageExpression.expression,
        );

        const heritageVariableName = factory.createUniqueName(
            classDecl.name ? classDecl.name.text + "Base" : "Anonymous",
            GeneratedIdentifierFlags.Optimistic,
        );
        // e.g. const Point3DBase: typeof Point2D = mixin(Point2D);
        const heritageVariable = factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                    heritageVariableName,
                    /*exclamationToken*/ undefined,
                    heritageTypeNode,
                    heritageExpression.expression,
                )],
                NodeFlags.Const,
            ),
        );
        // const touchingToken = getTouchingToken(heritageExpression);
        changeTracker.insertNodeBefore(sourceFile, classDecl, heritageVariable);
        const trailingComments = getTrailingCommentRanges(sourceFile.text, heritageExpression.end);
        const realEnd = trailingComments?.[trailingComments.length - 1]?.end ?? heritageExpression.end;
        changeTracker.replaceRange(
            sourceFile,
            {
                pos: heritageExpression.getFullStart(),
                end: realEnd,
            },
            heritageVariableName,
            {
                prefix: " ",
            },
        );
        return [Diagnostics.Extract_base_class_to_variable];
    }

    interface ExpressionReverseChain {
        element?: BindingElement;
        parent?: ExpressionReverseChain;
        expression: SubExpression;
    }

    const enum ExpressionType {
        TEXT = 0,
        COMPUTED = 1,
        ARRAY_ACCESS = 2,
        IDENTIFIER = 3,
    }

    type SubExpression =
        | { kind: ExpressionType.TEXT; text: string; }
        | { kind: ExpressionType.COMPUTED; computed: Expression; }
        | { kind: ExpressionType.ARRAY_ACCESS; arrayIndex: number; }
        | { kind: ExpressionType.IDENTIFIER; identifier: Identifier; };

    function transformDestructuringPatterns(bindingPattern: BindingPattern): DiagnosticOrDiagnosticAndArguments | undefined {
        const enclosingVariableDeclaration = bindingPattern.parent as VariableDeclaration;
        const enclosingVarStmt = bindingPattern.parent.parent.parent as VariableStatement;
        if (!enclosingVariableDeclaration.initializer) return undefined;

        let baseExpr: ExpressionReverseChain;
        const newNodes: Node[] = [];
        if (!isIdentifier(enclosingVariableDeclaration.initializer)) {
            // For complex expressions we want to create a temporary variable
            const tempHolderForReturn = factory.createUniqueName("dest", GeneratedIdentifierFlags.Optimistic);
            baseExpr = { expression: { kind: ExpressionType.IDENTIFIER, identifier: tempHolderForReturn } };
            newNodes.push(factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList(
                    [factory.createVariableDeclaration(
                        tempHolderForReturn,
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        enclosingVariableDeclaration.initializer,
                    )],
                    NodeFlags.Const,
                ),
            ));
        }
        else {
            // If we are destructuring an identifier, just use that. No need for temp var.
            baseExpr = { expression: { kind: ExpressionType.IDENTIFIER, identifier: enclosingVariableDeclaration.initializer } };
        }

        const bindingElements: ExpressionReverseChain[] = [];
        if (isArrayBindingPattern(bindingPattern)) {
            addArrayBindingPatterns(bindingPattern, bindingElements, baseExpr);
        }
        else {
            addObjectBindingPatterns(bindingPattern, bindingElements, baseExpr);
        }

        const expressionToVar = new Map<Expression, Identifier>();

        let i = 0;
        while (i < bindingElements.length) {
            const bindingElement = bindingElements[i];

            if (bindingElement.element!.propertyName && isComputedPropertyName(bindingElement.element!.propertyName)) {
                const computedExpression = bindingElement.element!.propertyName.expression;
                const identifierForComputedProperty = factory.getGeneratedNameForNode(computedExpression);
                const variableDecl = factory.createVariableDeclaration(
                    identifierForComputedProperty,
                    /*exclamationToken*/ undefined,
                    /*type*/ undefined,
                    computedExpression,
                );
                const variableList = factory.createVariableDeclarationList([variableDecl], NodeFlags.Const);
                const variableStatement = factory.createVariableStatement(/*modifiers*/ undefined, variableList);
                newNodes.push(variableStatement);
                expressionToVar.set(computedExpression, identifierForComputedProperty);
            }

            // Name is the RHS of : in case colon exists, otherwise it's just the name of the destructuring
            const name = bindingElement.element!.name;
            // isBindingPattern
            if (isArrayBindingPattern(name)) {
                addArrayBindingPatterns(name, bindingElements, bindingElement);
            }
            else if (isObjectBindingPattern(name)) {
                addObjectBindingPatterns(name, bindingElements, bindingElement);
            }
            else {
                const typeNode = typeToTypeNode(typeChecker.getTypeAtLocation(name), name);
                let variableInitializer = createChainedExpression(bindingElement, expressionToVar);
                if (bindingElement.element!.initializer) {
                    const propertyName = bindingElement.element?.propertyName;
                    const tempName = factory.createUniqueName(
                        propertyName && isIdentifier(propertyName) ? propertyName.text : "temp",
                        GeneratedIdentifierFlags.Optimistic,
                    );
                    newNodes.push(factory.createVariableStatement(
                        /*modifiers*/ undefined,
                        factory.createVariableDeclarationList(
                            [factory.createVariableDeclaration(
                                tempName,
                                /*exclamationToken*/ undefined,
                                /*type*/ undefined,
                                variableInitializer,
                            )],
                            NodeFlags.Const,
                        ),
                    ));
                    variableInitializer = factory.createConditionalExpression(
                        factory.createBinaryExpression(
                            tempName,
                            factory.createToken(SyntaxKind.EqualsEqualsEqualsToken),
                            factory.createIdentifier("undefined"),
                        ),
                        factory.createToken(SyntaxKind.QuestionToken),
                        bindingElement.element!.initializer,
                        factory.createToken(SyntaxKind.ColonToken),
                        variableInitializer,
                    );
                }
                const exportModifier = hasSyntacticModifier(enclosingVarStmt, ModifierFlags.Export) ?
                    [factory.createToken(SyntaxKind.ExportKeyword)] :
                    undefined;
                newNodes.push(factory.createVariableStatement(
                    exportModifier,
                    factory.createVariableDeclarationList(
                        [factory.createVariableDeclaration(
                            name,
                            /*exclamationToken*/ undefined,
                            typeNode,
                            variableInitializer,
                        )],
                        NodeFlags.Const,
                    ),
                ));
            }
            ++i;
        }

        if (enclosingVarStmt.declarationList.declarations.length > 1) {
            newNodes.push(factory.updateVariableStatement(
                enclosingVarStmt,
                enclosingVarStmt.modifiers,
                factory.updateVariableDeclarationList(
                    enclosingVarStmt.declarationList,
                    enclosingVarStmt.declarationList.declarations.filter(node => node !== bindingPattern.parent),
                ),
            ));
        }
        changeTracker.replaceNodeWithNodes(sourceFile, enclosingVarStmt, newNodes);
        return [
            Diagnostics.Extract_binding_expressions_to_variable,
        ];
    }

    function addArrayBindingPatterns(bindingPattern: ArrayBindingPattern, bindingElements: ExpressionReverseChain[], parent: ExpressionReverseChain) {
        for (let i = 0; i < bindingPattern.elements.length; ++i) {
            const element = bindingPattern.elements[i];
            if (isOmittedExpression(element)) {
                continue;
            }
            bindingElements.push({
                element,
                parent,
                expression: { kind: ExpressionType.ARRAY_ACCESS, arrayIndex: i },
            });
        }
    }

    function addObjectBindingPatterns(bindingPattern: ObjectBindingPattern, bindingElements: ExpressionReverseChain[], parent: ExpressionReverseChain) {
        for (const bindingElement of bindingPattern.elements) {
            let name: string;
            if (bindingElement.propertyName) {
                if (isComputedPropertyName(bindingElement.propertyName)) {
                    bindingElements.push({
                        element: bindingElement,
                        parent,
                        expression: { kind: ExpressionType.COMPUTED, computed: bindingElement.propertyName.expression },
                    });
                    continue;
                }
                else {
                    name = bindingElement.propertyName.text;
                }
            }
            else {
                name = (bindingElement.name as Identifier).text;
            }
            bindingElements.push({
                element: bindingElement,
                parent,
                expression: { kind: ExpressionType.TEXT, text: name },
            });
        }
    }

    function createChainedExpression(expression: ExpressionReverseChain, expressionToVar: Map<Expression, Identifier>): Expression {
        const reverseTraverse: ExpressionReverseChain[] = [expression];
        while (expression.parent) {
            expression = expression.parent;
            reverseTraverse.push(expression);
        }
        let chainedExpression: Expression = (reverseTraverse[reverseTraverse.length - 1].expression as { identifier: Identifier; }).identifier;
        for (let i = reverseTraverse.length - 2; i >= 0; --i) {
            const nextSubExpr = reverseTraverse[i].expression;
            if (nextSubExpr.kind === ExpressionType.TEXT) {
                chainedExpression = factory.createPropertyAccessChain(
                    chainedExpression,
                    /*questionDotToken*/ undefined,
                    factory.createIdentifier(nextSubExpr.text),
                );
            }
            else if (nextSubExpr.kind === ExpressionType.COMPUTED) {
                chainedExpression = factory.createElementAccessExpression(
                    chainedExpression,
                    expressionToVar.get(nextSubExpr.computed)!,
                );
            }
            else if (nextSubExpr.kind === ExpressionType.ARRAY_ACCESS) {
                chainedExpression = factory.createElementAccessExpression(
                    chainedExpression,
                    nextSubExpr.arrayIndex,
                );
            }
        }
        return chainedExpression;
    }

    function inferNodeType(node: Node) {
        if (typePrinter === "full") {
            const type = isValueSignatureDeclaration(node) ?
                tryGetReturnType(node) :
                typeChecker.getTypeAtLocation(node);
            if (!type) {
                return undefined;
            }
            return typeToTypeNode(type, findAncestor(node, isDeclaration) ?? sourceFile);
        }
        else {
            return relativeType(node);
        }
    }

    function relativeType(node: Node) {
        if (isEntityNameExpression(node)) {
            return factory.createTypeQueryNode(node as EntityName);
        }

        return undefined;
    }

    function typeToTypeNode(type: Type, enclosingDeclaration: Node) {
        return typeToAutoImportableTypeNode(typeChecker, importAdder, type, enclosingDeclaration, scriptTarget, declarationEmitNodeBuilderFlags);
    }

    function tryGetReturnType(node: SignatureDeclaration): Type | undefined {
        const signature = typeChecker.getSignatureFromDeclaration(node);
        if (signature) {
            return typeChecker.getReturnTypeOfSignature(signature);
        }
    }

    function addTypesToParametersArray(nodeArray: NodeArray<ParameterDeclaration> | undefined) {
        if (nodeArray === undefined) return;
        nodeArray.forEach(param => fixupForIsolatedDeclarations(param));
    }

    function addTypeAnnotation(decl: ParameterDeclaration | VariableDeclaration | PropertyDeclaration): undefined | DiagnosticOrDiagnosticAndArguments {
        if (decl.type) return undefined;

        const type = typeChecker.getTypeAtLocation(decl);
        if (type) {
            const typeNode = typeToTypeNode(type, decl);
            if (typeNode) {
                changeTracker.tryInsertTypeAnnotation(getSourceFileOfNode(decl), decl, typeNode);
                return [Diagnostics.Add_annotation_of_type_0, printTypeNode(typeNode)];
            }
        }
    }
    function printTypeNode(node: TypeNode) {
        const printer = createPrinterWithRemoveComments();
        const result = printer.printNode(EmitHint.Unspecified, node, sourceFile);
        if (result.length > defaultMaximumTruncationLength) {
            return result.substr(0, defaultMaximumTruncationLength - "...".length) + "...";
        }
        return result;
    }
}
