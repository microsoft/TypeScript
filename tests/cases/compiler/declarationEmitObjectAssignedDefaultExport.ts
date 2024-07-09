// @target: es6
// @module: commonjs
// @declaration: true
// @filename: node_modules/styled-components/node_modules/hoist-non-react-statics/index.d.ts
interface Statics {
    "$$whatever": string;
}
declare namespace hoistNonReactStatics {
    type NonReactStatics<T> = {[X in Exclude<keyof T, keyof Statics>]: T[X]}
}
export = hoistNonReactStatics;
// @filename: node_modules/styled-components/index.d.ts
import * as hoistNonReactStatics from "hoist-non-react-statics";
export interface DefaultTheme {}
export type StyledComponent<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> =
    string
    & StyledComponentBase<TTag, TTheme, TStyle, TWhatever>
    & hoistNonReactStatics.NonReactStatics<TTag>;
export interface StyledComponentBase<TTag extends string, TTheme = DefaultTheme, TStyle = {}, TWhatever = never> {
    tag: TTag;
    theme: TTheme;
    style: TStyle;
    whatever: TWhatever;
}
export interface StyledInterface {
    div: (a: TemplateStringsArray) => StyledComponent<"div">;
}

declare const styled: StyledInterface;
export default styled;
// @filename: index.ts
import styled from "styled-components";

const A = styled.div``;
const B = styled.div``;
export const C = styled.div``;

export default Object.assign(A, {
    B,
    C
});
