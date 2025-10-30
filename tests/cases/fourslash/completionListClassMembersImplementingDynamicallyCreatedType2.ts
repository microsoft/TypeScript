/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/62689

//// type EventType = "start" | "foo" | "bar" | "fooBar" | "end";
////
//// type EventDataType<T extends EventType> = T extends "fooBar"
////   ? { foo: string; bar: number }
////   : T extends "foo"
////   ? { foo: string }
////   : T extends "bar"
////   ? { bar: number }
////   : T extends EventType
////   ? Record<string, any>
////   : never;
////
//// type ListenerFunction<T extends EventType> = (
////   context: any,
////   data: EventDataType<T>,
//// ) => void | Promise<void>;
////
//// type EvtListenerMethods = {
////   [K in EventType as `on${Capitalize<K>}`]?: ListenerFunction<K>;
//// };
////
//// class A implements EvtListenerMethods {
////   onFoo(context: any, data: EventDataType<"foo">) {}
////   onBar(context: any, data: { abcd: any }) {}
////   /*1*/
//// }
////
//// interface EvtListener extends EvtListenerMethods {}
////
//// class B implements EvtListener {
////   onFoo(context: any, data: EventDataType<"foo">) {}
////   onBar(context: any, data: { abcd: any }) {}
////   /*2*/
//// }
////
//// interface EvtListenerHardcoded {
////   onStart?: ListenerFunction<"start">;
////   onFooBar?: ListenerFunction<"fooBar">;
////   onFoo?: ListenerFunction<"foo">;
////   onBar?: ListenerFunction<"bar">;
////   onEnd?: ListenerFunction<"end">;
//// }
////
//// class C implements EvtListenerHardcoded {
////   onFoo(context: any, data: EventDataType<"foo">) {}
////   onBar(context: any, data: { abcd: any }) {}
////   /*3*/
//// }

verify.completions({
  marker: ["1", "2", "3"],
  includes: ["onStart", "onEnd", "onFooBar"],
  excludes: ["onFoo", "onBar"],
  isNewIdentifierLocation: true,
});

verify.completions({
  marker: ["1", "2", "3"],
  includes: [
    {
      name: "onStart",
      insertText: `onStart?: ListenerFunction<"start">;`,
      filterText: "onStart",
    },
    {
      name: "onEnd",
      insertText: `onEnd?: ListenerFunction<"end">;`,
      filterText: "onEnd",
    },
    {
      name: "onFooBar",
      insertText: `onFooBar?: ListenerFunction<"fooBar">;`,
      filterText: "onFooBar",
    },
  ],
  excludes: ["onFoo", "onBar"],
  isNewIdentifierLocation: true,
  preferences: {
    includeCompletionsWithClassMemberSnippets: true,
    includeCompletionsWithInsertText: true,
  },
});
