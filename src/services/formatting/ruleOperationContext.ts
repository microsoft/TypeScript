///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {

    export class RuleOperationContext {
        constructor(private optionName: string, private checkApplyRuleOperation: { (optionName: string, options: FormatCodeSettings): boolean }, private customContextChecks: { (context: FormattingContext): boolean; }[]) {
        }

        static Any: RuleOperationContext = new RuleOperationContext(undefined, undefined, []);

        static Create1(...funcs: { (context: FormattingContext): boolean; }[]) {
            return new RuleOperationContext(undefined, undefined, funcs);
        }
        static Create2(optionName: string, checkApplyRuleOperation: { (optionName: string, options: FormatCodeSettings): boolean }, ...funcs: { (context: FormattingContext): boolean; }[]) {
            return new RuleOperationContext(optionName, checkApplyRuleOperation, funcs);
        }

        public IsAny(): boolean {
            return this === RuleOperationContext.Any;
        }

        public InContext(context: FormattingContext): boolean {
            if (this.checkApplyRuleOperation && !this.checkApplyRuleOperation(this.optionName, context.options)) {
                return false;
            }

            if (this.IsAny()) {
                return true;
            }

            for (const check of this.customContextChecks) {
                if (!check(context)) {
                    return false;
                }
            }
            return true;
        }
    }
}