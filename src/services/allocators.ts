/* @internal */
namespace ts.Allocators {
    function createNode(kind: SyntaxKind, pos: number, end: number, parent?: Node): NodeObject | TokenObject | IdentifierObject {
        const node = kind >= SyntaxKind.FirstNode ? new NodeObject(kind, pos, end) :
            kind === SyntaxKind.Identifier ? new IdentifierObject(kind, pos, end) :
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
        public jsDocComments: JSDocComment[];
        public original: Node;
        public transformFlags: TransformFlags;
        public excludeTransformFlags: TransformFlags;
        private _children: Node[];

        constructor(kind: SyntaxKind, pos: number, end: number) {
            this.pos = pos;
            this.end = end;
            this.flags = NodeFlags.None;
            this.transformFlags = undefined;
            this.excludeTransformFlags = undefined;
            this.parent = undefined;
            this.kind = kind;
        }

        public getSourceFile(): SourceFile {
            return getSourceFileOfNode(this);
        }

        public getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number {
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

        private addSyntheticNodes(nodes: Node[], pos: number, end: number, useJSDocScanner?: boolean): number {
            scanner.setTextPos(pos);
            while (pos < end) {
                const token = useJSDocScanner ? scanner.scanJSDocToken() : scanner.scan();
                const textPos = scanner.getTextPos();
                if (textPos <= end) {
                    nodes.push(createNode(token, pos, textPos, this));
                }
                pos = textPos;
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

        private createChildren(sourceFile?: SourceFile) {
            let children: Node[];
            if (this.kind >= SyntaxKind.FirstNode) {
                scanner.setText((sourceFile || this.getSourceFile()).text);
                children = [];
                let pos = this.pos;
                const useJSDocScanner = this.kind >= SyntaxKind.FirstJSDocTagNode && this.kind <= SyntaxKind.LastJSDocTagNode;
                const processNode = (node: Node) => {
                    const isJSDocTagNode = isJSDocTag(node);
                    if (!isJSDocTagNode && pos < node.pos) {
                        pos = this.addSyntheticNodes(children, pos, node.pos, useJSDocScanner);
                    }
                    children.push(node);
                    if (!isJSDocTagNode) {
                        pos = node.end;
                    }
                };
                const processNodes = (nodes: NodeArray<Node>) => {
                    if (pos < nodes.pos) {
                        pos = this.addSyntheticNodes(children, pos, nodes.pos, useJSDocScanner);
                    }
                    children.push(this.createSyntaxList(<NodeArray<Node>>nodes));
                    pos = nodes.end;
                };
                // jsDocComments need to be the first children
                if (this.jsDocComments) {
                    for (const jsDocComment of this.jsDocComments) {
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
            }
            this._children = children || emptyArray;
        }

        public getChildCount(sourceFile?: SourceFile): number {
            if (!this._children) this.createChildren(sourceFile);
            return this._children.length;
        }

        public getChildAt(index: number, sourceFile?: SourceFile): Node {
            if (!this._children) this.createChildren(sourceFile);
            return this._children[index];
        }

        public getChildren(sourceFile?: SourceFile): Node[] {
            if (!this._children) this.createChildren(sourceFile);
            return this._children;
        }

        public getFirstToken(sourceFile?: SourceFile): Node {
            const children = this.getChildren(sourceFile);
            if (!children.length) {
                return undefined;
            }

            const child = children[0];

            return child.kind < SyntaxKind.FirstNode ? child : child.getFirstToken(sourceFile);
        }

        public getLastToken(sourceFile?: SourceFile): Node {
            const children = this.getChildren(sourceFile);

            const child = lastOrUndefined(children);
            if (!child) {
                return undefined;
            }

            return child.kind < SyntaxKind.FirstNode ? child : child.getLastToken(sourceFile);
        }
    }

    class TokenOrIdentifierObject implements Token {
        public kind: SyntaxKind;
        public pos: number;
        public end: number;
        public flags: NodeFlags;
        public parent: Node;
        public jsDocComments: JSDocComment[];
        public __tokenTag: any;

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

        public getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number {
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

        public getChildCount(sourceFile?: SourceFile): number {
            return 0;
        }

        public getChildAt(index: number, sourceFile?: SourceFile): Node {
            return undefined;
        }

        public getChildren(sourceFile?: SourceFile): Node[] {
            return emptyArray;
        }

        public getFirstToken(sourceFile?: SourceFile): Node {
            return undefined;
        }

        public getLastToken(sourceFile?: SourceFile): Node {
            return undefined;
        }
    }

    class SymbolObject implements Symbol {
        flags: SymbolFlags;
        name: string;
        declarations: Declaration[];

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty string will be returned.
        documentationComment: SymbolDisplayPart[];

        constructor(flags: SymbolFlags, name: string) {
            this.flags = flags;
            this.name = name;
        }

        getFlags(): SymbolFlags {
            return this.flags;
        }

        getName(): string {
            return this.name;
        }

        getDeclarations(): Declaration[] {
            return this.declarations;
        }

        getDocumentationComment(): SymbolDisplayPart[] {
            if (this.documentationComment === undefined) {
                this.documentationComment = JsDoc.getJsDocCommentsFromDeclarations(this.declarations, this.name, !(this.flags & SymbolFlags.Property));
            }

            return this.documentationComment;
        }
    }

    class TokenObject extends TokenOrIdentifierObject {
        public kind: SyntaxKind;
        constructor(kind: SyntaxKind, pos: number, end: number) {
            super(pos, end);
            this.kind = kind;
        }
    }

    class IdentifierObject extends TokenOrIdentifierObject {
        constructor(kind: SyntaxKind, pos: number, end: number) {
            super(pos, end);
        }
    }
    IdentifierObject.prototype.kind = SyntaxKind.Identifier;

    class TypeObject implements Type {
        checker: TypeChecker;
        flags: TypeFlags;
        id: number;
        symbol: Symbol;
        constructor(checker: TypeChecker, flags: TypeFlags) {
            this.checker = checker;
            this.flags = flags;
        }
        getFlags(): TypeFlags {
            return this.flags;
        }
        getSymbol(): Symbol {
            return this.symbol;
        }
        getProperties(): Symbol[] {
            return this.checker.getPropertiesOfType(this);
        }
        getProperty(propertyName: string): Symbol {
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
        getStringIndexType(): Type {
            return this.checker.getIndexTypeOfType(this, IndexKind.String);
        }
        getNumberIndexType(): Type {
            return this.checker.getIndexTypeOfType(this, IndexKind.Number);
        }
        getBaseTypes(): ObjectType[] {
            return this.flags & (TypeFlags.Class | TypeFlags.Interface)
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
        typeParameters: TypeParameter[];
        parameters: Symbol[];
        thisParameter: Symbol;
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasLiteralTypes: boolean;

        // Undefined is used to indicate the value has not been computed. If, after computing, the
        // symbol has no doc comment, then the empty string will be returned.
        documentationComment: SymbolDisplayPart[];

        constructor(checker: TypeChecker) {
            this.checker = checker;
        }
        getDeclaration(): SignatureDeclaration {
            return this.declaration;
        }
        getTypeParameters(): Type[] {
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
                this.documentationComment = this.declaration ? JsDoc.getJsDocCommentsFromDeclarations(
                    [this.declaration],
                    /*name*/ undefined,
                    /*canUseParsedParamTagComments*/ false) : [];
            }

            return this.documentationComment;
        }
    }

    class SourceFileObject extends NodeObject implements SourceFile {
        public _declarationBrand: any;
        public fileName: string;
        public path: Path;
        public text: string;
        public scriptSnapshot: IScriptSnapshot;
        public lineMap: number[];

        public statements: NodeArray<Statement>;
        public endOfFileToken: Node;

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
        public nameTable: Map<number>;
        public resolvedModules: Map<ResolvedModule>;
        public resolvedTypeReferenceDirectiveNames: Map<ResolvedTypeReferenceDirective>;
        public imports: LiteralExpression[];
        public moduleAugmentations: LiteralExpression[];
        private namedDeclarations: Map<Declaration[]>;

        constructor(kind: SyntaxKind, pos: number, end: number) {
            super(kind, pos, end);
        }

        public update(newText: string, textChangeRange: TextChangeRange): SourceFile {
            return updateSourceFile(this, newText, textChangeRange);
        }

        public getLineAndCharacterOfPosition(position: number): LineAndCharacter {
            return ts.getLineAndCharacterOfPosition(this, position);
        }

        public getLineStarts(): number[] {
            return getLineStarts(this);
        }

        public getPositionOfLineAndCharacter(line: number, character: number): number {
            return ts.getPositionOfLineAndCharacter(this, line, character);
        }

        public getNamedDeclarations(): Map<Declaration[]> {
            if (!this.namedDeclarations) {
                this.namedDeclarations = this.computeNamedDeclarations();
            }

            return this.namedDeclarations;
        }

        private computeNamedDeclarations(): Map<Declaration[]> {
            const result = createMap<Declaration[]>();

            forEachChild(this, visit);

            return result;

            function addDeclaration(declaration: Declaration) {
                const name = getDeclarationName(declaration);
                if (name) {
                    multiMapAdd(result, name, declaration);
                }
            }

            function getDeclarations(name: string) {
                return result[name] || (result[name] = []);
            }

            function getDeclarationName(declaration: Declaration) {
                if (declaration.name) {
                    const result = getTextOfIdentifierOrLiteral(declaration.name);
                    if (result !== undefined) {
                        return result;
                    }

                    if (declaration.name.kind === SyntaxKind.ComputedPropertyName) {
                        const expr = (<ComputedPropertyName>declaration.name).expression;
                        if (expr.kind === SyntaxKind.PropertyAccessExpression) {
                            return (<PropertyAccessExpression>expr).name.text;
                        }

                        return getTextOfIdentifierOrLiteral(expr);
                    }
                }

                return undefined;
            }

            function getTextOfIdentifierOrLiteral(node: Node) {
                if (node) {
                    if (node.kind === SyntaxKind.Identifier ||
                        node.kind === SyntaxKind.StringLiteral ||
                        node.kind === SyntaxKind.NumericLiteral) {

                        return (<Identifier | LiteralExpression>node).text;
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

                            forEachChild(node, visit);
                        }
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
                    case SyntaxKind.ImportEqualsDeclaration:
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
                    // fall through
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.BindingElement: {
                        const decl = <VariableDeclaration>node;
                        if (isBindingPattern(decl.name)) {
                            forEachChild(decl.name, visit);
                            break;
                        }
                        if (decl.initializer)
                            visit(decl.initializer);
                    }
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

    export function getServicesObjectAllocator(): ObjectAllocator {
        return {
            getNodeConstructor: () => NodeObject,
            getTokenConstructor: () => TokenObject,
            getIdentifierConstructor: () => IdentifierObject,
            getSourceFileConstructor: () => SourceFileObject,
            getSymbolConstructor: () => SymbolObject,
            getTypeConstructor: () => TypeObject,
            getSignatureConstructor: () => SignatureObject,
        };
    }
}
