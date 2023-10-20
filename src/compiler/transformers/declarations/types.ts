import {
    AccessorDeclaration,
    AllAccessorDeclarations,
    AnyImportSyntax,
    CompilerOptions,
    ComputedPropertyName,
    Declaration,
    ElementAccessExpression,
    EntityNameOrEntityNameExpression,
    EnumMember,
    Expression,
    FileReference,
    FunctionDeclaration,
    ImportDeclaration,
    LateBoundDeclaration,
    ModuleResolutionHost,
    Node,
    ParameterDeclaration,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertySignature,
    RedirectTargetsMap,
    ResolutionMode,
    SignatureDeclaration,
    SourceFile,
    StringLiteralLike,
    Symbol,
    SymbolTracker,
    SymbolVisibilityResult,
    VariableDeclaration,
} from "../../_namespaces/ts";

/** @internal */
export interface IsolatedEmitHost extends ModuleResolutionHost {
    readonly redirectTargetsMap: RedirectTargetsMap;
    getCommonSourceDirectory(): string;
    getCompilerOptions(): CompilerOptions;
    getSourceFiles(): SourceFile[];
    getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined;
    getLibFileFromReference(ref: FileReference): SourceFile | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getCanonicalFileName(p: string): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames?(): boolean;
}

/** @internal */
export type MemberKey = string & {
    __memberKey: void;
};

/** @internal */
export interface IsolatedEmitResolver {
    isLiteralComputedName(node: ComputedPropertyName): boolean;
    isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    isLateBound(node: Declaration): node is LateBoundDeclaration;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    isExpandoFunction(node: VariableDeclaration | FunctionDeclaration): boolean;
    createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
    isOptionalParameter(node: ParameterDeclaration): boolean;
    getTypeReferenceDirectivesForEntityName(name: EntityNameOrEntityNameExpression): [specifier: string, mode: ResolutionMode | undefined][] | undefined;
    isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
    getSymbolOfExternalModuleSpecifier(node: StringLiteralLike): Symbol | undefined;
    isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
}
