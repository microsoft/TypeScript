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
export class Wizard {
    get steps() {
        return Object.assign({ wizard: this }, props);
    }
}
