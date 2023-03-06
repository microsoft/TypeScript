// @strict: true
// @target: es5

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