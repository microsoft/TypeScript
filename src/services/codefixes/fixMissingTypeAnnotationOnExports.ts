import {
    ArrayBindingPattern,
    BindingElement,
    BindingPattern,
    ClassDeclaration,
    CodeFixAllContext,
    CodeFixContext,
    Diagnostics,
    ExportAssignment,
    Expression,
    ExpressionWithTypeArguments,
    factory,
    GeneratedIdentifierFlags,
    getEmitScriptTarget,
    getSourceFileOfNode,
    getTokenAtPosition,
    getTrailingCommentRanges,
    Identifier,
    isArrayBindingPattern,
    isArrowFunction,
    isComputedPropertyName,
    isFunctionExpression,
    isObjectBindingPattern,
    isOmittedExpression,
    isVariableDeclaration,
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
    Type,
    TypeChecker,
    VariableDeclaration,
    VariableStatement,
} from "../_namespaces/ts";
import {
    codeFixAll,
    createCodeFixAction,
    createCombinedCodeActions,
    createImportAdder,
    eachDiagnostic,
    ImportAdder,
    registerCodeFix,
    typeToAutoImportableTypeNode,
} from "../_namespaces/ts.codefix";

const fixId = "fixMissingTypeAnnotationOnExports";
const errorCodes = [
    Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code,
    Diagnostics.Assigning_properties_to_functions_without_declaring_them_is_not_supported_with_isolatedDeclarations_Add_an_explicit_declaration_for_the_properties_assigned_to_this_function.code,
];
const canHaveExplicitTypeAnnotation = new Set<SyntaxKind>([
    SyntaxKind.GetAccessor,
    SyntaxKind.MethodDeclaration,
    SyntaxKind.PropertyDeclaration,
    SyntaxKind.FunctionDeclaration,
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
        const { sourceFile, span } = context;
        const nodeWithDiag = getTokenAtPosition(sourceFile, span.start);

        const changes = textChanges.ChangeTracker.with(context, t => {
            const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
            doChange(t, context, nodeWithDiag, importAdder);
            importAdder.writeFixes(t);
        });
        return [
            createCodeFixAction(
                fixId,
                changes,
                Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit,
                fixId,
                Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit,
            ),
        ];
    },
    getAllCodeActions: context => {
        const changes = textChanges.ChangeTracker.with(context, t => {
            const importAdder = createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
            eachDiagnostic(context, errorCodes, diag => {
                const nodeWithDiag = getTokenAtPosition(diag.file, diag.start);
                doChange(t, context, nodeWithDiag, importAdder);
            });
            importAdder.writeFixes(t);
        });
        return createCombinedCodeActions(changes);
    },
});

