How to add HKT

This implement is a toy, it is not parsed as BNF. I only promise the type constructor could check for the correct parameter numbers.

1. AST: add possiable parameters to TypeParameter when parsing
2. convert AST to proper Type


getTypeFromTypeNode
    - what is TypeNode, like ` Set<number>` in `var q: Set<number>`
    1. function getTypeFromTypeReference(node: TypeReferenceType): Type
    - what is TypeReferenceType, it is TypeNode, with something more.
        1. get symbol of the TypeReferenceType
        1. function getTypeReferenceType(node: NodeWithTypeArguments, symbol: Symbol): Type {
            1. function getDeclaredTypeOfClassOrInterface(symbol: Symbol): InterfaceType {          <-- this function use GenericType!
            2. createDeferredTypeReference      <-- this function give concentrate type to generic type!

TypeArguments means the concentrate type like number, boolean
TypeParameters means the abstract Generic Symbol like T, U


instantiateType  <--------  seems this do the final map work.


Q: How does Generic works for now?
A:
1. get TypeReferenceType(it is a node in fact) of one variable node
2. get the symbol of the TypeReferenceType
3. get declration type according to the symbol
4. get typeArguments(type) with default parameter and given typeParameters  -- this step is not that easy
5. add cache to the type of the generic symbol.

1. get the type of the symbol.


Here are some important function signature:

// craete resolvedTypeArguments
function getTypeArguments(type: TypeReference): readonly Type[]
function getDeclaredTypeOfClassOrInterface(symbol: Symbol): InterfaceType
    - If the symbolLink of this symbol does not have `declaredType`, it would create a `ObjectType` whose `target` is itself, and set it as declaredType.

//
function getTypeFromClassOrInterfaceReference(node: NodeWithTypeArguments, symbol: Symbol): Type

//
function createTypeReference(target: GenericType, typeArguments: readonly Type[] | undefined): TypeReference
    - this function would try get cached value(key is calculated through typeArguments' ids) from `target.instantiations`, if not create and cache a `TypeReference` type, set its property `resolvedTypeArguments` as `typeArguments` and property `target` as `target`(from function parameters).
