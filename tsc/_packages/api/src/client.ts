import { SyncRpcChannel } from "@typescript/libsyncrpc";
import type { FileSystem } from "./fs.ts";

export interface ClientOptions {
    tsserverPath: string;
    cwd?: string;
    logFile?: string;
    fs?: FileSystem;
}

export class Client {
    private channel: SyncRpcChannel;
    private encoder = new TextEncoder();

    constructor(options: ClientOptions) {
        const args = [
            "--api",
            "--cwd",
            options.cwd ?? process.cwd(),
        ];

        // Enable virtual FS callbacks for each provided FS function
        if (options.fs && Object.keys(options.fs).length > 0) {
            args.push(`--callbacks=${Object.keys(options.fs).join(",")}`);
        }

        this.channel = new SyncRpcChannel(options.tsserverPath, args);

        if (options.fs) {
            for (const [key, callback] of Object.entries(options.fs)) {
                this.channel.registerCallback(key, (_, arg) => {
                    const result = callback(JSON.parse(arg));
                    return JSON.stringify(result) ?? "";
                });
            }
        }
    }

    request(method: string, payload: any): any {
        const encodedPayload = JSON.stringify(payload);
        const result = this.channel.requestSync(method, encodedPayload);
        if (result.length) {
            const decodedResult = JSON.parse(result);
            return decodedResult;
        }
    }

    requestBinary(method: string, payload: any): Uint8Array {
        return this.channel.requestBinarySync(method, this.encoder.encode(JSON.stringify(payload)));
    }

    echo(payload: string): string {
        return this.channel.requestSync("echo", payload);
    }

    echoBinary(payload: Uint8Array): Uint8Array {
        return this.channel.requestBinarySync("echo", payload);
    }

    close(): void {
        this.channel.close();
    }
}
