//// [/lib/incremental-declaration-changesOutput.txt]
/lib/tsc --b /src --verbose
12:04:00 AM - Projects in this build: 
    * src/tsconfig.json

12:04:00 AM - Project 'src/tsconfig.json' is out of date because oldest output 'src/obj/bar.js' is older than newest input 'src/bar.ts'

12:04:00 AM - Building project '/src/tsconfig.json'...

src/lazyIndex.ts(4,5): error TS2554: Expected 0 arguments, but got 1.
exitCode:: 1


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

