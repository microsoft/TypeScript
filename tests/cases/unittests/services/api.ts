/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

module ts {
    let source: SourceFile;
    function getTypeChecker(code: string): TypeChecker {
        let options: CompilerOptions = { target: ScriptTarget.ES5 };
        let host = createCompilerHost(options, true);
        source = createSourceFile("test.ts", code, ts.ScriptTarget.ES5, true);

        return createTypeChecker(getEmitHost(host, source, options), true);
    }

    function getChildNodes(source: SourceFile, filter: (n: Node) => boolean): Node[] {
        let nodes: Node[] = [];
        forEachChild(source, function (node) {
            if (filter(node)) {
                nodes.push(node);
            }
        });
        return nodes;
    }

    describe('api.getTypeChecker()', function () {

        describe("getConstant", function () {
            it("enum", function () {

let checker = getTypeChecker(`
const enum numbers {
  one = 1,
  two,
  three = invalid
}
let one = numbers.one;
let two = numbers["two"];
let bad = numbers.three;
let num = 1;
function do() { return 1; }
`);
                let nodes = getChildNodes(source, (n) => n.kind === SyntaxKind.VariableStatement);
                assert.equal(4, nodes.length);

                assert.equal(1, checker.getConstant((<any>nodes[0]).declarationList.declarations[0].initializer).value);
                assert.equal(2, checker.getConstant((<any>nodes[1]).declarationList.declarations[0].initializer).value);
                assert.equal(undefined, checker.getConstant((<any>nodes[2]).declarationList.declarations[0].initializer));

                assert.equal(1, checker.getConstantValue((<any>nodes[0]).declarationList.declarations[0].initializer));
                assert.equal(2, checker.getConstantValue((<any>nodes[1]).declarationList.declarations[0].initializer));
                assert.equal(undefined, checker.getConstantValue((<any>nodes[2]).declarationList.declarations[0].initializer));
            });
        });

    });

    function getEmitHost(host: CompilerHost, file: SourceFile, options: CompilerOptions): EmitHost {
        let files: SourceFile[] = [];
        let lib = host.getSourceFile(host.getDefaultLibFileName(options), ScriptTarget.ES5);
        lib.isDefaultLib = true;
        files.push(lib);
        files.push(file);

        return {
            getCanonicalFileName: fileName => host.getCanonicalFileName(fileName),
            getCommonSourceDirectory: () => host.getCurrentDirectory(),
            getCompilerOptions: () => options,
            getCurrentDirectory: () => host.getCurrentDirectory(),
            getNewLine: () => host.getNewLine(),
            getSourceFile: () => file,
            getSourceFiles: () => files,
            writeFile: (fileName, data, writeByteOrderMark, onError) => host.writeFile(fileName, data, writeByteOrderMark, onError),
        };
    }
}