/* @internal */
namespace ts {
    export function isObjectType(type: Type): type is ObjectType {
        return !!(type.flags & TypeFlags.Object);
    }
}
