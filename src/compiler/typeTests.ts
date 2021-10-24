namespace ts {
    export function isUnionType(type: Type): type is UnionType {
        return !!(type.flags & TypeFlags.Union);
    }

    export function isIntersectionType(type: Type): type is IntersectionType {
        return !!(type.flags & TypeFlags.Intersection);
    }

    export function isObjectType(type: Type): type is ObjectType {
        return !!(type.flags & TypeFlags.Object);
    }
}
