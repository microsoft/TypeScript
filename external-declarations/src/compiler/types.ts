import { Symbol, ClassDeclaration, CompilerOptions, DeclarationName, DiagnosticWithLocation, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, ModuleDeclaration, ModuleKind, Node, PackageJsonInfoCache, Path, QualifiedName, SourceFile, SymbolFlags, TransformationContext as _TransformationContext, TypeAliasDeclaration, VariableStatement, NodeBuilderFlags, Statement, AccessorDeclaration, BindingElement, Declaration, ElementAccessExpression, EntityName, EntityNameOrEntityNameExpression, EnumMember, ExportDeclaration, Expression, Identifier, ImportCall, ImportDeclaration, ImportEqualsDeclaration, ImportTypeNode, ParameterDeclaration, PropertyAccessExpression, PropertyDeclaration, PropertySignature, SignatureDeclaration, StringLiteralLike, TypeNode, VariableDeclaration, VariableLikeDeclaration, ModuleBlock, LiteralTypeNode, BinaryExpression, ComputedPropertyName, NamedDeclaration, StringLiteral, ParenthesizedExpression, AsExpression, NonNullExpression, PartiallyEmittedExpression, SatisfiesExpression, TypeAssertion, EntityNameExpression, HasModifiers, Modifier, ModifierFlags, Program, UnparsedSource, FileReference, EmitFlags, EmitHelper, SourceMapRange, SynthesizedComment, TextRange, NoSubstitutionTemplateLiteral, MapLike } from "typescript";
import { AllAccessorDeclarations, AnyImportSyntax, DiagnosticMessage } from "./utils";


/** @internal */
export interface ResolveModuleNameResolutionHost {
    getCanonicalFileName(p: string): string;
    getCommonSourceDirectory(): string;
    getCurrentDirectory(): string;
}


export interface TransformationContext extends _TransformationContext {
    addDiagnostic(diag: DiagnosticWithLocation): void;
    /** @internal */ getEmitResolver(): EmitResolver;
    /** @internal */ getEmitHost(): EmitHost;
    /** @internal */ getEmitHelperFactory(): EmitHelperFactory;
    factory: _TransformationContext['factory'] & {
        updateModifiers<T extends HasModifiers>(node: T, modifiers: readonly Modifier[] | ModifierFlags | undefined): T;
    }
}

export interface EmitHost extends ModuleSpecifierResolutionHost, ResolveModuleNameResolutionHost {
    getCommonSourceDirectory(): string 
    getCompilerOptions(): CompilerOptions
    getSourceFiles(): SourceFile[]
    /** @internal */ getSourceFileFromReference(referencingFile: SourceFile | UnparsedSource, ref: FileReference): SourceFile | undefined;
    /** @internal */ getLibFileFromReference(ref: FileReference): SourceFile | undefined;
}

export interface EmitResolver {
    hasGlobalName(name: string): boolean;
    getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile | ModuleDeclaration | EnumDeclaration | undefined;
    getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
    getReferencedDeclarationWithCollidingName(node: Identifier): Declaration | undefined;
    isDeclarationWithCollidingName(node: Declaration): boolean;
    isValueAliasDeclaration(node: Node): boolean;
    isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
    isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
    // getNodeCheckFlags(node: Node): NodeCheckFlags;
    isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    isLateBound(node: Declaration): node is LateBoundDeclaration;
    collectLinkedAliases(node: Identifier, setVisibility?: boolean): Node[] | undefined;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    isRequiredInitializedParameter(node: ParameterDeclaration): boolean;
    isOptionalUninitializedParameterProperty(node: ParameterDeclaration): boolean;
    isExpandoFunctionDeclaration(node: FunctionDeclaration): boolean;
    getPropertiesOfContainerFunction(node: Declaration): Symbol[];
    createTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration | PropertyAccessExpression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker, addUndefined?: boolean): TypeNode | undefined;
    createReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
    isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags | undefined, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
    // Returns the constant value this property access resolves to, or 'undefined' for a non-constant
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    getReferencedValueDeclaration(reference: Identifier): Declaration | undefined;
    // getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
    isOptionalParameter(node: ParameterDeclaration): boolean;
    moduleExportsSomeValue(moduleReferenceExpression: Expression): boolean;
    isArgumentsLocalBinding(node: Identifier): boolean;
    getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode | ImportCall): SourceFile | undefined;
    getTypeReferenceDirectivesForEntityName(name: EntityNameOrEntityNameExpression): [specifier: string, mode: ResolutionMode | undefined][] | undefined;
    getTypeReferenceDirectivesForSymbol(symbol: Symbol, meaning?: SymbolFlags): [specifier: string, mode: ResolutionMode | undefined][] | undefined;
    isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
    getJsxFactoryEntity(location?: Node): EntityName | undefined;
    getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
    getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
    getSymbolOfExternalModuleSpecifier(node: StringLiteralLike): Symbol | undefined;
    isBindingCapturedByNode(node: Node, decl: VariableDeclaration | BindingElement): boolean;
    getDeclarationStatementsForSourceFile(node: SourceFile, flags: NodeBuilderFlags, tracker: SymbolTracker, bundled?: boolean): Statement[] | undefined;
    isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
}
/** @internal */
export interface AmbientModuleDeclaration extends ModuleDeclaration {
    readonly body?: ModuleBlock;
}

