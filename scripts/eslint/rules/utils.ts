// Roughly models: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/index.ts

import { ESLintUtils } from "@typescript-eslint/utils";

export * from "@typescript-eslint/utils/dist/ast-utils";
export * from "@typescript-eslint/type-utils";

const {
    applyDefault,
    deepMerge,
    isObjectNotArray,
    getParserServices,
    nullThrows,
    NullThrowsReasons,
} = ESLintUtils;
type InferMessageIdsTypeFromRule<T> =
    ESLintUtils.InferMessageIdsTypeFromRule<T>;
type InferOptionsTypeFromRule<T> = ESLintUtils.InferOptionsTypeFromRule<T>;

export {
    applyDefault,
    deepMerge,
    isObjectNotArray,
    getParserServices,
    nullThrows,
    InferMessageIdsTypeFromRule,
    InferOptionsTypeFromRule,
    NullThrowsReasons,
};

export const createRule = ESLintUtils.RuleCreator(() => "");
