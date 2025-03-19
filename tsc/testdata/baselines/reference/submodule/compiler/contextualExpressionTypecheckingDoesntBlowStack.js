//// [tests/cases/compiler/contextualExpressionTypecheckingDoesntBlowStack.ts] ////

//// [contextualExpressionTypecheckingDoesntBlowStack.ts]
// repro for: https://github.com/Microsoft/TypeScript/issues/23661
export interface IValidationError {
    message: string;
}

export default class Operation {
    validateParameters(parameterValues: any) : IValidationError[] | null {
        let result: IValidationError[] | null = null;
        for(const parameterLocation of Object.keys(parameterValues)) {
            const parameter: any = (this as any).getParameter();;
            const values = (this as any).getValues();

            const innerResult = parameter.validate(values[parameter.oaParameter.name]);
            if(innerResult && innerResult.length > 0) {
                // Commenting out this line will fix the problem.
                result = (result || []).concat(innerResult);
            }
        }

        return result;
    }
}

//// [contextualExpressionTypecheckingDoesntBlowStack.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operation {
    validateParameters(parameterValues) {
        let result = null;
        for (const parameterLocation of Object.keys(parameterValues)) {
            const parameter = this.getParameter();
            ;
            const values = this.getValues();
            const innerResult = parameter.validate(values[parameter.oaParameter.name]);
            if (innerResult && innerResult.length > 0) {
                // Commenting out this line will fix the problem.
                result = (result || []).concat(innerResult);
            }
        }
        return result;
    }
}
exports.default = Operation;
