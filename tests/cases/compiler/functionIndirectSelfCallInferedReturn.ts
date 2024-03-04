// @strict: true

interface Type {
    flags: number;
    x: any;
}

declare function mapType(type: Type, mapper: (t: Type) => Type, noReductions?: boolean): Type;
declare function mapType(type: Type, mapper: (t: Type) => Type | undefined, noReductions?: boolean): Type | undefined;

function unwrapAwaitedType(type: Type) {
    return type.flags & 1 ? mapType(type, unwrapAwaitedType) :
        type;
}