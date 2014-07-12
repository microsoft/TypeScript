/// <reference path='..\..\..\..\src\compiler\typescript.ts' />
/// <reference path='..\..\..\..\src\harness\harness.ts' />

//@tags 2.6.2 Subtypes and Supertypes

describe('Compiling unittests\\compiler\\classOverloads.ts', function() {
    it("Everytype is a subtype of itself", function() {
        var code = 'class foo { public bar: number; }';
        code += 'class bar extends foo { public bar: number; }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });
    it("All types except the Void type are subtypes of the Any type", function() {
        var code = 'class foo { public bar: any; }';
        code += 'class bar extends foo { public bar: number; }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });

    it("All types are subtypes of the Any type - 2", function() {
        var code  = 'class baz { public bar(): any { return 1; } }';
            code += 'class foo extends baz { public bar(): void {} }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.arrayLengthIs(result.errors, 0);
        });
    });  

    it("The Undefined type is a subtype of all types except the Void type", function() {
        var code = 'class baz { public bar(): any { return 1 } }';
        code += 'class foo extends baz { public bar(){ return undefined} }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.equal(result.errors.length, 0);
        });
    });

    it("The Undefined type is a subtype of all types except the Void type - 2", function() {
        var code  = 'class baz { public bar(): void { } }';
            code += 'class foo extends baz { public bar(){ return undefined} }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.arrayLengthIs(result.errors, 0);
        });
    });  

    it("The Null type is a subtype of all types, except the Undefined and Void types", function() {
        var code = 'class baz { public bar:any; }';
        code += 'class foo extends baz { public bar = null; }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    it("The Null type is a subtype of all types, except the Undefined and Void types - 3", function() {
        var code  = 'class baz { public bar():void { } }';
            code += 'class foo extends baz { public bar() { return null; } }';
        Harness.Compiler.compileString(code, 'subtypes', function(result) {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    describe('An object type S is a subtype of an object type T', function() {
        assert.bug('[Errors] No error for failing to implement interface definition in derived/extended types');
        //it("A property in T is matched by a property in S", function() {
        //    var code = 'class baz { public bar: { a: string; }; }';
        //    code += 'class foo extends baz { public bar: { a: number; }; }';
        //    Harness.Compiler.compileString(code, 'subtypes', function(result) {
        //        assert.equal(result.errors.length, 1);
        //    });
        //});
        it("A property in T is matched by a property in S - 2", function() {
            var code = 'class baz { public bar: { a: string; }; }';
            code += 'class foo extends baz { public bar: { a: string; }; }';
            Harness.Compiler.compileString(code, 'subtypes', function(result) {
                assert.equal(result.errors.length, 0);
            });
        });
        assert.bug('[Errors] No error for failing to implement interface definition in derived/extended types');
        //it("A property in T is matched by a property in S - 3", function() {
        //    var code = 'class baz { public bar: { a: string; }; }';
        //    code += 'class foo extends baz { public bar: { b: string; }; }';
        //    Harness.Compiler.compileString(code, 'subtypes', function(result) {
        //        assert.equal(result.errors.length, 1);
        //    });
        //});
        it("A call, construct or index signature in T is matched by a call, construct or index signature", function() {
            var code = 'class baz { public bar: { (); }; }';
            code += 'class foo extends baz { public bar: { (); } ;}';
            Harness.Compiler.compileString(code, 'subtypes', function(result) {
                assert.equal(result.errors.length, 0);
            });
        });
        assert.bug('[Errors] No error for failing to implement interface definition in derived/extended types');
        //it("A call, construct or index signature in T is matched by a call, construct or index signature - 2", function() {
        //    var code = 'class baz { public bar: { [idx:number]; }; }';
        //    code += 'class foo extends baz { public bar: { (); }; }';
        //    Harness.Compiler.compileString(code, 'subtypes', function(result) {
        //        assert.equal(result.errors.length, 1);
        //    });
        //});
        it("A call, construct or index signature in T is matched by a call, construct or index signature - 3", function() {
            var code = 'class baz { public bar: { (a: string); }; }';
            code += 'class foo extends baz { public bar: { (); }; }';
            Harness.Compiler.compileString(code, 'subtypes', function(result) {
                assert.equal(result.errors.length, 0);
            });

        });
        assert.bug('[Errors] No error for failing to implement interface definition in derived/extended types');
        //it("A call, construct or index signature in T is matched by a call, construct or index signature - 4", function() {
        //    var code = 'class baz { public bar: { (a:string); }; }';
        //    code += 'class foo extends baz { public bar: { (a:string,b:string); }; }';
        //    Harness.Compiler.compileString(code, 'subtypes', function(result) {
        //        assert.equal(result.errors.length, 1);
        //    });
        //});
        it("A call, construct or index signature in T is matched by a call, construct or index signature - 5", function() {
            var code = 'class baz { public bar: { ():void; }; }';
            code += 'class foo extends baz { public bar: { ():void; }; }';
            Harness.Compiler.compileString(code, 'subtypes', function(result) {
                assert.equal(result.errors.length, 0);
            });
        });

        it("A call, construct or index signature in T is matched by a call, construct or index signature - 6", function() {
            var code  = 'class baz { public bar: { (); }; }';
                code += 'class foo extends baz { public bar: { ():void; }; }';
            Harness.Compiler.compileString(code, 'subtypes', function(result) {
                assert.arrayLengthIs(result.errors, 0);
            });
        }); 
    });
});

