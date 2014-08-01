/// <reference path="fourslash.ts" />

//// interface IFoo<T> { }
//// interface Array<T> /**/extends IFoo<T> { }

goTo.marker();
edit.deleteAtCaret('extends IFoo<T>'.length);
