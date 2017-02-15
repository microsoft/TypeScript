/// <reference types="node" />


// watchguard process
// exit if parent process has exited
process.on("disconnect", () => process.exit(0));

const fs: { watch(directoryName: string, options: any, callback: () => {}): any } = require("fs");
process.on("message", function(msg: WatchDirectoryRequest) {
    let ok = false;
    try {
        // try to set watcher for a given folder - treat absence of exceptions as success
        const watcher = fs.watch(msg.directory, { recursive: true }, () => ({}));
        watcher.close();
        ok = true;
    }
    catch(e) {
    }
    process.send(<WatchDirectoryResponse>{ id: msg.id, directory: msg.directory, ok });
});