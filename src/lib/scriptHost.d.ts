

/////////////////////////////
/// Windows Script Host APIS
/////////////////////////////


interface ActiveXObject {
    new (s: string): any;
}
declare var ActiveXObject: ActiveXObject;

interface ITextStreamBase {
    Column: number;
    Line: number;
    Close(): void;
}

interface ITextWriter extends ITextStreamBase {
    Write(s: string): void;
    WriteBlankLines(intLines: number): void;
    WriteLine(s: string): void;
}

interface ITextReader extends ITextStreamBase {
    Read(characters: number): string;
    ReadAll(): string;
    ReadLine(): string;
    Skip(characters: number): void;
    SkipLine(): void;
    AtEndOfLine: boolean;
    AtEndOfStream: boolean;
}

declare var WScript: {
    Echo(s: any): void;
    StdErr: ITextWriter;
    StdOut: ITextWriter;
    Arguments: { length: number; Item(n: number): string; };
    ScriptFullName: string;
    Quit(exitCode?: number): number;
    BuildVersion: number;
    FullName: string;
    Interactive: boolean;
    Name: string;
    Path: string;
    ScriptName: string;
    StdIn: ITextReader;
    Version: string;
    ConnectObject(objEventSource: any, strPrefix: string): void;
    CreateObject(strProgID: string, strPrefix?: string): any;
    DisconnectObject(obj: any): void;
    GetObject(strPathname: string, strProgID?: string, strPrefix?: string): any;
    Sleep(intTime: number): void;
}
