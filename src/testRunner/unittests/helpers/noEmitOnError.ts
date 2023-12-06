import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    FsContents,
    libContent,
} from "./contents";
import {
    loadProjectFromFiles,
} from "./vfs";
import {
    createWatchedSystem,
    libFile,
} from "./virtualFileSystemWithWatch";

export function getFsContentsForNoEmitOnError(): FsContents {
    return {
        "/user/username/projects/noEmitOnError/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                outDir: "./dev-build",
                noEmitOnError: true,
            },
        }),
        "/user/username/projects/noEmitOnError/shared/types/db.ts": dedent`
            export interface A {
                name: string;
            }
        `,
        "/user/username/projects/noEmitOnError/src/main.ts": dedent`
            import { A } from "../shared/types/db";
            const a = {
                lastName: 'sdsd'
            ;
        `,
        "/user/username/projects/noEmitOnError/src/other.ts": dedent`
            console.log("hi");
            export { }
        `,
        [libFile.path]: libContent,
    };
}

export function getFsForNoEmitOnError() {
    return loadProjectFromFiles(
        getFsContentsForNoEmitOnError(),
        {
            cwd: "/user/username/projects/noEmitOnError",
            executingFilePath: libFile.path,
        },
    );
}

export function getSysForNoEmitOnError() {
    return createWatchedSystem(
        getFsContentsForNoEmitOnError(),
        {
            currentDirectory: "/user/username/projects/noEmitOnError",
        },
    );
}
