// @declaration: true
// @filename: types/component.d.ts
declare module '@namespace/component' {
    export class Foo {}
}
// @filename: packages/somepackage/index.d.ts
import { Foo } from "@namespace/component";
export declare const item: typeof Foo;
// @filename: packages/secondpackage/index.ts
import { item } from "../somepackage";
export const reeexported = item;
