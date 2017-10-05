/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: ts.FormatCodeSettings;
        private rulesMap: RulesMap;

        constructor() {
            this.globalRules = new Rules();
            const activeRules = this.globalRules.HighPriorityCommonRules.concat(this.globalRules.UserConfigurableRules).concat(this.globalRules.LowPriorityCommonRules);
            this.rulesMap = new RulesMap(activeRules);
        }

        public getRulesMap() {
            return this.rulesMap;
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