///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {

    export class RuleOperationContext {
        private customContextChecks: { (context: FormattingContext): boolean; }[];

        constructor(...funcs: { (context: FormattingContext): boolean; }[]) {
            this.customContextChecks = funcs;
        }

        static Any: RuleOperationContext = new RuleOperationContext();


        public IsAny(): boolean {
            return this === RuleOperationContext.Any;
        }

        public  InContext(context: FormattingContext): boolean {
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