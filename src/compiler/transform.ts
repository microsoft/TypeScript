/// <reference path="factory.ts" />
/// <reference path="transform.generated.ts" />
/* @internal */
namespace ts.transform {
    
    /* @internal */ export let aggregateTime = 0;
    
    // Flags enum to track count of temp variables and a few dedicated names
    const enum TempFlags {
        Auto      = 0x00000000,  // No preferred name
        CountMask = 0x0FFFFFFF,  // Temp variable counter
        _i        = 0x10000000,  // Use/preference flag for '_i'
    }

    export function needsTransform(node: Node, mask: TransformFlags): boolean {
        return !!(node.transformFlags & mask);
    }

    let transformFlags: TransformFlags;

    export function aggregateTransformFlags(node: Node) {
        if (!node) {
            return;
        }

        aggregateTransformFlagsForThisNodeAndSubtree(node);
    }
    
    function aggregateTransformFlagsForThisNodeAndSubtree(node: Node) {
        if (node.transformFlags === undefined) {
            if (node.flags & NodeFlags.Ambient) {
                // Ambient nodes are marked as TypeScript early to prevent an unnecessary walk of the tree 
                return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
            }

            let transformFlagsOfChildren = aggregateTransformFlagsOfChildren(node);
            return computeTransformFlagsForNode(node, transformFlagsOfChildren);
        }
        
        return node.transformFlags & ~node.excludeTransformFlags;
    }
    
    function aggregateTransformFlagsOfChildren(node: Node) {
        let saveTransformFlags = transformFlags;
        transformFlags = 0;

        forEachChild(node, aggregateTransformFlagsForChildNode);

        let transformFlagsOfChildren = transformFlags;
        transformFlags = saveTransformFlags;

        return transformFlagsOfChildren & ~TransformFlags.NodeExcludes;
    }

    function aggregateTransformFlagsForChildNode(child: Node) {
        transformFlags |= aggregateTransformFlagsForThisNodeAndSubtree(child);
    }
    
    /**
      * Computes the transform flags for a node, given the transform flags of its subtree
      * @param node The node to analyze
      * @param subtreeFlags Transform flags computed for this node's subtree
      */
    export function computeTransformFlagsForNode(node: Node, subtreeFlags: TransformFlags) {
        let start = new Date().getTime();
        computeTransformFlagsForNodeWorker(node, subtreeFlags);
        aggregateTime += new Date().getTime() - start;
        return node.transformFlags & ~node.excludeTransformFlags;
     }
     
