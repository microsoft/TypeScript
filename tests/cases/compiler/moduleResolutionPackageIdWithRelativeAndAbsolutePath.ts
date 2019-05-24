// @noImplicitReferences: true
// @fullEmitPaths: true
// @traceResolution: true
// @filename: /shared/node_modules/troublesome-lib/package.json
{
    "name": "troublesome-lib",
    "version": "1.17.1"
}
// @filename: /shared/node_modules/troublesome-lib/lib/Compactable.d.ts
import { Option } from './Option';
export class Compactable {
    option: Option;
}
// @filename: /shared/node_modules/troublesome-lib/lib/Option.d.ts
export class Option {
    someProperty: string;
}
// @filename: /shared/lib/app.d.ts
import { Option } from "troublesome-lib/lib/Option";
export class SharedOption extends Option { }
export const makeSharedOption: () => SharedOption;
// @filename: /project/node_modules/anotherLib/index.d.ts
import { Compactable } from "troublesome-lib/lib/Compactable"; // Including this will resolve Option as relative through the imports of compactable
// @filename: /project/node_modules/troublesome-lib/package.json
{
    "name": "troublesome-lib",
    "version": "1.17.1"
}
// @filename: /project/node_modules/troublesome-lib/lib/Compactable.d.ts
import { Option } from './Option';
export class Compactable {
    option: Option;
}
// @filename: /project/node_modules/troublesome-lib/lib/Option.d.ts
export class Option {
    someProperty: string;
}
// @filename: /project/src/app.ts
import * as t from "anotherLib"; // Include the lib that recursively includes option as relative module resolution in this directory
import { makeSharedOption } from "@shared/lib/app"; // Includes option as module in shared folder but as module in node_modules folder

// @filename: /project/tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@shared/*": ["../shared/*"]
        }
    },
   //"files": ["src/app.ts"]
}