/** @internal */
namespace ts.classifier.v2020 {

    export const enum TokenEncodingConsts {
        typeOffset = 8,
        modifierMask = (1 << typeOffset) - 1
    }

    export const enum TokenType {
        class, enum, interface, namespace, typeParameter, type, parameter, variable, enumMember, property, function, member
    }

    export const enum TokenModifier {
        declaration, static, async, readonly, defaultLibrary, local, _
    }

    /** This is mainly used internally for testing */
    export function getSemanticClassifications(program: Program, cancellationToken: CancellationToken, sourceFile: SourceFile, span: TextSpan): ClassifiedSpan2020[] {
        const classifications = getEncodedSemanticClassifications(program, cancellationToken, sourceFile, span);

        Debug.assert(classifications.spans.length % 3 === 0);
        const dense = classifications.spans;
        const result: ClassifiedSpan2020[] = [];
        for (let i = 0; i < dense.length; i += 3) {
            result.push({
                textSpan: createTextSpan(dense[i], dense[i + 1]),
                classificationType: dense[i + 2]
            });
        }

        return result;
    }

    export function getEncodedSemanticClassifications(program: Program, _cancellationToken: CancellationToken, sourceFile: SourceFile, _span: TextSpan) {
        const context = new Context(program, sourceFile);
        visitSourceFile(context, sourceFile);
        return {
            spans: context.result,
            endOfLineState: EndOfLineState.None
        };
    }

    const enum SemanticMeaning {
        None = 0x0,
        Value = 0x1,
        Type = 0x2,
        Namespace = 0x4,
        All = Value | Type | Namespace
    }

    const enum CanUseLocals {
        False = 0,
        True = 1,
    }

    const enum IsCallExpression {
        False = 0,
        True = 1
    }

    const enum IsRightSideOfExpression {
        False = 0,
        True = 1
    }

    const valueSymbolFlags = (
        SymbolFlags.FunctionScopedVariable
        | SymbolFlags.BlockScopedVariable
        | SymbolFlags.Property
        | SymbolFlags.Function
    );

    const emptyLocals: SymbolTable = <SymbolTable><unknown>new Map<__String, Symbol>();

    // Using internal TS API:
    interface NodeWithLocals {
        locals: SymbolTable | undefined;
    }
    interface NodeWithSymbol {
        symbol: Symbol | undefined;
    }
    interface ProgramWithDiagnosticsProducingTypeChecker {
        getDiagnosticsProducingTypeChecker(): TypeChecker;
    }
    interface SymbolWithExportSymbol {
        exportSymbol: Symbol | undefined;
    }

    class Context {

        private readonly program: Program;
        private readonly typeChecker: TypeChecker;
        public readonly sourceFile: SourceFile;

        private readonly locals: SymbolTable[];

        private readonly scopeSymbolCacheStack: Map<Symbol | undefined>[];
        private scopeSymbolCache: Map<Symbol | undefined>;

        private readonly thisSymbolStack: (Symbol | undefined)[];
        private thisSymbol: Symbol | undefined;

        private readonly symbolToEncodedTokenType: ESMap<Symbol, number>;

        public readonly result: number[];
        public resultLen: number;

        constructor(program: Program, sourceFile: SourceFile) {
            this.program = program;
            this.typeChecker = (<ProgramWithDiagnosticsProducingTypeChecker><unknown>this.program).getDiagnosticsProducingTypeChecker();
            this.sourceFile = sourceFile;
            this.locals = [];
            this.scopeSymbolCacheStack = [new Map()];
            this.scopeSymbolCache = this.scopeSymbolCacheStack[this.scopeSymbolCacheStack.length - 1];
            this.thisSymbolStack = [undefined];
            this.thisSymbol = this.thisSymbolStack[this.thisSymbolStack.length - 1];
            this.symbolToEncodedTokenType = new Map();
            this.result = [];
            this.resultLen = 0;
        }

        public findSymbolInLocals(escapedText: __String, meaning: SemanticMeaning): Symbol | undefined {
            const locals = this.locals;
            for (let i = locals.length - 1; i >= 0; i--) {
                const symbolTable = locals[i];
                const symbol = symbolTable.get(escapedText);
                if (symbol) {
                    if (((meaning & SemanticMeaning.Value) === 0) && (symbol.getFlags() & valueSymbolFlags)) {
                        // we are not looking for Value
                        continue;
                    }
                    const symbolWithExportSymbol = (<SymbolWithExportSymbol><unknown>symbol);
                    if (symbolWithExportSymbol.exportSymbol) {
                        return symbolWithExportSymbol.exportSymbol;
                    }
                    return symbol;
                }
            }
            return undefined;
        }

        public pushResult(node: Identifier | PrivateIdentifier, tokenType: TokenType, modifiers: number): void {
            const nodeWidth = node.getWidth();
            if (nodeWidth === 0) {
                return;
            }
            const result = this.result;
            let resultLen = this.resultLen;
            result[resultLen++] = node.getStart();
            result[resultLen++] = nodeWidth;
            result[resultLen++] = ((tokenType + 1) << TokenEncodingConsts.typeOffset) + modifiers;
            this.resultLen = resultLen;
        }

        public pushEncodedResult(node: Identifier | PrivateIdentifier, encodedToken: number): void {
            const nodeWidth = node.getWidth();
            if (nodeWidth === 0) {
                return;
            }
            const result = this.result;
            let resultLen = this.resultLen;
            result[resultLen++] = node.getStart();
            result[resultLen++] = nodeWidth;
            result[resultLen++] = encodedToken;
            this.resultLen = resultLen;
        }

        public pushResultFromSymbolCache(symbol: Symbol, node: Identifier | PrivateIdentifier, extraTokenModifiers: number, isCallExpression: IsCallExpression, isRightSideOfExpression: IsRightSideOfExpression): boolean {
            const cachedEncodedTokenType = this.symbolToEncodedTokenType.get(symbol);
            if (typeof cachedEncodedTokenType !== "undefined") {
                let tokenType = (cachedEncodedTokenType >>> TokenEncodingConsts.typeOffset) - 1;
                let tokenModifiers = (cachedEncodedTokenType & TokenEncodingConsts.modifierMask);
                if (symbol.valueDeclaration && symbol.valueDeclaration.kind === SyntaxKind.Parameter && symbol.valueDeclaration.parent.kind === SyntaxKind.Constructor) {
                    // handle the case of a property declaration in constructor
                    if (isRightSideOfExpression === IsRightSideOfExpression.True) {
                        if (tokenType === TokenType.parameter) {
                            tokenType = TokenType.property;
                        }
                        else if (tokenType === TokenType.function) {
                            tokenType = TokenType.member;
                        }
                    }
                    else {
                        if (tokenType === TokenType.property) {
                            tokenType = TokenType.parameter;
                        }
                        else if (tokenType === TokenType.member) {
                            tokenType = TokenType.function;
                        }
                    }
                }
                if (isCallExpression === IsCallExpression.True && (tokenType === TokenType.variable || tokenType === TokenType.property || tokenType === TokenType.parameter)) {
                    tokenType = tokenType === TokenType.property ? TokenType.member : TokenType.function;
                }
                tokenModifiers = tokenModifiers | extraTokenModifiers;
                this.pushResult(node, tokenType, tokenModifiers);
                return true;
            }
            return false;
        }

        public saveResultInSymbolCache(symbol: Symbol, encodedTokenType: number): void {
            this.symbolToEncodedTokenType.set(symbol, encodedTokenType);
        }

        public pushThisSymbol(nodeScopeThis: Symbol | undefined): void {
            this.thisSymbolStack.push(nodeScopeThis);
            this.thisSymbol = this.thisSymbolStack[this.thisSymbolStack.length - 1];
        }

        public popThisSymbol(): void {
            this.thisSymbolStack.pop();
            this.thisSymbol = this.thisSymbolStack[this.thisSymbolStack.length - 1];
        }

        public getThisSymbol(): Symbol | undefined {
            return this.thisSymbol;
        }

        public pushLocals(nodeLocals: SymbolTable | undefined): void {
            if (!nodeLocals) {
                this.locals.push(emptyLocals);
                return;
            }
            // if any aliases are present, make a new symbol table
            let hasAlias = false;
            nodeLocals.forEach((symbol) => {
                if (hasAlias) {
                    return;
                }
                hasAlias = (symbol.flags & SymbolFlags.Alias) ? true : false;
            });

            if (hasAlias) {
                // must recreate symbol table with resolved aliases
                const newSymbolTable = new Map<__String, Symbol>();
                nodeLocals.forEach((symbol, key) => {
                    if (symbol.flags & SymbolFlags.Alias) {
                        newSymbolTable.set(key, this.typeChecker.getAliasedSymbol(symbol));
                    }
                    else {
                        newSymbolTable.set(key, symbol);
                    }
                });
                this.locals.push(<SymbolTable><unknown>newSymbolTable);
            }
            else {
                this.locals.push(nodeLocals);
            }
        }

        public popLocals(): void {
            this.locals.pop();
        }

        public pushScope(nodeLocals: SymbolTable | undefined): void {
            this.scopeSymbolCacheStack.push(new Map<string, Symbol | undefined>());
            this.scopeSymbolCache = this.scopeSymbolCacheStack[this.scopeSymbolCacheStack.length - 1];
            this.pushLocals(nodeLocals);
        }

        public popScope(): void {
            this.scopeSymbolCacheStack.pop();
            this.scopeSymbolCache = this.scopeSymbolCacheStack[this.scopeSymbolCacheStack.length - 1];
            this.popLocals();
        }

