//// [tests/cases/compiler/newlinesOnLongMessagesWithPretty.ts] ////

//// [newlinesOnLongMessagesWithPretty.ts]
// a is 31 chars long
let a = { b: { c: { e: { f: 123 } } } };
let b = "hello"

// 'a' here is long enough to count in the source as a newline
a = b
// 'a' here is long enough to count in the target as a newline
b = a

// This won't trigger it because we only show the relation instead
a = { b: { c: { e: { f: {} } } } }

// No newlines here because they're both short
b = 123123



//// [newlinesOnLongMessagesWithPretty.js]
// a is 31 chars long
var a = { b: { c: { e: { f: 123 } } } };
var b = "hello";
// 'a' here is long enough to count in the source as a newline
a = b;
// 'a' here is long enough to count in the target as a newline
b = a;
// This won't trigger it because we only show the relation instead
a = { b: { c: { e: { f: {} } } } };
// No newlines here because they're both short
b = 123123;
