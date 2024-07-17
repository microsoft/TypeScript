import * as documents from "../_namespaces/documents.js";
import * as fakes from "../_namespaces/fakes.js";
import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import * as vfs from "../_namespaces/vfs.js";

describe("unittests :: internalApi :: typeParameterIsPossiblyReferenced", () => {
    it("with type parameter aliasing", () => {
        const content = `
            declare function foo<T>(b: T, f: <T>(a: typeof b) => typeof a): typeof f;
            `;
        const host = new fakes.CompilerHost(vfs.createFromFileSystem(
            Harness.IO,
            /*ignoreCase*/ true,
            {
                documents: [
                    new documents.TextDocument("/file.ts", content),
                ],
                cwd: "/",
            },
        ));
        const program = ts.createProgram({
            host,
            rootNames: ["/file.ts"],
            options: { strict: true },
        });
        const checker = program.getTypeChecker();
        const file = program.getSourceFile("/file.ts")!;
        const typeQueryNode = ((file.statements[0] as ts.FunctionDeclaration) // function f<T>
            .parameters[1] // f
            .type! as ts.FunctionTypeNode) // <T>(a: typeof b) => typeof a
            .type as ts.TypeQueryNode // typeof a
        ;
        const typeParameterDecl = (file.statements[0] as ts.FunctionDeclaration).typeParameters![0]; // T in f<T>
        const typeParameter = checker.getTypeAtLocation(typeParameterDecl) as ts.TypeParameter;
        const isReferenced = checker.isTypeParameterPossiblyReferenced(typeParameter, typeQueryNode);
        assert.ok(isReferenced, "Type parameter is referenced in type query node");
    });
});
