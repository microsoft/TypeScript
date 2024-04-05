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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = void 0;
var Wizard = /** @class */ (function () {
    function Wizard() {
    }
    Object.defineProperty(Wizard.prototype, "steps", {
        get: function () {
            return __assign({ wizard: this }, props);
        },
        enumerable: false,
        configurable: true
    });
    return Wizard;
}());
exports.Wizard = Wizard;
