import * as ts from "typescript";
import { NodeBuilderFlags } from "typescript";

import { hasProperty } from "../compiler/lang-utils";
import { SymbolTracker } from "../compiler/types";

const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;

function sortDiagnostics(a: ts.Diagnostic, b: ts.Diagnostic) {
    if (a.start! < b.start!) {
        return -1;
    }
    if (a.start! === b.start!) {
        if (a.length === b.length) {
            return 0;
        }
        if (a.length! < b.length!){
            return -1;
        }
        return 1;
    }
    return 1;
}

function tryGetReturnType(typeChecker: ts.TypeChecker, node: ts.SignatureDeclaration): ts.Type | undefined {
    const signature = typeChecker.getSignatureFromDeclaration(node);
    if (signature) {
        return typeChecker.getReturnTypeOfSignature(signature);
    }
}

// Define a transformer function
export function addTypeAnnotationTransformer(sourceFile: ts.SourceFile, program: ts.Program, moduleResolutionHost?: ts.ModuleResolutionHost) {
    const typeChecker = program.getTypeChecker();
    const sortedDiags = program.getDeclarationDiagnostics(sourceFile)
                               .filter((diag) => diag.code === 9007)
                               .sort(sortDiagnostics).
                                map((diag) => { return { start: diag.start!, end: diag.start! + diag.length! };});

    return (context: ts.TransformationContext) => {
        if (!sortedDiags) return (node: ts.Node) => node;
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
        let diagIndex = 0;
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
                // Only visit descendants when there's diagnostics on this location.
                while (diagIndex < sortedDiags.length && sortedDiags[diagIndex].start < node.getStart()) {
                    ++diagIndex;
                }
                if (diagIndex >= sortedDiags.length) {
                    return node;
                }
                if ((node.getStart() !== sortedDiags[diagIndex].start || node.getEnd() !== sortedDiags[diagIndex].end) &&
                    sortedDiags[diagIndex].end > node.getEnd()) {
                    return node;
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