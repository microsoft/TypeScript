namespace ts {
    describe("unittests:: tsc:: declarationEmit::", () => {
        verifyTsc({
            scenario: "declarationEmit",
            subScenario: "when same version is referenced through source and another symlinked package",
            fs: () => {
                const fsaPackageJson = utils.dedent`
                    {
                        "name": "typescript-fsa",
                        "version": "3.0.0-beta-2"
                    }`;
                const fsaIndex = utils.dedent`
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
                    "/plugin-two/index.d.ts": utils.dedent`
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
                    "/plugin-two/node_modules/typescript-fsa/package.json": fsaPackageJson,
                    "/plugin-two/node_modules/typescript-fsa/index.d.ts": fsaIndex,
                    "/plugin-one/tsconfig.json": utils.dedent`
                        {
                            "compilerOptions": {
                                "target": "es5",
                                "declaration": true,
                            },
                        }`,
                    "/plugin-one/index.ts": utils.dedent`
                        import pluginTwo from "plugin-two"; // include this to add reference to symlink`,
                    "/plugin-one/action.ts": utils.dedent`
                        import { actionCreatorFactory } from "typescript-fsa"; // Include version of shared lib
                        const action = actionCreatorFactory("somekey");
                        const featureOne = action<{ route: string }>("feature-one");
                        export const actions = { featureOne };`,
                    "/plugin-one/node_modules/typescript-fsa/package.json": fsaPackageJson,
                    "/plugin-one/node_modules/typescript-fsa/index.d.ts": fsaIndex,
                    "/plugin-one/node_modules/plugin-two": new vfs.Symlink("/plugin-two"),
                });
            },
            commandLineArgs: ["-p", "plugin-one"]
        });
    });
}
