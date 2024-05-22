import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import {
    FsContents,
    libContent,
} from "./contents.js";
import { libFile } from "./virtualFileSystemWithWatch.js";

export function getFsContentsForMultipleErrorsForceConsistentCasingInFileNames(): FsContents {
    return {
        "/home/src/projects/project/src/struct.d.ts": dedent`
            import * as xs1 from "fp-ts/lib/Struct";
            import * as xs2 from "fp-ts/lib/struct";
            import * as xs3 from "./Struct";
            import * as xs4 from "./struct";
        `,
        "/home/src/projects/project/src/anotherFile.ts": dedent`
            import * as xs1 from "fp-ts/lib/Struct";
            import * as xs2 from "fp-ts/lib/struct";
            import * as xs3 from "./Struct";
            import * as xs4 from "./struct";
        `,
        "/home/src/projects/project/src/oneMore.ts": dedent`
            import * as xs1 from "fp-ts/lib/Struct";
            import * as xs2 from "fp-ts/lib/struct";
            import * as xs3 from "./Struct";
            import * as xs4 from "./struct";
        `,
        "/home/src/projects/project/tsconfig.json": jsonToReadableText({}),
        "/home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts": `export function foo(): void`,
        [libFile.path]: libContent,
    };
}
