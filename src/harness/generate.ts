//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='..\compiler\io.ts'/>
///<reference path='harness.ts'/>

module CollateralGenerator {
    export function generateFromSourceFile(path, options) {
        path = switchToForwardSlashes(path);
        options = options || {};
        options.generateErrorTests = options.generateErrorTests || true;
        options.generateRuntimeBaseline = options.generateRuntimeBaseline || true;
        options.generateCodeBaseline = options.generateCodeBaseline || true;
        options.logMethod = options.logMethod || function() {};
        
        var fileContents = IO.readFile(path).contents();
        
        var pathParts = path.match(/^(.*\/|)compiler\/testCode\/([^\/]*)\.(\w+)$/);
        var prefix    = pathParts[1];
        var compilerDir = prefix + "compiler/";
        var baselineDir = compilerDir + "baselines/";
        var testCodeDir = compilerDir + "testCode/";
        var fileName  = pathParts[2];
        var fileExt   = pathParts[3];
        var codeBaseline = "";
        var codeBaselineLocation = baselineDir + fileName + ".js";
        var testFileLocation =  compilerDir + fileName + ".ts";

        if(path.indexOf("src/tests/") > -1) {
            path = path.replace(/.*src\/tests\//, "");
        }
        
        var testCase      = "describe('Compiling " + path.replace(/\//g, "//") + "', function() {\n";
        testCase         += "    Harness.Helper.readFile('tests/compiler/testCode/" + fileName + "." + fileExt + "', function(result) {\n";
            
        Harness.Compiler.compileString(fileContents, path, function(result) {
            testCase     += "        it('has " + result.errors.length + " compile errors', function() {\n";
            
            for(var i = 0; i < result.errors.length;i++) {
                testCase += "            assert.compilerWarning(result, " + result.errors[i].line + ", " + result.errors[i].column + ", '" + result.errors[i].message.replace(/'/g, "/'") + "');\n";
            }
            
            testCase     += "            assert.equal(result.errors.length, " + result.errors.length + ");\n";
            testCase     += "        });\n";
            
            if(options.generateCodeBaseline) {
                testCase += "\n";
                testCase += "        it('compiles properly against the baseline', function() {\n";
                if(result.code.indexOf("\n") > -1) {
                    codeBaseline = result.code;
                    testCase += "            assert.noDiff(result.code, Harness.Helper.readFile('tests/compiler/baselines/" + fileName + ".js'));\n";
                } else {
                    testCase += "            assert.noDiff(result.code, '" + result.code + "');\n";
                }
                testCase += "        });\n";
            }
        });

        testCase         += "    });\n";
        testCase         += "});\n"
        if(options.generateRuntimeBaseline) {
            Harness.Runner.runString(fileContents, path, function(error, result) {
                if(error)
                    return;

                if(typeof result !== "string")
                    return;


                testCase += "describe('Running " + path.replace(/\//g, "/") + "', function() {\n";
                testCase += "    Harness.Runner.runCollateral('compiler/testCode/" + fileName + "." + fileExt + "', function(error, result) {\n";
                testCase += "        it('matches baseline', function() {\n";
                testCase += "            assert.equal('" + result.replace(/'/g, "/'").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "', result);\n";
                testCase += "        });\n";
                testCase += "    });\n";
                testCase += "});\n"
            });
        }

        options.logMethod("Writing test case to " + testFileLocation);
        IO.writeFile(testFileLocation, testCase, /*writeByteOrderMark:*/ false);
        if(!!codeBaseline) {
            options.logMethod("Writing baseline file to " + codeBaselineLocation);
            IO.writeFile(codeBaselineLocation, codeBaseline, /*writeByteOrderMark:*/ false);
        } else {
            options.logMethod("Using inline code baseline");
        }
        
    }
}

declare var WScript: any;
if (WScript && WScript.Arguments.length > 0) {
    var command = WScript.Arguments.Item(0);
    if(command === "compilerTest") {
        var path = WScript.Arguments.Item(1);
        CollateralGenerator.generateFromSourceFile(path, {logMethod: function(str) { WScript.Echo(str) } });
    } else {
        WScript.Echo("Unknown Command");
    }
}
