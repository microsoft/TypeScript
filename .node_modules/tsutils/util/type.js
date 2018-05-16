"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var type_1 = require("../typeguard/type");
var util_1 = require("./util");
function isEmptyObjectType(type) {
    if (type_1.isObjectType(type) &&
        type.objectFlags & ts.ObjectFlags.Anonymous &&
        type.getProperties().length === 0 &&
        type.getCallSignatures().length === 0 &&
        type.getConstructSignatures().length === 0 &&
        type.getStringIndexType() === undefined &&
        type.getNumberIndexType() === undefined) {
        var baseTypes = type.getBaseTypes();
        return baseTypes === undefined || baseTypes.every(isEmptyObjectType);
    }
    return false;
}
exports.isEmptyObjectType = isEmptyObjectType;
function removeOptionalityFromType(checker, type) {
    if (!containsTypeWithFlag(type, ts.TypeFlags.Undefined))
        return type;
    var allowsNull = containsTypeWithFlag(type, ts.TypeFlags.Null);
    type = checker.getNonNullableType(type);
    return allowsNull ? checker.getNullableType(type, ts.TypeFlags.Null) : type;
}
exports.removeOptionalityFromType = removeOptionalityFromType;
function containsTypeWithFlag(type, flag) {
    for (var _i = 0, _a = unionTypeParts(type); _i < _a.length; _i++) {
        var t = _a[_i];
        if (util_1.isTypeFlagSet(t, flag))
            return true;
    }
    return false;
}
function isTypeAssignableToNumber(checker, type) {
    return isTypeAssignableTo(checker, type, ts.TypeFlags.NumberLike);
}
exports.isTypeAssignableToNumber = isTypeAssignableToNumber;
function isTypeAssignableToString(checker, type) {
    return isTypeAssignableTo(checker, type, ts.TypeFlags.StringLike);
}
exports.isTypeAssignableToString = isTypeAssignableToString;
function isTypeAssignableTo(checker, type, flags) {
    flags |= ts.TypeFlags.Any;
    var typeParametersSeen;
    return (function check(t) {
        if (type_1.isTypeParameter(t) && t.symbol !== undefined && t.symbol.declarations !== undefined) {
            if (typeParametersSeen === undefined) {
                typeParametersSeen = new Set([t]);
            }
            else if (!typeParametersSeen.has(t)) {
                typeParametersSeen.add(t);
            }
            else {
                return false;
            }
            var declaration = t.symbol.declarations[0];
            if (declaration.constraint === undefined)
                return true;
            return check(checker.getTypeFromTypeNode(declaration.constraint));
        }
        if (type_1.isUnionType(t))
            return t.types.every(check);
        if (type_1.isIntersectionType(t))
            return t.types.some(check);
        return util_1.isTypeFlagSet(t, flags);
    })(type);
}
function getCallSignaturesOfType(type) {
    if (type_1.isUnionType(type)) {
        var signatures = [];
        for (var _i = 0, _a = type.types; _i < _a.length; _i++) {
            var t = _a[_i];
            signatures.push.apply(signatures, getCallSignaturesOfType(t));
        }
        return signatures;
    }
    if (type_1.isIntersectionType(type)) {
        var signatures = void 0;
        for (var _b = 0, _c = type.types; _b < _c.length; _b++) {
            var t = _c[_b];
            var sig = getCallSignaturesOfType(t);
            if (sig.length !== 0) {
                if (signatures !== undefined)
                    return [];
                signatures = sig;
            }
        }
        return signatures === undefined ? [] : signatures;
    }
    return type.getCallSignatures();
}
exports.getCallSignaturesOfType = getCallSignaturesOfType;
function unionTypeParts(type) {
    return type_1.isUnionType(type) ? type.types : [type];
}
exports.unionTypeParts = unionTypeParts;
function isThenableType(checker, node, type) {
    if (type === void 0) { type = checker.getTypeAtLocation(node); }
    for (var _i = 0, _a = unionTypeParts(checker.getApparentType(type)); _i < _a.length; _i++) {
        var ty = _a[_i];
        var then = ty.getProperty('then');
        if (then === undefined)
            continue;
        var thenType = checker.getTypeOfSymbolAtLocation(then, node);
        for (var _b = 0, _c = unionTypeParts(thenType); _b < _c.length; _b++) {
            var t = _c[_b];
            for (var _d = 0, _e = t.getCallSignatures(); _d < _e.length; _d++) {
                var signature = _e[_d];
                if (signature.parameters.length !== 0 && isCallback(checker, signature.parameters[0], node))
                    return true;
            }
        }
    }
    return false;
}
exports.isThenableType = isThenableType;
function isCallback(checker, param, node) {
    var type = checker.getApparentType(checker.getTypeOfSymbolAtLocation(param, node));
    if (param.valueDeclaration.dotDotDotToken) {
        type = type.getNumberIndexType();
        if (type === undefined)
            return false;
    }
    for (var _i = 0, _a = unionTypeParts(type); _i < _a.length; _i++) {
        var t = _a[_i];
        if (t.getCallSignatures().length !== 0)
            return true;
    }
    return false;
}
function isFalsyType(type) {
    if (type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Void))
        return true;
    if (type_1.isLiteralType(type))
        return !type.value;
    if (type.flags & ts.TypeFlags.BooleanLiteral)
        return type.intrinsicName === 'false';
    return false;
}
exports.isFalsyType = isFalsyType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFDakMsMENBQWtIO0FBQ2xILCtCQUF1QztBQUV2QywyQkFBa0MsSUFBYTtJQUMzQyxJQUFJLG1CQUFZLENBQUMsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTO1FBQzNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxTQUFTO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLFNBQVMsRUFBRTtRQUN6QyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEMsT0FBTyxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUN4RTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFaRCw4Q0FZQztBQUVELG1DQUEwQyxPQUF1QixFQUFFLElBQWE7SUFDNUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQztJQUNoQixJQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFP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