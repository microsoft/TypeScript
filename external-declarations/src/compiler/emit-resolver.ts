import { Node, VariableDeclaration, PropertyDeclaration, PropertySignature, ParameterDeclaration, Declaration, getCombinedModifierFlags, isParameterPropertyDeclaration, isVariableDeclaration, ModifierFlags, getCombinedNodeFlags, NodeFlags, VariableDeclarationList, isLiteralExpression, isIdentifier, BindingPattern, isSourceFile, SyntaxKind, findAncestor, SourceFile, EntityNameOrEntityNameExpression, isBindingElement, isVariableStatement, SymbolFlags, __String, ImportClause, ImportEqualsDeclaration, ImportSpecifier, NamespaceImport, isFunctionLike, getNameOfDeclaration, DeclarationName, isElementAccessExpression, isPropertyAccessExpression, FunctionLikeDeclaration, CompilerOptions, isGetAccessor, isSetAccessor, ResolutionMode } from "typescript";
import { Debug } from "./debug";
import { BasicSymbol, bindSourceFile } from "./emit-binder";
import { appendIfUnique, emptyArray, every, filter } from "./lang-utils";
import { EmitResolver, LateBoundDeclaration, LateVisibilityPaintedStatement, SymbolAccessibility, SymbolVisibilityResult, _Symbol } from "./types";
import { isBindingPattern, isExternalModuleAugmentation, hasEffectiveModifier, getTextOfNode, hasSyntacticModifier, isInJSFile, isLateVisibilityPaintedStatement, isThisIdentifier, getFirstIdentifier, isPartOfTypeNode, AnyImportSyntax, hasDynamicName, skipParentheses, nodeIsPresent, isAmbientDeclaration } from "./utils";


