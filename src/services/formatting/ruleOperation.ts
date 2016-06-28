///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class RuleOperation {
        constructor(public Context: RuleOperationContext, public Action: RuleAction) {}

        public toString(): string {
            return "[context=" + this.Context + "," +
                "action=" + this.Action + "]";
        }

        static create1(action: RuleAction) {
            return RuleOperation.create2(RuleOperationContext.Any, action);
        }

        static create2(context: RuleOperationContext, action: RuleAction) {
            return new RuleOperation(context, action);
        }
    }
}