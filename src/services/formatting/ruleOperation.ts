///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class RuleOperation {
        constructor(readonly context: RuleOperationContext, readonly action: RuleAction) {}

        public toString(): string {
            return "[context=" + this.context + "," +
                "action=" + this.action + "]";
        }

        static create1(action: RuleAction) {
            return RuleOperation.create2(RuleOperationContext.any, action);
        }

        static create2(context: RuleOperationContext, action: RuleAction) {
            return new RuleOperation(context, action);
        }
    }
}