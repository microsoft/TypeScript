import { API } from "/workspaces/TypeScript/packages/typescript/dist/api/sync/api.js";
const api = new API({ cwd: "/tmp", tsserverPath: "/workspaces/TypeScript/built/local/tsc" });
const client = api.client;
const N = 100000;
for (const payload of ["x", "x".repeat(200), "x".repeat(2000)]) {
    for (let i = 0; i < 5000; i++) client.echo(payload);
    const t = performance.now();
    for (let i = 0; i < N; i++) client.echo(payload);
    const dt = performance.now() - t;
    console.log(payload.length, ((dt / N) * 1000).toFixed(2), "us/echo");
}
api.close();
