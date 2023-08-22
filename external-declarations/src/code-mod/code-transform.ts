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
    if (ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) {
        // return VariableStatement
        return node.parent.parent.parent;
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

        function handleClassDeclaration(classDecl: ts.ClassDeclaration, heritageExpression: ts.ExpressionWithTypeArguments) {
            if (heritageExpression.kind !== ts.SyntaxKind.ExpressionWithTypeArguments){
                throw new Error(`Hey + ${heritageExpression.kind}`);
            }
            const heritageTypeNode = typeToTypeNode(
                typeChecker.getTypeAtLocation(heritageExpression.expression),
                heritageExpression.expression);
            const heritageVariableName = ts.factory.createUniqueName(
                classDecl.name? classDecl.name.text + "Base" : "Anonymous", ts.GeneratedIdentifierFlags.Optimistic);
            // e.g. const Point3DBase: typeof Point2D = mixin(Point2D);
            const heritageVariable = ts.factory.createVariableStatement(
                /*modifiers*/ undefined,
                ts.factory.createVariableDeclarationList(
                    [ts.factory.createVariableDeclaration(
                        heritageVariableName,
                        /*exclamationToken*/ undefined,
                        heritageTypeNode,
                        heritageExpression,
                        )],
                    ts.NodeFlags.Const,
                )
            );
            return [heritageVariable,
                    ts.factory.updateClassDeclaration(
                        classDecl,
                        classDecl.modifiers,
                        classDecl.name,
                        classDecl.typeParameters,
                        classDecl.heritageClauses?.map(
                            (node) => {
                                if (node === heritageExpression.parent) {
                                    return ts.factory.updateHeritageClause(node,
                                        [ts.factory.createExpressionWithTypeArguments(heritageVariableName, [])]
                                    );
                                }
                                return node;
                            }),
                        classDecl.members)
                    ];
        }

        const enum ExpressionType {
            TEXT = 0,
            COMPUTED = 1,
            ARRAY_ACCESS = 2,
            IDENTIFIER = 3,
        }
        interface ExpressionReverseChain {
            element?: ts.BindingElement;
            parent?: ExpressionReverseChain;
            expression: SubExpression;
        }

        type SubExpression = {kind: ExpressionType.TEXT, text: string}
            | {kind: ExpressionType.COMPUTED, computed: ts.Expression}
            | {kind: ExpressionType.ARRAY_ACCESS, arrayIndex: number}
            | {kind: ExpressionType.IDENTIFIER, identifier: ts.Identifier};

        function transformDestructuringPatterns(variableStatement: ts.VariableStatement, bindingPattern: ts.BindingPattern) {
            const enclosingVarStmt = bindingPattern.parent.parent.parent as ts.VariableStatement;
            const tempHolderForReturn = ts.factory.createUniqueName("dest", ts.GeneratedIdentifierFlags.Optimistic);
            const baseExpr: ExpressionReverseChain = { expression: { kind: ExpressionType.IDENTIFIER, identifier: tempHolderForReturn } };
            const bindingElements: ExpressionReverseChain[] = [];
            if (ts.isArrayBindingPattern(bindingPattern)) {
                addArrayBindingPatterns(bindingPattern, bindingElements, baseExpr);
            }
            else {
                addObjectBindingPatterns(bindingPattern, bindingElements, baseExpr);
            }

            const expressionToVar = new Map<ts.Expression, ts.Identifier>();
            const newNodes: ts.Node[] = [
                ts.factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    ts.factory.createVariableDeclarationList(
                        [ts.factory.createVariableDeclaration(
                            tempHolderForReturn,
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            enclosingVarStmt.declarationList.declarations[0].initializer)],
                        ts.NodeFlags.Const
                    )
                )
            ];
            let i = 0;
            while (i < bindingElements.length) {
                const bindingElement = bindingElements[i];

                if (bindingElement.element!.propertyName && ts.isComputedPropertyName(bindingElement.element!.propertyName)) {
                    const computedExpression = bindingElement.element!.propertyName.expression;
                    const identifierForComputedProperty = ts.factory.getGeneratedNameForNode(computedExpression);
                    const variableDecl = ts.factory.createVariableDeclaration(
                        identifierForComputedProperty, /*exclamationToken*/ undefined, /*type*/ undefined, computedExpression);
                    const variableList = ts.factory.createVariableDeclarationList([variableDecl], ts.NodeFlags.Const);
                    const variableStatement = ts.factory.createVariableStatement(/*modifiers*/ undefined, variableList);
                    newNodes.push(variableStatement);
                    expressionToVar.set(computedExpression, identifierForComputedProperty);
                }

                // Name is the RHS of : in case colon exists, otherwise it's just the name of the destructuring
                const name = bindingElement.element!.name;
                // isBindingPattern
                if (ts.isArrayBindingPattern(name)) {
                    addArrayBindingPatterns(name, bindingElements, bindingElement);
                }
                else if (ts.isObjectBindingPattern(name)) {
                    addObjectBindingPatterns(name, bindingElements, bindingElement);
                }
                else {
                    const typeNode = typeToTypeNode(typeChecker.getTypeAtLocation(name), name);
                    let variableInitializer = createChainedExpression(bindingElement, expressionToVar);
                    if (bindingElement.element!.initializer) {
                        const tempName = ts.factory.createUniqueName("temp", ts.GeneratedIdentifierFlags.Optimistic);
                        newNodes.push(ts.factory.createVariableStatement(
                            /*modifiers*/ undefined,
                            ts.factory.createVariableDeclarationList(
                                [ts.factory.createVariableDeclaration(
                                    tempName, /*exclamationToken*/ undefined, /*type*/ undefined, variableInitializer)],
                                    ts.NodeFlags.Const)));
                        variableInitializer = ts.factory.createConditionalExpression(
                            ts.factory.createBinaryExpression(
                                tempName,
                                ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
                                ts.factory.createIdentifier("undefined"),
                            ),
                            ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                            bindingElement.element!.initializer,
                            ts.factory.createToken(ts.SyntaxKind.ColonToken),
                            variableInitializer,);
                    }
                    newNodes.push(ts.factory.createVariableStatement(
                        [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
                        ts.factory.createVariableDeclarationList(
                            [ts.factory.createVariableDeclaration(
                                name, /*exclamationToken*/ undefined, typeNode, variableInitializer)],
                            ts.NodeFlags.Const)));
                }
                ++i;
            }
            return newNodes;
        }

        function addArrayBindingPatterns(bindingPattern: ts.ArrayBindingPattern, bindingElements: ExpressionReverseChain[], parent: ExpressionReverseChain) {
            for (let i = 0 ; i < bindingPattern.elements.length ; ++i) {
                const element = bindingPattern.elements[i];
                if (ts.isOmittedExpression(element)) {
                    continue;
                }
                bindingElements.push({
                    element,
                    parent,
                    expression: { kind: ExpressionType.ARRAY_ACCESS, arrayIndex: i },
                });
            }
        }

        function addObjectBindingPatterns(bindingPattern: ts.ObjectBindingPattern, bindingElements: ExpressionReverseChain[], parent: ExpressionReverseChain) {
            for (const bindingElement of bindingPattern.elements) {
                let name: string;
                if (bindingElement.propertyName) {
                    if (ts.isComputedPropertyName(bindingElement.propertyName)) {
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
                    name = (bindingElement.name as ts.Identifier).text;
                }
                bindingElements.push({
                    element: bindingElement,
                    parent,
                    expression: { kind: ExpressionType.TEXT, text: name },
                });
            }
        }

        function createChainedExpression(expression: ExpressionReverseChain, expressionToVar: Map<ts.Expression, ts.Identifier>): ts.Expression {
            const reverseTraverse: ExpressionReverseChain[] = [expression];
            while (expression.parent) {
                expression = expression.parent;
                reverseTraverse.push(expression);
            }
            let chainedExpression: ts.Expression = ((reverseTraverse[reverseTraverse.length - 1]).expression as {identifier: ts.Identifier}).identifier;
            for (let i = reverseTraverse.length -2 ; i>= 0; --i) {
                const nextSubExpr = reverseTraverse[i].expression;
                if (nextSubExpr.kind === ExpressionType.TEXT) {
                    chainedExpression = ts.factory.createPropertyAccessChain(
                        chainedExpression,
                        /*questionDotToken*/ undefined,
                        ts.factory.createIdentifier(nextSubExpr.text)
                    );
                }
                else if (nextSubExpr.kind === ExpressionType.COMPUTED) {
                    chainedExpression = ts.factory.createElementAccessExpression(
                        chainedExpression,
                        expressionToVar.get(nextSubExpr.computed)!
                    );
                }
                else if (nextSubExpr.kind === ExpressionType.ARRAY_ACCESS) {
                    chainedExpression = ts.factory.createElementAccessExpression(
                        chainedExpression,
                        nextSubExpr.arrayIndex
                    );
                }
            }
            return chainedExpression;
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
                const nodeWithDiag = nodesToFix.get(node);
                if (!nodeWithDiag) {
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
                case ts.SyntaxKind.ExportAssignment:
                    const defaultExport = node as ts.ExportAssignment;
                    if(!defaultExport.isExportEquals) {
                        const type = typeChecker.getTypeAtLocation(defaultExport.expression);
                        const typeNode = typeToTypeNode(type, node);
                        return [
                            ts.factory.createVariableStatement(/*modifiers*/ undefined,
                                ts.factory.createVariableDeclarationList(
                                    [ts.factory.createVariableDeclaration(
                                        "__default", /*exclamationToken*/ undefined,
                                        typeNode, defaultExport.expression)],
                                    ts.NodeFlags.Const)),
                            ts.factory.updateExportAssignment(defaultExport, defaultExport?.modifiers, ts.factory.createIdentifier("__default")),
                        ];
                    }
                    break;
                // Handling expression like heritage clauses e.g. class A extends mixin(B) ..
                case ts.SyntaxKind.ClassDeclaration:
                    return handleClassDeclaration(node as ts.ClassDeclaration, nodeWithDiag.parent.parent as ts.ExpressionWithTypeArguments);
                case ts.SyntaxKind.VariableStatement:
                    return transformDestructuringPatterns(node as ts.VariableStatement, findOuterMostBindingPattern(nodeWithDiag));
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

function findOuterMostBindingPattern(node: ts.Node) {
    while (!ts.isVariableDeclaration(node.parent)) {
        node = node.parent;
    }
    return node as ts.BindingPattern;
}
