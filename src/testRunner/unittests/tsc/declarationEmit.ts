import { TestFSWithWatch, emptyArray, stringContains } from "../../ts";
import { verifyTscWatch, createWatchedSystem, projectRoot, libFile } from "../../ts.tscWatch";
import { dedent } from "../../Utils";
describe("unittests:: tsc:: declarationEmit::", () => {
    interface VerifyDeclarationEmitInput {
        subScenario: string;
        files: TestFSWithWatch.FileOrFolderOrSymLink[];
        rootProject: string;
        changeCaseFileTestPath: (path: string) => boolean;
    }

    function changeCaseFile(file: TestFSWithWatch.FileOrFolderOrSymLink, testPath: (path: string) => boolean, replacePath: (path: string) => string): TestFSWithWatch.FileOrFolderOrSymLink {
        return !TestFSWithWatch.isSymLink(file) || !testPath(file.symLink) ?
            testPath(file.path) ? { ...file, path: replacePath(file.path) } : file :
            { path: testPath(file.path) ? replacePath(file.path) : file.path, symLink: replacePath(file.symLink) };
    }

    function verifyDeclarationEmit({ subScenario, files, rootProject, changeCaseFileTestPath }: VerifyDeclarationEmitInput) {
        describe(subScenario, () => {
            verifyTscWatch({
                scenario: "declarationEmit",
                subScenario,
                sys: () => createWatchedSystem(files, { currentDirectory: projectRoot }),
                commandLineArgs: ["-p", rootProject, "--explainFiles"],
                changes: emptyArray
            });
        });

        const caseChangeScenario = `${subScenario} moduleCaseChange`;
        describe(caseChangeScenario, () => {
            verifyTscWatch({
                scenario: "declarationEmit",
                subScenario: caseChangeScenario,
                sys: () => createWatchedSystem(files.map(f => changeCaseFile(f, changeCaseFileTestPath, str => str.replace("myproject", "myProject"))), { currentDirectory: projectRoot }),
                commandLineArgs: ["-p", rootProject, "--explainFiles"],
                changes: emptyArray
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
            return dedent `
                    import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
                    const action = actionCreatorFactory("somekey");
                    const featureOne = action<{ route: string }>("feature-one");
                    export const actions = { featureOne };`;
        }
        function pluginTwoDts() {
            return dedent `
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
            return dedent `
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
                { path: `${projectRoot}/plugin-two/index.d.ts`, content: pluginTwoDts() },
                { path: `${projectRoot}/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${projectRoot}/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${projectRoot}/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                { path: `${projectRoot}/plugin-one/index.ts`, content: pluginOneIndex() },
                { path: `${projectRoot}/plugin-one/action.ts`, content: pluginOneAction() },
                { path: `${projectRoot}/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${projectRoot}/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${projectRoot}/plugin-one/node_modules/plugin-two`, symLink: `${projectRoot}/plugin-two` },
                libFile
            ],
            changeCaseFileTestPath: str => stringContains(str, "/plugin-two"),
        });

        verifyDeclarationEmit({
            subScenario: "when same version is referenced through source and another symlinked package with indirect link",
            rootProject: "plugin-one",
            files: [
                {
                    path: `${projectRoot}/plugin-two/package.json`,
                    content: JSON.stringify({
                        name: "plugin-two",
                        version: "0.1.3",
                        main: "dist/commonjs/index.js"
                    })
                },
                { path: `${projectRoot}/plugin-two/dist/commonjs/index.d.ts`, content: pluginTwoDts() },
                { path: `${projectRoot}/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${projectRoot}/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `${projectRoot}/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                {
                    path: `${projectRoot}/plugin-one/index.ts`,
                    content: `${pluginOneIndex()}
${pluginOneAction()}`
                },
                { path: `${projectRoot}/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                { path: `${projectRoot}/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                { path: `/temp/yarn/data/link/plugin-two`, symLink: `${projectRoot}/plugin-two` },
                { path: `${projectRoot}/plugin-one/node_modules/plugin-two`, symLink: `/temp/yarn/data/link/plugin-two` },
                libFile
            ],
            changeCaseFileTestPath: str => stringContains(str, "/plugin-two"),
        });
    });

    verifyDeclarationEmit({
        subScenario: "when pkg references sibling package through indirect symlink",
        rootProject: "pkg3",
        files: [
            {
                path: `${projectRoot}/pkg1/dist/index.d.ts`,
                content: dedent `
                            export * from './types';`
            },
            {
                path: `${projectRoot}/pkg1/dist/types.d.ts`,
                content: dedent `
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
                path: `${projectRoot}/pkg1/package.json`,
                content: JSON.stringify({
                    name: "@raymondfeng/pkg1",
                    version: "1.0.0",
                    main: "dist/index.js",
                    typings: "dist/index.d.ts"
                })
            },
            {
                path: `${projectRoot}/pkg2/dist/index.d.ts`,
                content: dedent `
                            export * from './types';`
            },
            {
                path: `${projectRoot}/pkg2/dist/types.d.ts`,
                content: dedent `
                            export {MetadataAccessor} from '@raymondfeng/pkg1';`
            },
            {
                path: `${projectRoot}/pkg2/package.json`,
                content: JSON.stringify({
                    name: "@raymondfeng/pkg2",
                    version: "1.0.0",
                    main: "dist/index.js",
                    typings: "dist/index.d.ts"
                })
            },
            {
                path: `${projectRoot}/pkg3/src/index.ts`,
                content: dedent `
                            export * from './keys';`
            },
            {
                path: `${projectRoot}/pkg3/src/keys.ts`,
                content: dedent `
                            import {MetadataAccessor} from "@raymondfeng/pkg2";
                            export const ADMIN = MetadataAccessor.create<boolean>('1');`
            },
            {
                path: `${projectRoot}/pkg3/tsconfig.json`,
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
                path: `${projectRoot}/pkg2/node_modules/@raymondfeng/pkg1`,
                symLink: `${projectRoot}/pkg1`
            },
            {
                path: `${projectRoot}/pkg3/node_modules/@raymondfeng/pkg2`,
                symLink: `${projectRoot}/pkg2`
            },
            libFile
        ],
        changeCaseFileTestPath: str => stringContains(str, "/pkg1"),
    });
});
