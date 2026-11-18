// @target: esnext

declare function getPlugins(): any;
declare function getPluginsGeneric<T>(): T;
declare function getPluginsFactory(): <T>() => T;
declare const obj: any;
declare class Foo { [key: string]: any }

// Parentheses are required when a call is at the start of the member chain of a `new` expression's target
const a1 = new (getPlugins() as any).Linker();
const a2 = new (getPlugins() satisfies any).Linker();
const a3 = new (<any>getPlugins()).Linker();
const a4 = new (getPlugins() as any)!.Linker();
const a5 = new (getPlugins() as any)["Linker"]();
const a6 = new (getPlugins() as any).ns.Linker();
const a7 = new (getPlugins() as any).Linker;
const a8 = new (getPlugins() as any)`tag`();
const a9 = new (obj.getPlugins() as any).Linker();
const a10 = new (getPlugins().ns as any).Linker();
const a11 = new ((getPlugins() as any) as any).Linker();
const a12 = new (getPluginsGeneric<any>() as any).Linker();
const a13 = new (getPluginsFactory()<string> as any).Linker();
const a14 = new (getPlugins() as any).Linker(new (getPlugins() as any).Options());

// Parentheses are not required, or are already present
const b1 = new (getPlugins() as any)();
const b2 = new (getPlugins()).Linker();
const b3 = new (new Foo() as any).Linker();
const b4 = new (new Foo as any).Linker();
const b5 = new (obj?.getPlugins() as any).Linker();
const b6 = new (obj[getPlugins()] as any).Linker();
const b7 = new (obj.ns as any).Linker();
