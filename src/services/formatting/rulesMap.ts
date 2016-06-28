///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class RulesMap {
        public map: RulesBucket[];
        public mapRowLength: number;

        constructor() {
            this.map = [];
            this.mapRowLength = 0;
        }

        static create(rules: Rule[]): RulesMap {
            const result = new RulesMap();
            result.Initialize(rules);
            return result;
        }

        public Initialize(rules: Rule[]) {
            this.mapRowLength = SyntaxKind.LastToken + 1;
            this.map = <any> new Array(this.mapRowLength * this.mapRowLength); // new Array<RulesBucket>(this.mapRowLength * this.mapRowLength);

            // This array is used only during construction of the rulesbucket in the map
            const rulesBucketConstructionStateList: RulesBucketConstructionState[] = <any>new Array(this.map.length); // new Array<RulesBucketConstructionState>(this.map.length);

            this.FillRules(rules, rulesBucketConstructionStateList);
            return this.map;
        }

        public FillRules(rules: Rule[], rulesBucketConstructionStateList: RulesBucketConstructionState[]): void {
            rules.forEach((rule) => {
                this.FillRule(rule, rulesBucketConstructionStateList);
            });
        }

        private GetRuleBucketIndex(row: number, column: number): number {
            const rulesBucketIndex = (row * this.mapRowLength) + column;
            // Debug.Assert(rulesBucketIndex < this.map.Length, "Trying to access an index outside the array.");
            return rulesBucketIndex;
        }

        private FillRule(rule: Rule, rulesBucketConstructionStateList: RulesBucketConstructionState[]): void {
            const specificRule = rule.Descriptor.LeftTokenRange !== Shared.TokenRange.Any &&
                               rule.Descriptor.RightTokenRange !== Shared.TokenRange.Any;

            rule.Descriptor.LeftTokenRange.GetTokens().forEach((left) => {
                rule.Descriptor.RightTokenRange.GetTokens().forEach((right) => {
                    const rulesBucketIndex = this.GetRuleBucketIndex(left, right);

                    let rulesBucket = this.map[rulesBucketIndex];
                    if (rulesBucket === undefined) {
                        rulesBucket = this.map[rulesBucketIndex] = new RulesBucket();
                    }

                    rulesBucket.AddRule(rule, specificRule, rulesBucketConstructionStateList, rulesBucketIndex);
                });
            });
        }

        public GetRule(context: FormattingContext): Rule {
            const bucketIndex = this.GetRuleBucketIndex(context.currentTokenSpan.kind, context.nextTokenSpan.kind);
            const bucket = this.map[bucketIndex];
            if (bucket) {
                for (const rule of bucket.Rules()) {
                    if (rule.Operation.Context.InContext(context)) {
                        return rule;
                    }
                }
            }
            return undefined;
        }
    }

    const MaskBitSize = 5;
    const Mask = 0x1f;

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
            let index = 0;

            let pos = 0;
            let indexBitmap = this.rulesInsertionIndexBitmap;

            while (pos <= maskPosition) {
                index += (indexBitmap & Mask);
                indexBitmap >>= MaskBitSize;
                pos += MaskBitSize;
            }

            return index;
        }

        public IncreaseInsertionIndex(maskPosition: RulesPosition): void {
            let value = (this.rulesInsertionIndexBitmap >> maskPosition) & Mask;
            value++;
            Debug.assert((value & Mask) === value, "Adding more rules into the sub-bucket than allowed. Maximum allowed is 32 rules.");

            let temp = this.rulesInsertionIndexBitmap & ~(Mask << maskPosition);
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
            let position: RulesPosition;

            if (rule.Operation.Action === RuleAction.Ignore) {
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

            let state = constructionState[rulesBucketIndex];
            if (state === undefined) {
                state = constructionState[rulesBucketIndex] = new RulesBucketConstructionState();
            }
            const index = state.GetInsertionIndex(position);
            this.rules.splice(index, 0, rule);
            state.IncreaseInsertionIndex(position);
        }
    }
}