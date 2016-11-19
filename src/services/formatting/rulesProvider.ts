/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: ts.FormatCodeSettings;
        private activeRules: Rule[];
        private rulesMap: RulesMap;

        constructor() {
            this.globalRules = new Rules();
        }

        public getRuleName(rule: Rule): string {
            return this.globalRules.getRuleName(rule);
        }

        public getRuleByName(name: string): Rule {
            return this.globalRules[name];
        }

        public getRulesMap() {
            return this.rulesMap;
        }

        public ensureUpToDate(options: ts.FormatCodeSettings) {
            if (!this.options || !ts.compareDataObjects(this.options, options)) {
                const activeRules = this.createActiveRules(options);
                const rulesMap = RulesMap.create(activeRules);

                this.activeRules = activeRules;
                this.rulesMap = rulesMap;
                this.options = ts.clone(options);
            }
        }

        private createActiveRules(options: ts.FormatCodeSettings): Rule[] {
            let rules = this.globalRules.HighPriorityCommonRules.slice(0);

            if (options.insertSpaceAfterCommaDelimiter) {
                rules.push(this.globalRules.SpaceAfterComma);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterComma);
            }

            if (options.insertSpaceAfterFunctionKeywordForAnonymousFunctions) {
                rules.push(this.globalRules.SpaceAfterAnonymousFunctionKeyword);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterAnonymousFunctionKeyword);
            }

            if (options.insertSpaceAfterKeywordsInControlFlowStatements) {
                rules.push(this.globalRules.SpaceAfterKeywordInControl);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterKeywordInControl);
            }

            if (options.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis) {
                rules.push(this.globalRules.SpaceAfterOpenParen);
                rules.push(this.globalRules.SpaceBeforeCloseParen);
                rules.push(this.globalRules.NoSpaceBetweenParens);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterOpenParen);
                rules.push(this.globalRules.NoSpaceBeforeCloseParen);
                rules.push(this.globalRules.NoSpaceBetweenParens);
            }

            if (options.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets) {
                rules.push(this.globalRules.SpaceAfterOpenBracket);
                rules.push(this.globalRules.SpaceBeforeCloseBracket);
                rules.push(this.globalRules.NoSpaceBetweenBrackets);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterOpenBracket);
                rules.push(this.globalRules.NoSpaceBeforeCloseBracket);
                rules.push(this.globalRules.NoSpaceBetweenBrackets);
            }

            // The default value of InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces is true
            // so if the option is undefined, we should treat it as true as well
            if (options.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces !== false) {
                rules.push(this.globalRules.SpaceAfterOpenBrace);
                rules.push(this.globalRules.SpaceBeforeCloseBrace);
                rules.push(this.globalRules.NoSpaceBetweenEmptyBraceBrackets);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterOpenBrace);
                rules.push(this.globalRules.NoSpaceBeforeCloseBrace);
                rules.push(this.globalRules.NoSpaceBetweenEmptyBraceBrackets);
            }

            if (options.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces) {
                rules.push(this.globalRules.SpaceAfterTemplateHeadAndMiddle);
                rules.push(this.globalRules.SpaceBeforeTemplateMiddleAndTail);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterTemplateHeadAndMiddle);
                rules.push(this.globalRules.NoSpaceBeforeTemplateMiddleAndTail);
            }

            if (options.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces) {
                rules.push(this.globalRules.SpaceAfterOpenBraceInJsxExpression);
                rules.push(this.globalRules.SpaceBeforeCloseBraceInJsxExpression);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterOpenBraceInJsxExpression);
                rules.push(this.globalRules.NoSpaceBeforeCloseBraceInJsxExpression);
            }

            if (options.insertSpaceAfterSemicolonInForStatements) {
                rules.push(this.globalRules.SpaceAfterSemicolonInFor);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterSemicolonInFor);
            }

            if (options.insertSpaceBeforeAndAfterBinaryOperators) {
                rules.push(this.globalRules.SpaceBeforeBinaryOperator);
                rules.push(this.globalRules.SpaceAfterBinaryOperator);
            }
            else {
                rules.push(this.globalRules.NoSpaceBeforeBinaryOperator);
                rules.push(this.globalRules.NoSpaceAfterBinaryOperator);
            }

            if (options.placeOpenBraceOnNewLineForControlBlocks) {
                rules.push(this.globalRules.NewLineBeforeOpenBraceInControl);
            }

            if (options.placeOpenBraceOnNewLineForFunctions) {
                rules.push(this.globalRules.NewLineBeforeOpenBraceInFunction);
                rules.push(this.globalRules.NewLineBeforeOpenBraceInTypeScriptDeclWithBlock);
            }

            if (options.insertSpaceAfterTypeAssertion) {
                rules.push(this.globalRules.SpaceAfterTypeAssertion);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterTypeAssertion);
            }

            rules = rules.concat(this.globalRules.LowPriorityCommonRules);

            return rules;
        }
    }
}