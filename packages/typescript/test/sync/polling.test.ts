import { API } from "@typescript/typescript/sync";
import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import { fileURLToPath } from "node:url";
import { createVirtualFileSystem } from "../testUtils.ts";

interface EchoClient {
    echo(payload: string): string;
}

const cwd = fileURLToPath(new URL("../../../../", import.meta.url).toString());
const sleep = new Int32Array(new SharedArrayBuffer(4));

describe("sync transport polling", () => {
    for (const responsePollMicroseconds of [0, 100]) {
        for (const serverRequestPollMicroseconds of [0, 50]) {
            test(`client ${responsePollMicroseconds}us, server ${serverRequestPollMicroseconds}us`, () => {
                const fs = createVirtualFileSystem({ "/tsconfig.json": "{}", "/index.ts": "export const x = 1;" });
                const readFile = fs.readFile!;
                using api = new API({
                    cwd,
                    responsePollMicroseconds,
                    serverRequestPollMicroseconds,
                    fs: {
                        ...fs,
                        readFile: fileName => {
                            // Respond well after any poll window so reads must fall back to blocking.
                            Atomics.wait(sleep, 0, 0, 5);
                            return readFile(fileName);
                        },
                    },
                });
                const client = (api as unknown as { client: EchoClient; }).client;
                for (const payload of ["x", "y".repeat(1000), "z".repeat(200_000)]) {
                    assert.equal(client.echo(payload), payload);
                }

                const snapshot = api.createSnapshot({ openFiles: ["/index.ts"] });
                const project = snapshot.getProjects()[0];
                const sourceFile = project.program.getSourceFile("/index.ts");
                assert.ok(sourceFile);
                const type = project.checker.getTypeAtLocation(sourceFile.statements[0]);
                assert.ok(type);
                assert.equal(client.echo("after"), "after");
            });
        }
    }
});
