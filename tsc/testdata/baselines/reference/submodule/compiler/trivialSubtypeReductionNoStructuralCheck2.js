//// [tests/cases/compiler/trivialSubtypeReductionNoStructuralCheck2.ts] ////

//// [trivialSubtypeReductionNoStructuralCheck2.ts]
declare const props: WizardStepProps;
export class Wizard {
  get steps() {
    return {
      wizard: this as Wizard,
      ...props,
    } as WizardStepProps;
  }
}

export interface WizardStepProps {
  wizard?: Wizard;
}

//// [trivialSubtypeReductionNoStructuralCheck2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = void 0;
class Wizard {
    get steps() {
        return {
            wizard: this,
            ...props,
        };
    }
}
exports.Wizard = Wizard;
