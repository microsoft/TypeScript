import {
    dedent,
} from "../../_namespaces/Utils";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    appendText,
    loadProjectFromFiles,
    replaceText,
} from "../helpers/vfs";

describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
    let projFs: vfs.FileSystem;
    before(() => {
        projFs = loadProjectFromFiles({
            "/src/bar.ts": dedent`
                interface RawAction {
                    (...args: any[]): Promise<any> | void;
                }
                interface ActionFactory {
                    <T extends RawAction>(target: T): T;
                }
                declare function foo<U extends any[] = any[]>(): ActionFactory;
                export default foo()(function foobar(param: string): void {
                });
            `,
            "/src/bundling.ts": dedent`
                export class LazyModule<TModule> {
                    constructor(private importCallback: () => Promise<TModule>) {}
                }

                export class LazyAction<
                    TAction extends (...args: any[]) => any,
                    TModule
                >  {
                    constructor(_lazyModule: LazyModule<TModule>, _getter: (module: TModule) => TAction) {
                    }
                }
            `,
            "/src/global.d.ts": dedent`
                interface PromiseConstructor {
                    new <T>(): Promise<T>;
                }
                declare var Promise: PromiseConstructor;
                interface Promise<T> {
                }
            `,
            "/src/index.ts": dedent`
                import { LazyAction, LazyModule } from './bundling';
                const lazyModule = new LazyModule(() =>
                    import('./lazyIndex')
                );
                export const lazyBar = new LazyAction(lazyModule, m => m.bar);
            `,
            "/src/lazyIndex.ts": dedent`
                export { default as bar } from './bar';
            `,
            "/src/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    declaration: true,
                    outDir: "obj",
                    incremental: true,
                },
            }),
        });
    });
    after(() => {
        projFs = undefined!;
    });

    verifyTsc({
        scenario: "inferredTypeFromTransitiveModule",
        subScenario: "inferred type from transitive module",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src", "--verbose"],
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
        ],
    });

    verifyTsc({
        subScenario: "inferred type from transitive module with isolatedModules",
        fs: () => projFs,
        scenario: "inferredTypeFromTransitiveModule",
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: changeToIsolatedModules,
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
        ],
    });

    verifyTsc({
        scenario: "inferredTypeFromTransitiveModule",
        subScenario: "reports errors in files affected by change in signature with isolatedModules",
        fs: () => projFs,
        commandLineArgs: ["--b", "/src", "--verbose"],
        modifyFs: fs => {
            changeToIsolatedModules(fs);
            appendText(
                fs,
                "/src/lazyIndex.ts",
                `
import { default as bar } from './bar';
bar("hello");`,
            );
        },
        edits: [
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParamBack,
            },
            {
                caption: "incremental-declaration-changes",
                edit: changeBarParam,
            },
            {
                caption: "Fix Error",
                edit: fs => replaceText(fs, "/src/lazyIndex.ts", `bar("hello")`, "bar()"),
            },
        ],
    });
});

function changeToIsolatedModules(fs: vfs.FileSystem) {
    replaceText(fs, "/src/tsconfig.json", `"incremental": true`, `"incremental": true, "isolatedModules": true`);
}

function changeBarParam(fs: vfs.FileSystem) {
    replaceText(fs, "/src/bar.ts", "param: string", "");
}

function changeBarParamBack(fs: vfs.FileSystem) {
    replaceText(fs, "/src/bar.ts", "foobar()", "foobar(param: string)");
}
