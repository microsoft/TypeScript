import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { forEachDeclarationEmitWithErrorsScenario } from "../helpers/declarationEmit.js";
import {
    noChangeRun,
    verifyTsc,
} from "../helpers/tsc.js";
import {
    FileOrFolderOrSymLink,
    isSymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tsc:: declarationEmit::", () => {
    describe("with casing changes", () => {
        interface VerifyDeclarationEmitInput {
            subScenario: string;
            files: FileOrFolderOrSymLink[];
            rootProject: string;
            changeCaseFileTestPath: (path: string) => boolean;
        }

        function changeCaseFile(file: FileOrFolderOrSymLink, testPath: (path: string) => boolean, replacePath: (path: string) => string): FileOrFolderOrSymLink {
            return !isSymLink(file) || !testPath(file.symLink) ?
                testPath(file.path) ? { ...file, path: replacePath(file.path) } : file :
                { path: testPath(file.path) ? replacePath(file.path) : file.path, symLink: replacePath(file.symLink) };
        }

        function verifyDeclarationEmit({ subScenario, files, rootProject, changeCaseFileTestPath }: VerifyDeclarationEmitInput) {
            describe(subScenario, () => {
                verifyTsc({
                    scenario: "declarationEmit",
                    subScenario,
                    sys: () => TestServerHost.createWatchedSystem(files, { currentDirectory: "/user/username/projects/myproject" }),
                    commandLineArgs: ["-p", rootProject, "--explainFiles"],
                });
            });

            const caseChangeScenario = `${subScenario} moduleCaseChange`;
            describe(caseChangeScenario, () => {
                verifyTsc({
                    scenario: "declarationEmit",
                    subScenario: caseChangeScenario,
                    sys: () =>
                        TestServerHost.createWatchedSystem(
                            files.map(f => changeCaseFile(f, changeCaseFileTestPath, str => str.replace("myproject", "myProject"))),
                            { currentDirectory: "/user/username/projects/myproject" },
                        ),
                    commandLineArgs: ["-p", rootProject, "--explainFiles"],
                });
            });
        }

        describe("with symlinks in sibling folders and common package referenced from both folders", () => {
            function pluginOneConfig() {
                return jsonToReadableText({
                    compilerOptions: {
                        target: "es5",
                        declaration: true,
                        traceResolution: true,
                    },
                });
            }
            function pluginOneIndex() {
                return `import pluginTwo from "plugin-two"; // include this to add reference to symlink`;
            }
            function pluginOneAction() {
                return dedent`
                    import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
                    const action = actionCreatorFactory("somekey");
                    const featureOne = action<{ route: string }>("feature-one");
                    export const actions = { featureOne };`;
            }
            function pluginTwoDts() {
                return dedent`
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
                return jsonToReadableText({
                    name: "typescript-fsa",
                    version: "3.0.0-beta-2",
                });
            }
            function fsaIndex() {
                return dedent`
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
                    { path: `/user/username/projects/myproject/plugin-two/index.d.ts`, content: pluginTwoDts() },
                    { path: `/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                    { path: `/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                    { path: `/user/username/projects/myproject/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                    { path: `/user/username/projects/myproject/plugin-one/index.ts`, content: pluginOneIndex() },
                    { path: `/user/username/projects/myproject/plugin-one/action.ts`, content: pluginOneAction() },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/plugin-two`, symLink: `/user/username/projects/myproject/plugin-two` },
                ],
                changeCaseFileTestPath: str => str.includes("/plugin-two"),
            });

            verifyDeclarationEmit({
                subScenario: "when same version is referenced through source and another symlinked package with indirect link",
                rootProject: "plugin-one",
                files: [
                    {
                        path: `/user/username/projects/myproject/plugin-two/package.json`,
                        content: jsonToReadableText({
                            name: "plugin-two",
                            version: "0.1.3",
                            main: "dist/commonjs/index.js",
                        }),
                    },
                    { path: `/user/username/projects/myproject/plugin-two/dist/commonjs/index.d.ts`, content: pluginTwoDts() },
                    { path: `/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                    { path: `/user/username/projects/myproject/plugin-two/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                    { path: `/user/username/projects/myproject/plugin-one/tsconfig.json`, content: pluginOneConfig() },
                    {
                        path: `/user/username/projects/myproject/plugin-one/index.ts`,
                        content: `${pluginOneIndex()}
${pluginOneAction()}`,
                    },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/package.json`, content: fsaPackageJson() },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/typescript-fsa/index.d.ts`, content: fsaIndex() },
                    { path: `/temp/yarn/data/link/plugin-two`, symLink: `/user/username/projects/myproject/plugin-two` },
                    { path: `/user/username/projects/myproject/plugin-one/node_modules/plugin-two`, symLink: `/temp/yarn/data/link/plugin-two` },
                ],
                changeCaseFileTestPath: str => str.includes("/plugin-two"),
            });
        });

        verifyDeclarationEmit({
            subScenario: "when pkg references sibling package through indirect symlink",
            rootProject: "pkg3",
            files: [
                {
                    path: `/user/username/projects/myproject/pkg1/dist/index.d.ts`,
                    content: dedent`
                            export * from './types';`,
                },
                {
                    path: `/user/username/projects/myproject/pkg1/dist/types.d.ts`,
                    content: dedent`
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
                            }`,
                },
                {
                    path: `/user/username/projects/myproject/pkg1/package.json`,
                    content: jsonToReadableText({
                        name: "@raymondfeng/pkg1",
                        version: "1.0.0",
                        main: "dist/index.js",
                        typings: "dist/index.d.ts",
                    }),
                },
                {
                    path: `/user/username/projects/myproject/pkg2/dist/index.d.ts`,
                    content: dedent`
                            export * from './types';`,
                },
                {
                    path: `/user/username/projects/myproject/pkg2/dist/types.d.ts`,
                    content: dedent`
                            export {MetadataAccessor} from '@raymondfeng/pkg1';`,
                },
                {
                    path: `/user/username/projects/myproject/pkg2/package.json`,
                    content: jsonToReadableText({
                        name: "@raymondfeng/pkg2",
                        version: "1.0.0",
                        main: "dist/index.js",
                        typings: "dist/index.d.ts",
                    }),
                },
                {
                    path: `/user/username/projects/myproject/pkg3/src/index.ts`,
                    content: dedent`
                            export * from './keys';`,
                },
                {
                    path: `/user/username/projects/myproject/pkg3/src/keys.ts`,
                    content: dedent`
                            import {MetadataAccessor} from "@raymondfeng/pkg2";
                            export const ADMIN = MetadataAccessor.create<boolean>('1');`,
                },
                {
                    path: `/user/username/projects/myproject/pkg3/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            outDir: "dist",
                            rootDir: "src",
                            target: "es5",
                            module: "commonjs",
                            strict: true,
                            esModuleInterop: true,
                            declaration: true,
                        },
                    }),
                },
                {
                    path: `/user/username/projects/myproject/pkg2/node_modules/@raymondfeng/pkg1`,
                    symLink: `/user/username/projects/myproject/pkg1`,
                },
                {
                    path: `/user/username/projects/myproject/pkg3/node_modules/@raymondfeng/pkg2`,
                    symLink: `/user/username/projects/myproject/pkg2`,
                },
            ],
            changeCaseFileTestPath: str => str.includes("/pkg1"),
        });
    });

    verifyTsc({
        scenario: "declarationEmit",
        subScenario: "when using Windows paths and uppercase letters",
        sys: () =>
            TestServerHost.createWatchedSystem([
                {
                    path: `D:\\Work\\pkg1\\package.json`,
                    content: jsonToReadableText({
                        name: "ts-specifier-bug",
                        version: "1.0.0",
                        description: "",
                        main: "index.js",
                        scripts: {
                            build: "tsc",
                        },
                        keywords: [],
                        author: "",
                        license: "ISC",
                        dependencies: {
                            typescript: "5.4.0-dev.20231222",
                        },
                    }),
                },
                {
                    path: `D:\\Work\\pkg1\\tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            module: "commonjs",
                            declaration: true,
                            removeComments: true,
                            emitDecoratorMetadata: true,
                            experimentalDecorators: true,
                            strictPropertyInitialization: false,
                            allowSyntheticDefaultImports: true,
                            target: "es2017",
                            sourceMap: true,
                            esModuleInterop: true,
                            outDir: "./dist",
                            baseUrl: "./",
                            skipLibCheck: true,
                            strictNullChecks: false,
                            noImplicitAny: false,
                            strictBindCallApply: false,
                            forceConsistentCasingInFileNames: false,
                            noFallthroughCasesInSwitch: false,
                            moduleResolution: "node",
                            resolveJsonModule: true,
                        },
                        include: ["src"],
                    }),
                },
                {
                    path: `D:\\Work\\pkg1\\src\\main.ts`,
                    content: dedent`
                    import { PartialType } from './utils';

                    class Common {}
                    
                    export class Sub extends PartialType(Common) {
                        id: string;
                    }
                `,
                },
                {
                    path: `D:\\Work\\pkg1\\src\\utils\\index.ts`,
                    content: dedent`
                    import { MyType, MyReturnType } from './type-helpers';

                    export function PartialType<T>(classRef: MyType<T>) {
                        abstract class PartialClassType {
                            constructor() {}
                        }
                    
                        return PartialClassType as MyReturnType;
                    }
                `,
                },
                {
                    path: `D:\\Work\\pkg1\\src\\utils\\type-helpers.ts`,
                    content: dedent`
                    export type MyReturnType = {
                        new (...args: any[]): any;
                    };
                  
                    export interface MyType<T = any> extends Function {
                        new (...args: any[]): T;
                    }
                `,
                },
            ], { currentDirectory: "D:\\Work\\pkg1", windowsStyleRoot: "D:/" }),
        commandLineArgs: ["-p", "D:\\Work\\pkg1", "--explainFiles"],
    });

    forEachDeclarationEmitWithErrorsScenario((scenarioName, sys) => {
        verifyTsc({
            scenario: "declarationEmit",
            subScenario: scenarioName("reports dts generation errors"),
            commandLineArgs: ["--explainFiles", "--listEmittedFiles"],
            sys,
            edits: [
                noChangeRun,
                {
                    ...noChangeRun,
                    commandLineArgs: ["-b", "--explainFiles", "--listEmittedFiles", "-v"],
                },
            ],
        });
    }, /*withComposite*/ true);
});
