///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

describe('Compiling unittests\\compiler\\propertySignatureTests.ts', function() {
    assert.bug('13986: Having duplicate (property signature) identifiers inside objects prints out error message twice');
    /*
    it('The Identifier of a property signature must be unique within its containing type. ', function(){
        var code  = 'var foo: { a:string; a: string; };';
            Harness.Compiler.compileString(code, 'property signatures', function(result) {
                assert.equal(result.errors.length, 1);
                assert.compilerWarning(result, 1, 9, 'Duplicate identifier a');
        });
    });*/

    it('If a property signature omits a TypeAnnotation, the Any type is assumed.', function(){
        var code  = 'var foo: { a; }; foo.a = 2; foo.a = "0";';
            Harness.Compiler.compileString(code, 'property signatures', function(result) {
            assert.equal(result.errors.length, 0);
        });
    })
});