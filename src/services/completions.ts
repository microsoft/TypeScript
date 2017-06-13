/// <reference path="./pathCompletions.ts" />

/* @internal */
namespace ts.Completions {
    export type Log = (message: string) => void;

    export function getCompletionsAtPosition(host: LanguageServiceHost, typeChecker: TypeChecker, log: Log, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number): CompletionInfo | undefined {
        if (isInReferenceComment(sourceFile, position)) {
            return PathCompletions.getTripleSlashReferenceCompletion(sourceFile, position, compilerOptions, host);
        }

        if (isInString(sourceFile, position)) {
            return getStringLiteralCompletionEntries(sourceFile, position, typeChecker, compilerOptions, host, log);
        }

        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (!completionData) {
            return undefined;
        }

        const { symbols, isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation, location, request, hasFilteredClassMemberKeywords } = completionData;

        if (sourceFile.languageVariant === LanguageVariant.JSX &&
            location && location.parent && location.parent.kind === SyntaxKind.JsxClosingElement) {
            // In the TypeScript JSX element, if such element is not defined. When users query for completion at closing tag,
            // instead of simply giving unknown value, the completion will return the tag-name of an associated opening-element.
            // For example:
            //     var x = <div> </ /*1*/>  completion list at "1" will contain "div" with type any
            const tagName = (<JsxElement>location.parent.parent).openingElement.tagName;
            return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: false,
                entries: [{
                    name: (<JsxTagNameExpression>tagName).getFullText(),
                    kind: ScriptElementKind.classElement,
                    kindModifiers: undefined,
                    sortText: "0",
                }]};
        }