function doChange(changes: textChanges.ChangeTracker, context: CodeFixContext | CodeFixAllContext, nodeWithDiag: Node, importAdder: ImportAdder): void {
    const nodeWithNoType = findNearestParentWithTypeAnnotation(nodeWithDiag);
    if (nodeWithNoType) {
        fixupForIsolatedDeclarations(nodeWithNoType, nodeWithDiag, context, changes, importAdder);
    }
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
function fixupForIsolatedDeclarations(node: Node, nodeWithDiag: Node, context: CodeFixContext | CodeFixAllContext, changes: textChanges.ChangeTracker, importAdder: ImportAdder) {
    const sourceFile: SourceFile = context.sourceFile;
    const program = context.program;
    const typeChecker: TypeChecker = program.getTypeChecker();
    const scriptTarget = getEmitScriptTarget(program.getCompilerOptions());
    switch (node.kind) {
        case SyntaxKind.Parameter:
            const parameter = node as ParameterDeclaration;
            addTypeToParameterDeclaration(parameter);
            break;
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.VariableDeclaration:
            const variableDeclaration = node as VariableDeclaration | PropertyDeclaration;
            if (!variableDeclaration.type) {
                if (variableDeclaration.initializer && (isFunctionExpression(variableDeclaration.initializer) || isArrowFunction(variableDeclaration.initializer))) {
                    addTypeToFunctionLikeDeclaration(variableDeclaration.initializer, sourceFile);
                }
                else {
                    const type = typeChecker.getTypeAtLocation(variableDeclaration);
                    const typeNode = typeToTypeNode(type, variableDeclaration);
                    if (typeNode) {
                        changes.tryInsertTypeAnnotation(sourceFile, variableDeclaration, typeNode);
                    }
                }
            }
            break;
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            addTypeToFunctionLikeDeclaration(node as SignatureDeclaration, sourceFile);
            break;
        case SyntaxKind.ExportAssignment:
            const defaultExport = node as ExportAssignment;
            if (!defaultExport.isExportEquals) {
                const type = typeChecker.getTypeAtLocation(defaultExport.expression);
                const typeNode = typeToTypeNode(type, node);
                return changes.replaceNodeWithNodes(sourceFile, node, [
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
            }
            break;
        // Handling expression like heritage clauses e.g. class A extends mixin(B) ..
        case SyntaxKind.ClassDeclaration:
            handleClassDeclaration(node as ClassDeclaration, nodeWithDiag.parent.parent as ExpressionWithTypeArguments);
            break;
        case SyntaxKind.ObjectBindingPattern:
        case SyntaxKind.ArrayBindingPattern:
            transformDestructuringPatterns(node as BindingPattern);
            break;
        default:
            throw new Error(`Cannot find a fix for the given node ${node.kind}`);
    }

    function addTypeToFunctionLikeDeclaration(func: SignatureDeclaration, sourceFile: SourceFile) {
        if (func.type) {
            return;
        }

        const type = tryGetReturnType(func);
        if (!type) {
            return;
        }
        const typeNode = typeToTypeNode(type, func);
        if (typeNode) {
            changes.tryInsertTypeAnnotation(
                sourceFile,
                func,
                typeNode,
            );
        }
        addTypesToParametersArray(func.parameters);
    }

    function handleClassDeclaration(classDecl: ClassDeclaration, heritageExpression: ExpressionWithTypeArguments) {
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
        changes.insertNodeBefore(sourceFile, classDecl, heritageVariable);
        const trailingComments = getTrailingCommentRanges(sourceFile.text, heritageExpression.end);
        const realEnd = trailingComments?.[trailingComments.length - 1]?.end ?? heritageExpression.end;
        changes.replaceRange(
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

    function transformDestructuringPatterns(bindingPattern: BindingPattern) {
        const enclosingVarStmt = bindingPattern.parent.parent.parent as VariableStatement;
        const tempHolderForReturn = factory.createUniqueName("dest", GeneratedIdentifierFlags.Optimistic);
        const baseExpr: ExpressionReverseChain = { expression: { kind: ExpressionType.IDENTIFIER, identifier: tempHolderForReturn } };
        const bindingElements: ExpressionReverseChain[] = [];
        if (isArrayBindingPattern(bindingPattern)) {
            addArrayBindingPatterns(bindingPattern, bindingElements, baseExpr);
        }
        else {
            addObjectBindingPatterns(bindingPattern, bindingElements, baseExpr);
        }

        const expressionToVar = new Map<Expression, Identifier>();
        const newNodes: Node[] = [
            factory.createVariableStatement(
                /*modifiers*/ undefined,
                factory.createVariableDeclarationList(
                    [factory.createVariableDeclaration(
                        tempHolderForReturn,
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        enclosingVarStmt.declarationList.declarations[0].initializer,
                    )],
                    NodeFlags.Const,
                ),
            ),
        ];
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
                    const tempName = factory.createUniqueName("temp", GeneratedIdentifierFlags.Optimistic);
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
                newNodes.push(factory.createVariableStatement(
                    [factory.createToken(SyntaxKind.ExportKeyword)],
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
        changes.replaceNodeWithNodes(sourceFile, enclosingVarStmt, newNodes);
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

    function typeToTypeNode(type: Type, enclosingDeclaration: Node) {
        const typeNode = typeChecker.typeToTypeNode(
            type,
            enclosingDeclaration,
            declarationEmitNodeBuilderFlags,
        );
        if (!typeNode) {
            return undefined;
        }
        return typeToAutoImportableTypeNode(typeChecker, importAdder, type, enclosingDeclaration, scriptTarget);
    }

    function tryGetReturnType(node: SignatureDeclaration): Type | undefined {
        const signature = typeChecker.getSignatureFromDeclaration(node);
        if (signature) {
            return typeChecker.getReturnTypeOfSignature(signature);
        }
    }

    function addTypesToParametersArray(nodeArray: NodeArray<ParameterDeclaration> | undefined) {
        if (nodeArray === undefined) return undefined;
        nodeArray.forEach(param => addTypeToParameterDeclaration(param));
    }

    function addTypeToParameterDeclaration(parameter: ParameterDeclaration): void {
        if (!parameter.type) {
            const type = typeChecker.getTypeAtLocation(parameter);
            if (type) {
                const typeNode = typeToTypeNode(type, parameter);
                if (typeNode) {
                    changes.tryInsertTypeAnnotation(getSourceFileOfNode(parameter), parameter, typeNode);
                }
            }
        }
    }
}
