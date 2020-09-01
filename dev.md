How to add HKT

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

1. get TypeReferenceType(it is a node in fact) of one variable node
2. get the symbol of the TypeReferenceType
3. get declration type according to the symbol
4. get typeArguments(type)  -- this step is not that easy
5. add cache to declration of typeArguments.


instantiateType  <--------  seems this do the final map work.