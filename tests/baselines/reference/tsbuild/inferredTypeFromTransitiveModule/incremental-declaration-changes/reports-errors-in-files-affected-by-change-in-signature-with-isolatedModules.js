//// [/lib/incremental-declaration-changesOutput.txt]
/lib/tsc --b /src --verbose
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because oldest output 'src/obj/bar.js' is older than newest input 'src/bar.ts'

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

[96msrc/lazyIndex.ts[0m:[93m4[0m:[93m5[0m - [91merror[0m[90m TS2554: [0mExpected 0 arguments, but got 1.

[7m4[0m bar("hello");
[7m [0m [91m    ~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/bar.ts]
interface RawAction {
    (...args: any[]): Promise<any> | void;
}
interface ActionFactory {
    <T extends RawAction>(target: T): T;
}
declare function foo<U extends any[] = any[]>(): ActionFactory;
export default foo()(function foobar(): void {
});

