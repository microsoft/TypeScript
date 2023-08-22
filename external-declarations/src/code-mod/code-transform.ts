import * as ts from "typescript";

import { SymbolTracker } from "../compiler/types";

const declarationEmitNodeBuilderFlags =
    ts.NodeBuilderFlags.MultilineObjectLiterals |
    ts.NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    ts.NodeBuilderFlags.UseTypeOfFunction |
    ts.NodeBuilderFlags.UseStructuralFallback |
    ts.NodeBuilderFlags.AllowEmptyTuple |
    ts.NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    ts.NodeBuilderFlags.NoTruncation;

function tryGetReturnType(typeChecker: ts.TypeChecker, node: ts.SignatureDeclaration): ts.Type | undefined {
    const signature = typeChecker.getSignatureFromDeclaration(node);
    if (signature) {
        return typeChecker.getReturnTypeOfSignature(signature);
    }
}
const canHaveExplicitTypeAnnotation = new Set<ts.SyntaxKind>([
    ts.SyntaxKind.GetAccessor,
    ts.SyntaxKind.MethodDeclaration,
    ts.SyntaxKind.PropertyDeclaration,
    ts.SyntaxKind.FunctionDeclaration,
    ts.SyntaxKind.VariableDeclaration,
    ts.SyntaxKind.Parameter,
    ts.SyntaxKind.ExportAssignment,
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.ObjectBindingPattern,
    ts.SyntaxKind.ArrayBindingPattern,
]);

// Currently, the diagnostics for the error is not given in the exact node of which that needs type annotation
function findNearestParentWithTypeAnnotation(node: ts.Node): ts.Node {
    while (((ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) && !ts.isVariableDeclaration(node.parent)) ||
          !canHaveExplicitTypeAnnotation.has(node.kind)) {
        node = node.parent;
    }
    return node;
}

