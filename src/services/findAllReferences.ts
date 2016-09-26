/* @internal */
namespace ts.FindAllReferences {
    export function findReferencedSymbols(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFiles: SourceFile[], sourceFile: SourceFile, position: number, findInStrings: boolean, findInComments: boolean): ReferencedSymbol[] {
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        if (node === sourceFile) {
            return undefined;
        }

        switch (node.kind) {
            case SyntaxKind.NumericLiteral:
                if (!isLiteralNameOfPropertyDeclarationOrIndexAccess(node)) {
                    break;
                }
                // Fallthrough
            case SyntaxKind.Identifier:
            case SyntaxKind.ThisKeyword:
            // case SyntaxKind.SuperKeyword: TODO:GH#9268
            case SyntaxKind.ConstructorKeyword:
            case SyntaxKind.StringLiteral:
                return getReferencedSymbolsForNode(typeChecker, cancellationToken, node, sourceFiles, findInStrings, findInComments, /*implementations*/false);
        }
        return undefined;
    }

    export function getReferencedSymbolsForNode(typeChecker: TypeChecker, cancellationToken: CancellationToken, node: Node, sourceFiles: SourceFile[], findInStrings: boolean, findInComments: boolean, implementations: boolean): ReferencedSymbol[] {
        if (!implementations) {
            // Labels
            if (isLabelName(node)) {
                if (isJumpStatementTarget(node)) {
                    const labelDefinition = getTargetLabel((<BreakOrContinueStatement>node.parent), (<Identifier>node).text);
                    // if we have a label definition, look within its statement for references, if not, then
                    // the label is undefined and we have no results..
                    return labelDefinition ? getLabelReferencesInNode(labelDefinition.parent, labelDefinition) : undefined;
                }
                else {
                    // it is a label definition and not a target, search within the parent labeledStatement
                    return getLabelReferencesInNode(node.parent, <Identifier>node);
                }
            }

            if (isThis(node)) {
                return getReferencesForThisKeyword(node, sourceFiles);
            }

            if (node.kind === SyntaxKind.SuperKeyword) {
                return getReferencesForSuperKeyword(node);
            }
        }

        // `getSymbolAtLocation` normally returns the symbol of the class when given the constructor keyword,
        // so we have to specify that we want the constructor symbol.
        const symbol = typeChecker.getSymbolAtLocation(node);

        if (!implementations && !symbol && node.kind === SyntaxKind.StringLiteral) {
            return getReferencesForStringLiteral(<StringLiteral>node, sourceFiles);
        }


        // Could not find a symbol e.g. unknown identifier
        if (!symbol) {
            // Can't have references to something that we have no symbol for.
            return undefined;
        }

        const declarations = symbol.declarations;

        // The symbol was an internal symbol and does not have a declaration e.g. undefined symbol
        if (!declarations || !declarations.length) {
            return undefined;
        }

        let result: ReferencedSymbol[];

        // Compute the meaning from the location and the symbol it references
        const searchMeaning = getIntersectingMeaningFromDeclarations(getMeaningFromLocation(node), declarations);

        // Get the text to search for.
        // Note: if this is an external module symbol, the name doesn't include quotes.
        const declaredName = stripQuotes(getDeclaredName(typeChecker, symbol, node));

        // Try to get the smallest valid scope that we can limit our search to;
        // otherwise we'll need to search globally (i.e. include each file).
        const scope = getSymbolScope(symbol);

        // Maps from a symbol ID to the ReferencedSymbol entry in 'result'.
        const symbolToIndex: number[] = [];

        if (scope) {
            result = [];
            getReferencesInNode(scope, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result, symbolToIndex);
        }
        else {
            const internedName = getInternedName(symbol, node, declarations);
            for (const sourceFile of sourceFiles) {
                cancellationToken.throwIfCancellationRequested();

                const nameTable = getNameTable(sourceFile);

                if (nameTable.get(internedName) !== undefined) {
                    result = result || [];
                    getReferencesInNode(sourceFile, symbol, declaredName, node, searchMeaning, findInStrings, findInComments, result, symbolToIndex);
                }
            }
        }

        return result;

        function getDefinition(symbol: Symbol): ReferencedSymbolDefinitionInfo {
            const info = SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, node.getSourceFile(), getContainerNode(node), node);
            const name = map(info.displayParts, p => p.text).join("");
            const declarations = symbol.declarations;
            if (!declarations || declarations.length === 0) {
                return undefined;
            }

            return {
                containerKind: "",
                containerName: "",
                name,
                kind: info.symbolKind,
                fileName: declarations[0].getSourceFile().fileName,
                textSpan: createTextSpan(declarations[0].getStart(), 0),
                displayParts: info.displayParts
            };
        }

        function getAliasSymbolForPropertyNameSymbol(symbol: Symbol, location: Node): Symbol | undefined {
            if (symbol.flags & SymbolFlags.Alias) {
                // Default import get alias
                const defaultImport = getDeclarationOfKind(symbol, SyntaxKind.ImportClause);
                if (defaultImport) {
                    return typeChecker.getAliasedSymbol(symbol);
                }

                const importOrExportSpecifier = <ImportOrExportSpecifier>forEach(symbol.declarations,
                    declaration => (declaration.kind === SyntaxKind.ImportSpecifier ||
                        declaration.kind === SyntaxKind.ExportSpecifier) ? declaration : undefined);
                if (importOrExportSpecifier &&
                    // export { a }
                    (!importOrExportSpecifier.propertyName ||
                        // export {a as class } where a is location
                        importOrExportSpecifier.propertyName === location)) {
                    // If Import specifier -> get alias
                    // else Export specifier -> get local target
                    return importOrExportSpecifier.kind === SyntaxKind.ImportSpecifier ?
                        typeChecker.getAliasedSymbol(symbol) :
                        typeChecker.getExportSpecifierLocalTargetSymbol(importOrExportSpecifier);
                }
            }
            return undefined;
        }

        function followAliasIfNecessary(symbol: Symbol, location: Node): Symbol {
            return getAliasSymbolForPropertyNameSymbol(symbol, location) || symbol;
        }

        function getPropertySymbolOfDestructuringAssignment(location: Node) {
            return isArrayLiteralOrObjectLiteralDestructuringPattern(location.parent.parent) &&
                typeChecker.getPropertySymbolOfDestructuringAssignment(<Identifier>location);
        }

        function isObjectBindingPatternElementWithoutPropertyName(symbol: Symbol) {
            const bindingElement = <BindingElement>getDeclarationOfKind(symbol, SyntaxKind.BindingElement);
            return bindingElement &&
                bindingElement.parent.kind === SyntaxKind.ObjectBindingPattern &&
                !bindingElement.propertyName;
        }

