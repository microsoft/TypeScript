
/// <reference path='fourslash.ts' />

// @filename: /producer.ts
//// export class Disposable {}

// @filename: /test.ts
//// import { Disposable } from './producer';
//// 
//// [|class Something extends Disposable {
//// }|]

verify.moveToNewFile({
    newFileContents: {
        "/test.ts":
`
`,

    "/Something.ts":
`import { Disposable } from "./producer";

class Something extends Disposable {
}
`
    }
});
