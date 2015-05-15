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

// Allows for executing a program with command-line arguments and reading the result
interface IExec {
    exec: (fileName: string, cmdLineArgs: string[], handleResult: (ExecResult: ExecResult) => void) => void;
}

class ExecResult {
    public stdout = "";
    public stderr = "";
    public exitCode: number;
}

class WindowsScriptHostExec implements IExec {
    public exec(fileName: string, cmdLineArgs: string[], handleResult: (ExecResult: ExecResult) => void) : void {
        var result = new ExecResult();
        var shell = new ActiveXObject('WScript.Shell');
        try {
            var process = shell.Exec(fileName + ' ' + cmdLineArgs.join(' '));
        } catch(e) {
            result.stderr = e.message;
            result.exitCode = 1;
            handleResult(result);
            return;
        }
        // Wait for it to finish running
        while (process.Status != 0) { /* todo: sleep? */ }

        
        result.exitCode = process.ExitCode;
        if(!process.StdOut.AtEndOfStream) result.stdout = process.StdOut.ReadAll();
        if(!process.StdErr.AtEndOfStream) result.stderr = process.StdErr.ReadAll();

        handleResult(result);
    }
}

class NodeExec implements IExec {
    public exec(fileName: string, cmdLineArgs: string[], handleResult: (ExecResult: ExecResult) => void) : void {
        var nodeExec = require('child_process').exec;

        var result = new ExecResult();
        result.exitCode = null;
        var cmdLine = fileName + ' ' + cmdLineArgs.join(' ');
        var process = nodeExec(cmdLine, function(error: any, stdout: string, stderr: string) {
            result.stdout = stdout;
            result.stderr = stderr;
            result.exitCode = error ? error.code : 0;
            handleResult(result);
        });
    }
}

var Exec: IExec = function() : IExec {
    var global = <any>Function("return this;").call(null);
    if(typeof global.ActiveXObject !== "undefined") {
        return new WindowsScriptHostExec();
    } else {
        return new NodeExec();
    }
}();