namespace ts.projectSystem {
    describe("unittests:: tsserver:: plugins loading", () => {
        function createHostWithPlugin(files: readonly File[]) {
            const host = createServerHost(files);
            const pluginsLoaded: string[] = [];
            host.require = (_initialPath, moduleName) => {
                pluginsLoaded.push(moduleName);
                return {
                    module: () => ({
                        create(info: server.PluginCreateInfo) {
                            return Harness.LanguageService.makeDefaultProxy(info);
                        }
                    }),
                    error: undefined
                };
            };
            return { host, pluginsLoaded };
        }

        it("With local plugins", () => {
            const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
            const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
            const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        plugins: [
                            ...[...expectedToLoad, ...notToLoad].map(name => ({ name })),
                            { transform: "some-transform" }
                        ]
                    }
                })
            };
            const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, libFile]);
            const service = createProjectService(host);
            service.openClientFile(aTs.path);
            assert.deepEqual(pluginsLoaded, expectedToLoad);
        });

        it("With global plugins", () => {
            const expectedToLoad = ["@myscoped/plugin", "unscopedPlugin"];
            const notToLoad = ["../myPlugin", "myPlugin/../malicious"];
            const aTs: File = { path: "/a.ts", content: `class c { prop = "hello"; foo() { return this.prop; } }` };
            const tsconfig: File = {
                path: "/tsconfig.json",
                content: "{}"
            };
            const { host, pluginsLoaded } = createHostWithPlugin([aTs, tsconfig, libFile]);
            const service = createProjectService(host, { globalPlugins: [...expectedToLoad, ...notToLoad] });
            service.openClientFile(aTs.path);
            assert.deepEqual(pluginsLoaded, expectedToLoad);
        });
    });
}