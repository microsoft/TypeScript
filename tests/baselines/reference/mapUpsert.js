//// [tests/cases/compiler/mapUpsert.ts] ////

//// [mapUpsert.ts]
declare const map: Map<string, number>;
declare const mapR: ReadonlyMap<string, number>;
declare const mapW: WeakMap<object, number>;

// OK
map.getOrInsert("key", 123);
map.getOrInsertComputed("key", () => 123);
map.getOrInsertComputed("key", (key: string) => 123);
mapW.getOrInsert({}, 123);
mapW.getOrInsertComputed({}, () => 123);
mapW.getOrInsertComputed({}, (key: object) => 123);

// Errors
map.getOrInsert("key");
map.getOrInsert("key", "value");
map.getOrInsert("key", () => 123);
map.getOrInsertComputed("key");
map.getOrInsertComputed("key", 123);
map.getOrInsertComputed("key", () => "value");
mapW.getOrInsert({});
mapW.getOrInsert({}, "value");
mapW.getOrInsert({}, () => 123);
mapW.getOrInsertComputed({});
mapW.getOrInsertComputed({}, 123);
mapW.getOrInsertComputed({}, () => "value");

// Not present on readonly interface
mapR.getOrInsert("key", 123);
mapR.getOrInsertComputed("key", () => 123);


//// [mapUpsert.js]
// OK
map.getOrInsert("key", 123);
map.getOrInsertComputed("key", function () { return 123; });
map.getOrInsertComputed("key", function (key) { return 123; });
mapW.getOrInsert({}, 123);
mapW.getOrInsertComputed({}, function () { return 123; });
mapW.getOrInsertComputed({}, function (key) { return 123; });
// Errors
map.getOrInsert("key");
map.getOrInsert("key", "value");
map.getOrInsert("key", function () { return 123; });
map.getOrInsertComputed("key");
map.getOrInsertComputed("key", 123);
map.getOrInsertComputed("key", function () { return "value"; });
mapW.getOrInsert({});
mapW.getOrInsert({}, "value");
mapW.getOrInsert({}, function () { return 123; });
mapW.getOrInsertComputed({});
mapW.getOrInsertComputed({}, 123);
mapW.getOrInsertComputed({}, function () { return "value"; });
// Not present on readonly interface
mapR.getOrInsert("key", 123);
mapR.getOrInsertComputed("key", function () { return 123; });
