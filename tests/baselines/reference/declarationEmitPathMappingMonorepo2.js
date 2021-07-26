//// [tests/cases/compiler/declarationEmitPathMappingMonorepo2.ts] ////

//// [index.d.ts]
export * from "./utils";
export { default as SvgIcon } from "./SvgIcon";

//// [SvgIcon.d.ts]
import { StyledComponentProps } from "@ts-bug/styles";
export interface SvgIconProps extends StyledComponentProps<"root"> {
    children?: string[];
}
export interface SomeInterface {
    myProp: string;
}
declare const SvgIcon: SomeInterface;
export default SvgIcon;

//// [utils.d.ts]
import SvgIcon from "./SvgIcon";
export function createSvgIcon(path: string, displayName: string): typeof SvgIcon;

//// [index.d.ts]
export interface StyledComponentProps<ClassKey extends string> {
    classes?: Record<ClassKey, string>;
}

//// [index.ts]
import { createSvgIcon } from "@ts-bug/core/utils";
export default createSvgIcon("Hello", "ArrowLeft");


//// [index.js]
"use strict";
exports.__esModule = true;
var utils_1 = require("@ts-bug/core/utils");
exports["default"] = (0, utils_1.createSvgIcon)("Hello", "ArrowLeft");


//// [index.d.ts]
declare const _default: import("@ts-bug/core/SvgIcon").SomeInterface;
export default _default;
