namespace ts {
    export function isExternalModuleNameRelative(moduleName: string): boolean {
        // TypeScript 1.0 spec (April 2014): 11.2.1
        // An external module name is "relative" if the first term is "." or "..".
        // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
        return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
    }

    export function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): SortedReadonlyArray<T> {
        return sortAndDeduplicate<T>(diagnostics, compareDiagnostics);
    }

    export function getDefaultLibFileName(options: CompilerOptions): string {
        switch (options.target) {
            case ScriptTarget.ESNext:
                return "lib.esnext.full.d.ts";
            case ScriptTarget.ES2020:
                return "lib.es2020.full.d.ts";
            case ScriptTarget.ES2019:
                return "lib.es2019.full.d.ts";
            case ScriptTarget.ES2018:
                return "lib.es2018.full.d.ts";
            case ScriptTarget.ES2017:
                return "lib.es2017.full.d.ts";
            case ScriptTarget.ES2016:
                return "lib.es2016.full.d.ts";
            case ScriptTarget.ES2015:
                return "lib.es6.d.ts";  // We don't use lib.es2015.full.d.ts due to breaking change.
            default:
                return "lib.d.ts";
        }
    }

    export function textSpanEnd(span: TextSpan) {
        return span.start + span.length;
    }

    export function textSpanIsEmpty(span: TextSpan) {
        return span.length === 0;
    }

    export function textSpanContainsPosition(span: TextSpan, position: number) {
        return position >= span.start && position < textSpanEnd(span);
    }

    /* @internal */
    export function textRangeContainsPositionInclusive(span: TextRange, position: number): boolean {
        return position >= span.pos && position <= span.end;
    }

    // Returns true if 'span' contains 'other'.
    export function textSpanContainsTextSpan(span: TextSpan, other: TextSpan) {
        return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
    }

    export function textSpanOverlapsWith(span: TextSpan, other: TextSpan) {
        return textSpanOverlap(span, other) !== undefined;
    }

    export function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
        const overlap = textSpanIntersection(span1, span2);
        return overlap && overlap.length === 0 ? undefined : overlap;
    }

    export function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan) {
        return decodedTextSpanIntersectsWith(span.start, span.length, other.start, other.length);
    }

    export function textSpanIntersectsWith(span: TextSpan, start: number, length: number) {
        return decodedTextSpanIntersectsWith(span.start, span.length, start, length);
    }

    export function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number) {
        const end1 = start1 + length1;
        const end2 = start2 + length2;
        return start2 <= end1 && end2 >= start1;
    }

    export function textSpanIntersectsWithPosition(span: TextSpan, position: number) {
        return position <= textSpanEnd(span) && position >= span.start;
    }

    export function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
        const start = Math.max(span1.start, span2.start);
        const end = Math.min(textSpanEnd(span1), textSpanEnd(span2));
        return start <= end ? createTextSpanFromBounds(start, end) : undefined;
    }

    export function createTextSpan(start: number, length: number): TextSpan {
        if (start < 0) {
            throw new Error("start < 0");
        }
        if (length < 0) {
            throw new Error("length < 0");
        }

        return { start, length };
    }

    export function createTextSpanFromBounds(start: number, end: number) {
        return createTextSpan(start, end - start);
    }

    export function textChangeRangeNewSpan(range: TextChangeRange) {
        return createTextSpan(range.span.start, range.newLength);
    }

    export function textChangeRangeIsUnchanged(range: TextChangeRange) {
        return textSpanIsEmpty(range.span) && range.newLength === 0;
    }

    export function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange {
        if (newLength < 0) {
            throw new Error("newLength < 0");
        }

        return { span, newLength };
    }

    export let unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0); // eslint-disable-line prefer-const

    /**
     * Called to merge all the changes that occurred across several versions of a script snapshot
     * into a single change.  i.e. if a user keeps making successive edits to a script we will
     * have a text change from V1 to V2, V2 to V3, ..., Vn.
     *
     * This function will then merge those changes into a single change range valid between V1 and
     * Vn.
     */
    export function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly TextChangeRange[]): TextChangeRange {
        if (changes.length === 0) {
            return unchangedTextChangeRange;
        }

        if (changes.length === 1) {
            return changes[0];
        }

        // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
        // as it makes things much easier to reason about.
        const change0 = changes[0];

        let oldStartN = change0.span.start;
        let oldEndN = textSpanEnd(change0.span);
        let newEndN = oldStartN + change0.newLength;

        for (let i = 1; i < changes.length; i++) {
            const nextChange = changes[i];

            // Consider the following case:
            // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
            // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
            // i.e. the span starting at 30 with length 30 is increased to length 40.
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      -------------------------------------------------------------------------------------------------------
            //                |                                                 /
            //                |                                            /----
            //  T1            |                                       /----
            //                |                                  /----
            //                |                             /----
            //      -------------------------------------------------------------------------------------------------------
            //                                     |                            \
            //                                     |                               \
            //   T2                                |                                 \
            //                                     |                                   \
            //                                     |                                      \
            //      -------------------------------------------------------------------------------------------------------
            //
            // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
            // it's just the min of the old and new starts.  i.e.:
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      ------------------------------------------------------------*------------------------------------------
            //                |                                                 /
            //                |                                            /----
            //  T1            |                                       /----
            //                |                                  /----
            //                |                             /----
            //      ----------------------------------------$-------------------$------------------------------------------
            //                .                    |                            \
            //                .                    |                               \
            //   T2           .                    |                                 \
            //                .                    |                                   \
            //                .                    |                                      \
            //      ----------------------------------------------------------------------*--------------------------------
            //
            // (Note the dots represent the newly inferred start.
            // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
            // absolute positions at the asterisks, and the relative change between the dollar signs. Basically, we see
            // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
            // means:
            //
            //      0         10        20        30        40        50        60        70        80        90        100
            //      --------------------------------------------------------------------------------*----------------------
            //                |                                                                     /
            //                |                                                                /----
            //  T1            |                                                           /----
            //                |                                                      /----
            //                |                                                 /----
            //      ------------------------------------------------------------$------------------------------------------
            //                .                    |                            \
            //                .                    |                               \
            //   T2           .                    |                                 \
            //                .                    |                                   \
            //                .                    |                                      \
            //      ----------------------------------------------------------------------*--------------------------------
            //
            // In other words (in this case), we're recognizing that the second edit happened after where the first edit
            // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
            // that's the same as if we started at char 80 instead of 60.
            //
            // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rather
            // than pushing the first edit forward to match the second, we'll push the second edit forward to match the
            // first.
            //
            // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
            // semantics: { { start: 10, length: 70 }, newLength: 60 }
            //
            // The math then works out as follows.
            // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the
            // final result like so:
            //
            // {
            //      oldStart3: Min(oldStart1, oldStart2),
            //      oldEnd3: Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
            //      newEnd3: Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
            // }

            const oldStart1 = oldStartN;
            const oldEnd1 = oldEndN;
            const newEnd1 = newEndN;

            const oldStart2 = nextChange.span.start;
            const oldEnd2 = textSpanEnd(nextChange.span);
            const newEnd2 = oldStart2 + nextChange.newLength;

            oldStartN = Math.min(oldStart1, oldStart2);
            oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
            newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
        }

        return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength*/ newEndN - oldStartN);
    }

    export function getTypeParameterOwner(d: Declaration): Declaration | undefined {
        if (d && d.kind === SyntaxKind.TypeParameter) {
            for (let current: Node = d; current; current = current.parent) {
                if (isFunctionLike(current) || isClassLike(current) || current.kind === SyntaxKind.InterfaceDeclaration) {
                    return <Declaration>current;
                }
            }
        }
    }

    export type ParameterPropertyDeclaration = ParameterDeclaration & { parent: ConstructorDeclaration, name: Identifier };
    export function isParameterPropertyDeclaration(node: Node, parent: Node): node is ParameterPropertyDeclaration {
        return hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier) && parent.kind === SyntaxKind.Constructor;
    }

    export function isEmptyBindingPattern(node: BindingName): node is BindingPattern {
        if (isBindingPattern(node)) {
            return every(node.elements, isEmptyBindingElement);
        }
        return false;
    }

    export function isEmptyBindingElement(node: BindingElement): boolean {
        if (isOmittedExpression(node)) {
            return true;
        }
        return isEmptyBindingPattern(node.name);
    }

    export function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration {
        let node = binding.parent;
        while (isBindingElement(node.parent)) {
            node = node.parent.parent;
        }
        return node.parent;
    }

    function getCombinedFlags(node: Node, getFlags: (n: Node) => number): number {
        if (isBindingElement(node)) {
            node = walkUpBindingElementsAndPatterns(node);
        }
        let flags = getFlags(node);
        if (node.kind === SyntaxKind.VariableDeclaration) {
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind.VariableDeclarationList) {
            flags |= getFlags(node);
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind.VariableStatement) {
            flags |= getFlags(node);
        }
        return flags;
    }

    export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
        return getCombinedFlags(node, getEffectiveModifierFlags);
    }

    // Returns the node flags for this node and all relevant parent nodes.  This is done so that
    // nodes like variable declarations and binding elements can returned a view of their flags
    // that includes the modifiers from their container.  i.e. flags like export/declare aren't
    // stored on the variable declaration directly, but on the containing variable statement
    // (if it has one).  Similarly, flags for let/const are store on the variable declaration
    // list.  By calling this function, all those flags are combined so that the client can treat
    // the node as if it actually had those flags.
    export function getCombinedNodeFlags(node: Node): NodeFlags {
        return getCombinedFlags(node, n => n.flags);
    }

    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    export function validateLocaleAndSetLanguage(
        locale: string,
        sys: { getExecutingFilePath(): string, resolvePath(path: string): string, fileExists(fileName: string): boolean, readFile(fileName: string): string | undefined },
        errors?: Push<Diagnostic>) {
        const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            if (errors) {
                errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
            }
            return;
        }

        const language = matchResult[1];
        const territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        // Either ways do not fail, and fallback to the English diagnostic strings.
        if (!trySetLanguageAndTerritory(language, territory, errors)) {
            trySetLanguageAndTerritory(language, /*territory*/ undefined, errors);
        }

        // Set the UI locale for string collation
        setUILocale(locale);

        function trySetLanguageAndTerritory(language: string, territory: string | undefined, errors?: Push<Diagnostic>): boolean {
            const compilerFilePath = normalizePath(sys.getExecutingFilePath());
            const containingDirectoryPath = getDirectoryPath(compilerFilePath);

            let filePath = combinePaths(containingDirectoryPath, language);

            if (territory) {
                filePath = filePath + "-" + territory;
            }

            filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

            if (!sys.fileExists(filePath)) {
                return false;
            }

            // TODO: Add codePage support for readFile?
            let fileContents: string | undefined = "";
            try {
                fileContents = sys.readFile(filePath);
            }
            catch (e) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
                }
                return false;
            }
            try {
                // this is a global mutation (or live binding update)!
                setLocalizedDiagnosticMessages(JSON.parse(fileContents!));
            }
            catch {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
                }
                return false;
            }

            return true;
        }
    }

    export function getOriginalNode(node: Node): Node;
    export function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
    export function getOriginalNode(node: Node | undefined): Node | undefined;
    export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node | undefined) => node is T): T | undefined;
    export function getOriginalNode(node: Node | undefined, nodeTest?: (node: Node | undefined) => boolean): Node | undefined {
        if (node) {
            while (node.original !== undefined) {
                node = node.original;
            }
        }

        return !nodeTest || nodeTest(node) ? node : undefined;
    }

    /**
     * Gets a value indicating whether a node originated in the parse tree.
     *
     * @param node The node to test.
     */
    export function isParseTreeNode(node: Node): boolean {
        return (node.flags & NodeFlags.Synthesized) === 0;
    }

    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    export function getParseTreeNode(node: Node): Node;

    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    export function getParseTreeNode<T extends Node>(node: Node | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
    export function getParseTreeNode(node: Node | undefined, nodeTest?: (node: Node) => boolean): Node | undefined {
        if (node === undefined || isParseTreeNode(node)) {
            return node;
        }

        node = getOriginalNode(node);

        if (isParseTreeNode(node) && (!nodeTest || nodeTest(node))) {
            return node;
        }

        return undefined;
    }

    /** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
    export function escapeLeadingUnderscores(identifier: string): __String {
        return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier) as __String;
    }

    /**
     * Remove extra underscore from escaped identifier text content.
     *
     * @param identifier The escaped identifier text.
     * @returns The unescaped identifier text.
     */
    export function unescapeLeadingUnderscores(identifier: __String): string {
        const id = identifier as string;
        return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._ ? id.substr(1) : id;
    }

    export function idText(identifierOrPrivateName: Identifier | PrivateIdentifier): string {
        return unescapeLeadingUnderscores(identifierOrPrivateName.escapedText);
    }
    export function symbolName(symbol: Symbol): string {
        if (symbol.valueDeclaration && isPrivateIdentifierPropertyDeclaration(symbol.valueDeclaration)) {
            return idText(symbol.valueDeclaration.name);
        }
        return unescapeLeadingUnderscores(symbol.escapedName);
    }

    /**
     * A JSDocTypedef tag has an _optional_ name field - if a name is not directly present, we should
     * attempt to draw the name from the node the declaration is on (as that declaration is what its' symbol
     * will be merged with)
     */
    function nameForNamelessJSDocTypedef(declaration: JSDocTypedefTag | JSDocEnumTag): Identifier | PrivateIdentifier | undefined {
        const hostNode = declaration.parent.parent;
        if (!hostNode) {
            return undefined;
        }
        // Covers classes, functions - any named declaration host node
        if (isDeclaration(hostNode)) {
            return getDeclarationIdentifier(hostNode);
        }
        // Covers remaining cases (returning undefined if none match).
        switch (hostNode.kind) {
            case SyntaxKind.VariableStatement:
                if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                    return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
                }
                break;
            case SyntaxKind.ExpressionStatement:
                let expr = hostNode.expression;
                if (expr.kind === SyntaxKind.BinaryExpression && (expr as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
                    expr = (expr as BinaryExpression).left;
                }
                switch (expr.kind) {
                    case SyntaxKind.PropertyAccessExpression:
                        return (expr as PropertyAccessExpression).name;
                    case SyntaxKind.ElementAccessExpression:
                        const arg = (expr as ElementAccessExpression).argumentExpression;
                        if (isIdentifier(arg)) {
                            return arg;
                        }
                }
                break;
            case SyntaxKind.ParenthesizedExpression: {
                return getDeclarationIdentifier(hostNode.expression);
            }
            case SyntaxKind.LabeledStatement: {
                if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                    return getDeclarationIdentifier(hostNode.statement);
                }
                break;
            }
        }
    }

    function getDeclarationIdentifier(node: Declaration | Expression): Identifier | undefined {
        const name = getNameOfDeclaration(node);
        return name && isIdentifier(name) ? name : undefined;
    }

    /** @internal */
    export function nodeHasName(statement: Node, name: Identifier) {
        if (isNamedDeclaration(statement) && isIdentifier(statement.name) && idText(statement.name as Identifier) === idText(name)) {
            return true;
        }
        if (isVariableStatement(statement) && some(statement.declarationList.declarations, d => nodeHasName(d, name))) {
            return true;
        }
        return false;
    }

    export function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | PrivateIdentifier | undefined {
        return declaration.name || nameForNamelessJSDocTypedef(declaration);
    }

    /** @internal */
    export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName } {
        return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
    }

    /** @internal */
    export function getNonAssignedNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
        switch (declaration.kind) {
            case SyntaxKind.Identifier:
                return declaration as Identifier;
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag: {
                const { name } = declaration as JSDocPropertyLikeTag;
                if (name.kind === SyntaxKind.QualifiedName) {
                    return name.right;
                }
                break;
            }
            case SyntaxKind.CallExpression:
            case SyntaxKind.BinaryExpression: {
                const expr = declaration as BinaryExpression | CallExpression;
                switch (getAssignmentDeclarationKind(expr)) {
                    case AssignmentDeclarationKind.ExportsProperty:
                    case AssignmentDeclarationKind.ThisProperty:
                    case AssignmentDeclarationKind.Property:
                    case AssignmentDeclarationKind.PrototypeProperty:
                        return getElementOrPropertyAccessArgumentExpressionOrName((expr as BinaryExpression).left as AccessExpression);
                    case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                    case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                    case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                        return (expr as BindableObjectDefinePropertyCall).arguments[1];
                    default:
                        return undefined;
                }
            }
            case SyntaxKind.JSDocTypedefTag:
                return getNameOfJSDocTypedef(declaration as JSDocTypedefTag);
            case SyntaxKind.JSDocEnumTag:
                return nameForNamelessJSDocTypedef(declaration as JSDocEnumTag);
            case SyntaxKind.ExportAssignment: {
                const { expression } = declaration as ExportAssignment;
                return isIdentifier(expression) ? expression : undefined;
            }
            case SyntaxKind.ElementAccessExpression:
                const expr = declaration as ElementAccessExpression;
                if (isBindableStaticElementAccessExpression(expr)) {
                    return expr.argumentExpression;
                }
        }
        return (declaration as NamedDeclaration).name;
    }

    export function getNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
        if (declaration === undefined) return undefined;
        return getNonAssignedNameOfDeclaration(declaration) ||
            (isFunctionExpression(declaration) || isClassExpression(declaration) ? getAssignedName(declaration) : undefined);
    }

    function getAssignedName(node: Node): DeclarationName | undefined {
        if (!node.parent) {
            return undefined;
        }
        else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
            return node.parent.name;
        }
        else if (isBinaryExpression(node.parent) && node === node.parent.right) {
            if (isIdentifier(node.parent.left)) {
                return node.parent.left;
            }
            else if (isAccessExpression(node.parent.left)) {
                return getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
            }
        }
        else if (isVariableDeclaration(node.parent) && isIdentifier(node.parent.name)) {
            return node.parent.name;
        }
    }

    function getJSDocParameterTagsWorker(param: ParameterDeclaration, noCache?: boolean): readonly JSDocParameterTag[] {
        if (param.name) {
            if (isIdentifier(param.name)) {
                const name = param.name.escapedText;
                return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocParameterTag => isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.escapedText === name);
            }
            else {
                const i = param.parent.parameters.indexOf(param);
                Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
                const paramTags = getJSDocTagsWorker(param.parent, noCache).filter(isJSDocParameterTag);
                if (i < paramTags.length) {
                    return [paramTags[i]];
                }
            }
        }
        // return empty array for: out-of-order binding patterns and JSDoc function syntax, which has un-named parameters
        return emptyArray;
    }

    /**
     * Gets the JSDoc parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc param tag whose name matches the provided
     * parameter, whether a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the param
     * tag on the containing function expression would be first.
     *
     * For binding patterns, parameter tags are matched by position.
     */
    export function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[] {
        return getJSDocParameterTagsWorker(param, /*noCache*/ false);
    }

    /* @internal */
    export function getJSDocParameterTagsNoCache(param: ParameterDeclaration): readonly JSDocParameterTag[] {
        return getJSDocParameterTagsWorker(param, /*noCache*/ true);
    }

    function getJSDocTypeParameterTagsWorker(param: TypeParameterDeclaration, noCache?: boolean): readonly JSDocTemplateTag[] {
        const name = param.name.escapedText;
        return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocTemplateTag =>
            isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.escapedText === name));
    }

    /**
     * Gets the JSDoc type parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc template tag whose names match the provided
     * parameter, whether a template tag on a containing function
     * expression, or a template tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the template
     * tag on the containing function expression would be first.
     */
    export function getJSDocTypeParameterTags(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
        return getJSDocTypeParameterTagsWorker(param, /*noCache*/ false);
    }

    /* @internal */
    export function getJSDocTypeParameterTagsNoCache(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
        return getJSDocTypeParameterTagsWorker(param, /*noCache*/ true);
    }

    /**
     * Return true if the node has JSDoc parameter tags.
     *
     * @remarks Includes parameter tags that are not directly on the node,
     * for example on a variable declaration whose initializer is a function expression.
     */
    export function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean {
        return !!getFirstJSDocTag(node, isJSDocParameterTag);
    }

    /** Gets the JSDoc augments tag for the node if present */
    export function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag | undefined {
        return getFirstJSDocTag(node, isJSDocAugmentsTag);
    }

    /** Gets the JSDoc implements tags for the node if present */
    export function getJSDocImplementsTags(node: Node): readonly JSDocImplementsTag[] {
        return getAllJSDocTags(node, isJSDocImplementsTag);
    }

    /** Gets the JSDoc class tag for the node if present */
    export function getJSDocClassTag(node: Node): JSDocClassTag | undefined {
        return getFirstJSDocTag(node, isJSDocClassTag);
    }

    /** Gets the JSDoc public tag for the node if present */
    export function getJSDocPublicTag(node: Node): JSDocPublicTag | undefined {
        return getFirstJSDocTag(node, isJSDocPublicTag);
    }

    /*@internal*/
    export function getJSDocPublicTagNoCache(node: Node): JSDocPublicTag | undefined {
        return getFirstJSDocTag(node, isJSDocPublicTag, /*noCache*/ true);
    }

    /** Gets the JSDoc private tag for the node if present */
    export function getJSDocPrivateTag(node: Node): JSDocPrivateTag | undefined {
        return getFirstJSDocTag(node, isJSDocPrivateTag);
    }

    /*@internal*/
    export function getJSDocPrivateTagNoCache(node: Node): JSDocPrivateTag | undefined {
        return getFirstJSDocTag(node, isJSDocPrivateTag, /*noCache*/ true);
    }

    /** Gets the JSDoc protected tag for the node if present */
    export function getJSDocProtectedTag(node: Node): JSDocProtectedTag | undefined {
        return getFirstJSDocTag(node, isJSDocProtectedTag);
    }

    /*@internal*/
    export function getJSDocProtectedTagNoCache(node: Node): JSDocProtectedTag | undefined {
        return getFirstJSDocTag(node, isJSDocProtectedTag, /*noCache*/ true);
    }

    /** Gets the JSDoc protected tag for the node if present */
    export function getJSDocReadonlyTag(node: Node): JSDocReadonlyTag | undefined {
        return getFirstJSDocTag(node, isJSDocReadonlyTag);
    }

    /*@internal*/
    export function getJSDocReadonlyTagNoCache(node: Node): JSDocReadonlyTag | undefined {
        return getFirstJSDocTag(node, isJSDocReadonlyTag, /*noCache*/ true);
    }

    /** Gets the JSDoc enum tag for the node if present */
    export function getJSDocEnumTag(node: Node): JSDocEnumTag | undefined {
        return getFirstJSDocTag(node, isJSDocEnumTag);
    }

    /** Gets the JSDoc this tag for the node if present */
    export function getJSDocThisTag(node: Node): JSDocThisTag | undefined {
        return getFirstJSDocTag(node, isJSDocThisTag);
    }

    /** Gets the JSDoc return tag for the node if present */
    export function getJSDocReturnTag(node: Node): JSDocReturnTag | undefined {
        return getFirstJSDocTag(node, isJSDocReturnTag);
    }

    /** Gets the JSDoc template tag for the node if present */
    export function getJSDocTemplateTag(node: Node): JSDocTemplateTag | undefined {
        return getFirstJSDocTag(node, isJSDocTemplateTag);
    }

    /** Gets the JSDoc type tag for the node if present and valid */
    export function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined {
        // We should have already issued an error if there were multiple type jsdocs, so just use the first one.
        const tag = getFirstJSDocTag(node, isJSDocTypeTag);
        if (tag && tag.typeExpression && tag.typeExpression.type) {
            return tag;
        }
        return undefined;
    }

    /**
     * Gets the type node for the node if provided via JSDoc.
     *
     * @remarks The search includes any JSDoc param tag that relates
     * to the provided parameter, for example a type tag on the
     * parameter itself, or a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are examined first, so in the previous example, the type
     * tag directly on the node would be returned.
     */
    export function getJSDocType(node: Node): TypeNode | undefined {
        let tag: JSDocTypeTag | JSDocParameterTag | undefined = getFirstJSDocTag(node, isJSDocTypeTag);
        if (!tag && isParameter(node)) {
            tag = find(getJSDocParameterTags(node), tag => !!tag.typeExpression);
        }

        return tag && tag.typeExpression && tag.typeExpression.type;
    }

    /**
     * Gets the return type node for the node if provided via JSDoc return tag or type tag.
     *
     * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
     * gets the type from inside the braces, after the fat arrow, etc.
     */
    export function getJSDocReturnType(node: Node): TypeNode | undefined {
        const returnTag = getJSDocReturnTag(node);
        if (returnTag && returnTag.typeExpression) {
            return returnTag.typeExpression.type;
        }
        const typeTag = getJSDocTypeTag(node);
        if (typeTag && typeTag.typeExpression) {
            const type = typeTag.typeExpression.type;
            if (isTypeLiteralNode(type)) {
                const sig = find(type.members, isCallSignatureDeclaration);
                return sig && sig.type;
            }
            if (isFunctionTypeNode(type) || isJSDocFunctionType(type)) {
                return type.type;
            }
        }
    }

    function getJSDocTagsWorker(node: Node, noCache?: boolean): readonly JSDocTag[] {
        let tags = (node as JSDocContainer).jsDocCache;
        // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
        if (tags === undefined || noCache) {
            const comments = getJSDocCommentsAndTags(node, noCache);
            Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
            tags = flatMap(comments, j => isJSDoc(j) ? j.tags : j);
            if (!noCache) {
                (node as JSDocContainer).jsDocCache = tags;
            }
        }
        return tags;
    }

    /** Get all JSDoc tags related to a node, including those on parent nodes. */
    export function getJSDocTags(node: Node): readonly JSDocTag[] {
        return getJSDocTagsWorker(node, /*noCache*/ false);
    }

    /* @internal */
    export function getJSDocTagsNoCache(node: Node): readonly JSDocTag[] {
        return getJSDocTagsWorker(node, /*noCache*/ true);
    }

    /** Get the first JSDoc tag of a specified kind, or undefined if not present. */
    function getFirstJSDocTag<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T, noCache?: boolean): T | undefined {
        return find(getJSDocTagsWorker(node, noCache), predicate);
    }

    /** Gets all JSDoc tags that match a specified predicate */
    export function getAllJSDocTags<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T): readonly T[] {
        return getJSDocTags(node).filter(predicate);
    }

    /** Gets all JSDoc tags of a specified kind */
    export function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): readonly JSDocTag[] {
        return getJSDocTags(node).filter(doc => doc.kind === kind);
    }

    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     */
    export function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
        if (isJSDocSignature(node)) {
            return emptyArray;
        }
        if (isJSDocTypeAlias(node)) {
            Debug.assert(node.parent.kind === SyntaxKind.JSDocComment);
            return flatMap(node.parent.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
        }
        if (node.typeParameters) {
            return node.typeParameters;
        }
        if (isInJSFile(node)) {
            const decls = getJSDocTypeParameterDeclarations(node);
            if (decls.length) {
                return decls;
            }
            const typeTag = getJSDocType(node);
            if (typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
                return typeTag.typeParameters;
            }
        }
        return emptyArray;
    }

    export function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined {
        return node.constraint ? node.constraint :
            isJSDocTemplateTag(node.parent) && node === node.parent.typeParameters[0] ? node.parent.constraint :
            undefined;
    }

    // #region
    // Simple node tests of the form `node.kind === SyntaxKind.Foo`.
    // Literals
    export function isNumericLiteral(node: Node): node is NumericLiteral {
        return node.kind === SyntaxKind.NumericLiteral;
    }

    export function isBigIntLiteral(node: Node): node is BigIntLiteral {
        return node.kind === SyntaxKind.BigIntLiteral;
    }

    export function isStringLiteral(node: Node): node is StringLiteral {
        return node.kind === SyntaxKind.StringLiteral;
    }

    export function isJsxText(node: Node): node is JsxText {
        return node.kind === SyntaxKind.JsxText;
    }

    export function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral {
        return node.kind === SyntaxKind.RegularExpressionLiteral;
    }

    export function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral {
        return node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    // Pseudo-literals

    export function isTemplateHead(node: Node): node is TemplateHead {
        return node.kind === SyntaxKind.TemplateHead;
    }

    export function isTemplateMiddle(node: Node): node is TemplateMiddle {
        return node.kind === SyntaxKind.TemplateMiddle;
    }

    export function isTemplateTail(node: Node): node is TemplateTail {
        return node.kind === SyntaxKind.TemplateTail;
    }

    export function isIdentifier(node: Node): node is Identifier {
        return node.kind === SyntaxKind.Identifier;
    }

    // Names

    export function isQualifiedName(node: Node): node is QualifiedName {
        return node.kind === SyntaxKind.QualifiedName;
    }

    export function isComputedPropertyName(node: Node): node is ComputedPropertyName {
        return node.kind === SyntaxKind.ComputedPropertyName;
    }

    export function isPrivateIdentifier(node: Node): node is PrivateIdentifier {
        return node.kind === SyntaxKind.PrivateIdentifier;
    }

    export function isIdentifierOrPrivateIdentifier(node: Node): node is Identifier | PrivateIdentifier {
        return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PrivateIdentifier;
    }

    // Signature elements

    export function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration {
        return node.kind === SyntaxKind.TypeParameter;
    }

    export function isParameter(node: Node): node is ParameterDeclaration {
        return node.kind === SyntaxKind.Parameter;
    }

    export function isDecorator(node: Node): node is Decorator {
        return node.kind === SyntaxKind.Decorator;
    }

    // TypeMember

    export function isPropertySignature(node: Node): node is PropertySignature {
        return node.kind === SyntaxKind.PropertySignature;
    }

    export function isPropertyDeclaration(node: Node): node is PropertyDeclaration {
        return node.kind === SyntaxKind.PropertyDeclaration;
    }

    export function isMethodSignature(node: Node): node is MethodSignature {
        return node.kind === SyntaxKind.MethodSignature;
    }

    export function isMethodDeclaration(node: Node): node is MethodDeclaration {
        return node.kind === SyntaxKind.MethodDeclaration;
    }

    export function isConstructorDeclaration(node: Node): node is ConstructorDeclaration {
        return node.kind === SyntaxKind.Constructor;
    }

    export function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration {
        return node.kind === SyntaxKind.GetAccessor;
    }

    export function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor;
    }

    export function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration {
        return node.kind === SyntaxKind.CallSignature;
    }

    export function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration {
        return node.kind === SyntaxKind.ConstructSignature;
    }

    export function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration {
        return node.kind === SyntaxKind.IndexSignature;
    }

    /* @internal */
    export function isGetOrSetAccessorDeclaration(node: Node): node is AccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor || node.kind === SyntaxKind.GetAccessor;
    }

    // Type

    export function isTypePredicateNode(node: Node): node is TypePredicateNode {
        return node.kind === SyntaxKind.TypePredicate;
    }

    export function isTypeReferenceNode(node: Node): node is TypeReferenceNode {
        return node.kind === SyntaxKind.TypeReference;
    }

    export function isFunctionTypeNode(node: Node): node is FunctionTypeNode {
        return node.kind === SyntaxKind.FunctionType;
    }

    export function isConstructorTypeNode(node: Node): node is ConstructorTypeNode {
        return node.kind === SyntaxKind.ConstructorType;
    }

    export function isTypeQueryNode(node: Node): node is TypeQueryNode {
        return node.kind === SyntaxKind.TypeQuery;
    }

    export function isTypeLiteralNode(node: Node): node is TypeLiteralNode {
        return node.kind === SyntaxKind.TypeLiteral;
    }

    export function isArrayTypeNode(node: Node): node is ArrayTypeNode {
        return node.kind === SyntaxKind.ArrayType;
    }

    export function isTupleTypeNode(node: Node): node is TupleTypeNode {
        return node.kind === SyntaxKind.TupleType;
    }

    export function isUnionTypeNode(node: Node): node is UnionTypeNode {
        return node.kind === SyntaxKind.UnionType;
    }

    export function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode {
        return node.kind === SyntaxKind.IntersectionType;
    }

    export function isConditionalTypeNode(node: Node): node is ConditionalTypeNode {
        return node.kind === SyntaxKind.ConditionalType;
    }

    export function isInferTypeNode(node: Node): node is InferTypeNode {
        return node.kind === SyntaxKind.InferType;
    }

    export function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode {
        return node.kind === SyntaxKind.ParenthesizedType;
    }

    export function isThisTypeNode(node: Node): node is ThisTypeNode {
        return node.kind === SyntaxKind.ThisType;
    }

    export function isTypeOperatorNode(node: Node): node is TypeOperatorNode {
        return node.kind === SyntaxKind.TypeOperator;
    }

    export function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode {
        return node.kind === SyntaxKind.IndexedAccessType;
    }

    export function isMappedTypeNode(node: Node): node is MappedTypeNode {
        return node.kind === SyntaxKind.MappedType;
    }

    export function isLiteralTypeNode(node: Node): node is LiteralTypeNode {
        return node.kind === SyntaxKind.LiteralType;
    }

    export function isImportTypeNode(node: Node): node is ImportTypeNode {
        return node.kind === SyntaxKind.ImportType;
    }

    // Binding patterns

    export function isObjectBindingPattern(node: Node): node is ObjectBindingPattern {
        return node.kind === SyntaxKind.ObjectBindingPattern;
    }

    export function isArrayBindingPattern(node: Node): node is ArrayBindingPattern {
        return node.kind === SyntaxKind.ArrayBindingPattern;
    }

    export function isBindingElement(node: Node): node is BindingElement {
        return node.kind === SyntaxKind.BindingElement;
    }

    // Expression

    export function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression {
        return node.kind === SyntaxKind.ArrayLiteralExpression;
    }

    export function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression {
        return node.kind === SyntaxKind.ObjectLiteralExpression;
    }

    export function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression {
        return node.kind === SyntaxKind.PropertyAccessExpression;
    }

    export function isPropertyAccessChain(node: Node): node is PropertyAccessChain {
        return isPropertyAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
    }

    export function isElementAccessExpression(node: Node): node is ElementAccessExpression {
        return node.kind === SyntaxKind.ElementAccessExpression;
    }

    export function isElementAccessChain(node: Node): node is ElementAccessChain {
        return isElementAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
    }

    export function isCallExpression(node: Node): node is CallExpression {
        return node.kind === SyntaxKind.CallExpression;
    }

    export function isCallChain(node: Node): node is CallChain {
        return isCallExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
    }

    export function isOptionalChain(node: Node): node is PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain {
        const kind = node.kind;
        return !!(node.flags & NodeFlags.OptionalChain) &&
            (kind === SyntaxKind.PropertyAccessExpression
                || kind === SyntaxKind.ElementAccessExpression
                || kind === SyntaxKind.CallExpression
                || kind === SyntaxKind.NonNullExpression);
    }

    /* @internal */
    export function isOptionalChainRoot(node: Node): node is OptionalChainRoot {
        return isOptionalChain(node) && !isNonNullExpression(node) && !!node.questionDotToken;
    }

    /**
     * Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
     */
    /* @internal */
    export function isExpressionOfOptionalChainRoot(node: Node): node is Expression & { parent: OptionalChainRoot } {
        return isOptionalChainRoot(node.parent) && node.parent.expression === node;
    }

    /**
     * Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`:
     *
     * 1. For `a?.b.c`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.`)
     * 2. For `a?.b!`, the outermost chain is `a?.b` (`b` is the end of the chain starting at `a?.`)
     * 3. For `(a?.b.c).d`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.` since parens end the chain)
     * 4. For `a?.b.c?.d`, both `a?.b.c` and `a?.b.c?.d` are outermost (`c` is the end of the chain starting at `a?.`, and `d` is
     *   the end of the chain starting at `c?.`)
     * 5. For `a?.(b?.c).d`, both `b?.c` and `a?.(b?.c)d` are outermost (`c` is the end of the chain starting at `b`, and `d` is
     *   the end of the chain starting at `a?.`)
     */
    /* @internal */
    export function isOutermostOptionalChain(node: OptionalChain) {
        return !isOptionalChain(node.parent) // cases 1, 2, and 3
            || isOptionalChainRoot(node.parent) // case 4
            || node !== node.parent.expression; // case 5
    }

    export function isNullishCoalesce(node: Node) {
        return node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.QuestionQuestionToken;
    }

    export function isNewExpression(node: Node): node is NewExpression {
        return node.kind === SyntaxKind.NewExpression;
    }

    export function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression {
        return node.kind === SyntaxKind.TaggedTemplateExpression;
    }

    export function isTypeAssertion(node: Node): node is TypeAssertion {
        return node.kind === SyntaxKind.TypeAssertionExpression;
    }

    export function isConstTypeReference(node: Node) {
        return isTypeReferenceNode(node) && isIdentifier(node.typeName) &&
            node.typeName.escapedText === "const" && !node.typeArguments;
    }

    export function isParenthesizedExpression(node: Node): node is ParenthesizedExpression {
        return node.kind === SyntaxKind.ParenthesizedExpression;
    }

    export function skipPartiallyEmittedExpressions(node: Expression): Expression;
    export function skipPartiallyEmittedExpressions(node: Node): Node;
    export function skipPartiallyEmittedExpressions(node: Node) {
        return skipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions);
    }

    export function isFunctionExpression(node: Node): node is FunctionExpression {
        return node.kind === SyntaxKind.FunctionExpression;
    }

    export function isArrowFunction(node: Node): node is ArrowFunction {
        return node.kind === SyntaxKind.ArrowFunction;
    }

    export function isDeleteExpression(node: Node): node is DeleteExpression {
        return node.kind === SyntaxKind.DeleteExpression;
    }

    export function isTypeOfExpression(node: Node): node is TypeOfExpression {
        return node.kind === SyntaxKind.TypeOfExpression;
    }

    export function isVoidExpression(node: Node): node is VoidExpression {
        return node.kind === SyntaxKind.VoidExpression;
    }

    export function isAwaitExpression(node: Node): node is AwaitExpression {
        return node.kind === SyntaxKind.AwaitExpression;
    }

    export function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression {
        return node.kind === SyntaxKind.PrefixUnaryExpression;
    }

    export function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression {
        return node.kind === SyntaxKind.PostfixUnaryExpression;
    }

    export function isBinaryExpression(node: Node): node is BinaryExpression {
        return node.kind === SyntaxKind.BinaryExpression;
    }

    export function isConditionalExpression(node: Node): node is ConditionalExpression {
        return node.kind === SyntaxKind.ConditionalExpression;
    }

    export function isTemplateExpression(node: Node): node is TemplateExpression {
        return node.kind === SyntaxKind.TemplateExpression;
    }

    export function isYieldExpression(node: Node): node is YieldExpression {
        return node.kind === SyntaxKind.YieldExpression;
    }

    export function isSpreadElement(node: Node): node is SpreadElement {
        return node.kind === SyntaxKind.SpreadElement;
    }

    export function isClassExpression(node: Node): node is ClassExpression {
        return node.kind === SyntaxKind.ClassExpression;
    }

    export function isOmittedExpression(node: Node): node is OmittedExpression {
        return node.kind === SyntaxKind.OmittedExpression;
    }

    export function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments {
        return node.kind === SyntaxKind.ExpressionWithTypeArguments;
    }

    export function isAsExpression(node: Node): node is AsExpression {
        return node.kind === SyntaxKind.AsExpression;
    }

    export function isNonNullExpression(node: Node): node is NonNullExpression {
        return node.kind === SyntaxKind.NonNullExpression;
    }

    export function isNonNullChain(node: Node): node is NonNullChain {
        return isNonNullExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
    }

    export function isMetaProperty(node: Node): node is MetaProperty {
        return node.kind === SyntaxKind.MetaProperty;
    }

    // Misc

    export function isTemplateSpan(node: Node): node is TemplateSpan {
        return node.kind === SyntaxKind.TemplateSpan;
    }

    export function isSemicolonClassElement(node: Node): node is SemicolonClassElement {
        return node.kind === SyntaxKind.SemicolonClassElement;
    }

    // Block

    export function isBlock(node: Node): node is Block {
        return node.kind === SyntaxKind.Block;
    }

    export function isVariableStatement(node: Node): node is VariableStatement {
        return node.kind === SyntaxKind.VariableStatement;
    }

    export function isEmptyStatement(node: Node): node is EmptyStatement {
        return node.kind === SyntaxKind.EmptyStatement;
    }

    export function isExpressionStatement(node: Node): node is ExpressionStatement {
        return node.kind === SyntaxKind.ExpressionStatement;
    }

    export function isIfStatement(node: Node): node is IfStatement {
        return node.kind === SyntaxKind.IfStatement;
    }

    export function isDoStatement(node: Node): node is DoStatement {
        return node.kind === SyntaxKind.DoStatement;
    }

    export function isWhileStatement(node: Node): node is WhileStatement {
        return node.kind === SyntaxKind.WhileStatement;
    }

    export function isForStatement(node: Node): node is ForStatement {
        return node.kind === SyntaxKind.ForStatement;
    }

    export function isForInStatement(node: Node): node is ForInStatement {
        return node.kind === SyntaxKind.ForInStatement;
    }

    export function isForOfStatement(node: Node): node is ForOfStatement {
        return node.kind === SyntaxKind.ForOfStatement;
    }

    export function isContinueStatement(node: Node): node is ContinueStatement {
        return node.kind === SyntaxKind.ContinueStatement;
    }

    export function isBreakStatement(node: Node): node is BreakStatement {
        return node.kind === SyntaxKind.BreakStatement;
    }

    export function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement {
        return node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement;
    }

    export function isReturnStatement(node: Node): node is ReturnStatement {
        return node.kind === SyntaxKind.ReturnStatement;
    }

    export function isWithStatement(node: Node): node is WithStatement {
        return node.kind === SyntaxKind.WithStatement;
    }

    export function isSwitchStatement(node: Node): node is SwitchStatement {
        return node.kind === SyntaxKind.SwitchStatement;
    }

    export function isLabeledStatement(node: Node): node is LabeledStatement {
        return node.kind === SyntaxKind.LabeledStatement;
    }

    export function isThrowStatement(node: Node): node is ThrowStatement {
        return node.kind === SyntaxKind.ThrowStatement;
    }

    export function isTryStatement(node: Node): node is TryStatement {
        return node.kind === SyntaxKind.TryStatement;
    }

    export function isDebuggerStatement(node: Node): node is DebuggerStatement {
        return node.kind === SyntaxKind.DebuggerStatement;
    }

    export function isVariableDeclaration(node: Node): node is VariableDeclaration {
        return node.kind === SyntaxKind.VariableDeclaration;
    }

    export function isVariableDeclarationList(node: Node): node is VariableDeclarationList {
        return node.kind === SyntaxKind.VariableDeclarationList;
    }

    export function isFunctionDeclaration(node: Node): node is FunctionDeclaration {
        return node.kind === SyntaxKind.FunctionDeclaration;
    }

    export function isClassDeclaration(node: Node): node is ClassDeclaration {
        return node.kind === SyntaxKind.ClassDeclaration;
    }

    export function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration {
        return node.kind === SyntaxKind.InterfaceDeclaration;
    }

    export function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration {
        return node.kind === SyntaxKind.TypeAliasDeclaration;
    }

    export function isEnumDeclaration(node: Node): node is EnumDeclaration {
        return node.kind === SyntaxKind.EnumDeclaration;
    }

    export function isModuleDeclaration(node: Node): node is ModuleDeclaration {
        return node.kind === SyntaxKind.ModuleDeclaration;
    }

    export function isModuleBlock(node: Node): node is ModuleBlock {
        return node.kind === SyntaxKind.ModuleBlock;
    }

    export function isCaseBlock(node: Node): node is CaseBlock {
        return node.kind === SyntaxKind.CaseBlock;
    }

    export function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration {
        return node.kind === SyntaxKind.NamespaceExportDeclaration;
    }

    export function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration {
        return node.kind === SyntaxKind.ImportEqualsDeclaration;
    }

    export function isImportDeclaration(node: Node): node is ImportDeclaration {
        return node.kind === SyntaxKind.ImportDeclaration;
    }

    export function isImportClause(node: Node): node is ImportClause {
        return node.kind === SyntaxKind.ImportClause;
    }

    export function isNamespaceImport(node: Node): node is NamespaceImport {
        return node.kind === SyntaxKind.NamespaceImport;
    }

    export function isNamespaceExport(node: Node): node is NamespaceExport {
        return node.kind === SyntaxKind.NamespaceExport;
    }

    export function isNamedExportBindings(node: Node): node is NamedExportBindings {
        return node.kind === SyntaxKind.NamespaceExport || node.kind === SyntaxKind.NamedExports;
    }

    export function isNamedImports(node: Node): node is NamedImports {
        return node.kind === SyntaxKind.NamedImports;
    }

    export function isImportSpecifier(node: Node): node is ImportSpecifier {
        return node.kind === SyntaxKind.ImportSpecifier;
    }

    export function isExportAssignment(node: Node): node is ExportAssignment {
        return node.kind === SyntaxKind.ExportAssignment;
    }

    export function isExportDeclaration(node: Node): node is ExportDeclaration {
        return node.kind === SyntaxKind.ExportDeclaration;
    }

    export function isNamedExports(node: Node): node is NamedExports {
        return node.kind === SyntaxKind.NamedExports;
    }

    export function isExportSpecifier(node: Node): node is ExportSpecifier {
        return node.kind === SyntaxKind.ExportSpecifier;
    }

    export function isMissingDeclaration(node: Node): node is MissingDeclaration {
        return node.kind === SyntaxKind.MissingDeclaration;
    }

    // Module References

    export function isExternalModuleReference(node: Node): node is ExternalModuleReference {
        return node.kind === SyntaxKind.ExternalModuleReference;
    }

    // JSX

    export function isJsxElement(node: Node): node is JsxElement {
        return node.kind === SyntaxKind.JsxElement;
    }

    export function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement {
        return node.kind === SyntaxKind.JsxSelfClosingElement;
    }

    export function isJsxOpeningElement(node: Node): node is JsxOpeningElement {
        return node.kind === SyntaxKind.JsxOpeningElement;
    }

    export function isJsxClosingElement(node: Node): node is JsxClosingElement {
        return node.kind === SyntaxKind.JsxClosingElement;
    }

    export function isJsxFragment(node: Node): node is JsxFragment {
        return node.kind === SyntaxKind.JsxFragment;
    }

    export function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment {
        return node.kind === SyntaxKind.JsxOpeningFragment;
    }

    export function isJsxClosingFragment(node: Node): node is JsxClosingFragment {
        return node.kind === SyntaxKind.JsxClosingFragment;
    }

    export function isJsxAttribute(node: Node): node is JsxAttribute {
        return node.kind === SyntaxKind.JsxAttribute;
    }

    export function isJsxAttributes(node: Node): node is JsxAttributes {
        return node.kind === SyntaxKind.JsxAttributes;
    }

    export function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute {
        return node.kind === SyntaxKind.JsxSpreadAttribute;
    }

    export function isJsxExpression(node: Node): node is JsxExpression {
        return node.kind === SyntaxKind.JsxExpression;
    }

    // Clauses

    export function isCaseClause(node: Node): node is CaseClause {
        return node.kind === SyntaxKind.CaseClause;
    }

    export function isDefaultClause(node: Node): node is DefaultClause {
        return node.kind === SyntaxKind.DefaultClause;
    }

    export function isHeritageClause(node: Node): node is HeritageClause {
        return node.kind === SyntaxKind.HeritageClause;
    }

    export function isCatchClause(node: Node): node is CatchClause {
        return node.kind === SyntaxKind.CatchClause;
    }

    // Property assignments

    export function isPropertyAssignment(node: Node): node is PropertyAssignment {
        return node.kind === SyntaxKind.PropertyAssignment;
    }

    export function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment {
        return node.kind === SyntaxKind.ShorthandPropertyAssignment;
    }

    export function isSpreadAssignment(node: Node): node is SpreadAssignment {
        return node.kind === SyntaxKind.SpreadAssignment;
    }

    // Enum

    export function isEnumMember(node: Node): node is EnumMember {
        return node.kind === SyntaxKind.EnumMember;
    }

    // Top-level nodes
    export function isSourceFile(node: Node): node is SourceFile {
        return node.kind === SyntaxKind.SourceFile;
    }

    export function isBundle(node: Node): node is Bundle {
        return node.kind === SyntaxKind.Bundle;
    }

    export function isUnparsedSource(node: Node): node is UnparsedSource {
        return node.kind === SyntaxKind.UnparsedSource;
    }

    export function isUnparsedPrepend(node: Node): node is UnparsedPrepend {
        return node.kind === SyntaxKind.UnparsedPrepend;
    }

    export function isUnparsedTextLike(node: Node): node is UnparsedTextLike {
        switch (node.kind) {
            case SyntaxKind.UnparsedText:
            case SyntaxKind.UnparsedInternalText:
                return true;
            default:
                return false;
        }
    }

    export function isUnparsedNode(node: Node): node is UnparsedNode {
        return isUnparsedTextLike(node) ||
            node.kind === SyntaxKind.UnparsedPrologue ||
            node.kind === SyntaxKind.UnparsedSyntheticReference;
    }

    // JSDoc

    export function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression {
        return node.kind === SyntaxKind.JSDocTypeExpression;
    }

    export function isJSDocAllType(node: Node): node is JSDocAllType {
        return node.kind === SyntaxKind.JSDocAllType;
    }

    export function isJSDocUnknownType(node: Node): node is JSDocUnknownType {
        return node.kind === SyntaxKind.JSDocUnknownType;
    }

    export function isJSDocNullableType(node: Node): node is JSDocNullableType {
        return node.kind === SyntaxKind.JSDocNullableType;
    }

    export function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType {
        return node.kind === SyntaxKind.JSDocNonNullableType;
    }

    export function isJSDocOptionalType(node: Node): node is JSDocOptionalType {
        return node.kind === SyntaxKind.JSDocOptionalType;
    }

    export function isJSDocFunctionType(node: Node): node is JSDocFunctionType {
        return node.kind === SyntaxKind.JSDocFunctionType;
    }

    export function isJSDocVariadicType(node: Node): node is JSDocVariadicType {
        return node.kind === SyntaxKind.JSDocVariadicType;
    }

    export function isJSDoc(node: Node): node is JSDoc {
        return node.kind === SyntaxKind.JSDocComment;
    }

    export function isJSDocAuthorTag(node: Node): node is JSDocAuthorTag {
        return node.kind === SyntaxKind.JSDocAuthorTag;
    }

    export function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag {
        return node.kind === SyntaxKind.JSDocAugmentsTag;
    }

    export function isJSDocImplementsTag(node: Node): node is JSDocImplementsTag {
        return node.kind === SyntaxKind.JSDocImplementsTag;
    }

    export function isJSDocClassTag(node: Node): node is JSDocClassTag {
        return node.kind === SyntaxKind.JSDocClassTag;
    }

    export function isJSDocPublicTag(node: Node): node is JSDocPublicTag {
        return node.kind === SyntaxKind.JSDocPublicTag;
    }

    export function isJSDocPrivateTag(node: Node): node is JSDocPrivateTag {
        return node.kind === SyntaxKind.JSDocPrivateTag;
    }

    export function isJSDocProtectedTag(node: Node): node is JSDocProtectedTag {
        return node.kind === SyntaxKind.JSDocProtectedTag;
    }

    export function isJSDocReadonlyTag(node: Node): node is JSDocReadonlyTag {
        return node.kind === SyntaxKind.JSDocReadonlyTag;
    }

    export function isJSDocEnumTag(node: Node): node is JSDocEnumTag {
        return node.kind === SyntaxKind.JSDocEnumTag;
    }

    export function isJSDocThisTag(node: Node): node is JSDocThisTag {
        return node.kind === SyntaxKind.JSDocThisTag;
    }

    export function isJSDocParameterTag(node: Node): node is JSDocParameterTag {
        return node.kind === SyntaxKind.JSDocParameterTag;
    }

    export function isJSDocReturnTag(node: Node): node is JSDocReturnTag {
        return node.kind === SyntaxKind.JSDocReturnTag;
    }

    export function isJSDocTypeTag(node: Node): node is JSDocTypeTag {
        return node.kind === SyntaxKind.JSDocTypeTag;
    }

    export function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag {
        return node.kind === SyntaxKind.JSDocTemplateTag;
    }

    export function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag {
        return node.kind === SyntaxKind.JSDocTypedefTag;
    }

    export function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag {
        return node.kind === SyntaxKind.JSDocPropertyTag;
    }

    export function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
        return node.kind === SyntaxKind.JSDocPropertyTag || node.kind === SyntaxKind.JSDocParameterTag;
    }

    export function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral {
        return node.kind === SyntaxKind.JSDocTypeLiteral;
    }

    export function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag {
        return node.kind === SyntaxKind.JSDocCallbackTag;
    }

    export function isJSDocSignature(node: Node): node is JSDocSignature {
        return node.kind === SyntaxKind.JSDocSignature;
    }

    // #endregion

    // #region
    // Node tests
    //
    // All node tests in the following list should *not* reference parent pointers so that
    // they may be used with transformations.
    /* @internal */
    export function isSyntaxList(n: Node): n is SyntaxList {
        return n.kind === SyntaxKind.SyntaxList;
    }

    /* @internal */
    export function isNode(node: Node) {
        return isNodeKind(node.kind);
    }

    /* @internal */
    export function isNodeKind(kind: SyntaxKind) {
        return kind >= SyntaxKind.FirstNode;
    }

    /**
     * True if node is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    export function isToken(n: Node): boolean {
        return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
    }

    // Node Arrays

    /* @internal */
    export function isNodeArray<T extends Node>(array: readonly T[]): array is NodeArray<T> {
        return array.hasOwnProperty("pos") && array.hasOwnProperty("end");
    }

    // Literals

    /* @internal */
    export function isLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
    }

    export function isLiteralExpression(node: Node): node is LiteralExpression {
        return isLiteralKind(node.kind);
    }

    // Pseudo-literals

    /* @internal */
    export function isTemplateLiteralKind(kind: SyntaxKind): boolean {
        return SyntaxKind.FirstTemplateToken <= kind && kind <= SyntaxKind.LastTemplateToken;
    }

    export type TemplateLiteralToken = NoSubstitutionTemplateLiteral | TemplateHead | TemplateMiddle | TemplateTail;
    export function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken {
        return isTemplateLiteralKind(node.kind);
    }

    export function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail {
        const kind = node.kind;
        return kind === SyntaxKind.TemplateMiddle
            || kind === SyntaxKind.TemplateTail;
    }

    export function isImportOrExportSpecifier(node: Node): node is ImportSpecifier | ExportSpecifier {
        return isImportSpecifier(node) || isExportSpecifier(node);
    }

    export function isTypeOnlyImportOrExportDeclaration(node: Node): node is TypeOnlyCompatibleAliasDeclaration {
        switch (node.kind) {
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
                return (node as ImportOrExportSpecifier).parent.parent.isTypeOnly;
            case SyntaxKind.NamespaceImport:
                return (node as NamespaceImport).parent.isTypeOnly;
            case SyntaxKind.ImportClause:
                return (node as ImportClause).isTypeOnly;
            default:
                return false;
        }
    }

    export function isStringTextContainingNode(node: Node): node is StringLiteral | TemplateLiteralToken {
        return node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind);
    }

    // Identifiers

    /* @internal */
    export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
        return isIdentifier(node) && (node.autoGenerateFlags! & GeneratedIdentifierFlags.KindMask) > GeneratedIdentifierFlags.None;
    }

    // Private Identifiers
    /*@internal*/
    export function isPrivateIdentifierPropertyDeclaration(node: Node): node is PrivateIdentifierPropertyDeclaration {
        return isPropertyDeclaration(node) && isPrivateIdentifier(node.name);
    }

    /*@internal*/
    export function isPrivateIdentifierPropertyAccessExpression(node: Node): node is PrivateIdentifierPropertyAccessExpression {
        return isPropertyAccessExpression(node) && isPrivateIdentifier(node.name);
    }

    // Keywords

    /* @internal */
    export function isModifierKind(token: SyntaxKind): token is Modifier["kind"] {
        switch (token) {
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.DefaultKeyword:
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.StaticKeyword:
                return true;
        }
        return false;
    }

    /* @internal */
    export function isParameterPropertyModifier(kind: SyntaxKind): boolean {
        return !!(modifierToFlag(kind) & ModifierFlags.ParameterPropertyModifier);
    }

    /* @internal */
    export function isClassMemberModifier(idToken: SyntaxKind): boolean {
        return isParameterPropertyModifier(idToken) || idToken === SyntaxKind.StaticKeyword;
    }

    export function isModifier(node: Node): node is Modifier {
        return isModifierKind(node.kind);
    }

    export function isEntityName(node: Node): node is EntityName {
        const kind = node.kind;
        return kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.Identifier;
    }

    export function isPropertyName(node: Node): node is PropertyName {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.PrivateIdentifier
            || kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NumericLiteral
            || kind === SyntaxKind.ComputedPropertyName;
    }

    export function isBindingName(node: Node): node is BindingName {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.ObjectBindingPattern
            || kind === SyntaxKind.ArrayBindingPattern;
    }

    // Functions

    export function isFunctionLike(node: Node): node is SignatureDeclaration {
        return node && isFunctionLikeKind(node.kind);
    }

    /* @internal */
    export function isFunctionLikeDeclaration(node: Node): node is FunctionLikeDeclaration {
        return node && isFunctionLikeDeclarationKind(node.kind);
    }

    function isFunctionLikeDeclarationKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return true;
            default:
                return false;
        }
    }

    /* @internal */
    export function isFunctionLikeKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.JSDocSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.ConstructorType:
                return true;
            default:
                return isFunctionLikeDeclarationKind(kind);
        }
    }

    /* @internal */
    export function isFunctionOrModuleBlock(node: Node): boolean {
        return isSourceFile(node) || isModuleBlock(node) || isBlock(node) && isFunctionLike(node.parent);
    }

    // Classes
    export function isClassElement(node: Node): node is ClassElement {
        const kind = node.kind;
        return kind === SyntaxKind.Constructor
            || kind === SyntaxKind.PropertyDeclaration
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.IndexSignature
            || kind === SyntaxKind.SemicolonClassElement;
    }

    export function isClassLike(node: Node): node is ClassLikeDeclaration {
        return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
    }

    export function isAccessor(node: Node): node is AccessorDeclaration {
        return node && (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor);
    }

    /* @internal */
    export function isMethodOrAccessor(node: Node): node is MethodDeclaration | AccessorDeclaration {
        switch (node.kind) {
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    // Type members

    export function isTypeElement(node: Node): node is TypeElement {
        const kind = node.kind;
        return kind === SyntaxKind.ConstructSignature
            || kind === SyntaxKind.CallSignature
            || kind === SyntaxKind.PropertySignature
            || kind === SyntaxKind.MethodSignature
            || kind === SyntaxKind.IndexSignature;
    }

    export function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement {
        return isTypeElement(node) || isClassElement(node);
    }

    export function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAssignment
            || kind === SyntaxKind.ShorthandPropertyAssignment
            || kind === SyntaxKind.SpreadAssignment
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.SetAccessor;
    }

    // Type

    /**
     * Node test that determines whether a node is a valid type node.
     * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
     * of a TypeNode.
     */
    export function isTypeNode(node: Node): node is TypeNode {
        return isTypeNodeKind(node.kind);
    }

    export function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode {
        switch (node.kind) {
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
                return true;
        }

        return false;
    }

    // Binding patterns

    /* @internal */
    export function isBindingPattern(node: Node | undefined): node is BindingPattern {
        if (node) {
            const kind = node.kind;
            return kind === SyntaxKind.ArrayBindingPattern
                || kind === SyntaxKind.ObjectBindingPattern;
        }

        return false;
    }

    /* @internal */
    export function isAssignmentPattern(node: Node): node is AssignmentPattern {
        const kind = node.kind;
        return kind === SyntaxKind.ArrayLiteralExpression
            || kind === SyntaxKind.ObjectLiteralExpression;
    }


    /* @internal */
    export function isArrayBindingElement(node: Node): node is ArrayBindingElement {
        const kind = node.kind;
        return kind === SyntaxKind.BindingElement
            || kind === SyntaxKind.OmittedExpression;
    }


    /**
     * Determines whether the BindingOrAssignmentElement is a BindingElement-like declaration
     */
    /* @internal */
    export function isDeclarationBindingElement(bindingElement: BindingOrAssignmentElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement {
        switch (bindingElement.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                return true;
        }

        return false;
    }

    /**
     * Determines whether a node is a BindingOrAssignmentPattern
     */
    /* @internal */
    export function isBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is BindingOrAssignmentPattern {
        return isObjectBindingOrAssignmentPattern(node)
            || isArrayBindingOrAssignmentPattern(node);
    }

    /**
     * Determines whether a node is an ObjectBindingOrAssignmentPattern
     */
    /* @internal */
    export function isObjectBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ObjectBindingOrAssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ObjectLiteralExpression:
                return true;
        }

        return false;
    }

    /**
     * Determines whether a node is an ArrayBindingOrAssignmentPattern
     */
    /* @internal */
    export function isArrayBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ArrayBindingOrAssignmentPattern {
        switch (node.kind) {
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                return true;
        }

        return false;
    }

    /* @internal */
    export function isPropertyAccessOrQualifiedNameOrImportTypeNode(node: Node): node is PropertyAccessExpression | QualifiedName | ImportTypeNode {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.ImportType;
    }

    // Expression

    export function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName {
        const kind = node.kind;
        return kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.QualifiedName;
    }

    export function isCallLikeExpression(node: Node): node is CallLikeExpression {
        switch (node.kind) {
            case SyntaxKind.JsxOpeningElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.Decorator:
                return true;
            default:
                return false;
        }
    }

    export function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression {
        return node.kind === SyntaxKind.CallExpression || node.kind === SyntaxKind.NewExpression;
    }

    export function isTemplateLiteral(node: Node): node is TemplateLiteral {
        const kind = node.kind;
        return kind === SyntaxKind.TemplateExpression
            || kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    /* @internal */
    export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
        return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.CallExpression:
            case SyntaxKind.JsxElement:
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxFragment:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Identifier:
            case SyntaxKind.RegularExpressionLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NonNullExpression:
            case SyntaxKind.MetaProperty:
            case SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
                return true;
            default:
                return false;
        }
    }

    /* @internal */
    export function isUnaryExpression(node: Node): node is UnaryExpression {
        return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isUnaryExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.TypeAssertionExpression:
                return true;
            default:
                return isLeftHandSideExpressionKind(kind);
        }
    }

    /* @internal */
    export function isUnaryExpressionWithWrite(expr: Node): expr is PrefixUnaryExpression | PostfixUnaryExpression {
        switch (expr.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                return true;
            case SyntaxKind.PrefixUnaryExpression:
                return (<PrefixUnaryExpression>expr).operator === SyntaxKind.PlusPlusToken ||
                    (<PrefixUnaryExpression>expr).operator === SyntaxKind.MinusMinusToken;
            default:
                return false;
        }
    }

    /* @internal */
    /**
     * Determines whether a node is an expression based only on its kind.
     * Use `isExpressionNode` if not in transforms.
     */
    export function isExpression(node: Node): node is Expression {
        return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
    }

    function isExpressionKind(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.AsExpression:
            case SyntaxKind.OmittedExpression:
            case SyntaxKind.CommaListExpression:
            case SyntaxKind.PartiallyEmittedExpression:
                return true;
            default:
                return isUnaryExpressionKind(kind);
        }
    }

    export function isAssertionExpression(node: Node): node is AssertionExpression {
        const kind = node.kind;
        return kind === SyntaxKind.TypeAssertionExpression
            || kind === SyntaxKind.AsExpression;
    }

    /* @internal */
    export function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression {
        return node.kind === SyntaxKind.PartiallyEmittedExpression;
    }

    /* @internal */
    export function isNotEmittedStatement(node: Node): node is NotEmittedStatement {
        return node.kind === SyntaxKind.NotEmittedStatement;
    }

    /* @internal */
    export function isSyntheticReference(node: Node): node is SyntheticReferenceExpression {
        return node.kind === SyntaxKind.SyntheticReferenceExpression;
    }

    /* @internal */
    export function isNotEmittedOrPartiallyEmittedNode(node: Node): node is NotEmittedStatement | PartiallyEmittedExpression {
        return isNotEmittedStatement(node)
            || isPartiallyEmittedExpression(node);
    }

    // Statement

    export function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
    export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement | LabeledStatement;
    export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement {
        switch (node.kind) {
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
                return true;
            case SyntaxKind.LabeledStatement:
                return lookInLabeledStatements && isIterationStatement((<LabeledStatement>node).statement, lookInLabeledStatements);
        }

        return false;
    }

    /* @internal */
    export function isScopeMarker(node: Node) {
        return isExportAssignment(node) || isExportDeclaration(node);
    }

    /* @internal */
    export function hasScopeMarker(statements: readonly Statement[]) {
        return some(statements, isScopeMarker);
    }

    /* @internal */
    export function needsScopeMarker(result: Statement) {
        return !isAnyImportOrReExport(result) && !isExportAssignment(result) && !hasSyntacticModifier(result, ModifierFlags.Export) && !isAmbientModule(result);
    }

    /* @internal */
    export function isExternalModuleIndicator(result: Statement) {
        // Exported top-level member indicates moduleness
        return isAnyImportOrReExport(result) || isExportAssignment(result) || hasSyntacticModifier(result, ModifierFlags.Export);
    }

    /* @internal */
    export function isForInOrOfStatement(node: Node): node is ForInOrOfStatement {
        return node.kind === SyntaxKind.ForInStatement || node.kind === SyntaxKind.ForOfStatement;
    }

    // Element

    /* @internal */
    export function isConciseBody(node: Node): node is ConciseBody {
        return isBlock(node)
            || isExpression(node);
    }

    /* @internal */
    export function isFunctionBody(node: Node): node is FunctionBody {
        return isBlock(node);
    }

    /* @internal */
    export function isForInitializer(node: Node): node is ForInitializer {
        return isVariableDeclarationList(node)
            || isExpression(node);
    }

    /* @internal */
    export function isModuleBody(node: Node): node is ModuleBody {
        const kind = node.kind;
        return kind === SyntaxKind.ModuleBlock
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.Identifier;
    }

    /* @internal */
    export function isNamespaceBody(node: Node): node is NamespaceBody {
        const kind = node.kind;
        return kind === SyntaxKind.ModuleBlock
            || kind === SyntaxKind.ModuleDeclaration;
    }

    /* @internal */
    export function isJSDocNamespaceBody(node: Node): node is JSDocNamespaceBody {
        const kind = node.kind;
        return kind === SyntaxKind.Identifier
            || kind === SyntaxKind.ModuleDeclaration;
    }

    /* @internal */
    export function isNamedImportBindings(node: Node): node is NamedImportBindings {
        const kind = node.kind;
        return kind === SyntaxKind.NamedImports
            || kind === SyntaxKind.NamespaceImport;
    }

    /* @internal */
    export function isModuleOrEnumDeclaration(node: Node): node is ModuleDeclaration | EnumDeclaration {
        return node.kind === SyntaxKind.ModuleDeclaration || node.kind === SyntaxKind.EnumDeclaration;
    }

    function isDeclarationKind(kind: SyntaxKind) {
        return kind === SyntaxKind.ArrowFunction
            || kind === SyntaxKind.BindingElement
            || kind === SyntaxKind.ClassDeclaration
            || kind === SyntaxKind.ClassExpression
            || kind === SyntaxKind.Constructor
            || kind === SyntaxKind.EnumDeclaration
            || kind === SyntaxKind.EnumMember
            || kind === SyntaxKind.ExportSpecifier
            || kind === SyntaxKind.FunctionDeclaration
            || kind === SyntaxKind.FunctionExpression
            || kind === SyntaxKind.GetAccessor
            || kind === SyntaxKind.ImportClause
            || kind === SyntaxKind.ImportEqualsDeclaration
            || kind === SyntaxKind.ImportSpecifier
            || kind === SyntaxKind.InterfaceDeclaration
            || kind === SyntaxKind.JsxAttribute
            || kind === SyntaxKind.MethodDeclaration
            || kind === SyntaxKind.MethodSignature
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.NamespaceExportDeclaration
            || kind === SyntaxKind.NamespaceImport
            || kind === SyntaxKind.NamespaceExport
            || kind === SyntaxKind.Parameter
            || kind === SyntaxKind.PropertyAssignment
            || kind === SyntaxKind.PropertyDeclaration
            || kind === SyntaxKind.PropertySignature
            || kind === SyntaxKind.SetAccessor
            || kind === SyntaxKind.ShorthandPropertyAssignment
            || kind === SyntaxKind.TypeAliasDeclaration
            || kind === SyntaxKind.TypeParameter
            || kind === SyntaxKind.VariableDeclaration
            || kind === SyntaxKind.JSDocTypedefTag
            || kind === SyntaxKind.JSDocCallbackTag
            || kind === SyntaxKind.JSDocPropertyTag;
    }

    function isDeclarationStatementKind(kind: SyntaxKind) {
        return kind === SyntaxKind.FunctionDeclaration
            || kind === SyntaxKind.MissingDeclaration
            || kind === SyntaxKind.ClassDeclaration
            || kind === SyntaxKind.InterfaceDeclaration
            || kind === SyntaxKind.TypeAliasDeclaration
            || kind === SyntaxKind.EnumDeclaration
            || kind === SyntaxKind.ModuleDeclaration
            || kind === SyntaxKind.ImportDeclaration
            || kind === SyntaxKind.ImportEqualsDeclaration
            || kind === SyntaxKind.ExportDeclaration
            || kind === SyntaxKind.ExportAssignment
            || kind === SyntaxKind.NamespaceExportDeclaration;
    }

    function isStatementKindButNotDeclarationKind(kind: SyntaxKind) {
        return kind === SyntaxKind.BreakStatement
            || kind === SyntaxKind.ContinueStatement
            || kind === SyntaxKind.DebuggerStatement
            || kind === SyntaxKind.DoStatement
            || kind === SyntaxKind.ExpressionStatement
            || kind === SyntaxKind.EmptyStatement
            || kind === SyntaxKind.ForInStatement
            || kind === SyntaxKind.ForOfStatement
            || kind === SyntaxKind.ForStatement
            || kind === SyntaxKind.IfStatement
            || kind === SyntaxKind.LabeledStatement
            || kind === SyntaxKind.ReturnStatement
            || kind === SyntaxKind.SwitchStatement
            || kind === SyntaxKind.ThrowStatement
            || kind === SyntaxKind.TryStatement
            || kind === SyntaxKind.VariableStatement
            || kind === SyntaxKind.WhileStatement
            || kind === SyntaxKind.WithStatement
            || kind === SyntaxKind.NotEmittedStatement
            || kind === SyntaxKind.EndOfDeclarationMarker
            || kind === SyntaxKind.MergeDeclarationMarker;
    }

    /* @internal */
    export function isDeclaration(node: Node): node is NamedDeclaration {
        if (node.kind === SyntaxKind.TypeParameter) {
            return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag) || isInJSFile(node);
        }

        return isDeclarationKind(node.kind);
    }

    /* @internal */
    export function isDeclarationStatement(node: Node): node is DeclarationStatement {
        return isDeclarationStatementKind(node.kind);
    }

    /**
     * Determines whether the node is a statement that is not also a declaration
     */
    /* @internal */
    export function isStatementButNotDeclaration(node: Node): node is Statement {
        return isStatementKindButNotDeclarationKind(node.kind);
    }

    /* @internal */
    export function isStatement(node: Node): node is Statement {
        const kind = node.kind;
        return isStatementKindButNotDeclarationKind(kind)
            || isDeclarationStatementKind(kind)
            || isBlockStatement(node);
    }

    function isBlockStatement(node: Node): node is Block {
        if (node.kind !== SyntaxKind.Block) return false;
        if (node.parent !== undefined) {
            if (node.parent.kind === SyntaxKind.TryStatement || node.parent.kind === SyntaxKind.CatchClause) {
                return false;
            }
        }
        return !isFunctionBlock(node);
    }

    // Module references

    /* @internal */
    export function isModuleReference(node: Node): node is ModuleReference {
        const kind = node.kind;
        return kind === SyntaxKind.ExternalModuleReference
            || kind === SyntaxKind.QualifiedName
            || kind === SyntaxKind.Identifier;
    }

    // JSX

    /* @internal */
    export function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression {
        const kind = node.kind;
        return kind === SyntaxKind.ThisKeyword
            || kind === SyntaxKind.Identifier
            || kind === SyntaxKind.PropertyAccessExpression;
    }

    /* @internal */
    export function isJsxChild(node: Node): node is JsxChild {
        const kind = node.kind;
        return kind === SyntaxKind.JsxElement
            || kind === SyntaxKind.JsxExpression
            || kind === SyntaxKind.JsxSelfClosingElement
            || kind === SyntaxKind.JsxText
            || kind === SyntaxKind.JsxFragment;
    }

    /* @internal */
    export function isJsxAttributeLike(node: Node): node is JsxAttributeLike {
        const kind = node.kind;
        return kind === SyntaxKind.JsxAttribute
            || kind === SyntaxKind.JsxSpreadAttribute;
    }

    /* @internal */
    export function isStringLiteralOrJsxExpression(node: Node): node is StringLiteral | JsxExpression {
        const kind = node.kind;
        return kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.JsxExpression;
    }

    export function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement {
        const kind = node.kind;
        return kind === SyntaxKind.JsxOpeningElement
            || kind === SyntaxKind.JsxSelfClosingElement;
    }

    // Clauses

    export function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause {
        const kind = node.kind;
        return kind === SyntaxKind.CaseClause
            || kind === SyntaxKind.DefaultClause;
    }

    // JSDoc

    /** True if node is of some JSDoc syntax kind. */
    /* @internal */
    export function isJSDocNode(node: Node): boolean {
        return node.kind >= SyntaxKind.FirstJSDocNode && node.kind <= SyntaxKind.LastJSDocNode;
    }

    /** True if node is of a kind that may contain comment text. */
    export function isJSDocCommentContainingNode(node: Node): boolean {
        return node.kind === SyntaxKind.JSDocComment || node.kind === SyntaxKind.JSDocNamepathType || isJSDocTag(node) || isJSDocTypeLiteral(node) || isJSDocSignature(node);
    }

    // TODO: determine what this does before making it public.
    /* @internal */
    export function isJSDocTag(node: Node): node is JSDocTag {
        return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
    }

    export function isSetAccessor(node: Node): node is SetAccessorDeclaration {
        return node.kind === SyntaxKind.SetAccessor;
    }

    export function isGetAccessor(node: Node): node is GetAccessorDeclaration {
        return node.kind === SyntaxKind.GetAccessor;
    }

    /** True if has jsdoc nodes attached to it. */
    /* @internal */
    // TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
    export function hasJSDocNodes(node: Node): node is HasJSDoc {
        const { jsDoc } = node as JSDocContainer;
        return !!jsDoc && jsDoc.length > 0;
    }

    /** True if has type node attached to it. */
    /* @internal */
    export function hasType(node: Node): node is HasType {
        return !!(node as HasType).type;
    }

    /** True if has initializer node attached to it. */
    /* @internal */
    export function hasInitializer(node: Node): node is HasInitializer {
        return !!(node as HasInitializer).initializer;
    }

    /** True if has initializer node attached to it. */
    export function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer {
        switch (node.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.EnumMember:
                return true;
            default:
                return false;
        }
    }

    export function isObjectLiteralElement(node: Node): node is ObjectLiteralElement {
        return node.kind === SyntaxKind.JsxAttribute || node.kind === SyntaxKind.JsxSpreadAttribute || isObjectLiteralElementLike(node);
    }

    /* @internal */
    export function isTypeReferenceType(node: Node): node is TypeReferenceType {
        return node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.ExpressionWithTypeArguments;
    }

    const MAX_SMI_X86 = 0x3fff_ffff;
    /* @internal */
    export function guessIndentation(lines: string[]) {
        let indentation = MAX_SMI_X86;
        for (const line of lines) {
            if (!line.length) {
                continue;
            }
            let i = 0;
            for (; i < line.length && i < indentation; i++) {
                if (!isWhiteSpaceLike(line.charCodeAt(i))) {
                    break;
                }
            }
            if (i < indentation) {
                indentation = i;
            }
            if (indentation === 0) {
                return 0;
            }
        }
        return indentation === MAX_SMI_X86 ? undefined : indentation;
    }

    export function isStringLiteralLike(node: Node): node is StringLiteralLike {
        return node.kind === SyntaxKind.StringLiteral || node.kind === SyntaxKind.NoSubstitutionTemplateLiteral;
    }

    // #endregion
}
