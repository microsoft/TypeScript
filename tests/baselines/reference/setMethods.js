//// [tests/cases/compiler/setMethods.ts] ////

//// [setMethods.ts]
let numberSet = new Set([0, 1, 2]);

let stringSet = new Set(["a", "b"]);

let numberMap = new Map([[4, {}], [5, {}]]);

let numberSetLike = {
  size: 1,
  *keys() { yield 3 },
  has(x) { return x === 3 },
};

numberSet.union([]);
numberSet.union(new Set);
numberSet.union(stringSet);
numberSet.union(numberMap);
numberSet.union(numberSetLike);

numberSet.intersection([]);
numberSet.intersection(new Set);
numberSet.intersection(stringSet);
numberSet.intersection(numberMap);
numberSet.intersection(numberSetLike);

numberSet.difference([]);
numberSet.difference(new Set);
numberSet.difference(stringSet);
numberSet.difference(numberMap);
numberSet.difference(numberSetLike);

numberSet.symmetricDifference([]);
numberSet.symmetricDifference(new Set);
numberSet.symmetricDifference(stringSet);
numberSet.symmetricDifference(numberMap);
numberSet.symmetricDifference(numberSetLike);

numberSet.isSubsetOf([]);
numberSet.isSubsetOf(new Set);
numberSet.isSubsetOf(stringSet);
numberSet.isSubsetOf(numberMap);
numberSet.isSubsetOf(numberSetLike);

numberSet.isSupersetOf([]);
numberSet.isSupersetOf(new Set);
numberSet.isSupersetOf(stringSet);
numberSet.isSupersetOf(numberMap);
numberSet.isSupersetOf(numberSetLike);

numberSet.isDisjointFrom([]);
numberSet.isDisjointFrom(new Set);
numberSet.isDisjointFrom(stringSet);
numberSet.isDisjointFrom(numberMap);
numberSet.isDisjointFrom(numberSetLike);


//// [setMethods.js]
let numberSet = new Set([0, 1, 2]);
let stringSet = new Set(["a", "b"]);
let numberMap = new Map([[4, {}], [5, {}]]);
let numberSetLike = {
    size: 1,
    *keys() { yield 3; },
    has(x) { return x === 3; },
};
numberSet.union([]);
numberSet.union(new Set);
numberSet.union(stringSet);
numberSet.union(numberMap);
numberSet.union(numberSetLike);
numberSet.intersection([]);
numberSet.intersection(new Set);
numberSet.intersection(stringSet);
numberSet.intersection(numberMap);
numberSet.intersection(numberSetLike);
numberSet.difference([]);
numberSet.difference(new Set);
numberSet.difference(stringSet);
numberSet.difference(numberMap);
numberSet.difference(numberSetLike);
numberSet.symmetricDifference([]);
numberSet.symmetricDifference(new Set);
numberSet.symmetricDifference(stringSet);
numberSet.symmetricDifference(numberMap);
numberSet.symmetricDifference(numberSetLike);
numberSet.isSubsetOf([]);
numberSet.isSubsetOf(new Set);
numberSet.isSubsetOf(stringSet);
numberSet.isSubsetOf(numberMap);
numberSet.isSubsetOf(numberSetLike);
numberSet.isSupersetOf([]);
numberSet.isSupersetOf(new Set);
numberSet.isSupersetOf(stringSet);
numberSet.isSupersetOf(numberMap);
numberSet.isSupersetOf(numberSetLike);
numberSet.isDisjointFrom([]);
numberSet.isDisjointFrom(new Set);
numberSet.isDisjointFrom(stringSet);
numberSet.isDisjointFrom(numberMap);
numberSet.isDisjointFrom(numberSetLike);
