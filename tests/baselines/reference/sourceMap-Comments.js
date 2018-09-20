//// [sourceMap-Comments.ts]
module sas.tools {
    export class Test {
        public doX(): void {
            let f: number = 2;
            switch (f) {
                case 1:
                    break;
                case 2:
                    //line comment 1
                    //line comment 2
                    break;
                case 3:
                    //a comment
                    break;
            }
        }
    }

}


//// [sourceMap-Comments.js]
var sas;
(function (sas) {
    var tools;
    (function (tools) {
        var Test = /** @class */ (function () {
            function Test() {
            }
            Test.prototype.doX = function () {
                var f = 2;
                switch (f) {
                    case 1:
                        break;
                    case 2:
                        //line comment 1
                        //line comment 2
                        break;
                    case 3:
                        //a comment
                        break;
                }
            };
            return Test;
        }());
        tools.Test = Test;
    })(tools = sas.tools || (sas.tools = {}));
})(sas || (sas = {}));
//# sourceMappingURL=sourceMap-Comments.js.map