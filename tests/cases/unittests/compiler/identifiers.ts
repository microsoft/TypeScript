///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling tests\\compiler\\identifiers.ts', function() {
    it("Everytype is a subtype of itself", function() {
        var code = 'class foo { public bar: number; }';
        code += 'class bar extends foo { public bar: number; }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
});

