import {
    __String,
    BaseType,
    Debug,
    Declaration,
    DestructuringPattern,
    getLineAndCharacterOfPosition,
    getObjectFlags,
    identity,
    IndexKind,
    IndexType,
    InterfaceType,
    IntersectionType,
    isThisTypeParameter,
    JSDocSignature,
    LineAndCharacter,
    LiteralType,
    Node,
    NumberLiteralType,
    ObjectFlags,
    ObjectType,
    ServicesForwardRefArray,
    Signature,
    SignatureDeclaration,
    SignatureFlags,
    SignatureKind,
    SourceMapSource,
    StringLiteralType,
    Symbol,
    SymbolFlags,
    SymbolLinks,
    symbolName,
    SymbolTable,
    Type,
    TypeChecker,
    TypeFlags,
    TypeMapper,
    TypeParameter,
    TypePredicate,
    TypeReference,
    UnionOrIntersectionType,
    UnionType,
} from "./_namespaces/ts";

/** @internal */
export class SymbolObject implements Symbol {
    flags: SymbolFlags = 0;
    escapedName: __String = "" as __String;
    declarations: Declaration[] | undefined = undefined;
    valueDeclaration: Declaration | undefined = undefined;
    id = 0;
    mergeId = 0;
    parent: Symbol | undefined = undefined;
    members: SymbolTable | undefined = undefined;
    exports: SymbolTable | undefined = undefined;
    exportSymbol: Symbol | undefined = undefined;
    constEnumOnlyModule: boolean | undefined = undefined;
    isReferenced: SymbolFlags | undefined = undefined;
    lastAssignmentPos: number | undefined = undefined;
    links: SymbolLinks | undefined = undefined; // used by TransientSymbol

    // TODO: Review these for polymorphism:
    declare isReplaceableByMethod?: boolean | undefined;
    declare assignmentDeclarationMembers?: Map<number, Declaration> | undefined;
    declare globalExports?: SymbolTable | undefined;

    // TODO: Added by services, review for migration/polymorphism:
    // documentationComment?: SymbolDisplayPart[];
    // tags?: JSDocTagInfo[]; // same
    // contextualGetAccessorDocumentationComment?: SymbolDisplayPart[];
    // contextualSetAccessorDocumentationComment?: SymbolDisplayPart[];
    // contextualGetAccessorTags?: JSDocTagInfo[];
    // contextualSetAccessorTags?: JSDocTagInfo[];

    constructor(flags: SymbolFlags, name: __String) {
        this.flags = flags;
        this.escapedName = name;
    }

    getFlags(): SymbolFlags {
        return this.flags;
    }

    get name(): string {
        return symbolName(this);
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

    getDocumentationComment(_checker: TypeChecker | undefined): ServicesForwardRefArray<"SymbolDisplayPart"> {
        throw new TypeError("Not supported");
    }

    getContextualDocumentationComment(_context: Node | undefined, _checker: TypeChecker | undefined): ServicesForwardRefArray<"SymbolDisplayPart"> {
        throw new TypeError("Not supported");
    }

    getJsDocTags(_checker?: TypeChecker): ServicesForwardRefArray<"JSDocTagInfo"> {
        throw new TypeError("Not supported");
    }

    getContextualJsDocTags(_context: Node | undefined, _checker: TypeChecker | undefined): ServicesForwardRefArray<"JSDocTagInfo"> {
        throw new TypeError("Not supported");
    }
}

/** @internal */
export class TypeObject implements Type {
    flags: TypeFlags;
    checker: TypeChecker;

    // TODO: Review for polymorphism
    declare id: number;
    declare symbol: Symbol;
    declare pattern?: DestructuringPattern | undefined;
    declare aliasSymbol?: Symbol | undefined;
    declare aliasTypeArguments?: readonly Type[] | undefined;
    declare permissiveInstantiation?: Type | undefined;
    declare restrictiveInstantiation?: Type | undefined;
    declare uniqueLiteralFilledInstantiation?: Type | undefined;
    declare immediateBaseConstraint?: Type | undefined;
    declare widened?: Type | undefined;

