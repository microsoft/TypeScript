import * as ts from "../_namespaces/ts";

/** @internal */
export function getFormatContext(options: ts.FormatCodeSettings, host: ts.FormattingHost): ts.formatting.FormatContext {
    return { options, getRules: getRulesMap(), host };
}

let rulesMapCache: RulesMap | undefined;

function getRulesMap(): RulesMap {
    if (rulesMapCache === undefined) {
        rulesMapCache = createRulesMap(ts.formatting.getAllRules());
    }
    return rulesMapCache;
}

/**
 * For a given rule action, gets a mask of other rule actions that
 * cannot be applied at the same position.
 */
function getRuleActionExclusion(ruleAction: ts.formatting.RuleAction): ts.formatting.RuleAction {
    let mask: ts.formatting.RuleAction = 0;
    if (ruleAction & ts.formatting.RuleAction.StopProcessingSpaceActions) {
        mask |= ts.formatting.RuleAction.ModifySpaceAction;
    }
    if (ruleAction & ts.formatting.RuleAction.StopProcessingTokenActions) {
        mask |= ts.formatting.RuleAction.ModifyTokenAction;
    }
    if (ruleAction & ts.formatting.RuleAction.ModifySpaceAction) {
        mask |= ts.formatting.RuleAction.ModifySpaceAction;
    }
    if (ruleAction & ts.formatting.RuleAction.ModifyTokenAction) {
        mask |= ts.formatting.RuleAction.ModifyTokenAction;
    }
    return mask;
}

/** @internal */
export type RulesMap = (context: ts.formatting.FormattingContext) => readonly ts.formatting.Rule[] | undefined;
function createRulesMap(rules: readonly ts.formatting.RuleSpec[]): RulesMap {
    const map = buildMap(rules);
    return context => {
        const bucket = map[getRuleBucketIndex(context.currentTokenSpan.kind, context.nextTokenSpan.kind)];
        if (bucket) {
            const rules: ts.formatting.Rule[] = [];
            let ruleActionMask: ts.formatting.RuleAction = 0;
            for (const rule of bucket) {
                const acceptRuleActions = ~getRuleActionExclusion(ruleActionMask);
                if (rule.action & acceptRuleActions && ts.every(rule.context, c => c(context))) {
                    rules.push(rule);
                    ruleActionMask |= rule.action;
                }
            }
            if (rules.length) {
                return rules;
            }
        }
    };
}

function buildMap(rules: readonly ts.formatting.RuleSpec[]): readonly (readonly ts.formatting.Rule[])[] {
    // Map from bucket index to array of rules
    const map: ts.formatting.Rule[][] = new Array(mapRowLength * mapRowLength);
    // This array is used only during construction of the rulesbucket in the map
    const rulesBucketConstructionStateList = new Array<number>(map.length);
    for (const rule of rules) {
        const specificRule = rule.leftTokenRange.isSpecific && rule.rightTokenRange.isSpecific;

        for (const left of rule.leftTokenRange.tokens) {
            for (const right of rule.rightTokenRange.tokens) {
                const index = getRuleBucketIndex(left, right);
                let rulesBucket = map[index];
                if (rulesBucket === undefined) {
                    rulesBucket = map[index] = [];
                }
                addRule(rulesBucket, rule.rule, specificRule, rulesBucketConstructionStateList, index);
            }
        }
    }
    return map;
}

function getRuleBucketIndex(row: number, column: number): number {
    ts.Debug.assert(row <= ts.SyntaxKind.LastKeyword && column <= ts.SyntaxKind.LastKeyword, "Must compute formatting context from tokens");
    return (row * mapRowLength) + column;
}

const maskBitSize = 5;
const mask = 0b11111; // MaskBitSize bits
const mapRowLength = ts.SyntaxKind.LastToken + 1;

enum RulesPosition {
    StopRulesSpecific = 0,
    StopRulesAny = maskBitSize * 1,
    ContextRulesSpecific = maskBitSize * 2,
    ContextRulesAny = maskBitSize * 3,
    NoContextRulesSpecific = maskBitSize * 4,
    NoContextRulesAny = maskBitSize * 5
}

// The Rules list contains all the inserted rules into a rulebucket in the following order:
//    1- Ignore rules with specific token combination
//    2- Ignore rules with any token combination
//    3- Context rules with specific token combination
//    4- Context rules with any token combination
//    5- Non-context rules with specific token combination
//    6- Non-context rules with any token combination
//
// The member rulesInsertionIndexBitmap is used to describe the number of rules
// in each sub-bucket (above) hence can be used to know the index of where to insert
// the next rule. It's a bitmap which contains 6 different sections each is given 5 bits.
//
// Example:
// In order to insert a rule to the end of sub-bucket (3), we get the index by adding
// the values in the bitmap segments 3rd, 2nd, and 1st.
function addRule(rules: ts.formatting.Rule[], rule: ts.formatting.Rule, specificTokens: boolean, constructionState: number[], rulesBucketIndex: number): void {
    const position = rule.action & ts.formatting.RuleAction.StopAction ?
        specificTokens ? RulesPosition.StopRulesSpecific : RulesPosition.StopRulesAny :
        rule.context !== ts.formatting.anyContext ?
            specificTokens ? RulesPosition.ContextRulesSpecific : RulesPosition.ContextRulesAny :
            specificTokens ? RulesPosition.NoContextRulesSpecific : RulesPosition.NoContextRulesAny;

    const state = constructionState[rulesBucketIndex] || 0;
    rules.splice(getInsertionIndex(state, position), 0, rule);
    constructionState[rulesBucketIndex] = increaseInsertionIndex(state, position);
}

function getInsertionIndex(indexBitmap: number, maskPosition: RulesPosition) {
    let index = 0;
    for (let pos = 0; pos <= maskPosition; pos += maskBitSize) {
        index += indexBitmap & mask;
        indexBitmap >>= maskBitSize;
    }
    return index;
}

function increaseInsertionIndex(indexBitmap: number, maskPosition: RulesPosition): number {
    const value = ((indexBitmap >> maskPosition) & mask) + 1;
    ts.Debug.assert((value & mask) === value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");
    return (indexBitmap & ~(mask << maskPosition)) | (value << maskPosition);
}
