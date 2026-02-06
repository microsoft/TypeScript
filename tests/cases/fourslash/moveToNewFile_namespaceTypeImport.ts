// @filename: /src/test.ts
//// import type * as ambient from "ambient";
//// 
//// [|export class Yadda {
////   foo(): ambient.Thing {
////     throw new Error("not implemented");
////   }
//// 
////   bar(): ambient.DoesNotExist {
////     throw new Error("not implemented");
////   }
//// }|]

// @filename: /src/globals.ts
//// declare module "ambient" {
////     export interface Thing {}
//// }

verify.moveToNewFile({
    newFileContents: {
        "/src/test.ts":
`
`,
        "/src/Yadda.ts":
`import type * as ambient from "ambient";


export class Yadda {
    foo(): ambient.Thing {
        throw new Error("not implemented");
    }

    bar(): ambient.DoesNotExist {
        throw new Error("not implemented");
    }
}
`
    }
});
