/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: ts.FormatCodeOptions;
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

        public ensureUpToDate(options: ts.FormatCodeOptions) {
            // TODO: Should this be '==='?
            if (this.options == null || !ts.compareDataObjects(this.options, options)) {
                let activeRules = this.createActiveRules(options);
                let rulesMap = RulesMap.create(activeRules);

                this.activeRules = activeRules;
                this.rulesMap = rulesMap;
                this.options = ts.clone(options);
            }
        }

        private createActiveRules(options: ts.FormatCodeOptions): Rule[] {
            let rules = this.globalRules.HighPriorityCommonRules.slice(0);

            if (options.InsertSpaceAfterCommaDelimiter) {
                rules.push(this.globalRules.SpaceAfterComma);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterComma);
            }

            if (options.InsertSpaceAfterFunctionKeywordForAnonymousFunctions) {
                rules.push(this.globalRules.SpaceAfterAnonymousFunctionKeyword);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterAnonymousFunctionKeyword);
            }

            if (options.InsertSpaceAfterKeywordsInControlFlowStatements) {
                rules.push(this.globalRules.SpaceAfterKeywordInControl);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterKeywordInControl);
            }

            if (options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis) {
                rules.push(this.globalRules.SpaceAfterOpenParen);
                rules.push(this.globalRules.SpaceBeforeCloseParen);
                rules.push(this.globalRules.NoSpaceBetweenParens);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterOpenParen);
                rules.push(this.globalRules.NoSpaceBeforeCloseParen);
                rules.push(this.globalRules.NoSpaceBetweenParens);
            }

            if ( options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets ) {
                rules.push( this.globalRules.SpaceAfterOpenBracket );
                rules.push( this.globalRules.SpaceBeforeCloseBracket );
                rules.push( this.globalRules.NoSpaceBetweenBrackets );
            }
            else {
                rules.push( this.globalRules.NoSpaceAfterOpenBracket );
                rules.push( this.globalRules.NoSpaceBeforeCloseBracket );
                rules.push( this.globalRules.NoSpaceBetweenBrackets );
            }

            if (options.InsertSpaceAfterSemicolonInForStatements) {
                rules.push(this.globalRules.SpaceAfterSemicolonInFor);
            }
            else {
                rules.push(this.globalRules.NoSpaceAfterSemicolonInFor);
            }

            if (options.InsertSpaceBeforeAndAfterBinaryOperators) {
                rules.push(this.globalRules.SpaceBeforeBinaryOperator);
                rules.push(this.globalRules.SpaceAfterBinaryOperator);
            }
            else {
                rules.push(this.globalRules.NoSpaceBeforeBinaryOperator);
                rules.push(this.globalRules.NoSpaceAfterBinaryOperator);
            }

            if (options.PlaceOpenBraceOnNewLineForControlBlocks) {
                rules.push(this.globalRules.NewLineBeforeOpenBraceInControl);
            }

            if (options.PlaceOpenBraceOnNewLineForFunctions) {
                rules.push(this.globalRules.NewLineBeforeOpenBraceInFunction);
                rules.push(this.globalRules.NewLineBeforeOpenBraceInTypeScriptDeclWithBlock);
            }

            rules = rules.concat(this.globalRules.LowPriorityCommonRules);

            return rules;
        }
    }
}