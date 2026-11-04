//// [tests/cases/compiler/domResizeObserverExplicitArrayCallback.ts] ////

//// [domResizeObserverExplicitArrayCallback.ts]
new ResizeObserver((entries: ResizeObserverEntry[]) => {});


//// [domResizeObserverExplicitArrayCallback.js]
"use strict";
new ResizeObserver((entries) => { });
