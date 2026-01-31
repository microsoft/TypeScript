//// [tests/cases/compiler/cachedContextualTypes.ts] ////

//// [cachedContextualTypes.ts]
// Repro from #52198

declare function createInstance<Ctor extends new (...args: any[]) => any, R extends InstanceType<Ctor>>(ctor: Ctor, ...args: ConstructorParameters<Ctor>): R;

export interface IMenuWorkbenchToolBarOptions {
    toolbarOptions: {
        foo(bar: string): string
    };
}

class MenuWorkbenchToolBar {
    constructor(
        options: IMenuWorkbenchToolBarOptions | undefined,
    ) { }
}

createInstance(MenuWorkbenchToolBar, {
    toolbarOptions: {
        foo(bar) { return bar; }
    }
});


//// [cachedContextualTypes.js]
// Repro from #52198
class MenuWorkbenchToolBar {
    constructor(options) { }
}
createInstance(MenuWorkbenchToolBar, {
    toolbarOptions: {
        foo(bar) { return bar; }
    }
});
export {};
