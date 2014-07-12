///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

//@tags 1.1 Declarations

describe('Compiling unittests\\compiler\\declarationTests.ts', function() {
    it("Each internal module’s export declaration spaces are shared with other internal modules that have the same root module and the " +
       "same qualified name starting from that root module", function() {
        var code  = 'module baz{export var foo;}';
            code += 'module baz{export var bar;}'
            code += 'baz.foo = baz.bar;'
        Harness.Compiler.compileString(code, 'declarations', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("Each object type literal has a declaration space for its members", function() {
        var code  = 'var foo:{a:number;};';
            code += 'foo.a = 2;'
        Harness.Compiler.compileString(code, 'declarations', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("Each class declaration has a declaration space for members and a declaration space for statics", function() {
        var code  = 'class foo {';
            code += '   static bar;'
            code += '   public bar;'
            code += '}'
        Harness.Compiler.compileString(code, 'declarations', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("Each function declaration (including member function declarations and static function declarations) has a declaration space for " + 
       "statics and a declaration space for locals (parameters, variables, and functions).", function() {
        var code  = 'function foo() {';
            code += '   static bar;'
            code += '   var bar;'
            code += '}'
        Harness.Compiler.compileString(code, 'declarations', function(result) {
            assert.equal(result.errors.length, 1);
        });
    });
    it("Modules contain separate declaration spaces for variables and types.", function() {
        var code  = 'module M {';
            code += '   class bar {};'
            code += '   var bar;'
            code += '}'
        Harness.Compiler.compileString(code, 'declarations', function(result) {
            assert.equal(result.errors.length, 1);
        });
    });
});

