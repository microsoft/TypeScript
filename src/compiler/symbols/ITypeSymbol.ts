///<reference path='ISymbol.ts' />
///<reference path='ISignatureSymbol.ts' />

interface ITypeSymbol extends IModuleOrTypeSymbol {
    /**
     * An enumerated value that identifies what kind of type this is.
     */
    typeKind(): TypeKind;

    /**
     * The declared base type of this type, or null.
     */
    baseType(): IClassTypeSymbol;

    /**
     * Gets the set of interfaces that this type directly implements. This set does not include
     * interfaces that are base interfaces of directly implemented interfaces.
     */
    interfaces(): IInterfaceTypeSymbol[];

    /**
     * The list of all interfaces of which this type is a declared subtype, excluding this type
     * itself. This includes all declared base interfaces, all declared base interfaces of base
     * types, and all declared base interfaces of those results (recursively).  This also is the effective
     * interface set of a type parameter. Each result
     * appears exactly once in the list. This list is topologically sorted by the inheritance
     * relationship: if interface type A extends interface type B, then A precedes B in the
     * list.
     */
    allInterfaces(): IInterfaceTypeSymbol[];

    originalDefinition(): ITypeSymbol;

    // isSubTypeOf(type: ITypeSymbol): boolean;
    // isSuperTypeOf(type: ITypeSymbol): boolean;
    // isIdenticalTo(type: ITypeSymbol): boolean;
    // isAssignableTo(type: ITypeSymbol): boolean;
    // isAssignableFrom(type: ITypeSymbol): boolean;
}

interface IAnyTypeSymbol extends ITypeSymbol {
}

interface IPrimitiveTypeSymbol extends ITypeSymbol {
}

interface INumberTypeSymbol extends IPrimitiveTypeSymbol {
}

interface IBooleanTypeSymbol extends IPrimitiveTypeSymbol {
}

interface IStringTypeSymbol extends IPrimitiveTypeSymbol {
}

interface IVoidTypeSymbol extends IPrimitiveTypeSymbol {
}

interface INullTypeSymbol extends IPrimitiveTypeSymbol {
}

interface IUndefinedTypeSymbol extends IPrimitiveTypeSymbol {
}

interface IObjectTypeSymbol extends ITypeSymbol {
    /// An object type containing call signatures is said to be a function type.
    isFunctionType(): boolean;

    /// A type containing construct signatures is said to be a constructor type.
    isConstructorType(): boolean;
}

interface IClassTypeSymbol extends IMemberSymbol, IObjectTypeSymbol, IGenericSymbol {
    memberCount(): number;
    memberAt(index: number): IMemberSymbol;

    /**
     * Get the original definition of this type symbol. If this symbol is derived from another
     * symbol by (say) type substitution, this gets the original symbol, as it was defined in
     * source.
     */
    originalDefinition(): IClassTypeSymbol;

    /**
     * Get the constructor for this type.
     */
    constructorSymbol(): IConstructorSymbol;
}

interface IInterfaceTypeSymbol extends IMemberSymbol, IObjectTypeSymbol, IGenericSymbol {
    signatureCount(): number;
    signatureAt(index: number): ISignatureSymbol;

    /**
     * Get the original definition of this type symbol. If this symbol is derived from another
     * symbol by (say) type substitution, this gets the original symbol, as it was defined in
     * source.
     */
    originalDefinition(): IInterfaceTypeSymbol;
}

interface IAnonymousTypeSymbol extends IObjectTypeSymbol {
    signatureCount(): number;
    signatureAt(index: number): ISignatureSymbol;
}

interface IEnumTypeSymbol extends IMemberSymbol, IObjectTypeSymbol {
    variableCount(): number;
    variableAt(index: number): IVariableSymbol;
}

interface ITypeParameterSymbol extends ITypeSymbol {
    /**
     * The ordinal position of the type parameter in the parameter list which declares
     * it. The first type parameter has ordinal zero.
     */
    ordinal(): number;

    /**
     * The type that were directly specified as a constraint on the type parameter.
     */
    constraintType(): ITypeSymbol;
}