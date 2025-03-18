//// [tests/cases/compiler/decoratorMetadataConditionalType.ts] ////

//// [decoratorMetadataConditionalType.ts]
declare function d(): PropertyDecorator;
abstract class BaseEntity<T> {
    @d()
    public attributes: T extends { attributes: infer A } ? A : undefined;
}
class C {
    @d()
    x: number extends string ? false : true;
}

//// [decoratorMetadataConditionalType.js]
class BaseEntity {
    @d()
    attributes;
}
class C {
    @d()
    x;
}
