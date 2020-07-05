namespace ts.projectSystem {
    describe("unittests:: tsserver:: with type definitions of commonjs module", () => {
        const aDts: File = {
            path: "/b/node_modules/@types/a/index.d.ts",
            content: "export declare function fnA(): number;",
        };
        const aDtsPackage: File = {
            path: "/b/node_modules/@types/a/package.json",
            content: `{ "types": "a" }`,
        };

        const aJs: File = {
            path: "/b/node_modules/a/lib/index.js",
            content: `
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnA = function fnA() { return 42; };`,
        };
        const aPackage: File = {
            path: "/b/node_modules/a/package.json",
            content: `{ "name": "a", "version": "1.0.0", "main": "lib/index.js" }`,
        };
        const userTs: File = {
            path: "/b/user.ts",
            content: `import { fnA } from 'a';

export function fnB(): number {
  return fnA()
}
`,
        };

        function makeSampleProjects() {
          const host = createServerHost([ aJs, aPackage, aDts, aDtsPackage, userTs]);

            const session = createSession(host);

            openFilesForSession([userTs, aDts], session);

            const service = session.getProjectService();

            checkNumberOfProjects(service, { inferredProjects: 1 });

            return session;
        }


        it("goToType", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.TypeDefinitionRequest, protocol.TypeDefinitionResponse>(
              session,
              protocol.CommandTypes.TypeDefinition,
              protocolFileLocationFromSubstring(userTs, "fnA")
            );
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aDts,
                    text: "fnA",
                    contextText: "export declare function fnA(): number;"
                })
            ]);
        });

        it("goToDefinition", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.DefinitionRequest, protocol.DefinitionResponse>(
              session,
              protocol.CommandTypes.Definition,
              protocolFileLocationFromSubstring(userTs, "fnA")
            );
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aJs,
                    text: "fnA",
                    contextText: "exports.fnA = function fnA() { return 42; };"
                })
            ]);
        });

        it("goToImplementation", () => {
            const session = makeSampleProjects();
            const response = executeSessionRequest<protocol.ImplementationRequest, protocol.ImplementationResponse>(
              session,
              protocol.CommandTypes.Implementation,
              protocolFileLocationFromSubstring(userTs, "fnA()")
            );
            assert.deepEqual(response, [
                protocolFileSpanWithContextFromSubstring({
                    file: aJs,
                    text: "fnA",
                    contextText: "exports.fnA = function fnA() { return 42; };"
                })]);
        });
    });
}
