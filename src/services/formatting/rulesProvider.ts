/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export class RulesProvider {
        private readonly globalRules: Rules;
        private options: ts.FormatCodeSettings;
        readonly getRule: RulesMap;

        constructor() {
            this.globalRules = new Rules();
            const activeRules = this.globalRules.HighPriorityCommonRules.concat(this.globalRules.UserConfigurableRules).concat(this.globalRules.LowPriorityCommonRules);
            this.getRule = createRulesMap(activeRules);
        }

        public getFormatOptions(): Readonly<ts.FormatCodeSettings> {
            return this.options;
        }

        public ensureUpToDate(options: ts.FormatCodeSettings) {
            if (!this.options || !ts.compareDataObjects(this.options, options)) {
                this.options = ts.clone(options);
            }
        }
    }
}
