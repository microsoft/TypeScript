import { nodeProcess } from "./nodeProcess.ts";
import {
    combineTimingInfo,
    type ServerTimingInfo,
    type TimingInfo,
} from "./timing.ts";

/** One final snapshot per client, written before its connection is closed. */
export class TimingDump {
    private readonly instanceId = nodeProcess().getBuiltinModule("node:crypto").randomUUID();
    private readonly startedAt = new Date().toISOString();
    private readonly directory: string;
    private readonly mode: "sync" | "async";
    private readonly transport: "spawn" | "socket";

    static fromEnvironment(mode: "sync" | "async", transport: "spawn" | "socket"): TimingDump | undefined {
        const process = nodeProcess();
        const directory = process.env.TS_API_TIMING_DIR;
        return directory ? new TimingDump(process.getBuiltinModule("node:path").resolve(directory), mode, transport) : undefined;
    }

    private constructor(directory: string, mode: "sync" | "async", transport: "spawn" | "socket") {
        this.directory = directory;
        this.mode = mode;
        this.transport = transport;
    }

    write(client: TimingInfo, server: ServerTimingInfo | undefined, serverTimingError?: string): void {
        const process = nodeProcess();
        const { mkdirSync, writeFileSync } = process.getBuiltinModule("node:fs");
        const { join } = process.getBuiltinModule("node:path");
        const snapshot = {
            schemaVersion: 1,
            instanceId: this.instanceId,
            pid: process.pid,
            mode: this.mode,
            transport: this.transport,
            startedAt: this.startedAt,
            closedAt: new Date().toISOString(),
            timing: server ? combineTimingInfo(client, server) : client,
            serverTiming: server ?? null,
            serverTimingError,
        };
        mkdirSync(this.directory, { recursive: true });
        writeFileSync(
            join(this.directory, `timing-${process.pid}-${this.instanceId}.json`),
            JSON.stringify(snapshot) + "\n",
            { flag: "wx" },
        );
    }
}
