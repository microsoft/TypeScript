"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function isConditionalType(type) {
    return (type.flags & ts.TypeFlags.Conditional) !== 0;
}
exports.isConditionalType = isConditionalType;
function isEnumType(type) {
    return (type.flags & ts.TypeFlags.Enum) !== 0;
}
exports.isEnumType = isEnumType;
function isGenericType(type) {
    return (type.flags & ts.TypeFlags.Object) !== 0 &&
        (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0 &&
        (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}
exports.isGenericType = isGenericType;
function isIndexedAccessType(type) {
    return (type.flags & ts.TypeFlags.IndexedAccess) !== 0;
}
exports.isIndexedAccessType = isIndexedAccessType;
function isIndexedAccessype(type) {
    return (type.flags & ts.TypeFlags.Index) !== 0;
}
exports.isIndexedAccessype = isIndexedAccessype;
function isInstantiableType(type) {
    return (type.flags & ts.TypeFlags.Instantiable) !== 0;
}
exports.isInstantiableType = isInstantiableType;
function isInterfaceType(type) {
    return (type.flags & ts.TypeFlags.Object) !== 0 &&
        (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0;
}
exports.isInterfaceType = isInterfaceType;
function isIntersectionType(type) {
    return (type.flags & ts.TypeFlags.Intersection) !== 0;
}
exports.isIntersectionType = isIntersectionType;
function isLiteralType(type) {
    return (type.flags & ts.TypeFlags.StringOrNumberLiteral) !== 0;
}
exports.isLiteralType = isLiteralType;
function isObjectType(type) {
    return (type.flags & ts.TypeFlags.Object) !== 0;
}
exports.isObjectType = isObjectType;
function isSubstitutionType(type) {
    return (type.flags & ts.TypeFlags.Substitution) !== 0;
}
exports.isSubstitutionType = isSubstitutionType;
function isTypeParameter(type) {
    return (type.flags & ts.TypeFlags.TypeParameter) !== 0;
}
exports.isTypeParameter = isTypeParameter;
function isTypeReference(type) {
    return (type.flags & ts.TypeFlags.Object) !== 0 &&
        (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
}
exports.isTypeReference = isTypeReference;
function isTypeVariable(type) {
    return (type.flags & ts.TypeFlags.TypeVariable) !== 0;
}
exports.isTypeVariable = isTypeVariable;
function isUnionOrIntersectionType(type) {
    return (type.flags & ts.TypeFlags.UnionOrIntersection) !== 0;
}
exports.isUnionOrIntersectionType = isUnionOrIntersectionType;
function isUnionType(type) {
    return (type.flags & ts.TypeFlags.Union) !== 0;
}
exports.isUnionType = isUnionType;
function isUniqueESSymbolType(type) {
    return (type.flags & ts.TypeFlags.UniqueESSymbol) !== 0;
}
exports.isUniqueESSymbolType = isUniqueESSymbolType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFFakMsMkJBQWtDLElBQWE7SUFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUZELDhDQUVDO0FBRUQsb0JBQTJCLElBQWE7SUFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUZELGdDQUVDO0FBRUQsdUJBQThCLElBQWE7SUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQWlCLElBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7UUFDM0UsQ0FBaUIsSUFBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBSkQsc0NBSUM7QUFFRCw2QkFBb0MsSUFBYTtJQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRkQsa0RBRUM7QUFFRCw0QkFBbUMsSUFBYTtJQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRkQsZ0RBRUM7QUFFRCw0QkFBbUMsSUFBYTtJQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUss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