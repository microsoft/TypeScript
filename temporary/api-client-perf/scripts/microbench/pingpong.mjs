import { spawn } from "node:child_process";
import {
    readSync,
    writeSync,
} from "node:fs";
const spinClient = process.env.SPIN === "1";
const [cmd, ...args] = process.argv.slice(2);
const child = spawn(cmd, args, { stdio: ["pipe", "pipe", "inherit"] });
const r = child.stdout._handle.fd, w = child.stdin._handle.fd;
child.stdout._handle.setBlocking?.(!spinClient);
child.stdin._handle.setBlocking?.(true);
child.stdout.pause();
child.unref();
child.stdout.unref();
child.stdin.unref();
const buf = Buffer.alloc(200, 120), rb = Buffer.alloc(65536);
const N = 100000;
let eagain = 0;
for (let k = 0; k < 2; k++) {
    const t = performance.now();
    for (let i = 0; i < N; i++) {
        writeSync(w, buf, 0, 200);
        let got = 0;
        while (got < 200) {
            try {
                got += readSync(r, rb, 0, 65536, null);
            }
            catch (e) {
                if (e.code !== "EAGAIN") throw e;
                eagain++;
            }
        }
    }
    console.log(cmd, args.join(" "), "spinClient=" + spinClient, ((performance.now() - t) / N * 1000).toFixed(2), "us", "eagain/req", (eagain / N / (k + 1)).toFixed(1));
}
child.kill();
