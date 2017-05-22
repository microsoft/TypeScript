
// @filename: /node_modules/@types/foo-bar/index.d.ts
export interface Foo {
    bar: string;
}

// This should error
// @filename: /a.ts
import { Foo } from "@types/foo-bar";
