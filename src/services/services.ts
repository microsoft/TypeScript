/// <reference path="..\compiler\program.ts"/>
/// <reference path="..\compiler\commandLineParser.ts"/>

/// <reference path='types.ts' />
/// <reference path='utilities.ts' />
/// <reference path='breakpoints.ts' />
/// <reference path='classifier.ts' />
/// <reference path='completions.ts' />
/// <reference path='documentHighlights.ts' />
/// <reference path='documentRegistry.ts' />
/// <reference path='findAllReferences.ts' />
/// <reference path='goToDefinition.ts' />
/// <reference path='jsDoc.ts' />
/// <reference path='jsTyping.ts' />
/// <reference path='navigateTo.ts' />
/// <reference path='navigationBar.ts' />
/// <reference path='outliningElementsCollector.ts' />
/// <reference path='patternMatcher.ts' />
/// <reference path='preProcess.ts' />
/// <reference path='rename.ts' />
/// <reference path='signatureHelp.ts' />
/// <reference path='symbolDisplay.ts' />
/// <reference path='transpile.ts' />
/// <reference path='formatting\formatting.ts' />
/// <reference path='formatting\smartIndenter.ts' />
/// <reference path='textChanges.ts' />
/// <reference path='codeFixProvider.ts' />
/// <reference path='refactorProvider.ts' />
/// <reference path='codefixes\fixes.ts' />
/// <reference path='refactors\refactors.ts' />

namespace ts {
    /** The version of the language service API */
    export const servicesVersion = "0.5";

    /* @internal */
    let ruleProvider: formatting.RulesProvider;

    function createNode<TKind extends SyntaxKind>(kind: TKind, pos: number, end: number, parent?: Node): NodeObject | TokenObject<TKind> | IdentifierObject {
        const node = isNodeKind(kind) ? new NodeObject(kind, pos, end) :
            kind === SyntaxKind.Identifier ? new IdentifierObject(SyntaxKind.Identifier, pos, end) :
                new TokenObject(kind, pos, end);
        node.parent = parent;
        return node;
    }

    class NodeObject implements Node {
        public kind: SyntaxKind;
        public pos: number;
        public end: number;
        public flags: NodeFlags;
        public parent: Node;
        public jsDoc: JSDoc[];
        public original: Node;
        public transformFlags: TransformFlags;
        private _children: Node[];

        constructor(kind: SyntaxKind, pos: number, end: number) {
            this.pos = pos;
            this.end = end;
            this.flags = NodeFlags.None;
            this.transformFlags = undefined;
            this.parent = undefined;
            this.kind = kind;
        }

        public getSourceFile(): SourceFile {
            return getSourceFileOfNode(this);
        }

        public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
            return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
        }

        public getFullStart(): number {
            return this.pos;
        }

        public getEnd(): number {
            return this.end;
        }

        public getWidth(sourceFile?: SourceFile): number {
            return this.getEnd() - this.getStart(sourceFile);
        }

        public getFullWidth(): number {
            return this.end - this.pos;
        }

