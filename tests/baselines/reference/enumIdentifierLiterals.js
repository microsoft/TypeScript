//// [enumIdentifierLiterals.ts]
enum Nums {
    1.0,
    11e-1,
    0.12e1,
    "13e-1",
    0xF00D
}

//// [enumIdentifierLiterals.js]
var Nums;
(function (Nums) {
    Nums[Nums[1] = 0] = 1;
    Nums[Nums[1.1] = 1] = 1.1;
    Nums[Nums[1.2] = 2] = 1.2;
    Nums[Nums["13e-1"] = 3] = "13e-1";
    Nums[Nums[61453] = 4] = 61453;
})(Nums || (Nums = {}));
