///<reference path='ISymbol.ts' />
///<reference path='ITypeSymbol.ts' />

interface IMemberSymbol extends ISymbol {
}

interface IConstructorSymbol extends IMemberSymbol, IParameterizedSymbol {
}

interface IFunctionSymbol extends IMemberSymbol, IParameterizedSymbol, IGenericSymbol {
    returnType(): ITypeSymbol;
}

/**
 * Represents a variable in a class, module or enum.
 */
interface IVariableSymbol extends IMemberSymbol {
    /**
     * Gets the type of this field.
     */
    type(): ITypeSymbol;

    hasValue(): boolean;

    /**
     * Gets the constant value of this field.
     */
    value(): any;

    /// The parameter this variable was created from if it was created from a parameter.
    associatedParameter(): IParameterSymbol;
}