export interface EmitHelperFactory {

}

export type GetSymbolAccessibilityDiagnostic = (symbolAccessibilityResult: SymbolAccessibilityResult) => (SymbolAccessibilityDiagnostic | undefined);

/** @internal */
export interface SymbolAccessibilityDiagnostic {
    errorNode: Node;
    diagnosticMessage: DiagnosticMessage;
    typeName?: DeclarationName | QualifiedName;
}

export interface SymbolTracker {
    // Called when the symbol writer encounters a symbol to write.  Currently only used by the
    // declaration emitter to help determine if it should patch up the final declaration file
    // with import statements it previously saw (but chose not to emit).
    trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): boolean;
    reportInaccessibleThisError?(): void;
    reportPrivateInBaseOfClassExpression?(propertyName: string): void;
    reportInaccessibleUniqueSymbolError?(): void;
    reportCyclicStructureError?(): void;
    reportLikelyUnsafeImportRequiredError?(specifier: string): void;
    reportTruncationError?(): void;
    moduleResolverHost?: ModuleSpecifierResolutionHost & { getCommonSourceDirectory(): string };
    trackReferencedAmbientModule?(decl: ModuleDeclaration, symbol: Symbol): void;
    trackExternalModuleSymbolOfImportTypeNode?(symbol: Symbol): void;
    reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
    reportNonSerializableProperty?(propertyName: string): void;
    reportImportTypeNodeResolutionModeOverride?(): void;
}

/** @internal */
export interface ModuleSpecifierResolutionHost {
    useCaseSensitiveFileNames?(): boolean;
    fileExists(path: string): boolean;
    getCurrentDirectory(): string;
    directoryExists?(path: string): boolean;
    readFile?(path: string): string | undefined;
    realpath?(path: string): string;
    getPackageJsonInfoCache?(): PackageJsonInfoCache & {
        /** @internal */ getPackageJsonInfo(packageJsonPath: string): PackageJsonInfo | boolean | undefined;
    } | undefined;
    getGlobalTypingsCacheLocation?(): string | undefined;
    getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;

    getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    
    getSymlinkCache?(): {
        getSymlinkedDirectoriesByRealpath(): MultiMap<Path, string> | undefined;
    };
    readonly redirectTargetsMap: RedirectTargetsMap;
}

export interface PackageJsonInfo {
    packageDirectory: string;
    contents: PackageJsonInfoContents;
}
/** @internal */
export interface PackageJsonInfoContents {
    packageJsonContent: PackageJsonPathFields;
    versionPaths: VersionPaths | undefined;
    /** false: resolved to nothing. undefined: not yet resolved */
    resolvedEntrypoints: string[] | false | undefined;
}
/** @internal */
export interface VersionPaths {
    version: string;
    paths: MapLike<string[]>;
}
export interface PackageJsonPathFields {
    typings?: string;
    types?: string;
    typesVersions?: MapLike<MapLike<string[]>>;
    main?: string;
    tsconfig?: string;
    type?: string;
    imports?: object;
    exports?: object;
    name?: string;
}


export type RedirectTargetsMap = ReadonlyMap<Path, readonly string[]>;

export interface MultiMap<K, V> extends Map<K, V[]> {
    /**
     * Adds the value to an array of values associated with the key, and returns the array.
     * Creates the array if it does not already exist.
     */
    add(key: K, value: V): V[];
    /**
     * Removes a value from an array of values associated with the key.
     * Does not preserve the order of those values.
     * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
     */
    remove(key: K, value: V): void;
}