     function computeTransformFlagsForNodeWorker(node: Node, subtreeFlags: TransformFlags) {
        let transformFlags: TransformFlags;

        // Mark transformations needed for each node
        let kind = node.kind;
        switch (kind) {
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.ConstKeyword:
                return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;

            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ComputedPropertyName:
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.ForOfStatement:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;

            case SyntaxKind.YieldExpression:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6Yield;

            case SyntaxKind.ThisKeyword:
                return node.transformFlags = TransformFlags.ThisNodeIsThisKeyword;

            case SyntaxKind.SpreadElementExpression:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6SpreadElement;

            case SyntaxKind.BreakStatement:
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.ReturnStatement:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsCompletionStatement;

            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6VariableBindingPattern;

            case SyntaxKind.Decorator:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptDecorator;

            case SyntaxKind.ModuleDeclaration:
                return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript) 
                    & ~(node.excludeTransformFlags = TransformFlags.ModuleScopeExcludes);

            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.CallExpression:
                return (node.transformFlags = subtreeFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.CallOrArrayLiteralExcludes);
            
            case SyntaxKind.PropertyDeclaration:
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;

            case SyntaxKind.BinaryExpression:
                if (isDestructuringAssignment(node)) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;
                }
                break;

            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.PropertySignature:
                return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript)
                    & ~(node.excludeTransformFlags = TransformFlags.TypeExcludes);
                    
            case SyntaxKind.Parameter:
                if ((<ParameterDeclaration>node).questionToken) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }
                
                if ((<ParameterDeclaration>node).flags & NodeFlags.AccessibilityModifier) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                if ((<ParameterDeclaration>node).initializer) {
                    transformFlags |= TransformFlags.ThisNodeIsES6ParameterInitializer;
                }
                
                if ((<ParameterDeclaration>node).dotDotDotToken) {
                    transformFlags |= TransformFlags.ThisNodeIsES6RestParameter;
                }
                
                return node.transformFlags = subtreeFlags | transformFlags;

            case SyntaxKind.ArrowFunction:
                transformFlags = TransformFlags.ThisNodeIsES6;
                if (subtreeFlags & TransformFlags.SubtreeContainsLexicalThis) {
                    transformFlags |= TransformFlags.ThisNodeCapturesLexicalThis;
                }
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.ArrowFunctionScopeExcludes);

            case SyntaxKind.FunctionExpression:
                if ((<FunctionLikeDeclaration>node).asteriskToken
                    || transformFlags & TransformFlags.SubtreeContainsES6ParameterOrCapturedThis) {
                    transformFlags |= TransformFlags.ThisNodeIsES6;
                }

                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.FunctionDeclaration:
                if (!(<MethodDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }
                
                transformFlags = TransformFlags.ThisNodeIsHoistedDeclaration;
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                if ((<FunctionLikeDeclaration>node).asteriskToken
                    || node.flags & NodeFlags.Export
                    || subtreeFlags & TransformFlags.SubtreeContainsES6ParameterOrCapturedThis) {
                    transformFlags |= TransformFlags.ThisNodeIsES6;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.VariableDeclarationList:
                transformFlags = TransformFlags.ThisNodeIsHoistedDeclaration;
                if (node.flags & (NodeFlags.Let | NodeFlags.Const)) {
                    transformFlags |= TransformFlags.ThisNodeIsES6LetOrConst;
                }
                
                return node.transformFlags = subtreeFlags | transformFlags;

            case SyntaxKind.VariableStatement:
                if (node.flags & NodeFlags.Export) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;
                }
                break;

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                transformFlags = TransformFlags.ThisNodeIsES6;
                if (subtreeFlags & TransformFlags.ContainsTypeScriptClassSyntaxExtension) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }

                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.ClassScopeExcludes);

            case SyntaxKind.HeritageClause:
                if ((<HeritageClause>node).token !== SyntaxKind.ExtendsKeyword) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                break;

            case SyntaxKind.ExpressionWithTypeArguments:
                if ((<ExpressionWithTypeArguments>node).typeArguments) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;
                }
                
                break;

            case SyntaxKind.Constructor:
                if (!(<ConstructorDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.MethodDeclaration:
                if (!(<MethodDeclaration>node).body) {
                    return node.transformFlags = TransformFlags.ThisNodeIsTypeScript;
                }

                transformFlags = TransformFlags.ThisNodeIsES6;
                if (node.flags & NodeFlags.Async) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScript;
                }
                
                if (subtreeFlags & TransformFlags.ContainsTypeScriptDecorator
                    && (<MethodDeclaration>node).name.kind === SyntaxKind.ComputedPropertyName) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                if (subtreeFlags & TransformFlags.ContainsTypeScriptDecorator
                    && (<MethodDeclaration>node).name.kind === SyntaxKind.ComputedPropertyName) {
                    transformFlags |= TransformFlags.ThisNodeIsTypeScriptClassSyntaxExtension;
                }
                
                return (node.transformFlags = subtreeFlags | transformFlags)
                    & ~(node.excludeTransformFlags = TransformFlags.FunctionScopeExcludes);

            case SyntaxKind.ExportAssignment:
                if ((<ExportAssignment>node).isExportEquals) {
                    return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript;
                }
                
                return node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsES6;

            default:
                if (SyntaxKind.FirstTypeNode <= kind && kind <= SyntaxKind.LastTypeNode) {
                    return (node.transformFlags = subtreeFlags | TransformFlags.ThisNodeIsTypeScript)
                        & ~(node.excludeTransformFlags = TransformFlags.TypeExcludes);
                }
                
                break;
        }
        
        return node.transformFlags = subtreeFlags;
    }

    export class VisitorContext {
        private generatedNameSet: Map<string>;
        private nodeToGeneratedName: string[];
        private nodeToGeneratedIdentifier: Identifier[] = [];
        private isPinnedOrTripleSlashCommentCallback = (comment: CommentRange) => this.isPinnedOrTripleSlashCommentWorker(comment);
        
        // lexical environment stack
        private tempFlagStack: number[] = [];
        private hoistedVariableDeclarationsStack: VariableDeclaration[][] = [];
        private hoistedFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        
        // node stack
        private nodeStackSize: number = 1;
        private ancestorStack: Node[] = [];
        
        public compilerOptions: CompilerOptions;
        public languageVersion: ScriptTarget;
        public currentSourceFile: SourceFile;
        public resolver: EmitResolver;
        public parentNode: Node;
        public currentNode: Node;
        public getAncestorOrSelfCallback: (offset: number) => Node;
        
        constructor(compilerOptions: CompilerOptions, currentSourceFile: SourceFile, resolver: EmitResolver, generatedNameSet: Map<string>, nodeToGeneratedName: string[]) {
            this.compilerOptions = compilerOptions;
            this.languageVersion = compilerOptions.target || ScriptTarget.ES3;
            this.currentSourceFile = currentSourceFile;
            this.resolver = resolver;
            this.generatedNameSet = generatedNameSet;
            this.nodeToGeneratedName = nodeToGeneratedName;
            this.getAncestorOrSelfCallback = offset => this.peekNode(offset);
            this.currentNode = currentSourceFile;
        }
        
        public pushNode(node: Node): void {
            Debug.assert(node !== undefined, "Incorrect node stack behavior during push. Argument `node` is undefined.")
            Debug.assert(this.currentNode !== node, "Incorrect node stack behavior during push. Argument `node` is already the current node.");
            Debug.assert(this.parentNode !== node, "Incorrect node stack behavior during push. Argument `node` is already the parent node.");
            this.nodeStackSize++;
            if (this.nodeStackSize > 2) {
                this.ancestorStack.push(this.parentNode);
            }
            this.parentNode = this.currentNode;
            this.currentNode = node;
        }
        
        public popNode(): void {
            this.currentNode = this.parentNode;
            this.parentNode = this.nodeStackSize > 2 ? this.ancestorStack.pop() : undefined;
            this.nodeStackSize--;
        }
        
        public peekNode(offset: number): Node {
            switch (offset) {
                case 0: return this.currentNode;
                case 1: return this.parentNode;
                default: return this.nodeStackSize > 2 ? this.ancestorStack[this.nodeStackSize - 1 - offset] : undefined;
            }
        }

        public findAncestorNode<T extends Node>(match: (node: Node) => node is T): T;
        public findAncestorNode(match: (node: Node) => boolean): Node;
        public findAncestorNode(match: (node: Node) => boolean) {
            for (let i = 1; i < this.nodeStackSize; i++) {
                let node = this.peekNode(i);
                if (match(node)) {
                    return node;
                }
            }
            return undefined;
        }
        
        // Returns the node flags for the current node and all relevant parent nodes.  This is done so that
        // nodes like variable declarations and binding elements can return a view of their flags
        // that includes the modifiers from their container.  i.e. flags like export/declare aren't
        // stored on the variable declaration directly, but on the containing variable statement
        // (if it has one).  Similarly, flags for let/const are store on the variable declaration
        // list.  By calling this function, all those flags are combined so that the client can treat
        // the node as if it actually had those flags.
        public getCombinedNodeFlags(): NodeFlags {
            return getCombinedNodeFlags(this.currentNode, this.getAncestorOrSelfCallback, /*offset*/ 0);
        }

        public pushLexicalEnvironment(): void {
            this.tempFlagStack.push(0);
            this.hoistedVariableDeclarationsStack.push(undefined);
            this.hoistedFunctionDeclarationsStack.push(undefined);
        }

        public getHoistedVariableDeclarations(): VariableDeclaration[] {
            return this.hoistedVariableDeclarationsStack[this.hoistedVariableDeclarationsStack.length - 1];
        }

        public getHoistedFunctionDeclarations(): FunctionDeclaration[] {
            return this.hoistedFunctionDeclarationsStack[this.hoistedFunctionDeclarationsStack.length - 1];
        }
        
        public hasHoistedDeclarations(): boolean {
            return !!this.getHoistedVariableDeclarations()
                || !!this.getHoistedFunctionDeclarations();
        }
        
        public writeHoistedDeclarations(statements: Statement[]) {
            let hoistedVariableDeclarations = this.getHoistedVariableDeclarations();
            if (hoistedVariableDeclarations) {
                let varDecls = factory.createVariableDeclarationList(hoistedVariableDeclarations);
                let varStmt = factory.createVariableStatement2(varDecls);
                statements.push(varStmt);
            }
            
            let hoistedFunctionDeclarations = this.getHoistedFunctionDeclarations();
            if (hoistedFunctionDeclarations) {
                statements.push(...hoistedFunctionDeclarations);
            }
        }

        // Return the next available name in the pattern _a ... _z, _0, _1, ...
        // TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
        // Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
        public makeTempVariableName(flags: TempFlags): string {
            let tempFlags = this.tempFlagStack[this.tempFlagStack.length - 1];
            if (flags && !(tempFlags & flags)) {
                let name = flags === TempFlags._i ? "_i" : "_n";
                if (this.isUniqueName(name)) {
                    this.tempFlagStack[this.tempFlagStack.length - 1] = tempFlags |= flags;
                    return name;
                }
            }
            while (true) {
                let count = tempFlags & TempFlags.CountMask;
                tempFlags++;
                // Skip over 'i' and 'n'
                if (count !== 8 && count !== 13) {
                    let name = count < 26
                        ? "_" + String.fromCharCode(CharacterCodes.a + count)
                        : "_" + (count - 26);
                    if (this.isUniqueName(name)) {
                        this.tempFlagStack[this.tempFlagStack.length - 1] = tempFlags;
                        return name;
                    }
                }
            }
        }

        // Generate a name that is unique within the current file and doesn't conflict with any names
        // in global scope. The name is formed by adding an '_n' suffix to the specified base name,
        // where n is a positive integer. Note that names generated by makeTempVariableName and
        // makeUniqueName are guaranteed to never conflict.
        public makeUniqueName(baseName: string): string {
            // Find the first unique 'name_n', where n is a positive number
            if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
                baseName += "_";
            }
            let i = 1;
            while (true) {
                let generatedName = baseName + i;
                if (this.isUniqueName(generatedName)) {
                    return this.generatedNameSet[generatedName] = generatedName;
                }
                i++;
            }
        }

        public getGeneratedNameForNode(node: Node) {
            let id = getNodeId(node);
            return this.nodeToGeneratedIdentifier[id] || (this.nodeToGeneratedIdentifier[id] = factory.createIdentifier(this.getGeneratedNameTextForNode(node, id)));
        }
        
        public nodeHasGeneratedName(node: Node) {
            let id = getNodeId(node);
            return this.nodeToGeneratedName[id] !== undefined;
        }

        public getDeclarationName(node: DeclarationStatement): Identifier;
        public getDeclarationName(node: ClassLikeDeclaration): Identifier;
        public getDeclarationName(node: Declaration): DeclarationName;
        public getDeclarationName<T extends DeclarationName>(node: Declaration): T | Identifier {
            let name = node.name;
            if (name) {
                return nodeIsSynthesized(name) ? <T>name : factory.cloneNode(<T>name);
            }
            else {
                return this.getGeneratedNameForNode(node);
            }
        }

        public getClassMemberPrefix(node: ClassLikeDeclaration, member: ClassElement) {
            let expression: Expression = this.getDeclarationName(node);
            if (!(member.flags & NodeFlags.Static)) {
                expression = factory.createPropertyAccessExpression2(
                    expression,
                    factory.createIdentifier("prototype")
                );
            }

            return expression;
        }

        public createUniqueIdentifier(baseName: string): Identifier {
            let name = this.makeUniqueName(baseName);
            return factory.createIdentifier(name);
        }

        public createTempVariable(loopVariable: boolean): Identifier {
            let name = this.makeTempVariableName(loopVariable ? TempFlags._i : TempFlags.Auto);
            return factory.createIdentifier(name);
        }

        public declareLocal(baseName?: string): Identifier {
            let local = baseName
                ? this.createUniqueIdentifier(baseName)
                : this.createTempVariable(/*loopVariable*/ false);
            this.hoistVariableDeclaration(local);
            return local;
        }

        public hoistVariableDeclaration(name: Identifier): void {
            let hoistedVariableDeclarations = this.getHoistedVariableDeclarations();
            if (!hoistedVariableDeclarations) {
                this.hoistedVariableDeclarationsStack[this.hoistedVariableDeclarationsStack.length - 1] = hoistedVariableDeclarations = [];
            }

            hoistedVariableDeclarations.push(factory.createVariableDeclaration2(name));
        }

        public hoistFunctionDeclaration(func: FunctionDeclaration): void {
            let hoistedFunctionDeclarations = this.getHoistedFunctionDeclarations();
            if (!hoistedFunctionDeclarations) {
                this.hoistedFunctionDeclarationsStack[this.hoistedFunctionDeclarationsStack.length - 1] = hoistedFunctionDeclarations = [];
            }

            hoistedFunctionDeclarations.push(func);
        }

        public popLexicalEnvironment(): void {
            this.tempFlagStack.pop();
            this.hoistedVariableDeclarationsStack.pop();
            this.hoistedFunctionDeclarationsStack.pop();
        }

        public getLeadingCommentRanges(node: Node, onlyPinnedOrTripleSlashComments?: boolean) {
            let leadingCommentRanges: CommentRange[];

            while (node && !leadingCommentRanges) {
                leadingCommentRanges = (<SynthesizedNode>node).leadingCommentRanges;
                if (!leadingCommentRanges && !nodeIsSynthesized(node)) {
                    leadingCommentRanges = getLeadingCommentRangesOfNode(node, this.currentSourceFile);
                }

                node = node.original;
            }

            return this.filterComments(leadingCommentRanges, onlyPinnedOrTripleSlashComments);
        }

        public getTrailingCommentRanges(node: Node) {
            let trailingCommentRanges: CommentRange[];

            while (node && !trailingCommentRanges) {
                trailingCommentRanges = (<SynthesizedNode>node).trailingCommentRanges;
                if (!trailingCommentRanges && !nodeIsSynthesized(node)) {
                    trailingCommentRanges = getTrailingCommentRanges(this.currentSourceFile.text, node.pos);
                }

                node = node.original;
            }

            return trailingCommentRanges;
        }
        
        public childNodeStartPositionIsOnSameLine(parent: Node, child: Node) {
            if (nodeIsSynthesized(child)) {
                return !(<SynthesizedNode>child).startsOnNewLine;
            }
            if (nodeIsSynthesized(parent)) {
                return false;
            }
            return getLineOfLocalPosition(this.currentSourceFile, skipTrivia(this.currentSourceFile.text, parent.pos)) ===
                getLineOfLocalPosition(this.currentSourceFile, skipTrivia(this.currentSourceFile.text, child.pos));
        }

        private filterComments(ranges: CommentRange[], onlyPinnedOrTripleSlashComments: boolean): CommentRange[] {
            // If we're removing comments, then we want to strip out all but the pinned or
            // triple slash comments.
            if (ranges && onlyPinnedOrTripleSlashComments) {
                ranges = filter(ranges, this.isPinnedOrTripleSlashCommentCallback);
                if (ranges.length === 0) {
                    return undefined;
                }
            }

            return ranges;
        }

        private isPinnedOrTripleSlashCommentWorker(comment: CommentRange) {
            if (this.currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk) {
                return this.currentSourceFile.text.charCodeAt(comment.pos + 2) === CharacterCodes.exclamation;
            }
            // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text
            // so that we don't end up computing comment string and doing match for all // comments
            else if (this.currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.slash &&
                comment.pos + 2 < comment.end &&
                this.currentSourceFile.text.charCodeAt(comment.pos + 2) === CharacterCodes.slash &&
                this.currentSourceFile.text.substring(comment.pos, comment.end).match(fullTripleSlashReferencePathRegEx)) {
                return true;
            }
        }

        private isUniqueName(name: string): boolean {
            return !this.resolver.hasGlobalName(name)
                && !hasProperty(this.currentSourceFile.identifiers, name)
                && !hasProperty(this.generatedNameSet, name);
        }

        private isUniqueLocalName(name: string, container: Node): boolean {
            container = getOriginalNode(container);
            for (let node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && hasProperty(node.locals, name)) {
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (node.locals[name].flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                        return false;
                    }
                }
            }
            return true;
        }

        private getGeneratedNameTextForNode(node: Node, id: number) {
            return this.nodeToGeneratedName[id] || (this.nodeToGeneratedName[id] = unescapeIdentifier(this.generateNameForNode(node)));
        }

        private generateNameForNode(node: Node) {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return this.makeUniqueName((<Identifier>node).text);
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return this.generateNameForModuleOrEnum(<ModuleDeclaration | EnumDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ExportDeclaration:
                    return this.generateNameForImportOrExportDeclaration(<ImportDeclaration | ExportDeclaration>node);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ExportAssignment:
                    return this.generateNameForExportDefault();
                case SyntaxKind.ClassExpression:
                    return this.generateNameForClassExpression();
                case SyntaxKind.ComputedPropertyName:
                case SyntaxKind.Parameter:
                    return this.makeTempVariableName(TempFlags.Auto);
            }
        }

        private generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
            let name = node.name.text;
            // Use module/enum name itself if it is unique, otherwise make a unique variation
            return this.isUniqueLocalName(name, node) ? name : this.makeUniqueName(name);
        }

        private generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
            let expr = getExternalModuleName(node);
            let baseName = expr.kind === SyntaxKind.StringLiteral ?
                escapeIdentifier(makeIdentifierFromModuleName((<LiteralExpression>expr).text)) : "module";
            return this.makeUniqueName(baseName);
        }

        private generateNameForExportDefault() {
            return this.makeUniqueName("default");
        }

        private generateNameForClassExpression() {
            return this.makeUniqueName("class");
        }
    }
    
    // single node transform
    let updatedNode: Node;
    let writeOneNode: typeof writeOneNodeSlow;
    
    // single statement transform
    let updatedStatement: Statement;
    let updatedBlock: Block;
    let writeOneStatement: typeof writeOneStatementSlow;
    
    // multiple node transform
    let originalNodes: Node[];
    let updatedNodes: Node[];
    let offsetWritten: number;
    let writeOneNodeToNodeArray: typeof writeOneNodeToNodeArraySlow;
    
    function writeNode(node: Node) {
        if (!node) {
            return;
        }

        aggregateTransformFlags(node);
        writeOneNode(node);
    }
    
    function writeOneNodeSlow(node: Node) {
        updatedNode = node;
        writeOneNode = writeOneNodeFast;
    }
    
    function writeOneNodeFast(node: Node) {
        Debug.fail("Node already written");
    }
    
    function writeStatement(node: Statement) {
        if (!node) {
            return;
        }
        
        aggregateTransformFlags(node);
        writeOneStatement(node);
    }
    
    function writeOneStatementSlow(node: Statement) {
        updatedStatement = node;
        writeOneStatement = writeOneStatementModerate;
    }
    
    function writeOneStatementModerate(node: Statement) {
        updatedBlock = factory.createBlock([updatedStatement, node]);
        writeOneStatement = writeOneStatementFast;
    }
    
    function writeOneStatementFast(node: Statement) {
        updatedBlock.statements.push(node);
    }
    
    function writeNodeToNodeArray(node: Node) {
        if (!node) {
            return;
        }
        
        aggregateTransformFlags(node);
        writeOneNodeToNodeArray(node);
    }
    
    function writeOneNodeToNodeArraySlow(node: Node) {
        if (offsetWritten === originalNodes.length || originalNodes[offsetWritten] !== node) {
            updatedNodes = originalNodes.slice(0, offsetWritten);
            updatedNodes.push(node);
            writeOneNodeToNodeArray = writeOneNodeToNodeArrayFast;
        }
        else {
            offsetWritten++;
        }
    }
    
    function writeOneNodeToNodeArrayFast(node: Node) {
        updatedNodes.push(node);
    }
    
    export type Visitor = (context: VisitorContext, input: Node, write: (node: Node) => void) => void;

    export function visitNode<T extends Node>(context: VisitorContext, node: T, visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void): T {
        if (!node) {
            return node;
        }
        
        let savedUpdatedNode = updatedNode;
        let savedWriteOneNode = writeOneNode;
        updatedNode = undefined;
        writeOneNode = writeOneNodeSlow;

        context.pushNode(node);
        visitor(context, node, writeNode);
        context.popNode();
        
        let visited = <T>updatedNode;
        updatedNode = savedUpdatedNode;
        writeOneNode = savedWriteOneNode;
        
        return visited;
    }
    
    export function visitStatement(context: VisitorContext, node: Statement, visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void) {
        if (!node) {
            return node;
        }
        
        let savedUpdatedStatement = updatedStatement;
        let savedUpdatedBlock = updatedBlock;
        let savedWriteOneStatement = writeOneStatement;
        updatedStatement = undefined;
        updatedBlock = undefined;
        writeOneStatement = writeOneStatementSlow;

        context.pushNode(node);
        visitor(context, node, writeStatement);
        context.popNode();

        let visited = updatedBlock || updatedStatement;
        updatedStatement = savedUpdatedStatement;
        updatedBlock = savedUpdatedBlock;
        writeOneStatement = savedWriteOneStatement;
        
        return visited;
    }
    
    export function visitNodes<T extends Node>(context: VisitorContext, nodes: T[], visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void): NodeArray<T> {
        if (!nodes) {
            return nodes ? factory.createNodeArray(nodes) : undefined;
        }
        
        let savedOriginalNodes = originalNodes;
        let savedUpdatedNodes = updatedNodes;
        let savedOffsetWritten = offsetWritten;
        let savedWriteOneNodeToNodeArray = writeOneNodeToNodeArray;
        originalNodes = nodes;
        updatedNodes = undefined;
        offsetWritten = 0;
        writeOneNodeToNodeArray = writeOneNodeToNodeArraySlow;
        
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            context.pushNode(node);
            visitor(context, node, writeNodeToNodeArray);
            context.popNode();
        }
        
        let visited: NodeArray<Node>;
        if (updatedNodes) {
            visited = factory.createNodeArray(updatedNodes, /*location*/ <NodeArray<Node>>originalNodes);
        }
        else if (offsetWritten !== originalNodes.length) {
            visited = factory.createNodeArray(originalNodes.slice(0, offsetWritten), /*location*/ <NodeArray<Node>>originalNodes);
        }
        else {
            visited = factory.createNodeArray(originalNodes);
        }
        
        originalNodes = savedOriginalNodes;
        updatedNodes = savedUpdatedNodes;
        offsetWritten = savedOffsetWritten;
        writeOneNodeToNodeArray = savedWriteOneNodeToNodeArray;
        return <NodeArray<T>>visited; 
        
        // let updatedNodes: T[];
        // //let cacheOffset = 0;
        // for (var i = 0; i < nodes.length; i++) {
        //     let node = nodes[i];
        //     // if (cache && cache.shouldCachePreviousNodes(node)) {
        //     //     if (!updatedNodes) {
        //     //         updatedNodes = nodes.slice(0, i);
        //     //     }

        //     //     while (cacheOffset < updatedIndex) {
        //     //         updatedNodes[cacheOffset] = cache.cacheNode(updatedNodes[cacheOffset]);
        //     //         cacheOffset++;
        //     //     }

        //     //     cacheOffset = updatedIndex;
        //     // }

        //     let updatedNode = visitNode(context, node, visitor);
        //     if (updatedNodes || !updatedNode || updatedNode !== node) {
        //         if (!updatedNodes) {
        //             updatedNodes = nodes.slice(0, i);
        //         }
        //         if (updatedNode) {
        //             if (isSynthesizedList(updatedNode)) {
        //                 let synthesizedList = <SynthesizedList<T>>updatedNode;
        //                 flattenSynthesizedList(synthesizedList, updatedNodes);
        //             }
        //             else {
        //                 updatedNodes.push(<T>updatedNode);
        //             }
        //         }
        //     }
        // }
    }
    
    /**
      * Visits a Block in a new lexical scope.
      */
    export function visitBlockInNewLexicalEnvironment(context: VisitorContext, node: Block, visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void): Block {
        return visitNodeInNewLexicalEnvironment(context, node, visitor, afterVisitBlockInNewLexicalEnvironment);
    }

    /**
      * Visits a Block or an Expression that starts a new lexical scope.
      */
    export function visitBlockOrExpressionInNewLexicalEnvironment(context: VisitorContext, node: Block | Expression, visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void): Block | Expression {
        return visitNodeInNewLexicalEnvironment(context, node, visitor, afterVisitBlockOrExpressionInNewLexicalEnvironment);
    }

    /**
      * Visits a ModuleBlock or a ModuleDeclaration in a new lexical scope.
      */
    export function visitModuleBlockOrModuleDeclarationInNewLexicalEnvironment(context: VisitorContext, node: ModuleBlock | ModuleDeclaration, visitor: (context: VisitorContext, input: Node, write: (node: Node) => void) => void): ModuleBlock | ModuleDeclaration {
        return visitNodeInNewLexicalEnvironment(context, node, visitor, afterVisitModuleBlockOrModuleDeclarationInNewLexicalEnvironment);
    }

    /**
      * Visits a node that starts a new lexical environment.
      */
    function visitNodeInNewLexicalEnvironment<TNode extends Node>(context: VisitorContext, node: TNode, visitor: Visitor, afterVisit: (visited: TNode, statements: Statement[]) => TNode): TNode {
        // When we visit a node that starts a new lexical environment, there is a possibility
        // that a new subtree will be returned that may have declared new temporary variables
        // or needed to hoist function declarations (such as in a downlevel generator).
        //
        // To support this, we keep track of temp flags in the `VisitorContext`
        // along with arrays for any hoisted variable declarations or function
        // declarations. We save the context from the caller and restore it
        // at the end of the function call as we descend into a tree.
        //
        // The `afterVisit` callback is used to verify that the result of visiting the node
        // is consistent with the expected return value, as `Visitor` is generally
        // untyped and could return any `Node` subtype. The `afterVisit` callback is also
        // used to specialize how hoisted declarations should be merged into the visited
        // node.

        // Save and reset temp flags and hoisted declarations for the lexical environment
        context.pushLexicalEnvironment();

        // Visit the block or expression
        let visited = <TNode>visitNode(context, node, visitor);

        // If the visited node differs from the original node, or we declared new hoisted
        // declarations in this lexical environment, we should call the `afterVisit` callback.
        let hoistedVariableDeclarations = context.getHoistedVariableDeclarations();
        let hoistedFunctionDeclarations = context.getHoistedFunctionDeclarations();
        if (!visited || visited !== node || hoistedVariableDeclarations || hoistedFunctionDeclarations) {
            // If there were any new hoisted declarations added in this lexical environment, we should
            // include them in the statments we pass to the `afterVisit` callback.
            let statements: Statement[];
            if (hoistedVariableDeclarations || hoistedFunctionDeclarations) {
                statements = [];
                if (hoistedVariableDeclarations) {
                    statements.push(factory.createVariableStatement2(factory.createVariableDeclarationList(hoistedVariableDeclarations)));
                }
                if (hoistedFunctionDeclarations) {
                    statements.push(...hoistedFunctionDeclarations);
                }
            }

            // Perform any assertions and merge generated statements with the visited node.
            visited = afterVisit(visited, statements);
        }

        // Restore temp flags and hoisted declarations from the caller
        context.popLexicalEnvironment();
        return visited;
    }

    function afterVisitBlockInNewLexicalEnvironment(visited: Block, statements: Statement[]): Block {
        Debug.assert(!visited || isBlock(visited), "Wrong node kind after visit.");

        let merged: Block;
        if (statements) {
            if (visited) {
                merged = factory.updateBlock(visited, [
                    ...statements,
                    ...visited.statements
                ]);
            }
            else {
                merged = factory.createBlock(statements);
            }
        }

        return merged || visited;
    }

    function afterVisitBlockOrExpressionInNewLexicalEnvironment(visited: Block | Expression, statements: Statement[]): Block | Expression {
        Debug.assert(!visited || isBlock(visited) || isExpression(visited), "Wrong node kind after visit.");

        let merged: Block | Expression;
        if (statements) {
            if (visited) {
                if (isBlock(visited)) {
                    merged = factory.updateBlock(visited, [
                        ...statements,
                        ...visited.statements
                    ]);
                }
                else {
                    merged = factory.createBlock([
                        ...statements,
                        factory.createReturnStatement(<Expression>visited)
                    ]);
                }
            }
            else {
                merged = factory.createBlock(statements);
            }
        }

        return merged || visited;
    }

    function afterVisitModuleBlockOrModuleDeclarationInNewLexicalEnvironment(visited: ModuleBlock | ModuleDeclaration, statements: Statement[]): ModuleBlock | ModuleDeclaration {
        Debug.assert(!visited || isModuleBlock(visited) || isModuleDeclaration(visited), "Wrong node kind after visit.");

        let merged: ModuleBlock | ModuleDeclaration;
        if (statements) {
            if (visited) {
                if (isModuleBlock(visited)) {
                    merged = factory.updateModuleBlock(visited, [
                        ...statements,
                        ...visited.statements
                    ]);
                }
                else {
                    merged = factory.createModuleBlock([
                        ...statements,
                        factory.cloneNode(visited, /*location*/ visited, /*flags*/ visited.flags | NodeFlags.Export)
                    ]);
                }
            }
            else {
                merged = factory.createModuleBlock(statements);
            }
        }

        return merged || visited;
    }
}