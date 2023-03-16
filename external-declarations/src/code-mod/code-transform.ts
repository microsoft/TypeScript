import * as ts from "typescript";
import { NodeBuilderFlags } from "typescript";
import { map } from "../compiler/lang-utils";
import { SymbolTracker } from "../compiler/types";

const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;


// Define a transformer function
export function addTypeAnnotationTransformer(program: ts.Program, moduleResolutionHost?: ts.ModuleResolutionHost) {
    function tryGetReturnType(
        typeChecker: ts.TypeChecker,
        node: ts.SignatureDeclaration
    ): ts.Type | undefined {
        const signature = typeChecker.getSignatureFromDeclaration(node);
        if (signature) {
            return typeChecker.getReturnTypeOfSignature(signature);
        }
    }

    function isVarConst(node: ts.VariableDeclaration | ts.VariableDeclarationList): boolean {
        return !!(ts.getCombinedNodeFlags(node) & ts.NodeFlags.Const);
    }
    
    function isDeclarationReadonly(declaration: ts.Declaration): boolean {
        return !!(ts.getCombinedModifierFlags(declaration) & ts.ModifierFlags.Readonly && !ts.isParameterPropertyDeclaration(declaration, declaration.parent));
    }

    function isLiteralConstDeclaration(node: ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature | ts.ParameterDeclaration): boolean {
        if (isDeclarationReadonly(node) || ts.isVariableDeclaration(node) && isVarConst(node)) {
            // TODO: Make sure this is a valid approximation for literal types
            return !node.type && 'initializer' in node && !!node.initializer && ts.isLiteralExpression(node.initializer);
            // Original TS version 
            // return isFreshLiteralType(getTypeOfSymbol(getSymbolOfNode(node)));
        }
        return false;
    }
    
    const typeChecker = program.getTypeChecker();
    
    return (context: ts.TransformationContext) => {
        let hasError = false;
        let reportError = () => {
            hasError = true;
        }
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
            )
            if (hasError) {
                hasError = false;
                return undefined;
            }

            return typeNode;
        }
        // Return a visitor function
        return (rootNode: ts.Node) => {
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T>): ts.NodeArray<T>
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T> | undefined): ts.NodeArray<T> | undefined
            function updateTypesInNodeArray<T extends ts.Node>(nodeArray: ts.NodeArray<T> | undefined) {
                if(nodeArray === undefined) return undefined;
                return ts.factory.createNodeArray(
                    nodeArray.map(param => {
                        return visit(param) as ts.ParameterDeclaration;
                    })
                )
            }

            // Define a visitor function
            function visit(node: ts.Node): ts.Node | ts.Node[] {
                if(ts.isParameter(node) && !node.type) {
                    const type = typeChecker.getTypeAtLocation(node);
                    if(type) {
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateParameterDeclaration(
                            node,
                            node.modifiers,
                            node.dotDotDotToken,
                            node.name,
                            node.questionToken,
                            typeNode,
                            node.initializer
                        )
                    }
                }
                // Check if node is a variable declaration
                if (ts.isVariableDeclaration(node) && !node.type && !isLiteralConstDeclaration(node)) {
                    const type = typeChecker.getTypeAtLocation(node);
                    const typeNode = typeToTypeNode(type, node)
                    return ts.factory.updateVariableDeclaration(
                        node,
                        node.name,
                        undefined,
                        typeNode,
                        node.initializer
                    );
                }

                if (ts.isFunctionDeclaration(node) && !node.type) {
                    const type = tryGetReturnType(typeChecker, node);
                    if(type) {
                        
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateFunctionDeclaration(
                            node, 
                            node.modifiers,
                            node.asteriskToken,
                            node.name,
                            updateTypesInNodeArray(node.typeParameters),
                            updateTypesInNodeArray(node.parameters),
                            typeNode,
                            node.body
                        )
                    }
                }
                if(ts.isPropertySignature(node) && !node.type && !isLiteralConstDeclaration(node)) {
                    const type = typeChecker.getTypeAtLocation(node);
                    const typeNode = typeToTypeNode(type, node);
                    return ts.factory.updatePropertySignature(
                        node,
                        node.modifiers,
                        node.name,
                        node.questionToken,
                        typeNode,
                    );
                }
                if(ts.isPropertyDeclaration(node) && !node.type && !isLiteralConstDeclaration(node)) {
                    const type = typeChecker.getTypeAtLocation(node);
                    const typeNode = typeToTypeNode(type, node);
                    return ts.factory.updatePropertyDeclaration(
                        node,
                        node.modifiers,
                        node.name,
                        node.questionToken ?? node.exclamationToken,
                        typeNode,
                        node.initializer
                    );
                }
                if(ts.isMethodSignature(node) && !node.type) {
                    const type = tryGetReturnType(typeChecker, node);
                    if(type) {
                        
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateMethodSignature(
                            node,
                            node.modifiers,
                            node.name,
                            node.questionToken,
                            updateTypesInNodeArray(node.typeParameters),
                            updateTypesInNodeArray(node.parameters),
                            typeNode,                       
                        );
                    }
                }
                if(ts.isCallSignatureDeclaration(node)) {
                    const type =    tryGetReturnType(typeChecker, node);
                    if(type) {
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateCallSignature(
                            node,
                            updateTypesInNodeArray(node.typeParameters),
                            updateTypesInNodeArray(node.parameters),
                            typeNode,
                        )
                    }
                }
                if(ts.isMethodDeclaration(node) && !node.type) {
                    const type = tryGetReturnType(typeChecker, node);
                    if(type) {
                        
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateMethodDeclaration(
                            node,
                            node.modifiers,
                            node.asteriskToken,
                            node.name,
                            node.questionToken,
                            updateTypesInNodeArray(node.typeParameters),
                            updateTypesInNodeArray(node.parameters),
                            typeNode,
                            node.body,                            
                        );
                    }
                }
                if(ts.isGetAccessorDeclaration(node) && !node.type) {
                    const type = tryGetReturnType(typeChecker, node);
                    if(type) {
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateGetAccessorDeclaration(
                            node,
                            node.modifiers,
                            node.name,
                            updateTypesInNodeArray(node.parameters),
                            typeNode,
                            node.body,                            
                        );
                    }
                }
                if(ts.isSetAccessorDeclaration(node) && !node.parameters[0]?.type) {
                    return ts.factory.updateSetAccessorDeclaration(
                        node,
                        node.modifiers,
                        node.name,
                        updateTypesInNodeArray(node.parameters),
                        node.body,                            
                    );
                }
                if ( ts.isConstructorDeclaration(node)) {
                    return ts.factory.updateConstructorDeclaration(
                        node,
                        node.modifiers,
                        updateTypesInNodeArray(node.parameters),
                        node.body,
                    )
                }
                if(ts.isConstructSignatureDeclaration(node)) {
                    const type = tryGetReturnType(typeChecker, node);
                    if(type) {
                        const typeNode = typeToTypeNode(type, node);
                        return ts.factory.updateConstructSignature(
                            node,
                            updateTypesInNodeArray(node.typeParameters),
                            updateTypesInNodeArray(node.parameters),
                            typeNode,
                        )
                    }
                }
                if(ts.isExportAssignment(node) && node.expression.kind !== ts.SyntaxKind.Identifier) {
                    const type = typeChecker.getTypeAtLocation(node.expression);
                    if(type) {
                        const typeNode = typeToTypeNode(type, node);
                        const newId = ts.factory.createIdentifier("_default");
                        const varDecl = ts.factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, typeNode, /*initializer*/ undefined);
                        const statement = ts.factory.createVariableStatement(
                            [], 
                            ts.factory.createVariableDeclarationList([varDecl], ts.NodeFlags.Const)
                        );
                        return [statement, ts.factory.updateExportAssignment(node, node.modifiers, newId)];
                    }
                }
                // Otherwise, visit each child node recursively
                return ts.visitEachChild(node, visit, context);
            }
            // Start visiting from root node
            return ts.visitNode(rootNode, visit)!;
        };
    };
}