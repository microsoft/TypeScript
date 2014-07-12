//// [assign1.ts]
module M {
    interface I {
        salt:number;
        pepper:number;
    }

    var x:I={salt:2,pepper:0};
}


//// [assign1.js]
var M;
(function (M) {
    var x = { salt: 2, pepper: 0 };
})(M || (M = {}));
