//// [classMemberInitializerWithLamdaScoping3_0.js]
var field1;
//// [classMemberInitializerWithLamdaScoping3_1.js]
var Test1 = (function () {
    function Test1(field1) {
        this.field1 = field1;
        this.messageHandler = function () {
            console.log(field1); // But this should be error as the field1 will resolve to var field1
            // but since this code would be generated inside constructor, in generated js
            // it would resolve to private field1 and thats not what user intended here.
        };
    }
    return Test1;
})();
exports.Test1 = Test1;
