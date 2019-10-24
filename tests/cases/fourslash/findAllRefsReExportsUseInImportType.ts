/// <reference path="fourslash.ts" />

// @Filename: /foo/types/types.ts
////[|export type [|Full|] = { prop: string; };|]

// @Filename: /foo/types/index.ts
////import * as foo from './types';
////export { foo };

// @Filename: /app.ts
////import { foo } from './foo/types';
////export type fullType = foo.Full;
////type namespaceImport = typeof import('./foo/types');
////type fullType2 = import('./foo/types').foo.Full;

verify.noErrors();
const [full0Def, full0] = test.ranges();
verify.referenceGroups([full0], [{
    definition: "type foo",
    ranges: [full0]
}])

