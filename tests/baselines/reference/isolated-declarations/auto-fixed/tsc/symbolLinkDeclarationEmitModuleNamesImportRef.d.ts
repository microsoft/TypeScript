//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNamesImportRef.ts] ////

//// [Folder/monorepo/core/index.ts]
import { styles } from "package-a";

export function getStyles() {
	return styles;
}

//// [Folder/monorepo/package-a/index.d.ts]
export declare const styles: import("styled-components").InterpolationValue[];

//// [Folder/node_modules/styled-components/package.json]
{
  "name": "styled-components",
  "version": "3.3.3",
  "typings": "typings/styled-components.d.ts"
}

//// [Folder/node_modules/styled-components/typings/styled-components.d.ts]
export interface InterpolationValue {}

/// [Declarations] ////



//// [/.src/Folder/monorepo/core/index.d.ts]
export declare function getStyles(): import("styled-components").InterpolationValue[];
