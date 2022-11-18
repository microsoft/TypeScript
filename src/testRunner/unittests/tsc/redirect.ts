import {
    loadProjectFromFiles,
    verifyTsc,
} from "./helpers";

describe("unittests:: tsc:: redirect::", () => {
    verifyTsc({
        scenario: "redirect",
        subScenario: "when redirecting ts file",
        fs: () => loadProjectFromFiles({
            "/src/project/tsconfig.json": JSON.stringify({
                compilerOptions: {
                    outDir: "out"
                },
                include: [
                    "copy1/node_modules/target/*",
                    "copy2/node_modules/target/*",
                ]
            }),
            "/src/project/copy1/node_modules/target/index.ts": "export const a = 1;",
            "/src/project/copy1/node_modules/target/import.ts": `import {} from "./";`,
            "/src/project/copy1/node_modules/target/package.json": JSON.stringify({
                name: "target",
                version: "1.0.0",
                main: "index.js",
            }),
            "/src/project/copy2/node_modules/target/index.ts": "export const a = 1;",
            "/src/project/copy2/node_modules/target/import.ts": `import {} from "./";`,
            "/src/project/copy2/node_modules/target/package.json": JSON.stringify({
                name: "target",
                version: "1.0.0",
                main: "index.js",
            }),
        }),
        commandLineArgs: ["-p", "src/project"],
    });
});
