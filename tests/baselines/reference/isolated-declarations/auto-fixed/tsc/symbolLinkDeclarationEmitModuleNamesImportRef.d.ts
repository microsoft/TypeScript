//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNamesImportRef.ts] ////

//// [index.ts]
import { styles } from "package-a";

export function getStyles() {
	return styles;
}

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

/// [Declarations] ////



//// [Folder/monorepo/core/index.d.ts]
export declare function getStyles(): import("styled-components").InterpolationValue[];
//# sourceMappingURL=index.d.ts.map