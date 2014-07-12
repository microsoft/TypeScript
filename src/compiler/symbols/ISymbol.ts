///<reference path='..\Syntax\SyntaxNode.ts' />
///<reference path='Accessibility.ts' />
///<reference path='MethodKind.ts' />
///<reference path='IMemberSymbol.ts' />
///<reference path='ISymbolVisitor.ts' />
///<reference path='SymbolDisplay.ts' />
///<reference path='SymbolDisplay.Format.ts' />
///<reference path='SymbolKind.ts' />
///<reference path='TypeKind.ts' />

interface ISymbol {
    kind(): SymbolKind;

    /**
     * Gets the symbol name. Returns the empty string if unnamed.
     */
    name(): string;

    /**
     * Gets the immediately containing symbol.
     */
    containingSymbol(): ISymbol;

    /**
     * Gets the containing type. Returns null if the symbol is not contained within a type.
     */
    containingType(): IObjectTypeSymbol;

    /**
     * Gets the nearest enclosing module. Returns null if the symbol isn't contained in a module.
     */
    containingModule(): IModuleSymbol;

    locations(): ILocation[];

    // True if this symbol is a definition.  False if it not (i.e. it is a constructed generic
    // symbol).
    isDefinition(): boolean;

    /**
     * Gets the the original definition of the symbol. If this symbol is derived from another symbol,
     * by type substitution for instance, this gets the original symbol, as it was defined in source.
     */
    originalDefinition(): ISymbol;

    // True if this symbol was automatically generated based on the absense of the normal construct
    // that would usually cause it to be created.  For example, a class with no 'constructor' 
    // node will still have a symbol for the constructor synthesized.  
    isImplicitlyDeclared(): boolean;

    // Returns true if this symbol can be referenced by its name in code.
    canBeReferencedByName(): boolean;

    accessibility(): Accessibility;

    accept(visitor: ISymbolVisitor): any;

    toSymbolDisplayParts(format: SymbolDisplay.Format): SymbolDisplay.Part[];

    isStatic(): boolean;

    isType(): boolean;
    isSignature(): boolean;
    isMember(): boolean;
    isPrimitiveType(): boolean;
    isObjectType(): boolean;
    isArrayType(): boolean;
}

/// Represents any symbol that has type parameters.
interface IGenericSymbol extends ISymbol {
    /**
     * Returns the type parameters that this type has. If this is a non-generic type,
     * returns an empty ReadOnlyArray.  
     */
    typeParameters(): ITypeParameterSymbol[];

    /**
     * Returns the type arguments that have been substituted for the type parameters. 
     * If nothing has been substituted for a give type parameters,
     * then the type parameter itself is consider the type argument.
     */
    typeArguments(): ITypeSymbol[];

    /**
     * Get the original definition of this type symbol. If this symbol is derived from another
     * symbol by (say) type substitution, this gets the original symbol, as it was defined in
     * source.
     */
    originalDefinition(): IGenericSymbol;
}

/**
 * Represents a parameter of a method or property.
 */
interface IParameterSymbol extends ISymbol {
    /**
     * Returns true if the parameter was declared as a parameter array. 
     */
    isRest(): boolean;

    /**
     * Returns true if the parameter is optional.
     */
    isOptional(): boolean;

    /**
     * Gets the type of the parameter.
     */
    type(): ITypeSymbol;

    /**
     * Gets the ordinal position of the parameter. The first parameter has ordinal zero.
     */
    ordinal(): number;

    /**
     * Returns true if the parameter specifies a default value to be passed
     * when no value is provided as an argument to a call. The default value
     * can be obtained with the DefaultValue property.
     */
    hasValue(): boolean;

    /**
     * Returns the default value of the parameter. 
     */
    value(): any;

    /// The associated variable if this parameter caused a field to be generated.
    associatedVariable(): IVariableSymbol;
}

/// Represents any symbol that takes parameters.
interface IParameterizedSymbol extends ISymbol {
    parameters(): IParameterSymbol[];
}

interface IModuleOrTypeSymbol extends ISymbol {
}

interface IModuleSymbol extends IMemberSymbol, IModuleOrTypeSymbol {
    isGlobalModule(): boolean;

    memberCount(): number;
    memberAt(index: number): IMemberSymbol;
}