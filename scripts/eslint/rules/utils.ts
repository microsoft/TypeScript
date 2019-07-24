import { ParserServices, ESLintUtils } from "@typescript-eslint/experimental-utils";
export const createRule = ESLintUtils.RuleCreator(() => "");

export const getTypeChecker = (parserServices: ParserServices | undefined) => {
    if (!parserServices || !parserServices.program || !parserServices.program.getTypeChecker) {
        throw new Error("'typeChecker' was not found");
    }

    return parserServices.program.getTypeChecker();
};

export const getEsTreeNodeToTSNodeMap = (parserServices: ParserServices | undefined) => {
    if (!parserServices || !parserServices.esTreeNodeToTSNodeMap) {
        throw new Error("'esTreeNodeToTSNodeMap' was not found");
    }

    return parserServices.esTreeNodeToTSNodeMap;
};
