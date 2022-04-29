//// [typeCheckingInsideFunctionExpressionInArray.ts]
var functions = [function () {
  var k: string = 10;
    k = new Object();
    [1, 2, 3].NonexistantMethod();
    derp();
}];


//// [typeCheckingInsideFunctionExpressionInArray.js]
var functions = [function () {
        var k = 10;
        k = new Object();
        [1, 2, 3].NonexistantMethod();
        derp();
    }];
