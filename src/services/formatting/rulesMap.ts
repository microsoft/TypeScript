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

///<reference path='formatting.ts' />

module TypeScript.Services.Formatting {
    export class RulesMap {
        public map: RulesBucket[];
        public mapRowLength: number;

        constructor() {
            this.map = [];
            this.mapRowLength = 0;
        }

        static create(rules: Rule[]): RulesMap {
            var result = new RulesMap();
            result.Initialize(rules);
            return result;
        }

        public Initialize(rules: Rule[]) {
            this.mapRowLength = SyntaxKind.LastToken + 1;
            this.map = <any> new Array(this.mapRowLength * this.mapRowLength);//new Array<RulesBucket>(this.mapRowLength * this.mapRowLength);

            // This array is used only during construction of the rulesbucket in the map
            var rulesBucketConstructionStateList: RulesBucketConstructionState[] = <any> new Array(this.map.length);//new Array<RulesBucketConstructionState>(this.map.length);

            this.FillRules(rules, rulesBucketConstructionStateList);
            return this.map;
        }

        public FillRules(rules: Rule[], rulesBucketConstructionStateList: RulesBucketConstructionState[]): void {
            rules.forEach((rule) => {
                this.FillRule(rule, rulesBucketConstructionStateList);
            });
        }

        private GetRuleBucketIndex(row: number, column: number): number {
            var rulesBucketIndex = (row * this.mapRowLength) + column;
            //Debug.Assert(rulesBucketIndex < this.map.Length, "Trying to access an index outside the array.");
            return rulesBucketIndex;
        }

        private FillRule(rule: Rule, rulesBucketConstructionStateList: RulesBucketConstructionState[]): void {
            var specificRule = rule.Descriptor.LeftTokenRange != Shared.TokenRange.Any &&
                               rule.Descriptor.RightTokenRange != Shared.TokenRange.Any;

            rule.Descriptor.LeftTokenRange.GetTokens().forEach((left) => {
                rule.Descriptor.RightTokenRange.GetTokens().forEach((right) => {
                    var rulesBucketIndex = this.GetRuleBucketIndex(left, right);

                    var rulesBucket = this.map[rulesBucketIndex];
                    if (rulesBucket == undefined) {
                        rulesBucket = this.map[rulesBucketIndex] = new RulesBucket();
                    }

                    rulesBucket.AddRule(rule, specificRule, rulesBucketConstructionStateList, rulesBucketIndex);
                })
            })
        }

        public GetRule(context: FormattingContext): Rule {
            var bucketIndex = this.GetRuleBucketIndex(context.currentTokenSpan.kind(), context.nextTokenSpan.kind());
            var bucket = this.map[bucketIndex];
            if (bucket != null) {
                for (var i = 0, len = bucket.Rules().length; i < len; i++) {
                    var rule = bucket.Rules()[i];
                    if (rule.Operation.Context.InContext(context))
                        return rule;
                }
            }
            return null;
        }
    }

    var MaskBitSize = 5;
    var Mask = 0x1f;

    export enum RulesPosition {
        IgnoreRulesSpecific = 0,
        IgnoreRulesAny = MaskBitSize * 1,
        ContextRulesSpecific = MaskBitSize * 2,
        ContextRulesAny = MaskBitSize * 3,
        NoContextRulesSpecific = MaskBitSize * 4,
        NoContextRulesAny = MaskBitSize * 5
    }

    export class RulesBucketConstructionState {
        private rulesInsertionIndexBitmap: number;

        constructor() {
            //// The Rules list contains all the inserted rules into a rulebucket in the following order:
            ////    1- Ignore rules with specific token combination
            ////    2- Ignore rules with any token combination
            ////    3- Context rules with specific token combination
            ////    4- Context rules with any token combination
            ////    5- Non-context rules with specific token combination
            ////    6- Non-context rules with any token combination
            //// 
            //// The member rulesInsertionIndexBitmap is used to describe the number of rules
            //// in each sub-bucket (above) hence can be used to know the index of where to insert 
            //// the next rule. It's a bitmap which contains 6 different sections each is given 5 bits.
            ////
            //// Example:
            //// In order to insert a rule to the end of sub-bucket (3), we get the index by adding
            //// the values in the bitmap segments 3rd, 2nd, and 1st.
            this.rulesInsertionIndexBitmap = 0;
        }

        public GetInsertionIndex(maskPosition: RulesPosition): number {
            var index = 0;

            var pos = 0;
            var indexBitmap = this.rulesInsertionIndexBitmap;

            while (pos <= maskPosition) {
                index += (indexBitmap & Mask);
                indexBitmap >>= MaskBitSize;
                pos += MaskBitSize;
            }

            return index;
        }

        public IncreaseInsertionIndex(maskPosition: RulesPosition): void {
            var value = (this.rulesInsertionIndexBitmap >> maskPosition) & Mask;
            value++;
            Debug.assert((value & Mask) == value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");

            var temp = this.rulesInsertionIndexBitmap & ~(Mask << maskPosition);
            temp |= value << maskPosition;

            this.rulesInsertionIndexBitmap = temp;
        }
    }

    export class RulesBucket {
        private rules: Rule[];

        constructor() {
            this.rules = [];
        }

        public Rules(): Rule[] {
            return this.rules;
        }

        public AddRule(rule: Rule, specificTokens: boolean, constructionState: RulesBucketConstructionState[], rulesBucketIndex: number): void {
            var position: RulesPosition;

            if (rule.Operation.Action == RuleAction.Ignore) {
                position = specificTokens ?
                    RulesPosition.IgnoreRulesSpecific :
                    RulesPosition.IgnoreRulesAny;
            }
            else if (!rule.Operation.Context.IsAny()) {
                position = specificTokens ?
                    RulesPosition.ContextRulesSpecific :
                    RulesPosition.ContextRulesAny;
            }
            else {
                position = specificTokens ?
                    RulesPosition.NoContextRulesSpecific :
                    RulesPosition.NoContextRulesAny;
            }

            var state = constructionState[rulesBucketIndex];
            if (state === undefined) {
                state = constructionState[rulesBucketIndex] = new RulesBucketConstructionState();
            }
            var index = state.GetInsertionIndex(position);
            this.rules.splice(index, 0, rule);
            state.IncreaseInsertionIndex(position);
        }
    }
}