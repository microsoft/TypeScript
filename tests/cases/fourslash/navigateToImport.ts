/// <reference path="fourslash.ts" />

// @Filename: library.ts
////export function foo() {}
////export function bar() {}
// @Filename: user.ts
////import {foo, bar as baz} from './library';

verify.navigationItemsListCount(1, "foo");
verify.navigationItemsListContains("foo", "function", "foo", "exact");
verify.navigationItemsListCount(1, "bar");
verify.navigationItemsListContains("bar", "function", "bar", "exact");
verify.navigationItemsListCount(1, "baz");
verify.navigationItemsListContains("baz", "alias", "baz", "exact");
