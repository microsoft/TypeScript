//// [tests/cases/compiler/trivialSubtypeReductionNoStructuralCheck.ts] ////

//// [trivialSubtypeReductionNoStructuralCheck.ts]
declare const props: WizardStepProps;
export class Wizard {
  get steps() {
    return {
      wizard: this,
      ...props,
    } as WizardStepProps;
  }
}

export interface WizardStepProps {
  wizard?: Wizard;
}

//// [trivialSubtypeReductionNoStructuralCheck.js]
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
