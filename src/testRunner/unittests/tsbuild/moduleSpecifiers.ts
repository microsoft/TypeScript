namespace ts {
    // https://github.com/microsoft/TypeScript/issues/31696
    it("unittests:: tsbuild:: synthesized module specifiers to referenced projects resolve correctly", () => {
        const fs = vfs.createFromFileSystem(Harness.IO, /*ignoreCase*/ false, {
            files: {
                "/src/common/nominal.ts": "export declare type Nominal<T, Name extends string> = T & {\n\t[Symbol.species]: Name;\n};\n",
                "/src/common/tsconfig.json": JSON.stringify({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: { composite: true },
                    include: ["nominal.ts"]
                }),
                "/src/sub-project/index.ts": "import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
                "/src/sub-project/tsconfig.json": JSON.stringify({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: { composite: true },
                    references: [{ path: "../common" }],
                    include: ["./index.ts"]
                }),
                "/src/sub-project-2/index.ts":
                    "import { MyNominal } from '../sub-project/index';\n\n" +
                    "const variable = {\n\tkey: 'value' as MyNominal,\n};\n\n" +
                    "export function getVar(): keyof typeof variable {\n\treturn 'key';\n}\n",
                "/src/sub-project-2/tsconfig.json": JSON.stringify({
                    extends: "../../tsconfig.base.json",
                    compilerOptions: { composite: true },
                    references: [{ path: "../sub-project" }],
                    include: ["./index.ts"]
                }),
                "/src/tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true },
                    references: [{ path: "./sub-project" }, { path: "./sub-project-2" }],
                    include: []
                }),
                "/tsconfig.base.json": JSON.stringify({
                    compilerOptions: {
                        rootDir: "./",
                        outDir: "lib",
                        lib: ["dom", "es2015", "es2015.symbol.wellknown"]
                    },
                }),
                "/tsconfig.json": JSON.stringify({
                    compilerOptions: { composite: true },
                    references: [{ path: "./src" }],
                    include: []
                })
            },
            cwd: "/"
        });
        const sys = new fakes.System(fs, { executingFilePath: "/", newLine: "\n" });
        const host = new fakes.SolutionBuilderHost(sys);
        const builder = createSolutionBuilder(host, ["/tsconfig.json"], { dry: false, force: false, verbose: false });
        builder.build("/tsconfig.json");

        const data = host.vfs.readFileSync("/lib/src/sub-project-2/index.d.ts", "utf8");

        // Prior to fixing GH31696 the import below was `import("../../lib/src/common/nonterminal")`
        assert.equal(data, `declare const variable: {\n    key: import("../common/nominal").Nominal<string, "MyNominal">;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n`);
    });
}