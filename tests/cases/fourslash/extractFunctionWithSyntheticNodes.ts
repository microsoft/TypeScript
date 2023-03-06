/// <reference path="fourslash.ts" />

// @filename: /project/tsconfig.json
//// {}

// @filename: /project/index.esm.d.ts
//// export declare class Chart {
////     constructor(config: ChartConfiguration);
//// }
//// 
//// export interface ChartConfiguration {
////     options?: Partial<TickOptions>;
//// }
//// 
//// export interface TickOptions {
////     callback: (this: Scale, tickValue: number | string) => string | string[] | number | number[] | null | undefined;
//// }
//// 
//// export interface CoreScaleOptions {
////     opt: boolean;
//// }
////   
//// export interface Scale<O extends CoreScaleOptions = CoreScaleOptions> {
////     opts: O;
////     getLabelForValue(value: number): string;
//// }
  
// @filename: /project/options.ts
//// import { Chart } from './index.esm';
//// 
//// const chart = new Chart({
////     options: {
////         callback(tickValue) {
////             /*a*/const value = this.getLabelForValue(tickValue as number);/*b*/
////             return '$' + value;
////         }
////     }
//// });

goTo.file("/project/options.ts");
verify.noErrors();
goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Extract Symbol",
    actionName: "function_scope_0",
    actionDescription: "Extract to inner function in method 'callback'",
    newContent:
`import { Chart } from './index.esm';

const chart = new Chart({
    options: {
        callback(tickValue) {
            const value = /*RENAME*/newFunction.call(this);
            return '$' + value;

            function newFunction(this: import("/project/index.esm").Scale<import("/project/index.esm").CoreScaleOptions>) {
                return this.getLabelForValue(tickValue as number);
            }
        }
    }
});`
});
