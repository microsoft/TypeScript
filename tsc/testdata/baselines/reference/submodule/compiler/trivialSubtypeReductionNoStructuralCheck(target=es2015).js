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
export class Wizard {
    get steps() {
        return Object.assign({ wizard: this }, props);
    }
}