export function createEmitResolver(file: SourceFile, options: CompilerOptions, packageModuleType: ResolutionMode) {

    const { getNodeLinks, resolveName } = bindSourceFile(file, options, packageModuleType);

    
    function isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean {
        if (isDeclarationReadonly(node) || isVariableDeclaration(node) && isVarConst(node)) {
            // TODO: Make sure this is a valid approximation for literal types
            return !node.type && 'initializer' in node && !!node.initializer && isLiteralExpression(node.initializer);
            // Original TS version 
            // return isFreshLiteralType(getTypeOfSymbol(getSymbolOfNode(node)));
        }
        return false;
    }

    
    function isIdentifierComputedName(name: DeclarationName | undefined): boolean {
        if (!name) return false;
        if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
            return false;
        }
        let expr= isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
        while(isPropertyAccessExpression(expr)) {
            expr = expr.expression;
        }
        return isIdentifier(expr);
    }
    
    return {
        isDeclarationVisible,
        isLiteralConstDeclaration,
        createLiteralConstValue(node) {
            return 'initializer' in node && node.initializer;
        }, 
        isLateBound(node): node is LateBoundDeclaration {
            const name = getNameOfDeclaration(node);
            return !hasDynamicName(node) || isIdentifierComputedName(name)
        },
        isImplementationOfOverload(node) {
            function getSignaturesOfSymbol(symbol: BasicSymbol | undefined): Node[] {
                if(!symbol) return emptyArray;
                if(symbol.signatureDeclarations) return symbol.signatureDeclarations;

                if (!symbol || !symbol.declarations) return (symbol.signatureDeclarations = emptyArray);
                const result: Node[] = symbol.signatureDeclarations = [];
                for (let i = 0; i < symbol.declarations.length; i++) {
                    const decl = symbol.declarations[i];
                    if (!isFunctionLike(decl) || isGetAccessor(decl) || isSetAccessor(decl)) {
                        // If non methods got merged in a class member bail with an empty array
                        // This is TS error behavior and we want to preserve iot as much as possible
                        // if(isClassElement(decl)) {
                        //     return emptyArray;
                        // }
                        continue;
                    };
                    // Don't include signature if node is the implementation of an overloaded function. A node is considered
                    // an implementation node if it has a body and the previous node is of the same kind and immediately
                    // precedes the implementation node (i.e. has the same parent and ends where the implementation starts).
                    if (i > 0 && (decl as FunctionLikeDeclaration).body) {
                        const previous = symbol.declarations[i - 1];
                        if (decl.parent === previous.parent && decl.kind === previous.kind && decl.pos === previous.end) {
                            continue;
                        }
                    }
                    // If this is a function or method declaration, get the signature from the @type tag for the sake of optional parameters.
                    // Exclude contextually-typed kinds because we already apply the @type tag to the context, plus applying it here to the initializer would supress checks that the two are compatible.
                    result.push(decl);
                }
                return result;
            }

            
            if (nodeIsPresent((node as FunctionLikeDeclaration).body)) {
                if (isGetAccessor(node) || isSetAccessor(node)) return false; // Get or set accessors can never be overload implementations, but can have up to 2 signatures
                const symbol = node.symbol;
                const signaturesOfSymbol = getSignaturesOfSymbol(symbol as unknown as BasicSymbol);
                // If this function body corresponds to function with multiple signature, it is implementation of overload
                // e.g.: function foo(a: string): string;
                //       function foo(a: number): number;
                //       function foo(a: any) { // This is implementation of the overloads
                //           return a;
                //       }
                return signaturesOfSymbol.length > 1 ||
                    // If there is single signature for the symbol, it is overload if that signature isn't coming from the node
                    // e.g.: function foo(a: string): string;
                    //       function foo(a: any) { // This is implementation of the overloads
                    //           return a;
                    //       }
                    (signaturesOfSymbol.length === 1 && signaturesOfSymbol[0] !== node);
            }
            return false;
        },
        isOptionalParameter(parameter) {
            const signature = parameter.parent;
            const paramIndex = signature.parameters.indexOf(parameter);
            Debug.assert(paramIndex != -1);
            if(parameter.questionToken) return true;
            if(parameter.dotDotDotToken) return !!parameter.initializer;

            for(let i = paramIndex; i< signature.parameters.length; i++) {
                const p = signature.parameters[i];
                if(!p.questionToken && !p.initializer && !p.dotDotDotToken) {
                    return false;
                }
            }
            return true;
        },
        isEntityNameVisible,
        getTypeReferenceDirectivesForEntityName(name) {
            return undefined;
        },
        isExpandoFunctionDeclaration(){
            // Always return false, we don' support expando functions in isolatedDeclarations
            return false;
        },
        getSymbolOfExternalModuleSpecifier() {
            return undefined;
        },
        isImportRequiredByAugmentation() {
            return false;
        },
    } as Partial<EmitResolver> as EmitResolver


    function isDeclarationReadonly(declaration: Declaration): boolean {
        return !!(getCombinedModifierFlags(declaration) & ModifierFlags.Readonly && !isParameterPropertyDeclaration(declaration, declaration.parent));
    }

    /** @internal */
    function isVarConst(node: VariableDeclaration | VariableDeclarationList): boolean {
        return !!(getCombinedNodeFlags(node) & NodeFlags.Const);
    }

    function isDeclarationVisible(node: Node): boolean {
        if (node) {
            const links = getNodeLinks(node);
            if (links.isVisible === undefined) {
                links.isVisible = links.symbol?.isVisible ?? !!determineIfDeclarationIsVisible();
            }
            return links.isVisible;
        }

        return false;

        function determineIfDeclarationIsVisible() {
            switch (node.kind) {
                case SyntaxKind.JSDocCallbackTag:
                case SyntaxKind.JSDocTypedefTag:
                case SyntaxKind.JSDocEnumTag:
                    // Top-level jsdoc type aliases are considered exported
                    // First parent is comment node, second is hosting declaration or token; we only care about those tokens or declarations whose parent is a source file
                    return !!(node.parent && node.parent.parent && node.parent.parent.parent && isSourceFile(node.parent.parent.parent));
                case SyntaxKind.BindingElement:
                    return isDeclarationVisible(node.parent.parent);
                case SyntaxKind.VariableDeclaration:
                    if (isBindingPattern((node as VariableDeclaration).name) &&
                        !((node as VariableDeclaration).name as BindingPattern).elements.length) {
                        // If the binding pattern is empty, this variable declaration is not visible
                        return false;
                    }
                    // falls through
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                    // external module augmentation is always visible
                    if (isExternalModuleAugmentation(node)) {
                        return true;
                    }
                    const parent = getDeclarationContainer(node);
                    // If the node is not exported or it is not ambient module element (except import declaration)
                    if (!(getCombinedModifierFlags(node as Declaration) & ModifierFlags.Export) &&
                        !(node.kind !== SyntaxKind.ImportEqualsDeclaration && parent.kind !== SyntaxKind.SourceFile && isAmbientDeclaration(parent))) {
                        return isGlobalSourceFile(parent);
                    }
                    // Exported members/ambient module elements (exception import declaration) are visible if parent is visible
                    return isDeclarationVisible(parent);

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (hasEffectiveModifier(node, ModifierFlags.Private | ModifierFlags.Protected)) {
                        // Private/protected properties/methods are not visible
                        return false;
                    }
                    // Public properties/methods are visible if its parents are visible, so:
                    // falls through

                case SyntaxKind.Constructor:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.TypeReference:
                case SyntaxKind.ArrayType:
                case SyntaxKind.TupleType:
                case SyntaxKind.UnionType:
                case SyntaxKind.IntersectionType:
                case SyntaxKind.ParenthesizedType:
                case SyntaxKind.NamedTupleMember:
                    return isDeclarationVisible(node.parent);

                // Default binding, import specifier and namespace import is visible
                // only on demand so by default it is not visible
                case SyntaxKind.ImportClause:
                case SyntaxKind.NamespaceImport:
                case SyntaxKind.ImportSpecifier:
                    return false;

                // Type parameters are always visible
                case SyntaxKind.TypeParameter:

                // Source file and namespace export are always visible
                // falls through
                case SyntaxKind.SourceFile:
                case SyntaxKind.NamespaceExportDeclaration:
                    return true;

                // Export assignments do not create name bindings outside the module
                case SyntaxKind.ExportAssignment:
                    return false;

                default:
                    return false;
            }
        }
    }

    function hasVisibleDeclarations(symbol: BasicSymbol, shouldComputeAliasToMakeVisible: boolean): SymbolVisibilityResult | undefined {
        let aliasesToMakeVisible: LateVisibilityPaintedStatement[] | undefined;
        if (!every(filter(symbol.declarations, d => d.kind !== SyntaxKind.Identifier), getIsDeclarationVisible)) {
            return undefined;
        }
        return { accessibility: SymbolAccessibility.Accessible, aliasesToMakeVisible };

        function getIsDeclarationVisible(declaration: Declaration) {
            if (!isDeclarationVisible(declaration)) {
                // Mark the unexported alias as visible if its parent is visible
                // because these kind of aliases can be used to name types in declaration file

                const anyImportSyntax = getAnyImportSyntax(declaration);
                if (anyImportSyntax &&
                    !hasSyntacticModifier(anyImportSyntax, ModifierFlags.Export) && // import clause without export
                    isDeclarationVisible(anyImportSyntax.parent)) {
                    return addVisibleAlias(declaration, anyImportSyntax);
                }
                else if (isVariableDeclaration(declaration) && isVariableStatement(declaration.parent.parent) &&
                    !hasSyntacticModifier(declaration.parent.parent, ModifierFlags.Export) && // unexported variable statement
                    isDeclarationVisible(declaration.parent.parent.parent)) {
                    return addVisibleAlias(declaration, declaration.parent.parent);
                }
                else if (isLateVisibilityPaintedStatement(declaration) // unexported top-level statement
                    && !hasSyntacticModifier(declaration, ModifierFlags.Export)
                    && isDeclarationVisible(declaration.parent)) {
                    return addVisibleAlias(declaration, declaration);
                }
                else if (isBindingElement(declaration)) {
                    if (symbol.flags & SymbolFlags.Alias && isInJSFile(declaration) && declaration.parent?.parent // exported import-like top-level JS require statement
                        && isVariableDeclaration(declaration.parent.parent)
                        && declaration.parent.parent.parent?.parent && isVariableStatement(declaration.parent.parent.parent.parent)
                        && !hasSyntacticModifier(declaration.parent.parent.parent.parent, ModifierFlags.Export)
                        && declaration.parent.parent.parent.parent.parent // check if the thing containing the variable statement is visible (ie, the file)
                        && isDeclarationVisible(declaration.parent.parent.parent.parent.parent)) {
                        return addVisibleAlias(declaration, declaration.parent.parent.parent.parent);
                    }
                    else if (symbol.flags & SymbolFlags.BlockScopedVariable) {
                        const variableStatement = findAncestor(declaration, isVariableStatement)!;
                        if (hasSyntacticModifier(variableStatement, ModifierFlags.Export)) {
                            return true;
                        }
                        if (!isDeclarationVisible(variableStatement.parent)) {
                            return false;
                        }
                        return addVisibleAlias(declaration, variableStatement);
                    }
                }

                // Declaration is not visible
                return false;
            }

            return true;
        }

        function addVisibleAlias(declaration: Declaration, aliasingStatement: LateVisibilityPaintedStatement) {
            // In function "buildTypeDisplay" where we decide whether to write type-alias or serialize types,
            // we want to just check if type- alias is accessible or not but we don't care about emitting those alias at that time
            // since we will do the emitting later in trackSymbol.
            if (shouldComputeAliasToMakeVisible) {
                getNodeLinks(declaration).isVisible = true;
                aliasesToMakeVisible = appendIfUnique(aliasesToMakeVisible, aliasingStatement);
            }
            return true;
        }
    }

    function isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult {
        // get symbol of the first identifier of the entityName
        let meaning: SymbolFlags;
        if (entityName.parent.kind === SyntaxKind.TypeQuery ||
            entityName.parent.kind === SyntaxKind.ExpressionWithTypeArguments && !isPartOfTypeNode(entityName.parent) ||
            entityName.parent.kind === SyntaxKind.ComputedPropertyName) {
            // Typeof value
            meaning = SymbolFlags.Value | SymbolFlags.ExportValue;
        }
        else if (entityName.kind === SyntaxKind.QualifiedName || entityName.kind === SyntaxKind.PropertyAccessExpression ||
            entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration) {
            // Left identifier from type reference or TypeAlias
            // Entity name of the import declaration
            meaning = SymbolFlags.Namespace;
        }
        else {
            // Type Reference or TypeAlias entity = Identifier
            meaning = SymbolFlags.Type;
        }
        const firstIdentifier = getFirstIdentifier(entityName);
        const symbol = resolveName(enclosingDeclaration, firstIdentifier.escapedText, meaning);
        if (symbol && symbol.flags & SymbolFlags.TypeParameter && meaning & SymbolFlags.Type) {
            return { accessibility: SymbolAccessibility.Accessible };
        }
        if (!symbol && isThisIdentifier(firstIdentifier) 
            // TODO: isolatedDeclarations: Just assume this is accessible
            // && isSymbolAccessible(getSymbolOfNode(getThisContainer(firstIdentifier, /*includeArrowFunctions*/ false)), firstIdentifier, meaning, /*computeAliases*/ false).accessibility === SymbolAccessibility.Accessible
        ) {
            // TODO: isolatedDeclarations: Is this ever hit for declarations ?
            // debugger;
            return { accessibility: SymbolAccessibility.Accessible };
        }

        // Verify if the symbol is accessible
        return (symbol && hasVisibleDeclarations(symbol, /*shouldComputeAliasToMakeVisible*/ true)) || {
            // TODO: isolatedDeclarations: In TS this would be an inaccessible symbol, but TS will give errors we just transform 
            // We don't actually keep enough information for full accessibility,
            // We just do this to mark accessible imports
            accessibility: SymbolAccessibility.Accessible, 
            errorSymbolName: getTextOfNode(firstIdentifier),
            errorNode: firstIdentifier
        };
    }
}

/** @internal */
export function getRootDeclaration(node: Node): Node {
    while (node.kind === SyntaxKind.BindingElement) {
        node = node.parent.parent;
    }
    return node;
}

function getDeclarationContainer(node: Node): Node {
    return findAncestor(getRootDeclaration(node), node => {
        switch (node.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.VariableDeclarationList:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamespaceImport:
            case SyntaxKind.ImportClause:
                return false;
            default:
                return true;
        }
    })!.parent;
}

// Isolated declarations never support global source files.
function isGlobalSourceFile(node: Node) {
    return isSourceFile(node) && !isExternalModule(node);
}
export function isExternalModule(file: SourceFile): boolean {
    return file.externalModuleIndicator !== undefined;
}

function getAnyImportSyntax(node: Node): AnyImportSyntax | undefined {
    switch (node.kind) {
        case SyntaxKind.ImportEqualsDeclaration:
            return node as ImportEqualsDeclaration;
        case SyntaxKind.ImportClause:
            return (node as ImportClause).parent;
        case SyntaxKind.NamespaceImport:
            return (node as NamespaceImport).parent.parent;
        case SyntaxKind.ImportSpecifier:
            return (node as ImportSpecifier).parent.parent.parent;
        default:
            return undefined;
    }
}
