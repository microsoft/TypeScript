// API echo round-trip latency for a saved build (see snapshot-build.mjs).
// Usage: node echo.mjs <client-root> <tsc-binary> [client-poll-us] [server-poll-us]
// Builds without polling support ignore the poll arguments.
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [clientRoot, binary, clientPoll = "0", serverPoll = "0"] = process.argv.slice(2);
if (!clientRoot || !binary) throw new Error("Usage: node echo.mjs <client-root> <tsc-binary> [client-poll-us] [server-poll-us]");
const { API } = await import(pathToFileURL(join(clientRoot, "dist/api/sync/api.js")).href);
const api = new API({
    cwd: tmpdir(),
    tsserverPath: binary,
    responsePollMicroseconds: Number(clientPoll),
    serverRequestPollMicroseconds: Number(serverPoll),
});
const client = api.client;
const iterations = Number(process.env.ECHO_ITERATIONS ?? 100000);
const result = { clientPollUs: Number(clientPoll), serverPollUs: Number(serverPoll), usPerEcho: {} };
for (const payload of ["x", "x".repeat(200), "x".repeat(2000)]) {
    for (let i = 0; i < 5000; i++) client.echo(payload);
    const start = performance.now();
    for (let i = 0; i < iterations; i++) client.echo(payload);
    result.usPerEcho[payload.length] = Number(((performance.now() - start) / iterations * 1000).toFixed(2));
}
api.close();
console.log(JSON.stringify(result));
