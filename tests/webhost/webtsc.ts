/// <reference path='..\..\src\compiler\prototype\tc.ts'/>

module TypeScript.WebTsc {

    declare var RealActiveXObject: { new (s: string): any };

    function getWScriptSystem(): System {
        var fso = new RealActiveXObject("Scripting.FileSystemObject");
        var args: string[] = [];
        for (var i = 0; i < WScript.Arguments.length; i++) {
            args[i] = WScript.Arguments.Item(i);
        }
        return {
            args: args,
            newLine: "\r\n",
            write(s: string): void {
                WScript.StdOut.Write(s);
            },
            writeErr(s: string): void {
                WScript.StdErr.Write(s);
            },
            readFile(fileName: string): string {
                try {
                    var f = fso.OpenTextFile(fileName, 1);
                    var s: string = f.ReadAll();
                    // TODO: Properly handle byte order marks
                    if (s.length >= 3 && s.charCodeAt(0) === 0xEF && s.charCodeAt(1) === 0xBB && s.charCodeAt(2) === 0xBF) s = s.slice(3);
                    f.Close();
                }
                catch (e) {
                }
                return s;
            },
            writeFile(fileName: string, data: string): void {
                var f = fso.CreateTextFile(fileName, true);
                f.Write(data);
                f.Close();
            },
            resolvePath(path: string): string {
                return fso.GetAbsolutePathName(path);
            },
            fileExists(path: string): boolean {
                return fso.FileExists(path);
            },
            directoryExists(path: string) {
                return fso.FolderExists(path);
            },
            createDirectory(directoryName: string) {
                if (!this.directoryExists(directoryName)) {
                    fso.CreateFolder(directoryName);
                }
            },
            getExecutingFilePath() {
                return WScript.ScriptFullName;
            },
            getCurrentDirectory() {
                return "";
            },
            getMemoryUsage() {
                return 0;
            },
            exit(exitCode?: number): void {
                WScript.Quit(exitCode);
            },
            useCaseSensitiveFileNames: false
        };
    }

    export function prepareCompiler(currentDir: string, stdOut: ITextWriter, stdErr: ITextWriter) {
        var shell = new RealActiveXObject("WScript.Shell");
        shell.CurrentDirectory = currentDir;
        WScript.ScriptFullName = currentDir + "\\tc.js";
        WScript.StdOut = stdOut;
        WScript.StdErr = stdErr;
        sys = getWScriptSystem();

        return function (commandLine: string) {
            ts.executeCommandLine(commandLine.split(" "));
        }
    }
}
