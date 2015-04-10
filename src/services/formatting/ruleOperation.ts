///<reference path='references.ts' />

/* @internal */
module ts.formatting {
    export class RuleOperation {
        public Context: RuleOperationContext;
        public Action: RuleAction;

        constructor() {
            this.Context = null;
            this.Action = null;
        }

        public toString(): string {
            return "[context=" + this.Context + "," +
                "action=" + this.Action + "]";
        }

        static create1(action: RuleAction) {
            return RuleOperation.create2(RuleOperationContext.Any, action)
        }

        static create2(context: RuleOperationContext, action: RuleAction) {
            let result = new RuleOperation();
            result.Context = context;
            result.Action = action;
            return result;
        }
    }
}