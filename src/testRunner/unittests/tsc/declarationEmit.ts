import * as ts from "../../_namespaces/ts";
import * as Utils from "../../_namespaces/Utils";

describe("unittests:: tsc:: declarationEmit::", () => {
    interface VerifyDeclarationEmitInput {
        subScenario: string;
        files: ts.TestFSWithWatch.FileOrFolderOrSymLink[];
        rootProject: string;
        changeCaseFileTestPath: (path: string) => boolean;
    }

    function changeCaseFile(file: ts.TestFSWithWatch.FileOrFolderOrSymLink, testPath: (path: string) => boolean, replacePath: (path: string) => string): ts.TestFSWithWatch.FileOrFolderOrSymLink {
        return !ts.TestFSWithWatch.isSymLink(file) || !testPath(file.symLink) ?
            testPath(file.path) ? { ...file, path: replacePath(file.path) } : file :
            { path: testPath(file.path) ? replacePath(file.path) : file.path, symLink: replacePath(file.symLink) };
    }

    function verifyDeclarationEmit({ subScenario, files, rootProject, changeCaseFileTestPath }: VerifyDeclarationEmitInput) {
        describe(subScenario, () => {
            ts.tscWatch.verifyTscWatch({
                scenario: "declarationEmit",
                subScenario,
                sys: () => ts.tscWatch.createWatchedSystem(files, { currentDirectory: ts.tscWatch.projectRoot }),
                commandLineArgs: ["-p", rootProject, "--explainFiles"],
                changes: ts.emptyArray
            });
        });

        const caseChangeScenario = `${subScenario} moduleCaseChange`;
        describe(caseChangeScenario, () => {
            ts.tscWatch.verifyTscWatch({
                scenario: "declarationEmit",
                subScenario: caseChangeScenario,
                sys: () => ts.tscWatch.createWatchedSystem(
                    files.map(f => changeCaseFile(f, changeCaseFileTestPath, str => str.replace("myproject", "myProject"))),
                    { currentDirectory: ts.tscWatch.projectRoot }
                ),
                commandLineArgs: ["-p", rootProject, "--explainFiles"],
                changes: ts.emptyArray
            });
        });
    }

    describe("with symlinks in sibling folders and common package referenced from both folders", () => {
        function pluginOneConfig() {
            return JSON.stringify({
                compilerOptions: {
                    target: "es5",
                    declaration: true,
                    traceResolution: true
                },
            });
        }
        function pluginOneIndex() {
            return `import pluginTwo from "plugin-two"; // include this to add reference to symlink`;
        }
        function pluginOneAction() {
            return Utils.dedent`
                    import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
                    const action = actionCreatorFactory("somekey");
                    const featureOne = action<{ route: string }>("feature-one");
                    export const actions = { featureOne };`;
        }
        function pluginTwoDts() {
            return Utils.dedent`
                    declare const _default: {
                        features: {
                            featureOne: {
                                actions: {
                                    featureOne: {
                                        (payload: {
                                            name: string;
                                            order: number;
                                        }, meta?: {
                                            [key: string]: any;
                                        }): import("typescript-fsa").Action<{
                                            name: string;
                                            order: number;
                                        }>;
                                    };
                                };
                                path: string;
                            };
                        };
                    };
                    export default _default;`;
        }
        function fsaPackageJson() {
            return JSON.stringify({
                name: "typescript-fsa",
                version: "3.0.0-beta-2"
            });
        }
        function fsaIndex() {
            return Utils.dedent`
                    export interface Action<Payload> {
                        type: string;
                        payload: Payload;
                    }
                    export declare type ActionCreator<Payload> = {
                        type: string;
                        (payload: Payload): Action<Payload>;
                    }
                    export interface ActionCreatorFactory {
                        <Payload = void>(type: string): ActionCreator<Payload>;
                    }
                    export declare function actionCreatorFactory(prefix?: string | null): ActionCreatorFactory;
                    export default actionCreatorFactory;`;
        }

        verifyDeclarationEmit({
            subScenario: "when same version is referenced through source and another symlinked package",
            rootProject: "plugin-one",
            files: [
                { path: `${ts.tscWatch.projectRoot}/plugin-two/index.d.ts`, content: pluginTwoDts() },
                { path: `${ts.tscWatch.projectRoot}/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${ts.tscWatch.projectRoot}/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/index.ts`, content: pluginOneIndex() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/action.ts`, content: pluginOneAction() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/plugin-two`, symLink: `${ts.tscWatch.projectRoot}/plugin-two` },
                ts.tscWatch.libFile
            ],
            changeCaseFileTestPath: str => ts.stringContains(str, "/plugin-two"),
        });

        verifyDeclarationEmit({
            subScenario: "when same version is referenced through source and another symlinked package with indirect link",
            rootProject: "plugin-one",
            files: [
                {
                    path: `${ts.tscWatch.projectRoot}/plugin-two/package.json`,
                    content: JSON.stringify({
                        name: "plugin-two",
                        version: "0.1.3",
                        main: "dist/commonjs/index.js"
                    })
                },
                { path: `${ts.tscWatch.projectRoot}/plugin-two/dist/commonjs/index.d.ts`, content: pluginTwoDts() },
                { path: `${ts.tscWatch.projectRoot}/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${ts.tscWatch.projectRoot}/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                {
                    path: `${ts.tscWatch.projectRoot}/plugin-one/index.ts`,
                    content: `${pluginOneIndex()}
${pluginOneAction()}`
                },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `/temp/yarn/data/link/plugin-two`, symLink: `${ts.tscWatch.projectRoot}/plugin-two` },
                { path: `${ts.tscWatch.projectRoot}/plugin-one/node_modules/plugin-two`, symLink: `/temp/yarn/data/link/plugin-two` },
                ts.tscWatch.libFile
            ],
            changeCaseFileTestPath: str => ts.stringContains(str, "/plugin-two"),
        });
    });

    verifyDeclarationEmit({
        subScenario: "when pkg references sibling package through indirect symlink",
        rootProject: "pkg3",
        files: [
            {
                path: `${ts.tscWatch.projectRoot}/pkg1/dist/index.d.ts`,
                content: Utils.dedent`
                            export * from './types';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg1/dist/types.d.ts`,
                content: Utils.dedent`
                            export declare type A = {
                                id: string;
                            };
                            export declare type B = {
                                id: number;
                            };
                            export declare type IdType = A | B;
                            export declare class MetadataAccessor<T, D extends IdType = IdType> {
                                readonly key: string;
                                private constructor();
                                toString(): string;
                                static create<T, D extends IdType = IdType>(key: string): MetadataAccessor<T, D>;
                            }`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg1/package.json`,
                content: JSON.stringify({
                    name: "@raymondfeng/pkg1",
                    version: "1.0.0",
                    main: "dist/index.js",
                    typings: "dist/index.d.ts"
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg2/dist/index.d.ts`,
                content: Utils.dedent`
                            export * from './types';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg2/dist/types.d.ts`,
                content: Utils.dedent`
                            export {MetadataAccessor} from '@raymondfeng/pkg1';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg2/package.json`,
                content: JSON.stringify({
                    name: "@raymondfeng/pkg2",
                    version: "1.0.0",
                    main: "dist/index.js",
                    typings: "dist/index.d.ts"
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg3/src/index.ts`,
                content: Utils.dedent`
                            export * from './keys';`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg3/src/keys.ts`,
                content: Utils.dedent`
                            import {MetadataAccessor} from "@raymondfeng/pkg2";
                            export const ADMIN = MetadataAccessor.create<boolean>('1');`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg3/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        outDir: "dist",
                        rootDir: "src",
                        target: "es5",
                        module: "commonjs",
                        strict: true,
                        esModuleInterop: true,
                        declaration: true
                    }
                })
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg2/node_modules/@raymondfeng/pkg1`,
                symLink: `${ts.tscWatch.projectRoot}/pkg1`
            },
            {
                path: `${ts.tscWatch.projectRoot}/pkg3/node_modules/@raymondfeng/pkg2`,
                symLink: `${ts.tscWatch.projectRoot}/pkg2`
            },
            ts.tscWatch.libFile
        ],
        changeCaseFileTestPath: str => ts.stringContains(str, "/pkg1"),
    });
});
