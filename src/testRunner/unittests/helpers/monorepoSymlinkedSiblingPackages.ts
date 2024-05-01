import { dedent } from "../../_namespaces/Utils";
import { jsonToReadableText } from "../helpers";
import { libContent } from "./contents";
import { solutionBuildWithBaseline } from "./solutionBuilder";
import {
    createServerHost,
    createWatchedSystem,
    TestServerHost,
    TestServerHostOsFlavor,
} from "./virtualFileSystemWithWatch";

export function getMonorepoSymlinkedSiblingPackagesSys(forTsserver: boolean, built: boolean, osFlavor?: TestServerHostOsFlavor): TestServerHost {
    const configText = jsonToReadableText({
        compilerOptions: {
            target: "es2016",
            module: "commonjs",
            rootDir: "./src",
            declaration: true,
            outDir: "./dist",
            esModuleInterop: true,
            forceConsistentCasingInFileNames: true,
            strict: true,
            skipLibCheck: true,
            traceResolution: true,
        },
        exclude: [
            "tests/**/*",
            "dist/**/*",
        ],
    });
    const sys = (!forTsserver ? createWatchedSystem : createServerHost)({
        "/home/src/projects/project/packages/package1/package.json": getPackageJson("package1"),
        "/home/src/projects/project/packages/package1/tsconfig.json": configText,
        "/home/src/projects/project/packages/package1/src/index.ts": dedent`
            export type FooType = "foo";
            export type BarType = "bar";
        `,
        "/home/src/projects/project/packages/package2/package.json": getPackageJson("package2"),
        "/home/src/projects/project/packages/package2/tsconfig.json": configText,
        "/home/src/projects/project/packages/package2/src/index.ts": dedent`
            import { FooType, BarType } from "package1"
            type MyFooType = FooType;
            type MyBarType = BarType;
        `,
        "/home/src/projects/project/node_modules/package1": { symLink: "/home/src/projects/project/packages/package1" },
        "/a/lib/lib.es2016.full.d.ts": libContent,
    }, { currentDirectory: "/home/src/projects/project", osFlavor });
    if (built) buildMonorepoSymlinkedSiblingPackage1(sys);
    return sys;
}

function getPackageJson(packageName: string) {
    return jsonToReadableText({
        name: packageName,
        version: "1.0.0",
        main: "dist/index.js",
    });
}

export function buildMonorepoSymlinkedSiblingPackage1(host: TestServerHost) {
    solutionBuildWithBaseline(host, ["packages/package1"]);
}

export function cleanMonorepoSymlinkedSiblingPackage1(host: TestServerHost) {
    host.deleteFolder("/home/src/projects/project/packages/package1/dist", /*recursive*/ true);
}
