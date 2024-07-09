// @declaration: true
// @emitDeclarationOnly: true
// @outFile: dist/index.d.ts
// @currentDirectory: /a
// @noImplicitReferences: true
// @filename: /b/index.ts
export * from "./src/"
// @filename: /b/src/index.ts
export class B {}
// @filename: /a/src/index.ts
import { B } from "b";

export default function () {
	return new B();
}
// @filename: /a/index.ts
export * from "./src/"
// @link: /b -> /a/node_modules/b