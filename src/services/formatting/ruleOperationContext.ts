///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {

    export class RuleOperationContext {
        private readonly customContextChecks: ((context: FormattingContext) => boolean)[];

        constructor(...funcs: ((context: FormattingContext) => boolean)[]) {
            this.customContextChecks = funcs;
        }

        static readonly any: RuleOperationContext = new RuleOperationContext();

        public IsAny(): boolean {
            return this === RuleOperationContext.any;
        }

        public InContext(context: FormattingContext): boolean {
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