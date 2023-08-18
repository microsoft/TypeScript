import {
    ArrayBindingPattern,
    BindingElement,
    BindingPattern,
    ClassDeclaration,
    Diagnostics,
    ExportAssignment,
    Expression,
    ExpressionWithTypeArguments,
    factory,
    FunctionDeclaration,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getTokenAtPosition,
    Identifier,
    isArrayBindingPattern,
    isComputedPropertyName,
    isObjectBindingPattern,
    isOmittedExpression,
    isVariableDeclaration,
    MethodDeclaration,
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
    registerCodeFix,
} from "../_namespaces/ts.codefix";

const fixId = "fixMissingTypeAnnotationOnExports";
const errorCodes = [
    Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit.code,
];
const canHaveExplicitTypeAnnotation = new Set<SyntaxKind>([
    SyntaxKind.GetAccessor,
    SyntaxKind.MethodDeclaration,
    SyntaxKind.PropertyDeclaration,
    SyntaxKind.FunctionDeclaration,
    SyntaxKind.VariableDeclaration,
    SyntaxKind.Parameter,
    SyntaxKind.ExportAssignment,
    SyntaxKind.ExpressionWithTypeArguments,
    SyntaxKind.ObjectBindingPattern,
    SyntaxKind.ArrayBindingPattern,
]);

const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;

registerCodeFix({
    errorCodes,
    fixIds: [fixId],
    getCodeActions(context) {
        const { sourceFile, span } = context;
        const nodeWithDiag = getTokenAtPosition(sourceFile, span.start);

        const changes = textChanges.ChangeTracker.with(context, t => doChange(t, context.sourceFile, context.program.getTypeChecker(), nodeWithDiag));
        return [createCodeFixAction(fixId, changes, Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit, fixId, Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit)];
    },
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
        const nodeWithDiag = getTokenAtPosition(diag.file, diag.start);
        doChange(changes, diag.file, context.program.getTypeChecker(), nodeWithDiag);
    })
});

function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, typeChecker: TypeChecker, nodeWithDiag: Node): void {
    const nodeWithNoType = findNearestParentWithTypeAnnotation(nodeWithDiag);
    fixupForIsolatedDeclarations(nodeWithNoType, sourceFile, typeChecker, changes);
}

// Currently, the diagnostics for the error is not given in the exact node of which that needs type annotation
function findNearestParentWithTypeAnnotation(node: Node): Node {
    while (((isObjectBindingPattern(node) || isArrayBindingPattern(node)) && !isVariableDeclaration(node.parent)) ||
          !canHaveExplicitTypeAnnotation.has(node.kind)) {
        node = node.parent;
    }
    return node;
}

/**
 * Fixes up to support IsolatedDeclaration by either adding types when possible, or splitting statements and add type annotations
 * for the places that cannot have type annotations (e.g. HeritageClause, default exports, ...)
 */
