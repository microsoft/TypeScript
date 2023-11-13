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

/// [Errors] ////

Folder/monorepo/core/index.ts(3,17): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== Folder/monorepo/core/index.ts (1 errors) ====
    import { styles } from "package-a";
    
    export function getStyles() {
                    ~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
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