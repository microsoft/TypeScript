/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export class RulesProvider {
        private globalRules: Rules;
        private options: ts.FormatCodeSettings;
        private rulesMap: RulesMap;

        constructor() {
            this.globalRules = new Rules();
            const activeRules = this.globalRules.HighPriorityCommonRules.slice(0).concat(this.globalRules.UserConfigurableRules).concat(this.globalRules.LowPriorityCommonRules);
            this.rulesMap = RulesMap.create(activeRules);
        }

        public getRuleName(rule: Rule): string {
            return this.globalRules.getRuleName(rule);
        }

        public getRuleByName(name: string): Rule {
            return this.globalRules[name];
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