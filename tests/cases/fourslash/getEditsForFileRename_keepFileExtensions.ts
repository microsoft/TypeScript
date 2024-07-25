/// <reference path="fourslash.ts"/>

// @Filename: /tsconfig.json
////{
////  "compilerOptions": {
////    "module": "Node16",
////    "rootDirs": ["src"]
////  }
////}

// @Filename: /src/person.ts
////export const name = 0;

// @Filename: /src/index.ts
////import {name} from "./person.js";

verify.getEditsForFileRename({
	oldPath: '/src/person.ts',
	newPath: '/src/vip.ts',
	newFileContents: {
		'/src/index.ts': 'import {name} from "./vip.js";',
	},
});