function fixupForIsolatedDeclarations(node: Node, sourceFile: SourceFile, typeChecker: TypeChecker, changes: textChanges.ChangeTracker) {
    switch (node.kind) {
    case SyntaxKind.Parameter:
        const parameter = node as ParameterDeclaration;
        const newNode = addTypeToParameterDeclaration(parameter, typeChecker);
        if (newNode) {
            return changes.replaceNodeWithNodes(sourceFile, node, [newNode]);
        }
        break;
    case SyntaxKind.VariableDeclaration:
        const variableDeclaration = node as VariableDeclaration;
        if (!variableDeclaration.type) {
            const type = typeChecker.getTypeAtLocation(variableDeclaration);
            const typeNode = typeToTypeNode(type, variableDeclaration, typeChecker);
            return changes.replaceNodeWithNodes(sourceFile, node,
                [factory.updateVariableDeclaration(
                    variableDeclaration,
                    variableDeclaration.name,
                    /*exclamationToken*/ undefined,
                    typeNode,
                    variableDeclaration.initializer
                )]);
        }
        break;
    case SyntaxKind.FunctionDeclaration:
        const functionDecl = node as FunctionDeclaration;
        if (!functionDecl.type) {
            const type = tryGetReturnType(typeChecker, functionDecl);
            if(type) {
                const typeNode = typeToTypeNode(type, functionDecl, typeChecker);
                return changes.replaceNodeWithNodes(sourceFile, node,
                    [factory.updateFunctionDeclaration(
                    functionDecl,
                    functionDecl.modifiers,
                    functionDecl.asteriskToken,
                    functionDecl.name,
                    functionDecl.typeParameters,
                    updateTypesInNodeArray(functionDecl.parameters, typeChecker),
                    typeNode,
                    functionDecl.body)]
                );
            }
        }
        break;
    case SyntaxKind.PropertyDeclaration:
        const propDecl = node as PropertyDeclaration;
        if(!propDecl.type) {
            const type = typeChecker.getTypeAtLocation(node);
            const typeNode = typeToTypeNode(type, propDecl, typeChecker);
            return changes.replaceNodeWithNodes(sourceFile, node,
                    [factory.updatePropertyDeclaration(
                        propDecl,
                        propDecl.modifiers,
                        propDecl.name,
                        propDecl.questionToken ?? propDecl.exclamationToken,
                        typeNode,
                        propDecl.initializer)]
            );
        }
        break;
    case SyntaxKind.MethodDeclaration:
        const methodDeclaration = node as MethodDeclaration;
        if(!methodDeclaration.type) {
            const type = tryGetReturnType(typeChecker, methodDeclaration);
            if(type) {
                const typeNode = typeToTypeNode(type, node, typeChecker);
                return changes.replaceNodeWithNodes(sourceFile, node,
                    [factory.updateMethodDeclaration(
                        methodDeclaration,
                        methodDeclaration.modifiers,
                        methodDeclaration.asteriskToken,
                        methodDeclaration.name,
                        methodDeclaration.questionToken,
                        methodDeclaration.typeParameters,
                        updateTypesInNodeArray(methodDeclaration.parameters, typeChecker),
                        typeNode,
                        methodDeclaration.body)]
                );
            }
        }
        break;
    case SyntaxKind.GetAccessor:
        const getAccessor = node as GetAccessorDeclaration;
        if(!getAccessor.type) {
            const returnType = tryGetReturnType(typeChecker, getAccessor);
            if(returnType) {
                const typeNode = typeToTypeNode(returnType, node, typeChecker);
                return changes.replaceNodeWithNodes(sourceFile, node,
                        [factory.updateGetAccessorDeclaration(
                            getAccessor,
                            getAccessor.modifiers,
                            getAccessor.name,
                            updateTypesInNodeArray(getAccessor.parameters, typeChecker),
                            typeNode,
                            getAccessor.body)]
                );
            }
        }
        break;
    case SyntaxKind.ExportAssignment:
        const defaultExport = node as ExportAssignment;
        if(!defaultExport.isExportEquals) {
            const type = typeChecker.getTypeAtLocation(defaultExport.expression);
            const typeNode = typeToTypeNode(type, node, typeChecker);
            return changes.replaceNodeWithNodes(sourceFile, node, [
                factory.createVariableStatement(/*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        [factory.createVariableDeclaration(
                            "__default", /*exclamationToken*/ undefined,
                            typeNode, defaultExport.expression)],
                        NodeFlags.Const)),
                factory.updateExportAssignment(defaultExport, defaultExport?.modifiers, factory.createIdentifier("__default")),
            ]);
        }
        break;
    // Handling expression like heritage clauses e.g. class A extends mixin(B) ..
    case SyntaxKind.ExpressionWithTypeArguments:
        const expression = node as ExpressionWithTypeArguments;
        const classDecl = expression.parent.parent as unknown as ClassDeclaration;
        const heritageTypeNode = typeToTypeNode(
            typeChecker.getTypeAtLocation(expression.expression),
            expression.expression,
            typeChecker);
        const heritageVariableName = factory.createUniqueName(
            classDecl.name? classDecl.name.text + "Base" : "Anonymous", GeneratedIdentifierFlags.Optimistic);
        // e.g. const Point3DBase: typeof Point2D = mixin(Point2D);
        const heritageVariable = factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList(
                [factory.createVariableDeclaration(
                    heritageVariableName,
                    /*exclamationToken*/ undefined,
                    heritageTypeNode,
                    expression,
                    )],
                NodeFlags.Const,
            )
        );
        changes.insertNodeAt(sourceFile, classDecl.getFullStart(), heritageVariable, { prefix: "\n" });
        return changes.replaceNodeWithNodes(sourceFile, expression,
            [factory.createExpressionWithTypeArguments(heritageVariableName, [])]);
    case SyntaxKind.ObjectBindingPattern:
    case SyntaxKind.ArrayBindingPattern:
        return transformDestructuringPatterns(node as BindingPattern, sourceFile, typeChecker, changes);
    default:
        break;
    }
    throw new Error(`Cannot find a fix for the given node ${node.kind}`);
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

type SubExpression = {kind: ExpressionType.TEXT, text: string} |
                     {kind: ExpressionType.COMPUTED, computed: Expression} |
                     {kind: ExpressionType.ARRAY_ACCESS, arrayIndex: number} |
                     {kind: ExpressionType.IDENTIFIER, identifier: Identifier} ;

