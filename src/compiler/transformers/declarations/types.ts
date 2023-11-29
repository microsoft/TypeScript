import {
    AccessorDeclaration,
    AllAccessorDeclarations,
    AnyImportSyntax,
    ComputedPropertyName,
    Declaration,
    ElementAccessExpression,
    EntityNameOrEntityNameExpression,
    EnumMember,
    Expression,
    FunctionDeclaration,
    ImportDeclaration,
    LateBoundDeclaration,
    Node,
    ParameterDeclaration,
    PropertyAccessExpression,
    PropertyDeclaration,
    PropertySignature,
    ResolutionMode,
    SignatureDeclaration,
    StringLiteralLike,
    Symbol,
    SymbolTracker,
    SymbolVisibilityResult,
    VariableDeclaration,
} from "../../_namespaces/ts";

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
    tryFindAmbientModule(moduleReferenceExpression: Expression): Symbol | undefined;
    getPropertiesOfContainerFunction(node: FunctionDeclaration | VariableDeclaration): Symbol[]
}
