import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsbuild:: inferredTypeFromTransitiveModule::", () => {
    function getInferredTypeFromTransitiveModuleSys() {
        return TestServerHost.createWatchedSystem({
            "/home/src/workspaces/project/bar.ts": dedent`
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
            "/home/src/workspaces/project/bundling.ts": dedent`
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
            "/home/src/workspaces/project/global.d.ts": dedent`
                interface PromiseConstructor {
                    new <T>(): Promise<T>;
                }
                declare var Promise: PromiseConstructor;
                interface Promise<T> {
                }
            `,
            "/home/src/workspaces/project/index.ts": dedent`
                import { LazyAction, LazyModule } from './bundling';
                const lazyModule = new LazyModule(() =>
                    import('./lazyIndex')
                );
                export const lazyBar = new LazyAction(lazyModule, m => m.bar);
            `,
            "/home/src/workspaces/project/lazyIndex.ts": dedent`
                export { default as bar } from './bar';
            `,
            "/home/src/workspaces/project/tsconfig.json": jsonToReadableText({
                compilerOptions: {
                    target: "es5",
                    declaration: true,
                    outDir: "obj",
                    incremental: true,
                },
            }),
        });
    }

    verifyTsc({
        scenario: "inferredTypeFromTransitiveModule",
        subScenario: "inferred type from transitive module",
        sys: getInferredTypeFromTransitiveModuleSys,
        commandLineArgs: ["--b", "--verbose"],
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
        sys: getInferredTypeFromTransitiveModuleSys,
        scenario: "inferredTypeFromTransitiveModule",
        commandLineArgs: ["--b", "--verbose"],
        modifySystem: changeToIsolatedModules,
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
        sys: getInferredTypeFromTransitiveModuleSys,
        commandLineArgs: ["--b", "--verbose"],
        modifySystem: sys => {
            changeToIsolatedModules(sys);
            sys.appendFile(
                "/home/src/workspaces/project/lazyIndex.ts",
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
                edit: sys => sys.replaceFileText("/home/src/workspaces/project/lazyIndex.ts", `bar("hello")`, "bar()"),
            },
        ],
    });
});

function changeToIsolatedModules(sys: TestServerHost) {
    sys.replaceFileText("/home/src/workspaces/project/tsconfig.json", `"incremental": true`, `"incremental": true, "isolatedModules": true`);
}

function changeBarParam(sys: TestServerHost) {
    sys.replaceFileText("/home/src/workspaces/project/bar.ts", "param: string", "");
}

function changeBarParamBack(sys: TestServerHost) {
    sys.replaceFileText("/home/src/workspaces/project/bar.ts", "foobar()", "foobar(param: string)");
}
