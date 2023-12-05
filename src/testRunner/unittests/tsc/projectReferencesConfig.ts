import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

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

describe("unittests:: config:: project-references meta check", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "default setup was created correctly",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig(),
                "/primary/a.ts": emptyModule(),
                "/secondary/tsconfig.json": getConfig({
                    references: ["../primary"],
                }),
                "/secondary/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json"],
    });
});

/**
 * Validate that we enforce the basic settings constraints for referenced projects
 */
describe("unittests:: config:: project-references constraint checking for settings", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when declaration = false",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    options: {
                        declaration: false,
                    },
                }),
                "/primary/a.ts": emptyModule(),
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the referenced project doesnt have composite",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    options: {
                        composite: false,
                    },
                }),
                "/primary/a.ts": emptyModule(),
                "/reference/tsconfig.json": getConfig({
                    references: ["../primary"],
                    config: {
                        files: ["b.ts"],
                    },
                }),
                "/reference/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "/reference/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "does not error when the referenced project doesnt have composite if its a container project",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    options: {
                        composite: false,
                    },
                }),
                "/primary/a.ts": emptyModule(),
                "/reference/tsconfig.json": getConfig({
                    references: ["../primary"],
                    config: {
                        files: [],
                    },
                }),
                "/reference/b.ts": moduleImporting("../primary/a"),
            }),
        commandLineArgs: ["--p", "/reference/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the file list is not exhaustive",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    config: {
                        files: ["a.ts"],
                    },
                }),
                "/primary/a.ts": "import * as b from './b'",
                "/primary/b.ts": "export {}",
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when the referenced project doesnt exist",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    references: ["../foo"],
                }),
                "/primary/a.ts": emptyModule(),
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when a prepended project reference doesnt set outFile",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    references: [{ path: "../someProj", prepend: true }],
                }),
                "/primary/a.ts": emptyModule(),
                "/someProj/tsconfig.json": getConfig(),
                "/someProj/b.ts": "const x = 100;",
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json", "--ignoreDeprecations", "5.0"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when a prepended project reference output doesnt exist",
        fs: () =>
            loadProjectFromFiles({
                "/primary/tsconfig.json": getConfig({
                    references: [{ path: "../someProj", prepend: true }],
                }),
                "/primary/a.ts": "const y = x;",
                "/someProj/tsconfig.json": getConfig({
                    options: { outFile: "foo.js" },
                }),
                "/someProj/b.ts": "const x = 100;",
            }),
        commandLineArgs: ["--p", "/primary/tsconfig.json", "--ignoreDeprecations", "5.0"],
    });
});

/**
 * Path mapping behavior
 */
describe("unittests:: config:: project-references path mapping", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "redirects to the output dts file",
        fs: () =>
            loadProjectFromFiles({
                "/alpha/tsconfig.json": getConfig(),
                "/alpha/a.ts": "export const m: number = 3;",
                "/alpha/bin/a.d.ts": emptyModule(),
                "/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                }),
                "/beta/b.ts": "import { m } from '../alpha/a'",
            }),
        commandLineArgs: ["--p", "/beta/tsconfig.json", "--explainFiles"],
    });
});

describe("unittests:: config:: project-references nice-behavior", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "issues a nice error when the input file is missing",
        fs: () =>
            loadProjectFromFiles({
                "/alpha/tsconfig.json": getConfig(),
                "/alpha/a.ts": "export const m: number = 3;",
                "/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                }),
                "/beta/b.ts": "import { m } from '../alpha/a'",
            }),
        commandLineArgs: ["--p", "/beta/tsconfig.json"],
    });

    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "issues a nice error when the input file is missing when module reference is not relative",
        fs: () =>
            loadProjectFromFiles({
                "/alpha/tsconfig.json": getConfig(),
                "/alpha/a.ts": "export const m: number = 3;",
                "/beta/tsconfig.json": getConfig({
                    references: ["../alpha"],
                    options: {
                        baseUrl: "./",
                        paths: {
                            "@alpha/*": ["/alpha/*"],
                        },
                    },
                }),
                "/beta/b.ts": "import { m } from '@alpha/a'",
            }),
        commandLineArgs: ["--p", "/beta/tsconfig.json"],
    });
});

/**
 * 'composite' behavior
 */
describe("unittests:: config:: project-references behavior changes under composite: true", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "doesnt infer the rootDir from source paths",
        fs: () =>
            loadProjectFromFiles({
                "/alpha/tsconfig.json": getConfig(),
                "/alpha/src/a.ts": "export const m: number = 3;",
            }),
        commandLineArgs: ["--p", "/alpha/tsconfig.json"],
    });
});

describe("unittests:: config:: project-references errors when a file in a composite project occurs outside the root", () => {
    verifyTsc({
        scenario: "projectReferencesConfig",
        subScenario: "errors when a file is outside the rootdir",
        fs: () =>
            loadProjectFromFiles({
                "/alpha/tsconfig.json": getConfig(),
                "/alpha/src/a.ts": "import * as b from '../../beta/b'",
                "/beta/b.ts": "export { }",
            }),
        commandLineArgs: ["--p", "/alpha/tsconfig.json"],
    });
});
