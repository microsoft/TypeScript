import * as fs from "fs";

if (process.argv.length < 3) {
    process.exit(1);
}
const directoryName = process.argv[2];
// main reason why we need separate process to check if it is safe to watch some path
// is to guard against crashes that cannot be intercepted with protected blocks and
// code in tsserver already can handle normal cases, like non-existing folders.
// This means that here we treat any result (success or exception) from fs.watch as success since it does not tear down the process.
// The only case that should be considered as failure - when watchGuard process crashes.
try {
    const watcher = fs.watch(directoryName, { recursive: true }, () => ({}));
    watcher.close();
}
catch { /*ignore*/ }
process.exit(0);
