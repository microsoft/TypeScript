//// [tests/cases/compiler/declarationEmitCommonSourceDirectoryDoesNotContainAllFiles.ts] ////

//// [index.ts]
export * from "./src/"
//// [index.ts]
export class B {}
//// [index.ts]
import { B } from "b";

export default function () {
	return new B();
}
//// [index.ts]
export * from "./src/"



//// [index.d.ts]
declare module "src/index" {
    import { B } from "b";
    export default function (): B;
}
declare module "index" {
    export * from "src/index";
}


//// [DtsFileErrors]


dist/index.d.ts(2,23): error TS2307: Cannot find module 'b' or its corresponding type declarations.


==== dist/index.d.ts (1 errors) ====
    declare module "src/index" {
        import { B } from "b";
                          ~~~
!!! error TS2307: Cannot find module 'b' or its corresponding type declarations.
        export default function (): B;
    }
    declare module "index" {
        export * from "src/index";
    }
    