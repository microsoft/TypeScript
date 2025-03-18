//// [tests/cases/compiler/declarationEmitReusesLambdaParameterNodes.ts] ////

//// [index.d.ts]
export type Whatever = {x: string, y: number};
export type Props<T, TThing = Whatever> = Omit<TThing, "y"> & Partial<TThing> & T;

//// [index.ts]
import { Props } from "react-select";

export const CustomSelect1 = <Option,>(x: Props<Option> & {}) => {}
export function CustomSelect2<Option,>(x: Props<Option> & {}) {}


//// [index.js]
export const CustomSelect1 = (x) => { };
export function CustomSelect2(x) { }