    constructor(checker: TypeChecker, flags: TypeFlags) {
        this.flags = flags;
        this.checker = checker;
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

    getCallSignatures(): readonly Signature[] {
        return this.checker.getSignaturesOfType(this, SignatureKind.Call);
    }

    getConstructSignatures(): readonly Signature[] {
        return this.checker.getSignaturesOfType(this, SignatureKind.Construct);
    }

    getStringIndexType(): Type | undefined {
        return this.checker.getIndexTypeOfType(this, IndexKind.String);
    }

    getNumberIndexType(): Type | undefined {
        return this.checker.getIndexTypeOfType(this, IndexKind.Number);
    }

    getBaseTypes(): BaseType[] | undefined {
        return this.isClassOrInterface() ? this.checker.getBaseTypes(this) : undefined;
    }

    isNullableType(): boolean {
        return this.checker.isNullableType(this);
    }

    getNonNullableType(): Type {
        return this.checker.getNonNullableType(this);
    }

    getNonOptionalType(): Type {
        return this.checker.getNonOptionalType(this);
    }

    getConstraint(): Type | undefined {
        return this.checker.getBaseConstraintOfType(this);
    }

    getDefault(): Type | undefined {
        return this.checker.getDefaultFromTypeParameter(this);
    }

    isUnion(): this is UnionType {
        return !!(this.flags & TypeFlags.Union);
    }

    isIntersection(): this is IntersectionType {
        return !!(this.flags & TypeFlags.Intersection);
    }

    isUnionOrIntersection(): this is UnionOrIntersectionType {
        return !!(this.flags & TypeFlags.UnionOrIntersection);
    }

    isLiteral(): this is LiteralType {
        return !!(this.flags & (TypeFlags.StringLiteral | TypeFlags.NumberLiteral | TypeFlags.BigIntLiteral));
    }

    isStringLiteral(): this is StringLiteralType {
        return !!(this.flags & TypeFlags.StringLiteral);
    }

    isNumberLiteral(): this is NumberLiteralType {
        return !!(this.flags & TypeFlags.NumberLiteral);
    }

    isTypeParameter(): this is TypeParameter {
        return !!(this.flags & TypeFlags.TypeParameter);
    }

    isClassOrInterface(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.ClassOrInterface);
    }

    isClass(): this is InterfaceType {
        return !!(getObjectFlags(this) & ObjectFlags.Class);
    }

    isIndexType(): this is IndexType {
        return isIndexType(this);
    }

    /**
     * This polyfills `referenceType.typeArguments` for API consumers
     */
    get typeArguments() {
        if (getObjectFlags(this) & ObjectFlags.Reference) {
            return this.checker.getTypeArguments(this as Type as TypeReference);
        }
        return undefined;
    }
}

/** @internal */
export class SignatureObject implements Signature {
    flags: SignatureFlags;
    checker: TypeChecker;

    // TODO: Review for polymorphism:
    declare declaration?: JSDocSignature | SignatureDeclaration | undefined;
    declare typeParameters?: readonly TypeParameter[] | undefined;
    declare parameters: readonly Symbol[];
    declare thisParameter?: Symbol | undefined;
    declare resolvedReturnType?: Type | undefined;
    declare resolvedTypePredicate?: TypePredicate | undefined;
    declare minArgumentCount: number;
    declare resolvedMinArgumentCount?: number | undefined;
    declare target?: Signature | undefined;
    declare mapper?: TypeMapper | undefined;
    declare compositeSignatures?: Signature[] | undefined;
    declare compositeKind?: TypeFlags | undefined;
    declare erasedSignatureCache?: Signature | undefined;
    declare canonicalSignatureCache?: Signature | undefined;
    declare baseSignatureCache?: Signature | undefined;
    declare optionalCallSignatureCache?: { inner?: Signature | undefined; outer?: Signature | undefined; } | undefined;
    declare isolatedSignatureType?: ObjectType | undefined;
    declare instantiations?: Map<string, Signature> | undefined;

    // TODO: Added by services, review for migration/polymorhpism:
    // documentationComment?: SymbolDisplayPart[];
    // jsDocTags?: JSDocTagInfo[]; // same

    constructor(checker: TypeChecker, flags: SignatureFlags) {
        // TODO: stabilize map
        this.flags = flags;
        this.checker = checker;
    }

    getDeclaration(): JSDocSignature | SignatureDeclaration {
        return this.declaration ?? Debug.fail();
    }

    getTypeParameters(): readonly TypeParameter[] | undefined {
        return this.typeParameters;
    }

    getParameters(): readonly Symbol[] {
        return this.parameters;
    }

    getReturnType(): Type {
        return this.checker.getReturnTypeOfSignature(this);
    }

    getTypeParameterAtPosition(pos: number): Type {
        const type = this.checker.getParameterType(this, pos);
        if (isIndexType(type) && isThisTypeParameter(type.type)) {
            const constraint = type.type.checker.getBaseConstraintOfType(type.type);
            if (constraint) {
                return this.checker.getIndexType(constraint);
            }
        }
        return type;
    }

    getDocumentationComment(): ServicesForwardRefArray<"SymbolDisplayPart"> {
        throw new TypeError("Not implemented");
    }

    getJsDocTags(): ServicesForwardRefArray<"JSDocTagInfo"> {
        throw new TypeError("Not implemented");
    }
}

/** @internal */
export class SourceMapSourceObject implements SourceMapSource {
    fileName: string;
    text: string;
    skipTrivia: ((pos: number) => number);

    // TODO: Review for polymorphism:
    declare lineMap: readonly number[];

    constructor(fileName: string, text: string, skipTrivia: (pos: number) => number = identity) {
        this.fileName = fileName;
        this.text = text;
        this.skipTrivia = skipTrivia;
    }

    public getLineAndCharacterOfPosition(pos: number): LineAndCharacter {
        return getLineAndCharacterOfPosition(this, pos);
    }
}

function isIndexType(type: Type): type is IndexType {
    return !!(type.flags & TypeFlags.Index);
}
