///<reference path='ISymbol.ts' />

interface ITypeInfo {
    /**
     * The type of the expression represented by the syntax node. For expressions that do not
     * have a type, null is returned. If the type could not be determined due to an error, than
     * an ErrorTypeSymbol is returned.
     */
    type(): ITypeSymbol;

    /**
     * The type of the expression after it has undergone an implicit conversion. If the type
     * did not undergo an implicit conversion, returns the same as Type.
     */
    convertedType(): ITypeSymbol;
}