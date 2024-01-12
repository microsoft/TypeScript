//// [tests/cases/compiler/declarationEmitCrossFileImportTypeOfAmbientModule.ts] ////

//// [component.d.ts]
declare module '@namespace/component' {
    export class Foo {}
}
//// [index.d.ts]
import { Foo } from "@namespace/component";
export declare const item: typeof Foo;
//// [index.ts]
import { Foo } from "@namespace/component";
import { item } from "../somepackage";
export const reeexported: Foo = item;


/// [Declarations] ////



//// [packages/secondpackage/index.d.ts]
import { Foo } from "@namespace/component";
export declare const reeexported: Foo;
//# sourceMappingURL=index.d.ts.map