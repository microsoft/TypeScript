// @declaration: true
// @useCaseSensitiveFileNames: false
// @noImplicitReferences: true
// @filename: Folder/monorepo/package-a/index.d.ts
export declare const styles: import("styled-components").InterpolationValue[];

// @filename: Folder/node_modules/styled-components/package.json
{
  "name": "styled-components",
  "version": "3.3.3",
  "typings": "typings/styled-components.d.ts"
}

// @filename: Folder/node_modules/styled-components/typings/styled-components.d.ts
export interface InterpolationValue {}
// @filename: Folder/monorepo/core/index.ts
import { styles } from "package-a";

export function getStyles() {
	return styles;
}

// @link: tests/cases/compiler/Folder/node_modules/styled-components -> tests/cases/compiler/Folder/monorepo/package-a/node_modules/styled-components
// @link: tests/cases/compiler/Folder/monorepo/package-a -> tests/cases/compiler/Folder/monorepo/core/node_modules/package-a