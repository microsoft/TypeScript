///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling unittests\\compiler\\callSignatureTests.ts', function() {
    it("If a signature omits a return type annotation, any type is assumed", function() {
        var code  = 'var foo: {();};';
            code += 'var test = foo();'
            code += 'test.bar = 2;'
        Harness.Compiler.compileString(code, 'call signatures', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("A call signature can have the void return type", function() {
        var code  = 'var foo: {():void;};';
            code += 'var test = foo();'
            Harness.Compiler.compileString(code, 'call signatures', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });

    it("A call signature can't have the same overload", function() {
        assert.bug('13978: Declaring the same call or construct signature multiple times should be a bug');
        /*
        var code  = 'var foo: { (): string; (): string; };';
            Harness.Compiler.compileString(code, 'call signatures', function(result) {
            assert.equal(result.errors.length, 1);
            assert.compilerWarning(result, 1, 20, 'can not assign to variable test a value of type void');
        });
        */
    });
});