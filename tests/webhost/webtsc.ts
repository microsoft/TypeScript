/// <reference path='..\..\src\compiler\tsc.ts'/>

namespace TypeScript.WebTsc {

    declare var RealActiveXObject: { new (s: string): any };

    function getWScriptSystem() {
        const fso = new RealActiveXObject("Scripting.FileSystemObject");

        const fileStream = new ActiveXObject("ADODB.Stream");
        fileStream.Type = 2 /*text*/;

        const args: string[] = [];
        for (let i = 0; i < WScript.Arguments.length; i++) {
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
            readFile(fileName: string, encoding?: string): string {
                if (!fso.FileExists(fileName)) {
                    return undefined;
                }
                fileStream.Open();
                try {
                    if (encoding) {
                        fileStream.Charset = encoding;
                        fileStream.LoadFromFile(fileName);
                    }
                    else {
                        // Load file and read the first two bytes into a string with no interpretation
                        fileStream.Charset = "x-ansi";
                        fileStream.LoadFromFile(fileName);
                        const bom = fileStream.ReadText(2) || "";
                        // Position must be at 0 before encoding can be changed
                        fileStream.Position = 0;
                        // [0xFF,0xFE] and [0xFE,0xFF] mean utf-16 (little or big endian), otherwise default to utf-8
                        fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                    }
                    // ReadText method always strips byte order mark from resulting string
                    return fileStream.ReadText();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    fileStream.Close();
                }
            },
            writeFile(fileName: string, data: string): boolean {
                const f = fso.CreateTextFile(fileName, true);
                f.Write(data);
                f.Close();
                return true;
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
        const shell = new RealActiveXObject("WScript.Shell");
        shell.CurrentDirectory = currentDir;
        WScript.ScriptFullName = currentDir + "\\tc.js";
        WScript.StdOut = stdOut;
        WScript.StdErr = stdErr;
        sys = getWScriptSystem();

        return (commandLine: string) => {
            ts.executeCommandLine(commandLine.split(" "));
        };
    }
}
