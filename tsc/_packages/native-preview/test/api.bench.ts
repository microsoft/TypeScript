import { fileURLToPath } from "node:url";
import { runBenchmarks as runAsyncBenchmarks } from "./async/api.bench.ts";
import { runBenchmarks as runSyncBenchmarks } from "./sync/api.bench.ts";

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    await runAsyncBenchmarks();
    runSyncBenchmarks();
}