        function getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol: Symbol) {
            if (isObjectBindingPatternElementWithoutPropertyName(symbol)) {
                const bindingElement = <BindingElement>getDeclarationOfKind(symbol, SyntaxKind.BindingElement);
                const typeOfPattern = typeChecker.getTypeAtLocation(bindingElement.parent);
                return typeOfPattern && typeChecker.getPropertyOfType(typeOfPattern, (<Identifier>bindingElement.name).text);
            }
            return undefined;
        }

        function getInternedName(symbol: Symbol, location: Node, declarations: Declaration[]): string {
            // If this is an export or import specifier it could have been renamed using the 'as' syntax.
            // If so we want to search for whatever under the cursor.
            if (isImportOrExportSpecifierName(location)) {
                return location.getText();
            }

            // Try to get the local symbol if we're dealing with an 'export default'
            // since that symbol has the "true" name.
            const localExportDefaultSymbol = getLocalSymbolForExportDefault(symbol);
            symbol = localExportDefaultSymbol || symbol;

            return stripQuotes(symbol.name);
        }

        /**
         * Determines the smallest scope in which a symbol may have named references.
         * Note that not every construct has been accounted for. This function can
         * probably be improved.
         *
         * @returns undefined if the scope cannot be determined, implying that
         * a reference to a symbol can occur anywhere.
         */
        function getSymbolScope(symbol: Symbol): Node {
            // If this is the symbol of a named function expression or named class expression,
            // then named references are limited to its own scope.
            const valueDeclaration = symbol.valueDeclaration;
            if (valueDeclaration && (valueDeclaration.kind === SyntaxKind.FunctionExpression || valueDeclaration.kind === SyntaxKind.ClassExpression)) {
                return valueDeclaration;
            }

            // If this is private property or method, the scope is the containing class
            if (symbol.flags & (SymbolFlags.Property | SymbolFlags.Method)) {
                const privateDeclaration = forEach(symbol.getDeclarations(), d => (getModifierFlags(d) & ModifierFlags.Private) ? d : undefined);
                if (privateDeclaration) {
                    return getAncestor(privateDeclaration, SyntaxKind.ClassDeclaration);
                }
            }

            // If the symbol is an import we would like to find it if we are looking for what it imports.
            // So consider it visible outside its declaration scope.
            if (symbol.flags & SymbolFlags.Alias) {
                return undefined;
            }

            // If symbol is of object binding pattern element without property name we would want to
            // look for property too and that could be anywhere
            if (isObjectBindingPatternElementWithoutPropertyName(symbol)) {
                return undefined;
            }

            // if this symbol is visible from its parent container, e.g. exported, then bail out
            // if symbol correspond to the union property - bail out
            if (symbol.parent || (symbol.flags & SymbolFlags.SyntheticProperty)) {
                return undefined;
            }

            let scope: Node;

            const declarations = symbol.getDeclarations();
            if (declarations) {
                for (const declaration of declarations) {
                    const container = getContainerNode(declaration);

                    if (!container) {
                        return undefined;
                    }

                    if (scope && scope !== container) {
                        // Different declarations have different containers, bail out
                        return undefined;
                    }

                    if (container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container)) {
                        // This is a global variable and not an external module, any declaration defined
                        // within this scope is visible outside the file
                        return undefined;
                    }

                    // The search scope is the container node
                    scope = container;
                }
            }

            return scope;
        }

        function getPossibleSymbolReferencePositions(sourceFile: SourceFile, symbolName: string, start: number, end: number): number[] {
            const positions: number[] = [];

            /// TODO: Cache symbol existence for files to save text search
            // Also, need to make this work for unicode escapes.

            // Be resilient in the face of a symbol with no name or zero length name
            if (!symbolName || !symbolName.length) {
                return positions;
            }

            const text = sourceFile.text;
            const sourceLength = text.length;
            const symbolNameLength = symbolName.length;

            let position = text.indexOf(symbolName, start);
            while (position >= 0) {
                cancellationToken.throwIfCancellationRequested();

                // If we are past the end, stop looking
                if (position > end) break;

                // We found a match.  Make sure it's not part of a larger word (i.e. the char
                // before and after it have to be a non-identifier char).
                const endPosition = position + symbolNameLength;

                if ((position === 0 || !isIdentifierPart(text.charCodeAt(position - 1), ScriptTarget.Latest)) &&
                    (endPosition === sourceLength || !isIdentifierPart(text.charCodeAt(endPosition), ScriptTarget.Latest))) {
                    // Found a real match.  Keep searching.
                    positions.push(position);
                }
                position = text.indexOf(symbolName, position + symbolNameLength + 1);
            }

            return positions;
        }

        function getLabelReferencesInNode(container: Node, targetLabel: Identifier): ReferencedSymbol[] {
            const references: ReferenceEntry[] = [];
            const sourceFile = container.getSourceFile();
            const labelName = targetLabel.text;
            const possiblePositions = getPossibleSymbolReferencePositions(sourceFile, labelName, container.getStart(), container.getEnd());
            forEach(possiblePositions, position => {
                cancellationToken.throwIfCancellationRequested();

                const node = getTouchingWord(sourceFile, position);
                if (!node || node.getWidth() !== labelName.length) {
                    return;
                }

                // Only pick labels that are either the target label, or have a target that is the target label
                if (node === targetLabel ||
                    (isJumpStatementTarget(node) && getTargetLabel(node, labelName) === targetLabel)) {
                    references.push(getReferenceEntryFromNode(node));
                }
            });

            const definition: ReferencedSymbolDefinitionInfo = {
                containerKind: "",
                containerName: "",
                fileName: targetLabel.getSourceFile().fileName,
                kind: ScriptElementKind.label,
                name: labelName,
                textSpan: createTextSpanFromBounds(targetLabel.getStart(), targetLabel.getEnd()),
                displayParts: [displayPart(labelName, SymbolDisplayPartKind.text)]
            };

            return [{ definition, references }];
        }

        function isValidReferencePosition(node: Node, searchSymbolName: string): boolean {
            if (node) {
                // Compare the length so we filter out strict superstrings of the symbol we are looking for
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        return node.getWidth() === searchSymbolName.length;

                    case SyntaxKind.StringLiteral:
                        if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node) ||
                            isNameOfExternalModuleImportOrDeclaration(node)) {
                            // For string literals we have two additional chars for the quotes
                            return node.getWidth() === searchSymbolName.length + 2;
                        }
                        break;

                    case SyntaxKind.NumericLiteral:
                        if (isLiteralNameOfPropertyDeclarationOrIndexAccess(node)) {
                            return node.getWidth() === searchSymbolName.length;
                        }
                        break;
                }
            }

            return false;
        }

        /** Search within node "container" for references for a search value, where the search value is defined as a
          * tuple of(searchSymbol, searchText, searchLocation, and searchMeaning).
          * searchLocation: a node where the search value
          */
        function getReferencesInNode(container: Node,
            searchSymbol: Symbol,
            searchText: string,
            searchLocation: Node,
            searchMeaning: SemanticMeaning,
            findInStrings: boolean,
            findInComments: boolean,
            result: ReferencedSymbol[],
            symbolToIndex: number[]): void {

            const sourceFile = container.getSourceFile();

            const start = findInComments ? container.getFullStart() : container.getStart();
            const possiblePositions = getPossibleSymbolReferencePositions(sourceFile, searchText, start, container.getEnd());

            const parents = getParentSymbolsOfPropertyAccess();
            const inheritsFromCache = new StringMap<boolean>();

            if (possiblePositions.length) {
                // Build the set of symbols to search for, initially it has only the current symbol
                const searchSymbols = populateSearchSymbolSet(searchSymbol, searchLocation);

                forEach(possiblePositions, position => {
                    cancellationToken.throwIfCancellationRequested();

                    const referenceLocation = getTouchingPropertyName(sourceFile, position);
                    if (!isValidReferencePosition(referenceLocation, searchText)) {
                        // This wasn't the start of a token.  Check to see if it might be a
                        // match in a comment or string if that's what the caller is asking
                        // for.
                        if (!implementations && ((findInStrings && isInString(sourceFile, position)) ||
                            (findInComments && isInNonReferenceComment(sourceFile, position)))) {

                            // In the case where we're looking inside comments/strings, we don't have
                            // an actual definition.  So just use 'undefined' here.  Features like
                            // 'Rename' won't care (as they ignore the definitions), and features like
                            // 'FindReferences' will just filter out these results.
                            result.push({
                                definition: undefined,
                                references: [{
                                    fileName: sourceFile.fileName,
                                    textSpan: createTextSpan(position, searchText.length),
                                    isWriteAccess: false,
                                    isDefinition: false
                                }]
                            });
                        }
                        return;
                    }

                    if (!(getMeaningFromLocation(referenceLocation) & searchMeaning)) {
                        return;
                    }

                    const referenceSymbol = typeChecker.getSymbolAtLocation(referenceLocation);
                    if (referenceSymbol) {
                        const referenceSymbolDeclaration = referenceSymbol.valueDeclaration;
                        const shorthandValueSymbol = typeChecker.getShorthandAssignmentValueSymbol(referenceSymbolDeclaration);
                        const relatedSymbol = getRelatedSymbol(searchSymbols, referenceSymbol, referenceLocation,
                            /*searchLocationIsConstructor*/ searchLocation.kind === SyntaxKind.ConstructorKeyword, parents, inheritsFromCache);

                        if (relatedSymbol) {
                            addReferenceToRelatedSymbol(referenceLocation, relatedSymbol);
                        }
                        /* Because in short-hand property assignment, an identifier which stored as name of the short-hand property assignment
                            * has two meaning : property name and property value. Therefore when we do findAllReference at the position where
                            * an identifier is declared, the language service should return the position of the variable declaration as well as
                            * the position in short-hand property assignment excluding property accessing. However, if we do findAllReference at the
                            * position of property accessing, the referenceEntry of such position will be handled in the first case.
                            */
                        else if (!(referenceSymbol.flags & SymbolFlags.Transient) && searchSymbols.indexOf(shorthandValueSymbol) >= 0) {
                            addReferenceToRelatedSymbol(referenceSymbolDeclaration.name, shorthandValueSymbol);
                        }
                        else if (searchLocation.kind === SyntaxKind.ConstructorKeyword) {
                            findAdditionalConstructorReferences(referenceSymbol, referenceLocation);
                        }
                    }
                });
            }
            return;

            /* If we are just looking for implementations and this is a property access expression, we need to get the
             * symbol of the local type of the symbol the property is being accessed on. This is because our search
             * symbol may have a different parent symbol if the local type's symbol does not declare the property
             * being accessed (i.e. it is declared in some parent class or interface)
             */
            function getParentSymbolsOfPropertyAccess(): Symbol[] | undefined {
                if (implementations) {
                    const propertyAccessExpression = getPropertyAccessExpressionFromRightHandSide(searchLocation);
                    if (propertyAccessExpression) {
                        const localParentType = typeChecker.getTypeAtLocation(propertyAccessExpression.expression);
                        if (localParentType) {
                            if (localParentType.symbol && localParentType.symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface) && localParentType.symbol !== searchSymbol.parent) {
                                return [localParentType.symbol];
                            }
                            else if (localParentType.flags & TypeFlags.UnionOrIntersection) {
                                return getSymbolsForClassAndInterfaceComponents(<UnionOrIntersectionType>localParentType);
                            }
                        }
                    }
                }
            }

            function getPropertyAccessExpressionFromRightHandSide(node: Node): PropertyAccessExpression {
                return isRightSideOfPropertyAccess(node) && <PropertyAccessExpression>node.parent;
            }

            /** Adds references when a constructor is used with `new this()` in its own class and `super()` calls in subclasses.  */
            function findAdditionalConstructorReferences(referenceSymbol: Symbol, referenceLocation: Node): void {
                Debug.assert(isClassLike(searchSymbol.valueDeclaration));

                const referenceClass = referenceLocation.parent;
                if (referenceSymbol === searchSymbol && isClassLike(referenceClass)) {
                    Debug.assert(referenceClass.name === referenceLocation);
                    // This is the class declaration containing the constructor.
                    addReferences(findOwnConstructorCalls(searchSymbol));
                }
                else {
                    // If this class appears in `extends C`, then the extending class' "super" calls are references.
                    const classExtending = tryGetClassByExtendingIdentifier(referenceLocation);
                    if (classExtending && isClassLike(classExtending) && followAliasIfNecessary(referenceSymbol, referenceLocation) === searchSymbol) {
                        addReferences(superConstructorAccesses(classExtending));
                    }
                }
            }

            function addReferences(references: Node[]): void {
                if (references.length) {
                    const referencedSymbol = getReferencedSymbol(searchSymbol);
                    addRange(referencedSymbol.references, map(references, getReferenceEntryFromNode));
                }
            }

            /** `classSymbol` is the class where the constructor was defined.
             * Reference the constructor and all calls to `new this()`.
             */
            function findOwnConstructorCalls(classSymbol: Symbol): Node[] {
                const result: Node[] = [];

                for (const decl of classSymbol.members.get("__constructor").declarations) {
                    Debug.assert(decl.kind === SyntaxKind.Constructor);
                    const ctrKeyword = decl.getChildAt(0);
                    Debug.assert(ctrKeyword.kind === SyntaxKind.ConstructorKeyword);
                    result.push(ctrKeyword);
                }

                classSymbol.exports.forEach(member => {
                    const decl = member.valueDeclaration;
                    if (decl && decl.kind === SyntaxKind.MethodDeclaration) {
                        const body = (<MethodDeclaration>decl).body;
                        if (body) {
                            forEachDescendantOfKind(body, SyntaxKind.ThisKeyword, thisKeyword => {
                                if (isNewExpressionTarget(thisKeyword)) {
                                    result.push(thisKeyword);
                                }
                            });
                        }
                    }
                });

                return result;
            }

            /** Find references to `super` in the constructor of an extending class.  */
            function superConstructorAccesses(cls: ClassLikeDeclaration): Node[] {
                const symbol = cls.symbol;
                const ctr = symbol.members.get("__constructor");
                if (!ctr) {
                    return [];
                }

                const result: Node[] = [];
                for (const decl of ctr.declarations) {
                    Debug.assert(decl.kind === SyntaxKind.Constructor);
                    const body = (<ConstructorDeclaration>decl).body;
                    if (body) {
                        forEachDescendantOfKind(body, SyntaxKind.SuperKeyword, node => {
                            if (isCallExpressionTarget(node)) {
                                result.push(node);
                            }
                        });
                    }
                };
                return result;
            }

            function getReferencedSymbol(symbol: Symbol): ReferencedSymbol {
                const symbolId = getSymbolId(symbol);
                let index = symbolToIndex[symbolId];
                if (index === undefined) {
                    index = result.length;
                    symbolToIndex[symbolId] = index;

                    result.push({
                        definition: getDefinition(symbol),
                        references: []
                    });
                }

                return result[index];
            }

            function addReferenceToRelatedSymbol(node: Node, relatedSymbol: Symbol) {
                const references = getReferencedSymbol(relatedSymbol).references;
                if (implementations) {
                    getImplementationReferenceEntryForNode(node, references);
                }
                else {
                    references.push(getReferenceEntryFromNode(node));
                }
            }
        }

        function getImplementationReferenceEntryForNode(refNode: Node, result: ReferenceEntry[]): void {
            // Check if we found a function/propertyAssignment/method with an implementation or initializer
            if (isDeclarationName(refNode) && isImplementation(refNode.parent)) {
                result.push(getReferenceEntryFromNode(refNode.parent));
            }
            else if (refNode.kind === SyntaxKind.Identifier) {
                if (refNode.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    // Go ahead and dereference the shorthand assignment by going to its definition
                    getReferenceEntriesForShorthandPropertyAssignment(refNode, typeChecker, result);
                }

                // Check if the node is within an extends or implements clause
                const containingClass = getContainingClassIfInHeritageClause(refNode);
                if (containingClass) {
                    result.push(getReferenceEntryFromNode(containingClass));
                    return;
                }

                // If we got a type reference, try and see if the reference applies to any expressions that can implement an interface
                const containingTypeReference = getContainingTypeReference(refNode);
                if (containingTypeReference) {
                    const parent = containingTypeReference.parent;
                    if (isVariableLike(parent) && parent.type === containingTypeReference && parent.initializer && isImplementationExpression(parent.initializer)) {
                        maybeAdd(getReferenceEntryFromNode(parent.initializer));
                    }
                    else if (isFunctionLike(parent) && parent.type === containingTypeReference && parent.body) {
                        if (parent.body.kind === SyntaxKind.Block) {
                            forEachReturnStatement(<Block>parent.body, returnStatement => {
                                if (returnStatement.expression && isImplementationExpression(returnStatement.expression)) {
                                    maybeAdd(getReferenceEntryFromNode(returnStatement.expression));
                                }
                            });
                        }
                        else if (isImplementationExpression(<Expression>parent.body)) {
                            maybeAdd(getReferenceEntryFromNode(parent.body));
                        }
                    }
                    else if (isAssertionExpression(parent) && isImplementationExpression(parent.expression)) {
                        maybeAdd(getReferenceEntryFromNode(parent.expression));
                    }
                }
            }

            // Type nodes can contain multiple references to the same type. For example:
            //      let x: Foo & (Foo & Bar) = ...
            // Because we are returning the implementation locations and not the identifier locations,
            // duplicate entries would be returned here as each of the type references is part of
            // the same implementation. For that reason, check before we add a new entry
            function maybeAdd(a: ReferenceEntry) {
                if (!forEach(result, b => a.fileName === b.fileName && a.textSpan.start === b.textSpan.start && a.textSpan.length === b.textSpan.length)) {
                    result.push(a);
                }
            }
        }

        function getSymbolsForClassAndInterfaceComponents(type: UnionOrIntersectionType, result: Symbol[] = []): Symbol[] {
            for (const componentType of type.types) {
                if (componentType.symbol && componentType.symbol.getFlags() & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    result.push(componentType.symbol);
                }
                if (componentType.getFlags() & TypeFlags.UnionOrIntersection) {
                    getSymbolsForClassAndInterfaceComponents(<UnionOrIntersectionType>componentType, result);
                }
            }
            return result;
        }

        function getContainingTypeReference(node: Node): Node {
            let topLevelTypeReference: Node = undefined;

            while (node) {
                if (isTypeNode(node)) {
                    topLevelTypeReference = node;
                }
                node = node.parent;
            }

            return topLevelTypeReference;
        }

        function getContainingClassIfInHeritageClause(node: Node): ClassLikeDeclaration {
            if (node && node.parent) {
                if (node.kind === SyntaxKind.ExpressionWithTypeArguments
                    && node.parent.kind === SyntaxKind.HeritageClause
                    && isClassLike(node.parent.parent)) {
                    return node.parent.parent;
                }

                else if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PropertyAccessExpression) {
                    return getContainingClassIfInHeritageClause(node.parent);
                }
            }
            return undefined;
        }

        /**
         * Returns true if this is an expression that can be considered an implementation
         */
        function isImplementationExpression(node: Expression): boolean {
            // Unwrap parentheses
            if (node.kind === SyntaxKind.ParenthesizedExpression) {
                return isImplementationExpression((<ParenthesizedExpression>node).expression);
            }

            return node.kind === SyntaxKind.ArrowFunction ||
                node.kind === SyntaxKind.FunctionExpression ||
                node.kind === SyntaxKind.ObjectLiteralExpression ||
                node.kind === SyntaxKind.ClassExpression ||
                node.kind === SyntaxKind.ArrayLiteralExpression;
        }

        /**
         * Determines if the parent symbol occurs somewhere in the child's ancestry. If the parent symbol
         * is an interface, determines if some ancestor of the child symbol extends or inherits from it.
         * Also takes in a cache of previous results which makes this slightly more efficient and is
         * necessary to avoid potential loops like so:
         *     class A extends B { }
         *     class B extends A { }
         *
         * We traverse the AST rather than using the type checker because users are typically only interested
         * in explicit implementations of an interface/class when calling "Go to Implementation". Sibling
         * implementations of types that share a common ancestor with the type whose implementation we are
         * searching for need to be filtered out of the results. The type checker doesn't let us make the
         * distinction between structurally compatible implementations and explicit implementations, so we
         * must use the AST.
         *
         * @param child         A class or interface Symbol
         * @param parent        Another class or interface Symbol
         * @param cachedResults A map of symbol id pairs (i.e. "child,parent") to booleans indicating previous results
         */
        function explicitlyInheritsFrom(child: Symbol, parent: Symbol, cachedResults: Map<string, boolean>): boolean {
            const parentIsInterface = parent.getFlags() & SymbolFlags.Interface;
            return searchHierarchy(child);

            function searchHierarchy(symbol: Symbol): boolean {
                if (symbol === parent) {
                    return true;
                }

                const key = getSymbolId(symbol) + "," + getSymbolId(parent);
                const cachedResult = cachedResults.get(key);
                if (cachedResult !== undefined) {
                    return cachedResult;
                }

                // Set the key so that we don't infinitely recurse
                cachedResults.set(key, false);

                const inherits = forEach(symbol.getDeclarations(), declaration => {
                    if (isClassLike(declaration)) {
                        if (parentIsInterface) {
                            const interfaceReferences = getClassImplementsHeritageClauseElements(declaration);
                            if (interfaceReferences) {
                                for (const typeReference of interfaceReferences) {
                                    if (searchTypeReference(typeReference)) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return searchTypeReference(getClassExtendsHeritageClauseElement(declaration));
                    }
                    else if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                        if (parentIsInterface) {
                            return forEach(getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration), searchTypeReference);
                        }
                    }
                    return false;
                });

                cachedResults.set(key, inherits);
                return inherits;
            }

            function searchTypeReference(typeReference: ExpressionWithTypeArguments): boolean {
                if (typeReference) {
                    const type = typeChecker.getTypeAtLocation(typeReference);
                    if (type && type.symbol) {
                        return searchHierarchy(type.symbol);
                    }
                }
                return false;
            }
        }

        function getReferencesForSuperKeyword(superKeyword: Node): ReferencedSymbol[] {
            let searchSpaceNode = getSuperContainer(superKeyword, /*stopOnFunctions*/ false);
            if (!searchSpaceNode) {
                return undefined;
            }
            // Whether 'super' occurs in a static context within a class.
            let staticFlag = ModifierFlags.Static;

            switch (searchSpaceNode.kind) {
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    staticFlag &= getModifierFlags(searchSpaceNode);
                    searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                    break;
                default:
                    return undefined;
            }

            const references: ReferenceEntry[] = [];

            const sourceFile = searchSpaceNode.getSourceFile();
            const possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "super", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
            forEach(possiblePositions, position => {
                cancellationToken.throwIfCancellationRequested();

                const node = getTouchingWord(sourceFile, position);

                if (!node || node.kind !== SyntaxKind.SuperKeyword) {
                    return;
                }

                const container = getSuperContainer(node, /*stopOnFunctions*/ false);

                // If we have a 'super' container, we must have an enclosing class.
                // Now make sure the owning class is the same as the search-space
                // and has the same static qualifier as the original 'super's owner.
                if (container && (ModifierFlags.Static & getModifierFlags(container)) === staticFlag && container.parent.symbol === searchSpaceNode.symbol) {
                    references.push(getReferenceEntryFromNode(node));
                }
            });

            const definition = getDefinition(searchSpaceNode.symbol);
            return [{ definition, references }];
        }

        function getReferencesForThisKeyword(thisOrSuperKeyword: Node, sourceFiles: SourceFile[]): ReferencedSymbol[] {
            let searchSpaceNode = getThisContainer(thisOrSuperKeyword, /* includeArrowFunctions */ false);

            // Whether 'this' occurs in a static context within a class.
            let staticFlag = ModifierFlags.Static;

            switch (searchSpaceNode.kind) {
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    if (isObjectLiteralMethod(searchSpaceNode)) {
                        break;
                    }
                // fall through
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    staticFlag &= getModifierFlags(searchSpaceNode);
                    searchSpaceNode = searchSpaceNode.parent; // re-assign to be the owning class
                    break;
                case SyntaxKind.SourceFile:
                    if (isExternalModule(<SourceFile>searchSpaceNode)) {
                        return undefined;
                    }
                // Fall through
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                    break;
                // Computed properties in classes are not handled here because references to this are illegal,
                // so there is no point finding references to them.
                default:
                    return undefined;
            }

            const references: ReferenceEntry[] = [];

            let possiblePositions: number[];
            if (searchSpaceNode.kind === SyntaxKind.SourceFile) {
                forEach(sourceFiles, sourceFile => {
                    possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "this", sourceFile.getStart(), sourceFile.getEnd());
                    getThisReferencesInFile(sourceFile, sourceFile, possiblePositions, references);
                });
            }
            else {
                const sourceFile = searchSpaceNode.getSourceFile();
                possiblePositions = getPossibleSymbolReferencePositions(sourceFile, "this", searchSpaceNode.getStart(), searchSpaceNode.getEnd());
                getThisReferencesInFile(sourceFile, searchSpaceNode, possiblePositions, references);
            }

            const thisOrSuperSymbol = typeChecker.getSymbolAtLocation(thisOrSuperKeyword);

            const displayParts = thisOrSuperSymbol && SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(
                typeChecker, thisOrSuperSymbol, thisOrSuperKeyword.getSourceFile(), getContainerNode(thisOrSuperKeyword), thisOrSuperKeyword).displayParts;

            return [{
                definition: {
                    containerKind: "",
                    containerName: "",
                    fileName: node.getSourceFile().fileName,
                    kind: ScriptElementKind.variableElement,
                    name: "this",
                    textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd()),
                    displayParts
                },
                references: references
            }];

            function getThisReferencesInFile(sourceFile: SourceFile, searchSpaceNode: Node, possiblePositions: number[], result: ReferenceEntry[]): void {
                forEach(possiblePositions, position => {
                    cancellationToken.throwIfCancellationRequested();

                    const node = getTouchingWord(sourceFile, position);
                    if (!node || !isThis(node)) {
                        return;
                    }

                    const container = getThisContainer(node, /* includeArrowFunctions */ false);

                    switch (searchSpaceNode.kind) {
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.FunctionDeclaration:
                            if (searchSpaceNode.symbol === container.symbol) {
                                result.push(getReferenceEntryFromNode(node));
                            }
                            break;
                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
                            if (isObjectLiteralMethod(searchSpaceNode) && searchSpaceNode.symbol === container.symbol) {
                                result.push(getReferenceEntryFromNode(node));
                            }
                            break;
                        case SyntaxKind.ClassExpression:
                        case SyntaxKind.ClassDeclaration:
                            // Make sure the container belongs to the same class
                            // and has the appropriate static modifier from the original container.
                            if (container.parent && searchSpaceNode.symbol === container.parent.symbol && (getModifierFlags(container) & ModifierFlags.Static) === staticFlag) {
                                result.push(getReferenceEntryFromNode(node));
                            }
                            break;
                        case SyntaxKind.SourceFile:
                            if (container.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>container)) {
                                result.push(getReferenceEntryFromNode(node));
                            }
                            break;
                    }
                });
            }
        }


        function getReferencesForStringLiteral(node: StringLiteral, sourceFiles: SourceFile[]): ReferencedSymbol[] {
            const type = getStringLiteralTypeForNode(node, typeChecker);

            if (!type) {
                // nothing to do here. moving on
                return undefined;
            }

            const references: ReferenceEntry[] = [];

            for (const sourceFile of sourceFiles) {
                const possiblePositions = getPossibleSymbolReferencePositions(sourceFile, type.text, sourceFile.getStart(), sourceFile.getEnd());
                getReferencesForStringLiteralInFile(sourceFile, type, possiblePositions, references);
            }

            return [{
                definition: {
                    containerKind: "",
                    containerName: "",
                    fileName: node.getSourceFile().fileName,
                    kind: ScriptElementKind.variableElement,
                    name: type.text,
                    textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd()),
                    displayParts: [displayPart(getTextOfNode(node), SymbolDisplayPartKind.stringLiteral)]
                },
                references: references
            }];

            function getReferencesForStringLiteralInFile(sourceFile: SourceFile, searchType: Type, possiblePositions: number[], references: ReferenceEntry[]): void {
                for (const position of possiblePositions) {
                    cancellationToken.throwIfCancellationRequested();

                    const node = getTouchingWord(sourceFile, position);
                    if (!node || node.kind !== SyntaxKind.StringLiteral) {
                        return;
                    }

                    const type = getStringLiteralTypeForNode(<StringLiteral>node, typeChecker);
                    if (type === searchType) {
                        references.push(getReferenceEntryFromNode(node));
                    }
                }
            }
        }

        function populateSearchSymbolSet(symbol: Symbol, location: Node): Symbol[] {
            // The search set contains at least the current symbol
            let result = [symbol];

            // If the location is name of property symbol from object literal destructuring pattern
            // Search the property symbol
            //      for ( { property: p2 } of elems) { }
            const containingObjectLiteralElement = getContainingObjectLiteralElement(location);
            if (containingObjectLiteralElement && containingObjectLiteralElement.kind !== SyntaxKind.ShorthandPropertyAssignment) {
                const propertySymbol = getPropertySymbolOfDestructuringAssignment(location);
                if (propertySymbol) {
                    result.push(propertySymbol);
                }
            }

            // If the symbol is an alias, add what it aliases to the list
            //     import {a} from "mod";
            //     export {a}
            // If the symbol is an alias to default declaration, add what it aliases to the list
            //     declare "mod" { export default class B { } }
            //     import B from "mod";
            //// For export specifiers, the exported name can be referring to a local symbol, e.g.:
            ////     import {a} from "mod";
            ////     export {a as somethingElse}
            //// We want the *local* declaration of 'a' as declared in the import,
            //// *not* as declared within "mod" (or farther)
            const aliasSymbol = getAliasSymbolForPropertyNameSymbol(symbol, location);
            if (aliasSymbol) {
                result = result.concat(populateSearchSymbolSet(aliasSymbol, location));
            }

            // If the location is in a context sensitive location (i.e. in an object literal) try
            // to get a contextual type for it, and add the property symbol from the contextual
            // type to the search set
            if (containingObjectLiteralElement) {
                forEach(getPropertySymbolsFromContextualType(containingObjectLiteralElement), contextualSymbol => {
                    addRange(result, typeChecker.getRootSymbols(contextualSymbol));
                });

                /* Because in short-hand property assignment, location has two meaning : property name and as value of the property
                    * When we do findAllReference at the position of the short-hand property assignment, we would want to have references to position of
                    * property name and variable declaration of the identifier.
                    * Like in below example, when querying for all references for an identifier 'name', of the property assignment, the language service
                    * should show both 'name' in 'obj' and 'name' in variable declaration
                    *      const name = "Foo";
                    *      const obj = { name };
                    * In order to do that, we will populate the search set with the value symbol of the identifier as a value of the property assignment
                    * so that when matching with potential reference symbol, both symbols from property declaration and variable declaration
                    * will be included correctly.
                    */
                const shorthandValueSymbol = typeChecker.getShorthandAssignmentValueSymbol(location.parent);
                if (shorthandValueSymbol) {
                    result.push(shorthandValueSymbol);
                }
            }

            // If the symbol.valueDeclaration is a property parameter declaration,
            // we should include both parameter declaration symbol and property declaration symbol
            // Parameter Declaration symbol is only visible within function scope, so the symbol is stored in constructor.locals.
            // Property Declaration symbol is a member of the class, so the symbol is stored in its class Declaration.symbol.members
            if (symbol.valueDeclaration && symbol.valueDeclaration.kind === SyntaxKind.Parameter &&
                isParameterPropertyDeclaration(<ParameterDeclaration>symbol.valueDeclaration)) {
                result = result.concat(typeChecker.getSymbolsOfParameterPropertyDeclaration(<ParameterDeclaration>symbol.valueDeclaration, symbol.name));
            }

            // If this is symbol of binding element without propertyName declaration in Object binding pattern
            // Include the property in the search
            const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol);
            if (bindingElementPropertySymbol) {
                result.push(bindingElementPropertySymbol);
            }

            // If this is a union property, add all the symbols from all its source symbols in all unioned types.
            // If the symbol is an instantiation from a another symbol (e.g. widened symbol) , add the root the list
            forEach(typeChecker.getRootSymbols(symbol), rootSymbol => {
                if (rootSymbol !== symbol) {
                    result.push(rootSymbol);
                }

                // Add symbol of properties/methods of the same name in base classes and implemented interfaces definitions
                if (!implementations && rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result, /*previousIterationSymbolsCache*/ new StringMap<Symbol>());
                }
            });

            return result;
        }

        /**
         * Find symbol of the given property-name and add the symbol to the given result array
         * @param symbol a symbol to start searching for the given propertyName
         * @param propertyName a name of property to search for
         * @param result an array of symbol of found property symbols
         * @param previousIterationSymbolsCache a cache of symbol from previous iterations of calling this function to prevent infinite revisiting of the same symbol.
         *                                The value of previousIterationSymbol is undefined when the function is first called.
         */
        function getPropertySymbolsFromBaseTypes(symbol: Symbol, propertyName: string, result: Symbol[],
            previousIterationSymbolsCache: SymbolTable): void {
            if (!symbol) {
                return;
            }

            // If the current symbol is the same as the previous-iteration symbol, we can just return the symbol that has already been visited
            // This is particularly important for the following cases, so that we do not infinitely visit the same symbol.
            // For example:
            //      interface C extends C {
            //          /*findRef*/propName: string;
            //      }
            // The first time getPropertySymbolsFromBaseTypes is called when finding-all-references at propName,
            // the symbol argument will be the symbol of an interface "C" and previousIterationSymbol is undefined,
            // the function will add any found symbol of the property-name, then its sub-routine will call
            // getPropertySymbolsFromBaseTypes again to walk up any base types to prevent revisiting already
            // visited symbol, interface "C", the sub-routine will pass the current symbol as previousIterationSymbol.
            if (previousIterationSymbolsCache.has(symbol.name)) {
                return;
            }

            if (symbol.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                forEach(symbol.getDeclarations(), declaration => {
                    if (isClassLike(declaration)) {
                        getPropertySymbolFromTypeReference(getClassExtendsHeritageClauseElement(<ClassDeclaration>declaration));
                        forEach(getClassImplementsHeritageClauseElements(<ClassDeclaration>declaration), getPropertySymbolFromTypeReference);
                    }
                    else if (declaration.kind === SyntaxKind.InterfaceDeclaration) {
                        forEach(getInterfaceBaseTypeNodes(<InterfaceDeclaration>declaration), getPropertySymbolFromTypeReference);
                    }
                });
            }
            return;

            function getPropertySymbolFromTypeReference(typeReference: ExpressionWithTypeArguments) {
                if (typeReference) {
                    const type = typeChecker.getTypeAtLocation(typeReference);
                    if (type) {
                        const propertySymbol = typeChecker.getPropertyOfType(type, propertyName);
                        if (propertySymbol) {
                            result.push(...typeChecker.getRootSymbols(propertySymbol));
                        }

                        // Visit the typeReference as well to see if it directly or indirectly use that property
                        previousIterationSymbolsCache.set(symbol.name, symbol);
                        getPropertySymbolsFromBaseTypes(type.symbol, propertyName, result, previousIterationSymbolsCache);
                    }
                }
            }
        }

        function getRelatedSymbol(searchSymbols: Symbol[], referenceSymbol: Symbol, referenceLocation: Node, searchLocationIsConstructor: boolean, parents: Symbol[] | undefined, cache: Map<string, boolean>): Symbol {
            if (contains(searchSymbols, referenceSymbol)) {
                // If we are searching for constructor uses, they must be 'new' expressions.
                return (!searchLocationIsConstructor || isNewExpressionTarget(referenceLocation)) && referenceSymbol;
            }

            // If the reference symbol is an alias, check if what it is aliasing is one of the search
            // symbols but by looking up for related symbol of this alias so it can handle multiple level of indirectness.
            const aliasSymbol = getAliasSymbolForPropertyNameSymbol(referenceSymbol, referenceLocation);
            if (aliasSymbol) {
                return getRelatedSymbol(searchSymbols, aliasSymbol, referenceLocation, searchLocationIsConstructor, parents, cache);
            }

            // If the reference location is in an object literal, try to get the contextual type for the
            // object literal, lookup the property symbol in the contextual type, and use this symbol to
            // compare to our searchSymbol
            const containingObjectLiteralElement = getContainingObjectLiteralElement(referenceLocation);
            if (containingObjectLiteralElement) {
                const contextualSymbol = forEach(getPropertySymbolsFromContextualType(containingObjectLiteralElement), contextualSymbol => {
                    return forEach(typeChecker.getRootSymbols(contextualSymbol), s => searchSymbols.indexOf(s) >= 0 ? s : undefined);
                });

                if (contextualSymbol) {
                    return contextualSymbol;
                }

                // If the reference location is the name of property from object literal destructuring pattern
                // Get the property symbol from the object literal's type and look if thats the search symbol
                // In below eg. get 'property' from type of elems iterating type
                //      for ( { property: p2 } of elems) { }
                const propertySymbol = getPropertySymbolOfDestructuringAssignment(referenceLocation);
                if (propertySymbol && searchSymbols.indexOf(propertySymbol) >= 0) {
                    return propertySymbol;
                }
            }

            // If the reference location is the binding element and doesn't have property name
            // then include the binding element in the related symbols
            //      let { a } : { a };
            const bindingElementPropertySymbol = getPropertySymbolOfObjectBindingPatternWithoutPropertyName(referenceSymbol);
            if (bindingElementPropertySymbol && searchSymbols.indexOf(bindingElementPropertySymbol) >= 0) {
                return bindingElementPropertySymbol;
            }

            // Unwrap symbols to get to the root (e.g. transient symbols as a result of widening)
            // Or a union property, use its underlying unioned symbols
            return forEach(typeChecker.getRootSymbols(referenceSymbol), rootSymbol => {
                // if it is in the list, then we are done
                if (searchSymbols.indexOf(rootSymbol) >= 0) {
                    return rootSymbol;
                }

                // Finally, try all properties with the same name in any type the containing type extended or implemented, and
                // see if any is in the list. If we were passed a parent symbol, only include types that are subtypes of the
                // parent symbol
                if (rootSymbol.parent && rootSymbol.parent.flags & (SymbolFlags.Class | SymbolFlags.Interface)) {
                    // Parents will only be defined if implementations is true
                    if (parents) {
                        if (!forEach(parents, parent => explicitlyInheritsFrom(rootSymbol.parent, parent, cache))) {
                            return undefined;
                        }
                    }

                    const result: Symbol[] = [];
                    getPropertySymbolsFromBaseTypes(rootSymbol.parent, rootSymbol.getName(), result, /*previousIterationSymbolsCache*/ new StringMap<Symbol>());
                    return forEach(result, s => searchSymbols.indexOf(s) >= 0 ? s : undefined);
                }

                return undefined;
            });
        }

        function getNameFromObjectLiteralElement(node: ObjectLiteralElement) {
            if (node.name.kind === SyntaxKind.ComputedPropertyName) {
                const nameExpression = (<ComputedPropertyName>node.name).expression;
                // treat computed property names where expression is string/numeric literal as just string/numeric literal
                if (isStringOrNumericLiteral(nameExpression.kind)) {
                    return (<LiteralExpression>nameExpression).text;
                }
                return undefined;
            }
            return (<Identifier | LiteralExpression>node.name).text;
        }

        function getPropertySymbolsFromContextualType(node: ObjectLiteralElement): Symbol[] {
            const objectLiteral = <ObjectLiteralExpression>node.parent;
            const contextualType = typeChecker.getContextualType(objectLiteral);
            const name = getNameFromObjectLiteralElement(node);
            if (name && contextualType) {
                const result: Symbol[] = [];
                const symbol = contextualType.getProperty(name);
                if (symbol) {
                    result.push(symbol);
                }

                if (contextualType.flags & TypeFlags.Union) {
                    forEach((<UnionType>contextualType).types, t => {
                        const symbol = t.getProperty(name);
                        if (symbol) {
                            result.push(symbol);
                        }
                    });
                }
                return result;
            }
            return undefined;
        }

        /** Given an initial searchMeaning, extracted from a location, widen the search scope based on the declarations
             * of the corresponding symbol. e.g. if we are searching for "Foo" in value position, but "Foo" references a class
            * then we need to widen the search to include type positions as well.
            * On the contrary, if we are searching for "Bar" in type position and we trace bar to an interface, and an uninstantiated
            * module, we want to keep the search limited to only types, as the two declarations (interface and uninstantiated module)
            * do not intersect in any of the three spaces.
            */
        function getIntersectingMeaningFromDeclarations(meaning: SemanticMeaning, declarations: Declaration[]): SemanticMeaning {
            if (declarations) {
                let lastIterationMeaning: SemanticMeaning;
                do {
                    // The result is order-sensitive, for instance if initialMeaning === Namespace, and declarations = [class, instantiated module]
                    // we need to consider both as they initialMeaning intersects with the module in the namespace space, and the module
                    // intersects with the class in the value space.
                    // To achieve that we will keep iterating until the result stabilizes.

                    // Remember the last meaning
                    lastIterationMeaning = meaning;

                    for (const declaration of declarations) {
                        const declarationMeaning = getMeaningFromDeclaration(declaration);

                        if (declarationMeaning & meaning) {
                            meaning |= declarationMeaning;
                        }
                    }
                }
                while (meaning !== lastIterationMeaning);
            }
            return meaning;
        }
    }

    export function convertReferences(referenceSymbols: ReferencedSymbol[]): ReferenceEntry[] {
        if (!referenceSymbols) {
            return undefined;
        }

        const referenceEntries: ReferenceEntry[] = [];

        for (const referenceSymbol of referenceSymbols) {
            addRange(referenceEntries, referenceSymbol.references);
        }

        return referenceEntries;
    }

    function isImplementation(node: Node): boolean {
        if (!node) {
            return false;
        }
        else if (isVariableLike(node)) {
            if (node.initializer) {
                return true;
            }
            else if (node.kind === SyntaxKind.VariableDeclaration) {
                const parentStatement = getParentStatementOfVariableDeclaration(<VariableDeclaration>node);
                return parentStatement && hasModifier(parentStatement, ModifierFlags.Ambient);
            }
        }
        else if (isFunctionLike(node)) {
            return !!node.body || hasModifier(node, ModifierFlags.Ambient);
        }
        else {
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    return true;
            }
        }
        return false;
    }

    function getParentStatementOfVariableDeclaration(node: VariableDeclaration): VariableStatement {
        if (node.parent && node.parent.parent && node.parent.parent.kind === SyntaxKind.VariableStatement) {
            Debug.assert(node.parent.kind === SyntaxKind.VariableDeclarationList);
            return <VariableStatement>node.parent.parent;
        }
    }

    export function getReferenceEntriesForShorthandPropertyAssignment(node: Node, typeChecker: TypeChecker, result: ReferenceEntry[]): void {
        const refSymbol = typeChecker.getSymbolAtLocation(node);
        const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(refSymbol.valueDeclaration);

        if (shorthandSymbol) {
            for (const declaration of shorthandSymbol.getDeclarations()) {
                if (getMeaningFromDeclaration(declaration) & SemanticMeaning.Value) {
                    result.push(getReferenceEntryFromNode(declaration));
                }
            }
        }
    }

    export function getReferenceEntryFromNode(node: Node): ReferenceEntry {
        let start = node.getStart();
        let end = node.getEnd();

        if (node.kind === SyntaxKind.StringLiteral) {
            start += 1;
            end -= 1;
        }

        return {
            fileName: node.getSourceFile().fileName,
            textSpan: createTextSpanFromBounds(start, end),
            isWriteAccess: isWriteAccess(node),
            isDefinition: isDeclarationName(node) || isLiteralComputedPropertyDeclarationName(node)
        };
    }

    /** A node is considered a writeAccess iff it is a name of a declaration or a target of an assignment */
    function isWriteAccess(node: Node): boolean {
        if (node.kind === SyntaxKind.Identifier && isDeclarationName(node)) {
            return true;
        }

        const parent = node.parent;
        if (parent) {
            if (parent.kind === SyntaxKind.PostfixUnaryExpression || parent.kind === SyntaxKind.PrefixUnaryExpression) {
                return true;
            }
            else if (parent.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>parent).left === node) {
                const operator = (<BinaryExpression>parent).operatorToken.kind;
                return SyntaxKind.FirstAssignment <= operator && operator <= SyntaxKind.LastAssignment;
            }
        }

        return false;
    }

    function forEachDescendantOfKind(node: Node, kind: SyntaxKind, action: (node: Node) => void) {
        forEachChild(node, child => {
            if (child.kind === kind) {
                action(child);
            }
            forEachDescendantOfKind(child, kind, action);
        });
    }

    /**
     * Returns the containing object literal property declaration given a possible name node, e.g. "a" in x = { "a": 1 }
     */
    function getContainingObjectLiteralElement(node: Node): ObjectLiteralElement {
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                if (node.parent.kind === SyntaxKind.ComputedPropertyName) {
                    return isObjectLiteralPropertyDeclaration(node.parent.parent) ? node.parent.parent : undefined;
                }
            // intential fall through
            case SyntaxKind.Identifier:
                return isObjectLiteralPropertyDeclaration(node.parent) && node.parent.name === node ? node.parent : undefined;
        }
        return undefined;
    }

    function isObjectLiteralPropertyDeclaration(node: Node): node is ObjectLiteralElement  {
        switch (node.kind) {
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
        }
        return false;
    }

    /** Get `C` given `N` if `N` is in the position `class C extends N` or `class C extends foo.N` where `N` is an identifier. */
    function tryGetClassByExtendingIdentifier(node: Node): ClassLikeDeclaration | undefined {
        return tryGetClassExtendingExpressionWithTypeArguments(climbPastPropertyAccess(node).parent);
    }

    function isNameOfExternalModuleImportOrDeclaration(node: Node): boolean {
        if (node.kind === SyntaxKind.StringLiteral) {
            return isNameOfModuleDeclaration(node) || isExpressionOfExternalModuleImportEqualsDeclaration(node);
        }

        return false;
    }
}
