//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/// <reference path="references.ts"/>

module ts.formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: ts.FormatCodeOptions;
        private activeRules: Rule[];
        private rulesMap: RulesMap;

        constructor(private logger: Logger) {
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
            if (this.options == null || !ts.compareDataObjects(this.options, options)) {
                var activeRules = this.createActiveRules(options);
                var rulesMap = RulesMap.create(activeRules);

                this.activeRules = activeRules;
                this.rulesMap = rulesMap;
                this.options = ts.clone(options);
            }
        }

        private createActiveRules(options: ts.FormatCodeOptions): Rule[] {
            var rules = this.globalRules.HighPriorityCommonRules.slice(0);

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