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
"use strict";
// Repro from #52198
Object.defineProperty(exports, "__esModule", { value: true });
var MenuWorkbenchToolBar = /** @class */ (function () {
    function MenuWorkbenchToolBar(options) {
    }
    return MenuWorkbenchToolBar;
}());
createInstance(MenuWorkbenchToolBar, {
    toolbarOptions: {
        foo: function (bar) { return bar; }
    }
});
