namespace ts {
    describe("unittests:: tsc:: declarationEmit::", () => {
        verifyTsc({
            scenario: "declarationEmit",
            subScenario: "when same version is referenced through source and another symlinked package",
            fs: () => {
                const fsaPackageJson = Utils.dedent`
                    {
                        "name": "typescript-fsa",
                        "version": "3.0.0-beta-2"
                    }`;
                const fsaIndex = Utils.dedent`
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
                return loadProjectFromFiles({
                    "/src/plugin-two/index.d.ts": Utils.dedent`
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
                        export default _default;`,
                    "/src/plugin-two/node_modules/typescript-fsa/package.json": fsaPackageJson,
                    "/src/plugin-two/node_modules/typescript-fsa/index.d.ts": fsaIndex,
                    "/src/plugin-one/tsconfig.json": Utils.dedent`
                        {
                            "compilerOptions": {
                                "target": "es5",
                                "declaration": true,
                            },
                        }`,
                    "/src/plugin-one/index.ts": Utils.dedent`
                        import pluginTwo from "plugin-two"; // include this to add reference to symlink`,
                    "/src/plugin-one/action.ts": Utils.dedent`
                        import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
                        const action = actionCreatorFactory("somekey");
                        const featureOne = action<{ route: string }>("feature-one");
                        export const actions = { featureOne };`,
                    "/src/plugin-one/node_modules/typescript-fsa/package.json": fsaPackageJson,
                    "/src/plugin-one/node_modules/typescript-fsa/index.d.ts": fsaIndex,
                    "/src/plugin-one/node_modules/plugin-two": new vfs.Symlink("/src/plugin-two"),
                });
            },
            commandLineArgs: ["-p", "src/plugin-one", "--listFiles"]
        });

        verifyTsc({
            scenario: "declarationEmit",
            subScenario: "when pkg references sibling package through indirect symlink",
            fs: () => loadProjectFromFiles({
                "/src/pkg1/dist/index.d.ts": Utils.dedent`
                        export * from './types';`,
                "/src/pkg1/dist/types.d.ts": Utils.dedent`
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
                "/src/pkg1/package.json": Utils.dedent`
                        {
                            "name": "@raymondfeng/pkg1",
                            "version": "1.0.0",
                            "description": "",
                            "main": "dist/index.js",
                            "typings": "dist/index.d.ts"
                        }`,
                "/src/pkg2/dist/index.d.ts": Utils.dedent`
                        export * from './types';`,
                "/src/pkg2/dist/types.d.ts": Utils.dedent`
                        export {MetadataAccessor} from '@raymondfeng/pkg1';`,
                "/src/pkg2/package.json": Utils.dedent`
                        {
                            "name": "@raymondfeng/pkg2",
                            "version": "1.0.0",
                            "description": "",
                            "main": "dist/index.js",
                            "typings": "dist/index.d.ts"
                        }`,
                "/src/pkg3/src/index.ts": Utils.dedent`
                        export * from './keys';`,
                "/src/pkg3/src/keys.ts": Utils.dedent`
                        import {MetadataAccessor} from "@raymondfeng/pkg2";
                        export const ADMIN = MetadataAccessor.create<boolean>('1');`,
                "/src/pkg3/tsconfig.json": Utils.dedent`
                        {
                            "compilerOptions": {
                              "outDir": "dist",
                              "rootDir": "src",
                              "target": "es5",
                              "module": "commonjs",
                              "strict": true,
                              "esModuleInterop": true,
                              "declaration": true
                            }
                        }`,
                "/src/pkg2/node_modules/@raymondfeng/pkg1": new vfs.Symlink("/src/pkg1"),
                "/src/pkg3/node_modules/@raymondfeng/pkg2": new vfs.Symlink("/src/pkg2"),
            }),
            commandLineArgs: ["-p", "src/pkg3", "--listFiles"]
        });
    });
}
