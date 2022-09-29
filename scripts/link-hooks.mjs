import fs from "fs";
import path from "path";

const hooks = [
    "post-checkout"
];

hooks.forEach((hook) => {
    const hookInSourceControl = path.resolve(__dirname, "hooks", hook);

    if (fs.existsSync(hookInSourceControl)) {
        const hookInHiddenDirectory = path.resolve(__dirname, "..", ".git", "hooks", hook);

        if (fs.existsSync(hookInHiddenDirectory)) {
            fs.unlinkSync(hookInHiddenDirectory);
        }

        fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
    }
});
