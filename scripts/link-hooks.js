var fs = require("fs");
var path = require("path");

var hooks = [
	"post-checkout"
];

hooks.forEach(function (hook) {
    var hookInSourceControl = path.resolve(__dirname, "hooks", hook);

    if (fs.existsSync(hookInSourceControl)) {
        var hookInHiddenDirectory = path.resolve(__dirname, "..", ".git", "hooks", hook);

        if (fs.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
    }
});