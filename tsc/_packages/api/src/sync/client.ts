import {
    type FileSystem,
    fsCallbackNames,
} from "../fs.ts";
import { SyncRpcChannel } from "../syncChannel.ts";

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
        const cwd = options.cwd ?? process.cwd();
        const args = [
            "--api",
            "--cwd",
            cwd,
        ];

        // Enable virtual FS callbacks for each provided FS function
        const enabledCallbacks: (typeof fsCallbackNames[number])[] = [];
        if (options.fs) {
            for (const name of fsCallbackNames) {
                if (options.fs[name]) {
                    enabledCallbacks.push(name);
                }
            }
        }
        if (enabledCallbacks.length > 0) {
            args.push(`--callbacks=${enabledCallbacks.join(",")}`);
        }

        this.channel = new SyncRpcChannel(options.tsserverPath, args);

        if (options.fs) {
            for (const name of enabledCallbacks) {
                const callback = options.fs[name]!;
                this.channel.registerCallback(name, (_, arg) => {
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
