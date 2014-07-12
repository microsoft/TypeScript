///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling tests\\compiler\\constructSignatureTests.ts', function () {
    it("If a signature omits a return type annotation, any type is assumed", function () {
        var code = 'var foo: {new ();};';
        code += 'var test = new foo();'
        code += 'test.bar = 2;'
        Harness.Compiler.compileString(code, 'construct signatures', function (result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("A call signature can have the void return type", function () {
        var code = 'var foo: {new ():void;};';
        Harness.Compiler.compileString(code, 'call signatures', function (result) {
            assert.equal(result.errors.length, 1);
        });
    });

    it("A construct signature can't have the same overload", function () {
        var code = 'var foo: { new (): string; new (): string; };';
        Harness.Compiler.compileString(code, 'call signatures', function (result) {
            assert.equal(result.errors.length, 0);
        });
    });
});