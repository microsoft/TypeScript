//// [tests/cases/compiler/declarationEmitCrossFileImportTypeOfAmbientModule.ts] ////

//// [types/component.d.ts]
declare module '@namespace/component' {
    export class Foo {}
}
//// [packages/somepackage/index.d.ts]
import { Foo } from "@namespace/component";
export declare const item: typeof Foo;
//// [packages/secondpackage/index.ts]
import { Foo } from "@namespace/component";
import { item } from "../somepackage";
export const reeexported: Foo = item;


/// [Declarations] ////



//// [packages/secondpackage/index.d.ts]
import { Foo } from "@namespace/component";
export declare const reeexported: Foo;
//# sourceMappingURL=index.d.ts.map