        public getCachedScopeSymbol(cacheKey: string): Symbol | undefined {
            return this.scopeSymbolCache.get(cacheKey);
        }

        public setCachedScopeSymbol(cacheKey: string, symbol: Symbol | undefined): void {
            this.scopeSymbolCache.set(cacheKey, symbol);
        }

        public getTypeCheckerSymbolAtLocation(node: Node): Symbol | undefined {
            const symbol = this.typeChecker.getSymbolAtLocation(node);
            if (symbol && symbol.flags & SymbolFlags.Alias) {
                return this.typeChecker.getAliasedSymbol(symbol);
            }
            return symbol;
        }

        public reclassifyWithType(node: Node, tokenType: TokenType.variable | TokenType.property | TokenType.parameter): TokenType {
            // type based classifications
            const type = this.typeChecker.getTypeAtLocation(node);
            if (type) {
                if (tokenType !== TokenType.parameter && typeHasConstructSignatures(type)) {
                    return TokenType.class;
                }
                if (typeHasCallSignatures(type) && !typeHasProperties(type)) {
                    return tokenType === TokenType.property ? TokenType.member : TokenType.function;
                }
            }
            return tokenType;
        }

        public isSourceFileDefaultLibrary(sourceFile: SourceFile): boolean {
            return this.program.isSourceFileDefaultLibrary(sourceFile);
        }
    }

    function getSymbolFast(ctx: Context, node: Identifier, meaning: SemanticMeaning, canUseLocals: CanUseLocals): Symbol | undefined {
        const escapedText = node.escapedText;
        if (canUseLocals === CanUseLocals.True) {
            const symbolInLocals = ctx.findSymbolInLocals(escapedText, meaning);
            if (symbolInLocals) {
                return symbolInLocals;
            }
        }
        const cacheKey = `${meaning}${escapedText}`;
        const symbolInCache = ctx.getCachedScopeSymbol(cacheKey);
        if (typeof symbolInCache !== "undefined") {
            return symbolInCache;
        }
        const symbol = ctx.getTypeCheckerSymbolAtLocation(node) || undefined;
        ctx.setCachedScopeSymbol(cacheKey, symbol);
        return symbol;
    }

    function nodeModifiersToTokenModifiers(modifiers: ModifiersArray | undefined): number {
        if (!modifiers) {
            return 0;
        }
        let result = 0;
        for (const modifier of modifiers) {
            if (modifier.kind === SyntaxKind.StaticKeyword) {
                result |= 1 << TokenModifier.static;
            }
            else if (modifier.kind === SyntaxKind.AsyncKeyword) {
                result |= 1 << TokenModifier.async;
            }
            else if (modifier.kind === SyntaxKind.ReadonlyKeyword) {
                result |= 1 << TokenModifier.readonly;
            }
        }
        return result;
    }

    function canCacheSymbol(symbol: Symbol | undefined): boolean {
        // can only cache symbols that have 1 declaration or that have multiple declarations of the same kind
        if (!symbol || !symbol.declarations || symbol.declarations.length <= 1) {
            return true;
        }
        const kind = symbol.declarations[0].kind;
        for (let i = 1, len = symbol.declarations.length; i < len; i++) {
            if (symbol.declarations[i].kind !== kind) {
                return false;
            }
        }
        return true;
    }

    function visitIdentifierInDeclaration(ctx: Context, node: Identifier, symbol: Symbol | undefined, _meaning: SemanticMeaning, tokenType: TokenType, tokenModifiers: number): void {
        const canCache = canCacheSymbol(symbol);
        if (canCache && symbol && ctx.pushResultFromSymbolCache(symbol, node, (1 << TokenModifier.declaration), IsCallExpression.False, IsRightSideOfExpression.False)) {
            return;
        }

        if (tokenType === TokenType.variable || tokenType === TokenType.property || tokenType === TokenType.parameter) {
            tokenType = ctx.reclassifyWithType(node, tokenType);
            if (tokenType !== TokenType.variable && tokenType !== TokenType.function) {
                // the token has changed its type, be sure to remove local
                tokenModifiers &= ~(1 << TokenModifier.local);
            }
        }

        const encodedTokenType = ((tokenType + 1) << TokenEncodingConsts.typeOffset) | tokenModifiers;
        if (canCache && symbol) {
            ctx.saveResultInSymbolCache(symbol, encodedTokenType);
        }
        ctx.pushEncodedResult(node, encodedTokenType | (1 << TokenModifier.declaration));
    }

