var decl = require("../decl");
function call() {
    var str = decl.call();
    if (str !== "success") {
        fail();
    }
}
exports.call = call;
