import { fsCallbackNames } from "../fs.ts";
import {
    type ClientOptions,
    type ClientSocketOptions,
    type ClientSpawnOptions,
    isSpawnOptions,
} from "../options.ts";
import { SyncRpcChannel } from "../syncChannel.ts";

export type { ClientOptions, ClientSocketOptions, ClientSpawnOptions };

export class Client {
    private channel: SyncRpcChannel;
    private encoder = new TextEncoder();

    constructor(options: ClientOptions) {
        if (!isSpawnOptions(options)) {
            throw new Error("Socket connections are not yet supported in the sync client");
        }

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

        const channel = new SyncRpcChannel(options.tsserverPath, args);
        this.channel = channel;

        if (options.fs) {
            for (const name of enabledCallbacks) {
                const callback = options.fs[name]!;
                channel.registerCallback(name, (_, arg) => {
                    const result = callback(JSON.parse(arg));
                    if (name === "readFile") {
                        // readFile has 3 returns: string (content), null (not found), undefined (fall back).
                        // Wrap in object to preserve null vs undefined distinction.
                        if (result === undefined) return "";
                        return JSON.stringify({ content: result });
                    }
                    return JSON.stringify(result) ?? "";
                });
            }
        }
    }

    apiRequest<T>(method: string, params?: unknown): T {
        const encodedPayload = JSON.stringify(params);
        const result = this.channel.requestSync(method, encodedPayload);
        if (result.length) {
            return JSON.parse(result) as T;
        }
        return undefined as unknown as T;
    }

    apiRequestBinary(method: string, params?: unknown): Uint8Array | undefined {
        const result = this.channel.requestBinarySync(method, this.encoder.encode(JSON.stringify(params)));
        if (result.length === 0) return undefined;
        return result;
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