// Define a transformer function
export function addTypeAnnotationTransformer(sourceFile: ts.SourceFile, program: ts.Program, moduleResolutionHost?: ts.ModuleResolutionHost) {
    const typeChecker = program.getTypeChecker();
    const nodesToFix = new Map(program.getDeclarationDiagnostics(sourceFile).
                                filter((diag) => diag.code === 9007).
                                map((diag) => {
                                    const nodeWithDiag = (ts as any).getTokenAtPosition(sourceFile, diag.start)! as ts.Node;
                                    return [findNearestParentWithTypeAnnotation(nodeWithDiag), nodeWithDiag];
                                }));

    return (context: ts.TransformationContext) => {
        if (!nodesToFix) return (node: ts.Node) => node;
        let hasError = false;
        const reportError = () => {
            hasError = true;
        };
        const symbolTracker: SymbolTracker | undefined = !moduleResolutionHost? undefined : {
            trackSymbol(){ return false; },
            reportInaccessibleThisError: reportError,
            reportInaccessibleUniqueSymbolError: reportError,
            reportCyclicStructureError: reportError,
            reportPrivateInBaseOfClassExpression: reportError,
            reportLikelyUnsafeImportRequiredError: reportError,
            reportTruncationError: reportError,
            moduleResolverHost: moduleResolutionHost as any,
            trackReferencedAmbientModule(){},
            trackExternalModuleSymbolOfImportTypeNode(){},
            reportNonlocalAugmentation(){},
            reportNonSerializableProperty(){},
            reportImportTypeNodeResolutionModeOverride() {},
        };

        function typeToTypeNode(type: ts.Type, enclosingDeclaration: ts.Node) {
            const typeNode = typeChecker.typeToTypeNode(
                type,
                enclosingDeclaration,
                declarationEmitNodeBuilderFlags,
                // @ts-expect-error Use undocumented parameters
                symbolTracker,
            );
            if (hasError) {
                hasError = false;
                return undefined;
            }
            return typeNode;
        }
        // Return a visitor function
        return (rootNode: ts.Node) => {
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T>): ts.NodeArray<T>;
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T> | undefined): ts.NodeArray<T> | undefined;
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T> | undefined) {
                if(nodeArray === undefined) return undefined;
                return ts.factory.createNodeArray(
                    nodeArray.map(param => {
                        return visit(param) as ts.ParameterDeclaration;
                    })
                );
            }

            // Define a visitor function
            function visit(node: ts.Node): ts.Node | ts.Node[] {
                const originalNodeWithDiag = nodesToFix.has(node);
                if (!originalNodeWithDiag) {
                    return ts.visitEachChild(node, visit, context);
                }

                switch (node.kind) {
                case ts.SyntaxKind.Parameter:
                    const parameter = node as ts.ParameterDeclaration;
                    if (!parameter.type) {
                        const type = typeChecker.getTypeAtLocation(node);
                        if (type) {
                            const typeNode = typeToTypeNode(type, node);
                            return ts.factory.updateParameterDeclaration(
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
                    break;
                case ts.SyntaxKind.VariableDeclaration:
                    const variableDeclaration = node as ts.VariableDeclaration;
                    if (!variableDeclaration.type) {
                        const type = typeChecker.getTypeAtLocation(variableDeclaration);
                        const typeNode = typeToTypeNode(type, variableDeclaration);
                        return ts.factory.updateVariableDeclaration(
                            variableDeclaration,
                            variableDeclaration.name,
                            /**exclamationToken=*/ undefined,
                            typeNode,
                            variableDeclaration.initializer
                        );
                    }
                    break;
                case ts.SyntaxKind.FunctionDeclaration:
                    const functionDecl = node as ts.FunctionDeclaration;
                    if (!functionDecl.type) {
                        const type = tryGetReturnType(typeChecker, functionDecl);
                        if(type) {
                            const typeNode = typeToTypeNode(type, functionDecl);
                            return ts.factory.updateFunctionDeclaration(
                                functionDecl,
                                functionDecl.modifiers,
                                functionDecl.asteriskToken,
                                functionDecl.name,
                                updateTypesInNodeArray(functionDecl.typeParameters),
                                updateTypesInNodeArray(functionDecl.parameters),
                                typeNode,
                                functionDecl.body
                            );
                        }
                    }
                    break;
                case ts.SyntaxKind.PropertySignature:
                    const propertySignature = node as ts.PropertySignature;
                    if(!propertySignature.type) {
                        const type = typeChecker.getTypeAtLocation(node);
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updatePropertySignature(
                            propertySignature,
                            propertySignature.modifiers,
                            propertySignature.name,
                            propertySignature.questionToken,
                            typeNode,
                        );
                    }
                    break;
                case ts.SyntaxKind.PropertyDeclaration:
                    const propDecl = node as ts.PropertyDeclaration;
                    if(!propDecl.type) {
                        const type = typeChecker.getTypeAtLocation(node);
                        const typeNode = typeToTypeNode(type, propDecl);
                        return ts.factory.updatePropertyDeclaration(
                            propDecl,
                            propDecl.modifiers,
                            propDecl.name,
                            propDecl.questionToken ?? propDecl.exclamationToken,
                            typeNode,
                            propDecl.initializer
                        );
                    }
                    break;
                case ts.SyntaxKind.MethodDeclaration:
                    const methodDeclaration = node as ts.MethodDeclaration;
                    if(!methodDeclaration.type) {
                        const type = tryGetReturnType(typeChecker, methodDeclaration);
                        if(type) {
                            const typeNode = typeToTypeNode(type, node);
                            return ts.factory.updateMethodDeclaration(
                                methodDeclaration,
                                methodDeclaration.modifiers,
                                methodDeclaration.asteriskToken,
                                methodDeclaration.name,
                                methodDeclaration.questionToken,
                                updateTypesInNodeArray(methodDeclaration.typeParameters),
                                updateTypesInNodeArray(methodDeclaration.parameters),
                                typeNode,
                                methodDeclaration.body,
                            );
                        }
                    }
                    break;
                case ts.SyntaxKind.GetAccessor:
                    const getAccessor = node as ts.GetAccessorDeclaration;
                    if(!getAccessor.type) {
                        const returnType = tryGetReturnType(typeChecker, getAccessor);
                        if(returnType) {
                            const typeNode = typeToTypeNode(returnType, node);
                            return ts.factory.updateGetAccessorDeclaration(
                                getAccessor,
                                getAccessor.modifiers,
                                getAccessor.name,
                                updateTypesInNodeArray(getAccessor.parameters),
                                typeNode,
                                getAccessor.body,
                            );
                        }
                    }
                    break;
                default:
                    break;
                }

                // Otherwise, visit each child node recursively
                return ts.visitEachChild(node, visit, context);
            }
            // Start visiting from root node
            return ts.visitNode(rootNode, visit)!;
        };
    };
}