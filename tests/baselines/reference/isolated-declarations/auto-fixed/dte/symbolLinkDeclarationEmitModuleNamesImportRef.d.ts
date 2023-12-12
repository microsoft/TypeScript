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



//// [Folder/monorepo/core/index.d.ts]
export declare function getStyles(): invalid;
//# sourceMappingURL=index.d.ts.map
/// [Errors] ////

Folder/monorepo/core/index.ts(3,17): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== Folder/monorepo/core/index.ts (1 errors) ====
    import { styles } from "package-a";
    
    export function getStyles() {
                    ~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 Folder/monorepo/core/index.ts:3:17: Add a return type to the function declaration.
    	return styles;
    }
    
==== Folder/monorepo/package-a/index.d.ts (0 errors) ====
    export declare const styles: import("styled-components").InterpolationValue[];
    
==== Folder/node_modules/styled-components/package.json (0 errors) ====
    {
      "name": "styled-components",
      "version": "3.3.3",
      "typings": "typings/styled-components.d.ts"
    }
    
==== Folder/node_modules/styled-components/typings/styled-components.d.ts (0 errors) ====
    export interface InterpolationValue {}