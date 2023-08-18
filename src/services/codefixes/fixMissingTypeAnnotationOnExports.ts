import {
    ClassDeclaration,
    Diagnostics,
    ExportAssignment,
    ExpressionWithTypeArguments,
    factory,
    FunctionDeclaration,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getTokenAtPosition,
    MethodDeclaration,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFlags,
    ParameterDeclaration,
    PropertyDeclaration,
    SignatureDeclaration,
    SourceFile,
    SyntaxKind,
    textChanges,
    Type,
    TypeChecker,
    VariableDeclaration,
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
    while (!canHaveExplicitTypeAnnotation.has(node.kind)) {
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
    default:
        break;
    }
    throw new Error(`Cannot find a fix for the given node ${node.kind}`);
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
