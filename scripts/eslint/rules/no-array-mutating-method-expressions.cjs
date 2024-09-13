const { ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const { getConstrainedTypeAtLocation, isTypeArrayTypeOrUnionOfArrayTypes } = require("@typescript-eslint/type-utils");

/**
 * @import { TSESTree } from "@typescript-eslint/utils"
 */
void 0;

module.exports = createRule({
    name: "no-array-mutating-method-expressions",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            noSideEffectUse: `This call to {{method}} appears to be unintentional as it appears in an expression position. Sort the array in a separate statement or explicitly copy the array with slice.`,
            noSideEffectUseToMethod: `This call to {{method}} appears to be unintentional as it appears in an expression position. Sort the array in a separate statement or explicitly copy and slice the array with slice/{{toMethod}}.`,
        },
        schema: [],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const services = ESLintUtils.getParserServices(context, /*allowWithoutFullTypeInformation*/ true);
        if (!services.program) {
            return {};
        }

        const checker = services.program.getTypeChecker();

        /**
         * This is a heuristic to ignore cases where the mutating method appears to be
         * operating on a "fresh" array.
         *
         * @type {(callee: TSESTree.MemberExpression) => boolean}
         */
        const isFreshArray = callee => {
            const object = callee.object;

            if (object.type === "ArrayExpression") {
                return true;
            }

            if (object.type !== "CallExpression") {
                return false;
            }

            if (object.callee.type === "Identifier") {
                // TypeScript codebase specific helpers.
                // TODO(jakebailey): handle ts.
                switch (object.callee.name) {
                    case "arrayFrom":
                    case "getOwnKeys":
                        return true;
                }
                return false;
            }

            if (object.callee.type === "MemberExpression" && object.callee.property.type === "Identifier") {
                switch (object.callee.property.name) {
                    case "concat":
                    case "filter":
                    case "map":
                    case "slice":
                        return true;
                }

                if (object.callee.object.type === "Identifier") {
                    if (object.callee.object.name === "Array") {
                        switch (object.callee.property.name) {
                            case "from":
                            case "of":
                                return true;
                        }
                        return false;
                    }

                    if (object.callee.object.name === "Object") {
                        switch (object.callee.property.name) {
                            case "values":
                            case "keys":
                            case "entries":
                                return true;
                        }
                        return false;
                    }
                }
            }

            return false;
        };

        /** @type {(callee: TSESTree.MemberExpression & { parent: TSESTree.CallExpression; }, method: string, toMethod: string | undefined) => void} */
        const check = (callee, method, toMethod) => {
            if (callee.parent.parent.type === "ExpressionStatement") return;
            if (isFreshArray(callee)) return;

            const calleeObjType = getConstrainedTypeAtLocation(services, callee.object);
            if (!isTypeArrayTypeOrUnionOfArrayTypes(calleeObjType, checker)) return;

            if (toMethod) {
                context.report({ node: callee.property, messageId: "noSideEffectUseToMethod", data: { method, toMethod } });
            }
            else {
                context.report({ node: callee.property, messageId: "noSideEffectUse", data: { method } });
            }
        };

        // Methods with new copying variants.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#copying_methods_and_mutating_methods
        const mutatingMethods = {
            reverse: undefined,
            sort: "toSorted", // This exists as `ts.toSorted`, so recommend that.
            splice: undefined,
        };

        return Object.fromEntries(
            Object.entries(mutatingMethods).map(([method, toMethod]) => [
                `CallExpression > MemberExpression[property.name='${method}'][computed=false]`,
                node => check(node, method, toMethod),
            ]),
        );
    },
});