        if (request) {
            const entries = request.kind === "JsDocTagName"
                // If the current position is a jsDoc tag name, only tag names should be provided for completion
                ? JsDoc.getJSDocTagNameCompletions()
                : request.kind === "JsDocTag"
                // If the current position is a jsDoc tag, only tags should be provided for completion
                ? JsDoc.getJSDocTagCompletions()
                : JsDoc.getJSDocParameterNameCompletions(request.tag);
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false,  entries };
        }

        const entries: CompletionEntry[] = [];

        if (isSourceFileJavaScript(sourceFile)) {
            const uniqueNames = getCompletionEntriesFromSymbols(symbols, entries, location, /*performCharacterChecks*/ true, typeChecker, compilerOptions.target, log);
            addRange(entries, getJavaScriptCompletionEntries(sourceFile, location.pos, uniqueNames, compilerOptions.target));
        }
        else {
            if (!symbols || symbols.length === 0) {
                if (!hasFilteredClassMemberKeywords) {
                    return undefined;
                }
            }

            getCompletionEntriesFromSymbols(symbols, entries, location, /*performCharacterChecks*/ true, typeChecker, compilerOptions.target, log);
        }

        if (hasFilteredClassMemberKeywords) {
            addRange(entries, classMemberKeywordCompletions);
        }
        // Add keywords if this is not a member completion list
        else if (!isMemberCompletion) {
            addRange(entries, keywordCompletions);
        }

        return { isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation: isNewIdentifierLocation, entries };
    }

    function getJavaScriptCompletionEntries(sourceFile: SourceFile, position: number, uniqueNames: Map<string>, target: ScriptTarget): CompletionEntry[] {
        const entries: CompletionEntry[] = [];

        const nameTable = getNameTable(sourceFile);
        nameTable.forEach((pos, name) => {
            // Skip identifiers produced only from the current location
            if (pos === position) {
                return;
            }

            if (!uniqueNames.get(name)) {
                uniqueNames.set(name, name);
                const displayName = getCompletionEntryDisplayName(unescapeIdentifier(name), target, /*performCharacterChecks*/ true);
                if (displayName) {
                    const entry = {
                        name: displayName,
                        kind: ScriptElementKind.warning,
                        kindModifiers: "",
                        sortText: "1"
                    };
                    entries.push(entry);
                }
            }
        });

        return entries;
    }

    function createCompletionEntry(symbol: Symbol, location: Node, performCharacterChecks: boolean, typeChecker: TypeChecker, target: ScriptTarget): CompletionEntry {
        // Try to get a valid display name for this symbol, if we could not find one, then ignore it.
        // We would like to only show things that can be added after a dot, so for instance numeric properties can
        // not be accessed with a dot (a.1 <- invalid)
        const displayName = getCompletionEntryDisplayNameForSymbol(typeChecker, symbol, target, performCharacterChecks, location);
        if (!displayName) {
            return undefined;
        }

        // TODO(drosen): Right now we just permit *all* semantic meanings when calling
        // 'getSymbolKind' which is permissible given that it is backwards compatible; but
        // really we should consider passing the meaning for the node so that we don't report
        // that a suggestion for a value is an interface.  We COULD also just do what
        // 'getSymbolModifiers' does, which is to use the first declaration.

        // Use a 'sortText' of 0' so that all symbol completion entries come before any other
        // entries (like JavaScript identifier entries).
        return {
            name: displayName,
            kind: SymbolDisplay.getSymbolKind(typeChecker, symbol, location),
            kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
            sortText: "0",
        };
    }

    function getCompletionEntriesFromSymbols(symbols: Symbol[], entries: Push<CompletionEntry>, location: Node, performCharacterChecks: boolean, typeChecker: TypeChecker, target: ScriptTarget, log: Log): Map<string> {
        const start = timestamp();
        const uniqueNames = createMap<string>();
        if (symbols) {
            for (const symbol of symbols) {
                const entry = createCompletionEntry(symbol, location, performCharacterChecks, typeChecker, target);
                if (entry) {
                    const id = escapeIdentifier(entry.name);
                    if (!uniqueNames.get(id)) {
                        entries.push(entry);
                        uniqueNames.set(id, id);
                    }
                }
            }
        }

        log("getCompletionsAtPosition: getCompletionEntriesFromSymbols: " + (timestamp() - start));
        return uniqueNames;
    }

    function getStringLiteralCompletionEntries(sourceFile: SourceFile, position: number, typeChecker: TypeChecker, compilerOptions: CompilerOptions, host: LanguageServiceHost, log: Log): CompletionInfo | undefined {
        const node = findPrecedingToken(position, sourceFile);
        if (!node || node.kind !== SyntaxKind.StringLiteral) {
            return undefined;
        }

        if (node.parent.kind === SyntaxKind.PropertyAssignment &&
            node.parent.parent.kind === SyntaxKind.ObjectLiteralExpression &&
            (<PropertyAssignment>node.parent).name === node) {
            // Get quoted name of properties of the object literal expression
            // i.e. interface ConfigFiles {
            //          'jspm:dev': string
            //      }
            //      let files: ConfigFiles = {
            //          '/*completion position*/'
            //      }
            //
            //      function foo(c: ConfigFiles) {}
            //      foo({
            //          '/*completion position*/'
            //      });
            return getStringLiteralCompletionEntriesFromPropertyAssignment(<ObjectLiteralElement>node.parent, typeChecker, compilerOptions.target, log);
        }
        else if (isElementAccessExpression(node.parent) && node.parent.argumentExpression === node) {
            // Get all names of properties on the expression
            // i.e. interface A {
            //      'prop1': string
            // }
            // let a: A;
            // a['/*completion position*/']
            return getStringLiteralCompletionEntriesFromElementAccess(node.parent, typeChecker, compilerOptions.target, log);
        }
        else if (node.parent.kind === SyntaxKind.ImportDeclaration || isExpressionOfExternalModuleImportEqualsDeclaration(node) || isRequireCall(node.parent, /*checkArgumentIsStringLiteral*/ false)) {
            // Get all known external module names or complete a path to a module
            // i.e. import * as ns from "/*completion position*/";
            //      import x = require("/*completion position*/");
            //      var y = require("/*completion position*/");
            return PathCompletions.getStringLiteralCompletionEntriesFromModuleNames(<StringLiteral>node, compilerOptions, host, typeChecker);
        }
        else if (isEqualityExpression(node.parent)) {
            // Get completions from the type of the other operand
            // i.e. switch (a) {
            //         case '/*completion position*/'
            //      }
            return getStringLiteralCompletionEntriesFromType(typeChecker.getTypeAtLocation(node.parent.left === node ? node.parent.right : node.parent.left), typeChecker);
        }
        else if (isCaseOrDefaultClause(node.parent)) {
            // Get completions from the type of the switch expression
            // i.e. x === '/*completion position'
            return getStringLiteralCompletionEntriesFromType(typeChecker.getTypeAtLocation((<SwitchStatement>node.parent.parent.parent).expression), typeChecker);
        }
        else {
            const argumentInfo = SignatureHelp.getImmediatelyContainingArgumentInfo(node, position, sourceFile);
            if (argumentInfo) {
                // Get string literal completions from specialized signatures of the target
                // i.e. declare function f(a: 'A');
                // f("/*completion position*/")
                return getStringLiteralCompletionEntriesFromCallExpression(argumentInfo, typeChecker);
            }

            // Get completion for string literal from string literal type
            // i.e. var x: "hi" | "hello" = "/*completion position*/"
            return getStringLiteralCompletionEntriesFromType(typeChecker.getContextualType(<StringLiteral>node), typeChecker);
        }
    }

    function getStringLiteralCompletionEntriesFromPropertyAssignment(element: ObjectLiteralElement, typeChecker: TypeChecker, target: ScriptTarget, log: Log): CompletionInfo | undefined {
        const type = typeChecker.getContextualType((<ObjectLiteralExpression>element.parent));
        const entries: CompletionEntry[] = [];
        if (type) {
            getCompletionEntriesFromSymbols(type.getApparentProperties(), entries, element, /*performCharacterChecks*/ false, typeChecker, target, log);
            if (entries.length) {
                return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: true, entries };
            }
        }
    }

    function getStringLiteralCompletionEntriesFromCallExpression(argumentInfo: SignatureHelp.ArgumentListInfo, typeChecker: TypeChecker): CompletionInfo | undefined {
        const candidates: Signature[] = [];
        const entries: CompletionEntry[] = [];
        const uniques = createMap<true>();

        typeChecker.getResolvedSignature(argumentInfo.invocation, candidates);

        for (const candidate of candidates) {
            addStringLiteralCompletionsFromType(typeChecker.getParameterType(candidate, argumentInfo.argumentIndex), entries, typeChecker, uniques);
        }

        if (entries.length) {
            return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: true, entries };
        }

        return undefined;
    }

    function getStringLiteralCompletionEntriesFromElementAccess(node: ElementAccessExpression, typeChecker: TypeChecker, target: ScriptTarget, log: Log): CompletionInfo | undefined {
        const type = typeChecker.getTypeAtLocation(node.expression);
        const entries: CompletionEntry[] = [];
        if (type) {
            getCompletionEntriesFromSymbols(type.getApparentProperties(), entries, node, /*performCharacterChecks*/ false, typeChecker, target, log);
            if (entries.length) {
                return { isGlobalCompletion: false, isMemberCompletion: true, isNewIdentifierLocation: true, entries };
            }
        }
        return undefined;
    }

    function getStringLiteralCompletionEntriesFromType(type: Type, typeChecker: TypeChecker): CompletionInfo | undefined {
        if (type) {
            const entries: CompletionEntry[] = [];
            addStringLiteralCompletionsFromType(type, entries, typeChecker);
            if (entries.length) {
                return { isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, entries };
            }
        }
        return undefined;
    }

    function addStringLiteralCompletionsFromType(type: Type, result: Push<CompletionEntry>, typeChecker: TypeChecker, uniques = createMap<true>()): void {
        if (type && type.flags & TypeFlags.TypeParameter) {
            type = typeChecker.getBaseConstraintOfType(type);
        }
        if (!type) {
            return;
        }
        if (type.flags & TypeFlags.Union) {
            for (const t of (<UnionType>type).types) {
                addStringLiteralCompletionsFromType(t, result, typeChecker, uniques);
            }
        }
        else if (type.flags & TypeFlags.StringLiteral) {
            const name = (<StringLiteralType>type).value;
            if (!uniques.has(name)) {
                uniques.set(name, true);
                result.push({
                    name,
                    kindModifiers: ScriptElementKindModifier.none,
                    kind: ScriptElementKind.variableElement,
                    sortText: "0"
                });
            }
        }
    }

    export function getCompletionEntryDetails(typeChecker: TypeChecker, log: (message: string) => void, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number, entryName: string): CompletionEntryDetails {
        // Compute all the completion symbols again.
        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (completionData) {
            const { symbols, location } = completionData;

            // Find the symbol with the matching entry name.
            // We don't need to perform character checks here because we're only comparing the
            // name against 'entryName' (which is known to be good), not building a new
            // completion entry.
            const symbol = forEach(symbols, s => getCompletionEntryDisplayNameForSymbol(typeChecker, s, compilerOptions.target, /*performCharacterChecks*/ false, location) === entryName ? s : undefined);

            if (symbol) {
                const { displayParts, documentation, symbolKind, tags } = SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, location, location, SemanticMeaning.All);
                return {
                    name: entryName,
                    kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
                    kind: symbolKind,
                    displayParts,
                    documentation,
                    tags
                };
            }
        }

        // Didn't find a symbol with this name.  See if we can find a keyword instead.
        const keywordCompletion = forEach(keywordCompletions, c => c.name === entryName);
        if (keywordCompletion) {
            return {
                name: entryName,
                kind: ScriptElementKind.keyword,
                kindModifiers: ScriptElementKindModifier.none,
                displayParts: [displayPart(entryName, SymbolDisplayPartKind.keyword)],
                documentation: undefined,
                tags: undefined
            };
        }

        return undefined;
    }

    export function getCompletionEntrySymbol(typeChecker: TypeChecker, log: (message: string) => void, compilerOptions: CompilerOptions, sourceFile: SourceFile, position: number, entryName: string): Symbol {
        // Compute all the completion symbols again.
        const completionData = getCompletionData(typeChecker, log, sourceFile, position);
        if (completionData) {
            const { symbols, location } = completionData;

            // Find the symbol with the matching entry name.
            // We don't need to perform character checks here because we're only comparing the
            // name against 'entryName' (which is known to be good), not building a new
            // completion entry.
            return forEach(symbols, s => getCompletionEntryDisplayNameForSymbol(typeChecker, s, compilerOptions.target, /*performCharacterChecks*/ false, location) === entryName ? s : undefined);
        }

        return undefined;
    }

    interface CompletionData {
        symbols: Symbol[];
        isGlobalCompletion: boolean;
        isMemberCompletion: boolean;
        isNewIdentifierLocation: boolean;
        location: Node;
        isRightOfDot: boolean;
        request?: Request;
        hasFilteredClassMemberKeywords: boolean;
    }
    type Request = { kind: "JsDocTagName" } | { kind: "JsDocTag" } | { kind: "JsDocParameterName", tag: JSDocParameterTag };

    function getCompletionData(typeChecker: TypeChecker, log: (message: string) => void, sourceFile: SourceFile, position: number): CompletionData {
        const isJavaScriptFile = isSourceFileJavaScript(sourceFile);

        let request: Request | undefined;

        let start = timestamp();
        const currentToken = getTokenAtPosition(sourceFile, position, /*includeJsDocComment*/ false);
        // We will check for jsdoc comments with insideComment and getJsDocTagAtPosition. (TODO: that seems rather inefficient to check the same thing so many times.)

        log("getCompletionData: Get current token: " + (timestamp() - start));

        start = timestamp();
        // Completion not allowed inside comments, bail out if this is the case
        const insideComment = isInComment(sourceFile, position, currentToken);
        log("getCompletionData: Is inside comment: " + (timestamp() - start));

        if (insideComment) {
            if (hasDocComment(sourceFile, position)) {
                if (sourceFile.text.charCodeAt(position - 1) === CharacterCodes.at) {
                    // The current position is next to the '@' sign, when no tag name being provided yet.
                    // Provide a full list of tag names
                    request = { kind: "JsDocTagName" };
                }
                else {
                    // When completion is requested without "@", we will have check to make sure that
                    // there are no comments prefix the request position. We will only allow "*" and space.
                    // e.g
                    //   /** |c| /*
                    //
                    //   /**
                    //     |c|
                    //    */
                    //
                    //   /**
                    //    * |c|
                    //    */
                    //
                    //   /**
                    //    *         |c|
                    //    */
                    const lineStart = getLineStartPositionForPosition(position, sourceFile);
                    if (!(sourceFile.text.substring(lineStart, position).match(/[^\*|\s|(/\*\*)]/))) {
                        request = { kind: "JsDocTag" };
                    }
                }
            }

            // Completion should work inside certain JsDoc tags. For example:
            //     /** @type {number | string} */
            // Completion should work in the brackets
            let insideJsDocTagExpression = false;
            const tag = getJsDocTagAtPosition(currentToken, position);
            if (tag) {
                if (tag.tagName.pos <= position && position <= tag.tagName.end) {
                    request = { kind: "JsDocTagName" };
                }

                switch (tag.kind) {
                    case SyntaxKind.JSDocTypeTag:
                    case SyntaxKind.JSDocParameterTag:
                    case SyntaxKind.JSDocReturnTag:
                        const tagWithExpression = <JSDocTypeTag | JSDocParameterTag | JSDocReturnTag>tag;
                        if (tagWithExpression.typeExpression && tagWithExpression.typeExpression.pos < position && position < tagWithExpression.typeExpression.end) {
                            insideJsDocTagExpression = true;
                        }
                        else if (isJSDocParameterTag(tag) && (nodeIsMissing(tag.name) || tag.name.pos <= position && position <= tag.name.end)) {
                            request = { kind: "JsDocParameterName", tag };
                        }
                        break;
                }
            }

            if (request) {
                return { symbols: undefined, isGlobalCompletion: false, isMemberCompletion: false, isNewIdentifierLocation: false, location: undefined, isRightOfDot: false, request, hasFilteredClassMemberKeywords: false };
            }

            if (!insideJsDocTagExpression) {
                // Proceed if the current position is in jsDoc tag expression; otherwise it is a normal
                // comment or the plain text part of a jsDoc comment, so no completion should be available
                log("Returning an empty list because completion was inside a regular comment or plain text part of a JsDoc comment.");
                return undefined;
            }
        }

        start = timestamp();
        const previousToken = findPrecedingToken(position, sourceFile, /*startNode*/ undefined, /*includeJsDoc*/ true);
        log("getCompletionData: Get previous token 1: " + (timestamp() - start));

        // The decision to provide completion depends on the contextToken, which is determined through the previousToken.
        // Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
        let contextToken = previousToken;

        // Check if the caret is at the end of an identifier; this is a partial identifier that we want to complete: e.g. a.toS|
        // Skip this partial identifier and adjust the contextToken to the token that precedes it.
        if (contextToken && position <= contextToken.end && isWord(contextToken.kind)) {
            const start = timestamp();
            contextToken = findPrecedingToken(contextToken.getFullStart(), sourceFile, /*startNode*/ undefined, /*includeJsDoc*/ true);
            log("getCompletionData: Get previous token 2: " + (timestamp() - start));
        }

        // Find the node where completion is requested on.
        // Also determine whether we are trying to complete with members of that node
        // or attributes of a JSX tag.
        let node = currentToken;
        let isRightOfDot = false;
        let isRightOfOpenTag = false;
        let isStartingCloseTag = false;

        let location = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ false); // TODO: GH#15853
        if (contextToken) {
            // Bail out if this is a known invalid completion location
            if (isCompletionListBlocker(contextToken)) {
                log("Returning an empty list because completion was requested in an invalid position.");
                return undefined;
            }

            let parent = contextToken.parent;
            if (contextToken.kind === SyntaxKind.DotToken) {
                if (parent.kind === SyntaxKind.PropertyAccessExpression) {
                    node = (<PropertyAccessExpression>contextToken.parent).expression;
                    isRightOfDot = true;
                }
                else if (parent.kind === SyntaxKind.QualifiedName) {
                    node = (<QualifiedName>contextToken.parent).left;
                    isRightOfDot = true;
                }
                else {
                    // There is nothing that precedes the dot, so this likely just a stray character
                    // or leading into a '...' token. Just bail out instead.
                    return undefined;
                }
            }
            else if (sourceFile.languageVariant === LanguageVariant.JSX) {
                // <UI.Test /* completion position */ />
                // If the tagname is a property access expression, we will then walk up to the top most of property access expression.
                // Then, try to get a JSX container and its associated attributes type.
                if (parent && parent.kind === SyntaxKind.PropertyAccessExpression) {
                    contextToken = parent;
                    parent = parent.parent;
                }

                switch (parent.kind) {
                    case SyntaxKind.JsxClosingElement:
                        if (contextToken.kind === SyntaxKind.SlashToken) {
                            isStartingCloseTag = true;
                            location = contextToken;
                        }
                        break;

                    case SyntaxKind.BinaryExpression:
                        if (!((parent as BinaryExpression).left.flags & NodeFlags.ThisNodeHasError)) {
                            // It has a left-hand side, so we're not in an opening JSX tag.
                            break;
                        }
                    // falls through

                    case SyntaxKind.JsxSelfClosingElement:
                    case SyntaxKind.JsxElement:
                    case SyntaxKind.JsxOpeningElement:
                        if (contextToken.kind === SyntaxKind.LessThanToken) {
                            isRightOfOpenTag = true;
                            location = contextToken;
                        }
                        break;
                }
            }
        }

        const semanticStart = timestamp();
        let isGlobalCompletion = false;
        let isMemberCompletion: boolean;
        let isNewIdentifierLocation: boolean;
        let hasFilteredClassMemberKeywords = false;
        let symbols: Symbol[] = [];

        if (isRightOfDot) {
            getTypeScriptMemberSymbols();
        }
        else if (isRightOfOpenTag) {
            const tagSymbols = typeChecker.getJsxIntrinsicTagNames();
            if (tryGetGlobalSymbols()) {
                symbols = tagSymbols.concat(symbols.filter(s => !!(s.flags & (SymbolFlags.Value | SymbolFlags.Alias))));
            }
            else {
                symbols = tagSymbols;
            }
            isMemberCompletion = true;
            isNewIdentifierLocation = false;
        }
        else if (isStartingCloseTag) {
            const tagName = (<JsxElement>contextToken.parent.parent).openingElement.tagName;
            const tagSymbol = typeChecker.getSymbolAtLocation(tagName);

            if (!typeChecker.isUnknownSymbol(tagSymbol)) {
                symbols = [tagSymbol];
            }
            isMemberCompletion = true;
            isNewIdentifierLocation = false;
        }
        else {
            // For JavaScript or TypeScript, if we're not after a dot, then just try to get the
            // global symbols in scope.  These results should be valid for either language as
            // the set of symbols that can be referenced from this location.
            if (!tryGetGlobalSymbols()) {
                return undefined;
            }
        }

        log("getCompletionData: Semantic work: " + (timestamp() - semanticStart));

        return { symbols, isGlobalCompletion, isMemberCompletion, isNewIdentifierLocation, location, isRightOfDot: (isRightOfDot || isRightOfOpenTag), request, hasFilteredClassMemberKeywords };

        function getTypeScriptMemberSymbols(): void {
            // Right of dot member completion list
            isGlobalCompletion = false;
            isMemberCompletion = true;
            isNewIdentifierLocation = false;

            if (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression) {
                let symbol = typeChecker.getSymbolAtLocation(node);

                // This is an alias, follow what it aliases
                if (symbol && symbol.flags & SymbolFlags.Alias) {
                    symbol = typeChecker.getAliasedSymbol(symbol);
                }

                if (symbol && symbol.flags & SymbolFlags.HasExports) {
                    // Extract module or enum members
                    const exportedSymbols = typeChecker.getExportsOfModule(symbol);
                    forEach(exportedSymbols, symbol => {
                        if (typeChecker.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
                            symbols.push(symbol);
                        }
                    });
                }
            }

            const type = typeChecker.getTypeAtLocation(node);
            addTypeProperties(type);
        }

        function addTypeProperties(type: Type) {
            if (type) {
                // Filter private properties
                for (const symbol of type.getApparentProperties()) {
                    if (typeChecker.isValidPropertyAccess(<PropertyAccessExpression>(node.parent), symbol.name)) {
                        symbols.push(symbol);
                    }
                }

                if (isJavaScriptFile && type.flags & TypeFlags.Union) {
                    // In javascript files, for union types, we don't just get the members that
                    // the individual types have in common, we also include all the members that
                    // each individual type has.  This is because we're going to add all identifiers
                    // anyways.  So we might as well elevate the members that were at least part
                    // of the individual types to a higher status since we know what they are.
                    const unionType = <UnionType>type;
                    for (const elementType of unionType.types) {
                        addTypeProperties(elementType);
                    }
                }
            }
        }

        function tryGetGlobalSymbols(): boolean {
            let objectLikeContainer: ObjectLiteralExpression | BindingPattern;
            let namedImportsOrExports: NamedImportsOrExports;
            let classLikeContainer: ClassLikeDeclaration;
            let jsxContainer: JsxOpeningLikeElement;

            if (objectLikeContainer = tryGetObjectLikeCompletionContainer(contextToken)) {
                return tryGetObjectLikeCompletionSymbols(objectLikeContainer);
            }

            if (namedImportsOrExports = tryGetNamedImportsOrExportsForCompletion(contextToken)) {
                // cursor is in an import clause
                // try to show exported member for imported module
                return tryGetImportOrExportClauseCompletionSymbols(namedImportsOrExports);
            }

            if (classLikeContainer = tryGetClassLikeCompletionContainer(contextToken)) {
                // cursor inside class declaration
                getGetClassLikeCompletionSymbols(classLikeContainer);
                return true;
            }

            if (jsxContainer = tryGetContainingJsxElement(contextToken)) {
                let attrsType: Type;
                if ((jsxContainer.kind === SyntaxKind.JsxSelfClosingElement) || (jsxContainer.kind === SyntaxKind.JsxOpeningElement)) {
                    // Cursor is inside a JSX self-closing element or opening element
                    attrsType = typeChecker.getAllAttributesTypeFromJsxOpeningLikeElement(<JsxOpeningLikeElement>jsxContainer);

                    if (attrsType) {
                        symbols = filterJsxAttributes(typeChecker.getPropertiesOfType(attrsType), (<JsxOpeningLikeElement>jsxContainer).attributes.properties);
                        isMemberCompletion = true;
                        isNewIdentifierLocation = false;
                        return true;
                    }
                }
            }

            // Get all entities in the current scope.
            isMemberCompletion = false;
            isNewIdentifierLocation = isNewIdentifierDefinitionLocation(contextToken);

            if (previousToken !== contextToken) {
                Debug.assert(!!previousToken, "Expected 'contextToken' to be defined when different from 'previousToken'.");
            }
            // We need to find the node that will give us an appropriate scope to begin
            // aggregating completion candidates. This is achieved in 'getScopeNode'
            // by finding the first node that encompasses a position, accounting for whether a node
            // is "complete" to decide whether a position belongs to the node.
            //
            // However, at the end of an identifier, we are interested in the scope of the identifier
            // itself, but fall outside of the identifier. For instance:
            //
            //      xyz => x$
            //
            // the cursor is outside of both the 'x' and the arrow function 'xyz => x',
            // so 'xyz' is not returned in our results.
            //
            // We define 'adjustedPosition' so that we may appropriately account for
            // being at the end of an identifier. The intention is that if requesting completion
            // at the end of an identifier, it should be effectively equivalent to requesting completion
            // anywhere inside/at the beginning of the identifier. So in the previous case, the
            // 'adjustedPosition' will work as if requesting completion in the following:
            //
            //      xyz => $x
            //
            // If previousToken !== contextToken, then
            //   - 'contextToken' was adjusted to the token prior to 'previousToken'
            //      because we were at the end of an identifier.
            //   - 'previousToken' is defined.
            const adjustedPosition = previousToken !== contextToken ?
                previousToken.getStart() :
                position;

            const scopeNode = getScopeNode(contextToken, adjustedPosition, sourceFile) || sourceFile;
            if (scopeNode) {
                isGlobalCompletion =
                    scopeNode.kind === SyntaxKind.SourceFile ||
                    scopeNode.kind === SyntaxKind.TemplateExpression ||
                    scopeNode.kind === SyntaxKind.JsxExpression ||
                    isStatement(scopeNode);
            }

            /// TODO filter meaning based on the current context
            const symbolMeanings = SymbolFlags.Type | SymbolFlags.Value | SymbolFlags.Namespace | SymbolFlags.Alias;
            symbols = typeChecker.getSymbolsInScope(scopeNode, symbolMeanings);

            return true;
        }

        /**
         * Finds the first node that "embraces" the position, so that one may
         * accurately aggregate locals from the closest containing scope.
         */
        function getScopeNode(initialToken: Node, position: number, sourceFile: SourceFile) {
            let scope = initialToken;
            while (scope && !positionBelongsToNode(scope, position, sourceFile)) {
                scope = scope.parent;
            }
            return scope;
        }

        function isCompletionListBlocker(contextToken: Node): boolean {
            const start = timestamp();
            const result = isInStringOrRegularExpressionOrTemplateLiteral(contextToken) ||
                isSolelyIdentifierDefinitionLocation(contextToken) ||
                isDotOfNumericLiteral(contextToken) ||
                isInJsxText(contextToken);
            log("getCompletionsAtPosition: isCompletionListBlocker: " + (timestamp() - start));
            return result;
        }

        function isInJsxText(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.JsxText) {
                return true;
            }

            if (contextToken.kind === SyntaxKind.GreaterThanToken && contextToken.parent) {
                if (contextToken.parent.kind === SyntaxKind.JsxOpeningElement) {
                    return true;
                }

                if (contextToken.parent.kind === SyntaxKind.JsxClosingElement || contextToken.parent.kind === SyntaxKind.JsxSelfClosingElement) {
                    return contextToken.parent.parent && contextToken.parent.parent.kind === SyntaxKind.JsxElement;
                }
            }
            return false;
        }

        function isNewIdentifierDefinitionLocation(previousToken: Node): boolean {
            if (previousToken) {
                const containingNodeKind = previousToken.parent.kind;
                switch (previousToken.kind) {
                    case SyntaxKind.CommaToken:
                        return containingNodeKind === SyntaxKind.CallExpression               // func( a, |
                            || containingNodeKind === SyntaxKind.Constructor                  // constructor( a, |   /* public, protected, private keywords are allowed here, so show completion */
                            || containingNodeKind === SyntaxKind.NewExpression                // new C(a, |
                            || containingNodeKind === SyntaxKind.ArrayLiteralExpression       // [a, |
                            || containingNodeKind === SyntaxKind.BinaryExpression             // const x = (a, |
                            || containingNodeKind === SyntaxKind.FunctionType;                // var x: (s: string, list|

                    case SyntaxKind.OpenParenToken:
                        return containingNodeKind === SyntaxKind.CallExpression               // func( |
                            || containingNodeKind === SyntaxKind.Constructor                  // constructor( |
                            || containingNodeKind === SyntaxKind.NewExpression                // new C(a|
                            || containingNodeKind === SyntaxKind.ParenthesizedExpression      // const x = (a|
                            || containingNodeKind === SyntaxKind.ParenthesizedType;           // function F(pred: (a| /* this can become an arrow function, where 'a' is the argument */

                    case SyntaxKind.OpenBracketToken:
                        return containingNodeKind === SyntaxKind.ArrayLiteralExpression       // [ |
                            || containingNodeKind === SyntaxKind.IndexSignature               // [ | : string ]
                            || containingNodeKind === SyntaxKind.ComputedPropertyName;         // [ |    /* this can become an index signature */

                    case SyntaxKind.ModuleKeyword:                                            // module |
                    case SyntaxKind.NamespaceKeyword:                                         // namespace |
                        return true;

                    case SyntaxKind.DotToken:
                        return containingNodeKind === SyntaxKind.ModuleDeclaration;           // module A.|

                    case SyntaxKind.OpenBraceToken:
                        return containingNodeKind === SyntaxKind.ClassDeclaration;            // class A{ |

                    case SyntaxKind.EqualsToken:
                        return containingNodeKind === SyntaxKind.VariableDeclaration          // const x = a|
                            || containingNodeKind === SyntaxKind.BinaryExpression;            // x = a|

                    case SyntaxKind.TemplateHead:
                        return containingNodeKind === SyntaxKind.TemplateExpression;          // `aa ${|

                    case SyntaxKind.TemplateMiddle:
                        return containingNodeKind === SyntaxKind.TemplateSpan;                // `aa ${10} dd ${|

                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.PrivateKeyword:
                    case SyntaxKind.ProtectedKeyword:
                        return containingNodeKind === SyntaxKind.PropertyDeclaration;         // class A{ public |
                }

                // Previous token may have been a keyword that was converted to an identifier.
                switch (previousToken.getText()) {
                    case "public":
                    case "protected":
                    case "private":
                        return true;
                }
            }

            return false;
        }

        function isInStringOrRegularExpressionOrTemplateLiteral(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.StringLiteral
                || contextToken.kind === SyntaxKind.RegularExpressionLiteral
                || isTemplateLiteralKind(contextToken.kind)) {
                const start = contextToken.getStart();
                const end = contextToken.getEnd();

                // To be "in" one of these literals, the position has to be:
                //   1. entirely within the token text.
                //   2. at the end position of an unterminated token.
                //   3. at the end of a regular expression (due to trailing flags like '/foo/g').
                if (start < position && position < end) {
                    return true;
                }

                if (position === end) {
                    return !!(<LiteralExpression>contextToken).isUnterminated
                        || contextToken.kind === SyntaxKind.RegularExpressionLiteral;
                }
            }

            return false;
        }

        /**
         * Aggregates relevant symbols for completion in object literals and object binding patterns.
         * Relevant symbols are stored in the captured 'symbols' variable.
         *
         * @returns true if 'symbols' was successfully populated; false otherwise.
         */
        function tryGetObjectLikeCompletionSymbols(objectLikeContainer: ObjectLiteralExpression | ObjectBindingPattern): boolean {
            // We're looking up possible property names from contextual/inferred/declared type.
            isMemberCompletion = true;

            let typeMembers: Symbol[];
            let existingMembers: Declaration[];

            if (objectLikeContainer.kind === SyntaxKind.ObjectLiteralExpression) {
                // We are completing on contextual types, but may also include properties
                // other than those within the declared type.
                isNewIdentifierLocation = true;
                const typeForObject = typeChecker.getContextualType(<ObjectLiteralExpression>objectLikeContainer);
                if (!typeForObject) return false;
                typeMembers = typeChecker.getAllPossiblePropertiesOfType(typeForObject);
                existingMembers = (<ObjectLiteralExpression>objectLikeContainer).properties;
            }
            else {
                Debug.assert(objectLikeContainer.kind === SyntaxKind.ObjectBindingPattern);
                // We are *only* completing on properties from the type being destructured.
                isNewIdentifierLocation = false;

                const rootDeclaration = getRootDeclaration(objectLikeContainer.parent);
                if (!isVariableLike(rootDeclaration)) throw Debug.fail("Root declaration is not variable-like.");

                // We don't want to complete using the type acquired by the shape
                // of the binding pattern; we are only interested in types acquired
                // through type declaration or inference.
                // Also proceed if rootDeclaration is a parameter and if its containing function expression/arrow function is contextually typed -
                // type of parameter will flow in from the contextual type of the function
                let canGetType = rootDeclaration.initializer || rootDeclaration.type || rootDeclaration.parent.parent.kind === SyntaxKind.ForOfStatement;
                if (!canGetType && rootDeclaration.kind === SyntaxKind.Parameter) {
                    if (isExpression(rootDeclaration.parent)) {
                        canGetType = !!typeChecker.getContextualType(<Expression>rootDeclaration.parent);
                    }
                    else if (rootDeclaration.parent.kind === SyntaxKind.MethodDeclaration || rootDeclaration.parent.kind === SyntaxKind.SetAccessor) {
                        canGetType = isExpression(rootDeclaration.parent.parent) && !!typeChecker.getContextualType(<Expression>rootDeclaration.parent.parent);
                    }
                }
                if (canGetType) {
                    const typeForObject = typeChecker.getTypeAtLocation(objectLikeContainer);
                    if (!typeForObject) return false;
                    // In a binding pattern, get only known properties. Everywhere else we will get all possible properties.
                    typeMembers = typeChecker.getPropertiesOfType(typeForObject);
                    existingMembers = (<ObjectBindingPattern>objectLikeContainer).elements;
                }
            }

            if (typeMembers && typeMembers.length > 0) {
                // Add filtered items to the completion list
                symbols = filterObjectMembersList(typeMembers, existingMembers);
            }
            return true;
        }

        /**
         * Aggregates relevant symbols for completion in import clauses and export clauses
         * whose declarations have a module specifier; for instance, symbols will be aggregated for
         *
         *      import { | } from "moduleName";
         *      export { a as foo, | } from "moduleName";
         *
         * but not for
         *
         *      export { | };
         *
         * Relevant symbols are stored in the captured 'symbols' variable.
         *
         * @returns true if 'symbols' was successfully populated; false otherwise.
         */
        function tryGetImportOrExportClauseCompletionSymbols(namedImportsOrExports: NamedImportsOrExports): boolean {
            const declarationKind = namedImportsOrExports.kind === SyntaxKind.NamedImports ?
                SyntaxKind.ImportDeclaration :
                SyntaxKind.ExportDeclaration;
            const importOrExportDeclaration = <ImportDeclaration | ExportDeclaration>getAncestor(namedImportsOrExports, declarationKind);
            const moduleSpecifier = importOrExportDeclaration.moduleSpecifier;

            if (!moduleSpecifier) {
                return false;
            }

            isMemberCompletion = true;
            isNewIdentifierLocation = false;

            const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
            if (!moduleSpecifierSymbol) {
                symbols = emptyArray;
                return true;
            }

            const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
            symbols = filterNamedImportOrExportCompletionItems(exports, namedImportsOrExports.elements);
            return true;
        }

        /**
         * Aggregates relevant symbols for completion in class declaration
         * Relevant symbols are stored in the captured 'symbols' variable.
         */
        function getGetClassLikeCompletionSymbols(classLikeDeclaration: ClassLikeDeclaration) {
            // We're looking up possible property names from parent type.
            isMemberCompletion = true;
            // Declaring new property/method/accessor
            isNewIdentifierLocation = true;
            // Has keywords for class elements
            hasFilteredClassMemberKeywords = true;

            const baseTypeNode = getClassExtendsHeritageClauseElement(classLikeDeclaration);
            const implementsTypeNodes = getClassImplementsHeritageClauseElements(classLikeDeclaration);
            if (baseTypeNode || implementsTypeNodes) {
                const classElement = contextToken.parent;
                let classElementModifierFlags = isClassElement(classElement) && getModifierFlags(classElement);
                // If this is context token is not something we are editing now, consider if this would lead to be modifier
                if (contextToken.kind === SyntaxKind.Identifier && !isCurrentlyEditingNode(contextToken)) {
                    switch (contextToken.getText()) {
                        case "private":
                            classElementModifierFlags = classElementModifierFlags | ModifierFlags.Private;
                            break;
                        case "static":
                            classElementModifierFlags = classElementModifierFlags | ModifierFlags.Static;
                            break;
                    }
                }

                // No member list for private methods
                if (!(classElementModifierFlags & ModifierFlags.Private)) {
                    let baseClassTypeToGetPropertiesFrom: Type;
                    if (baseTypeNode) {
                        baseClassTypeToGetPropertiesFrom = typeChecker.getTypeAtLocation(baseTypeNode);
                        if (classElementModifierFlags & ModifierFlags.Static) {
                            // Use static class to get property symbols from
                            baseClassTypeToGetPropertiesFrom = typeChecker.getTypeOfSymbolAtLocation(
                                baseClassTypeToGetPropertiesFrom.symbol, classLikeDeclaration);
                        }
                    }
                    const implementedInterfaceTypePropertySymbols = (classElementModifierFlags & ModifierFlags.Static) ?
                        undefined :
                        flatMap(implementsTypeNodes, typeNode => typeChecker.getPropertiesOfType(typeChecker.getTypeAtLocation(typeNode)));

                    // List of property symbols of base type that are not private and already implemented
                    symbols = filterClassMembersList(
                        baseClassTypeToGetPropertiesFrom ?
                            typeChecker.getPropertiesOfType(baseClassTypeToGetPropertiesFrom) :
                            undefined,
                        implementedInterfaceTypePropertySymbols,
                        classLikeDeclaration.members,
                        classElementModifierFlags);
                }
            }
        }

        /**
         * Returns the immediate owning object literal or binding pattern of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetObjectLikeCompletionContainer(contextToken: Node): ObjectLiteralExpression | ObjectBindingPattern {
            if (contextToken) {
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // const x = { |
                    case SyntaxKind.CommaToken:      // const x = { a: 0, |
                        const parent = contextToken.parent;
                        if (isObjectLiteralExpression(parent) || isObjectBindingPattern(parent)) {
                            return parent;
                        }
                        break;
                }
            }

            return undefined;
        }

        /**
         * Returns the containing list of named imports or exports of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetNamedImportsOrExportsForCompletion(contextToken: Node): NamedImportsOrExports {
            if (contextToken) {
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // import { |
                    case SyntaxKind.CommaToken:      // import { a as 0, |
                        switch (contextToken.parent.kind) {
                            case SyntaxKind.NamedImports:
                            case SyntaxKind.NamedExports:
                                return <NamedImportsOrExports>contextToken.parent;
                        }
                }
            }

            return undefined;
        }

        function isFromClassElementDeclaration(node: Node) {
            return isClassElement(node.parent) && isClassLike(node.parent.parent);
        }

        /**
         * Returns the immediate owning class declaration of a context token,
         * on the condition that one exists and that the context implies completion should be given.
         */
        function tryGetClassLikeCompletionContainer(contextToken: Node): ClassLikeDeclaration {
            if (contextToken) {
                switch (contextToken.kind) {
                    case SyntaxKind.OpenBraceToken:  // class c { |
                        if (isClassLike(contextToken.parent)) {
                            return contextToken.parent;
                        }
                        break;

                    // class c {getValue(): number; | }
                    case SyntaxKind.CommaToken:
                    case SyntaxKind.SemicolonToken:
                    // class c { method() { } | }
                    case SyntaxKind.CloseBraceToken:
                        if (isClassLike(location)) {
                            return location;
                        }
                        break;

                    default:
                        if (isFromClassElementDeclaration(contextToken) &&
                            (isClassMemberCompletionKeyword(contextToken.kind) ||
                                isClassMemberCompletionKeywordText(contextToken.getText()))) {
                            return contextToken.parent.parent as ClassLikeDeclaration;
                        }
                }
            }

            // class c { method() { } | method2() { } }
            if (location && location.kind === SyntaxKind.SyntaxList && isClassLike(location.parent)) {
                return location.parent;
            }
            return undefined;
        }

        function tryGetContainingJsxElement(contextToken: Node): JsxOpeningLikeElement {
            if (contextToken) {
                const parent = contextToken.parent;
                switch (contextToken.kind) {
                    case SyntaxKind.LessThanSlashToken:
                    case SyntaxKind.SlashToken:
                    case SyntaxKind.Identifier:
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.JsxAttributes:
                    case SyntaxKind.JsxAttribute:
                    case SyntaxKind.JsxSpreadAttribute:
                        if (parent && (parent.kind === SyntaxKind.JsxSelfClosingElement || parent.kind === SyntaxKind.JsxOpeningElement)) {
                            return <JsxOpeningLikeElement>parent;
                        }
                        else if (parent.kind === SyntaxKind.JsxAttribute) {
                            // Currently we parse JsxOpeningLikeElement as:
                            //      JsxOpeningLikeElement
                            //          attributes: JsxAttributes
                            //             properties: NodeArray<JsxAttributeLike>
                            return parent.parent.parent as JsxOpeningLikeElement;
                        }
                        break;

                    // The context token is the closing } or " of an attribute, which means
                    // its parent is a JsxExpression, whose parent is a JsxAttribute,
                    // whose parent is a JsxOpeningLikeElement
                    case SyntaxKind.StringLiteral:
                        if (parent && ((parent.kind === SyntaxKind.JsxAttribute) || (parent.kind === SyntaxKind.JsxSpreadAttribute))) {
                            // Currently we parse JsxOpeningLikeElement as:
                            //      JsxOpeningLikeElement
                            //          attributes: JsxAttributes
                            //             properties: NodeArray<JsxAttributeLike>
                            return parent.parent.parent as JsxOpeningLikeElement;
                        }

                        break;

                    case SyntaxKind.CloseBraceToken:
                        if (parent &&
                            parent.kind === SyntaxKind.JsxExpression &&
                            parent.parent && parent.parent.kind === SyntaxKind.JsxAttribute) {
                            // Currently we parse JsxOpeningLikeElement as:
                            //      JsxOpeningLikeElement
                            //          attributes: JsxAttributes
                            //             properties: NodeArray<JsxAttributeLike>
                            //                  each JsxAttribute can have initializer as JsxExpression
                            return parent.parent.parent.parent as JsxOpeningLikeElement;
                        }

                        if (parent && parent.kind === SyntaxKind.JsxSpreadAttribute) {
                            // Currently we parse JsxOpeningLikeElement as:
                            //      JsxOpeningLikeElement
                            //          attributes: JsxAttributes
                            //             properties: NodeArray<JsxAttributeLike>
                            return parent.parent.parent as JsxOpeningLikeElement;
                        }

                        break;
                }
            }
            return undefined;
        }

        function isFunction(kind: SyntaxKind): boolean {
            if (!isFunctionLikeKind(kind)) {
                return false;
            }

            switch (kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.FunctionType:
                    return false;
                default:
                    return true;
            }
        }

        /**
         * @returns true if we are certain that the currently edited location must define a new location; false otherwise.
         */
        function isSolelyIdentifierDefinitionLocation(contextToken: Node): boolean {
            const containingNodeKind = contextToken.parent.kind;
            switch (contextToken.kind) {
                case SyntaxKind.CommaToken:
                    return containingNodeKind === SyntaxKind.VariableDeclaration ||
                        containingNodeKind === SyntaxKind.VariableDeclarationList ||
                        containingNodeKind === SyntaxKind.VariableStatement ||
                        containingNodeKind === SyntaxKind.EnumDeclaration ||                        // enum a { foo, |
                        isFunction(containingNodeKind) ||
                        containingNodeKind === SyntaxKind.ClassDeclaration ||                       // class A<T, |
                        containingNodeKind === SyntaxKind.ClassExpression ||                        // var C = class D<T, |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A<T, |
                        containingNodeKind === SyntaxKind.ArrayBindingPattern ||                    // var [x, y|
                        containingNodeKind === SyntaxKind.TypeAliasDeclaration;                     // type Map, K, |

                case SyntaxKind.DotToken:
                    return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [.|

                case SyntaxKind.ColonToken:
                    return containingNodeKind === SyntaxKind.BindingElement;                        // var {x :html|

                case SyntaxKind.OpenBracketToken:
                    return containingNodeKind === SyntaxKind.ArrayBindingPattern;                   // var [x|

                case SyntaxKind.OpenParenToken:
                    return containingNodeKind === SyntaxKind.CatchClause ||
                        isFunction(containingNodeKind);

                case SyntaxKind.OpenBraceToken:
                    return containingNodeKind === SyntaxKind.EnumDeclaration ||                     // enum a { |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface a { |
                        containingNodeKind === SyntaxKind.TypeLiteral;                              // const x : { |

                case SyntaxKind.SemicolonToken:
                    return containingNodeKind === SyntaxKind.PropertySignature &&
                        contextToken.parent && contextToken.parent.parent &&
                        (contextToken.parent.parent.kind === SyntaxKind.InterfaceDeclaration ||    // interface a { f; |
                            contextToken.parent.parent.kind === SyntaxKind.TypeLiteral);           // const x : { a; |

                case SyntaxKind.LessThanToken:
                    return containingNodeKind === SyntaxKind.ClassDeclaration ||                    // class A< |
                        containingNodeKind === SyntaxKind.ClassExpression ||                        // var C = class D< |
                        containingNodeKind === SyntaxKind.InterfaceDeclaration ||                   // interface A< |
                        containingNodeKind === SyntaxKind.TypeAliasDeclaration ||                   // type List< |
                        isFunction(containingNodeKind);

                case SyntaxKind.StaticKeyword:
                    return containingNodeKind === SyntaxKind.PropertyDeclaration && !isClassLike(contextToken.parent.parent);

                case SyntaxKind.DotDotDotToken:
                    return containingNodeKind === SyntaxKind.Parameter ||
                        (contextToken.parent && contextToken.parent.parent &&
                            contextToken.parent.parent.kind === SyntaxKind.ArrayBindingPattern);  // var [...z|

                case SyntaxKind.PublicKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                    return containingNodeKind === SyntaxKind.Parameter;

                case SyntaxKind.AsKeyword:
                    return containingNodeKind === SyntaxKind.ImportSpecifier ||
                        containingNodeKind === SyntaxKind.ExportSpecifier ||
                        containingNodeKind === SyntaxKind.NamespaceImport;

                case SyntaxKind.GetKeyword:
                case SyntaxKind.SetKeyword:
                    if (isFromClassElementDeclaration(contextToken)) {
                        return false;
                    }
                // falls through
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.VarKeyword:
                case SyntaxKind.ImportKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.YieldKeyword:
                case SyntaxKind.TypeKeyword:  // type htm|
                    return true;
            }

            // If the previous token is keyword correspoding to class member completion keyword
            // there will be completion available here
            if (isClassMemberCompletionKeywordText(contextToken.getText()) &&
                isFromClassElementDeclaration(contextToken)) {
                return false;
            }

            // Previous token may have been a keyword that was converted to an identifier.
            switch (contextToken.getText()) {
                case "abstract":
                case "async":
                case "class":
                case "const":
                case "declare":
                case "enum":
                case "function":
                case "interface":
                case "let":
                case "private":
                case "protected":
                case "public":
                case "static":
                case "var":
                case "yield":
                    return true;
            }

            return false;
        }

        function isDotOfNumericLiteral(contextToken: Node): boolean {
            if (contextToken.kind === SyntaxKind.NumericLiteral) {
                const text = contextToken.getFullText();
                return text.charAt(text.length - 1) === ".";
            }

            return false;
        }

        /**
         * Filters out completion suggestions for named imports or exports.
         *
         * @param exportsOfModule          The list of symbols which a module exposes.
         * @param namedImportsOrExports    The list of existing import/export specifiers in the import/export clause.
         *
         * @returns Symbols to be suggested at an import/export clause, barring those whose named imports/exports
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterNamedImportOrExportCompletionItems(exportsOfModule: Symbol[], namedImportsOrExports: ImportOrExportSpecifier[]): Symbol[] {
            const existingImportsOrExports = createMap<boolean>();

            for (const element of namedImportsOrExports) {
                // If this is the current item we are editing right now, do not filter it out
                if (isCurrentlyEditingNode(element)) {
                    continue;
                }

                const name = element.propertyName || element.name;
                existingImportsOrExports.set(name.text, true);
            }

            if (existingImportsOrExports.size === 0) {
                return filter(exportsOfModule, e => e.name !== "default");
            }

            return filter(exportsOfModule, e => e.name !== "default" && !existingImportsOrExports.get(e.name));
        }

        /**
         * Filters out completion suggestions for named imports or exports.
         *
         * @returns Symbols to be suggested in an object binding pattern or object literal expression, barring those whose declarations
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterObjectMembersList(contextualMemberSymbols: Symbol[], existingMembers: Declaration[]): Symbol[] {
            if (!existingMembers || existingMembers.length === 0) {
                return contextualMemberSymbols;
            }

            const existingMemberNames = createMap<boolean>();
            for (const m of existingMembers) {
                // Ignore omitted expressions for missing members
                if (m.kind !== SyntaxKind.PropertyAssignment &&
                    m.kind !== SyntaxKind.ShorthandPropertyAssignment &&
                    m.kind !== SyntaxKind.BindingElement &&
                    m.kind !== SyntaxKind.MethodDeclaration &&
                    m.kind !== SyntaxKind.GetAccessor &&
                    m.kind !== SyntaxKind.SetAccessor) {
                    continue;
                }

                // If this is the current item we are editing right now, do not filter it out
                if (isCurrentlyEditingNode(m)) {
                    continue;
                }

                let existingName: string;

                if (m.kind === SyntaxKind.BindingElement && (<BindingElement>m).propertyName) {
                    // include only identifiers in completion list
                    if ((<BindingElement>m).propertyName.kind === SyntaxKind.Identifier) {
                        existingName = (<Identifier>(<BindingElement>m).propertyName).text;
                    }
                }
                else {
                    // TODO(jfreeman): Account for computed property name
                    // NOTE: if one only performs this step when m.name is an identifier,
                    // things like '__proto__' are not filtered out.
                    existingName = (getNameOfDeclaration(m) as Identifier).text;
                }

                existingMemberNames.set(existingName, true);
            }

            return filter(contextualMemberSymbols, m => !existingMemberNames.get(m.name));
        }

        /**
         * Filters out completion suggestions for class elements.
         *
         * @returns Symbols to be suggested in an class element depending on existing memebers and symbol flags
         */
        function filterClassMembersList(baseSymbols: Symbol[], implementingTypeSymbols: Symbol[], existingMembers: ClassElement[], currentClassElementModifierFlags: ModifierFlags): Symbol[] {
            const existingMemberNames = createMap<boolean>();
            for (const m of existingMembers) {
                // Ignore omitted expressions for missing members
                if (m.kind !== SyntaxKind.PropertyDeclaration &&
                    m.kind !== SyntaxKind.MethodDeclaration &&
                    m.kind !== SyntaxKind.GetAccessor &&
                    m.kind !== SyntaxKind.SetAccessor) {
                    continue;
                }

                // If this is the current item we are editing right now, do not filter it out
                if (isCurrentlyEditingNode(m)) {
                    continue;
                }

                // Dont filter member even if the name matches if it is declared private in the list
                if (hasModifier(m, ModifierFlags.Private)) {
                    continue;
                }

                // do not filter it out if the static presence doesnt match
                const mIsStatic = hasModifier(m, ModifierFlags.Static);
                const currentElementIsStatic = !!(currentClassElementModifierFlags & ModifierFlags.Static);
                if ((mIsStatic && !currentElementIsStatic) ||
                    (!mIsStatic && currentElementIsStatic)) {
                    continue;
                }

                const existingName = getPropertyNameForPropertyNameNode(m.name);
                if (existingName) {
                    existingMemberNames.set(existingName, true);
                }
            }

            return concatenate(
                filter(baseSymbols, baseProperty => isValidProperty(baseProperty, ModifierFlags.Private)),
                filter(implementingTypeSymbols, implementingProperty => isValidProperty(implementingProperty, ModifierFlags.NonPublicAccessibilityModifier))
            );

            function isValidProperty(propertySymbol: Symbol, inValidModifierFlags: ModifierFlags) {
                return !existingMemberNames.get(propertySymbol.name) &&
                    propertySymbol.getDeclarations() &&
                    !(getDeclarationModifierFlagsFromSymbol(propertySymbol) & inValidModifierFlags);
            }
        }

        /**
         * Filters out completion suggestions from 'symbols' according to existing JSX attributes.
         *
         * @returns Symbols to be suggested in a JSX element, barring those whose attributes
         *          do not occur at the current position and have not otherwise been typed.
         */
        function filterJsxAttributes(symbols: Symbol[], attributes: NodeArray<JsxAttribute | JsxSpreadAttribute>): Symbol[] {
            const seenNames = createMap<boolean>();
            for (const attr of attributes) {
                // If this is the current item we are editing right now, do not filter it out
                if (isCurrentlyEditingNode(attr)) {
                    continue;
                }

                if (attr.kind === SyntaxKind.JsxAttribute) {
                    seenNames.set((<JsxAttribute>attr).name.text, true);
                }
            }

            return filter(symbols, a => !seenNames.get(a.name));
        }

        function isCurrentlyEditingNode(node: Node): boolean {
            return node.getStart() <= position && position <= node.getEnd();
        }
    }

    /**
     * Get the name to be display in completion from a given symbol.
     *
     * @return undefined if the name is of external module otherwise a name with striped of any quote
     */
    function getCompletionEntryDisplayNameForSymbol(typeChecker: TypeChecker, symbol: Symbol, target: ScriptTarget, performCharacterChecks: boolean, location: Node): string {
        const displayName: string = getDeclaredName(typeChecker, symbol, location);

        if (displayName) {
            const firstCharCode = displayName.charCodeAt(0);
            // First check of the displayName is not external module; if it is an external module, it is not valid entry
            if ((symbol.flags & SymbolFlags.Namespace) && (firstCharCode === CharacterCodes.singleQuote || firstCharCode === CharacterCodes.doubleQuote)) {
                // If the symbol is external module, don't show it in the completion list
                // (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
                return undefined;
            }
        }

        return getCompletionEntryDisplayName(displayName, target, performCharacterChecks);
    }

    /**
     * Get a displayName from a given for completion list, performing any necessary quotes stripping
     * and checking whether the name is valid identifier name.
     */
    function getCompletionEntryDisplayName(name: string, target: ScriptTarget, performCharacterChecks: boolean): string {
        if (!name) {
            return undefined;
        }

        name = stripQuotes(name);

        if (!name) {
            return undefined;
        }

        // If the user entered name for the symbol was quoted, removing the quotes is not enough, as the name could be an
        // invalid identifier name. We need to check if whatever was inside the quotes is actually a valid identifier name.
        // e.g "b a" is valid quoted name but when we strip off the quotes, it is invalid.
        // We, thus, need to check if whatever was inside the quotes is actually a valid identifier name.
        if (performCharacterChecks) {
            if (!isIdentifierText(name, target)) {
                return undefined;
            }
        }

        return name;
    }

    // A cache of completion entries for keywords, these do not change between sessions
    const keywordCompletions: CompletionEntry[] = [];
    for (let i = SyntaxKind.FirstKeyword; i <= SyntaxKind.LastKeyword; i++) {
        keywordCompletions.push({
            name: tokenToString(i),
            kind: ScriptElementKind.keyword,
            kindModifiers: ScriptElementKindModifier.none,
            sortText: "0"
        });
    }

    function isClassMemberCompletionKeyword(kind: SyntaxKind) {
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.ConstructorKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
            case SyntaxKind.AsyncKeyword:
                return true;
        }
    }

    function isClassMemberCompletionKeywordText(text: string) {
        return isClassMemberCompletionKeyword(stringToToken(text));
    }

    const classMemberKeywordCompletions = filter(keywordCompletions, entry =>
        isClassMemberCompletionKeywordText(entry.name));

    function isEqualityExpression(node: Node): node is BinaryExpression {
        return isBinaryExpression(node) && isEqualityOperatorKind(node.operatorToken.kind);
    }

    function isEqualityOperatorKind(kind: SyntaxKind) {
        return kind === SyntaxKind.EqualsEqualsToken ||
            kind === SyntaxKind.ExclamationEqualsToken ||
            kind === SyntaxKind.EqualsEqualsEqualsToken ||
            kind === SyntaxKind.ExclamationEqualsEqualsToken;
    }

    /** Get the corresponding JSDocTag node if the position is in a jsDoc comment */
    function getJsDocTagAtPosition(node: Node, position: number): JSDocTag | undefined {
        const { jsDoc } = getJsDocHavingNode(node);
        if (!jsDoc) return undefined;

        for (const { pos, end, tags } of jsDoc) {
            if (!tags || position < pos || position > end) continue;
            for (let i = tags.length - 1; i >= 0; i--) {
                const tag = tags[i];
                if (position >= tag.pos) {
                    return tag;
                }
            }
        }
    }

    function getJsDocHavingNode(node: Node): Node {
        if (!isToken(node)) return node;

        switch (node.kind) {
            case SyntaxKind.VarKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.ConstKeyword:
                // if the current token is var, let or const, skip the VariableDeclarationList
                return node.parent.parent;
            default:
                return node.parent;
        }
    }
}
