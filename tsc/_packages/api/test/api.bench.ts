import { fileURLToPath } from "node:url";
import { runBenchmarks as runAsyncBenchmarks } from "./api.async.bench.ts";
import { runBenchmarks as runSyncBenchmarks } from "./api.sync.bench.ts";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    await runAsyncBenchmarks();
    await runSyncBenchmarks();
}