function transformDestructuringPatterns(bindingPattern: BindingPattern,
                                        sourceFile: SourceFile,
                                        typeChecker: TypeChecker,
                                        changes: textChanges.ChangeTracker) {
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
                    enclosingVarStmt.declarationList.declarations[0].initializer)],
                NodeFlags.Const
            )
        )
    ];
    let i = 0;
    while (i < bindingElements.length) {
        const bindingElement = bindingElements[i];

        if (bindingElement.element!.propertyName && isComputedPropertyName(bindingElement.element!.propertyName)) {
            const computedExpression = bindingElement.element!.propertyName.expression;
            const identifierForComputedProperty = factory.getGeneratedNameForNode(computedExpression);
            const variableDecl = factory.createVariableDeclaration(
                identifierForComputedProperty, /*exclamationToken*/ undefined, /*type*/ undefined, computedExpression);
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
            const typeNode = typeToTypeNode(typeChecker.getTypeAtLocation(name), name, typeChecker);
            let variableInitializer = createChainedExpression(bindingElement, expressionToVar);
            if (bindingElement.element!.initializer) {
                const tempName = factory.createUniqueName("temp", GeneratedIdentifierFlags.Optimistic);
                newNodes.push(factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        [factory.createVariableDeclaration(
                            tempName, /*exclamationToken*/ undefined, typeNode, variableInitializer)],
                        NodeFlags.Const)));
                variableInitializer = factory.createConditionalExpression(
                    factory.createBinaryExpression(
                        tempName,
                        factory.createToken(SyntaxKind.EqualsEqualsEqualsToken),
                        factory.createIdentifier("undefined"),
                    ),
                    factory.createToken(SyntaxKind.QuestionToken),
                    bindingElement.element!.initializer,
                    factory.createToken(SyntaxKind.ColonToken),
                    variableInitializer,);
            }
            newNodes.push(factory.createVariableStatement(
                [factory.createToken(SyntaxKind.ExportKeyword)],
                factory.createVariableDeclarationList(
                    [factory.createVariableDeclaration(
                        name, /*exclamationToken*/ undefined, typeNode, variableInitializer)],
                    NodeFlags.Const)));
        }
        ++i;
    }
    changes.replaceNodeWithNodes(sourceFile, enclosingVarStmt, newNodes);
}

function addArrayBindingPatterns(bindingPattern: ArrayBindingPattern, bindingElements: ExpressionReverseChain[], parent: ExpressionReverseChain) {
    for (let i = 0 ; i < bindingPattern.elements.length ; ++i) {
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
    let chainedExpression: Expression = ((reverseTraverse[reverseTraverse.length - 1]).expression as {identifier: Identifier}).identifier;
    for (let i = reverseTraverse.length -2 ; i>= 0; --i) {
        const nextSubExpr = reverseTraverse[i].expression;
        if (nextSubExpr.kind === ExpressionType.TEXT) {
            chainedExpression = factory.createPropertyAccessChain(
                chainedExpression,
                /*questionDotToken*/ undefined,
                factory.createIdentifier(nextSubExpr.text)
            );
        }
        else if (nextSubExpr.kind === ExpressionType.COMPUTED) {
            chainedExpression = factory.createElementAccessExpression(
                chainedExpression,
                expressionToVar.get(nextSubExpr.computed)!
            );
        }
        else if (nextSubExpr.kind === ExpressionType.ARRAY_ACCESS) {
            chainedExpression = factory.createElementAccessExpression(
                chainedExpression,
                nextSubExpr.arrayIndex
            );
        }
    }
    return chainedExpression;
}

function typeToTypeNode(type: Type, enclosingDeclaration: Node, typeChecker: TypeChecker) {
    const typeNode = typeChecker.typeToTypeNode(
        type,
        enclosingDeclaration,
        declarationEmitNodeBuilderFlags,
    );
    return typeNode;
}

function tryGetReturnType(typeChecker: TypeChecker, node: SignatureDeclaration): Type | undefined {
    const signature = typeChecker.getSignatureFromDeclaration(node);
    if (signature) {
        return typeChecker.getReturnTypeOfSignature(signature);
    }
}

function updateTypesInNodeArray(nodeArray: NodeArray<ParameterDeclaration>, typeChecker: TypeChecker): NodeArray<ParameterDeclaration>;
function updateTypesInNodeArray(nodeArray: NodeArray<ParameterDeclaration> | undefined, typeChecker: TypeChecker): NodeArray<ParameterDeclaration> | undefined;
function updateTypesInNodeArray(nodeArray: NodeArray<ParameterDeclaration> | undefined, typeChecker: TypeChecker) {
    if(nodeArray === undefined) return undefined;
    return factory.createNodeArray(
        nodeArray.map(param => {
            return addTypeToParameterDeclaration(param, typeChecker) || param;
        })
    );
}

function addTypeToParameterDeclaration(parameter: ParameterDeclaration, typeChecker: TypeChecker): ParameterDeclaration | undefined {
    if (!parameter.type) {
        const type = typeChecker.getTypeAtLocation(parameter);
        if (type) {
            const typeNode = typeToTypeNode(type, parameter, typeChecker);
            return factory.updateParameterDeclaration(
                parameter,
                parameter.modifiers,
                parameter.dotDotDotToken,
                parameter.name,
                parameter.questionToken,
                typeNode,
                parameter.initializer
            );
        }
    }
}
