/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare module ts {
    interface Map<T> {
        [index: string]: T;
    }
    interface TextRange {
        pos: number;
        end: number;
    }
    const enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        NumericLiteral = 6,
        StringLiteral = 7,
        RegularExpressionLiteral = 8,
        NoSubstitutionTemplateLiteral = 9,
        TemplateHead = 10,
        TemplateMiddle = 11,
        TemplateTail = 12,
        OpenBraceToken = 13,
        CloseBraceToken = 14,
        OpenParenToken = 15,
        CloseParenToken = 16,
        OpenBracketToken = 17,
        CloseBracketToken = 18,
        DotToken = 19,
        DotDotDotToken = 20,
        SemicolonToken = 21,
        CommaToken = 22,
        LessThanToken = 23,
        GreaterThanToken = 24,
        LessThanEqualsToken = 25,
        GreaterThanEqualsToken = 26,
        EqualsEqualsToken = 27,
        ExclamationEqualsToken = 28,
        EqualsEqualsEqualsToken = 29,
        ExclamationEqualsEqualsToken = 30,
        EqualsGreaterThanToken = 31,
        PlusToken = 32,
        MinusToken = 33,
        AsteriskToken = 34,
        SlashToken = 35,
        PercentToken = 36,
        PlusPlusToken = 37,
        MinusMinusToken = 38,
        LessThanLessThanToken = 39,
        GreaterThanGreaterThanToken = 40,
        GreaterThanGreaterThanGreaterThanToken = 41,
        AmpersandToken = 42,
        BarToken = 43,
        CaretToken = 44,
        ExclamationToken = 45,
        TildeToken = 46,
        AmpersandAmpersandToken = 47,
        BarBarToken = 48,
        QuestionToken = 49,
        ColonToken = 50,
        EqualsToken = 51,
        PlusEqualsToken = 52,
        MinusEqualsToken = 53,
        AsteriskEqualsToken = 54,
        SlashEqualsToken = 55,
        PercentEqualsToken = 56,
        LessThanLessThanEqualsToken = 57,
        GreaterThanGreaterThanEqualsToken = 58,
        GreaterThanGreaterThanGreaterThanEqualsToken = 59,
        AmpersandEqualsToken = 60,
        BarEqualsToken = 61,
        CaretEqualsToken = 62,
        Identifier = 63,
        BreakKeyword = 64,
        CaseKeyword = 65,
        CatchKeyword = 66,
        ClassKeyword = 67,
        ConstKeyword = 68,
        ContinueKeyword = 69,
        DebuggerKeyword = 70,
        DefaultKeyword = 71,
        DeleteKeyword = 72,
        DoKeyword = 73,
        ElseKeyword = 74,
        EnumKeyword = 75,
        ExportKeyword = 76,
        ExtendsKeyword = 77,
        FalseKeyword = 78,
        FinallyKeyword = 79,
        ForKeyword = 80,
        FunctionKeyword = 81,
        IfKeyword = 82,
        ImportKeyword = 83,
        InKeyword = 84,
        InstanceOfKeyword = 85,
        NewKeyword = 86,
        NullKeyword = 87,
        ReturnKeyword = 88,
        SuperKeyword = 89,
        SwitchKeyword = 90,
        ThisKeyword = 91,
        ThrowKeyword = 92,
        TrueKeyword = 93,
        TryKeyword = 94,
        TypeOfKeyword = 95,
        VarKeyword = 96,
        VoidKeyword = 97,
        WhileKeyword = 98,
        WithKeyword = 99,
        ImplementsKeyword = 100,
        InterfaceKeyword = 101,
        LetKeyword = 102,
        PackageKeyword = 103,
        PrivateKeyword = 104,
        ProtectedKeyword = 105,
        PublicKeyword = 106,
        StaticKeyword = 107,
        YieldKeyword = 108,
        AnyKeyword = 109,
        BooleanKeyword = 110,
        ConstructorKeyword = 111,
        DeclareKeyword = 112,
        GetKeyword = 113,
        ModuleKeyword = 114,
        RequireKeyword = 115,
        NumberKeyword = 116,
        SetKeyword = 117,
        StringKeyword = 118,
        TypeKeyword = 119,
        QualifiedName = 120,
        ComputedPropertyName = 121,
        TypeParameter = 122,
        Parameter = 123,
        Property = 124,
        Method = 125,
        Constructor = 126,
        GetAccessor = 127,
        SetAccessor = 128,
        CallSignature = 129,
        ConstructSignature = 130,
        IndexSignature = 131,
        TypeReference = 132,
        FunctionType = 133,
        ConstructorType = 134,
        TypeQuery = 135,
        TypeLiteral = 136,
        ArrayType = 137,
        TupleType = 138,
        UnionType = 139,
        ParenthesizedType = 140,
        ArrayLiteralExpression = 141,
        ObjectLiteralExpression = 142,
        PropertyAccessExpression = 143,
        ElementAccessExpression = 144,
        CallExpression = 145,
        NewExpression = 146,
        TaggedTemplateExpression = 147,
        TypeAssertionExpression = 148,
        ParenthesizedExpression = 149,
        FunctionExpression = 150,
        ArrowFunction = 151,
        DeleteExpression = 152,
        TypeOfExpression = 153,
        VoidExpression = 154,
        PrefixUnaryExpression = 155,
        PostfixUnaryExpression = 156,
        BinaryExpression = 157,
        ConditionalExpression = 158,
        TemplateExpression = 159,
        YieldExpression = 160,
        OmittedExpression = 161,
        TemplateSpan = 162,
        Block = 163,
        VariableStatement = 164,
        EmptyStatement = 165,
        ExpressionStatement = 166,
        IfStatement = 167,
        DoStatement = 168,
        WhileStatement = 169,
        ForStatement = 170,
        ForInStatement = 171,
        ContinueStatement = 172,
        BreakStatement = 173,
        ReturnStatement = 174,
        WithStatement = 175,
        SwitchStatement = 176,
        LabeledStatement = 177,
        ThrowStatement = 178,
        TryStatement = 179,
        TryBlock = 180,
        FinallyBlock = 181,
        DebuggerStatement = 182,
        VariableDeclaration = 183,
        FunctionDeclaration = 184,
        ClassDeclaration = 185,
        InterfaceDeclaration = 186,
        TypeAliasDeclaration = 187,
        EnumDeclaration = 188,
        ModuleDeclaration = 189,
        ModuleBlock = 190,
        ImportDeclaration = 191,
        ExportAssignment = 192,
        ExternalModuleReference = 193,
        CaseClause = 194,
        DefaultClause = 195,
        HeritageClause = 196,
        CatchClause = 197,
        PropertyAssignment = 198,
        ShorthandPropertyAssignment = 199,
        EnumMember = 200,
        SourceFile = 201,
        Program = 202,
        SyntaxList = 203,
        Count = 204,
        FirstAssignment = 51,
        LastAssignment = 62,
        FirstReservedWord = 64,
        LastReservedWord = 99,
        FirstKeyword = 64,
        LastKeyword = 119,
        FirstFutureReservedWord = 100,
        LastFutureReservedWord = 108,
        FirstTypeNode = 132,
        LastTypeNode = 140,
        FirstPunctuation = 13,
        LastPunctuation = 62,
        FirstToken = 0,
        LastToken = 119,
        FirstTriviaToken = 2,
        LastTriviaToken = 5,
        FirstLiteralToken = 6,
        LastLiteralToken = 9,
        FirstTemplateToken = 9,
        LastTemplateToken = 12,
        FirstOperator = 21,
        LastOperator = 62,
        FirstBinaryOperator = 23,
        LastBinaryOperator = 62,
        FirstNode = 120,
    }
    const enum NodeFlags {
        Export = 1,
        Ambient = 2,
        Public = 16,
        Private = 32,
        Protected = 64,
        Static = 128,
        MultiLine = 256,
        Synthetic = 512,
        DeclarationFile = 1024,
        Let = 2048,
        Const = 4096,
        OctalLiteral = 8192,
        Modifier = 243,
        AccessibilityModifier = 112,
        BlockScoped = 6144,
    }
    const enum ParserContextFlags {
        StrictMode = 1,
        DisallowIn = 2,
        Yield = 4,
        GeneratorParameter = 8,
        ContainsError = 16,
        HasPropagatedChildContainsErrorFlag = 32,
    }
    interface Node extends TextRange {
        kind: SyntaxKind;
        flags: NodeFlags;
        parserContextFlags?: ParserContextFlags;
        id?: number;
        parent?: Node;
        symbol?: Symbol;
        locals?: SymbolTable;
        nextContainer?: Node;
        localSymbol?: Symbol;
        modifiers?: ModifiersArray;
    }
    interface NodeArray<T> extends Array<T>, TextRange {
        hasTrailingComma?: boolean;
    }
    interface ModifiersArray extends NodeArray<Node> {
        flags: number;
    }
    interface Identifier extends PrimaryExpression {
        text: string;
    }
    interface QualifiedName extends Node {
        left: EntityName;
        right: Identifier;
    }
    type EntityName = Identifier | QualifiedName;
    type DeclarationName = Identifier | LiteralExpression | ComputedPropertyName;
    interface Declaration extends Node {
        _declarationBrand: any;
        name?: DeclarationName;
    }
    interface ComputedPropertyName extends Node {
        expression: Expression;
    }
    interface TypeParameterDeclaration extends Declaration {
        name: Identifier;
        constraint?: TypeNode;
        expression?: Expression;
    }
    interface SignatureDeclaration extends Declaration {
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        parameters: NodeArray<ParameterDeclaration>;
        type?: TypeNode;
    }
    interface VariableDeclaration extends Declaration {
        name: Identifier;
        type?: TypeNode;
        initializer?: Expression;
    }
    interface ParameterDeclaration extends Declaration {
        dotDotDotToken?: Node;
        name: Identifier;
        questionToken?: Node;
        type?: TypeNode | StringLiteralExpression;
        initializer?: Expression;
    }
    interface PropertyDeclaration extends Declaration, ClassElement {
        _propertyDeclarationBrand: any;
        questionToken?: Node;
        type?: TypeNode;
        initializer?: Expression;
    }
    type VariableOrParameterDeclaration = VariableDeclaration | ParameterDeclaration;
    type VariableOrParameterOrPropertyDeclaration = VariableOrParameterDeclaration | PropertyDeclaration;
    interface ObjectLiteralElement extends Declaration {
        _objectLiteralBrandBrand: any;
    }
    interface ShorthandPropertyAssignment extends ObjectLiteralElement {
        name: Identifier;
        questionToken?: Node;
    }
    interface PropertyAssignment extends ObjectLiteralElement {
        _propertyAssignmentBrand: any;
        name: DeclarationName;
        questionToken?: Node;
        initializer: Expression;
    }
    /**
     * Several node kinds share function-like features such as a signature,
     * a name, and a body. These nodes should extend FunctionLikeDeclaration.
     * Examples:
     *  FunctionDeclaration
     *  MethodDeclaration
     *  AccessorDeclaration
     */
    interface FunctionLikeDeclaration extends SignatureDeclaration {
        _functionLikeDeclarationBrand: any;
        asteriskToken?: Node;
        questionToken?: Node;
        body?: Block | Expression;
    }
    interface FunctionDeclaration extends FunctionLikeDeclaration, Statement {
        name: Identifier;
        body?: Block;
    }
    interface MethodDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        body?: Block;
    }
    interface ConstructorDeclaration extends FunctionLikeDeclaration, ClassElement {
        body?: Block;
    }
    interface AccessorDeclaration extends FunctionLikeDeclaration, ClassElement, ObjectLiteralElement {
        _accessorDeclarationBrand: any;
        body: Block;
    }
    interface IndexSignatureDeclaration extends SignatureDeclaration, ClassElement {
        _indexSignatureDeclarationBrand: any;
    }
    interface TypeNode extends Node {
        _typeNodeBrand: any;
    }
    interface FunctionOrConstructorTypeNode extends TypeNode, SignatureDeclaration {
        _functionOrConstructorTypeNodeBrand: any;
    }
    interface TypeReferenceNode extends TypeNode {
        typeName: EntityName;
        typeArguments?: NodeArray<TypeNode>;
    }
    interface TypeQueryNode extends TypeNode {
        exprName: EntityName;
    }
    interface TypeLiteralNode extends TypeNode, Declaration {
        members: NodeArray<Node>;
    }
    interface ArrayTypeNode extends TypeNode {
        elementType: TypeNode;
    }
    interface TupleTypeNode extends TypeNode {
        elementTypes: NodeArray<TypeNode>;
    }
    interface UnionTypeNode extends TypeNode {
        types: NodeArray<TypeNode>;
    }
    interface ParenthesizedTypeNode extends TypeNode {
        type: TypeNode;
    }
    interface Expression extends Node {
        _expressionBrand: any;
        contextualType?: Type;
    }
    interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }
    interface PrefixUnaryExpression extends UnaryExpression {
        operator: SyntaxKind;
        operand: UnaryExpression;
    }
    interface PostfixUnaryExpression extends PostfixExpression {
        operand: LeftHandSideExpression;
        operator: SyntaxKind;
    }
    interface PostfixExpression extends UnaryExpression {
        _postfixExpressionBrand: any;
    }
    interface LeftHandSideExpression extends PostfixExpression {
        _leftHandSideExpressionBrand: any;
    }
    interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }
    interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }
    interface DeleteExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface TypeOfExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface VoidExpression extends UnaryExpression {
        expression: UnaryExpression;
    }
    interface YieldExpression extends Expression {
        asteriskToken?: Node;
        expression: Expression;
    }
    interface BinaryExpression extends Expression {
        left: Expression;
        operator: SyntaxKind;
        right: Expression;
    }
    interface ConditionalExpression extends Expression {
        condition: Expression;
        whenTrue: Expression;
        whenFalse: Expression;
    }
    interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclaration {
        name?: Identifier;
        body: Block | Expression;
    }
    interface LiteralExpression extends PrimaryExpression {
        text: string;
        isUnterminated?: boolean;
    }
    interface StringLiteralExpression extends LiteralExpression {
        _stringLiteralExpressionBrand: any;
    }
    interface TemplateExpression extends PrimaryExpression {
        head: LiteralExpression;
        templateSpans: NodeArray<TemplateSpan>;
    }
    interface TemplateSpan extends Node {
        expression: Expression;
        literal: LiteralExpression;
    }
    interface ParenthesizedExpression extends PrimaryExpression {
        expression: Expression;
    }
    interface ArrayLiteralExpression extends PrimaryExpression {
        elements: NodeArray<Expression>;
    }
    interface ObjectLiteralExpression extends PrimaryExpression, Declaration {
        properties: NodeArray<ObjectLiteralElement>;
    }
    interface PropertyAccessExpression extends MemberExpression {
        expression: LeftHandSideExpression;
        name: Identifier;
    }
    interface ElementAccessExpression extends MemberExpression {
        expression: LeftHandSideExpression;
        argumentExpression?: Expression;
    }
    interface CallExpression extends LeftHandSideExpression {
        expression: LeftHandSideExpression;
        typeArguments?: NodeArray<TypeNode>;
        arguments: NodeArray<Expression>;
    }
    interface NewExpression extends CallExpression, PrimaryExpression {
    }
    interface TaggedTemplateExpression extends MemberExpression {
        tag: LeftHandSideExpression;
        template: LiteralExpression | TemplateExpression;
    }
    type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression;
    interface TypeAssertion extends UnaryExpression {
        type: TypeNode;
        expression: UnaryExpression;
    }
    interface Statement extends Node, ModuleElement {
        _statementBrand: any;
    }
    interface Block extends Statement {
        statements: NodeArray<Statement>;
    }
    interface VariableStatement extends Statement {
        declarations: NodeArray<VariableDeclaration>;
    }
    interface ExpressionStatement extends Statement {
        expression: Expression;
    }
    interface IfStatement extends Statement {
        expression: Expression;
        thenStatement: Statement;
        elseStatement?: Statement;
    }
    interface IterationStatement extends Statement {
        statement: Statement;
    }
    interface DoStatement extends IterationStatement {
        expression: Expression;
    }
    interface WhileStatement extends IterationStatement {
        expression: Expression;
    }
    interface ForStatement extends IterationStatement {
        declarations?: NodeArray<VariableDeclaration>;
        initializer?: Expression;
        condition?: Expression;
        iterator?: Expression;
    }
    interface ForInStatement extends IterationStatement {
        declarations?: NodeArray<VariableDeclaration>;
        variable?: Expression;
        expression: Expression;
    }
    interface BreakOrContinueStatement extends Statement {
        label?: Identifier;
    }
    interface ReturnStatement extends Statement {
        expression?: Expression;
    }
    interface WithStatement extends Statement {
        expression: Expression;
        statement: Statement;
    }
    interface SwitchStatement extends Statement {
        expression: Expression;
        clauses: NodeArray<CaseOrDefaultClause>;
    }
    interface CaseClause extends Node {
        expression?: Expression;
        statements: NodeArray<Statement>;
    }
    interface DefaultClause extends Node {
        statements: NodeArray<Statement>;
    }
    type CaseOrDefaultClause = CaseClause | DefaultClause;
    interface LabeledStatement extends Statement {
        label: Identifier;
        statement: Statement;
    }
    interface ThrowStatement extends Statement {
        expression: Expression;
    }
    interface TryStatement extends Statement {
        tryBlock: Block;
        catchClause?: CatchClause;
        finallyBlock?: Block;
    }
    interface CatchClause extends Declaration {
        name: Identifier;
        type?: TypeNode;
        block: Block;
    }
    interface ModuleElement extends Node {
        _moduleElementBrand: any;
    }
    interface ClassDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<ClassElement>;
    }
    interface ClassElement extends Declaration {
        _classElementBrand: any;
    }
    interface InterfaceDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        typeParameters?: NodeArray<TypeParameterDeclaration>;
        heritageClauses?: NodeArray<HeritageClause>;
        members: NodeArray<Declaration>;
    }
    interface HeritageClause extends Node {
        token: SyntaxKind;
        types?: NodeArray<TypeReferenceNode>;
    }
    interface TypeAliasDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        type: TypeNode;
    }
    interface EnumMember extends Declaration {
        name: DeclarationName;
        initializer?: Expression;
    }
    interface EnumDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        members: NodeArray<EnumMember>;
    }
    interface ModuleDeclaration extends Declaration, ModuleElement {
        name: Identifier | LiteralExpression;
        body: ModuleBlock | ModuleDeclaration;
    }
    interface ModuleBlock extends Node, ModuleElement {
        statements: NodeArray<ModuleElement>;
    }
    interface ImportDeclaration extends Declaration, ModuleElement {
        name: Identifier;
        moduleReference: EntityName | ExternalModuleReference;
    }
    interface ExternalModuleReference extends Node {
        expression?: Expression;
    }
    interface ExportAssignment extends Statement, ModuleElement {
        exportName: Identifier;
    }
    interface FileReference extends TextRange {
        filename: string;
    }
    interface CommentRange extends TextRange {
        hasTrailingNewLine?: boolean;
    }
    interface SourceFile extends Declaration {
        statements: NodeArray<ModuleElement>;
        endOfFileToken: Node;
        filename: string;
        text: string;
        getLineAndCharacterFromPosition(position: number): LineAndCharacter;
        getPositionFromLineAndCharacter(line: number, character: number): number;
        getLineStarts(): number[];
        amdDependencies: string[];
        amdModuleName: string;
        referencedFiles: FileReference[];
        referenceDiagnostics: Diagnostic[];
        parseDiagnostics: Diagnostic[];
        grammarDiagnostics: Diagnostic[];
        getSyntacticDiagnostics(): Diagnostic[];
        semanticDiagnostics: Diagnostic[];
        hasNoDefaultLib: boolean;
        externalModuleIndicator: Node;
        nodeCount: number;
        identifierCount: number;
        symbolCount: number;
        isOpen: boolean;
        version: string;
        languageVersion: ScriptTarget;
        identifiers: Map<string>;
    }
    interface Program {
        getSourceFile(filename: string): SourceFile;
        getSourceFiles(): SourceFile[];
        getCompilerOptions(): CompilerOptions;
        getCompilerHost(): CompilerHost;
        getDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getTypeChecker(fullTypeCheckMode: boolean): TypeChecker;
        getCommonSourceDirectory(): string;
    }
    interface SourceMapSpan {
        emittedLine: number;
        emittedColumn: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
        sourceIndex: number;
    }
    interface SourceMapData {
        sourceMapFilePath: string;
        jsSourceMappingURL: string;
        sourceMapFile: string;
        sourceMapSourceRoot: string;
        sourceMapSources: string[];
        inputSourceFileNames: string[];
        sourceMapNames?: string[];
        sourceMapMappings: string;
        sourceMapDecodedMappings: SourceMapSpan[];
    }
    enum EmitReturnStatus {
        Succeeded = 0,
        AllOutputGenerationSkipped = 1,
        JSGeneratedWithSemanticErrors = 2,
        DeclarationGenerationSkipped = 3,
        EmitErrorsEncountered = 4,
        CompilerOptionsErrors = 5,
    }
    interface EmitResult {
        emitResultStatus: EmitReturnStatus;
        diagnostics: Diagnostic[];
        sourceMaps: SourceMapData[];
    }
    interface TypeChecker {
        getProgram(): Program;
        getDiagnostics(sourceFile?: SourceFile): Diagnostic[];
        getDeclarationDiagnostics(sourceFile: SourceFile): Diagnostic[];
        getGlobalDiagnostics(): Diagnostic[];
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        emitFiles(targetSourceFile?: SourceFile): EmitResult;
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol;
        getSignaturesOfType(type: Type, kind: SignatureKind): Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolAtLocation(node: Node): Symbol;
        getShorthandAssignmentValueSymbol(location: Node): Symbol;
        getTypeAtLocation(node: Node): Type;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): string;
        getSymbolDisplayBuilder(): SymbolDisplayBuilder;
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): Symbol[];
        getContextualType(node: Expression): Type;
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[]): Signature;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        isEmitBlocked(sourceFile?: SourceFile): boolean;
        getEnumMemberValue(node: EnumMember): number;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName, propertyName: string): boolean;
        getAliasedSymbol(symbol: Symbol): Symbol;
    }
    interface SymbolDisplayBuilder {
        buildTypeDisplay(type: Type, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildSymbolDisplay(symbol: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): void;
        buildSignatureDisplay(signatures: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildParameterDisplay(parameter: Symbol, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplay(tp: TypeParameter, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildTypeParameterDisplayFromSymbol(symbol: Symbol, writer: SymbolWriter, enclosingDeclaraiton?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForParametersAndDelimiters(parameters: Symbol[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildDisplayForTypeParametersAndDelimiters(typeParameters: TypeParameter[], writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
        buildReturnTypeDisplay(signature: Signature, writer: SymbolWriter, enclosingDeclaration?: Node, flags?: TypeFormatFlags): void;
    }
    interface SymbolWriter {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
        trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags): void;
    }
    const enum TypeFormatFlags {
        None = 0,
        WriteArrayAsGenericType = 1,
        UseTypeOfFunction = 2,
        NoTruncation = 4,
        WriteArrowStyleSignature = 8,
        WriteOwnNameForAnyLike = 16,
        WriteTypeArgumentsOfSignature = 32,
        InElementType = 64,
    }
    const enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
    }
    const enum SymbolAccessibility {
        Accessible = 0,
        NotAccessible = 1,
        CannotBeNamed = 2,
    }
    interface SymbolVisibilityResult {
        accessibility: SymbolAccessibility;
        aliasesToMakeVisible?: ImportDeclaration[];
        errorSymbolName?: string;
        errorNode?: Node;
    }
    interface SymbolAccessiblityResult extends SymbolVisibilityResult {
        errorModuleName?: string;
    }
    interface EmitResolver {
        getProgram(): Program;
        getLocalNameOfContainer(container: ModuleDeclaration | EnumDeclaration): string;
        getExpressionNamePrefix(node: Identifier): string;
        getExportAssignmentName(node: SourceFile): string;
        isReferencedImportDeclaration(node: ImportDeclaration): boolean;
        isTopLevelValueImportWithEntityName(node: ImportDeclaration): boolean;
        getNodeCheckFlags(node: Node): NodeCheckFlags;
        getEnumMemberValue(node: EnumMember): number;
        hasSemanticErrors(sourceFile?: SourceFile): boolean;
        isDeclarationVisible(node: Declaration): boolean;
        isImplementationOfOverload(node: FunctionLikeDeclaration): boolean;
        writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableOrParameterDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        writeReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: TypeFormatFlags, writer: SymbolWriter): void;
        isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags): SymbolAccessiblityResult;
        isEntityNameVisible(entityName: EntityName, enclosingDeclaration: Node): SymbolVisibilityResult;
        getConstantValue(node: PropertyAccessExpression | ElementAccessExpression): number;
        isEmitBlocked(sourceFile?: SourceFile): boolean;
    }
    const enum SymbolFlags {
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        CallSignature = 131072,
        ConstructSignature = 262144,
        IndexSignature = 524288,
        TypeParameter = 1048576,
        TypeAlias = 2097152,
        ExportValue = 4194304,
        ExportType = 8388608,
        ExportNamespace = 16777216,
        Import = 33554432,
        Instantiated = 67108864,
        Merged = 134217728,
        Transient = 268435456,
        Prototype = 536870912,
        UnionProperty = 1073741824,
        Enum = 384,
        Variable = 3,
        Value = 107455,
        Type = 3152352,
        Namespace = 1536,
        Module = 1536,
        Accessor = 98304,
        Signature = 917504,
        FunctionScopedVariableExcludes = 107454,
        BlockScopedVariableExcludes = 107455,
        ParameterExcludes = 107455,
        PropertyExcludes = 107455,
        EnumMemberExcludes = 107455,
        FunctionExcludes = 106927,
        ClassExcludes = 3258879,
        InterfaceExcludes = 3152288,
        RegularEnumExcludes = 3258623,
        ConstEnumExcludes = 3259263,
        ValueModuleExcludes = 106639,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 99263,
        GetAccessorExcludes = 41919,
        SetAccessorExcludes = 74687,
        TypeParameterExcludes = 2103776,
        TypeAliasExcludes = 3152352,
        ImportExcludes = 33554432,
        ModuleMember = 35653619,
        ExportHasLocal = 944,
        HasLocals = 1041936,
        HasExports = 1952,
        HasMembers = 6240,
        IsContainer = 1048560,
        PropertyOrAccessor = 98308,
        Export = 29360128,
    }
    interface Symbol {
        flags: SymbolFlags;
        name: string;
        id?: number;
        mergeId?: number;
        declarations?: Declaration[];
        parent?: Symbol;
        members?: SymbolTable;
        exports?: SymbolTable;
        exportSymbol?: Symbol;
        valueDeclaration?: Declaration;
        constEnumOnlyModule?: boolean;
    }
    interface SymbolLinks {
        target?: Symbol;
        type?: Type;
        declaredType?: Type;
        mapper?: TypeMapper;
        referenced?: boolean;
        exportAssignSymbol?: Symbol;
        unionType?: UnionType;
    }
    interface TransientSymbol extends Symbol, SymbolLinks {
    }
    interface SymbolTable {
        [index: string]: Symbol;
    }
    const enum NodeCheckFlags {
        TypeChecked = 1,
        LexicalThis = 2,
        CaptureThis = 4,
        EmitExtends = 8,
        SuperInstance = 16,
        SuperStatic = 32,
        ContextChecked = 64,
        EnumValuesComputed = 128,
    }
    interface NodeLinks {
        resolvedType?: Type;
        resolvedSignature?: Signature;
        resolvedSymbol?: Symbol;
        flags?: NodeCheckFlags;
        enumMemberValue?: number;
        isIllegalTypeReferenceInConstraint?: boolean;
        isVisible?: boolean;
        localModuleName?: string;
        assignmentChecks?: Map<boolean>;
    }
    const enum TypeFlags {
        Any = 1,
        String = 2,
        Number = 4,
        Boolean = 8,
        Void = 16,
        Undefined = 32,
        Null = 64,
        Enum = 128,
        StringLiteral = 256,
        TypeParameter = 512,
        Class = 1024,
        Interface = 2048,
        Reference = 4096,
        Tuple = 8192,
        Union = 16384,
        Anonymous = 32768,
        FromSignature = 65536,
        Intrinsic = 127,
        StringLike = 258,
        NumberLike = 132,
        ObjectType = 48128,
    }
    interface Type {
        flags: TypeFlags;
        id: number;
        symbol?: Symbol;
    }
    interface IntrinsicType extends Type {
        intrinsicName: string;
    }
    interface StringLiteralType extends Type {
        text: string;
    }
    interface ObjectType extends Type {
    }
    interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[];
        baseTypes: ObjectType[];
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredStringIndexType: Type;
        declaredNumberIndexType: Type;
    }
    interface TypeReference extends ObjectType {
        target: GenericType;
        typeArguments: Type[];
    }
    interface GenericType extends InterfaceType, TypeReference {
        instantiations: Map<TypeReference>;
        openReferenceTargets: GenericType[];
        openReferenceChecks: Map<boolean>;
    }
    interface TupleType extends ObjectType {
        elementTypes: Type[];
        baseArrayType: TypeReference;
    }
    interface UnionType extends Type {
        types: Type[];
        resolvedProperties: SymbolTable;
    }
    interface ResolvedType extends ObjectType, UnionType {
        members: SymbolTable;
        properties: Symbol[];
        callSignatures: Signature[];
        constructSignatures: Signature[];
        stringIndexType: Type;
        numberIndexType: Type;
    }
    interface TypeParameter extends Type {
        constraint: Type;
        target?: TypeParameter;
        mapper?: TypeMapper;
    }
    const enum SignatureKind {
        Call = 0,
        Construct = 1,
    }
    interface Signature {
        declaration: SignatureDeclaration;
        typeParameters: TypeParameter[];
        parameters: Symbol[];
        resolvedReturnType: Type;
        minArgumentCount: number;
        hasRestParameter: boolean;
        hasStringLiterals: boolean;
        target?: Signature;
        mapper?: TypeMapper;
        unionSignatures?: Signature[];
        erasedSignatureCache?: Signature;
        isolatedSignatureType?: ObjectType;
    }
    const enum IndexKind {
        String = 0,
        Number = 1,
    }
    interface TypeMapper {
        (t: Type): Type;
    }
    interface TypeInferences {
        primary: Type[];
        secondary: Type[];
    }
    interface InferenceContext {
        typeParameters: TypeParameter[];
        inferUnionTypes: boolean;
        inferences: TypeInferences[];
        inferredTypes: Type[];
        failedTypeParameterIndex?: number;
    }
    interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        isEarly?: boolean;
    }
    interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain;
    }
    interface Diagnostic {
        file: SourceFile;
        start: number;
        length: number;
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        /**
          * Early error - any error (can be produced at parsing\binding\typechecking step) that blocks emit
          */
        isEarly?: boolean;
    }
    enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Message = 2,
    }
    interface CompilerOptions {
        allowNonTsExtensions?: boolean;
        charset?: string;
        codepage?: number;
        declaration?: boolean;
        diagnostics?: boolean;
        emitBOM?: boolean;
        help?: boolean;
        locale?: string;
        mapRoot?: string;
        module?: ModuleKind;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noImplicitAny?: boolean;
        noLib?: boolean;
        noLibCheck?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        preserveConstEnums?: boolean;
        removeComments?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        suppressImplicitAnyIndexErrors?: boolean;
        target?: ScriptTarget;
        version?: boolean;
        watch?: boolean;
        [option: string]: string | number | boolean;
    }
    const enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
    }
    interface LineAndCharacter {
        line: number;
        character: number;
    }
    const enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES6 = 2,
        Latest = 2,
    }
    interface ParsedCommandLine {
        options: CompilerOptions;
        filenames: string[];
        errors: Diagnostic[];
    }
    interface CommandLineOption {
        name: string;
        type: string | Map<number>;
        shortName?: string;
        description?: DiagnosticMessage;
        paramType?: DiagnosticMessage;
        error?: DiagnosticMessage;
    }
    const enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,
        lineFeed = 10,
        carriageReturn = 13,
        lineSeparator = 8232,
        paragraphSeparator = 8233,
        nextLine = 133,
        space = 32,
        nonBreakingSpace = 160,
        enQuad = 8192,
        emQuad = 8193,
        enSpace = 8194,
        emSpace = 8195,
        threePerEmSpace = 8196,
        fourPerEmSpace = 8197,
        sixPerEmSpace = 8198,
        figureSpace = 8199,
        punctuationSpace = 8200,
        thinSpace = 8201,
        hairSpace = 8202,
        zeroWidthSpace = 8203,
        narrowNoBreakSpace = 8239,
        ideographicSpace = 12288,
        mathematicalSpace = 8287,
        ogham = 5760,
        _ = 95,
        $ = 36,
        _0 = 48,
        _1 = 49,
        _2 = 50,
        _3 = 51,
        _4 = 52,
        _5 = 53,
        _6 = 54,
        _7 = 55,
        _8 = 56,
        _9 = 57,
        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        j = 106,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        ampersand = 38,
        asterisk = 42,
        at = 64,
        backslash = 92,
        backtick = 96,
        bar = 124,
        caret = 94,
        closeBrace = 125,
        closeBracket = 93,
        closeParen = 41,
        colon = 58,
        comma = 44,
        dot = 46,
        doubleQuote = 34,
        equals = 61,
        exclamation = 33,
        greaterThan = 62,
        lessThan = 60,
        minus = 45,
        openBrace = 123,
        openBracket = 91,
        openParen = 40,
        percent = 37,
        plus = 43,
        question = 63,
        semicolon = 59,
        singleQuote = 39,
        slash = 47,
        tilde = 126,
        backspace = 8,
        formFeed = 12,
        byteOrderMark = 65279,
        tab = 9,
        verticalTab = 11,
    }
    interface CancellationToken {
        isCancellationRequested(): boolean;
    }
    interface CompilerHost {
        getSourceFile(filename: string, languageVersion: ScriptTarget, onError?: (message: string) => void): SourceFile;
        getDefaultLibFilename(options: CompilerOptions): string;
        getCancellationToken?(): CancellationToken;
        writeFile(filename: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void): void;
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
    }
}
declare module ts {
    interface ErrorCallback {
        (message: DiagnosticMessage): void;
    }
    interface CommentCallback {
        (pos: number, end: number): void;
    }
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        isUnterminated(): boolean;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanTemplateToken(): SyntaxKind;
        scan(): SyntaxKind;
        setText(text: string): void;
        setTextPos(textPos: number): void;
        lookAhead<T>(callback: () => T): T;
        tryScan<T>(callback: () => T): T;
    }
    function tokenToString(t: SyntaxKind): string;
    function computeLineStarts(text: string): number[];
    function getPositionFromLineAndCharacter(lineStarts: number[], line: number, character: number): number;
    function getLineAndCharacterOfPosition(lineStarts: number[], position: number): {
        line: number;
        character: number;
    };
    function positionToLineAndCharacter(text: string, pos: number): {
        line: number;
        character: number;
    };
    function isWhiteSpace(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function isOctalDigit(ch: number): boolean;
    function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean): number;
    function getLeadingCommentRanges(text: string, pos: number): CommentRange[];
    function getTrailingCommentRanges(text: string, pos: number): CommentRange[];
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, text?: string, onError?: ErrorCallback): Scanner;
}
declare module ts {
    function getNodeConstructor(kind: SyntaxKind): new () => Node;
    function forEachChild<T>(node: Node, cbNode: (node: Node) => T, cbNodes?: (nodes: Node[]) => T): T;
    function createCompilerHost(options: CompilerOptions): CompilerHost;
    function createSourceFile(filename: string, sourceText: string, languageVersion: ScriptTarget, version: string, isOpen?: boolean): SourceFile;
    function createProgram(rootNames: string[], options: CompilerOptions, host: CompilerHost): Program;
}
declare module ts {
    function createTypeChecker(program: Program, fullTypeCheck: boolean): TypeChecker;
}
declare module ts {
    var servicesVersion: string;
    interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFile): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node;
        getLastToken(sourceFile?: SourceFile): Node;
    }
    interface Symbol {
        getFlags(): SymbolFlags;
        getName(): string;
        getDeclarations(): Declaration[];
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol;
        getApparentProperties(): Symbol[];
        getCallSignatures(): Signature[];
        getConstructSignatures(): Signature[];
        getStringIndexType(): Type;
        getNumberIndexType(): Type;
    }
    interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): Type[];
        getParameters(): Symbol[];
        getReturnType(): Type;
        getDocumentationComment(): SymbolDisplayPart[];
    }
    interface SourceFile {
        getScriptSnapshot(): IScriptSnapshot;
        getNamedDeclarations(): Declaration[];
        update(scriptSnapshot: IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TextChangeRange): SourceFile;
    }
    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;
        /** Gets the length of this script snapshot. */
        getLength(): number;
        /**
         * This call returns the array containing the start position of every line.
         * i.e."[0, 10, 55]".  TODO: consider making this optional.  The language service could
         * always determine this (albeit in a more expensive manner).
         */
        getLineStartPositions(): number[];
        /**
         * Gets the TextChangeRange that describe how the text changed between this text and
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange;
    }
    module ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
    interface PreProcessedFileInfo {
        referencedFiles: FileReference[];
        importedFiles: FileReference[];
        isLibFile: boolean;
    }
    interface Logger {
        log(s: string): void;
    }
    interface LanguageServiceHost extends Logger {
        getCompilationSettings(): CompilerOptions;
        getScriptFileNames(): string[];
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): IScriptSnapshot;
        getLocalizedDiagnosticMessages?(): any;
        getCancellationToken?(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(options: CompilerOptions): string;
    }
    interface LanguageService {
        cleanupSemanticCache(): void;
        getSyntacticDiagnostics(fileName: string): Diagnostic[];
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails;
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan;
        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getRenameInfo(fileName: string, position: number): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];
        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[];
        getEmitOutput(fileName: string): EmitOutput;
        getSourceFile(filename: string): SourceFile;
        dispose(): void;
    }
    class TextSpan {
        private _start;
        private _length;
        /**
            * Creates a TextSpan instance beginning with the position Start and having the Length
            * specified with length.
            */
        constructor(start: number, length: number);
        toJSON(key: any): any;
        start(): number;
        length(): number;
        end(): number;
        isEmpty(): boolean;
        /**
            * Determines whether the position lies within the span. Returns true if the position is greater than or equal to Start and strictly less
            * than End, otherwise false.
            * @param position The position to check.
            */
        containsPosition(position: number): boolean;
        /**
            * Determines whether span falls completely within this span. Returns true if the specified span falls completely within this span, otherwise false.
            * @param span The span to check.
            */
        containsTextSpan(span: TextSpan): boolean;
        /**
            * Determines whether the given span overlaps this span. Two spans are considered to overlap
            * if they have positions in common and neither is empty. Empty spans do not overlap with any
            * other span. Returns true if the spans overlap, false otherwise.
            * @param span The span to check.
            */
        overlapsWith(span: TextSpan): boolean;
        /**
            * Returns the overlap with the given span, or undefined if there is no overlap.
            * @param span The span to check.
            */
        overlap(span: TextSpan): TextSpan;
        /**
            * Determines whether span intersects this span. Two spans are considered to
            * intersect if they have positions in common or the end of one span
            * coincides with the start of the other span. Returns true if the spans intersect, false otherwise.
            * @param The span to check.
            */
        intersectsWithTextSpan(span: TextSpan): boolean;
        intersectsWith(start: number, length: number): boolean;
        /**
            * Determines whether the given position intersects this span.
            * A position is considered to intersect if it is between the start and
            * end positions (inclusive) of this span. Returns true if the position intersects, false otherwise.
            * @param position The position to check.
            */
        intersectsWithPosition(position: number): boolean;
        /**
            * Returns the intersection with the given span, or undefined if there is no intersection.
            * @param span The span to check.
            */
        intersection(span: TextSpan): TextSpan;
        /**
            * Creates a new TextSpan from the given start and end positions
            * as opposed to a position and length.
            */
        static fromBounds(start: number, end: number): TextSpan;
    }
    class TextChangeRange {
        static unchanged: TextChangeRange;
        private _span;
        private _newLength;
        /**
            * Initializes a new instance of TextChangeRange.
            */
        constructor(span: TextSpan, newLength: number);
        /**
            * The span of text before the edit which is being changed
            */
        span(): TextSpan;
        /**
            * Width of the span after the edit.  A 0 here would represent a delete
            */
        newLength(): number;
        newSpan(): TextSpan;
        isUnchanged(): boolean;
        /**
            * Called to merge all the changes that occurred across several versions of a script snapshot
            * into a single change.  i.e. if a user keeps making successive edits to a script we will
            * have a text change from V1 to V2, V2 to V3, ..., Vn.
            *
            * This function will then merge those changes into a single change range valid between V1 and
            * Vn.
            */
        static collapseChangesAcrossMultipleVersions(changes: TextChangeRange[]): TextChangeRange;
    }
    interface ClassifiedSpan {
        textSpan: TextSpan;
        classificationType: string;
    }
    interface NavigationBarItem {
        text: string;
        kind: string;
        kindModifiers: string;
        spans: TextSpan[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }
    interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }
    interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }
    class TextChange {
        span: TextSpan;
        newText: string;
    }
    interface RenameLocation {
        textSpan: TextSpan;
        fileName: string;
    }
    interface ReferenceEntry {
        textSpan: TextSpan;
        fileName: string;
        isWriteAccess: boolean;
    }
    interface NavigateToItem {
        name: string;
        kind: string;
        kindModifiers: string;
        matchKind: string;
        fileName: string;
        textSpan: TextSpan;
        containerName: string;
        containerKind: string;
    }
    interface EditorOptions {
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
    }
    interface DefinitionInfo {
        fileName: string;
        textSpan: TextSpan;
        kind: string;
        name: string;
        containerKind: string;
        containerName: string;
    }
    enum SymbolDisplayPartKind {
        aliasName = 0,
        className = 1,
        enumName = 2,
        fieldName = 3,
        interfaceName = 4,
        keyword = 5,
        lineBreak = 6,
        numericLiteral = 7,
        stringLiteral = 8,
        localName = 9,
        methodName = 10,
        moduleName = 11,
        operator = 12,
        parameterName = 13,
        propertyName = 14,
        punctuation = 15,
        space = 16,
        text = 17,
        typeParameterName = 18,
        enumMemberName = 19,
        functionName = 20,
        regularExpressionLiteral = 21,
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface QuickInfo {
        kind: string;
        kindModifiers: string;
        textSpan: TextSpan;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface RenameInfo {
        canRename: boolean;
        localizedErrorMessage: string;
        displayName: string;
        fullDisplayName: string;
        kind: string;
        kindModifiers: string;
        triggerSpan: TextSpan;
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
    }
    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important
     * questions like 'what parameter is the user currently contained within?'.
     */
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
    }
    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    interface CompletionInfo {
        isMemberCompletion: boolean;
        entries: CompletionEntry[];
    }
    interface CompletionEntry {
        name: string;
        kind: string;
        kindModifiers: string;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: string;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
    }
    interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: TextSpan;
        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: TextSpan;
        /** The text to display in the editor for the collapsed region. */
        bannerText: string;
        /**
          * Whether or not this region should be automatically collapsed when
          * the 'Collapse to Definitions' command is invoked.
          */
        autoCollapse: boolean;
    }
    interface EmitOutput {
        outputFiles: OutputFile[];
        emitOutputStatus: EmitReturnStatus;
    }
    const enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2,
    }
    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
    const enum EndOfLineState {
        Start = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        StringLiteral = 7,
        RegExpLiteral = 8,
    }
    interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }
    interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }
    interface Classifier {
        getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): ClassificationResult;
    }
    interface DocumentRegistry {
        acquireDocument(filename: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, isOpen: boolean): SourceFile;
        updateDocument(sourceFile: SourceFile, filename: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, isOpen: boolean, textChangeRange: TextChangeRange): SourceFile;
        releaseDocument(filename: string, compilationSettings: CompilerOptions): void;
    }
    class ScriptElementKind {
        static unknown: string;
        static keyword: string;
        static scriptElement: string;
        static moduleElement: string;
        static classElement: string;
        static interfaceElement: string;
        static typeElement: string;
        static enumElement: string;
        static variableElement: string;
        static localVariableElement: string;
        static functionElement: string;
        static localFunctionElement: string;
        static memberFunctionElement: string;
        static memberGetAccessorElement: string;
        static memberSetAccessorElement: string;
        static memberVariableElement: string;
        static constructorImplementationElement: string;
        static callSignatureElement: string;
        static indexSignatureElement: string;
        static constructSignatureElement: string;
        static parameterElement: string;
        static typeParameterElement: string;
        static primitiveType: string;
        static label: string;
        static alias: string;
        static constElement: string;
        static letElement: string;
    }
    class ScriptElementKindModifier {
        static none: string;
        static publicMemberModifier: string;
        static privateMemberModifier: string;
        static protectedMemberModifier: string;
        static exportedModifier: string;
        static ambientModifier: string;
        static staticModifier: string;
    }
    class ClassificationTypeNames {
        static comment: string;
        static identifier: string;
        static keyword: string;
        static numericLiteral: string;
        static operator: string;
        static stringLiteral: string;
        static whiteSpace: string;
        static text: string;
        static punctuation: string;
        static className: string;
        static enumName: string;
        static interfaceName: string;
        static moduleName: string;
        static typeParameterName: string;
        static typeAlias: string;
    }
    interface DisplayPartsSymbolWriter extends SymbolWriter {
        displayParts(): SymbolDisplayPart[];
    }
    function displayPartsToString(displayParts: SymbolDisplayPart[]): string;
    function getDefaultCompilerOptions(): CompilerOptions;
    class OperationCanceledException {
    }
    class CancellationTokenObject {
        private cancellationToken;
        static None: CancellationTokenObject;
        constructor(cancellationToken: CancellationToken);
        isCancellationRequested(): boolean;
        throwIfCancellationRequested(): void;
    }
    function createDocumentRegistry(): DocumentRegistry;
    function preProcessFile(sourceText: string, readImportFiles?: boolean): PreProcessedFileInfo;
    function createLanguageService(host: LanguageServiceHost, documentRegistry: DocumentRegistry): LanguageService;
    function createClassifier(host: Logger): Classifier;
}
