///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling unittests\\compiler\\functionSignatureTests.ts', function() {
    it('Check overload with different return types.', function(){
        var code  = 'var foo: { bar(): string; bar(): number; };\n';
            code += 'var bar: { bar: { (): string; (): number; }; };';
            code += 'foo = bar;';
        Harness.Compiler.compileString(code, 'function signatures', function(result) {
            assert.compilerWarning(result, 1, 27, 'error TS2175: Overloads cannot differ only by return type.');
            assert.compilerWarning(result, 2, 31, 'error TS2175: Overloads cannot differ only by return type.');       
            assert.equal(result.errors.length, 2);
        });
    })

    describe('Function Type Literals', function() {
        it('Basic sanity check', function() {
            var code  = 'var foo: { (): string; };';
                code += 'var bar: () => string;';
                code += 'foo = bar;';
            Harness.Compiler.compileString(code, 'function type literal', function(result) {
                assert.equal(result.errors.length, 0);
            });
        });
    });
});

