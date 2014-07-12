
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module TypeScript.Services {
    export class LanguageService implements ILanguageService {
        private logger: TypeScript.ILogger;
        private compiler: LanguageServiceCompiler;
        private _syntaxTreeCache: SyntaxTreeCache;
        private formattingRulesProvider: TypeScript.Services.Formatting.RulesProvider;

        private activeCompletionSession: CompletionSession = null;

        constructor(public host: ILanguageServiceHost) {
            this.logger = this.host;
            this.compiler = new LanguageServiceCompiler(this.host);
            this._syntaxTreeCache = new SyntaxTreeCache(this.host);

            // Check if the localized messages json is set, otherwise query the host for it
            if (!TypeScript.LocalizedDiagnosticMessages) {
                TypeScript.LocalizedDiagnosticMessages = this.host.getLocalizedDiagnosticMessages();
            }
        }

        public cleanupSemanticCache(): void {
            // just dropping the data - no need to synchronize with the host
            this.compiler.cleanupSemanticCache();
        }

        public refresh(): void {
            // No-op.  Only kept around for compatability with the interface we shipped.
        }

        private getSymbolInfoAtPosition(fileName: string, pos: number, requireName: boolean): { symbol: TypeScript.PullSymbol; containingASTOpt: TypeScript.AST } {
            var document = this.compiler.getDocument(fileName);
            var sourceUnit = document.sourceUnit();

            /// TODO: this does not allow getting references on "constructor"

            var topNode = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, pos);
            if (topNode === null || (requireName && topNode.kind() !== TypeScript.SyntaxKind.IdentifierName)) {
                this.logger.log("No name found at the given position");
                return null;
            }

            // Store the actual name before calling getSymbolInformationFromPath

            var symbolInfoAtPosition = this.compiler.getSymbolInformationFromAST(topNode, document);
            if (symbolInfoAtPosition === null || (symbolInfoAtPosition.symbol === null && symbolInfoAtPosition.aliasSymbol)) {
                this.logger.log("No symbol found at the given position");
                // only single reference
                return { symbol: null, containingASTOpt: null };
            }

            var symbol = symbolInfoAtPosition.aliasSymbol || symbolInfoAtPosition.symbol;
            var symbolName = symbol.getName();

            // if we are not looking for any but we get an any symbol, then we ran into a wrong symbol
            if (requireName) {
                var actualNameAtPosition = (<TypeScript.Identifier>topNode).valueText();

                if ((symbol.isError() || symbol.isAny()) && actualNameAtPosition !== symbolName) {
                    this.logger.log("Unknown symbol found at the given position");
                    // only single reference
                    return { symbol: null, containingASTOpt: null };
                }
            }

            var containingASTOpt = this.getSymbolScopeAST(symbol, topNode);

            return { symbol: symbol, containingASTOpt: containingASTOpt };
        }

        public getReferencesAtPosition(fileName: string, pos: number): ReferenceEntry[]{
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var symbolAndContainingAST = this.getSymbolInfoAtPosition(fileName, pos, /*requireName:*/ true);
            if (symbolAndContainingAST === null) {
                // Didn't even have a name at that position.
                return [];
            }

            if (symbolAndContainingAST.symbol === null) {
                // Had a name, but couldn't bind it to anything.
                return this.getSingleNodeReferenceAtPosition(fileName, pos);
            }

            var result: ReferenceEntry[] = [];
            var symbol = symbolAndContainingAST.symbol;
            var symbolName = symbol.getName();
            var containingASTOpt = symbolAndContainingAST.containingASTOpt;

            var fileNames = this.compiler.fileNames();
            for (var i = 0, n = fileNames.length; i < n; i++) {
                var tempFileName = fileNames[i];

                if (containingASTOpt && fileName != tempFileName) {
                    continue;
                }

                var tempDocument = this.compiler.getDocument(tempFileName);
                var filter = tempDocument.bloomFilter();

                if (filter.probablyContains(symbolName)) {
                    result = result.concat(this.getReferencesInFile(tempFileName, symbol, containingASTOpt));
                }
            }

            return result;
        }

        private getSymbolScopeAST(symbol: TypeScript.PullSymbol, ast: TypeScript.AST): TypeScript.AST {
            if (symbol.kind === TypeScript.PullElementKind.TypeParameter &&
                symbol.getDeclarations().length > 0 &&
                symbol.getDeclarations()[0].getParentDecl() &&
                symbol.getDeclarations()[0].getParentDecl().kind === TypeScript.PullElementKind.Method) {

                // The compiler shares class method type parameter symbols.  So if we get one, 
                // scope our search down to the method ast so we don't find other hits elsewhere.
                while (ast) {
                    if (ast.kind() === TypeScript.SyntaxKind.FunctionDeclaration ||
                        ast.kind() === TypeScript.SyntaxKind.MemberFunctionDeclaration) {
                        return ast;
                    }

                    ast = ast.parent;
                }
            }

            // Todo: we could add more smarts about things like local variables and parameters here.
            return null;
        }

        public getOccurrencesAtPosition(fileName: string, pos: number): ReferenceEntry[]{
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var symbolAndContainingAST = this.getSymbolInfoAtPosition(fileName, pos, /*requireName:*/ true);
            if (symbolAndContainingAST === null) {
                // Didn't even have a name at that position.
                return [];
            }

            if (symbolAndContainingAST.symbol === null) {
                // Had a name, but couldn't bind it to anything.
                return this.getSingleNodeReferenceAtPosition(fileName, pos);
            }

            var symbol = symbolAndContainingAST.symbol;
            var containingASTOpt = symbolAndContainingAST.containingASTOpt;

            return this.getReferencesInFile(fileName, symbol, containingASTOpt);
        }

        private getSingleNodeReferenceAtPosition(fileName: string, position: number): ReferenceEntry[] {
            var document = this.compiler.getDocument(fileName);
            var sourceUnit = document.sourceUnit();

            var node = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position);
            if (node === null || node.kind() !== TypeScript.SyntaxKind.IdentifierName) {
                return [];
            }

            var isWriteAccess = this.isWriteAccess(node);
            return [new ReferenceEntry(this._getHostFileName(fileName), node.start(), node.end(), isWriteAccess)];
        }

        public getImplementorsAtPosition(fileName: string, pos: number): ReferenceEntry[]{
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var result: ReferenceEntry[] = [];

            var document = this.compiler.getDocument(fileName);
            var sourceUnit = document.sourceUnit();

            var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, pos);
            if (ast === null || ast.kind() !== TypeScript.SyntaxKind.IdentifierName) {
                this.logger.log("No identifier at the specified location.");
                return result;
            }

            // Store the actual name before calling getSymbolInformationFromPath
            var actualNameAtPosition = (<TypeScript.Identifier>ast).valueText();

            var symbolInfoAtPosition = this.compiler.getSymbolInformationFromAST(ast, document);
            var symbol = symbolInfoAtPosition.symbol;

            if (symbol === null) {
                this.logger.log("No symbol annotation on the identifier AST.");
                return result;
            }

            var symbolName: string = symbol.getName();

            // if we are not looking for any but we get an any symbol, then we ran into a wrong symbol
            if ((symbol.isError() || symbol.isAny()) && actualNameAtPosition !== symbolName) {
                this.logger.log("Unknown symbol found at the given position");
                return result;
            }

            var typeSymbol: TypeScript.PullTypeSymbol = symbol.type;
            var typesToSearch: TypeScript.PullTypeSymbol[];

            if (typeSymbol.isClass() || typeSymbol.isInterface()) {
                typesToSearch = typeSymbol.getTypesThatExtendThisType();
            }
            else if (symbol.kind == TypeScript.PullElementKind.Property ||
                symbol.kind == TypeScript.PullElementKind.Function ||
                typeSymbol.isMethod() || typeSymbol.isProperty()) {

                var declaration: TypeScript.PullDecl = symbol.getDeclarations()[0];
                var classSymbol: TypeScript.PullTypeSymbol = declaration.getParentDecl().getSymbol().type;

                typesToSearch = [];
                var extendingTypes = classSymbol.getTypesThatExtendThisType();
                var extendedTypes = classSymbol.getExtendedTypes();
                extendingTypes.forEach(type => {
                    var overrides = this.getOverrides(type, symbol);
                    overrides.forEach(override => {
                        typesToSearch.push(override);
                    });
                });
                extendedTypes.forEach(type => {
                    var overrides = this.getOverrides(type, symbol);
                    overrides.forEach(override => {
                        typesToSearch.push(override);
                    });
                });
            }

            if (typesToSearch) {
                var fileNames = this.compiler.fileNames();
                for (var i = 0, n = fileNames.length; i < n; i++) {
                    var tempFileName = fileNames[i];

                    var tempDocument = this.compiler.getDocument(tempFileName);
                    var filter = tempDocument.bloomFilter();

                    typesToSearch.forEach(typeToSearch => {
                        var symbolName: string = typeToSearch.getName();
                        if (filter.probablyContains(symbolName)) {
                            result = result.concat(this.getImplementorsInFile(tempFileName, typeToSearch));
                        }
                    });
                }
            }
            return result;
        }

        public getOverrides(container: TypeScript.PullTypeSymbol, memberSym: TypeScript.PullSymbol): TypeScript.PullTypeSymbol[] {
            var result: TypeScript.PullTypeSymbol[] = [];
            var members: TypeScript.PullSymbol[];
            if (container.isClass()) {
                members = container.getMembers();
            }
            else if (container.isInterface()) {
                members = container.getMembers();
            }

            if (members == null)
                return null;

            members.forEach(member => {
                var typeMember = <TypeScript.PullTypeSymbol>member;
                if (typeMember.getName() === memberSym.getName()) {
                    // Not currently checking whether static-ness matches: typeMember.isStatic() === memberSym.isStatic() or whether
                    //  typeMember.isMethod() === memberSym.isMethod() && typeMember.isProperty() === memberSym.isProperty()
                    result.push(typeMember);
                }
            });

            return result;
        }

        private getImplementorsInFile(fileName: string, symbol: TypeScript.PullTypeSymbol): ReferenceEntry[] {
            var result: ReferenceEntry[] = [];
            var symbolName = symbol.getDisplayName();

            var possiblePositions = this.getPossibleSymbolReferencePositions(fileName, symbolName);
            if (possiblePositions && possiblePositions.length > 0) {
                var document = this.compiler.getDocument(fileName);
                var sourceUnit = document.sourceUnit();

                possiblePositions.forEach(p => {
                    var nameAST = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, p);
                    if (nameAST === null || nameAST.kind() !== TypeScript.SyntaxKind.IdentifierName) {
                        return;
                    }
                    var searchSymbolInfoAtPosition = this.compiler.getSymbolInformationFromAST(nameAST, document);
                    if (searchSymbolInfoAtPosition !== null) {

                        var normalizedSymbol: TypeScript.PullSymbol;
                        if (symbol.kind === TypeScript.PullElementKind.Class || symbol.kind === TypeScript.PullElementKind.Interface) {
                            normalizedSymbol = searchSymbolInfoAtPosition.symbol.type;
                        }
                        else {
                            var declaration = searchSymbolInfoAtPosition.symbol.getDeclarations()[0];
                            normalizedSymbol = declaration.getSymbol();
                        }

                        if (normalizedSymbol === symbol) {
                            var isWriteAccess = this.isWriteAccess(nameAST);

                            result.push(new ReferenceEntry(this._getHostFileName(fileName),
                                nameAST.start(), nameAST.end(), isWriteAccess));
                        }
                    }
                });
            }

            return result;
        }

        private getReferencesInFile(fileName: string, symbol: TypeScript.PullSymbol, containingASTOpt: TypeScript.AST): ReferenceEntry[] {
            var result: ReferenceEntry[] = [];
            var symbolName = symbol.getDisplayName();

            var possiblePositions = this.getPossibleSymbolReferencePositions(fileName, symbolName);
            if (possiblePositions && possiblePositions.length > 0) {
                var document = this.compiler.getDocument(fileName);
                var sourceUnit = document.syntaxTree().sourceUnit();

                possiblePositions.forEach(p => {
                    // If it's not in the bounds of the AST we're asking for, then this can't possibly be a hit.
                    if (containingASTOpt && (p < containingASTOpt.start() || p > containingASTOpt.end())) {
                        return;
                    }

                    var nameToken = sourceUnit.findToken(p);

                    // Compare the length so we filter out strict superstrings of the symbol we are looking for                    
                    var isValidAST =
                        nameToken !== null && nameToken.kind() === TypeScript.SyntaxKind.IdentifierName && // name is identifier
                        p >= nameToken.start() && p < nameToken.end() && // pos is contained between tokenStart and tokenEnd (it is not in trivia)
                        (nameToken.end() - nameToken.start()) === symbolName.length;  // length of token text matches length the length of original symbolName.

                    if (!isValidAST) {
                        return;
                    }

                    var nameAST: AST = (<any>nameToken)._ast || (nameToken.element() && (<any>nameToken.element())._ast);
                    if (!nameAST) {
                        return;
                    }

                    var symbolInfoAtPosition = this.compiler.getSymbolInformationFromAST(nameAST, document);
                    if (symbolInfoAtPosition !== null) {
                        var searchSymbol = symbolInfoAtPosition.aliasSymbol || symbolInfoAtPosition.symbol;

                        if (FindReferenceHelpers.compareSymbolsForLexicalIdentity(searchSymbol, symbol)) {
                            var isWriteAccess = this.isWriteAccess(nameAST);
                            result.push(new ReferenceEntry(this._getHostFileName(fileName), nameAST.start(), nameAST.end(), isWriteAccess));
                        }
                    }
                });
            }

            return result;
        }

        private isWriteAccess(current: TypeScript.AST): boolean {
            var parent = current.parent;
            if (parent !== null) {
                var parentNodeType = parent.kind();
                switch (parentNodeType) {
                    case TypeScript.SyntaxKind.ClassDeclaration:
                        return (<TypeScript.ClassDeclaration>parent).identifier === current;

                    case TypeScript.SyntaxKind.InterfaceDeclaration:
                        return (<TypeScript.InterfaceDeclaration>parent).identifier === current;

                    case TypeScript.SyntaxKind.ModuleDeclaration:
                        return (<TypeScript.ModuleDeclaration>parent).name === current || (<TypeScript.ModuleDeclaration>parent).stringLiteral === current;

                    case TypeScript.SyntaxKind.FunctionDeclaration:
                        return (<TypeScript.FunctionDeclaration>parent).identifier === current;

                    case TypeScript.SyntaxKind.ImportDeclaration:
                        return (<TypeScript.ImportDeclaration>parent).identifier === current;

                    case TypeScript.SyntaxKind.VariableDeclarator:
                        var varDeclarator = <TypeScript.VariableDeclarator>parent;
                        return !!(varDeclarator.equalsValueClause && varDeclarator.propertyName === current);

                    case TypeScript.SyntaxKind.Parameter:
                        return true;

                    case TypeScript.SyntaxKind.AssignmentExpression:
                    case TypeScript.SyntaxKind.AddAssignmentExpression:
                    case TypeScript.SyntaxKind.SubtractAssignmentExpression:
                    case TypeScript.SyntaxKind.MultiplyAssignmentExpression:
                    case TypeScript.SyntaxKind.DivideAssignmentExpression:
                    case TypeScript.SyntaxKind.ModuloAssignmentExpression:
                    case TypeScript.SyntaxKind.OrAssignmentExpression:
                    case TypeScript.SyntaxKind.AndAssignmentExpression:
                    case TypeScript.SyntaxKind.ExclusiveOrAssignmentExpression:
                    case TypeScript.SyntaxKind.LeftShiftAssignmentExpression:
                    case TypeScript.SyntaxKind.UnsignedRightShiftAssignmentExpression:
                    case TypeScript.SyntaxKind.SignedRightShiftAssignmentExpression:
                        return (<TypeScript.BinaryExpression>parent).left === current;

                    case TypeScript.SyntaxKind.PreIncrementExpression:
                    case TypeScript.SyntaxKind.PostIncrementExpression:
                        return true;

                    case TypeScript.SyntaxKind.PreDecrementExpression:
                    case TypeScript.SyntaxKind.PostDecrementExpression:
                        return true;
                }
            }

            return false;
        }

        private isLetterOrDigit(char: number): boolean {
            return (char >= TypeScript.CharacterCodes.a && char <= TypeScript.CharacterCodes.z) ||
                (char >= TypeScript.CharacterCodes.A && char <= TypeScript.CharacterCodes.Z) ||
                (char >= TypeScript.CharacterCodes._0 && char <= TypeScript.CharacterCodes._9) ||
                char === TypeScript.CharacterCodes._ ||
                char === TypeScript.CharacterCodes.$ ||
                (char > 127 && TypeScript.Unicode.isIdentifierPart(char, TypeScript.LanguageVersion.EcmaScript5));
        }

        private getPossibleSymbolReferencePositions(fileName: string, symbolName: string): number[] {
            var positions: number[] = [];

            /// TODO: Cache symbol existence for files to save text search
            // Also, need to make this work for unicode escapes.

            // Be reseliant in the face of a symbol with no name or zero length name
            if (!symbolName || !symbolName.length) {
                return positions;
            }

            var sourceText = this.compiler.getScriptSnapshot(fileName);
            var sourceLength = sourceText.getLength();
            var text = sourceText.getText(0, sourceLength);
            var symbolNameLength = symbolName.length;

            var position = text.indexOf(symbolName);
            while (position >= 0) {
                // We found a match.  Make sure it's not part of a larger word (i.e. the char 
                // before and after it have to be a non-identifier char).
                var endPosition = position + symbolNameLength;

                if ((position <= 0 || !this.isLetterOrDigit(text.charCodeAt(position - 1))) &&
                    (endPosition >= sourceLength || !this.isLetterOrDigit(text.charCodeAt(endPosition)))) {

                    // Found a real match.  Keep searching.  
                    positions.push(position);
                }

                position = text.indexOf(symbolName, position + symbolNameLength + 1);
            }

            return positions;
        }

        public getSignatureAtPosition(fileName: string, position: number): SignatureInfo {
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var document = this.compiler.getDocument(fileName);

            // First check whether we are in a comment where signature help should not be displayed
            //if (!SignatureInfoHelpers.isSignatureHelpTriggerPosition(document.syntaxTree().sourceUnit(), position)) {
            //    this.logger.log("position is not a valid singature help location");
            //    return null;
            //}

            if (SignatureInfoHelpers.isSignatureHelpBlocker(document.syntaxTree().sourceUnit(), position)) {
                this.logger.log("position is not a valid singature help location");
                return null;
            }

            // Second check if we are inside a generic parameter
            var genericTypeArgumentListInfo = SignatureInfoHelpers.isInPartiallyWrittenTypeArgumentList(document.syntaxTree(), position);
            if (genericTypeArgumentListInfo) {
                // The expression could be messed up because we are parsing a partial generic expression, so set the search path to a place where we know it
                // can find a call expression
                return this.getTypeParameterSignatureFromPartiallyWrittenExpression(document, position, genericTypeArgumentListInfo);
            }

            // Third set the path to find ask the type system about the call expression
            var sourceUnit = document.sourceUnit();
            var node = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position);
            if (!node) {
                return null;
            }

            // Find call expression
            while (node) {
                if (node.kind() === TypeScript.SyntaxKind.InvocationExpression ||
                    node.kind() === TypeScript.SyntaxKind.ObjectCreationExpression ||  // Valid call or new expressions
                    (isSignatureHelpBlocker(node) && position > node.start())) // Its a declaration node - call expression cannot be in parent scope
                {
                    break;
                }

                node = node.parent;
            }

            if (!node) {
                return null;
            }

            if (node.kind() !== TypeScript.SyntaxKind.InvocationExpression && node.kind() !== TypeScript.SyntaxKind.ObjectCreationExpression) {
                this.logger.log("No call expression or generic arguments found for the given position");
                return null;
            }

            var callExpression = <TypeScript.InvocationExpression>node;
            var isNew = (callExpression.kind() === TypeScript.SyntaxKind.ObjectCreationExpression);

            if (isNew && callExpression.argumentList === null) {
                this.logger.log("No signature help for a object creation expression without arguments");
                return null;
            }

            TypeScript.Debug.assert(callExpression.argumentList.arguments !== null, "Expected call expression to have arguments, but it did not");

            var argumentsStart = callExpression.expression.end() + callExpression.expression.trailingTriviaWidth();
            var argumentsEnd = callExpression.argumentList.arguments.end() + callExpression.argumentList.arguments.trailingTriviaWidth()

            if (position <= argumentsStart || position > argumentsEnd) {
                this.logger.log("Outside argument list");
                return null;
            }

            // Resolve symbol
            var callSymbolInfo = this.compiler.getCallInformationFromAST(node, document);
            if (!callSymbolInfo || !callSymbolInfo.targetSymbol || !callSymbolInfo.resolvedSignatures) {
                this.logger.log("Could not find symbol for call expression");
                return null;
            }

            // Build the result
            var result = new SignatureInfo();

            result.formal = SignatureInfoHelpers.getSignatureInfoFromSignatureSymbol(callSymbolInfo.targetSymbol, callSymbolInfo.resolvedSignatures, callSymbolInfo.enclosingScopeSymbol, this.compiler);
            result.actual = SignatureInfoHelpers.getActualSignatureInfoFromCallExpression(callExpression, position, genericTypeArgumentListInfo);
            result.activeFormal = (callSymbolInfo.resolvedSignatures && callSymbolInfo.candidateSignature) ? callSymbolInfo.resolvedSignatures.indexOf(callSymbolInfo.candidateSignature) : -1;

            if (result.actual === null || result.formal === null || result.activeFormal === null) {
                this.logger.log("Can't compute actual and/or formal signature of the call expression");
                return null;
            }

            return result;
        }

        private getTypeParameterSignatureFromPartiallyWrittenExpression(document: TypeScript.Document, position: number, genericTypeArgumentListInfo: IPartiallyWrittenTypeArgumentListInformation): SignatureInfo {
            var sourceUnit = document.sourceUnit();

            // Get the identifier information
            var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, genericTypeArgumentListInfo.genericIdentifer.start());
            if (ast === null || ast.kind() !== TypeScript.SyntaxKind.IdentifierName) {
                this.logger.log(["getTypeParameterSignatureAtPosition: Unexpected ast found at position:", position, ast === null ? "ast was null" : "ast kind: " + SyntaxKind[ast.kind()]].join(' '));
                return null;
            }

            var symbolInformation = this.compiler.getSymbolInformationFromAST(ast, document);

            if (!symbolInformation.symbol) {
                return null;
            }

            // TODO: are we in an new expression?
            var isNew = SignatureInfoHelpers.isTargetOfObjectCreationExpression(genericTypeArgumentListInfo.genericIdentifer);

            var typeSymbol = symbolInformation.symbol.type;

            if (typeSymbol.kind === TypeScript.PullElementKind.FunctionType ||
                (isNew && typeSymbol.kind === TypeScript.PullElementKind.ConstructorType)) {

                var signatures = isNew ? typeSymbol.getConstructSignatures() : typeSymbol.getCallSignatures();

                // Build the result
                var result = new SignatureInfo();

                result.formal = SignatureInfoHelpers.getSignatureInfoFromSignatureSymbol(symbolInformation.symbol, signatures, symbolInformation.enclosingScopeSymbol, this.compiler);
                result.actual = SignatureInfoHelpers.getActualSignatureInfoFromPartiallyWritenGenericExpression(position, genericTypeArgumentListInfo);
                result.activeFormal = 0;

                return result;
            }
            else if (typeSymbol.isGeneric()) {
                // The symbol is a generic type

                // Get the class symbol for constuctor symbol
                if (typeSymbol.kind === TypeScript.PullElementKind.ConstructorType) {
                    typeSymbol = typeSymbol.getAssociatedContainerType();
                }

                // Build the result
                var result = new SignatureInfo();

                result.formal = SignatureInfoHelpers.getSignatureInfoFromGenericSymbol(typeSymbol, symbolInformation.enclosingScopeSymbol, this.compiler);
                result.actual = SignatureInfoHelpers.getActualSignatureInfoFromPartiallyWritenGenericExpression(position, genericTypeArgumentListInfo);
                result.activeFormal = 0;

                return result;
            }

            // Nothing to handle
            return null;
        }

        public getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[]{
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var symbolInfo = this.getSymbolInfoAtPosition(fileName, position, /*requireName:*/ false);
            if (symbolInfo === null || symbolInfo.symbol === null) {
                return null;
            }

            var symbol = symbolInfo.symbol;

            TypeScript.Debug.assert(symbol.kind !== TypeScript.PullElementKind.None &&
                symbol.kind !== TypeScript.PullElementKind.Global &&
                symbol.kind !== TypeScript.PullElementKind.Script, "getDefinitionAtPosition - Invalid symbol kind");

            if (symbol.kind === TypeScript.PullElementKind.Primitive) {
                // Primitive symbols do not have definition locations that map to host soruces.
                // Return null to indicate they have no "definition locations".
                return null;
            }

            var declarations = symbol.getDeclarations();
            var symbolName = symbol.getDisplayName();
            var symbolKind = this.mapPullElementKind(symbol.kind, symbol);
            var container = symbol.getContainer();
            var containerName = container ? container.fullName() : "";
            var containerKind = container ? this.mapPullElementKind(container.kind, container) : "";

            var result: DefinitionInfo[] = [];

            if (!this.tryAddDefinition(symbolKind, symbolName, containerKind, containerName, declarations, result) &&
                !this.tryAddSignatures(symbolKind, symbolName, containerKind, containerName, declarations, result) &&
                !this.tryAddConstructor(symbolKind, symbolName, containerKind, containerName, declarations, result)) {

                // Just add all the declarations. 
                this.addDeclarations(symbolKind, symbolName, containerKind, containerName, declarations, result);
            }

            return result;
        }

        private addDeclarations(symbolKind: string, symbolName: string, containerKind: string, containerName: string, declarations: TypeScript.PullDecl[], result: DefinitionInfo[]): void {
            for (var i = 0, n = declarations.length; i < n; i++) {
                this.addDeclaration(symbolKind, symbolName, containerKind, containerName, declarations[i], result);
            }
        }

        private addDeclaration(symbolKind: string, symbolName: string, containerKind: string, containerName: string, declaration: TypeScript.PullDecl, result: DefinitionInfo[]): void {
            var ast = declaration.ast();
            result.push(new DefinitionInfo(
                this._getHostFileName(declaration.fileName()),
                ast.start(), ast.end(), symbolKind, symbolName, containerKind, containerName));
        }

        private tryAddDefinition(symbolKind: string, symbolName: string, containerKind: string, containerName: string, declarations: TypeScript.PullDecl[], result: DefinitionInfo[]): boolean {
            // First, if there are definitions and signatures, then just pick the definition.
            var definitionDeclaration = TypeScript.ArrayUtilities.firstOrDefault(declarations, d => {
                var signature = d.getSignatureSymbol();
                return signature && signature.isDefinition();
            });

            if (!definitionDeclaration) {
                return false;
            }

            this.addDeclaration(symbolKind, symbolName, containerKind, containerName, definitionDeclaration, result);
            return true;
        }

        private tryAddSignatures(symbolKind: string, symbolName: string, containerKind: string, containerName: string, declarations: TypeScript.PullDecl[], result: DefinitionInfo[]): boolean {
            // We didn't have a definition.  Check and see if we have any signatures.  If so, just
            // add the last one.
            var definitionDeclaration = TypeScript.ArrayUtilities.lastOrDefault(declarations, d => {
                var signature = d.getSignatureSymbol();
                return signature && !signature.isDefinition();
            });

            if (!definitionDeclaration) {
                return false;
            }

            this.addDeclaration(symbolKind, symbolName, containerKind, containerName, definitionDeclaration, result);
            return true;
        }

        private tryAddConstructor(symbolKind: string, symbolName: string, containerKind: string, containerName: string, declarations: TypeScript.PullDecl[], result: DefinitionInfo[]): boolean {
            var constructorDeclarations = TypeScript.ArrayUtilities.where(declarations, d => d.kind === TypeScript.PullElementKind.ConstructorMethod);

            if (constructorDeclarations.length === 0) {
                return false;
            }

            this.addDeclaration(symbolKind, symbolName, containerKind, containerName, TypeScript.ArrayUtilities.last(constructorDeclarations), result);
            return true;
        }

        // Return array of NavigateToItems in which each item has matched name with searchValue. If none is found, return an empty array.
        // The function will search all files (both close and open) in the solutions. SearchValue can be either one search term or multiple terms separated by comma.
        public getNavigateToItems(searchValue: string): NavigateToItem[] {
            this.compiler.synchronizeHostData();
            Debug.assert(searchValue !== null && searchValue !== undefined, "The searchValue argument was not supplied or null");
            // Split search value in terms array
            var terms = searchValue.split(" ");

            // default NavigateTo approach: if search term contains only lower-case chars - use case-insensitive search, otherwise switch to case-sensitive version
            var searchTerms = terms.map((t) => ({ caseSensitive: this.hasAnyUpperCaseCharacter(t), term: t }));

            var items: NavigateToItem[] = [];

            var fileNames = this.compiler.fileNames();
            for (var i = 0, n = fileNames.length; i < n; i++) {
                var fileName = fileNames[i];
                var declaration = this.compiler.getCachedTopLevelDeclaration(fileName);
                this.findSearchValueInPullDecl(fileName, [declaration], items, searchTerms);
            }
            return items;
        }

        private hasAnyUpperCaseCharacter(s: string): boolean {
            for (var i = 0; i < s.length; ++i) {
                if (s.charAt(i).toLocaleLowerCase() !== s.charAt(i)) {
                    return true;
                }
            }

            return false;
        }

        // Search given file's declaration and output matched NavigateToItem into array of NavigateToItem[] which is passed in as 
        // one of the function's arguements. The function will recruseively call itself to visit all children declarations  
        // of each member of declarations array.
        // 
        // @param fileName: name of the file which the function is currently visiting its PullDecl members.
        //        delcarations: array of PullDecl, containing current visiting top level PullDecl objects.
        //        results: array of NavigateToItem to be filled in with matched NavigateToItem objects.
        //        searchTerms: array of search terms.
        //        searchRegExpTerms: array of regular expressions in which each expression corresponding to each item in the searchTerms array.
        //        parentName: a name of the parent of declarations array.
        //        parentKindName: a kind of parent in string format.
        private findSearchValueInPullDecl(fileName: string, declarations: TypeScript.PullDecl[], results: NavigateToItem[],
            searchTerms: { caseSensitive: boolean; term: string }[], parentName?: string, parentkindName?: string): void {
            var item: NavigateToItem;
            var declaration: TypeScript.PullDecl;
            var declName: string;
            var kindName: string;
            var matchKind: string;
            var fullName: string;

            for (var i = 0, declLength = declarations.length; i < declLength; ++i) {
                declaration = declarations[i];
                declName = declaration.getDisplayName();
                kindName = this.mapPullElementKind(declaration.kind);
                matchKind = null;

                for (var j = 0, termsLength = searchTerms.length; j < termsLength; ++j) {
                    var searchTerm = searchTerms[j];
                    var declNameToSearch = searchTerm.caseSensitive ? declName : declName.toLocaleLowerCase();
                    // in case of case-insensitive search searchTerm.term will already be lower-cased
                    var index = declNameToSearch.indexOf(searchTerm.term);

                    if (index !== -1) {
                        if (index === 0) {
                            // here we know that match occur at the beginning of the string.
                            // if search term and declName has the same length - we have an exact match, otherwise declName have longer length and this will be prefix match
                            matchKind = declName.length === searchTerm.term.length ? MatchKind.exact : MatchKind.prefix;
                        }
                        else {
                            // declName have longer length and the match doesn't occur at the beginning of the string; so we must have substring match
                            matchKind = MatchKind.subString;
                        }
                    }
                }

                // if there is a match and the match should be included into NavigateToItem array, 
                // create corresponding NavigateToItem and add it into results array
                if (this.shouldIncludeDeclarationInNavigationItems(declaration)) {
                    fullName = parentName ? parentName + "." + declName : declName;
                    var ast = declaration.ast();
                    if (matchKind) {
                        item = new NavigateToItem();
                        item.name = declName;
                        item.matchKind = matchKind;
                        item.kind = this.mapPullElementKind(declaration.kind);
                        item.kindModifiers = this.getScriptElementKindModifiersFromDecl(declaration);
                        item.fileName = this._getHostFileName(fileName);
                        item.minChar = ast.start();
                        item.limChar = ast.end();
                        item.containerName = parentName || "";
                        item.containerKind = parentkindName || "";
                        results.push(item);
                    }
                }
                if (this.isContainerDeclaration(declaration)) {
                    this.findSearchValueInPullDecl(fileName, declaration.getChildDecls(), results, searchTerms, fullName, kindName);
                }
            }
        }

        // Return ScriptElementKind in string of a given declaration.
        private getScriptElementKindModifiersFromDecl(decl: TypeScript.PullDecl): string {
            var result: string[] = [];
            var flags = decl.flags;

            if (flags & TypeScript.PullElementFlags.Exported) {
                result.push(ScriptElementKindModifier.exportedModifier);
            }

            if (flags & TypeScript.PullElementFlags.Ambient) {
                result.push(ScriptElementKindModifier.ambientModifier);
            }

            if (flags & TypeScript.PullElementFlags.Public) {
                result.push(ScriptElementKindModifier.publicMemberModifier);
            }

            if (flags & TypeScript.PullElementFlags.Private) {
                result.push(ScriptElementKindModifier.privateMemberModifier);
            }

            if (flags & TypeScript.PullElementFlags.Static) {
                result.push(ScriptElementKindModifier.staticModifier);
            }

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        // Return true if the declaration has PullElementKind that is one of 
        // the following container types and return false otherwise.
        private isContainerDeclaration(declaration: TypeScript.PullDecl): boolean {
            switch (declaration.kind) {
                case TypeScript.PullElementKind.Script:
                case TypeScript.PullElementKind.Container:
                case TypeScript.PullElementKind.Class:
                case TypeScript.PullElementKind.Interface:
                case TypeScript.PullElementKind.DynamicModule:
                case TypeScript.PullElementKind.Enum:
                    return true;
            }

            return false;
        }

        // Return true if the declaration should havce corresponding NavigateToItem and false otherwise.
        private shouldIncludeDeclarationInNavigationItems(declaration: TypeScript.PullDecl): boolean {
            switch (declaration.kind) {
                case TypeScript.PullElementKind.Script:
                    // Do not include the script item
                    return false;
                case TypeScript.PullElementKind.Variable:
                case TypeScript.PullElementKind.Property:
                    // Do not include the value side of modules or classes, as thier types has already been included
                    return (declaration.flags & (TypeScript.PullElementFlags.ClassConstructorVariable |
                        TypeScript.PullElementFlags.InitializedModule |
                        TypeScript.PullElementFlags.InitializedDynamicModule |
                        TypeScript.PullElementFlags.Enum)) === 0;
                case TypeScript.PullElementKind.EnumMember:
                    return true;
                case TypeScript.PullElementKind.FunctionExpression:
                case TypeScript.PullElementKind.Function:
                    // Ignore anonomus functions
                    return declaration.name !== "";
                case TypeScript.PullElementKind.ConstructorMethod:
                    return false;
            }

            if (this.isContainerDeclaration(declaration)) {
                return true;
            }

            return true;
        }

        public getSyntacticDiagnostics(fileName: string): TypeScript.Diagnostic[]{
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);
            return this.compiler.getSyntacticDiagnostics(fileName);
        }

        public getSemanticDiagnostics(fileName: string): TypeScript.Diagnostic[] {
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);
            return this.compiler.getSemanticDiagnostics(fileName);
        }

        private _getHostSpecificDiagnosticWithFileName(diagnostic: Diagnostic) {
            return new Diagnostic(this._getHostFileName(diagnostic.fileName()), diagnostic.lineMap(),
                diagnostic.start(), diagnostic.length(), diagnostic.diagnosticKey(), diagnostic.arguments(),
                diagnostic.additionalLocations());
        }

        public getCompilerOptionsDiagnostics(): TypeScript.Diagnostic[]{
            this.compiler.synchronizeHostData();
            var resolvePath = (fileName: string) => this.host.resolveRelativePath(fileName, null);
            var compilerOptionsDiagnostics = this.compiler.getCompilerOptionsDiagnostics(resolvePath);
            return compilerOptionsDiagnostics.map(d => this._getHostSpecificDiagnosticWithFileName(d));
        }

        private _getHostFileName(fileName: string): string {
            if (fileName) {
                return this.compiler.getCachedHostFileName(fileName);
            }
            return fileName;
        }

        public getEmitOutput(fileName: string): TypeScript.EmitOutput {
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var resolvePath = (fileName: string) => this.host.resolveRelativePath(fileName, null);

            var document = this.compiler.getDocument(fileName);
            var emitToSingleFile = document.emitToOwnOutputFile();

            // Check for syntactic errors
            var syntacticDiagnostics = emitToSingleFile
                ? this.getSyntacticDiagnostics(fileName)
                : this.getAllSyntacticDiagnostics();
            if (this.containErrors(syntacticDiagnostics)) {
                // This file has at least one syntactic error, return and do not emit code.
                return new TypeScript.EmitOutput(EmitOutputResult.FailedBecauseOfSyntaxErrors);
            }

            // Force a type check before emit to ensure that all symbols have been resolved
            var semanticDiagnostics = emitToSingleFile
                ? this.getSemanticDiagnostics(fileName)
                : this.getAllSemanticDiagnostics();

            // Emit output files and source maps
            // Emit declarations, if there are no semantic errors
            var emitResult = this.compiler.emit(fileName, resolvePath);
            if (emitResult.emitOutputResult == EmitOutputResult.Succeeded) {
                if (!this.containErrors(semanticDiagnostics)) {
                    // Merge the results
                    var declarationEmitOutput = this.compiler.emitDeclarations(fileName, resolvePath);
                    emitResult.outputFiles.push.apply(emitResult.outputFiles, declarationEmitOutput.outputFiles);
                    Debug.assert(declarationEmitOutput.emitOutputResult == EmitOutputResult.Succeeded);
                }
                else if (this.compiler.canEmitDeclarations(fileName)) {
                    emitResult.emitOutputResult = EmitOutputResult.FailedToGenerateDeclarationsBecauseOfSemanticErrors;
                }
            }

            return emitResult;
        }

        private getAllSyntacticDiagnostics(): TypeScript.Diagnostic[] {
            var diagnostics: TypeScript.Diagnostic[] = [];

            this.compiler.fileNames().forEach(fileName =>
                diagnostics.push.apply(diagnostics, this.compiler.getSyntacticDiagnostics(fileName)));

            return diagnostics;
        }

        private getAllSemanticDiagnostics(): TypeScript.Diagnostic[] {
            var diagnostics: TypeScript.Diagnostic[] = [];

            this.compiler.fileNames().map(fileName =>
                diagnostics.push.apply(diagnostics, this.compiler.getSemanticDiagnostics(fileName)));

            return diagnostics;
        }

        private containErrors(diagnostics: TypeScript.Diagnostic[]): boolean {
            if (diagnostics && diagnostics.length > 0) {
                for (var i = 0; i < diagnostics.length; i++) {
                    var diagnosticInfo = diagnostics[i].info();
                    if (diagnosticInfo.category === TypeScript.DiagnosticCategory.Error) {
                        return true;
                    }
                }
            }

            return false;
        }

        private getFullNameOfSymbol(symbol: TypeScript.PullSymbol, enclosingScopeSymbol: TypeScript.PullSymbol) {
            var container = symbol.getContainer();
            if (PullHelpers.isSymbolLocal(symbol) ||
                symbol.kind == TypeScript.PullElementKind.Parameter) {
                // Local var
                return symbol.getScopedName(enclosingScopeSymbol, /*skipTypeParametersInName*/ false, /*useConstraintInName*/ true);
            }

            var symbolKind = symbol.kind;
            if (symbol.kind == TypeScript.PullElementKind.Primitive) {
                // Primitive type symbols - do not use symbol name
                return "";
            }

            if (symbolKind == TypeScript.PullElementKind.ConstructorType) {
                symbol = (<TypeScript.PullTypeSymbol>symbol).getAssociatedContainerType();
            }

            if (symbolKind != TypeScript.PullElementKind.Property &&
                symbolKind != TypeScript.PullElementKind.EnumMember &&
                symbolKind != TypeScript.PullElementKind.Method &&
                symbolKind != TypeScript.PullElementKind.TypeParameter &&
                !symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Exported)) {
                // Non exported variable/function
                return symbol.getScopedName(enclosingScopeSymbol, /*skipTypeParametersInName*/ false, /*useConstraintInName*/true);
            }

            return symbol.fullName(enclosingScopeSymbol);
        }

        private getTypeInfoEligiblePath(sourceUnit: SourceUnit, position: number, isConstructorValidPosition: boolean) {

            var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ false, /*forceInclusive*/ true);
            if (ast === null) {
                return null;
            }

            if (ast.kind() === SyntaxKind.ParameterList && ast.parent.kind() === SyntaxKind.CallSignature && ast.parent.parent.kind() === SyntaxKind.ConstructorDeclaration) {
                ast = ast.parent.parent;
            }

            switch (ast.kind()) {
                default:
                    return null;
                case TypeScript.SyntaxKind.ConstructorDeclaration:
                    var constructorAST = <TypeScript.ConstructorDeclaration>ast;
                    if (!isConstructorValidPosition || !(position >= constructorAST.start() && position <= constructorAST.start() + "constructor".length)) {
                        return null;
                    }
                    else {
                        return ast;
                    }

                case TypeScript.SyntaxKind.FunctionDeclaration:
                    return null;

                case TypeScript.SyntaxKind.MemberAccessExpression:
                case TypeScript.SyntaxKind.QualifiedName:
                case TypeScript.SyntaxKind.SuperKeyword:
                case TypeScript.SyntaxKind.StringLiteral:
                case TypeScript.SyntaxKind.ThisKeyword:
                case TypeScript.SyntaxKind.IdentifierName:
                    return ast;
            }
        }

        public getTypeAtPosition(fileName: string, position: number): TypeInfo {
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);
            var document = this.compiler.getDocument(fileName);

            var node = this.getTypeInfoEligiblePath(document.sourceUnit(), position, true);
            if (!node) {
                return null;
            }

            var ast: TypeScript.AST;
            var symbol: TypeScript.PullSymbol;
            var typeSymbol: TypeScript.PullTypeSymbol;
            var enclosingScopeSymbol: TypeScript.PullSymbol;
            var _isCallExpression: boolean = false;
            var resolvedSignatures: TypeScript.PullSignatureSymbol[];
            var candidateSignature: TypeScript.PullSignatureSymbol;
            var isConstructorCall: boolean;

            if (TypeScript.ASTHelpers.isDeclarationASTOrDeclarationNameAST(node)) {
                var declarationInformation = this.compiler.getSymbolInformationFromAST(node, document);
                if (!declarationInformation) {
                    return null;
                }

                ast = declarationInformation.ast;
                symbol = declarationInformation.symbol;
                enclosingScopeSymbol = declarationInformation.enclosingScopeSymbol;

                if (node.kind() === TypeScript.SyntaxKind.ConstructorDeclaration ||
                    node.kind() === TypeScript.SyntaxKind.FunctionDeclaration ||
                    node.kind() === TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression ||
                    node.kind() === TypeScript.SyntaxKind.SimpleArrowFunctionExpression ||
                    node.kind() === TypeScript.SyntaxKind.MemberFunctionDeclaration ||
                    TypeScript.ASTHelpers.isNameOfFunction(node) ||
                    TypeScript.ASTHelpers.isNameOfMemberFunction(node)) {
                    var funcDecl = node.kind() === TypeScript.SyntaxKind.IdentifierName ? node.parent : node;
                    if (symbol && symbol.kind != TypeScript.PullElementKind.Property) {
                        var signatureInfo = TypeScript.PullHelpers.getSignatureForFuncDecl(this.compiler.getDeclForAST(funcDecl));
                        _isCallExpression = true;
                        candidateSignature = signatureInfo.signature;
                        resolvedSignatures = signatureInfo.allSignatures;
                    }
                }
            }
            else if (TypeScript.ASTHelpers.isCallExpression(node) || TypeScript.ASTHelpers.isCallExpressionTarget(node)) {
                // If this is a call we need to get the call singuatures as well
                // Move the cursor to point to the call expression
                while (!TypeScript.ASTHelpers.isCallExpression(node)) {
                    node = node.parent;
                }

                // Get the call expression symbol
                var callExpressionInformation = this.compiler.getCallInformationFromAST(node, document);

                if (!callExpressionInformation || !callExpressionInformation.targetSymbol) {
                    return null;
                }

                ast = callExpressionInformation.ast;
                symbol = callExpressionInformation.targetSymbol;
                enclosingScopeSymbol = callExpressionInformation.enclosingScopeSymbol;

                // Check if this is a property or a variable, if so do not treat it as a fuction, but rather as a variable with function type
                var isPropertyOrVar = symbol.kind == TypeScript.PullElementKind.Property || symbol.kind == TypeScript.PullElementKind.Variable;
                typeSymbol = symbol.type;
                if (isPropertyOrVar) {
                    if (typeSymbol.getName() != "") {
                        symbol = typeSymbol;
                    }
                    isPropertyOrVar = (typeSymbol.kind != TypeScript.PullElementKind.Interface && typeSymbol.kind != TypeScript.PullElementKind.ObjectType) || typeSymbol.getName() == "";
                }

                if (!isPropertyOrVar) {
                    _isCallExpression = true;
                    resolvedSignatures = callExpressionInformation.resolvedSignatures;
                    candidateSignature = callExpressionInformation.candidateSignature;
                    isConstructorCall = callExpressionInformation.isConstructorCall;
                }
            }
            else {
                var symbolInformation = this.compiler.getSymbolInformationFromAST(node, document);

                if (!symbolInformation || !symbolInformation.symbol) {
                    return null;
                }

                ast = symbolInformation.ast;
                symbol = symbolInformation.symbol;
                enclosingScopeSymbol = symbolInformation.enclosingScopeSymbol;

                if (symbol.kind === TypeScript.PullElementKind.Method || symbol.kind == TypeScript.PullElementKind.Function) {
                    typeSymbol = symbol.type;
                    if (typeSymbol) {
                        _isCallExpression = true;
                        resolvedSignatures = typeSymbol.getCallSignatures();
                    }
                }
            }

            if (resolvedSignatures && (!candidateSignature || candidateSignature.isDefinition())) {
                for (var i = 0, len = resolvedSignatures.length; i < len; i++) {
                    if (len > 1 && resolvedSignatures[i].isDefinition()) {
                        continue;
                    }

                    candidateSignature = resolvedSignatures[i];
                    break;
                }
            }

            var memberName = _isCallExpression
                ? TypeScript.PullSignatureSymbol.getSignatureTypeMemberName(candidateSignature, resolvedSignatures, enclosingScopeSymbol)
                : symbol.getTypeNameEx(enclosingScopeSymbol, /*useConstraintInName*/ true);
            var kind = this.mapPullElementKind(symbol.kind, symbol, !_isCallExpression, _isCallExpression, isConstructorCall);

            var docCommentSymbol = candidateSignature || symbol;
            var docComment = docCommentSymbol.docComments(!_isCallExpression);
            var symbolName = this.getFullNameOfSymbol(symbol, enclosingScopeSymbol);
            var minChar = ast ? ast.start() : -1;
            var limChar = ast ? ast.end() : -1;

            return new TypeInfo(memberName, docComment, symbolName, kind, minChar, limChar);
        }

        public getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): CompletionInfo {
            this.compiler.synchronizeHostData();
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var document = this.compiler.getDocument(fileName);
            var sourceUnit = document.sourceUnit();

            if (CompletionHelpers.isCompletionListBlocker(document.syntaxTree().sourceUnit(), position)) {
                this.logger.log("Returning an empty list because completion was blocked.");
                return null;
            }

            var node = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ true, /*forceInclusive*/ true);

            if (node && node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                node.start() === node.end()) {
                // Ignore missing name nodes
                node = node.parent;
            }

            var isRightOfDot = false;
            if (node &&
                node.kind() === TypeScript.SyntaxKind.MemberAccessExpression &&
                (<TypeScript.MemberAccessExpression>node).expression.end() < position) {

                isRightOfDot = true;
                node = (<TypeScript.MemberAccessExpression>node).expression;
            }
            else if (node &&
                node.kind() === TypeScript.SyntaxKind.QualifiedName &&
                (<TypeScript.QualifiedName>node).left.end() < position) {

                isRightOfDot = true;
                node = (<TypeScript.QualifiedName>node).left;
            }
            else if (node && node.parent &&
                node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                node.parent.kind() === TypeScript.SyntaxKind.MemberAccessExpression &&
                (<TypeScript.MemberAccessExpression>node.parent).name === node) {

                isRightOfDot = true;
                node = (<TypeScript.MemberAccessExpression>node.parent).expression;
            }
            else if (node && node.parent &&
                node.kind() === TypeScript.SyntaxKind.IdentifierName &&
                node.parent.kind() === TypeScript.SyntaxKind.QualifiedName &&
                (<TypeScript.QualifiedName>node.parent).right === node) {

                isRightOfDot = true;
                node = (<TypeScript.QualifiedName>node.parent).left;
            }

            // Get the completions
            var entries = new TypeScript.IdentiferNameHashTable<CachedCompletionEntryDetails>();

            // Right of dot member completion list
            if (isRightOfDot) {
                var members = this.compiler.getVisibleMemberSymbolsFromAST(node, document);
                if (!members) {
                    return null;
                }

                isMemberCompletion = true;
                this.getCompletionEntriesFromSymbols(members, entries);
            }
            else {
                var containingObjectLiteral = CompletionHelpers.getContainingObjectLiteralApplicableForCompletion(document.syntaxTree().sourceUnit(), position);

                // Object literal expression, look up possible property names from contextual type
                if (containingObjectLiteral) {
                    var searchPosition = Math.min(position, containingObjectLiteral.end());
                    var path = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, searchPosition);
                    // Get the object literal node

                    while (node && node.kind() !== TypeScript.SyntaxKind.ObjectLiteralExpression) {
                        node = node.parent;
                    }

                    if (!node || node.kind() !== TypeScript.SyntaxKind.ObjectLiteralExpression) {
                        // AST Path look up did not result in the same node as Fidelity Syntax Tree look up.
                        // Once we remove AST this will no longer be a problem.
                        return null;
                    }

                    isMemberCompletion = true;

                    // Try to get the object members form contextual typing
                    var contextualMembers = this.compiler.getContextualMembersFromAST(node, document);
                    if (contextualMembers && contextualMembers.symbols && contextualMembers.symbols.length > 0) {
                        // get existing members
                        var existingMembers = this.compiler.getVisibleMemberSymbolsFromAST(node, document);

                        // Add filtterd items to the completion list
                        this.getCompletionEntriesFromSymbols({
                            symbols: CompletionHelpers.filterContextualMembersList(contextualMembers.symbols, existingMembers, fileName, position),
                            enclosingScopeSymbol: contextualMembers.enclosingScopeSymbol
                        }, entries);
                    }
                }
                // Get scope memebers
                else {
                    isMemberCompletion = false;
                    var decls = this.compiler.getVisibleDeclsFromAST(node, document);
                    this.getCompletionEntriesFromDecls(decls, entries);
                }
            }

            // Add keywords if this is not a member completion list
            if (!isMemberCompletion) {
                this.getCompletionEntriesForKeywords(KeywordCompletions.getKeywordCompltions(), entries);
            }

            // Prepare the completion result
            var completions = new CompletionInfo();
            completions.isMemberCompletion = isMemberCompletion;
            completions.entries = [];
            entries.map((key, value) => {
                completions.entries.push({
                    name: value.name,
                    kind: value.kind,
                    kindModifiers: value.kindModifiers
                });
            }, null);

            // Store this completion list as the active completion list
            this.activeCompletionSession = new CompletionSession(fileName, position, entries);

            return completions;
        }

        private getCompletionEntriesFromSymbols(symbolInfo: TypeScript.PullVisibleSymbolsInfo, result: TypeScript.IdentiferNameHashTable<CachedCompletionEntryDetails>): void {
            for (var i = 0, n = symbolInfo.symbols.length; i < n; i++) {
                var symbol = symbolInfo.symbols[i];

                var symbolDisplayName = CompletionHelpers.getValidCompletionEntryDisplayName(symbol.getDisplayName());
                if (!symbolDisplayName) {
                    continue;
                }

                var symbolKind = symbol.kind;

                var exitingEntry = result.lookup(symbolDisplayName);

                if (exitingEntry && (symbolKind & TypeScript.PullElementKind.SomeValue)) {
                    // We have two decls with the same name. Do not overwrite types and containers with thier variable delcs.
                    continue;
                }

                var entry: CachedCompletionEntryDetails;
                var kindName = this.mapPullElementKind(symbolKind, symbol, true);
                var kindModifiersName = this.getScriptElementKindModifiers(symbol);

                if (symbol.isResolved) {
                    // If the symbol has already been resolved, cache the needed information for completion details.
                    var completionInfo = this.getResolvedCompletionEntryDetailsFromSymbol(symbol, symbolInfo.enclosingScopeSymbol);

                    entry = new ResolvedCompletionEntry(symbolDisplayName, kindName, kindModifiersName, completionInfo.typeName, completionInfo.fullSymbolName, completionInfo.docComments);
                }
                else {
                    entry = new DeclReferenceCompletionEntry(symbolDisplayName, kindName, kindModifiersName, symbol.getDeclarations()[0]);
                }

                result.addOrUpdate(symbolDisplayName, entry);
            }
        }

        private getCompletionEntriesFromDecls(decls: TypeScript.PullDecl[], result: TypeScript.IdentiferNameHashTable<CachedCompletionEntryDetails>): void {
            for (var i = 0, n = decls ? decls.length : 0; i < n; i++) {
                var decl = decls[i];

                var declDisplaylName = CompletionHelpers.getValidCompletionEntryDisplayName(decl.getDisplayName());
                if (!declDisplaylName) {
                    continue;
                }

                var declKind = decl.kind;

                var exitingEntry = result.lookup(declDisplaylName);

                if (exitingEntry && (declKind & TypeScript.PullElementKind.SomeValue)) {
                    // We have two decls with the same name. Do not overwrite types and containers with thier variable delcs.
                    continue;
                }

                var kindName = this.mapPullElementKind(declKind, /*symbol*/ null, true);
                var kindModifiersName = this.getScriptElementKindModifiersFromFlags(decl.flags);

                var entry: CachedCompletionEntryDetails = null;
                // Do not call getSymbol if the decl is not already bound. This would force a bind,
                // which is too expensive to do for every completion item when we are building the
                // list.
                var symbol = decl.hasSymbol() && decl.getSymbol();
                // If the symbol has already been resolved, cache the needed information for completion details.
                var enclosingDecl = decl.getEnclosingDecl();
                var enclosingScopeSymbol = (enclosingDecl && enclosingDecl.hasSymbol()) ? enclosingDecl.getSymbol() : null;

                if (symbol && symbol.isResolved && enclosingScopeSymbol && enclosingScopeSymbol.isResolved) {
                    var completionInfo = this.getResolvedCompletionEntryDetailsFromSymbol(symbol, enclosingScopeSymbol);
                    entry = new ResolvedCompletionEntry(declDisplaylName, kindName, kindModifiersName, completionInfo.typeName, completionInfo.fullSymbolName, completionInfo.docComments);
                }
                else {
                    entry = new DeclReferenceCompletionEntry(declDisplaylName, kindName, kindModifiersName, decl);
                }

                result.addOrUpdate(declDisplaylName, entry);
            }
        }

        private getResolvedCompletionEntryDetailsFromSymbol(symbol: TypeScript.PullSymbol, enclosingScopeSymbol: TypeScript.PullSymbol):
            { typeName: string; fullSymbolName: string; docComments: string } {
            var typeName = symbol.getTypeName(enclosingScopeSymbol, /*useConstraintInName*/ true);
            var fullSymbolName = this.getFullNameOfSymbol(symbol, enclosingScopeSymbol);

            var type = symbol.type;
            var symbolForDocComments = symbol;
            if (type && type.hasOnlyOverloadCallSignatures()) {
                symbolForDocComments = type.getCallSignatures()[0];
            }

            var docComments = symbolForDocComments.docComments(/*useConstructorAsClass:*/ true);
            return {
                typeName: typeName,
                fullSymbolName: fullSymbolName,
                docComments: docComments
            };
        }

        private getCompletionEntriesForKeywords(keywords: ResolvedCompletionEntry[], result: TypeScript.IdentiferNameHashTable<CompletionEntryDetails>): void {
            for (var i = 0, n = keywords.length; i < n; i++) {
                var keyword = keywords[i];
                result.addOrUpdate(keyword.name, keyword);
            }
        }

        public getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
            this.compiler.synchronizeHostData();

            fileName = TypeScript.switchToForwardSlashes(fileName);

            // Ensure that the current active completion session is still valid for this request
            if (!this.activeCompletionSession ||
                this.activeCompletionSession.fileName !== fileName ||
                this.activeCompletionSession.position !== position) {
                return null;
            }

            var entry = this.activeCompletionSession.entries.lookup(entryName);
            if (!entry) {
                return null;
            }

            if (!entry.isResolved()) {
                var decl = (<DeclReferenceCompletionEntry>entry).decl;

                // If this decl has been invalidated becuase of a user edit, try to find the new
                // decl that matches it
                // Theoretically, this corrective measure should just fix decls if the completion
                // session is older than the file, but we are being defensive, so always correct
                // the decl.
                var document = this.compiler.getDocument(fileName);
                if (decl.fileName() === TypeScript.switchToForwardSlashes(fileName)) {
                    decl = this.tryFindDeclFromPreviousCompilerVersion(decl);

                    if (decl) {
                        var declDisplaylName = CompletionHelpers.getValidCompletionEntryDisplayName(decl.getDisplayName());
                        var declKind = decl.kind;
                        var kindName = this.mapPullElementKind(declKind, /*symbol*/ null, true);
                        var kindModifiersName = this.getScriptElementKindModifiersFromFlags(decl.flags);

                        // update the existing entry
                        entry = new DeclReferenceCompletionEntry(declDisplaylName, kindName, kindModifiersName, decl);
                        this.activeCompletionSession.entries.addOrUpdate(entryName, entry);
                    }
                }

                // This entry has not been resolved yet. Resolve it.
                if (decl) {
                    var node = TypeScript.ASTHelpers.getAstAtPosition(document.sourceUnit(), position);
                    var symbolInfo = this.compiler.pullGetDeclInformation(decl, node, document);

                    if (!symbolInfo) {
                        return null;
                    }

                    var symbol = symbolInfo.symbol;
                    var completionInfo = this.getResolvedCompletionEntryDetailsFromSymbol(symbol, symbolInfo.enclosingScopeSymbol);
                    // Store the information for next lookup
                    (<DeclReferenceCompletionEntry>entry).resolve(completionInfo.typeName, completionInfo.fullSymbolName, completionInfo.docComments);
                }
            }

            return {
                name: entry.name,
                kind: entry.kind,
                kindModifiers: entry.kindModifiers,
                type: entry.type,
                fullSymbolName: entry.fullSymbolName,
                docComment: entry.docComment
            };
        }

        // Given a declaration returned from a previous version of the compiler (i.e. prior to 
        // any mutation operations), attempts to find the same decl in this version.  
        private tryFindDeclFromPreviousCompilerVersion(invalidatedDecl: TypeScript.PullDecl): TypeScript.PullDecl {
            var fileName = invalidatedDecl.fileName();

            var declsInPath: TypeScript.PullDecl[] = [];
            var current = invalidatedDecl;
            while (current) {
                if (current.kind !== TypeScript.PullElementKind.Script) {
                    declsInPath.unshift(current);
                }

                current = current.getParentDecl();
            }

            // now search for that decl
            var topLevelDecl = this.compiler.topLevelDeclaration(fileName);
            if (!topLevelDecl) {
                return null;
            }

            var declsToSearch = [topLevelDecl];
            var foundDecls: TypeScript.PullDecl[] = [];
            var keepSearching = (invalidatedDecl.kind & TypeScript.PullElementKind.Container) ||
                (invalidatedDecl.kind & TypeScript.PullElementKind.Interface) ||
                (invalidatedDecl.kind & TypeScript.PullElementKind.Class) ||
                (invalidatedDecl.kind & TypeScript.PullElementKind.Enum);

            for (var i = 0; i < declsInPath.length; i++) {
                var declInPath = declsInPath[i];
                var decls: TypeScript.PullDecl[] = [];

                for (var j = 0; j < declsToSearch.length; j++) {
                    foundDecls = declsToSearch[j].searchChildDecls(declInPath.name, declInPath.kind);

                    decls.push.apply(decls, foundDecls);

                    // Unless we're searching for an interface or module, we've found the one true
                    // decl, so don't bother searching the rest of the top-level decls
                    if (foundDecls.length && !keepSearching) {
                        break;
                    }
                }

                declsToSearch = decls;

                if (declsToSearch.length == 0) {
                    break;
                }
            }

            return declsToSearch.length === 0 ? null : declsToSearch[0];
        }

        private getModuleOrEnumKind(symbol: TypeScript.PullSymbol) {
            if (symbol) {
                var declarations = symbol.getDeclarations();
                for (var i = 0; i < declarations.length; i++) {
                    var declKind = declarations[i].kind;
                    if (declKind == TypeScript.PullElementKind.Container) {
                        return ScriptElementKind.moduleElement;
                    }
                    else if (declKind == TypeScript.PullElementKind.Enum) {
                        return ScriptElementKind.enumElement;
                    }
                    else if (declKind == TypeScript.PullElementKind.Variable) {
                        var declFlags = declarations[i].flags;
                        if (declFlags & TypeScript.PullElementFlags.InitializedModule) {
                            return ScriptElementKind.moduleElement;
                        }
                        else if (declFlags & TypeScript.PullElementFlags.Enum) {
                            return ScriptElementKind.enumElement;
                        }
                    }
                }
            }
            return ScriptElementKind.unknown;
        }

        private mapPullElementKind(kind: TypeScript.PullElementKind, symbol?: TypeScript.PullSymbol, useConstructorAsClass?: boolean, varIsFunction?: boolean, functionIsConstructor?: boolean): string {
            if (functionIsConstructor) {
                return ScriptElementKind.constructorImplementationElement;
            }

            if (varIsFunction) {
                switch (kind) {
                    case TypeScript.PullElementKind.Container:
                    case TypeScript.PullElementKind.DynamicModule:
                    case TypeScript.PullElementKind.TypeAlias:
                    case TypeScript.PullElementKind.Interface:
                    case TypeScript.PullElementKind.Class:
                    case TypeScript.PullElementKind.Parameter:
                        return ScriptElementKind.functionElement;
                    case TypeScript.PullElementKind.Variable:
                        return (symbol && PullHelpers.isSymbolLocal(symbol)) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
                    case TypeScript.PullElementKind.Property:
                        return ScriptElementKind.memberFunctionElement;
                    case TypeScript.PullElementKind.Function:
                        return (symbol && PullHelpers.isSymbolLocal(symbol)) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
                    case TypeScript.PullElementKind.ConstructorMethod:
                        return ScriptElementKind.constructorImplementationElement;
                    case TypeScript.PullElementKind.Method:
                        return ScriptElementKind.memberFunctionElement;
                    case TypeScript.PullElementKind.FunctionExpression:
                        return ScriptElementKind.localFunctionElement;
                    case TypeScript.PullElementKind.GetAccessor:
                        return ScriptElementKind.memberGetAccessorElement;
                    case TypeScript.PullElementKind.SetAccessor:
                        return ScriptElementKind.memberSetAccessorElement;
                    case TypeScript.PullElementKind.CallSignature:
                        return ScriptElementKind.callSignatureElement;
                    case TypeScript.PullElementKind.ConstructSignature:
                        return ScriptElementKind.constructSignatureElement;
                    case TypeScript.PullElementKind.IndexSignature:
                        return ScriptElementKind.indexSignatureElement;
                    case TypeScript.PullElementKind.TypeParameter:
                        return ScriptElementKind.typeParameterElement;
                    case TypeScript.PullElementKind.Primitive:
                        return ScriptElementKind.primitiveType;
                }
            }
            else {
                switch (kind) {
                    case TypeScript.PullElementKind.Script:
                        return ScriptElementKind.scriptElement;
                    case TypeScript.PullElementKind.Container:
                    case TypeScript.PullElementKind.DynamicModule:
                    case TypeScript.PullElementKind.TypeAlias:
                        return ScriptElementKind.moduleElement;
                    case TypeScript.PullElementKind.Interface:
                        return ScriptElementKind.interfaceElement;
                    case TypeScript.PullElementKind.Class:
                        return ScriptElementKind.classElement;
                    case TypeScript.PullElementKind.Enum:
                        return ScriptElementKind.enumElement;
                    case TypeScript.PullElementKind.Variable:
                        var scriptElementKind = this.getModuleOrEnumKind(symbol);
                        if (scriptElementKind != ScriptElementKind.unknown) {
                            return scriptElementKind;
                        }
                        return (symbol && PullHelpers.isSymbolLocal(symbol)) ? ScriptElementKind.localVariableElement : ScriptElementKind.variableElement;
                    case TypeScript.PullElementKind.Parameter:
                        return ScriptElementKind.parameterElement;
                    case TypeScript.PullElementKind.Property:
                        return ScriptElementKind.memberVariableElement;
                    case TypeScript.PullElementKind.Function:
                        return (symbol && PullHelpers.isSymbolLocal(symbol)) ? ScriptElementKind.localFunctionElement : ScriptElementKind.functionElement;
                    case TypeScript.PullElementKind.ConstructorMethod:
                        return useConstructorAsClass ? ScriptElementKind.classElement : ScriptElementKind.constructorImplementationElement;
                    case TypeScript.PullElementKind.Method:
                        return ScriptElementKind.memberFunctionElement;
                    case TypeScript.PullElementKind.FunctionExpression:
                        return ScriptElementKind.localFunctionElement;
                    case TypeScript.PullElementKind.GetAccessor:
                        return ScriptElementKind.memberGetAccessorElement;
                    case TypeScript.PullElementKind.SetAccessor:
                        return ScriptElementKind.memberSetAccessorElement;
                    case TypeScript.PullElementKind.CallSignature:
                        return ScriptElementKind.callSignatureElement;
                    case TypeScript.PullElementKind.ConstructSignature:
                        return ScriptElementKind.constructSignatureElement;
                    case TypeScript.PullElementKind.IndexSignature:
                        return ScriptElementKind.indexSignatureElement;
                    case TypeScript.PullElementKind.EnumMember:
                        return ScriptElementKind.memberVariableElement;
                    case TypeScript.PullElementKind.TypeParameter:
                        return ScriptElementKind.typeParameterElement;
                    case TypeScript.PullElementKind.Primitive:
                        return ScriptElementKind.primitiveType;
                }
            }

            return ScriptElementKind.unknown;
        }

        private getScriptElementKindModifiers(symbol: TypeScript.PullSymbol): string {
            var result: string[] = [];

            if (symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Exported)) {
                result.push(ScriptElementKindModifier.exportedModifier);
            }
            if (symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Ambient)) {
                result.push(ScriptElementKindModifier.ambientModifier);
            }
            if (symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Public)) {
                result.push(ScriptElementKindModifier.publicMemberModifier);
            }
            if (symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Private)) {
                result.push(ScriptElementKindModifier.privateMemberModifier);
            }
            if (symbol.anyDeclHasFlag(TypeScript.PullElementFlags.Static)) {
                result.push(ScriptElementKindModifier.staticModifier);
            }

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        private getScriptElementKindModifiersFromFlags(flags: TypeScript.PullElementFlags): string {
            var result: string[] = [];

            if (flags & TypeScript.PullElementFlags.Exported) {
                result.push(ScriptElementKindModifier.exportedModifier);
            }

            if (flags & TypeScript.PullElementFlags.Ambient) {
                result.push(ScriptElementKindModifier.ambientModifier);
            }

            if (flags & TypeScript.PullElementFlags.Public) {
                result.push(ScriptElementKindModifier.publicMemberModifier);
            }

            if (flags & TypeScript.PullElementFlags.Private) {
                result.push(ScriptElementKindModifier.privateMemberModifier);
            }

            if (flags & TypeScript.PullElementFlags.Static) {
                result.push(ScriptElementKindModifier.staticModifier);
            }

            return result.length > 0 ? result.join(',') : ScriptElementKindModifier.none;
        }

        // 
        // Syntactic Single-File features
        //

        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): SpanInfo {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            this.compiler.synchronizeHostData();
            var document = this.compiler.getDocument(fileName);
            var node = this.getTypeInfoEligiblePath(document.sourceUnit(), startPos, false);

            if (!node) {
                return null;
            }

            while (node) {
                if (TypeScript.ASTHelpers.isNameOfMemberAccessExpression(node) ||
                    TypeScript.ASTHelpers.isRightSideOfQualifiedName(node)) {
                    node = node.parent;
                }
                else {
                    break;
                }
            }

            var spanInfo = new SpanInfo(node.start(), node.end());
            return spanInfo;
        }

        public getBreakpointStatementAtPosition(fileName: string, pos: number): SpanInfo {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var syntaxtree = this.getSyntaxTree(fileName);
            return TypeScript.Services.Breakpoints.getBreakpointLocation(syntaxtree, pos);
        }

        public getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = this.getFormattingManager(fileName, options);
            return manager.formatSelection(minChar, limChar);
        }

        public getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = this.getFormattingManager(fileName, options);
            return manager.formatDocument(minChar, limChar);
        }

        public getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = this.getFormattingManager(fileName, options);
            return manager.formatOnPaste(minChar, limChar);
        }

        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextEdit[] {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var manager = this.getFormattingManager(fileName, options);

            if (key === "}") {
                return manager.formatOnClosingCurlyBrace(position);
            }
            else if (key === ";") {
                return manager.formatOnSemicolon(position);
            }
            else if (key === "\n") {
                return manager.formatOnEnter(position);
            }

            return [];
        }

        private getFormattingManager(fileName: string, options: FormatCodeOptions) {
            // Ensure rules are initialized and up to date wrt to formatting options
            if (this.formattingRulesProvider == null) {
                this.formattingRulesProvider = new TypeScript.Services.Formatting.RulesProvider(this.logger);
            }

            this.formattingRulesProvider.ensureUpToDate(options);

            var scriptSnapshot = this._syntaxTreeCache.getCurrentScriptSnapshot(fileName);            
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(SimpleText.fromScriptSnapshot(scriptSnapshot));

            var manager = new TypeScript.Services.Formatting.FormattingManager(this.getSyntaxTree(fileName), textSnapshot, this.formattingRulesProvider, options);

            return manager;
        }

        public getOutliningRegions(fileName: string): TypeScript.TextSpan[]{            
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var syntaxTree = this.getSyntaxTree(fileName);
            return OutliningElementsCollector.collectElements(syntaxTree.sourceUnit());
        }

        // Given a script name and position in the script, return the
        // number of spaces equivalent to the desired smart indent 
        // (assuming the line is empty). Returns "null" in case the
        // smart indent cannot be determined.
        public getIndentationAtPosition(fileName: string, position: number, editorOptions: EditorOptions): number {
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var scriptSnapshot = this._syntaxTreeCache.getCurrentScriptSnapshot(fileName);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(SimpleText.fromScriptSnapshot(scriptSnapshot));
            var options = new FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)

            return TypeScript.Services.Formatting.SingleTokenIndenter.getIndentationAmount(position, this.getSyntaxTree(fileName).sourceUnit(), textSnapshot, options);
        }

        // Given a script name and position in the script, return a pair of text range if the 
        // position corresponds to a "brace matchin" characters (e.g. "{" or "(", etc.)
        // If the position is not on any range, return "null".
        public getBraceMatchingAtPosition(fileName: string, position: number): TypeScript.TextSpan[] {
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var syntaxTree = this.getSyntaxTree(fileName);
            return BraceMatcher.getMatchSpans(syntaxTree, position);
        }

        public getScriptLexicalStructure(fileName: string): NavigateToItem[]{
            // doesn't use compiler - no need to synchronize with host
            fileName = TypeScript.switchToForwardSlashes(fileName);

            var syntaxTree = this.getSyntaxTree(fileName);
            var items: NavigateToItem[] = [];
            GetScriptLexicalStructureWalker.getListsOfAllScriptLexicalStructure(items, fileName, syntaxTree.sourceUnit());

            return items;
        }

        public getSyntaxTree(fileName: string): TypeScript.SyntaxTree {
            fileName = TypeScript.switchToForwardSlashes(fileName);
            return this._syntaxTreeCache.getCurrentFileSyntaxTree(fileName);
        }
    }

    function isSignatureHelpBlocker(ast: TypeScript.AST): boolean {
        if (ast) {
            switch (ast.kind()) {
                case TypeScript.SyntaxKind.ClassDeclaration:
                case TypeScript.SyntaxKind.InterfaceDeclaration:
                case TypeScript.SyntaxKind.ModuleDeclaration:
                case TypeScript.SyntaxKind.ConstructorDeclaration:
                case TypeScript.SyntaxKind.FunctionDeclaration:
                case TypeScript.SyntaxKind.VariableDeclarator:
                case TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression:
                case TypeScript.SyntaxKind.SimpleArrowFunctionExpression:
                    return true;
            }
        }

        return false;
    }
}