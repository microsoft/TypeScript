//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNamesImportRef.ts] ////

//// [index.d.ts]
export declare const styles: import("styled-components").InterpolationValue[];

//// [package.json]
{
  "name": "styled-components",
  "version": "3.3.3",
  "typings": "typings/styled-components.d.ts"
}

//// [styled-components.d.ts]
export interface InterpolationValue {}
//// [index.ts]
import { styles } from "package-a";

export function getStyles() {
	return styles;
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyles = getStyles;
var package_a_1 = require("package-a");
function getStyles() {
    return package_a_1.styles;
}


//// [index.d.ts]
export declare function getStyles(): import("styled-components").InterpolationValue[];