/** @internal */
export interface SymbolAccessibilityResult extends SymbolVisibilityResult {
    errorModuleName?: string; // If the symbol is not visible from module, module's name
}
/** @internal */
export interface SymbolVisibilityResult {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: LateVisibilityPaintedStatement[]; // aliases that need to have this symbol visible
    errorSymbolName?: string; // Optional symbol name that results in error
    errorNode?: Node; // optional node that results in error
}


/** @internal */
export const enum SymbolAccessibility {
    Accessible,
    NotAccessible,
    CannotBeNamed
}

/** @internal */
export type LateVisibilityPaintedStatement =
    | AnyImportSyntax
    | VariableStatement
    | ClassDeclaration
    | FunctionDeclaration
    | ModuleDeclaration
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | EnumDeclaration;


/** @internal */
export type NodeId = number;

export type ResolutionMode = ModuleKind.ESNext | ModuleKind.CommonJS | undefined;


/** @internal */
export type GetCanonicalFileName = (fileName: string) => string;



/** @internal */
export const enum CharacterCodes {
    nullCharacter = 0,
    maxAsciiCharacter = 0x7F,

    lineFeed = 0x0A,              // \n
    carriageReturn = 0x0D,        // \r
    lineSeparator = 0x2028,
    paragraphSeparator = 0x2029,
    nextLine = 0x0085,

    // Unicode 3.0 space characters
    space = 0x0020,   // " "
    nonBreakingSpace = 0x00A0,   //
    enQuad = 0x2000,
    emQuad = 0x2001,
    enSpace = 0x2002,
    emSpace = 0x2003,
    threePerEmSpace = 0x2004,
    fourPerEmSpace = 0x2005,
    sixPerEmSpace = 0x2006,
    figureSpace = 0x2007,
    punctuationSpace = 0x2008,
    thinSpace = 0x2009,
    hairSpace = 0x200A,
    zeroWidthSpace = 0x200B,
    narrowNoBreakSpace = 0x202F,
    ideographicSpace = 0x3000,
    mathematicalSpace = 0x205F,
    ogham = 0x1680,

    _ = 0x5F,
    $ = 0x24,

    _0 = 0x30,
    _1 = 0x31,
    _2 = 0x32,
    _3 = 0x33,
    _4 = 0x34,
    _5 = 0x35,
    _6 = 0x36,
    _7 = 0x37,
    _8 = 0x38,
    _9 = 0x39,

    a = 0x61,
    b = 0x62,
    c = 0x63,
    d = 0x64,
    e = 0x65,
    f = 0x66,
    g = 0x67,
    h = 0x68,
    i = 0x69,
    j = 0x6A,
    k = 0x6B,
    l = 0x6C,
    m = 0x6D,
    n = 0x6E,
    o = 0x6F,
    p = 0x70,
    q = 0x71,
    r = 0x72,
    s = 0x73,
    t = 0x74,
    u = 0x75,
    v = 0x76,
    w = 0x77,
    x = 0x78,
    y = 0x79,
    z = 0x7A,

    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
    Q = 0x51,
    R = 0x52,
    S = 0x53,
    T = 0x54,
    U = 0x55,
    V = 0x56,
    W = 0x57,
    X = 0x58,
    Y = 0x59,
    Z = 0x5a,

    ampersand = 0x26,             // &
    asterisk = 0x2A,              // *
    at = 0x40,                    // @
    backslash = 0x5C,             // \
    backtick = 0x60,              // `
    bar = 0x7C,                   // |
    caret = 0x5E,                 // ^
    closeBrace = 0x7D,            // }
    closeBracket = 0x5D,          // ]
    closeParen = 0x29,            // )
    colon = 0x3A,                 // :
    comma = 0x2C,                 // ,
    dot = 0x2E,                   // .
    doubleQuote = 0x22,           // "
    equals = 0x3D,                // =
    exclamation = 0x21,           // !
    greaterThan = 0x3E,           // >
    hash = 0x23,                  // #
    lessThan = 0x3C,              // <
    minus = 0x2D,                 // -
    openBrace = 0x7B,             // {
    openBracket = 0x5B,           // [
    openParen = 0x28,             // (
    percent = 0x25,               // %
    plus = 0x2B,                  // +
    question = 0x3F,              // ?
    semicolon = 0x3B,             // ;
    singleQuote = 0x27,           // '
    slash = 0x2F,                 // /
    tilde = 0x7E,                 // ~

    backspace = 0x08,             // \b
    formFeed = 0x0C,              // \f
    byteOrderMark = 0xFEFF,
    tab = 0x09,                   // \t
    verticalTab = 0x0B,           // \v
}


