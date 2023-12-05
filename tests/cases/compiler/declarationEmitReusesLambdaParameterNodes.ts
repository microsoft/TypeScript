// @strict: true
// @declaration: true
// @module: nodenext
// @filename: node_modules/react-select/index.d.ts
export type Whatever = {x: string, y: number};
export type Props<T, TThing = Whatever> = Omit<TThing, "y"> & Partial<TThing> & T;

// @filename: index.ts
import { Props } from "react-select";

export const CustomSelect1 = <Option,>(x: Props<Option> & {}) => {}
export function CustomSelect2<Option,>(x: Props<Option> & {}) {}
