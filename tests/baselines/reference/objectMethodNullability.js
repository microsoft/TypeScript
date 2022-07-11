//// [objectMethodNullability.ts]
// All of the following should produce an error:

Object.assign(undefined);
Object.create(undefined);
Object.defineProperties(undefined, {});
Object.defineProperty(undefined, "foo", {});
Object.entries(undefined);
Object.getOwnPropertyDescriptor(undefined, "foo");
Object.getOwnPropertyDescriptors(undefined);
Object.getOwnPropertyNames(undefined);
Object.getOwnPropertySymbols(undefined);
Object.getPrototypeOf(undefined);
Object.hasOwn(undefined, "foo");
Object.keys(undefined);
Object.setPrototypeOf(undefined, {});
Object.values(undefined);

Object.create(0);
Object.defineProperties(0, {});
Object.defineProperty(0, "foo", {});

// While the following should not:

Object.assign(0);
Object.entries(0);
Object.getOwnPropertyDescriptor(0, "foo");
Object.getOwnPropertyDescriptors(0);
Object.getOwnPropertyNames(0);
Object.getOwnPropertySymbols(0);
Object.getPrototypeOf(0);
Object.hasOwn(0, "foo");
Object.keys(0);
Object.setPrototypeOf(0, {});
Object.values(0);

Object.freeze(undefined);
Object.isExtensible(undefined);
Object.isFrozen(undefined);
Object.isSealed(undefined);
Object.preventExtensions(undefined);
Object.seal(undefined);

Object.freeze(0);
Object.isExtensible(0);
Object.isFrozen(0);
Object.isSealed(0);
Object.preventExtensions(0);
Object.seal(0);


//// [objectMethodNullability.js]
"use strict";
// All of the following should produce an error:
Object.assign(undefined);
Object.create(undefined);
Object.defineProperties(undefined, {});
Object.defineProperty(undefined, "foo", {});
Object.entries(undefined);
Object.getOwnPropertyDescriptor(undefined, "foo");
Object.getOwnPropertyDescriptors(undefined);
Object.getOwnPropertyNames(undefined);
Object.getOwnPropertySymbols(undefined);
Object.getPrototypeOf(undefined);
Object.hasOwn(undefined, "foo");
Object.keys(undefined);
Object.setPrototypeOf(undefined, {});
Object.values(undefined);
Object.create(0);
Object.defineProperties(0, {});
Object.defineProperty(0, "foo", {});
// While the following should not:
Object.assign(0);
Object.entries(0);
Object.getOwnPropertyDescriptor(0, "foo");
Object.getOwnPropertyDescriptors(0);
Object.getOwnPropertyNames(0);
Object.getOwnPropertySymbols(0);
Object.getPrototypeOf(0);
Object.hasOwn(0, "foo");
Object.keys(0);
Object.setPrototypeOf(0, {});
Object.values(0);
Object.freeze(undefined);
Object.isExtensible(undefined);
Object.isFrozen(undefined);
Object.isSealed(undefined);
Object.preventExtensions(undefined);
Object.seal(undefined);
Object.freeze(0);
Object.isExtensible(0);
Object.isFrozen(0);
Object.isSealed(0);
Object.preventExtensions(0);
Object.seal(0);