        public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
            return this.getStart(sourceFile) - this.pos;
        }

        public getFullText(sourceFile?: SourceFile): string {
            return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
        }

        public getText(sourceFile?: SourceFile): string {
            if (!sourceFile) {
                sourceFile = this.getSourceFile();
            }
            return sourceFile.text.substring(this.getStart(sourceFile), this.getEnd());
        }

        private addSyntheticNodes(nodes: Node[], pos: number, end: number): number {
            scanner.setTextPos(pos);
            while (pos < end) {
                const token = scanner.scan();
                const textPos = scanner.getTextPos();
                if (textPos <= end) {
                    nodes.push(createNode(token, pos, textPos, this));
                }
                pos = textPos;
                if (token === SyntaxKind.EndOfFileToken) {
                    break;
                }
            }
            return pos;
        }

        private createSyntaxList(nodes: NodeArray<Node>): Node {
            const list = <NodeObject>createNode(SyntaxKind.SyntaxList, nodes.pos, nodes.end, this);
            list._children = [];
            let pos = nodes.pos;

            for (const node of nodes) {
                if (pos < node.pos) {
                    pos = this.addSyntheticNodes(list._children, pos, node.pos);
                }
                list._children.push(node);
                pos = node.end;
            }
            if (pos < nodes.end) {
                this.addSyntheticNodes(list._children, pos, nodes.end);
            }
            return list;
        }

        private createChildren(sourceFile?: SourceFileLike) {
            if (!isNodeKind(this.kind)) {
                this._children = emptyArray;
                return;
            }

            if (isJSDocCommentContainingNode(this)) {
                /** Don't add trivia for "tokens" since this is in a comment. */
                const children: Node[] = [];
                this.forEachChild(child => { children.push(child); });
                this._children = children;
                return;
            }

            const children: Node[] = [];
            scanner.setText((sourceFile || this.getSourceFile()).text);
            let pos = this.pos;
            const processNode = (node: Node) => {
                pos = this.addSyntheticNodes(children, pos, node.pos);
                children.push(node);
                pos = node.end;
            };
            const processNodes = (nodes: NodeArray<Node>) => {
                if (pos < nodes.pos) {
                    pos = this.addSyntheticNodes(children, pos, nodes.pos);
                }
                children.push(this.createSyntaxList(nodes));
                pos = nodes.end;
            };
            // jsDocComments need to be the first children
            if (this.jsDoc) {
                for (const jsDocComment of this.jsDoc) {
                    processNode(jsDocComment);
                }
            }
            // For syntactic classifications, all trivia are classcified together, including jsdoc comments.
            // For that to work, the jsdoc comments should still be the leading trivia of the first child.
            // Restoring the scanner position ensures that.
            pos = this.pos;
            forEachChild(this, processNode, processNodes);
            if (pos < this.end) {
                this.addSyntheticNodes(children, pos, this.end);
            }
            scanner.setText(undefined);
            this._children = children;
        }

        public getChildCount(sourceFile?: SourceFile): number {
            if (!this._children) this.createChildren(sourceFile);
            return this._children.length;
        }

        public getChildAt(index: number, sourceFile?: SourceFile): Node {
            if (!this._children) this.createChildren(sourceFile);
            return this._children[index];
        }

        public getChildren(sourceFile?: SourceFileLike): Node[] {
            if (!this._children) this.createChildren(sourceFile);
            return this._children;
        }

        public getFirstToken(sourceFile?: SourceFile): Node {
            const children = this.getChildren(sourceFile);
            if (!children.length) {
                return undefined;
            }

            const child = ts.find(children, kid => kid.kind < SyntaxKind.FirstJSDocNode || kid.kind > SyntaxKind.LastJSDocNode);
            return child.kind < SyntaxKind.FirstNode ?
                child :
                child.getFirstToken(sourceFile);
        }

        public getLastToken(sourceFile?: SourceFile): Node {
            const children = this.getChildren(sourceFile);

            const child = lastOrUndefined(children);
            if (!child) {
                return undefined;
            }

            return child.kind < SyntaxKind.FirstNode ? child : child.getLastToken(sourceFile);
        }

        public forEachChild<T>(cbNode: (node: Node) => T, cbNodeArray?: (nodes: NodeArray<Node>) => T): T {
            return forEachChild(this, cbNode, cbNodeArray);
        }
    }

    class TokenOrIdentifierObject implements Node {
        public kind: SyntaxKind;
        public pos: number;
        public end: number;
        public flags: NodeFlags;
        public parent: Node;
        public jsDocComments: JSDoc[];

        constructor(pos: number, end: number) {
            // Set properties in same order as NodeObject
            this.pos = pos;
            this.end = end;
            this.flags = NodeFlags.None;
            this.parent = undefined;
        }

        public getSourceFile(): SourceFile {
            return getSourceFileOfNode(this);
        }

        public getStart(sourceFile?: SourceFileLike, includeJsDocComment?: boolean): number {
            return getTokenPosOfNode(this, sourceFile, includeJsDocComment);
        }

        public getFullStart(): number {
            return this.pos;
        }

        public getEnd(): number {
            return this.end;
        }

        public getWidth(sourceFile?: SourceFile): number {
            return this.getEnd() - this.getStart(sourceFile);
        }

        public getFullWidth(): number {
            return this.end - this.pos;
        }

        public getLeadingTriviaWidth(sourceFile?: SourceFile): number {
            return this.getStart(sourceFile) - this.pos;
        }

        public getFullText(sourceFile?: SourceFile): string {
            return (sourceFile || this.getSourceFile()).text.substring(this.pos, this.end);
        }

        public getText(sourceFile?: SourceFile): string {
            return (sourceFile || this.getSourceFile()).text.substring(this.getStart(), this.getEnd());
        }

        public getChildCount(): number {
            return 0;
        }

        public getChildAt(): Node {
            return undefined;
        }

        public getChildren(): Node[] {
            return emptyArray;
        }

        public getFirstToken(): Node {
            return undefined;
        }

        public getLastToken(): Node {
            return undefined;
        }

        public forEachChild<T>(): T {
            return undefined;
        }
    }

    class SymbolObject implements Symbol {
        flags: SymbolFlags;
        escapedName: __String;
        declarations?: Declaration[];

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty array will be returned.
        documentationComment?: SymbolDisplayPart[];

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no JSDoc tags, then the empty array will be returned.
        tags?: JSDocTagInfo[];

        constructor(flags: SymbolFlags, name: __String) {
            this.flags = flags;
            this.escapedName = name;
        }

        getFlags(): SymbolFlags {
            return this.flags;
        }

        get name(): string {
            return unescapeLeadingUnderscores(this.escapedName);
        }

        getEscapedName(): __String {
            return this.escapedName;
        }

        getName(): string {
            return this.name;
        }

        getDeclarations(): Declaration[] | undefined {
            return this.declarations;
        }

        getDocumentationComment(): SymbolDisplayPart[] {
            if (this.documentationComment === undefined) {
                this.documentationComment = JsDoc.getJsDocCommentsFromDeclarations(this.declarations);
            }

            return this.documentationComment;
        }

        getJsDocTags(): JSDocTagInfo[] {
            if (this.tags === undefined) {
                this.tags = JsDoc.getJsDocTagsFromDeclarations(this.declarations);
            }

            return this.tags;
        }
    }

    class TokenObject<TKind extends SyntaxKind> extends TokenOrIdentifierObject implements Token<TKind> {
        public kind: TKind;

        constructor(kind: TKind, pos: number, end: number) {
            super(pos, end);
            this.kind = kind;
        }
    }

    class IdentifierObject extends TokenOrIdentifierObject implements Identifier {
        public kind: SyntaxKind.Identifier;
        public escapedText: __String;
        _primaryExpressionBrand: any;
        _memberExpressionBrand: any;
        _leftHandSideExpressionBrand: any;
        _updateExpressionBrand: any;
        _unaryExpressionBrand: any;
        _expressionBrand: any;
        /*@internal*/typeArguments: NodeArray<TypeNode>;
        constructor(_kind: SyntaxKind.Identifier, pos: number, end: number) {
            super(pos, end);
        }

        get text(): string {
            return unescapeLeadingUnderscores(this.escapedText);
        }
    }
    IdentifierObject.prototype.kind = SyntaxKind.Identifier;

    class TypeObject implements Type {
        checker: TypeChecker;
        flags: TypeFlags;
        objectFlags?: ObjectFlags;
        id: number;
        symbol?: Symbol;
        constructor(checker: TypeChecker, flags: TypeFlags) {
            this.checker = checker;
            this.flags = flags;
        }
        getFlags(): TypeFlags {
            return this.flags;
        }
        getSymbol(): Symbol | undefined {
            return this.symbol;
        }
        getProperties(): Symbol[] {
            return this.checker.getPropertiesOfType(this);
        }
        getProperty(propertyName: string): Symbol | undefined {
            return this.checker.getPropertyOfType(this, propertyName);
        }
        getApparentProperties(): Symbol[] {
            return this.checker.getAugmentedPropertiesOfType(this);
        }
        getCallSignatures(): Signature[] {
            return this.checker.getSignaturesOfType(this, SignatureKind.Call);
        }
        getConstructSignatures(): Signature[] {
            return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
        }
        getStringIndexType(): Type | undefined {
            return this.checker.getIndexTypeOfType(this, IndexKind.String);
        }
        getNumberIndexType(): Type | undefined {
            return this.checker.getIndexTypeOfType(this, IndexKind.Number);
        }
        getBaseTypes(): BaseType[] | undefined {
            return this.flags & TypeFlags.Object && this.objectFlags & (ObjectFlags.Class | ObjectFlags.Interface)
                ? this.checker.getBaseTypes(<InterfaceType><Type>this)
                : undefined;
        }
        getNonNullableType(): Type {
            return this.checker.getNonNullableType(this);
        }
    }

    class SignatureObject implements Signature {
        checker: TypeChecker;
        declaration: SignatureDeclaration;
        typeParameters?: TypeParameter[];
        parameters: Symbol[];
        thisParameter: Symbol;
        resolvedReturnType: Type;
        minTypeArgumentCount: number;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasLiteralTypes: boolean;

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty array will be returned.
        documentationComment?: SymbolDisplayPart[];

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty array will be returned.
        jsDocTags?: JSDocTagInfo[];

        constructor(checker: TypeChecker) {
            this.checker = checker;
        }
        getDeclaration(): SignatureDeclaration {
            return this.declaration;
        }
        getTypeParameters(): TypeParameter[] | undefined {
            return this.typeParameters;
        }
        getParameters(): Symbol[] {
            return this.parameters;
        }
        getReturnType(): Type {
            return this.checker.getReturnTypeOfSignature(this);
        }

        getDocumentationComment(): SymbolDisplayPart[] {
            if (this.documentationComment === undefined) {
                this.documentationComment = this.declaration ? JsDoc.getJsDocCommentsFromDeclarations([this.declaration]) : [];
            }

            return this.documentationComment;
        }

        getJsDocTags(): JSDocTagInfo[] {
            if (this.jsDocTags === undefined) {
                this.jsDocTags = this.declaration ? JsDoc.getJsDocTagsFromDeclarations([this.declaration]) : [];
            }

            return this.jsDocTags;
        }
    }

    class SourceFileObject extends NodeObject implements SourceFile {
        public kind: SyntaxKind.SourceFile;
        public _declarationBrand: any;
        public fileName: string;
        public path: Path;
        public text: string;
        public scriptSnapshot: IScriptSnapshot;
        public lineMap: ReadonlyArray<number>;

        public statements: NodeArray<Statement>;
        public endOfFileToken: Token<SyntaxKind.EndOfFileToken>;

        public amdDependencies: { name: string; path: string }[];
        public moduleName: string;
        public referencedFiles: FileReference[];
        public typeReferenceDirectives: FileReference[];

        public syntacticDiagnostics: Diagnostic[];
        public referenceDiagnostics: Diagnostic[];
        public parseDiagnostics: Diagnostic[];
        public bindDiagnostics: Diagnostic[];

        public isDeclarationFile: boolean;
        public isDefaultLib: boolean;
        public hasNoDefaultLib: boolean;
        public externalModuleIndicator: Node; // The first node that causes this file to be an external module
        public commonJsModuleIndicator: Node; // The first node that causes this file to be a CommonJS module
        public nodeCount: number;
        public identifierCount: number;
        public symbolCount: number;
        public version: string;
        public scriptKind: ScriptKind;
        public languageVersion: ScriptTarget;
        public languageVariant: LanguageVariant;
        public identifiers: Map<string>;
        public nameTable: UnderscoreEscapedMap<number>;
        public resolvedModules: Map<ResolvedModuleFull>;
        public resolvedTypeReferenceDirectiveNames: Map<ResolvedTypeReferenceDirective>;
        public imports: StringLiteral[];
        public moduleAugmentations: StringLiteral[];
        private namedDeclarations: Map<Declaration[]>;
        public ambientModuleNames: string[];
        public checkJsDirective: CheckJsDirective | undefined;
        public possiblyContainDynamicImport: boolean;

        constructor(kind: SyntaxKind, pos: number, end: number) {
            super(kind, pos, end);
        }

        public update(newText: string, textChangeRange: TextChangeRange): SourceFile {
            return updateSourceFile(this, newText, textChangeRange);
        }

        public getLineAndCharacterOfPosition(position: number): LineAndCharacter {
            return ts.getLineAndCharacterOfPosition(this, position);
        }

        public getLineStarts(): ReadonlyArray<number> {
            return getLineStarts(this);
        }

        public getPositionOfLineAndCharacter(line: number, character: number): number {
            return ts.getPositionOfLineAndCharacter(this, line, character);
        }

        public getLineEndOfPosition(pos: number): number {
            const { line } = this.getLineAndCharacterOfPosition(pos);
            const lineStarts = this.getLineStarts();

            let lastCharPos: number;
            if (line + 1 >= lineStarts.length) {
                lastCharPos = this.getEnd();
            }
            if (!lastCharPos) {
                lastCharPos = lineStarts[line + 1] - 1;
            }

            const fullText = this.getFullText();
            // if the new line is "\r\n", we should return the last non-new-line-character position
            return fullText[lastCharPos] === "\n" && fullText[lastCharPos - 1] === "\r" ? lastCharPos - 1 : lastCharPos;
        }

        public getNamedDeclarations(): Map<Declaration[]> {
            if (!this.namedDeclarations) {
                this.namedDeclarations = this.computeNamedDeclarations();
            }

            return this.namedDeclarations;
        }

        private computeNamedDeclarations(): Map<Declaration[]> {
            const result = createMultiMap<Declaration>();

            forEachChild(this, visit);

            return result;

            function addDeclaration(declaration: Declaration) {
                const name = getDeclarationName(declaration);
                if (name) {
                    result.add(name, declaration);
                }
            }

            function getDeclarations(name: string) {
                let declarations = result.get(name);
                if (!declarations) {
                    result.set(name, declarations = []);
                }
                return declarations;
            }

            function getDeclarationName(declaration: Declaration) {
                const name = getNameOfDeclaration(declaration);
                if (name) {
                    const result = getTextOfIdentifierOrLiteral(name as (Identifier | LiteralExpression));
                    if (result !== undefined) {
                        return result;
                    }

                    if (name.kind === SyntaxKind.ComputedPropertyName) {
                        const expr = (<ComputedPropertyName>name).expression;
                        if (expr.kind === SyntaxKind.PropertyAccessExpression) {
                            return (<PropertyAccessExpression>expr).name.text;
                        }

                        return getTextOfIdentifierOrLiteral(expr as (Identifier | LiteralExpression));
                    }
                }

                return undefined;
            }

            function visit(node: Node): void {
                switch (node.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        const functionDeclaration = <FunctionLikeDeclaration>node;
                        const declarationName = getDeclarationName(functionDeclaration);

                        if (declarationName) {
                            const declarations = getDeclarations(declarationName);
                            const lastDeclaration = lastOrUndefined(declarations);

                            // Check whether this declaration belongs to an "overload group".
                            if (lastDeclaration && functionDeclaration.parent === lastDeclaration.parent && functionDeclaration.symbol === lastDeclaration.symbol) {
                                // Overwrite the last declaration if it was an overload
                                // and this one is an implementation.
                                if (functionDeclaration.body && !(<FunctionLikeDeclaration>lastDeclaration).body) {
                                    declarations[declarations.length - 1] = functionDeclaration;
                                }
                            }
                            else {
                                declarations.push(functionDeclaration);
                            }
                        }
                        forEachChild(node, visit);
                        break;

                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.ClassExpression:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ImportEqualsDeclaration:
                    case SyntaxKind.ExportSpecifier:
                    case SyntaxKind.ImportSpecifier:
                    case SyntaxKind.ImportClause:
                    case SyntaxKind.NamespaceImport:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.TypeLiteral:
                        addDeclaration(<Declaration>node);
                        forEachChild(node, visit);
                        break;

                    case SyntaxKind.Parameter:
                        // Only consider parameter properties
                        if (!hasModifier(node, ModifierFlags.ParameterPropertyModifier)) {
                            break;
                        }
                        // falls through
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.BindingElement: {
                        const decl = <VariableDeclaration>node;
                        if (isBindingPattern(decl.name)) {
                            forEachChild(decl.name, visit);
                            break;
                        }
                        if (decl.initializer) {
                            visit(decl.initializer);
                        }
                    }
                        // falls through
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.PropertyDeclaration:
                    case SyntaxKind.PropertySignature:
                        addDeclaration(<Declaration>node);
                        break;

                    case SyntaxKind.ExportDeclaration:
                        // Handle named exports case e.g.:
                        //    export {a, b as B} from "mod";
                        if ((<ExportDeclaration>node).exportClause) {
                            forEach((<ExportDeclaration>node).exportClause.elements, visit);
                        }
                        break;

                    case SyntaxKind.ImportDeclaration:
                        const importClause = (<ImportDeclaration>node).importClause;
                        if (importClause) {
                            // Handle default import case e.g.:
                            //    import d from "mod";
                            if (importClause.name) {
                                addDeclaration(importClause);
                            }

                            // Handle named bindings in imports e.g.:
                            //    import * as NS from "mod";
                            //    import {a, b as B} from "mod";
                            if (importClause.namedBindings) {
                                if (importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                                    addDeclaration(<NamespaceImport>importClause.namedBindings);
                                }
                                else {
                                    forEach((<NamedImports>importClause.namedBindings).elements, visit);
                                }
                            }
                        }
                        break;

                    default:
                        forEachChild(node, visit);
                }
            }
        }
    }

    class SourceMapSourceObject implements SourceMapSource {
        lineMap: number[];
        constructor (public fileName: string, public text: string, public skipTrivia?: (pos: number) => number) {}

        public getLineAndCharacterOfPosition(pos: number): LineAndCharacter {
            return ts.getLineAndCharacterOfPosition(this, pos);
        }
    }

    function getServicesObjectAllocator(): ObjectAllocator {
        return {
            getNodeConstructor: () => NodeObject,
            getTokenConstructor: () => TokenObject,

            getIdentifierConstructor: () => IdentifierObject,
            getSourceFileConstructor: () => SourceFileObject,
            getSymbolConstructor: () => SymbolObject,
            getTypeConstructor: () => TypeObject,
            getSignatureConstructor: () => SignatureObject,
            getSourceMapSourceConstructor: () => SourceMapSourceObject,
        };
    }

    /// Language Service

    // Information about a specific host file.
    interface HostFileInformation {
        hostFileName: string;
        version: string;
        scriptSnapshot: IScriptSnapshot;
        scriptKind: ScriptKind;
    }

    export interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }

    /* @internal */
    export function toEditorSettings(options: FormatCodeOptions | FormatCodeSettings): FormatCodeSettings;
    export function toEditorSettings(options: EditorOptions | EditorSettings): EditorSettings;
    export function toEditorSettings(optionsAsMap: MapLike<any>): MapLike<any> {
        let allPropertiesAreCamelCased = true;
        for (const key in optionsAsMap) {
            if (hasProperty(optionsAsMap, key) && !isCamelCase(key)) {
                allPropertiesAreCamelCased = false;
                break;
            }
        }
        if (allPropertiesAreCamelCased) {
            return optionsAsMap;
        }
        const settings: MapLike<any> = {};
        for (const key in optionsAsMap) {
            if (hasProperty(optionsAsMap, key)) {
                const newKey = isCamelCase(key) ? key : key.charAt(0).toLowerCase() + key.substr(1);
                settings[newKey] = optionsAsMap[key];
            }
        }
        return settings;
    }

    function isCamelCase(s: string) {
        return !s.length || s.charAt(0) === s.charAt(0).toLowerCase();
    }

    export function displayPartsToString(displayParts: SymbolDisplayPart[]) {
        if (displayParts) {
            return map(displayParts, displayPart => displayPart.text).join("");
        }

        return "";
    }

    export function getDefaultCompilerOptions(): CompilerOptions {
        // Always default to "ScriptTarget.ES5" for the language service
        return {
            target: ScriptTarget.ES5,
            jsx: JsxEmit.Preserve
        };
    }

    export function getSupportedCodeFixes() {
        return codefix.getSupportedErrorCodes();
    }

    // Cache host information about script Should be refreshed
    // at each language service public entry point, since we don't know when
    // the set of scripts handled by the host changes.
    class HostCache {
        private fileNameToEntry: Map<HostFileInformation>;
        private _compilationSettings: CompilerOptions;
        private currentDirectory: string;

        constructor(private host: LanguageServiceHost, getCanonicalFileName: (fileName: string) => string) {
            // script id => script index
            this.currentDirectory = host.getCurrentDirectory();
            this.fileNameToEntry = createMap<HostFileInformation>();

            // Initialize the list with the root file names
            const rootFileNames = host.getScriptFileNames();
            for (const fileName of rootFileNames) {
                this.createEntry(fileName, toPath(fileName, this.currentDirectory, getCanonicalFileName));
            }

            // store the compilation settings
            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }

        public compilationSettings() {
            return this._compilationSettings;
        }

        private createEntry(fileName: string, path: Path) {
            let entry: HostFileInformation;
            const scriptSnapshot = this.host.getScriptSnapshot(fileName);
            if (scriptSnapshot) {
                entry = {
                    hostFileName: fileName,
                    version: this.host.getScriptVersion(fileName),
                    scriptSnapshot,
                    scriptKind: getScriptKind(fileName, this.host)
                };
            }

            this.fileNameToEntry.set(path, entry);
            return entry;
        }

        public getEntryByPath(path: Path): HostFileInformation {
            return this.fileNameToEntry.get(path);
        }

        public containsEntryByPath(path: Path): boolean {
            return this.fileNameToEntry.has(path);
        }

        public getOrCreateEntryByPath(fileName: string, path: Path): HostFileInformation {
            return this.containsEntryByPath(path)
                ? this.getEntryByPath(path)
                : this.createEntry(fileName, path);
        }

        public getRootFileNames(): string[] {
            const fileNames: string[] = [];

            this.fileNameToEntry.forEach(value => {
                if (value) {
                    fileNames.push(value.hostFileName);
                }
            });

            return fileNames;
        }

        public getVersion(path: Path): string {
            const file = this.getEntryByPath(path);
            return file && file.version;
        }

        public getScriptSnapshot(path: Path): IScriptSnapshot {
            const file = this.getEntryByPath(path);
            return file && file.scriptSnapshot;
        }
    }

    class SyntaxTreeCache {
        // For our syntactic only features, we also keep a cache of the syntax tree for the
        // currently edited file.
        private currentFileName: string;
        private currentFileVersion: string;
        private currentFileScriptSnapshot: IScriptSnapshot;
        private currentSourceFile: SourceFile;

        constructor(private host: LanguageServiceHost) {
        }

        public getCurrentSourceFile(fileName: string): SourceFile {
            const scriptSnapshot = this.host.getScriptSnapshot(fileName);
            if (!scriptSnapshot) {
                // The host does not know about this file.
                throw new Error("Could not find file: '" + fileName + "'.");
            }

            const scriptKind = getScriptKind(fileName, this.host);
            const version = this.host.getScriptVersion(fileName);
            let sourceFile: SourceFile;

            if (this.currentFileName !== fileName) {
                // This is a new file, just parse it
                sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, ScriptTarget.Latest, version, /*setNodeParents*/ true, scriptKind);
            }
            else if (this.currentFileVersion !== version) {
                // This is the same file, just a newer version. Incrementally parse the file.
                const editRange = scriptSnapshot.getChangeRange(this.currentFileScriptSnapshot);
                sourceFile = updateLanguageServiceSourceFile(this.currentSourceFile, scriptSnapshot, version, editRange);
            }

            if (sourceFile) {
                // All done, ensure state is up to date
                this.currentFileVersion = version;
                this.currentFileName = fileName;
                this.currentFileScriptSnapshot = scriptSnapshot;
                this.currentSourceFile = sourceFile;
            }

            return this.currentSourceFile;
        }
    }

    function setSourceFileFields(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string) {
        sourceFile.version = version;
        sourceFile.scriptSnapshot = scriptSnapshot;
    }

    export function createLanguageServiceSourceFile(fileName: string, scriptSnapshot: IScriptSnapshot, scriptTarget: ScriptTarget, version: string, setNodeParents: boolean, scriptKind?: ScriptKind): SourceFile {
        const text = scriptSnapshot.getText(0, scriptSnapshot.getLength());
        const sourceFile = createSourceFile(fileName, text, scriptTarget, setNodeParents, scriptKind);
        setSourceFileFields(sourceFile, scriptSnapshot, version);
        return sourceFile;
    }

    export let disableIncrementalParsing = false;

    export function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean): SourceFile {
        // If we were given a text change range, and our version or open-ness changed, then
        // incrementally parse this file.
        if (textChangeRange) {
            if (version !== sourceFile.version) {
                // Once incremental parsing is ready, then just call into this function.
                if (!disableIncrementalParsing) {
                    let newText: string;

                    // grab the fragment from the beginning of the original text to the beginning of the span
                    const prefix = textChangeRange.span.start !== 0
                        ? sourceFile.text.substr(0, textChangeRange.span.start)
                        : "";

                    // grab the fragment from the end of the span till the end of the original text
                    const suffix = textSpanEnd(textChangeRange.span) !== sourceFile.text.length
                        ? sourceFile.text.substr(textSpanEnd(textChangeRange.span))
                        : "";

                    if (textChangeRange.newLength === 0) {
                        // edit was a deletion - just combine prefix and suffix
                        newText = prefix && suffix ? prefix + suffix : prefix || suffix;
                    }
                    else {
                        // it was actual edit, fetch the fragment of new text that correspond to new span
                        const changedText = scriptSnapshot.getText(textChangeRange.span.start, textChangeRange.span.start + textChangeRange.newLength);
                        // combine prefix, changed text and suffix
                        newText = prefix && suffix
                            ? prefix + changedText + suffix
                            : prefix
                                ? (prefix + changedText)
                                : (changedText + suffix);
                    }

                    const newSourceFile = updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
                    setSourceFileFields(newSourceFile, scriptSnapshot, version);
                    // after incremental parsing nameTable might not be up-to-date
                    // drop it so it can be lazily recreated later
                    newSourceFile.nameTable = undefined;

                    // dispose all resources held by old script snapshot
                    if (sourceFile !== newSourceFile && sourceFile.scriptSnapshot) {
                        if (sourceFile.scriptSnapshot.dispose) {
                            sourceFile.scriptSnapshot.dispose();
                        }

                        sourceFile.scriptSnapshot = undefined;
                    }

                    return newSourceFile;
                }
            }
        }

        // Otherwise, just create a new source file.
        return createLanguageServiceSourceFile(sourceFile.fileName, scriptSnapshot, sourceFile.languageVersion, version, /*setNodeParents*/ true, sourceFile.scriptKind);
    }

    class CancellationTokenObject implements CancellationToken {
        constructor(private cancellationToken: HostCancellationToken) {
        }

        public isCancellationRequested() {
            return this.cancellationToken && this.cancellationToken.isCancellationRequested();
        }

        public throwIfCancellationRequested(): void {
            if (this.isCancellationRequested()) {
                throw new OperationCanceledException();
            }
        }
    }

    /* @internal */
    /** A cancellation that throttles calls to the host */
    export class ThrottledCancellationToken implements CancellationToken {
        // Store when we last tried to cancel.  Checking cancellation can be expensive (as we have
        // to marshall over to the host layer).  So we only bother actually checking once enough
        // time has passed.
        private lastCancellationCheckTime = 0;

        constructor(private hostCancellationToken: HostCancellationToken, private readonly throttleWaitMilliseconds = 20) {
        }

        public isCancellationRequested(): boolean {
            const time = timestamp();
            const duration = Math.abs(time - this.lastCancellationCheckTime);
            if (duration >= this.throttleWaitMilliseconds) {
                // Check no more than once every throttle wait milliseconds
                this.lastCancellationCheckTime = time;
                return this.hostCancellationToken.isCancellationRequested();
            }

            return false;
        }

        public throwIfCancellationRequested(): void {
            if (this.isCancellationRequested()) {
                throw new OperationCanceledException();
            }
        }
    }

    export function createLanguageService(host: LanguageServiceHost,
        documentRegistry: DocumentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames(), host.getCurrentDirectory())): LanguageService {

        const syntaxTreeCache: SyntaxTreeCache = new SyntaxTreeCache(host);
        ruleProvider = ruleProvider || new formatting.RulesProvider();
        let program: Program;
        let lastProjectVersion: string;
        let lastTypesRootVersion = 0;

        const useCaseSensitivefileNames = host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames();
        const cancellationToken = new CancellationTokenObject(host.getCancellationToken && host.getCancellationToken());

        const currentDirectory = host.getCurrentDirectory();
        // Check if the localized messages json is set, otherwise query the host for it
        if (!localizedDiagnosticMessages && host.getLocalizedDiagnosticMessages) {
            localizedDiagnosticMessages = host.getLocalizedDiagnosticMessages();
        }

        function log(message: string) {
            if (host.log) {
                host.log(message);
            }
        }

        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitivefileNames);

        function getValidSourceFile(fileName: string): SourceFile {
            const sourceFile = program.getSourceFile(fileName);
            if (!sourceFile) {
                throw new Error("Could not find file: '" + fileName + "'.");
            }
            return sourceFile;
        }

        function getRuleProvider(options: FormatCodeSettings) {
            ruleProvider.ensureUpToDate(options);
            return ruleProvider;
        }

        function synchronizeHostData(): void {
            // perform fast check if host supports it
            if (host.getProjectVersion) {
                const hostProjectVersion = host.getProjectVersion();
                if (hostProjectVersion) {
                    if (lastProjectVersion === hostProjectVersion) {
                        return;
                    }

                    lastProjectVersion = hostProjectVersion;
                }
            }

            const typeRootsVersion = host.getTypeRootsVersion ? host.getTypeRootsVersion() : 0;
            if (lastTypesRootVersion !== typeRootsVersion) {
                log("TypeRoots version has changed; provide new program");
                program = undefined;
                lastTypesRootVersion = typeRootsVersion;
            }

            // Get a fresh cache of the host information
            let hostCache = new HostCache(host, getCanonicalFileName);

            // If the program is already up-to-date, we can reuse it
            if (programUpToDate()) {
                return;
            }

            // IMPORTANT - It is critical from this moment onward that we do not check
            // cancellation tokens.  We are about to mutate source files from a previous program
            // instance.  If we cancel midway through, we may end up in an inconsistent state where
            // the program points to old source files that have been invalidated because of
            // incremental parsing.

            const oldSettings = program && program.getCompilerOptions();
            const newSettings = hostCache.compilationSettings();
            const shouldCreateNewSourceFiles = oldSettings &&
                (oldSettings.target !== newSettings.target ||
                 oldSettings.module !== newSettings.module ||
                 oldSettings.moduleResolution !== newSettings.moduleResolution ||
                 oldSettings.noResolve !== newSettings.noResolve ||
                 oldSettings.jsx !== newSettings.jsx ||
                 oldSettings.allowJs !== newSettings.allowJs ||
                 oldSettings.disableSizeLimit !== oldSettings.disableSizeLimit ||
                 oldSettings.baseUrl !== newSettings.baseUrl ||
                 !equalOwnProperties(oldSettings.paths, newSettings.paths));

            // Now create a new compiler
            const compilerHost: CompilerHost = {
                getSourceFile: getOrCreateSourceFile,
                getSourceFileByPath: getOrCreateSourceFileByPath,
                getCancellationToken: () => cancellationToken,
                getCanonicalFileName,
                useCaseSensitiveFileNames: () => useCaseSensitivefileNames,
                getNewLine: () => getNewLineOrDefaultFromHost(host),
                getDefaultLibFileName: (options) => host.getDefaultLibFileName(options),
                writeFile: noop,
                getCurrentDirectory: () => currentDirectory,
                fileExists: (fileName): boolean => {
                    // stub missing host functionality
                    const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                    return hostCache.containsEntryByPath(path) ?
                        !!hostCache.getEntryByPath(path) :
                        (host.fileExists && host.fileExists(fileName));
                },
                readFile(fileName) {
                    // stub missing host functionality
                    const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                    if (hostCache.containsEntryByPath(path)) {
                        const entry = hostCache.getEntryByPath(path);
                        return entry && entry.scriptSnapshot.getText(0, entry.scriptSnapshot.getLength());
                    }
                    return host.readFile && host.readFile(fileName);
                },
                directoryExists: directoryName => {
                    return directoryProbablyExists(directoryName, host);
                },
                getDirectories: path => {
                    return host.getDirectories ? host.getDirectories(path) : [];
                }
            };
            if (host.trace) {
                compilerHost.trace = message => host.trace(message);
            }

            if (host.resolveModuleNames) {
                compilerHost.resolveModuleNames = (moduleNames, containingFile) => host.resolveModuleNames(moduleNames, containingFile);
            }
            if (host.resolveTypeReferenceDirectives) {
                compilerHost.resolveTypeReferenceDirectives = (typeReferenceDirectiveNames, containingFile) => {
                    return host.resolveTypeReferenceDirectives(typeReferenceDirectiveNames, containingFile);
                };
            }

            const documentRegistryBucketKey = documentRegistry.getKeyForCompilationSettings(newSettings);
            const newProgram = createProgram(hostCache.getRootFileNames(), newSettings, compilerHost, program);

            // Release any files we have acquired in the old program but are
            // not part of the new program.
            if (program) {
                const oldSourceFiles = program.getSourceFiles();
                const oldSettingsKey = documentRegistry.getKeyForCompilationSettings(oldSettings);
                for (const oldSourceFile of oldSourceFiles) {
                    if (!newProgram.getSourceFile(oldSourceFile.fileName) || shouldCreateNewSourceFiles) {
                        documentRegistry.releaseDocumentWithKey(oldSourceFile.path, oldSettingsKey);
                    }
                }
            }

            // hostCache is captured in the closure for 'getOrCreateSourceFile' but it should not be used past this point.
            // It needs to be cleared to allow all collected snapshots to be released
            hostCache = undefined;

            program = newProgram;

            // Make sure all the nodes in the program are both bound, and have their parent
            // pointers set property.
            program.getTypeChecker();
            return;

            function getOrCreateSourceFile(fileName: string): SourceFile {
                return getOrCreateSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName));
            }

            function getOrCreateSourceFileByPath(fileName: string, path: Path): SourceFile {
                Debug.assert(hostCache !== undefined);
                // The program is asking for this file, check first if the host can locate it.
                // If the host can not locate the file, then it does not exist. return undefined
                // to the program to allow reporting of errors for missing files.
                const hostFileInformation = hostCache.getOrCreateEntryByPath(fileName, path);
                if (!hostFileInformation) {
                    return undefined;
                }

                // Check if the language version has changed since we last created a program; if they are the same,
                // it is safe to reuse the sourceFiles; if not, then the shape of the AST can change, and the oldSourceFile
                // can not be reused. we have to dump all syntax trees and create new ones.
                if (!shouldCreateNewSourceFiles) {
                    // Check if the old program had this file already
                    const oldSourceFile = program && program.getSourceFileByPath(path);
                    if (oldSourceFile) {
                        // We already had a source file for this file name.  Go to the registry to
                        // ensure that we get the right up to date version of it.  We need this to
                        // address the following race-condition.  Specifically, say we have the following:
                        //
                        //      LS1
                        //          \
                        //           DocumentRegistry
                        //          /
                        //      LS2
                        //
                        // Each LS has a reference to file 'foo.ts' at version 1.  LS2 then updates
                        // it's version of 'foo.ts' to version 2.  This will cause LS2 and the
                        // DocumentRegistry to have version 2 of the document.  HOwever, LS1 will
                        // have version 1.  And *importantly* this source file will be *corrupt*.
                        // The act of creating version 2 of the file irrevocably damages the version
                        // 1 file.
                        //
                        // So, later when we call into LS1, we need to make sure that it doesn't use
                        // it's source file any more, and instead defers to DocumentRegistry to get
                        // either version 1, version 2 (or some other version) depending on what the
                        // host says should be used.

                        // We do not support the scenario where a host can modify a registered
                        // file's script kind, i.e. in one project some file is treated as ".ts"
                        // and in another as ".js"
                        Debug.assertEqual(hostFileInformation.scriptKind, oldSourceFile.scriptKind, "Registered script kind should match new script kind.", path);

                        return documentRegistry.updateDocumentWithKey(fileName, path, newSettings, documentRegistryBucketKey, hostFileInformation.scriptSnapshot, hostFileInformation.version, hostFileInformation.scriptKind);
                    }

                    // We didn't already have the file.  Fall through and acquire it from the registry.
                }

                // Could not find this file in the old program, create a new SourceFile for it.
                return documentRegistry.acquireDocumentWithKey(fileName, path, newSettings, documentRegistryBucketKey, hostFileInformation.scriptSnapshot, hostFileInformation.version, hostFileInformation.scriptKind);
            }

            function sourceFileUpToDate(sourceFile: SourceFile): boolean {
                if (!sourceFile) {
                    return false;
                }
                const path = sourceFile.path || toPath(sourceFile.fileName, currentDirectory, getCanonicalFileName);
                return sourceFile.version === hostCache.getVersion(path);
            }

            function programUpToDate(): boolean {
                // If we haven't create a program yet, then it is not up-to-date
                if (!program) {
                    return false;
                }

                // If number of files in the program do not match, it is not up-to-date
                const rootFileNames = hostCache.getRootFileNames();
                if (program.getSourceFiles().length !== rootFileNames.length) {
                    return false;
                }

                // If any file is not up-to-date, then the whole program is not up-to-date
                for (const fileName of rootFileNames) {
                    if (!sourceFileUpToDate(program.getSourceFile(fileName))) {
                        return false;
                    }
                }

                const currentOptions = program.getCompilerOptions();
                const newOptions = hostCache.compilationSettings();
                // If the compilation settings do no match, then the program is not up-to-date
                if (!compareDataObjects(currentOptions, newOptions)) {
                    return false;
                }

                // If everything matches but the text of config file is changed,
                // error locations can change for program options, so update the program
                if (currentOptions.configFile && newOptions.configFile) {
                    return currentOptions.configFile.text === newOptions.configFile.text;
                }

                return true;
            }
        }

        function getProgram(): Program {
            synchronizeHostData();

            return program;
        }

        function cleanupSemanticCache(): void {
            program = undefined;
        }

        function dispose(): void {
            if (program) {
                forEach(program.getSourceFiles(), f =>
                    documentRegistry.releaseDocument(f.fileName, program.getCompilerOptions()));
                program = undefined;
            }
            host = undefined;
        }

        /// Diagnostics
        function getSyntacticDiagnostics(fileName: string): Diagnostic[] {
            synchronizeHostData();

            return program.getSyntacticDiagnostics(getValidSourceFile(fileName), cancellationToken).slice();
        }

        /**
         * getSemanticDiagnostics return array of Diagnostics. If '-d' is not enabled, only report semantic errors
         * If '-d' enabled, report both semantic and emitter errors
         */
        function getSemanticDiagnostics(fileName: string): Diagnostic[] {
            synchronizeHostData();

            const targetSourceFile = getValidSourceFile(fileName);

            // Only perform the action per file regardless of '-out' flag as LanguageServiceHost is expected to call this function per file.
            // Therefore only get diagnostics for given file.

            const semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile, cancellationToken);
            if (!program.getCompilerOptions().declaration) {
                return semanticDiagnostics.slice();
            }

            // If '-d' is enabled, check for emitter error. One example of emitter error is export class implements non-export interface
            const declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile, cancellationToken);
            return [...semanticDiagnostics, ...declarationDiagnostics];
        }

        function getCompilerOptionsDiagnostics() {
            synchronizeHostData();
            return [...program.getOptionsDiagnostics(cancellationToken), ...program.getGlobalDiagnostics(cancellationToken)];
        }

        function getCompletionsAtPosition(fileName: string, position: number): CompletionInfo {
            synchronizeHostData();
            return Completions.getCompletionsAtPosition(host, program.getTypeChecker(), log, program.getCompilerOptions(), getValidSourceFile(fileName), position);
        }

        function getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
            synchronizeHostData();
            return Completions.getCompletionEntryDetails(program.getTypeChecker(), log, program.getCompilerOptions(), getValidSourceFile(fileName), position, entryName);
        }

        function getCompletionEntrySymbol(fileName: string, position: number, entryName: string): Symbol {
            synchronizeHostData();
            return Completions.getCompletionEntrySymbol(program.getTypeChecker(), log, program.getCompilerOptions(), getValidSourceFile(fileName), position, entryName);
        }

        function getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            synchronizeHostData();

            const sourceFile = getValidSourceFile(fileName);
            const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
            if (node === sourceFile) {
                return undefined;
            }

            if (isLabelName(node)) {
                return undefined;
            }

            const typeChecker = program.getTypeChecker();
            const symbol = getSymbolAtLocationForQuickInfo(node, typeChecker);

            if (!symbol || typeChecker.isUnknownSymbol(symbol)) {
                // Try getting just type at this position and show
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                    case SyntaxKind.PropertyAccessExpression:
                    case SyntaxKind.QualifiedName:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.ThisType:
                    case SyntaxKind.SuperKeyword:
                        // For the identifiers/this/super etc get the type at position
                        const type = typeChecker.getTypeAtLocation(node);
                        if (type) {
                            return {
                                kind: ScriptElementKind.unknown,
                                kindModifiers: ScriptElementKindModifier.none,
                                textSpan: createTextSpan(node.getStart(), node.getWidth()),
                                displayParts: typeToDisplayParts(typeChecker, type, getContainerNode(node)),
                                documentation: type.symbol ? type.symbol.getDocumentationComment() : undefined,
                                tags: type.symbol ? type.symbol.getJsDocTags() : undefined
                            };
                        }
                }

                return undefined;
            }

            const displayPartsDocumentationsAndKind = SymbolDisplay.getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker, symbol, sourceFile, getContainerNode(node), node);
            return {
                kind: displayPartsDocumentationsAndKind.symbolKind,
                kindModifiers: SymbolDisplay.getSymbolModifiers(symbol),
                textSpan: createTextSpan(node.getStart(), node.getWidth()),
                displayParts: displayPartsDocumentationsAndKind.displayParts,
                documentation: displayPartsDocumentationsAndKind.documentation,
                tags: displayPartsDocumentationsAndKind.tags
            };
        }

        function getSymbolAtLocationForQuickInfo(node: Node, checker: TypeChecker): Symbol | undefined {
            if ((isIdentifier(node) || isStringLiteral(node))
                && isPropertyAssignment(node.parent)
                && node.parent.name === node) {
                const type = checker.getContextualType(node.parent.parent);
                if (type) {
                    const property = checker.getPropertyOfType(type, getTextOfIdentifierOrLiteral(node));
                    if (property) {
                        return property;
                    }
                }
            }
            return checker.getSymbolAtLocation(node);
        }

        /// Goto definition
        function getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            synchronizeHostData();
            return GoToDefinition.getDefinitionAtPosition(program, getValidSourceFile(fileName), position);
        }

        function getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            synchronizeHostData();
            return GoToDefinition.getTypeDefinitionAtPosition(program.getTypeChecker(), getValidSourceFile(fileName), position);
        }

        /// Goto implementation
        function getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[] {
            synchronizeHostData();
            return FindAllReferences.getImplementationsAtPosition(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
        }

        /// References and Occurrences
        function getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            let results = getOccurrencesAtPositionCore(fileName, position);

            if (results) {
                const sourceFile = getCanonicalFileName(normalizeSlashes(fileName));

                // Get occurrences only supports reporting occurrences for the file queried.  So
                // filter down to that list.
                results = filter(results, r => getCanonicalFileName(ts.normalizeSlashes(r.fileName)) === sourceFile);
            }

            return results;
        }

        function getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] {
            synchronizeHostData();
            const sourceFilesToSearch = map(filesToSearch, f => program.getSourceFile(f));
            const sourceFile = getValidSourceFile(fileName);
            return DocumentHighlights.getDocumentHighlights(program, cancellationToken, sourceFile, position, sourceFilesToSearch);
        }

        function getOccurrencesAtPositionCore(fileName: string, position: number): ReferenceEntry[] {
            return convertDocumentHighlights(getDocumentHighlights(fileName, position, [fileName]));

            function convertDocumentHighlights(documentHighlights: DocumentHighlights[]): ReferenceEntry[] {
                if (!documentHighlights) {
                    return undefined;
                }

                const result: ReferenceEntry[] = [];
                for (const entry of documentHighlights) {
                    for (const highlightSpan of entry.highlightSpans) {
                        result.push({
                            fileName: entry.fileName,
                            textSpan: highlightSpan.textSpan,
                            isWriteAccess: highlightSpan.kind === HighlightSpanKind.writtenReference,
                            isDefinition: false,
                            isInString: highlightSpan.isInString,
                        });
                    }
                }

                return result;
            }
        }

        function findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            return getReferences(fileName, position, { findInStrings, findInComments, isForRename: true });
        }

        function getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            return getReferences(fileName, position);
        }

        function getReferences(fileName: string, position: number, options?: FindAllReferences.Options) {
            synchronizeHostData();
            return FindAllReferences.findReferencedEntries(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position, options);
        }

        function findReferences(fileName: string, position: number): ReferencedSymbol[] {
            synchronizeHostData();
            return FindAllReferences.findReferencedSymbols(program, cancellationToken, program.getSourceFiles(), getValidSourceFile(fileName), position);
        }

        /// NavigateTo
        function getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: boolean): NavigateToItem[] {
            synchronizeHostData();

            const sourceFiles = fileName ? [getValidSourceFile(fileName)] : program.getSourceFiles();
            return ts.NavigateTo.getNavigateToItems(sourceFiles, program.getTypeChecker(), cancellationToken, searchValue, maxResultCount, excludeDtsFiles);
        }

        function getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean): EmitOutput {
            synchronizeHostData();

            const sourceFile = getValidSourceFile(fileName);
            const outputFiles: OutputFile[] = [];

            function writeFile(fileName: string, text: string, writeByteOrderMark: boolean) {
                outputFiles.push({ name: fileName, writeByteOrderMark, text });
            }

            const customTransformers = host.getCustomTransformers && host.getCustomTransformers();
            const emitOutput = program.emit(sourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);

            return {
                outputFiles,
                emitSkipped: emitOutput.emitSkipped
            };
        }

        // Signature help
        /**
         * This is a semantic operation.
         */
        function getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems {
            synchronizeHostData();

            const sourceFile = getValidSourceFile(fileName);

            return SignatureHelp.getSignatureHelpItems(program, sourceFile, position, cancellationToken);
        }

        /// Syntactic features
        function getNonBoundSourceFile(fileName: string): SourceFile {
            return syntaxTreeCache.getCurrentSourceFile(fileName);
        }

        function getSourceFile(fileName: string): SourceFile {
            return getNonBoundSourceFile(fileName);
        }

        function getNameOrDottedNameSpan(fileName: string, startPos: number, _endPos: number): TextSpan {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

            // Get node at the location
            const node = getTouchingPropertyName(sourceFile, startPos, /*includeJsDocComment*/ false);

            if (node === sourceFile) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.QualifiedName:
                case SyntaxKind.StringLiteral:
                case SyntaxKind.FalseKeyword:
                case SyntaxKind.TrueKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.SuperKeyword:
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.ThisType:
                case SyntaxKind.Identifier:
                    break;

                // Cant create the text span
                default:
                    return;
            }

            let nodeForStartPos = node;
            while (true) {
                if (isRightSideOfPropertyAccess(nodeForStartPos) || isRightSideOfQualifiedName(nodeForStartPos)) {
                    // If on the span is in right side of the the property or qualified name, return the span from the qualified name pos to end of this node
                    nodeForStartPos = nodeForStartPos.parent;
                }
                else if (isNameOfModuleDeclaration(nodeForStartPos)) {
                    // If this is name of a module declarations, check if this is right side of dotted module name
                    // If parent of the module declaration which is parent of this node is module declaration and its body is the module declaration that this node is name of
                    // Then this name is name from dotted module
                    if (nodeForStartPos.parent.parent.kind === SyntaxKind.ModuleDeclaration &&
                        (<ModuleDeclaration>nodeForStartPos.parent.parent).body === nodeForStartPos.parent) {
                        // Use parent module declarations name for start pos
                        nodeForStartPos = (<ModuleDeclaration>nodeForStartPos.parent.parent).name;
                    }
                    else {
                        // We have to use this name for start pos
                        break;
                    }
                }
                else {
                    // Is not a member expression so we have found the node for start pos
                    break;
                }
            }

            return createTextSpanFromBounds(nodeForStartPos.getStart(), node.getEnd());
        }

        function getBreakpointStatementAtPosition(fileName: string, position: number) {
            // doesn't use compiler - no need to synchronize with host
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

            return BreakpointResolver.spanInSourceFileAtLocation(sourceFile, position);
        }

        function getNavigationBarItems(fileName: string): NavigationBarItem[] {
            return NavigationBar.getNavigationBarItems(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
        }

        function getNavigationTree(fileName: string): NavigationTree {
            return NavigationBar.getNavigationTree(syntaxTreeCache.getCurrentSourceFile(fileName), cancellationToken);
        }

        function isTsOrTsxFile(fileName: string): boolean {
            const kind = getScriptKind(fileName, host);
            return kind === ScriptKind.TS || kind === ScriptKind.TSX;
        }

        function getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            if (!isTsOrTsxFile(fileName)) {
                // do not run semantic classification on non-ts-or-tsx files
                return [];
            }
            synchronizeHostData();
            return ts.getSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
        }

        function getEncodedSemanticClassifications(fileName: string, span: TextSpan): Classifications {
            if (!isTsOrTsxFile(fileName)) {
                // do not run semantic classification on non-ts-or-tsx files
                return { spans: [], endOfLineState: EndOfLineState.None };
            }
            synchronizeHostData();
            return ts.getEncodedSemanticClassifications(program.getTypeChecker(), cancellationToken, getValidSourceFile(fileName), program.getClassifiableNames(), span);
        }

        function getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            // doesn't use compiler - no need to synchronize with host
            return ts.getSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
        }

        function getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications {
            // doesn't use compiler - no need to synchronize with host
            return ts.getEncodedSyntacticClassifications(cancellationToken, syntaxTreeCache.getCurrentSourceFile(fileName), span);
        }

        function getOutliningSpans(fileName: string): OutliningSpan[] {
            // doesn't use compiler - no need to synchronize with host
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            return OutliningElementsCollector.collectElements(sourceFile, cancellationToken);
        }

        function getBraceMatchingAtPosition(fileName: string, position: number) {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            const result: TextSpan[] = [];

            const token = getTouchingToken(sourceFile, position, /*includeJsDocComment*/ false);

            if (token.getStart(sourceFile) === position) {
                const matchKind = getMatchingTokenKind(token);

                // Ensure that there is a corresponding token to match ours.
                if (matchKind) {
                    const parentElement = token.parent;

                    const childNodes = parentElement.getChildren(sourceFile);
                    for (const current of childNodes) {
                        if (current.kind === matchKind) {
                            const range1 = createTextSpan(token.getStart(sourceFile), token.getWidth(sourceFile));
                            const range2 = createTextSpan(current.getStart(sourceFile), current.getWidth(sourceFile));

                            // We want to order the braces when we return the result.
                            if (range1.start < range2.start) {
                                result.push(range1, range2);
                            }
                            else {
                                result.push(range2, range1);
                            }

                            break;
                        }
                    }
                }
            }

            return result;

            function getMatchingTokenKind(token: Node): ts.SyntaxKind {
                switch (token.kind) {
                    case ts.SyntaxKind.OpenBraceToken: return ts.SyntaxKind.CloseBraceToken;
                    case ts.SyntaxKind.OpenParenToken: return ts.SyntaxKind.CloseParenToken;
                    case ts.SyntaxKind.OpenBracketToken: return ts.SyntaxKind.CloseBracketToken;
                    case ts.SyntaxKind.LessThanToken: return ts.SyntaxKind.GreaterThanToken;
                    case ts.SyntaxKind.CloseBraceToken: return ts.SyntaxKind.OpenBraceToken;
                    case ts.SyntaxKind.CloseParenToken: return ts.SyntaxKind.OpenParenToken;
                    case ts.SyntaxKind.CloseBracketToken: return ts.SyntaxKind.OpenBracketToken;
                    case ts.SyntaxKind.GreaterThanToken: return ts.SyntaxKind.LessThanToken;
                }

                return undefined;
            }
        }

        function getIndentationAtPosition(fileName: string, position: number, editorOptions: EditorOptions | EditorSettings) {
            let start = timestamp();
            const settings = toEditorSettings(editorOptions);
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            log("getIndentationAtPosition: getCurrentSourceFile: " + (timestamp() - start));

            start = timestamp();

            const result = formatting.SmartIndenter.getIndentation(position, sourceFile, settings);
            log("getIndentationAtPosition: computeIndentation  : " + (timestamp() - start));

            return result;
        }

        function getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            const settings = toEditorSettings(options);
            return formatting.formatSelection(start, end, sourceFile, getRuleProvider(settings), settings);
        }

        function getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            const settings = toEditorSettings(options);
            return formatting.formatDocument(sourceFile, getRuleProvider(settings), settings);
        }

        function getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[] {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            const settings = toEditorSettings(options);

            if (!isInComment(sourceFile, position)) {
                if (key === "{") {
                    return formatting.formatOnOpeningCurly(position, sourceFile, getRuleProvider(settings), settings);
                }
                else if (key === "}") {
                    return formatting.formatOnClosingCurly(position, sourceFile, getRuleProvider(settings), settings);
                }
                else if (key === ";") {
                    return formatting.formatOnSemicolon(position, sourceFile, getRuleProvider(settings), settings);
                }
                else if (key === "\n") {
                    return formatting.formatOnEnter(position, sourceFile, getRuleProvider(settings), settings);
                }
            }

            return [];
        }

        function getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: number[], formatOptions: FormatCodeSettings): CodeAction[] {
            synchronizeHostData();
            const sourceFile = getValidSourceFile(fileName);
            const span = createTextSpanFromBounds(start, end);
            const newLineCharacter = getNewLineOrDefaultFromHost(host);
            const rulesProvider = getRuleProvider(formatOptions);

            return flatMap(deduplicate(errorCodes), errorCode => {
                cancellationToken.throwIfCancellationRequested();
                return codefix.getFixes({ errorCode, sourceFile, span, program, newLineCharacter, host, cancellationToken, rulesProvider });
            });
        }

        function getDocCommentTemplateAtPosition(fileName: string, position: number): TextInsertion {
            return JsDoc.getDocCommentTemplateAtPosition(getNewLineOrDefaultFromHost(host), syntaxTreeCache.getCurrentSourceFile(fileName), position);
        }

        function isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
            // '<' is currently not supported, figuring out if we're in a Generic Type vs. a comparison is too
            // expensive to do during typing scenarios
            // i.e. whether we're dealing with:
            //      var x = new foo<| ( with class foo<T>{} )
            // or
            //      var y = 3 <|
            if (openingBrace === CharacterCodes.lessThan) {
                return false;
            }

            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);

            // Check if in a context where we don't want to perform any insertion
            if (isInString(sourceFile, position)) {
                return false;
            }

            if (isInsideJsxElementOrAttribute(sourceFile, position)) {
                return openingBrace === CharacterCodes.openBrace;
            }

            if (isInTemplateString(sourceFile, position)) {
                return false;
            }

            switch (openingBrace) {
                case CharacterCodes.singleQuote:
                case CharacterCodes.doubleQuote:
                case CharacterCodes.backtick:
                    return !isInComment(sourceFile, position);
            }

            return true;
        }

        function getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean) {
            const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
            const range = ts.formatting.getRangeOfEnclosingComment(sourceFile, position, onlyMultiLine);
            return range && createTextSpanFromRange(range);
        }

        function getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            // Note: while getting todo comments seems like a syntactic operation, we actually
            // treat it as a semantic operation here.  This is because we expect our host to call
            // this on every single file.  If we treat this syntactically, then that will cause
            // us to populate and throw away the tree in our syntax tree cache for each file.  By
            // treating this as a semantic operation, we can access any tree without throwing
            // anything away.
            synchronizeHostData();

            const sourceFile = getValidSourceFile(fileName);

            cancellationToken.throwIfCancellationRequested();

            const fileContents = sourceFile.text;
            const result: TodoComment[] = [];

            // Exclude node_modules files as we don't want to show the todos of external libraries.
            if (descriptors.length > 0 && !isNodeModulesFile(sourceFile.fileName)) {
                const regExp = getTodoCommentsRegExp();

                let matchArray: RegExpExecArray;
                while (matchArray = regExp.exec(fileContents)) {
                    cancellationToken.throwIfCancellationRequested();

                    // If we got a match, here is what the match array will look like.  Say the source text is:
                    //
                    //      "    // hack   1"
                    //
                    // The result array with the regexp:    will be:
                    //
                    //      ["// hack   1", "// ", "hack   1", undefined, "hack"]
                    //
                    // Here are the relevant capture groups:
                    //  0) The full match for the entire regexp.
                    //  1) The preamble to the message portion.
                    //  2) The message portion.
                    //  3...N) The descriptor that was matched - by index.  'undefined' for each
                    //         descriptor that didn't match.  an actual value if it did match.
                    //
                    //  i.e. 'undefined' in position 3 above means TODO(jason) didn't match.
                    //       "hack"      in position 4 means HACK did match.
                    const firstDescriptorCaptureIndex = 3;
                    Debug.assert(matchArray.length === descriptors.length + firstDescriptorCaptureIndex);

                    const preamble = matchArray[1];
                    const matchPosition = matchArray.index + preamble.length;

                    // OK, we have found a match in the file.  This is only an acceptable match if
                    // it is contained within a comment.
                    if (!isInComment(sourceFile, matchPosition)) {
                        continue;
                    }

                    let descriptor: TodoCommentDescriptor = undefined;
                    for (let i = 0; i < descriptors.length; i++) {
                        if (matchArray[i + firstDescriptorCaptureIndex]) {
                            descriptor = descriptors[i];
                        }
                    }
                    Debug.assert(descriptor !== undefined);

                    // We don't want to match something like 'TODOBY', so we make sure a non
                    // letter/digit follows the match.
                    if (isLetterOrDigit(fileContents.charCodeAt(matchPosition + descriptor.text.length))) {
                        continue;
                    }

                    const message = matchArray[2];
                    result.push({ descriptor, message, position: matchPosition });
                }
            }

            return result;

            function escapeRegExp(str: string): string {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            }

            function getTodoCommentsRegExp(): RegExp {
                // NOTE: ?:  means 'non-capture group'.  It allows us to have groups without having to
                // filter them out later in the final result array.

                // TODO comments can appear in one of the following forms:
                //
                //  1)      // TODO     or  /////////// TODO
                //
                //  2)      /* TODO     or  /********** TODO
                //
                //  3)      /*
                //           *   TODO
                //           */
                //
                // The following three regexps are used to match the start of the text up to the TODO
                // comment portion.
                const singleLineCommentStart = /(?:\/\/+\s*)/.source;
                const multiLineCommentStart = /(?:\/\*+\s*)/.source;
                const anyNumberOfSpacesAndAsterisksAtStartOfLine = /(?:^(?:\s|\*)*)/.source;

                // Match any of the above three TODO comment start regexps.
                // Note that the outermost group *is* a capture group.  We want to capture the preamble
                // so that we can determine the starting position of the TODO comment match.
                const preamble = "(" + anyNumberOfSpacesAndAsterisksAtStartOfLine + "|" + singleLineCommentStart + "|" + multiLineCommentStart + ")";

                // Takes the descriptors and forms a regexp that matches them as if they were literals.
                // For example, if the descriptors are "TODO(jason)" and "HACK", then this will be:
                //
                //      (?:(TODO\(jason\))|(HACK))
                //
                // Note that the outermost group is *not* a capture group, but the innermost groups
                // *are* capture groups.  By capturing the inner literals we can determine after
                // matching which descriptor we are dealing with.
                const literals = "(?:" + map(descriptors, d => "(" + escapeRegExp(d.text) + ")").join("|") + ")";

                // After matching a descriptor literal, the following regexp matches the rest of the
                // text up to the end of the line (or */).
                const endOfLineOrEndOfComment = /(?:$|\*\/)/.source;
                const messageRemainder = /(?:.*?)/.source;

                // This is the portion of the match we'll return as part of the TODO comment result. We
                // match the literal portion up to the end of the line or end of comment.
                const messagePortion = "(" + literals + messageRemainder + ")";
                const regExpString = preamble + messagePortion + endOfLineOrEndOfComment;

                // The final regexp will look like this:
                // /((?:\/\/+\s*)|(?:\/\*+\s*)|(?:^(?:\s|\*)*))((?:(TODO\(jason\))|(HACK))(?:.*?))(?:$|\*\/)/gim

                // The flags of the regexp are important here.
                //  'g' is so that we are doing a global search and can find matches several times
                //  in the input.
                //
                //  'i' is for case insensitivity (We do this to match C# TODO comment code).
                //
                //  'm' is so we can find matches in a multi-line input.
                return new RegExp(regExpString, "gim");
            }

            function isLetterOrDigit(char: number): boolean {
                return (char >= CharacterCodes.a && char <= CharacterCodes.z) ||
                    (char >= CharacterCodes.A && char <= CharacterCodes.Z) ||
                    (char >= CharacterCodes._0 && char <= CharacterCodes._9);
            }

            function isNodeModulesFile(path: string): boolean {
                const node_modulesFolderName = "/node_modules/";

                return path.indexOf(node_modulesFolderName) !== -1;
            }
        }

        function getRenameInfo(fileName: string, position: number): RenameInfo {
            synchronizeHostData();
            const defaultLibFileName = host.getDefaultLibFileName(host.getCompilationSettings());
            return Rename.getRenameInfo(program.getTypeChecker(), defaultLibFileName, getCanonicalFileName, getValidSourceFile(fileName), position);
        }

        function getRefactorContext(file: SourceFile, positionOrRange: number | TextRange, formatOptions?: FormatCodeSettings): RefactorContext {
            const [startPosition, endPosition] = typeof positionOrRange === "number" ? [positionOrRange, undefined] : [positionOrRange.pos, positionOrRange.end];
            return {
                file,
                startPosition,
                endPosition,
                program: getProgram(),
                newLineCharacter: host.getNewLine(),
                rulesProvider: getRuleProvider(formatOptions),
                cancellationToken
            };
        }

        function getApplicableRefactors(fileName: string, positionOrRange: number | TextRange): ApplicableRefactorInfo[] {
            synchronizeHostData();
            const file = getValidSourceFile(fileName);
            return refactor.getApplicableRefactors(getRefactorContext(file, positionOrRange));
        }

        function getEditsForRefactor(
            fileName: string,
            formatOptions: FormatCodeSettings,
            positionOrRange: number | TextRange,
            refactorName: string,
            actionName: string): RefactorEditInfo {

            synchronizeHostData();
            const file = getValidSourceFile(fileName);
            return refactor.getEditsForRefactor(getRefactorContext(file, positionOrRange, formatOptions), refactorName, actionName);
        }

        return {
            dispose,
            cleanupSemanticCache,
            getSyntacticDiagnostics,
            getSemanticDiagnostics,
            getCompilerOptionsDiagnostics,
            getSyntacticClassifications,
            getSemanticClassifications,
            getEncodedSyntacticClassifications,
            getEncodedSemanticClassifications,
            getCompletionsAtPosition,
            getCompletionEntryDetails,
            getCompletionEntrySymbol,
            getSignatureHelpItems,
            getQuickInfoAtPosition,
            getDefinitionAtPosition,
            getImplementationAtPosition,
            getTypeDefinitionAtPosition,
            getReferencesAtPosition,
            findReferences,
            getOccurrencesAtPosition,
            getDocumentHighlights,
            getNameOrDottedNameSpan,
            getBreakpointStatementAtPosition,
            getNavigateToItems,
            getRenameInfo,
            findRenameLocations,
            getNavigationBarItems,
            getNavigationTree,
            getOutliningSpans,
            getTodoComments,
            getBraceMatchingAtPosition,
            getIndentationAtPosition,
            getFormattingEditsForRange,
            getFormattingEditsForDocument,
            getFormattingEditsAfterKeystroke,
            getDocCommentTemplateAtPosition,
            isValidBraceCompletionAtPosition,
            getSpanOfEnclosingComment,
            getCodeFixesAtPosition,
            getEmitOutput,
            getNonBoundSourceFile,
            getSourceFile,
            getProgram,
            getApplicableRefactors,
            getEditsForRefactor,
        };
    }

    /* @internal */
    /** Names in the name table are escaped, so an identifier `__foo` will have a name table entry `___foo`. */
    export function getNameTable(sourceFile: SourceFile): UnderscoreEscapedMap<number> {
        if (!sourceFile.nameTable) {
            initializeNameTable(sourceFile);
        }

        return sourceFile.nameTable;
    }

    function initializeNameTable(sourceFile: SourceFile): void {
        const nameTable = sourceFile.nameTable = createUnderscoreEscapedMap<number>();
        sourceFile.forEachChild(function walk(node) {
            if (isIdentifier(node) && node.escapedText || isStringOrNumericLiteral(node) && literalIsName(node)) {
                const text = getEscapedTextOfIdentifierOrLiteral(node);
                nameTable.set(text, nameTable.get(text) === undefined ? node.pos : -1);
            }

            forEachChild(node, walk);
            if (node.jsDoc) {
                for (const jsDoc of node.jsDoc) {
                    forEachChild(jsDoc, walk);
                }
            }
        });
    }

    /**
     * We want to store any numbers/strings if they were a name that could be
     * related to a declaration.  So, if we have 'import x = require("something")'
     * then we want 'something' to be in the name table.  Similarly, if we have
     * "a['propname']" then we want to store "propname" in the name table.
     */
    function literalIsName(node: ts.StringLiteral | ts.NumericLiteral): boolean {
        return isDeclarationName(node) ||
            node.parent.kind === SyntaxKind.ExternalModuleReference ||
            isArgumentOfElementAccessExpression(node) ||
            isLiteralComputedPropertyDeclarationName(node);
    }

    function isObjectLiteralElement(node: Node): node is ObjectLiteralElement  {
        switch (node.kind) {
            case SyntaxKind.JsxAttribute:
            case SyntaxKind.JsxSpreadAttribute:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return true;
        }
        return false;
    }

    /**
     * Returns the containing object literal property declaration given a possible name node, e.g. "a" in x = { "a": 1 }
     */
    /* @internal */
    export function getContainingObjectLiteralElement(node: Node): ObjectLiteralElement {
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
                if (node.parent.kind === SyntaxKind.ComputedPropertyName) {
                    return isObjectLiteralElement(node.parent.parent) ? node.parent.parent : undefined;
                }
                // falls through
            case SyntaxKind.Identifier:
                return isObjectLiteralElement(node.parent) &&
                    (node.parent.parent.kind === SyntaxKind.ObjectLiteralExpression || node.parent.parent.kind === SyntaxKind.JsxAttributes) &&
                    (<ObjectLiteralElement>node.parent).name === node ? node.parent as ObjectLiteralElement : undefined;
        }
        return undefined;
    }

    /* @internal */
    export function getPropertySymbolsFromContextualType(typeChecker: TypeChecker, node: ObjectLiteralElement): Symbol[] {
        const objectLiteral = <ObjectLiteralExpression | JsxAttributes>node.parent;
        const contextualType = typeChecker.getContextualType(objectLiteral);
        return getPropertySymbolsFromType(contextualType, node.name);
    }

    /* @internal */
    export function getPropertySymbolsFromType(type: Type, propName: PropertyName) {
        const name = unescapeLeadingUnderscores(getTextOfPropertyName(propName));
        if (name && type) {
            const result: Symbol[] = [];
            const symbol = type.getProperty(name);
            if (type.flags & TypeFlags.Union) {
                forEach((<UnionType>type).types, t => {
                    const symbol = t.getProperty(name);
                    if (symbol) {
                        result.push(symbol);
                    }
                });
                return result;
            }

            if (symbol) {
                result.push(symbol);
                return result;
            }
        }
        return undefined;
    }

    function isArgumentOfElementAccessExpression(node: Node) {
        return node &&
            node.parent &&
            node.parent.kind === SyntaxKind.ElementAccessExpression &&
            (<ElementAccessExpression>node.parent).argumentExpression === node;
    }

    /// getDefaultLibraryFilePath
    declare const __dirname: string;

    /**
     * Get the path of the default library files (lib.d.ts) as distributed with the typescript
     * node package.
     * The functionality is not supported if the ts module is consumed outside of a node module.
     */
    export function getDefaultLibFilePath(options: CompilerOptions): string {
        // Check __dirname is defined and that we are on a node.js system.
        if (typeof __dirname !== "undefined") {
            return __dirname + directorySeparator + getDefaultLibFileName(options);
        }

        throw new Error("getDefaultLibFilePath is only supported when consumed as a node module. ");
    }

    objectAllocator = getServicesObjectAllocator();
}