    function visitIdentifierWithSymbol(ctx: Context, node: Identifier | PrivateIdentifier, symbol: Symbol, meaning: SemanticMeaning, isCallExpression: IsCallExpression, isRightSideOfExpression: IsRightSideOfExpression): void {
        let canCache = canCacheSymbol(symbol);
        if (canCache && ctx.pushResultFromSymbolCache(symbol, node, 0, isCallExpression, isRightSideOfExpression)) {
            return;
        }

        const flags = symbol.getFlags();
        let decl = symbol.valueDeclaration || (symbol.declarations && symbol.declarations[0]);
        let tokenType: TokenType;
        if (flags & SymbolFlags.Class) {
            tokenType = TokenType.class;
        }
        else if (flags & SymbolFlags.Enum) {
            tokenType = TokenType.enum;
        }
        else if (flags & SymbolFlags.TypeAlias) {
            tokenType = TokenType.type;
        }
        else if ((flags & SymbolFlags.Interface) && (meaning & SemanticMeaning.Type)) {
            tokenType = TokenType.interface;
        }
        else if (flags & SymbolFlags.TypeParameter) {
            tokenType = TokenType.typeParameter;
        }
        else if (decl) {
            if (decl.kind === SyntaxKind.BindingElement) {
                decl = findBindingElementParentDeclaration(<BindingElement>decl);
            }
            switch (decl.kind) {
                case SyntaxKind.VariableDeclaration: tokenType = TokenType.variable; break;
                case SyntaxKind.Parameter:
                    // handle the case of a property declaration in constructor
                    if (isRightSideOfExpression === IsRightSideOfExpression.True) {
                        tokenType = TokenType.property;
                    }
                    else {
                        tokenType = TokenType.parameter;
                    }
                    break;
                case SyntaxKind.PropertyDeclaration: tokenType = TokenType.property; break;
                case SyntaxKind.ModuleDeclaration: tokenType = TokenType.namespace; break;
                case SyntaxKind.EnumDeclaration: tokenType = TokenType.enum; break;
                case SyntaxKind.EnumMember: tokenType = TokenType.enumMember; break;
                case SyntaxKind.ClassDeclaration: tokenType = TokenType.class; break;
                case SyntaxKind.MethodDeclaration: tokenType = TokenType.member; break;
                case SyntaxKind.FunctionDeclaration: tokenType = TokenType.function; break;
                case SyntaxKind.FunctionExpression: tokenType = TokenType.function; break;
                case SyntaxKind.MethodSignature: tokenType = TokenType.member; break;
                case SyntaxKind.GetAccessor: tokenType = TokenType.property; break;
                case SyntaxKind.PropertySignature: tokenType = TokenType.property; break;
                case SyntaxKind.InterfaceDeclaration: tokenType = TokenType.interface; break;
                case SyntaxKind.TypeAliasDeclaration: tokenType = TokenType.type; break;
                case SyntaxKind.TypeParameter: tokenType = TokenType.typeParameter; break;
                case SyntaxKind.PropertyAssignment: tokenType = TokenType.property; break;
                case SyntaxKind.ShorthandPropertyAssignment: tokenType = TokenType.property; break;
                default:
                    return;
            }
        }
        else {
            return;
        }

        const isDefaultLibrary = ctx.isSourceFileDefaultLibrary(decl.getSourceFile());

        if (tokenType === TokenType.variable || tokenType === TokenType.property || tokenType === TokenType.parameter) {
            if (isCallExpression === IsCallExpression.True && !isDefaultLibrary) {
                // normally, classes cannot be called, but there are default library symbols like String which can appear in a call expression
                tokenType = tokenType === TokenType.property ? TokenType.member : TokenType.function;
                canCache = false;
            }
            else {
                tokenType = ctx.reclassifyWithType(node, tokenType);
            }
        }

        let modifierSet = 0;
        const valueDecl = symbol.valueDeclaration;
        if (valueDecl) {
            const modifiers = getCombinedModifierFlags(valueDecl);
            const nodeFlags = getCombinedNodeFlags(valueDecl);
            if (modifiers & ModifierFlags.Static) {
                modifierSet |= 1 << TokenModifier.static;
            }
            if (modifiers & ModifierFlags.Async) {
                modifierSet |= 1 << TokenModifier.async;
            }
            if (tokenType !== TokenType.interface) {
                if ((modifiers & ModifierFlags.Readonly) || (nodeFlags & NodeFlags.Const) || (flags & SymbolFlags.EnumMember)) {
                    modifierSet |= 1 << TokenModifier.readonly;
                }
            }
            if ((tokenType === TokenType.variable || tokenType === TokenType.function) && isLocalDeclaration(valueDecl, ctx.sourceFile)) {
                modifierSet |= 1 << TokenModifier.local;
            }
        }

        if (isDefaultLibrary) {
            modifierSet |= 1 << TokenModifier.defaultLibrary;
        }

        const encodedTokenType = ((tokenType + 1) << TokenEncodingConsts.typeOffset) | modifierSet;
        if (canCache) {
            ctx.saveResultInSymbolCache(symbol, encodedTokenType);
        }
        ctx.pushEncodedResult(node, encodedTokenType);
    }
    function visitIdentifier(ctx: Context, node: Identifier, meaning: SemanticMeaning, canUseLocals: CanUseLocals, isCallExpression: IsCallExpression): Symbol | undefined {
        const symbol = getSymbolFast(ctx, node, meaning, canUseLocals);
        if (!symbol) {
            return undefined;
        }
        visitIdentifierWithSymbol(ctx, node, symbol, meaning, isCallExpression, IsRightSideOfExpression.False);
        return symbol;
    }
    function visitPropertyName(ctx: Context, node: StringLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier): void {
        if (node.kind === SyntaxKind.ComputedPropertyName) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitQualifiedName(ctx: Context, node: QualifiedName, meaning: SemanticMeaning): Symbol | undefined {
        return visitQualifiedNameWithSplitMeaning(ctx, node, meaning, meaning);
    }
    function visitQualifiedNameWithSplitMeaning(ctx: Context, node: QualifiedName, meaningLeft: SemanticMeaning, meaningRight: SemanticMeaning): Symbol | undefined {
        const leftSymbol = visitEntityName(ctx, node.left, meaningLeft);
        if (!leftSymbol || !leftSymbol.exports) {
            return undefined;
        }
        const symbol = leftSymbol.exports.get(node.right.escapedText);
        if (!symbol) {
            return undefined;
        }
        visitIdentifierWithSymbol(ctx, node.right, symbol, meaningRight, IsCallExpression.False, IsRightSideOfExpression.False);
        return symbol;
    }
    function visitEntityName(ctx: Context, node: EntityName, meaning: SemanticMeaning): Symbol | undefined {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                return visitIdentifier(ctx, node, meaning, CanUseLocals.True, IsCallExpression.False);
            case SyntaxKind.QualifiedName:
                return visitQualifiedName(ctx, node, meaning);
        }
    }
    function visitParameterDeclaration(ctx: Context, node: ParameterDeclaration): Symbol | null | void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        visitBindingName(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, TokenType.parameter, tokenModifiers);
        let typeSymbol: Symbol | null | void;
        if (node.type) {
            typeSymbol = visitTypeNode(ctx, node.type);
        }
        if (node.initializer) {
            visitExpression(ctx, node.initializer);
        }
        return typeSymbol;
    }
    function visitParameters(ctx: Context, nodes: NodeArray<ParameterDeclaration>): void {
        for (const parameter of nodes) {
            visitParameterDeclaration(ctx, parameter);
        }
    }
    function visitFunctionTypeNode(ctx: Context, node: FunctionTypeNode): Symbol | undefined | void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        visitTypeNode(ctx, node.type);
        return (<NodeWithSymbol><unknown>node).symbol;
    }
    function visitConstructorTypeNode(ctx: Context, node: ConstructorTypeNode): Symbol | undefined | void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        visitTypeNode(ctx, node.type);
        return (<NodeWithSymbol><unknown>node).symbol;
    }
    function visitImportTypeNode(ctx: Context, node: ImportTypeNode): void {
        visitTypeNode(ctx, node.argument);
        if (node.qualifier) {
            visitEntityName(ctx, node.qualifier, (node.isTypeOf ? SemanticMeaning.Value : SemanticMeaning.Type));
        }
        visitTypeArguments(ctx, node.typeArguments);
    }
    function visitTypeReference(ctx: Context, node: TypeReferenceNode): Symbol | undefined {
        let symbol: Symbol | undefined;
        if (node.typeName.kind === SyntaxKind.Identifier) {
            symbol = visitIdentifier(ctx, node.typeName, SemanticMeaning.Type, CanUseLocals.True, IsCallExpression.False);
        }
        else {
            symbol = visitQualifiedNameWithSplitMeaning(ctx, node.typeName, SemanticMeaning.Namespace, SemanticMeaning.Type);
        }
        visitTypeArguments(ctx, node.typeArguments);
        return symbol;
    }
    function visitExpressionWithTypeArguments(ctx: Context, node: ExpressionWithTypeArguments): void {
        if (node.parent.kind === SyntaxKind.HeritageClause && (node.parent.token === SyntaxKind.ExtendsKeyword || node.parent.token === SyntaxKind.ImplementsKeyword)) {
            if (node.expression.kind === SyntaxKind.Identifier) {
                visitIdentifier(ctx, <Identifier>node.expression, SemanticMeaning.Type, CanUseLocals.True, IsCallExpression.False);
            }
            else {
                visitExpression(ctx, node.expression);
            }
        }
        else {
            visitExpression(ctx, node.expression);
        }
        visitTypeArguments(ctx, node.typeArguments);
    }
    function visitTypePredicateNode(ctx: Context, node: TypePredicateNode): void {
        if (node.parameterName.kind === SyntaxKind.Identifier) {
            visitIdentifier(ctx, node.parameterName, SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.False);
        }
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitTypeQueryNode(ctx: Context, node: TypeQueryNode): void {
        visitEntityName(ctx, node.exprName, SemanticMeaning.Value);
    }
    function visitTypeLiteralNode(ctx: Context, node: TypeLiteralNode): void {
        for (const member of node.members) {
            switch (member.kind) {
                case SyntaxKind.CallSignature:
                    visitCallSignatureDeclaration(ctx, <CallSignatureDeclaration>member);
                    break;
                case SyntaxKind.ConstructSignature:
                    visitConstructSignatureDeclaration(ctx, <ConstructSignatureDeclaration>member);
                    break;
                case SyntaxKind.PropertySignature:
                    visitPropertySignature(ctx, <PropertySignature>member);
                    break;
                case SyntaxKind.MethodSignature:
                    visitMethodSignature(ctx, <MethodSignature>member);
                    break;
                case SyntaxKind.IndexSignature:
                    visitIndexSignatureDeclaration(ctx, <IndexSignatureDeclaration>member);
                    break;
            }
        }
    }
    function visitArrayTypeNode(ctx: Context, node: ArrayTypeNode): void {
        visitTypeNode(ctx, node.elementType);
    }
    function visitTupleTypeNode(ctx: Context, node: TupleTypeNode): void {
        for (const elementType of node.elements) {
            visitTypeNode(ctx, elementType);
        }
    }
    function visitOptionalTypeNode(ctx: Context, node: OptionalTypeNode): void {
        visitTypeNode(ctx, node.type);
    }
    function visitRestTypeNode(ctx: Context, node: RestTypeNode): void {
        visitTypeNode(ctx, node.type);
    }
    function visitUnionTypeNode(ctx: Context, node: UnionTypeNode): void {
        for (const type of node.types) {
            visitTypeNode(ctx, type);
        }
    }
    function visitIntersectionTypeNode(ctx: Context, node: IntersectionTypeNode): void {
        for (const type of node.types) {
            visitTypeNode(ctx, type);
        }
    }
    function visitConditionalTypeNode(ctx: Context, node: ConditionalTypeNode): void {
        visitTypeNode(ctx, node.checkType);
        visitTypeNode(ctx, node.extendsType);
        visitTypeNode(ctx, node.trueType);
        visitTypeNode(ctx, node.falseType);
    }
    function visitInferTypeNode(ctx: Context, node: InferTypeNode): void {
        visitTypeParameterDeclaration(ctx, node.typeParameter);
    }
    function visitParenthesizedTypeNode(ctx: Context, node: ParenthesizedTypeNode): Symbol | undefined | void {
        return visitTypeNode(ctx, node.type);
    }
    function visitTypeOperatorNode(ctx: Context, node: TypeOperatorNode): void {
        visitTypeNode(ctx, node.type);
    }
    function visitIndexedAccessTypeNode(ctx: Context, node: IndexedAccessTypeNode): void {
        visitTypeNode(ctx, node.objectType);
        visitTypeNode(ctx, node.indexType);
    }
    function visitMappedTypeNode(ctx: Context, node: MappedTypeNode): void {
        visitTypeParameterDeclaration(ctx, node.typeParameter);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitTypeNode(ctx: Context, node: TypeNode): Symbol | undefined | void {
        switch (node.kind) {
            case SyntaxKind.FunctionType:
                return visitFunctionTypeNode(ctx, <FunctionTypeNode>node);
            case SyntaxKind.ConstructorType:
                return visitConstructorTypeNode(ctx, <ConstructorTypeNode>node);
            case SyntaxKind.ImportType:
                return visitImportTypeNode(ctx, <ImportTypeNode>node);
            case SyntaxKind.TypeReference:
                return visitTypeReference(ctx, <TypeReferenceNode>node);
            case SyntaxKind.ExpressionWithTypeArguments:
                return visitExpressionWithTypeArguments(ctx, <ExpressionWithTypeArguments>node);
            case SyntaxKind.TypePredicate:
                return visitTypePredicateNode(ctx, <TypePredicateNode>node);
            case SyntaxKind.TypeQuery:
                return visitTypeQueryNode(ctx, <TypeQueryNode>node);
            case SyntaxKind.TypeLiteral:
                return visitTypeLiteralNode(ctx, <TypeLiteralNode>node);
            case SyntaxKind.ArrayType:
                return visitArrayTypeNode(ctx, <ArrayTypeNode>node);
            case SyntaxKind.TupleType:
                return visitTupleTypeNode(ctx, <TupleTypeNode>node);
            case SyntaxKind.OptionalType:
                return visitOptionalTypeNode(ctx, <OptionalTypeNode>node);
            case SyntaxKind.RestType:
                return visitRestTypeNode(ctx, <RestTypeNode>node);
            case SyntaxKind.UnionType:
                return visitUnionTypeNode(ctx, <UnionTypeNode>node);
            case SyntaxKind.IntersectionType:
                return visitIntersectionTypeNode(ctx, <IntersectionTypeNode>node);
            case SyntaxKind.ConditionalType:
                return visitConditionalTypeNode(ctx, <ConditionalTypeNode>node);
            case SyntaxKind.InferType:
                return visitInferTypeNode(ctx, <InferTypeNode>node);
            case SyntaxKind.ParenthesizedType:
                return visitParenthesizedTypeNode(ctx, <ParenthesizedTypeNode>node);
            case SyntaxKind.TypeOperator:
                return visitTypeOperatorNode(ctx, <TypeOperatorNode>node);
            case SyntaxKind.IndexedAccessType:
                return visitIndexedAccessTypeNode(ctx, <IndexedAccessTypeNode>node);
            case SyntaxKind.MappedType:
                return visitMappedTypeNode(ctx, <MappedTypeNode>node);
            // ignoring:

            // TODO: This was commented in importing
            // case SyntaxKind.ThisKeyword:
            //     return ctx.getThisSymbol();


            // case SyntaxKind.JSDocTypeExpression:
            // case SyntaxKind.JSDocAllType:
            // case SyntaxKind.JSDocUnknownType:
            // case SyntaxKind.JSDocNonNullableType:
            // case SyntaxKind.JSDocNullableType:
            // case SyntaxKind.JSDocOptionalType:
            // case SyntaxKind.JSDocFunctionType:
            // case SyntaxKind.JSDocVariadicType:
            // case SyntaxKind.JSDocNamepathType:
            // case SyntaxKind.JSDocSignature:
            // case SyntaxKind.JSDocTypeLiteral:
            // case SyntaxKind.LiteralType:
            // case SyntaxKind.ThisType:
            // case SyntaxKind.NullKeyword:
            // case SyntaxKind.TrueKeyword
            // case SyntaxKind.FalseKeyword:
            // case SyntaxKind.AnyKeyword:
            // case SyntaxKind.UnknownKeyword:
            // case SyntaxKind.NumberKeyword:
            // case SyntaxKind.BigIntKeyword:
            // case SyntaxKind.ObjectKeyword:
            // case SyntaxKind.BooleanKeyword:
            // case SyntaxKind.StringKeyword:
            // case SyntaxKind.SymbolKeyword:
            // case SyntaxKind.ThisKeyword:
            // case SyntaxKind.VoidKeyword:
            // case SyntaxKind.UndefinedKeyword:
            // case SyntaxKind.NullKeyword:
            // case SyntaxKind.NeverKeyword:
        }
    }
    function visitTypeArguments(ctx: Context, nodes: NodeArray<TypeNode> | undefined): void {
        if (nodes) {
            for (const node of nodes) {
                visitTypeNode(ctx, node);
            }
        }
    }
    function visitPrefixUnaryExpression(ctx: Context, node: PrefixUnaryExpression): void {
        visitExpression(ctx, node.operand);
    }
    function visitPostfixUnaryExpression(ctx: Context, node: PostfixUnaryExpression): void {
        visitExpression(ctx, node.operand);
    }
    function visitPartiallyEmittedExpression(ctx: Context, node: PartiallyEmittedExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitFunctionExpression(ctx: Context, node: FunctionExpression): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name) {
            ctx.pushResult(node.name, TokenType.function, tokenModifiers | (1 << TokenModifier.declaration));
        }
        visitTypeParameters(ctx, node.typeParameters);
        const newScopeThis = visitParametersAndGetThisSymbol(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushThisSymbol(newScopeThis);
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
            ctx.popThisSymbol();
        }
    }
    function visitTemplateSpan(ctx: Context, node: TemplateSpan): void {
        visitExpression(ctx, node.expression);
    }
    function visitTemplateExpression(ctx: Context, node: TemplateExpression): void {
        // ignoring node.head
        for (const templateSpan of node.templateSpans) {
            visitTemplateSpan(ctx, templateSpan);
        }
    }
    function visitParenthesizedExpression(ctx: Context, node: ParenthesizedExpression): Symbol | null | void {
        return visitExpression(ctx, node.expression);
    }
    function visitArrayLiteralExpression(ctx: Context, node: ArrayLiteralExpression): void {
        for (const element of node.elements) {
            visitExpression(ctx, element);
        }
    }
    function visitMethodDeclaration(ctx: Context, node: MethodDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            ctx.pushResult(node.name, TokenType.member, tokenModifiers | (1 << TokenModifier.declaration));
        }
        else {
            visitPropertyName(ctx, node.name);
        }
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
        }
    }
    function visitGetAccessorDeclaration(ctx: Context, node: GetAccessorDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.property, tokenModifiers);
        }
        else {
            visitPropertyName(ctx, node.name);
        }
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
        }
    }
    function visitSetAccessorDeclaration(ctx: Context, node: SetAccessorDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.property, tokenModifiers);
        }
        else {
            visitPropertyName(ctx, node.name);
        }
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
        }
    }
    function visitPropertyAssignment(ctx: Context, node: PropertyAssignment): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.property, tokenModifiers);
        }
        else {
            visitPropertyName(ctx, node.name);
        }
        visitExpression(ctx, node.initializer);
    }
    function visitShorthandPropertyAssignment(ctx: Context, node: ShorthandPropertyAssignment): void {
        visitDecorators(ctx, node.decorators);
        const tokenType = ctx.reclassifyWithType(node.name, TokenType.property);
        ctx.pushResult(node.name, tokenType, (1 << TokenModifier.declaration));
        if (node.objectAssignmentInitializer) {
            visitExpression(ctx, node.objectAssignmentInitializer);
        }
    }
    function visitSpreadAssignment(ctx: Context, node: SpreadAssignment): void {
        visitExpression(ctx, node.expression);
    }
    function visitObjectLiteralExpression(ctx: Context, node: ObjectLiteralExpression): Symbol | null | void {
        for (const property of node.properties) {
            switch (property.kind) {
                case SyntaxKind.MethodDeclaration:
                    visitMethodDeclaration(ctx, property);
                    break;
                case SyntaxKind.GetAccessor:
                    visitGetAccessorDeclaration(ctx, property);
                    break;
                case SyntaxKind.SetAccessor:
                    visitSetAccessorDeclaration(ctx, property);
                    break;
                case SyntaxKind.PropertyAssignment:
                    visitPropertyAssignment(ctx, property);
                    break;
                case SyntaxKind.ShorthandPropertyAssignment:
                    visitShorthandPropertyAssignment(ctx, property);
                    break;
                case SyntaxKind.SpreadAssignment:
                    visitSpreadAssignment(ctx, property);
                    break;
            }
        }
        return (<NodeWithSymbol><unknown>node).symbol;
    }
    function visitNewExpression(ctx: Context, node: NewExpression): void {
        visitExpression(ctx, node.expression);
        visitTypeArguments(ctx, node.typeArguments);
        if (node.arguments) {
            for (const argument of node.arguments) {
                visitExpression(ctx, argument);
            }
        }
    }
    function visitMetaProperty(ctx: Context, node: MetaProperty): void {
        visitIdentifier(ctx, node.name, SemanticMeaning.Value, CanUseLocals.False, IsCallExpression.False);
    }
    function visitPropertyDeclaration(ctx: Context, node: PropertyDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const modifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.property, modifiers);
        }
        else {
            visitPropertyName(ctx, node.name);
        }
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.initializer) {
            visitExpression(ctx, node.initializer);
        }
    }
    function visitConstructorDeclaration(ctx: Context, node: ConstructorDeclaration): void {
        visitDecorators(ctx, node.decorators);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
        }
    }
    function visitClassElement(ctx: Context, node: ClassElement): void {
        switch (node.kind) {
            case SyntaxKind.PropertyDeclaration:
                return visitPropertyDeclaration(ctx, <PropertyDeclaration>node);
            case SyntaxKind.MethodDeclaration:
                return visitMethodDeclaration(ctx, <MethodDeclaration>node);
            case SyntaxKind.Constructor:
                return visitConstructorDeclaration(ctx, <ConstructorDeclaration>node);
            case SyntaxKind.GetAccessor:
                return visitGetAccessorDeclaration(ctx, <GetAccessorDeclaration>node);
            case SyntaxKind.SetAccessor:
                return visitSetAccessorDeclaration(ctx, <SetAccessorDeclaration>node);
            case SyntaxKind.IndexSignature:
                return visitIndexSignatureDeclaration(ctx, <IndexSignatureDeclaration>node);
            // ignoring:
            // case SyntaxKind.SemicolonClassElement:
        }
    }
    function visitClassExpression(ctx: Context, node: ClassExpression): void {
        visitDecorators(ctx, node.decorators);
        if (node.name) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.class, 0);
        }
        visitTypeParameters(ctx, node.typeParameters);
        if (node.heritageClauses) {
            for (const heritageClause of node.heritageClauses) {
                visitHeritageClause(ctx, heritageClause);
            }
        }
        ctx.pushThisSymbol((<NodeWithSymbol><unknown>node).symbol);
        for (const member of node.members) {
            visitClassElement(ctx, member);
        }
        ctx.popThisSymbol();
    }
    function visitPropertyAccessExpression(ctx: Context, node: PropertyAccessExpression, isCallExpression: IsCallExpression): Symbol | null | void {
        const leftSymbol = visitExpression(ctx, node.expression);
        if (leftSymbol && (leftSymbol.getFlags() & valueSymbolFlags) === 0 && (leftSymbol.exports || leftSymbol.members)) {
            let symbol: Symbol | undefined;
            if (leftSymbol.exports) {
                symbol = leftSymbol.exports.get(node.name.escapedText);
            }
            if (!symbol && leftSymbol.members) {
                symbol = leftSymbol.members.get(node.name.escapedText);
            }
            if (symbol) {
                // found it!
                visitIdentifierWithSymbol(ctx, node.name, symbol, SemanticMeaning.Value, isCallExpression, IsRightSideOfExpression.True);
                return symbol;
            }
        }
        const symbol = ctx.getTypeCheckerSymbolAtLocation(node.name);
        if (symbol) {
            visitIdentifierWithSymbol(ctx, node.name, symbol, SemanticMeaning.Value, isCallExpression, IsRightSideOfExpression.True);
        }
        return symbol;
    }
    function visitElementAccessExpression(ctx: Context, node: ElementAccessExpression): void {
        visitExpression(ctx, node.expression);
        visitExpression(ctx, node.argumentExpression);
    }
    function visitTaggedTemplateExpression(ctx: Context, node: TaggedTemplateExpression): void {
        visitExpression(ctx, node.tag);
        visitTypeArguments(ctx, node.typeArguments);
        visitExpression(ctx, node.template);
    }
    function visitCallExpression(ctx: Context, node: CallExpression): void {
        if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
            visitPropertyAccessExpression(ctx, (<PropertyAccessExpression>node.expression), IsCallExpression.True);
        }
        else if (node.expression.kind === SyntaxKind.Identifier) {
            visitIdentifier(ctx, <Identifier>node.expression, SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.True);
        }
        else {
            visitExpression(ctx, node.expression);
        }
        visitTypeArguments(ctx, node.typeArguments);
        for (const argument of node.arguments) {
            visitExpression(ctx, argument);
        }
    }
    function visitNonNullExpression(ctx: Context, node: NonNullExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitDeleteExpression(ctx: Context, node: DeleteExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitTypeOfExpression(ctx: Context, node: TypeOfExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitVoidExpression(ctx: Context, node: VoidExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitAwaitExpression(ctx: Context, node: AwaitExpression): void {
        visitExpression(ctx, node.expression);
    }
    function visitTypeAssertion(ctx: Context, node: TypeAssertion): Symbol | null | void {
        const symbol = visitTypeNode(ctx, node.type);
        visitExpression(ctx, node.expression);
        return symbol;
    }
    function visitYieldExpression(ctx: Context, node: YieldExpression): void {
        if (node.expression) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitBinaryExpression(ctx: Context, node: BinaryExpression): void {
        visitExpression(ctx, node.left);
        visitExpression(ctx, node.right);
    }
    function visitConditionalExpression(ctx: Context, node: ConditionalExpression): void {
        visitExpression(ctx, node.condition);
        visitExpression(ctx, node.whenTrue);
        visitExpression(ctx, node.whenFalse);
    }
    function visitArrowFunction(ctx: Context, node: ArrowFunction): void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }

        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        if (node.body.kind === SyntaxKind.Block) {
            visitBlock(ctx, <Block>node.body);
        }
        else {
            // must be expression
            visitExpression(ctx, node.body);
        }
        ctx.popScope();
    }
    function visitSpreadElement(ctx: Context, node: SpreadElement): void {
        visitExpression(ctx, node.expression);
    }
    function visitAsExpression(ctx: Context, node: AsExpression): Symbol | null | void {
        visitExpression(ctx, node.expression);
        return visitTypeNode(ctx, node.type);
    }
    function visitCommaListExpression(ctx: Context, node: CommaListExpression): void {
        for (const element of node.elements) {
            visitExpression(ctx, element);
        }
    }
    function visitJsxAttributes(ctx: Context, node: JsxAttributes): void {
        for (const property of node.properties) {
            if (property.kind === SyntaxKind.JsxAttribute) {
                // ignoring property.name
                if (property.initializer && property.initializer.kind === SyntaxKind.JsxExpression) {
                    visitJsxExpression(ctx, property.initializer);
                }
            }
            // ignoring JsxSpreadAttribute
        }
    }
    function visitJsxChild(ctx: Context, node: JsxChild): void {
        switch (node.kind) {
            case SyntaxKind.JsxElement:
                return visitJsxElement(ctx, node);
            case SyntaxKind.JsxSelfClosingElement:
                return visitJsxSelfClosingElement(ctx, node);
            case SyntaxKind.JsxFragment:
                return visitJsxFragment(ctx, node);
            case SyntaxKind.JsxExpression:
                return visitJsxExpression(ctx, node);
            // ignoring:
            // case SyntaxKind.JsxText:
        }
    }
    function visitJsxElement(ctx: Context, node: JsxElement): void {
        visitJsxOpeningElement(ctx, node.openingElement);
        for (const child of node.children) {
            visitJsxChild(ctx, child);
        }
        // ignoring node.closingElement
    }
    function visitJsxSelfClosingElement(ctx: Context, node: JsxSelfClosingElement): void {
        // ignoring node.tagName;
        // ignoring node.typeArguments;
        visitJsxAttributes(ctx, node.attributes);
    }
    function visitJsxFragment(ctx: Context, node: JsxFragment): void {
        for (const child of node.children) {
            visitJsxChild(ctx, child);
        }
    }
    function visitJsxOpeningElement(ctx: Context, node: JsxOpeningElement): void {
        // ignoring node.tagName;
        // ignoring node.typeArguments;
        visitJsxAttributes(ctx, node.attributes);
    }
    function visitJsxExpression(ctx: Context, node: JsxExpression): void {
        if (node.expression) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitExpression(ctx: Context, node: Expression): Symbol | null | void {
        switch (node.kind) {
            case SyntaxKind.PrefixUnaryExpression:
                return visitPrefixUnaryExpression(ctx, <PrefixUnaryExpression>node);
            case SyntaxKind.PostfixUnaryExpression:
                return visitPostfixUnaryExpression(ctx, <PostfixUnaryExpression>node);
            case SyntaxKind.PartiallyEmittedExpression:
                return visitPartiallyEmittedExpression(ctx, <PartiallyEmittedExpression>node);
            case SyntaxKind.Identifier:
                return visitIdentifier(ctx, <Identifier>node, SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.False);
            case SyntaxKind.FunctionExpression:
                return visitFunctionExpression(ctx, <FunctionExpression>node);
            case SyntaxKind.TemplateExpression:
                return visitTemplateExpression(ctx, <TemplateExpression>node);
            case SyntaxKind.ParenthesizedExpression:
                return visitParenthesizedExpression(ctx, <ParenthesizedExpression>node);
            case SyntaxKind.ArrayLiteralExpression:
                return visitArrayLiteralExpression(ctx, <ArrayLiteralExpression>node);
            case SyntaxKind.ObjectLiteralExpression:
                return visitObjectLiteralExpression(ctx, <ObjectLiteralExpression>node);
            case SyntaxKind.NewExpression:
                return visitNewExpression(ctx, <NewExpression>node);
            case SyntaxKind.MetaProperty:
                return visitMetaProperty(ctx, <MetaProperty>node);
            case SyntaxKind.ClassExpression:
                return visitClassExpression(ctx, <ClassExpression>node);
            case SyntaxKind.PropertyAccessExpression:
                return visitPropertyAccessExpression(ctx, <PropertyAccessExpression>node, IsCallExpression.False);
            case SyntaxKind.ElementAccessExpression:
                return visitElementAccessExpression(ctx, <ElementAccessExpression>node);
            case SyntaxKind.TaggedTemplateExpression:
                return visitTaggedTemplateExpression(ctx, <TaggedTemplateExpression>node);
            case SyntaxKind.CallExpression:
                return visitCallExpression(ctx, <CallExpression>node);
            case SyntaxKind.NonNullExpression:
                return visitNonNullExpression(ctx, <NonNullExpression>node);
            case SyntaxKind.DeleteExpression:
                return visitDeleteExpression(ctx, <DeleteExpression>node);
            case SyntaxKind.TypeOfExpression:
                return visitTypeOfExpression(ctx, <TypeOfExpression>node);
            case SyntaxKind.VoidExpression:
                return visitVoidExpression(ctx, <VoidExpression>node);
            case SyntaxKind.AwaitExpression:
                return visitAwaitExpression(ctx, <AwaitExpression>node);
            case SyntaxKind.TypeAssertionExpression:
                return visitTypeAssertion(ctx, <TypeAssertion>node);
            case SyntaxKind.YieldExpression:
                return visitYieldExpression(ctx, <YieldExpression>node);
            case SyntaxKind.BinaryExpression:
                return visitBinaryExpression(ctx, <BinaryExpression>node);
            case SyntaxKind.ConditionalExpression:
                return visitConditionalExpression(ctx, <ConditionalExpression>node);
            case SyntaxKind.ArrowFunction:
                return visitArrowFunction(ctx, <ArrowFunction>node);
            case SyntaxKind.SpreadElement:
                return visitSpreadElement(ctx, <SpreadElement>node);
            case SyntaxKind.AsExpression:
                return visitAsExpression(ctx, <AsExpression>node);
            case SyntaxKind.CommaListExpression:
                return visitCommaListExpression(ctx, <CommaListExpression>node);
            case SyntaxKind.JsxAttributes:
                return visitJsxAttributes(ctx, <JsxAttributes>node);
            case SyntaxKind.JsxElement:
                return visitJsxElement(ctx, <JsxElement>node);
            case SyntaxKind.JsxSelfClosingElement:
                return visitJsxSelfClosingElement(ctx, <JsxSelfClosingElement>node);
            case SyntaxKind.JsxFragment:
                return visitJsxFragment(ctx, <JsxFragment>node);
            case SyntaxKind.JsxOpeningElement:
                return visitJsxOpeningElement(ctx, <JsxOpeningElement>node);
            case SyntaxKind.JsxExpression:
                return visitJsxExpression(ctx, <JsxExpression>node);
            // ignoring:
            case SyntaxKind.ThisKeyword:
                return ctx.getThisSymbol();
            // case SyntaxKind.JsxOpeningFragment:
            // case SyntaxKind.JsxClosingFragment:
            // case SyntaxKind.OmittedExpression:
            // case SyntaxKind.SyntheticExpression:
            // case SyntaxKind.NullKeyword:
            // case SyntaxKind.TrueKeyword:
            // case SyntaxKind.FalseKeyword:
            // case SyntaxKind.SuperKeyword:
            // case SyntaxKind.ImportKeyword:
            // case SyntaxKind.StringLiteral:
            // case SyntaxKind.RegularExpressionLiteral:
            // case SyntaxKind.NoSubstitutionTemplateLiteral:
            // case SyntaxKind.NumericLiteral:
            // case SyntaxKind.BigIntLiteral:
        }
    }
    function visitDecorator(ctx: Context, node: Decorator): void {
        visitExpression(ctx, node.expression);
    }
    function visitDecorators(ctx: Context, decorators: NodeArray<Decorator> | undefined): void {
        if (decorators) {
            for (const decorator of decorators) {
                visitDecorator(ctx, decorator);
            }
        }
    }
    function visitParametersAndGetThisSymbol(ctx: Context, parameters: NodeArray<ParameterDeclaration>): Symbol | undefined {
        let isFirst = true;
        let result: Symbol | undefined;
        for (const parameter of parameters) {
            if (isFirst) {
                isFirst = false;
                if (parameter.name.kind === SyntaxKind.Identifier && parameter.name.getText() === "this") {
                    result = visitParameterDeclaration(ctx, parameter) || undefined;
                }
                else {
                    visitParameterDeclaration(ctx, parameter);
                }
            }
            else {
                visitParameterDeclaration(ctx, parameter);
            }
        }
        return result;
    }
    function visitFunctionDeclaration(ctx: Context, node: FunctionDeclaration, parentKind: SyntaxKind): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name) {
            ctx.pushResult(node.name, TokenType.function, tokenModifiers | (1 << TokenModifier.declaration) | (parentKind !== SyntaxKind.SourceFile ? (1 << TokenModifier.local) : 0));
        }
        visitTypeParameters(ctx, node.typeParameters);
        const newScopeThis = visitParametersAndGetThisSymbol(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.body) {
            ctx.pushThisSymbol(newScopeThis);
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitBlock(ctx, node.body);
            ctx.popScope();
            ctx.popThisSymbol();
        }
    }
    function visitClassDeclaration(ctx: Context, node: ClassDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value | SemanticMeaning.Type, TokenType.class, tokenModifiers);
        }
        visitTypeParameters(ctx, node.typeParameters);
        if (node.heritageClauses) {
            for (const heritageClause of node.heritageClauses) {
                visitHeritageClause(ctx, heritageClause);
            }
        }
        ctx.pushThisSymbol((<NodeWithSymbol><unknown>node).symbol);
        for (const member of node.members) {
            visitClassElement(ctx, member);
        }
        ctx.popThisSymbol();
    }
    function visitMissingDeclaration(ctx: Context, node: MissingDeclaration): void {
        visitDecorators(ctx, node.decorators);
    }
    function visitTypeParameterDeclaration(ctx: Context, node: TypeParameterDeclaration): void {
        visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Type, TokenType.typeParameter, 0);
        if (node.constraint) {
            visitTypeNode(ctx, node.constraint);
        }
        if (node.default) {
            visitTypeNode(ctx, node.default);
        }
        if (node.expression) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitTypeParameters(ctx: Context, nodes: NodeArray<TypeParameterDeclaration> | undefined): void {
        if (nodes) {
            for (const typeParameter of nodes) {
                visitTypeParameterDeclaration(ctx, typeParameter);
            }
        }
    }
    function visitHeritageClause(ctx: Context, node: HeritageClause): void {
        for (const type of node.types) {
            visitExpressionWithTypeArguments(ctx, type);
        }
    }
    function visitCallSignatureDeclaration(ctx: Context, node: CallSignatureDeclaration): void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitConstructSignatureDeclaration(ctx: Context, node: ConstructSignatureDeclaration): void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitPropertySignature(ctx: Context, node: PropertySignature): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.property, tokenModifiers);
        }
 else {
            visitPropertyName(ctx, node.name);
        }
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.initializer) {
            visitExpression(ctx, node.initializer);
        }
    }
    function visitMethodSignature(ctx: Context, node: MethodSignature): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            visitIdentifierInDeclaration(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, SemanticMeaning.Value, TokenType.member, tokenModifiers);
        }
 else {
            visitPropertyName(ctx, node.name);
        }
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitIndexSignatureDeclaration(ctx: Context, node: IndexSignatureDeclaration): void {
        visitDecorators(ctx, node.decorators);
        visitTypeParameters(ctx, node.typeParameters);
        visitParameters(ctx, node.parameters);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
    }
    function visitInterfaceDeclaration(ctx: Context, node: InterfaceDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        ctx.pushResult(node.name, TokenType.interface, tokenModifiers | (1 << TokenModifier.declaration));
        visitTypeParameters(ctx, node.typeParameters);
        if (node.heritageClauses) {
            for (const heritageClause of node.heritageClauses) {
                visitHeritageClause(ctx, heritageClause);
            }
        }
        for (const member of node.members) {
            switch (member.kind) {
                case SyntaxKind.CallSignature:
                    visitCallSignatureDeclaration(ctx, <CallSignatureDeclaration>member);
                    break;
                case SyntaxKind.ConstructSignature:
                    visitConstructSignatureDeclaration(ctx, <ConstructSignatureDeclaration>member);
                    break;
                case SyntaxKind.PropertySignature:
                    visitPropertySignature(ctx, <PropertySignature>member);
                    break;
                case SyntaxKind.MethodSignature:
                    visitMethodSignature(ctx, <MethodSignature>member);
                    break;
                case SyntaxKind.IndexSignature:
                    visitIndexSignatureDeclaration(ctx, <IndexSignatureDeclaration>member);
                    break;
            }
        }
    }
    function visitTypeAliasDeclaration(ctx: Context, node: TypeAliasDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        ctx.pushResult(node.name, TokenType.type, tokenModifiers | (1 << TokenModifier.declaration));
        visitTypeParameters(ctx, node.typeParameters);
        visitTypeNode(ctx, node.type);
    }
    function visitEnumDeclaration(ctx: Context, node: EnumDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        ctx.pushResult(node.name, TokenType.enum, tokenModifiers | (1 << TokenModifier.declaration));

        const symbol = (<NodeWithSymbol><unknown>node).symbol;
        ctx.pushLocals(symbol ? symbol.exports : undefined);
        for (const enumMember of node.members) {
            if (enumMember.name.kind === SyntaxKind.Identifier) {
                ctx.pushResult(enumMember.name, TokenType.enumMember, (1 << TokenModifier.declaration) | (1 << TokenModifier.readonly));
            }
 else {
                visitPropertyName(ctx, enumMember.name);
            }
            if (enumMember.initializer) {
                visitExpression(ctx, enumMember.initializer);
            }
        }
        ctx.popLocals();
    }
    function visitModuleBlock(ctx: Context, node: ModuleBlock): void {
        for (const statement of node.statements) {
            visitStatement(ctx, statement, SyntaxKind.ModuleBlock);
        }
    }
    function visitModuleDeclaration(ctx: Context, node: ModuleDeclaration): void {
        visitDecorators(ctx, node.decorators);
        const tokenModifiers = nodeModifiersToTokenModifiers(node.modifiers);
        if (node.name.kind === SyntaxKind.Identifier) {
            ctx.pushResult(node.name, TokenType.namespace, tokenModifiers | (1 << TokenModifier.declaration));
        }
        if (node.body) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            switch (node.body.kind) {
                case SyntaxKind.ModuleBlock:
                    visitModuleBlock(ctx, node.body);
                    break;
                case SyntaxKind.ModuleDeclaration:
                    visitModuleDeclaration(ctx, node.body);
                    break;
                // ignoring:
                // case SyntaxKind.Identifier:
            }
            ctx.popScope();
        }
    }
    function visitExternalModuleReference(ctx: Context, node: ExternalModuleReference): void {
        if (node.expression.kind === SyntaxKind.Identifier) {
            visitIdentifier(ctx, <Identifier>node.expression, SemanticMeaning.All, CanUseLocals.True, IsCallExpression.False);
        }
        else {
            visitExpression(ctx, node.expression);
        }
    }
    function visitImportEqualsDeclaration(ctx: Context, node: ImportEqualsDeclaration): void {
        visitDecorators(ctx, node.decorators);
        ctx.pushResult(node.name, TokenType.namespace, 0);
        if (node.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
            visitExternalModuleReference(ctx, node.moduleReference);
        }
        else {
            // isInternalModuleImportEqualsDeclaration
            //     import a = |b|; // Namespace
            //     import a = |b.c|; // Value, type, namespace
            //     import a = |b.c|.d; // Namespace
            if (node.moduleReference.kind === SyntaxKind.Identifier) {
                visitIdentifier(ctx, node.moduleReference, SemanticMeaning.Namespace, CanUseLocals.True, IsCallExpression.False);
            }
            else {
                visitQualifiedNameWithSplitMeaning(ctx, node.moduleReference, SemanticMeaning.Namespace, SemanticMeaning.All);
            }
        }
    }
    function visitNamespaceExportDeclaration(ctx: Context, node: NamespaceExportDeclaration): void {
        if (node.name) {
            visitIdentifier(ctx, node.name, SemanticMeaning.Namespace | SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.False);
        }
    }
    function visitExportSpecifier(ctx: Context, node: ExportSpecifier): void {
        if (node.propertyName) {
            visitIdentifier(ctx, node.propertyName, SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.False);
        }
        visitIdentifier(ctx, node.name, SemanticMeaning.Value, CanUseLocals.True, IsCallExpression.False);
    }
    function visitNamedExports(ctx: Context, node: NamedExportBindings): void {
        if (isNamedExports(node)) {
            for (const element of node.elements) {
                visitExportSpecifier(ctx, element);
            }
        }
        else if(isNamespaceExport(node)) {
            // TODO: Noop probably seems right here, double check
        }
    }
    function visitExportDeclaration(ctx: Context, node: ExportDeclaration): void {
        visitDecorators(ctx, node.decorators);
        if (node.exportClause) {
            visitNamedExports(ctx, node.exportClause);
        }
        if (node.moduleSpecifier) {
            visitExpression(ctx, node.moduleSpecifier);
        }
    }
    function visitExportAssignment(ctx: Context, node: ExportAssignment): void {
        visitDecorators(ctx, node.decorators);
        if (node.expression.kind === SyntaxKind.Identifier) {
            visitIdentifier(ctx, <Identifier>node.expression, SemanticMeaning.All, CanUseLocals.True, IsCallExpression.False);
        }
        else {
            visitExpression(ctx, node.expression);
        }
    }
    function visitBlock(ctx: Context, node: Block): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        for (const statement of node.statements) {
            visitStatement(ctx, statement, SyntaxKind.Block);
        }
        ctx.popScope();
    }
    function visitBindingName(ctx: Context, node: BindingName, symbol: Symbol | undefined, tokenType: TokenType.variable | TokenType.parameter, tokenModifiers: number): void {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                visitIdentifierInDeclaration(ctx, node, symbol, SemanticMeaning.Value, tokenType, tokenModifiers);
                break;
            case SyntaxKind.ObjectBindingPattern:
                visitObjectBindingPattern(ctx, node, tokenType, tokenModifiers);
                break;
            case SyntaxKind.ArrayBindingPattern:
                visitArrayBindingPattern(ctx, node, tokenType, tokenModifiers);
                break;
        }

    }
    function visitBindingElement(ctx: Context, node: BindingElement, tokenType: TokenType.variable | TokenType.parameter, tokenModifiers: number): void {
        visitDecorators(ctx, node.decorators);
        if (node.propertyName) {
            if (node.propertyName.kind === SyntaxKind.Identifier) {
                visitIdentifier(ctx, node.propertyName, SemanticMeaning.Value, CanUseLocals.False, IsCallExpression.False);
            }
        else {
                visitPropertyName(ctx, node.propertyName);
            }
        }
        if (node.name) {
            visitBindingName(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, tokenType, tokenModifiers);
        }
        if (node.initializer) {
            visitExpression(ctx, node.initializer);
        }
    }
    function visitObjectBindingPattern(ctx: Context, node: ObjectBindingPattern, tokenType: TokenType.variable | TokenType.parameter, tokenModifiers: number): void {
        for (const element of node.elements) {
            visitBindingElement(ctx, element, tokenType, tokenModifiers);
        }
    }
    function visitArrayBindingPattern(ctx: Context, node: ArrayBindingPattern, tokenType: TokenType.variable | TokenType.parameter, tokenModifiers: number): void {
        for (const element of node.elements) {
            if (element.kind === SyntaxKind.BindingElement) {
                visitBindingElement(ctx, element, tokenType, tokenModifiers);
            }
        }
    }
    function visitVariableDeclaration(ctx: Context, node: VariableDeclaration, tokenModifiers: number): void {
        visitDecorators(ctx, node.decorators);
        visitBindingName(ctx, node.name, (<NodeWithSymbol><unknown>node).symbol, TokenType.variable, tokenModifiers);
        if (node.type) {
            visitTypeNode(ctx, node.type);
        }
        if (node.initializer) {
            visitExpression(ctx, node.initializer);
        }
    }
    function visitVariableDeclarationList(ctx: Context, node: VariableDeclarationList, tokenModifiers: number): void {
        if (node.flags & NodeFlags.Const) {
            tokenModifiers |= (1 << TokenModifier.readonly);
        }
        for (const decl of node.declarations) {
            visitVariableDeclaration(ctx, decl, tokenModifiers);
        }
    }
    function visitVariableStatement(ctx: Context, node: VariableStatement, parentKind: SyntaxKind): void {
        visitDecorators(ctx, node.decorators);
        let tokenModifiers = 0;
        if (parentKind !== SyntaxKind.SourceFile) {
            tokenModifiers |= (1 << TokenModifier.local);
        }
        visitVariableDeclarationList(ctx, node.declarationList, tokenModifiers);
    }
    function visitExpressionStatement(ctx: Context, node: ExpressionStatement): void {
        visitExpression(ctx, node.expression);
    }
    function visitIfStatement(ctx: Context, node: IfStatement): void {
        visitExpression(ctx, node.expression);
        visitStatement(ctx, node.thenStatement, SyntaxKind.IfStatement);
        if (node.elseStatement) {
            visitStatement(ctx, node.elseStatement, SyntaxKind.IfStatement);
        }
    }
    function visitDoStatement(ctx: Context, node: DoStatement): void {
        visitStatement(ctx, node.statement, SyntaxKind.DoStatement);
        visitExpression(ctx, node.expression);
    }
    function visitWhileStatement(ctx: Context, node: WhileStatement): void {
        visitExpression(ctx, node.expression);
        visitStatement(ctx, node.statement, SyntaxKind.WhileStatement);
    }
    function visitForInitializer(ctx: Context, node: ForInitializer): void {
        if (node.kind === SyntaxKind.VariableDeclarationList) {
            visitVariableDeclarationList(ctx, <VariableDeclarationList>node, 1 << TokenModifier.local);
        }
        else {
            visitExpression(ctx, node);
        }
    }
    function visitForStatement(ctx: Context, node: ForStatement): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        if (node.initializer) {
            visitForInitializer(ctx, node.initializer);
        }
        if (node.condition) {
            visitExpression(ctx, node.condition);
        }
        if (node.incrementor) {
            visitExpression(ctx, node.incrementor);
        }
        visitStatement(ctx, node.statement, SyntaxKind.ForOfStatement);
        ctx.popScope();
    }
    function visitForInStatement(ctx: Context, node: ForInStatement): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        visitForInitializer(ctx, node.initializer);
        visitExpression(ctx, node.expression);
        visitStatement(ctx, node.statement, SyntaxKind.ForOfStatement);
        ctx.popScope();
    }
    function visitForOfStatement(ctx: Context, node: ForOfStatement): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        visitForInitializer(ctx, node.initializer);
        visitExpression(ctx, node.expression);
        visitStatement(ctx, node.statement, SyntaxKind.ForOfStatement);
        ctx.popScope();
    }
    function visitCaseClause(ctx: Context, node: CaseClause): void {
        visitExpression(ctx, node.expression);
        for (const statement of node.statements) {
            visitStatement(ctx, statement, SyntaxKind.CaseClause);
        }
    }
    function visitDefaultClause(ctx: Context, node: DefaultClause): void {
        for (const statement of node.statements) {
            visitStatement(ctx, statement, SyntaxKind.CaseClause);
        }
    }
    function visitCaseBlock(ctx: Context, node: CaseBlock): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        for (const clause of node.clauses) {
            if (clause.kind === SyntaxKind.CaseClause) {
                visitCaseClause(ctx, clause);
            }
        else {
                visitDefaultClause(ctx, clause);
            }
        }
        ctx.popScope();
    }
    function visitSwitchStatement(ctx: Context, node: SwitchStatement): void {
        visitExpression(ctx, node.expression);
        visitCaseBlock(ctx, node.caseBlock);
    }
    function visitLabeledStatement(ctx: Context, node: LabeledStatement): void {
        // ignoring node.label
        visitStatement(ctx, node.statement, SyntaxKind.LabeledStatement);
    }
    function visitThrowStatement(ctx: Context, node: ThrowStatement): void {
        if (node.expression) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitCatchClause(ctx: Context, node: CatchClause): void {
        if (node.variableDeclaration) {
            visitVariableDeclaration(ctx, node.variableDeclaration, (1 << TokenModifier.local));
        }
        visitBlock(ctx, node.block);
    }
    function visitTryStatement(ctx: Context, node: TryStatement): void {
        visitBlock(ctx, node.tryBlock);
        if (node.catchClause) {
            ctx.pushScope((<NodeWithLocals><unknown>node).locals);
            visitCatchClause(ctx, node.catchClause);
            ctx.popScope();
        }
        if (node.finallyBlock) {
            visitBlock(ctx, node.finallyBlock);
        }
    }
    function visitReturnStatement(ctx: Context, node: ReturnStatement): void {
        if (node.expression) {
            visitExpression(ctx, node.expression);
        }
    }
    function visitStatement(ctx: Context, node: Statement, parentKind: SyntaxKind): void {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
                return visitFunctionDeclaration(ctx, <FunctionDeclaration>node, parentKind);
            case SyntaxKind.ClassDeclaration:
                return visitClassDeclaration(ctx, <ClassDeclaration>node);
            case SyntaxKind.MissingDeclaration:
                return visitMissingDeclaration(ctx, <MissingDeclaration>node);
            case SyntaxKind.InterfaceDeclaration:
                return visitInterfaceDeclaration(ctx, <InterfaceDeclaration>node);
            case SyntaxKind.TypeAliasDeclaration:
                return visitTypeAliasDeclaration(ctx, <TypeAliasDeclaration>node);
            case SyntaxKind.EnumDeclaration:
                return visitEnumDeclaration(ctx, <EnumDeclaration>node);
            case SyntaxKind.ModuleDeclaration:
                return visitModuleDeclaration(ctx, <ModuleDeclaration>node);
            case SyntaxKind.ImportEqualsDeclaration:
                return visitImportEqualsDeclaration(ctx, <ImportEqualsDeclaration>node);
            case SyntaxKind.NamespaceExportDeclaration:
                return visitNamespaceExportDeclaration(ctx, <NamespaceExportDeclaration>node);
            case SyntaxKind.ExportDeclaration:
                return visitExportDeclaration(ctx, <ExportDeclaration>node);
            case SyntaxKind.ExportAssignment:
                return visitExportAssignment(ctx, <ExportAssignment>node);
            case SyntaxKind.Block:
                return visitBlock(ctx, <Block>node);
            case SyntaxKind.VariableStatement:
                return visitVariableStatement(ctx, <VariableStatement>node, parentKind);
            case SyntaxKind.ExpressionStatement:
                return visitExpressionStatement(ctx, <ExpressionStatement>node);
            case SyntaxKind.IfStatement:
                return visitIfStatement(ctx, <IfStatement>node);
            case SyntaxKind.DoStatement:
                return visitDoStatement(ctx, <DoStatement>node);
            case SyntaxKind.WhileStatement:
                return visitWhileStatement(ctx, <WhileStatement>node);
            case SyntaxKind.ForStatement:
                return visitForStatement(ctx, <ForStatement>node);
            case SyntaxKind.ForInStatement:
                return visitForInStatement(ctx, <ForInStatement>node);
            case SyntaxKind.ForOfStatement:
                return visitForOfStatement(ctx, <ForOfStatement>node);
            case SyntaxKind.SwitchStatement:
                return visitSwitchStatement(ctx, <SwitchStatement>node);
            case SyntaxKind.LabeledStatement:
                return visitLabeledStatement(ctx, <LabeledStatement>node);
            case SyntaxKind.ThrowStatement:
                return visitThrowStatement(ctx, <ThrowStatement>node);
            case SyntaxKind.TryStatement:
                return visitTryStatement(ctx, <TryStatement>node);
            case SyntaxKind.ReturnStatement:
                return visitReturnStatement(ctx, <ReturnStatement>node);

            // ignoring
            // case SyntaxKind.ImportDeclaration:
            // case SyntaxKind.BreakStatement:
            // case SyntaxKind.ContinueStatement:
            // case SyntaxKind.WithStatement:
            // case SyntaxKind.NotEmittedStatement:
            // case SyntaxKind.EmptyStatement:
            // case SyntaxKind.DebuggerStatement:
        }
    }
    function visitSourceFile(ctx: Context, node: SourceFile): void {
        ctx.pushScope((<NodeWithLocals><unknown>node).locals);
        for (const statement of node.statements) {
            visitStatement(ctx, statement, SyntaxKind.SourceFile);
        }
        ctx.popScope();
    }

    function findBindingElementParentDeclaration(element: BindingElement): VariableDeclaration | ParameterDeclaration {
        while (true) {
            if (element.parent.parent.kind === SyntaxKind.BindingElement) {
                element = element.parent.parent;
            }
        else {
                return element.parent.parent;
            }
        }
    }

    function isLocalDeclaration(decl: Declaration, sourceFile: SourceFile): boolean {
        if (isBindingElement(decl)) {
            decl = findBindingElementParentDeclaration(decl);
        }
        if (isVariableDeclaration(decl) || isBindingElement(decl)) {
            return (!isSourceFile(decl.parent.parent.parent) || isCatchClause(decl.parent)) && decl.getSourceFile() === sourceFile;
        }
        else if (isFunctionDeclaration(decl)) {
            return !isSourceFile(decl.parent) && decl.getSourceFile() === sourceFile;
        }
        return false;
    }

    function typeHasConstructSignatures(type: Type): boolean {
        if (type.isUnion()) {
            for (const t of type.types) {
                if (t.getConstructSignatures().length > 0) {
                    return true;
                }
            }
            return false;
        }
        return (type.getConstructSignatures().length > 0);
    }

    function typeHasCallSignatures(type: Type): boolean {
        if (type.isUnion()) {
            for (const t of type.types) {
                if (t.getCallSignatures().length > 0) {
                    return true;
                }
            }
            return false;
        }
        return (type.getCallSignatures().length > 0);
    }

    function typeHasProperties(type: Type): boolean {
        if (type.isUnion()) {
            for (const t of type.types) {
                if (t.getProperties().length > 0) {
                    return true;
                }
            }
            return false;
        }
        return (type.getProperties().length > 0);
    }

    export function compareTokens(sourceFile: SourceFile, actualTokens: number[], oracleTokens: number[]): string[] {
        const result: string[] = [];
        for (let i = 0, len = Math.max(oracleTokens.length / 3, actualTokens.length / 3); i < len; i++) {
            const offset = 3 * i;
            const oracleOffset = (offset < oracleTokens.length ? oracleTokens[offset] : -1);
            const oracleLength = (offset < oracleTokens.length ? oracleTokens[offset + 1] : -1);
            const oracleType = (offset < oracleTokens.length ? oracleTokens[offset + 2] : -1);
            const actualOffset = (offset < actualTokens.length ? actualTokens[offset] : -1);
            const actualLength = (offset < actualTokens.length ? actualTokens[offset + 1] : -1);
            const actualType = (offset < actualTokens.length ? actualTokens[offset + 2] : -1);
            if (oracleOffset !== actualOffset || oracleLength !== actualLength || oracleType !== actualType) {
                let debugStr = ``;
                debugStr += `THEIRS: ${printSemanticToken(sourceFile, oracleOffset, oracleLength, oracleType)}\n`;
                debugStr += `OURS: ${printSemanticToken(sourceFile, actualOffset, actualLength, actualType)}\n`;
                // const oracleNode = findNodeEncompassingRange(sourceFile, oracleOffset, oracleLength);
                // const actualNode = findNodeEncompassingRange(sourceFile, actualOffset, actualLength);
                result.push(debugStr);
                if (oracleOffset !== actualOffset) {
                    break;
                }
            }
        }
        return result;

        function printSemanticToken(sourceFile: SourceFile, offset: number, length: number, type: number): string {
            if (offset === -1) {
                return `<none>`;
            }
            const node = findNodeEncompassingRange(sourceFile, offset, length);
            const chain: string[] = [];
            let tmp: Node | undefined = node;
            while (tmp) {
                chain.push((<any>tmp).__debugKind);
                tmp = tmp.parent;
            }
            chain.reverse();
            const tokenType = (type >>> TokenEncodingConsts.typeOffset) - 1;
            const tokenModifiers = (type & TokenEncodingConsts.modifierMask);
            const lineChar = sourceFile.getLineAndCharacterOfPosition(node.pos + node.getLeadingTriviaWidth());

            return `<<<${node.getText()}>>> @ ${lineChar.line + 1}:${lineChar.character} --- ${chain.join(">")}    ::::    ${tokenTypeToString(tokenType)} - [${tokenModifiersToString(tokenModifiers)}]`;
        }
        function findNodeEncompassingRange(sourceFile: SourceFile, offset: number, length: number): Node {
            const searchStart = offset;
            const searchEnd = offset + length;
            let current: Node = sourceFile;
            outer: while (true) {
                // find the child that contains 'position'
                for (const child of current.getChildren(sourceFile)) {
                    const childStart = child.getStart(sourceFile, /* includeJsDocComment */ true);
                    const childEnd = child.getEnd();
                    if (childStart <= searchStart && searchEnd <= childEnd) {
                        // Good child
                        current = child;
                        continue outer;
                    }
                }
                return current;
            }
        }
        function tokenTypeToString(tokenType: TokenType): string {
            switch (tokenType) {
                case TokenType.class: return "class";
                case TokenType.enum: return "enum";
                case TokenType.interface: return "interface";
                case TokenType.namespace: return "namespace";
                case TokenType.typeParameter: return "typeParameter";
                case TokenType.type: return "type";
                case TokenType.parameter: return "parameter";
                case TokenType.variable: return "variable";
                case TokenType.enumMember: return "enumMember";
                case TokenType.property: return "property";
                case TokenType.function: return "function";
                case TokenType.member: return "member";
            }
            return "<unknown>";
        }
        function tokenModifierToString(tokenModifier: TokenModifier): string {
            switch (tokenModifier) {
                case TokenModifier.declaration: return "declaration";
                case TokenModifier.static: return "static";
                case TokenModifier.async: return "async";
                case TokenModifier.readonly: return "readonly";
                case TokenModifier.defaultLibrary: return "defaultLibrary";
                case TokenModifier.local: return "local";
            }
            return "<unknown>";
        }
        function tokenModifiersToString(tokenModifiers: number): string[] {
            const result: string[] = [];
            for (let i = 0; i < TokenModifier._; i++) {
                const mask = ((1 << i) >>> 0);
                if (tokenModifiers & mask) {
                    result.push(tokenModifierToString(i));
                }
            }
            return result;
        }
    }
}
