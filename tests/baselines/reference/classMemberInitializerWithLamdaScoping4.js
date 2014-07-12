//// [classMemberInitializerWithLamdaScoping3_0.js]
exports.field1;
//// [classMemberInitializerWithLamdaScoping3_1.js]
var Test1 = (function () {
    function Test1(field1) {
        this.field1 = field1;
        this.messageHandler = function () {
            console.log(field1); // Should be error that couldnt find symbol field1
        };
    }
    return Test1;
})();
exports.Test1 = Test1;
