///<reference path='ISymbol.ts' />

interface ISymbolVisitor {
    visitAnyType(symbol: IAnyTypeSymbol): any;

    // Primitive types
    visitNumberType(symbol: INumberTypeSymbol): any;
    visitBooleanType(symbol: IBooleanTypeSymbol): any;
    visitStringType(symbol: IStringTypeSymbol): any;
    visitVoidType(symbol: IVoidTypeSymbol): any;
    visitNullType(symbol: INullTypeSymbol): any;
    visitUndefinedType(symbol: IUndefinedTypeSymbol): any;

    // Object types
    visitClassType(symbol: IClassTypeSymbol): any;
    visitInterfaceType(symbol: IInterfaceTypeSymbol): any;
    visitAnonymousType(symbol: IAnonymousTypeSymbol): any;
    // visitEnumType(symbol: IEnumTypeSymbol): any;
    // visitFunctionType(symbol: IFunctionTypeSymbol): any;
    // visitConstructorType(symbol: IConstructorTypeSymbol): any;

    visitTypeParameter(symbol: ITypeParameterSymbol): any;


    visitVariable(symbol: IVariableSymbol): any;
}