/* @internal */
namespace ts {
    export function isIntersectionType(type: Type): type is IntersectionType {
        return !!(type.flags & TypeFlags.Intersection);
    }

    export function isObjectType(type: Type): type is ObjectType {
        return !!(type.flags & TypeFlags.Object);
    }
}