/** @internal */
export type LiteralImportTypeNode = ImportTypeNode & { readonly argument: LiteralTypeNode & { readonly literal: StringLiteral } };


/** @internal */
export interface DynamicNamedDeclaration extends NamedDeclaration {
    readonly name: ComputedPropertyName;
}

/** @internal */
export interface DynamicNamedBinaryExpression extends BinaryExpression {
    readonly left: ElementAccessExpression;
}


/** @internal */
export interface JSDocTypeAssertion extends ParenthesizedExpression {
    readonly _jsDocTypeAssertionBrand: never;
}

export type OuterExpression = ParenthesizedExpression | TypeAssertion | SatisfiesExpression | AsExpression | NonNullExpression | PartiallyEmittedExpression;

/** @internal */
export type AnyImportOrReExport = AnyImportSyntax | ExportDeclaration;


/** @internal */
// A declaration that supports late-binding (used in checker)
export interface LateBoundDeclaration extends DynamicNamedDeclaration {
    readonly name: LateBoundName;
}

/** @internal */
// A name that supports late-binding (used in checker)
export interface LateBoundName extends ComputedPropertyName {
    readonly expression: EntityNameExpression;
}


/** @internal */
export interface EmitFileNames {
    jsFilePath?: string | undefined;
    sourceMapFilePath?: string | undefined;
    declarationFilePath?: string | undefined;
    declarationMapPath?: string | undefined;
    buildInfoPath?: string | undefined;
}

export type _FileReference = FileReference


/** @internal */
export type ExportedModulesFromDeclarationEmit = readonly Symbol[];
export type _StringLiteralLike = StringLiteralLike


export type _Symbol = Symbol
export type _Path = Path
export type _ModifierFlags = ModifierFlags
declare module 'typescript' {
    interface Node {
        symbol: _Symbol;
        emitNode?: EmitNode;
        original: this;
        modifierFlagsCache: _ModifierFlags
    }
    interface Symbol {
        isReferenced: boolean;
        parent: _Symbol;
    }
    interface Bundle {
        /** @internal */ syntheticFileReferences?: readonly _FileReference[];
        /** @internal */ syntheticTypeReferences?: readonly _FileReference[];
        /** @internal */ syntheticLibReferences?: readonly _FileReference[];
        /** @internal */ hasNoDefaultLib?: boolean;
    }
    interface SourceFile {
        exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
        imports: readonly _StringLiteralLike[];
        path: _Path;
    }
    interface CompilerOptions {
        /**
         * The directory of the config file that specified 'paths'. Used to resolve relative paths when 'baseUrl' is absent.
         *
         * @internal
         */
        pathsBasePath?: string;
        configFilePath?: _Path;
    }
}


/** @internal */
export interface EmitNode {
    annotatedNodes?: Node[];                 // Tracks Parse-tree nodes with EmitNodes for eventual cleanup.
    flags: EmitFlags;                        // Flags that customize emit
    leadingComments?: SynthesizedComment[];  // Synthesized leading comments
    trailingComments?: SynthesizedComment[]; // Synthesized trailing comments
    commentRange?: TextRange;                // The text range to use when emitting leading or trailing comments
    sourceMapRange?: SourceMapRange;         // The text range to use when emitting leading or trailing source mappings
    tokenSourceMapRanges?: (SourceMapRange | undefined)[]; // The text range to use when emitting source mappings for tokens
    constantValue?: string | number;         // The constant value of an expression
    externalHelpersModuleName?: Identifier;  // The local name for an imported helpers module
    externalHelpers?: boolean;
    helpers?: EmitHelper[];                  // Emit helpers for the node
    startsOnNewLine?: boolean;               // If the node should begin on a new line
    snippetElement?: SnippetElement;         // Snippet element of the node
    typeNode?: TypeNode;                         // VariableDeclaration type
}

/** @internal */
export type SnippetElement = TabStop | Placeholder;

/** @internal */
export interface TabStop {
    kind: SnippetKind.TabStop;
    order: number;
}

/** @internal */
export interface Placeholder {
    kind: SnippetKind.Placeholder;
    order: number;
}
// Reference: https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax
/** @internal */
export const enum SnippetKind {
    TabStop,                                // `$1`, `$2`
    Placeholder,                            // `${1:foo}`
    Choice,                                 // `${1|one,two,three|}`
    Variable,                               // `$name`, `${name:default}`
}



/** @internal */
export interface ModulePath {
    path: string;
    isInNodeModules: boolean;
    isRedirect: boolean;
}