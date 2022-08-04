/*
/// <reference path="..\..\..\src\compiler\program.ts" />
/// <reference path="..\..\..\src\compiler\types.ts" />
/// <reference path="..\..\..\src\harness\fakeHosts.ts" />
*/

// namespace ts {
    describe("unittests :: internalApi :: typeParameterIsPossiblyReferenced", () => {
            it("with type parameter aliasing", () => {
                const content = `
                function f<T>() {
                    const a: T = null as any;
                    function g<T>() {
                        const something: typeof a = null as any;
                        type SomeType = typeof something;
                        const thing2: SomeType = null as any;
                        return thing2;
                    }
                    return g;
                }
                `;
                const host = new fakes.CompilerHost(vfs.createFromFileSystem(
                    Harness.IO,
                    /*ignoreCases*/ true,
                    {
                        documents: [
                            new documents.TextDocument("/file.ts", content)
                        ],
                        cwd: "/",
                    }
                ));
                const program = ts.createProgram({
                    host,
                    rootNames: ["/file.ts"],
                    options: { strict: true },
                });
                const checker = program.getTypeChecker();
                const file = program.getSourceFile("/file.ts")!;
                const fNode = file.statements[0] as ts.FunctionDeclaration; // function f<T>
                const node = ((fNode // function f<T>
                    .body!.statements[1] as ts.FunctionDeclaration) // function g<T>
                    .body!.statements[1] as ts.TypeAliasDeclaration) // type SomeType
                    .type; // typeof something
                const typeParamDecl = fNode.typeParameters![0];
                const typeParameter = checker.getTypeAtLocation(typeParamDecl) as ts.TypeParameter;
                const isReferenced = checker.isTypeParameterPossiblyReferenced(typeParameter, node);
                assert.ok(isReferenced, "Type parameter is referenced in type query node");
                // validateMatches(expected, json, caseInsensitiveHost, caseInsensitiveBasePath);
            });
    });
// }
