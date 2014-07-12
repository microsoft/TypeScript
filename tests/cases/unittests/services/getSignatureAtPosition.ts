///<reference path='_project.ts'/>

describe('getSignatureAtPosition', function () {
    var mytypescriptLS = new Harness.TypeScriptLS();

    mytypescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getSignatureAtPositionTest.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getSignatureAtPositionTestEOF.ts';

    mytypescriptLS.addFile(fileName);
    mytypescriptLS.addFile(fileName2);

    var myls = mytypescriptLS.getLanguageService();

    function singatureAtPos(line: number, col: number): Services.SignatureInfo {
        return myls.languageService.getSignatureAtPosition(fileName, mytypescriptLS.lineColToPosition(fileName, line, col));
    }

    function singatureAtPos2(line: number, col: number): Services.SignatureInfo {
        return myls.languageService.getSignatureAtPosition(fileName2, mytypescriptLS.lineColToPosition(fileName2, line, col));
    }

    describe('Get signatures from position', function () {
        it("Comment", function () {
            var result = singatureAtPos(1, 4);
            assert.equal(null, result);
        });

        it("No Context", function () {
            var result = singatureAtPos(2, 1);
            assert.equal(null, result);
        });

        it("Construct expression", function () {
            var result = singatureAtPos(3, 23);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("sampleCls", formal.name);
            assert.equal(1, formal.signatureGroup.length);
            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("str", formal.signatureGroup[0].parameters[0].name);
            assert.equal("string", formal.signatureGroup[0].parameters[0].type);
            assert.equal("num", formal.signatureGroup[0].parameters[1].name);
            assert.equal("number", formal.signatureGroup[0].parameters[1].type);
            assert.equal("sampleCls", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 22), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 29), actual.closeParenLimChar);
            assert.equal(2, actual.parameters.length);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 23), actual.parameters[0].minChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 25), actual.parameters[0].limChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 27), actual.parameters[1].minChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 3, 28), actual.parameters[1].limChar);

            assert.equal(0, result.activeFormal);
        });

        it("Wrong context", function () {
            var result = singatureAtPos(4, 11);
            assert.equal(null, result);
        });

        it("Call expression", function () {
            var result = singatureAtPos(7, 8);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("fnTest", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("str", formal.signatureGroup[0].parameters[0].name);
            assert.equal("string", formal.signatureGroup[0].parameters[0].type);
            assert.equal("num", formal.signatureGroup[0].parameters[1].name);
            assert.equal("number", formal.signatureGroup[0].parameters[1].type);
            assert.equal("void", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 7, 7), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 7, 9), actual.closeParenLimChar);
            assert.equal(0, actual.parameters.length);

            assert.equal(-1, result.activeFormal);
        });

        it("Overloaded function", function () {
            var result = singatureAtPos(11, 12);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("fnOverload", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(0, formal.signatureGroup[0].parameters.length);
            assert.equal("any", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("test", formal.signatureGroup[1].parameters[0].name);
            assert.equal("string", formal.signatureGroup[1].parameters[0].type);
            assert.equal("any", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 11, 11), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 11, 13), actual.closeParenLimChar);
            assert.equal(0, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Overloaded function 2", function () {
            var result = singatureAtPos(12, 12);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("fnOverload", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(0, formal.signatureGroup[0].parameters.length);
            assert.equal("any", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("test", formal.signatureGroup[1].parameters[0].name);
            assert.equal("string", formal.signatureGroup[1].parameters[0].type);
            assert.equal("any", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 12, 11), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 12, 15), actual.closeParenLimChar);
            assert.equal(1, actual.parameters.length);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 12, 12), actual.parameters[0].minChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 12, 14), actual.parameters[0].limChar);

            assert.equal(1, result.activeFormal);
        });

        it("Overloaded construct - before open paren", function () {
            var result = singatureAtPos(15, 24);
            assert.equal(null, result);
        });

        it("Overloaded construct - after close paren", function () {
            var result = singatureAtPos(15, 26);
            assert.equal(null, result);
        });

        it("Overloaded construct", function () {
            var result = singatureAtPos(15, 25);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("clsOverload", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(0, formal.signatureGroup[0].parameters.length);
            assert.equal("clsOverload", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("test", formal.signatureGroup[1].parameters[0].name);
            assert.equal("string", formal.signatureGroup[1].parameters[0].type);
            assert.equal("clsOverload", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 15, 24), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 15, 26), actual.closeParenLimChar);

            assert.equal(0, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Overloaded construct: call second overload", function () {
            var result = singatureAtPos(16, 25);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("clsOverload", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(0, formal.signatureGroup[0].parameters.length);
            assert.equal("clsOverload", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("test", formal.signatureGroup[1].parameters[0].name);
            assert.equal("string", formal.signatureGroup[1].parameters[0].type);
            assert.equal("clsOverload", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 16, 24), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 16, 28), actual.closeParenLimChar);

            assert.equal(1, actual.parameters.length);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 16, 25), actual.parameters[0].minChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 16, 27), actual.parameters[0].limChar);

            assert.equal(1, result.activeFormal);
        });

        it("Incomplete call (with statements after the incomple call)", function () {
            var result = singatureAtPos(31, 14);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("f1", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(0, formal.signatureGroup[0].parameters.length);
            assert.equal("void", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 31, 13), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 34, 10), actual.closeParenLimChar);

            assert.equal(1, actual.parameters.length);

            assert.equal(-1, result.activeFormal);
        });

        it("Incomplete call 2 (inside another incomplete call)", function () {
            var result = singatureAtPos(32, 14);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("f2", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(1, formal.signatureGroup[0].parameters.length);
            assert.equal("n", formal.signatureGroup[0].parameters[0].name);
            assert.equal("number", formal.signatureGroup[0].parameters[0].type);
            assert.equal("void", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 32, 13), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 34, 10), actual.closeParenLimChar);

            assert.equal(2, actual.parameters.length);

            assert.equal(-1, result.activeFormal);
        });

        it("Incomplete call 3 (close curly after incomplete call)", function () {
            var result = singatureAtPos(33, 14);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("f3", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("n", formal.signatureGroup[0].parameters[0].name);
            assert.equal("number", formal.signatureGroup[0].parameters[0].type);
            assert.equal("s", formal.signatureGroup[0].parameters[1].name);
            assert.equal("string", formal.signatureGroup[0].parameters[1].type);
            assert.equal("void", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 33, 13), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 34, 10), actual.closeParenLimChar);

            assert.equal(2, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Calling off a parameter function", function () {
            var result = singatureAtPos(44, 22);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("callback", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("a", formal.signatureGroup[0].parameters[0].name);
            assert.equal("number", formal.signatureGroup[0].parameters[0].type);
            assert.equal("b", formal.signatureGroup[0].parameters[1].name);
            assert.equal("string", formal.signatureGroup[0].parameters[1].type);
            assert.equal("string", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 44, 21), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 44, 28), actual.closeParenLimChar);

            assert.equal(2, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Calling off a returned function", function () {
            var result = singatureAtPos(53, 15);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("a", formal.signatureGroup[0].parameters[0].name);
            assert.equal("number", formal.signatureGroup[0].parameters[0].type);
            assert.equal("b", formal.signatureGroup[0].parameters[1].name);
            assert.equal("string", formal.signatureGroup[0].parameters[1].type);
            assert.equal("string", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 53, 14), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 53, 21), actual.closeParenLimChar);

            assert.equal(2, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Calling off a object literal property function", function () {
            var result = singatureAtPos(58, 9);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("f", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("a", formal.signatureGroup[0].parameters[0].name);
            assert.equal("number", formal.signatureGroup[0].parameters[0].type);
            assert.equal("b", formal.signatureGroup[0].parameters[1].name);
            assert.equal("string", formal.signatureGroup[0].parameters[1].type);
            assert.equal("string", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 58, 8), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 58, 15), actual.closeParenLimChar);

            assert.equal(2, actual.parameters.length);

            assert.equal(0, result.activeFormal);
        });

        it("Calling off super constructor", function() {
            var result = singatureAtPos(69, 19);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("base", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(1, formal.signatureGroup[0].parameters.length);
            assert.equal("s", formal.signatureGroup[0].parameters[0].name);
            assert.equal("string", formal.signatureGroup[0].parameters[0].type);
            assert.equal("base", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("n", formal.signatureGroup[1].parameters[0].name);
            assert.equal("number", formal.signatureGroup[1].parameters[0].type);
            assert.equal("base", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 69, 18), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 69, 22), actual.closeParenLimChar);

            assert.equal(1, actual.parameters.length);
            assert.equal(0, result.activeFormal);
        });

        it("Calling off super of super constructor", function() {
            var result = singatureAtPos(79, 19);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("B2", formal.name);
            assert.equal(2, formal.signatureGroup.length);

            assert.equal(1, formal.signatureGroup[0].parameters.length);
            assert.equal("s", formal.signatureGroup[0].parameters[0].name);
            assert.equal("string", formal.signatureGroup[0].parameters[0].type);
            assert.equal("B2", formal.signatureGroup[0].returnType);

            assert.equal(1, formal.signatureGroup[1].parameters.length);
            assert.equal("n", formal.signatureGroup[1].parameters[0].name);
            assert.equal("number", formal.signatureGroup[1].parameters[0].type);
            assert.equal("B2", formal.signatureGroup[1].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName, 79, 18), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName, 79, 22), actual.closeParenLimChar);

            assert.equal(1, actual.parameters.length);
            assert.equal(0, result.activeFormal);
        });
    });

    describe('Get signatures at EOF', function () {
        it("Function signature at EOF", function () {
            var result = singatureAtPos2(5, 5);
            assert.notNull(result);

            var formal = result.formal;
            assert.notNull(formal);

            assert.equal(false, formal.isNew);
            assert.equal("Foo", formal.name);
            assert.equal(1, formal.signatureGroup.length);

            assert.equal(2, formal.signatureGroup[0].parameters.length);
            assert.equal("arg1", formal.signatureGroup[0].parameters[0].name);
            assert.equal("string", formal.signatureGroup[0].parameters[0].type);
            assert.equal("arg2", formal.signatureGroup[0].parameters[1].name);
            assert.equal("string", formal.signatureGroup[0].parameters[1].type);
            assert.equal("void", formal.signatureGroup[0].returnType);

            var actual = result.actual;
            assert.notNull(actual);

            assert.equal(mytypescriptLS.lineColToPosition(fileName2, 5, 4), actual.openParenMinChar);
            assert.equal(mytypescriptLS.lineColToPosition(fileName2, 5, 5), actual.closeParenLimChar);
            assert.equal(0, actual.currentParameter);

            assert.equal(1, actual.parameters.length);

            assert.equal(-1, result.activeFormal);
        });
    });
});