import {
    isComputedPropertyName,
    isIdentifier,
    isNumericLiteral,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isStringLiteralLike,
} from "../../_namespaces/ts";
import {
    ComputedPropertyName,
    NoSubstitutionTemplateLiteral,
    PropertyName,
    SyntaxKind,
} from "../../types";
import {
    MemberKey,
} from "./types";

export function getMemberKey(name: string | Exclude<PropertyName, ComputedPropertyName> | NoSubstitutionTemplateLiteral): MemberKey;
export function getMemberKey(name: string | PropertyName | NoSubstitutionTemplateLiteral | undefined): MemberKey | undefined;
export function getMemberKey(name: string | PropertyName | NoSubstitutionTemplateLiteral | undefined): string | undefined {
    if (name === undefined) {
        return undefined;
    }
    if (typeof name === "string") {
        return ("I:" + name);
    }
    if (isPrivateIdentifier(name)) {
        return ("P:" + name.escapedText);
    }
    if (isIdentifier(name)) {
        return ("I:" + name.escapedText);
    }
    if (isStringLiteralLike(name)) {
        return ("I:" + name.text);
    }
    if (isNumericLiteral(name)) {
        return ("I:" + (+name.text));
    }
    if (isComputedPropertyName(name)) {
        let computedName = name.expression;

        if (isStringLiteralLike(computedName)) {
            return ("I:" + computedName.text);
        }
        if (isNumericLiteral(computedName)) {
            return ("I:" + (+computedName.text));
        }
        if (
            isPrefixUnaryExpression(computedName)
            && isNumericLiteral(computedName.operand)
        ) {
            if (computedName.operator === SyntaxKind.MinusToken) {
                return ("I:" + (-computedName.operand.text));
            }
            else if (computedName.operator === SyntaxKind.PlusToken) {
                return ("I:" + (-computedName.operand.text));
            }
            else {
                return undefined;
            }
        }
        let fullId = "C:";
        // We only support dotted identifiers as property keys
        while (true) {
            if (isIdentifier(computedName)) {
                fullId += computedName.escapedText;
                break;
            }
            else if (isPropertyAccessExpression(computedName)) {
                fullId += computedName.name.escapedText;
                computedName = computedName.expression;
            }
            else {
                // Can't compute a property key, bail
                return undefined;
            }
        }
        return fullId;
    }
    return undefined;
}
