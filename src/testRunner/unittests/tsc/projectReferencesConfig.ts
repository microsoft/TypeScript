import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { verifyTsc } from "../helpers/tsc.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

function emptyModule() {
    return "export { };";
}

/**
 * Produces the text of a source file which imports all of the
 * specified module names
 */
function moduleImporting(...names: string[]) {
    return names.map((n, i) => `import * as mod_${i} from "${n}"`).join("\r\n");
}

function getConfig({ references, options, config }: {
    references?: (string | ts.ProjectReference)[];
    options?: ts.CompilerOptions;
    config?: object;
} = {}) {
    return jsonToReadableText({
        compilerOptions: {
            composite: true,
            outDir: "bin",
            ...options,
        },
        references: references?.map(r => {
            if (typeof r === "string") {
                return { path: r };
            }
            return r;
        }) || [],
        ...config,
    });
}

describe("unittests:: tsc:: projectReferencesConfig:: project-references meta check", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "default setup was created correctly",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/primary/a.ts": emptyModule(),
                "/home/src/workspaces/project/secondary/tsconfig.json": getConfig({
                    references: ["../primary"],
                }),
                "/home/src/workspaces/project/secondary/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "primary/tsconfig.json"],
    });
});

/**
 * Validate that we enforce the basic settings constraints for referenced projects
 */
describe("unittests:: tsc:: projectReferencesConfig:: project-references constraint checking for settings", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when declaration = false",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig({
                    options: {
                        declaration: false,
                    },
                }),
                "/home/src/workspaces/project/primary/a.ts": emptyModule(),
            }),
        commandLineArgs: ["--p", "primary/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the referenced project doesnt have composite",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig({
                    options: {
                        composite: false,
                    },
                }),
                "/home/src/workspaces/project/primary/a.ts": emptyModule(),
                "/home/src/workspaces/project/reference/tsconfig.json": getConfig({
                    references: ["../primary"],
                    config: {
                        files: ["b.ts"],
                    },
                }),
                "/home/src/workspaces/project/reference/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "reference/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "does not error when the referenced project doesnt have composite if its a container project",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig({
                    options: {
                        composite: false,
                    },
                }),
                "/home/src/workspaces/project/primary/a.ts": emptyModule(),
                "/home/src/workspaces/project/reference/tsconfig.json": getConfig({
                    references: ["../primary"],
                    config: {
                        files: [],
                    },
                }),
                "/home/src/workspaces/project/reference/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "reference/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the file list is not exhaustive",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig({
                    config: {
                        files: ["a.ts"],
                    },
                }),
                "/home/src/workspaces/project/primary/a.ts": "import * as b from './b'",
                "/home/src/workspaces/project/primary/b.ts": "export {}",
            }),
        commandLineArgs: ["--p", "primary/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the referenced project doesnt exist",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/primary/tsconfig.json": getConfig({
                    references: ["../foo"],
                }),
                "/home/src/workspaces/project/primary/a.ts": emptyModule(),
            }),
        commandLineArgs: ["--p", "primary/tsconfig.json"],
    });
});

/**
 * Path mapping behavior
 */
describe("unittests:: tsc:: projectReferencesConfig:: project-references path mapping", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "redirects to the output dts file",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/alpha/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/alpha/a.ts": "export const m: number = 3;",
                "/home/src/workspaces/project/alpha/bin/a.d.ts": emptyModule(),
                "/home/src/workspaces/project/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                }),
                "/home/src/workspaces/project/beta/b.ts": "import { m } from '../alpha/a'",
            }),
        commandLineArgs: ["--p", "beta/tsconfig.json", "--explainFiles"],
    });
});

describe("unittests:: tsc:: projectReferencesConfig:: project-references nice-behavior", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "issues a nice error when the input file is missing",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/alpha/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/alpha/a.ts": "export const m: number = 3;",
                "/home/src/workspaces/project/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                }),
                "/home/src/workspaces/project/beta/b.ts": "import { m } from '../alpha/a'",
            }),
        commandLineArgs: ["--p", "beta/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "issues a nice error when the input file is missing when module reference is not relative",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/alpha/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/alpha/a.ts": "export const m: number = 3;",
                "/home/src/workspaces/project/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                    options: {
                        baseUrl: "./",
                        paths: {
                            "@alpha/*": ["/home/src/workspaces/project/alpha/*"],
                        },
                    },
                }),
                "/home/src/workspaces/project/beta/b.ts": "import { m } from '@alpha/a'",
            }),
        commandLineArgs: ["--p", "beta/tsconfig.json"],
    });
});

/**
 * 'composite' behavior
 */
describe("unittests:: tsc:: projectReferencesConfig:: project-references behavior changes under composite: true", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "doesnt infer the rootDir from source paths",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/alpha/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/alpha/src/a.ts": "export const m: number = 3;",
            }),
        commandLineArgs: ["--p", "alpha/tsconfig.json"],
    });
});

describe("unittests:: tsc:: projectReferencesConfig:: project-references errors when a file in a composite project occurs outside the root", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when a file is outside the rootdir",
        sys: () =>
            TestServerHost.createWatchedSystem({
                "/home/src/workspaces/project/alpha/tsconfig.json": getConfig(),
                "/home/src/workspaces/project/alpha/src/a.ts": "import * as b from '../../beta/b'",
                "/home/src/workspaces/project/beta/b.ts": "export { }",
            }),
        commandLineArgs: ["--p", "alpha/tsconfig.json"],
    });
});
