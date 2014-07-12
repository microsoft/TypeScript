///<reference path='_project.ts'/>

describe('getDefinitionPositionAtPosition', function() {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();
    
    var fileName = 'tests/cases/unittests/services/testCode/getDefinitionsAtPosition.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getDefinitionsAtPosition2.ts';
    var fileName3 = 'tests/cases/unittests/services/testCode/getDefinitionsAtPosition3.ts';
    
    typescriptLS.addFile(fileName);
    typescriptLS.addFile(fileName2);
    typescriptLS.addFile(fileName3);
    
    var ls = typescriptLS.getLanguageService();
    
    function lineToOffset(line: number, col = 0, sFile?) {
        var script: TypeScript.Script;
        if (sFile) {
            if (sFile === 1){
                script = ls.languageService.getScriptAST(fileName);
            } else if (sFile === 2) {
                script = ls.languageService.getScriptAST(fileName2);
            } else if (sFile === 3){
                script = ls.languageService.getScriptAST(fileName3);
            }
        }
        else {
            script = ls.languageService.getScriptAST(fileName);
        }
        return script.locationInfo.lineMap[line - 1] + col;
    }
    
    function definitionAtPos(line: number, col: number) {
        var result = ls.getDefinitionAtPosition(fileName, lineToOffset(line, col));
        if (result.substr(0,9) === "##ERROR##") {
             return null;
        }
        var parts = result.split('\t');
        var defScriptIndex = parts[0];
        var defPosition = parts[1];
        return { index : defScriptIndex, pos : defPosition }        
    }

    function verifyDefinition(indexAndPos: {index: string; pos: string;}, line: number, col: number, fileNum: number) {
        if (indexAndPos.index !== fileNum.toString()) {
                throw new Error("Expected file index to be " + fileNum + " but it was " + indexAndPos.index + " instead.");
        }
        if (indexAndPos.pos!== lineToOffset(line, col, fileNum).toString()) {
                throw new Error("Expected offset to be " + lineToOffset(line, col, fileNum).toString() + " but it was " + indexAndPos.pos + " instead.");
        }        
    }
    
    describe('GoTo Definition', function() { 
        /*
            LOCAL
        */
        
        it("A variable that is defined in the same file", function() {
            var indexAndPos = definitionAtPos(8, 0);
            verifyDefinition(indexAndPos, 2, 0, 1);            
        });
        
        it("A function that is defined in the same file", function() {
            var indexAndPos = definitionAtPos(9, 0);
            verifyDefinition(indexAndPos, 3, 0, 1);           
        });

        it("A class that is defined in the same file", function() {
            var indexAndPos = definitionAtPos(10, 16);
            verifyDefinition(indexAndPos, 4, 0, 1);           
        });
        
        it("An interface that is defined in the same file", function() {
            var indexAndPos = definitionAtPos(11, 26);
            verifyDefinition(indexAndPos, 5, 0, 1);            
        });
        
        it("A module that is defined in the same file", function() {
            var indexAndPos = definitionAtPos(12, 15);
            verifyDefinition(indexAndPos, 6, 0, 1);            
        });

        /*
            REMOTE
        */
        
        it("A variable that is defined in a remote file", function() {
            var indexAndPos = definitionAtPos(14, 0);
            verifyDefinition(indexAndPos, 2, 0, 2);            
        });
        
        it("A function that is defined in a remote file", function() {
            var indexAndPos = definitionAtPos(15, 0);
            verifyDefinition(indexAndPos, 3, 0, 2);            
        });
        
        it("A class that is defined in a remote file", function() {
            var indexAndPos = definitionAtPos(16, 19);
            verifyDefinition(indexAndPos, 4, 0, 2);            
        });
        
        it("An interface that is defined in a remote file", function() {
            var indexAndPos = definitionAtPos(17, 29);
            verifyDefinition(indexAndPos, 5, 0, 2);            
        });
        
        it("A module that is defined in a remote file", function() {
            var indexAndPos = definitionAtPos(18, 18);
            verifyDefinition(indexAndPos, 6, 0, 2);            
        });
        
        /*
            REMOTE -> REMOTE
        */
        
        it("A variable that is defined in a remote file that is referenced from a remote file", function() {
            var indexAndPos = definitionAtPos(20, 0);
            verifyDefinition(indexAndPos, 1, 0, 3);            
        });
        
        it("A function that is defined in a remote file that is referenced from a remote file", function() {
            var indexAndPos = definitionAtPos(21, 0);
            verifyDefinition(indexAndPos, 2, 0, 3);            
        });
 
        it("A class that is defined in a remote file that is referenced from a remote file", function() {
            var indexAndPos = definitionAtPos(22, 19);
            verifyDefinition(indexAndPos, 3, 0, 3);            
        });
        
        it("An interface that is defined in a remote file that is referenced from a remote file", function() {
            var indexAndPos = definitionAtPos(23, 29);
            verifyDefinition(indexAndPos, 4, 0, 3);            
        });
        
        it("A module that is defined in a remote file that is referenced from a remote file", function() {
            var indexAndPos = definitionAtPos(24, 18);
            verifyDefinition(indexAndPos, 5, 0, 3);            
        });
        
        /*
            Others
        */
        
        it("A shadowed variable inside a module", function() {
            var indexAndPos = definitionAtPos(29, 6);
            verifyDefinition(indexAndPos, 28, 4, 1);            
        });
    
        it("A function being overloaded on global - 1", function() {
            var indexAndPos = definitionAtPos(32, 9);
            verifyDefinition(indexAndPos, 34, 0, 1);            
        });
        
        it("A function being overloaded on global - 2", function() {
            var indexAndPos = definitionAtPos(36, 0);
            verifyDefinition(indexAndPos, 34, 0, 1);            
        });
        
        it("Constructor being overloaded in class", function() {
            var indexAndPos = definitionAtPos(40, 4);
            verifyDefinition(indexAndPos, 42, 4, 1);            
        });

        it("A function being overloaded in class - 1", function() {
            var indexAndPos = definitionAtPos(52, 11);
            verifyDefinition(indexAndPos, 54, 4, 1);            
        });
          
        it("A static function being overloaded in class - 1", function() {
            var indexAndPos = definitionAtPos(50, 11);
            verifyDefinition(indexAndPos, 51, 4, 1);            
        });
        
        it("Calling a static function of a class", function() {
            var indexAndPos = definitionAtPos(63, 19);
            verifyDefinition(indexAndPos, 51, 4, 1);            
        });
             
        it("A class implementing an interface", function() {
            var indexAndPos = definitionAtPos(83, 24);
            verifyDefinition(indexAndPos, 78, 0, 1);            
        });
        
        it("An ambient variable", function() {
            var indexAndPos = definitionAtPos(91, 0);
            verifyDefinition(indexAndPos, 89, 0, 1);            
        });
    });
});

