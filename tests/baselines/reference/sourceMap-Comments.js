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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var sas;
(function (sas) {
    var tools;
    (function (tools) {
        var Test = (function () {
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
            __names(Test.prototype, ["doX"]);
            return Test;
        }());
        tools.Test = Test;
    })(tools = sas.tools || (sas.tools = {}));
})(sas || (sas = {}));
//# sourceMappingURL=sourceMap-Comments.js.map