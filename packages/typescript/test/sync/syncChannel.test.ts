import assert from "node:assert";
import {
    describe,
    test,
} from "node:test";
import {
    AdaptiveSpinState,
    SyncRpcChannel,
} from "../../src/api/syncChannel.ts";

const ms = 1_000_000n;

describe("sync channel - adaptive spin state", () => {
    test("suspends after three slow arrivals and resumes after three quick ones", () => {
        const state = new AdaptiveSpinState();
        assert.equal(state.spinning, true);
        // Replies that arrive 2 ms after the request are slow even if a 5 ms
        // budget would have caught them without blocking.
        assert.equal(state.observe(2n * ms), false);
        assert.equal(state.observe(2n * ms), false);
        assert.equal(state.observe(2n * ms), true);
        assert.equal(state.spinning, false);
        assert.equal(state.observe(20_000n), false);
        assert.equal(state.observe(20_000n), false);
        assert.equal(state.observe(20_000n), true);
        assert.equal(state.spinning, true);
    });

    test("one observation in the other direction resets the streak", () => {
        const state = new AdaptiveSpinState();
        state.observe(2n * ms);
        state.observe(2n * ms);
        state.observe(20_000n);
        state.observe(2n * ms);
        state.observe(2n * ms);
        assert.equal(state.spinning, true);
        assert.equal(state.observe(2n * ms), true);
        assert.equal(state.spinning, false);
        state.observe(20_000n);
        state.observe(20_000n);
        state.observe(2n * ms);
        state.observe(20_000n);
        state.observe(20_000n);
        assert.equal(state.spinning, false);
    });
});

// A stand-in for the API server: it answers every request with its payload,
// after the delay (in ms) the payload names, and with "split" writes the reply
// in two pieces a few hundred microseconds apart so that the client needs more
// than one read to complete it.
const fakeServer = `
const fs = require("node:fs");
const MSG_RESPONSE = 4;
const pause = new Int32Array(new SharedArrayBuffer(4));
let pending = Buffer.alloc(0);
function readBin(buffer, pos) {
    const marker = buffer[pos];
    let header, length;
    if (marker === 0xc4) { header = 2; length = buffer[pos + 1]; }
    else if (marker === 0xc5) { header = 3; length = buffer.readUInt16BE(pos + 1); }
    else if (marker === 0xc6) { header = 5; length = buffer.readUInt32BE(pos + 1); }
    else throw new Error("unexpected bin marker " + marker);
    if (buffer.length < pos + header + length) return undefined;
    return { data: buffer.subarray(pos + header, pos + header + length), end: pos + header + length };
}
function bin(data) {
    const header = Buffer.alloc(5);
    header[0] = 0xc6;
    header.writeUInt32BE(data.length, 1);
    return Buffer.concat([header, data]);
}
function respond(name, payload) {
    const [delay, mode] = payload.toString().split(":");
    const reply = Buffer.concat([Buffer.from([0x93, MSG_RESPONSE]), bin(name), bin(payload)]);
    const write = () => {
        if (mode === "split") {
            fs.writeSync(1, reply.subarray(0, reply.length - 1));
            Atomics.wait(pause, 0, 0, 0.3);
            fs.writeSync(1, reply.subarray(reply.length - 1));
        }
        else {
            fs.writeSync(1, reply);
        }
    };
    // A timer never fires in under a millisecond; "0" answers right away.
    if (delay === "0") write();
    else setTimeout(write, Number(delay));
}
process.stdin.on("data", chunk => {
    pending = Buffer.concat([pending, chunk]);
    for (;;) {
        if (pending.length < 3 || pending[0] !== 0x93) return;
        const name = readBin(pending, pending[1] === 0xcc ? 3 : 2);
        if (!name) return;
        const payload = readBin(pending, name.end);
        if (!payload) return;
        pending = pending.subarray(payload.end);
        respond(name.data, payload.data);
    }
});
`;

function spawnChannel(env: Record<string, string>): SyncRpcChannel {
    const saved = new Map(Object.keys(env).map(key => [key, process.env[key]]));
    try {
        Object.assign(process.env, env);
        return new SyncRpcChannel(process.execPath, ["-e", fakeServer]);
    }
    finally {
        for (const [key, value] of saved) {
            if (value === undefined) delete process.env[key];
            else process.env[key] = value;
        }
    }
}

describe("sync channel - adaptive spin over a pipe", { skip: process.platform === "win32" }, () => {
    test("suspends spinning when replies take more than 1 ms even inside the budget", () => {
        const channel = spawnChannel({ TSGO_SYNC_SPIN_US: "5000", TSGO_SYNC_SPIN_ADAPTIVE: "1" });
        try {
            assert.equal(channel.spinning, true);
            for (let i = 0; i < 3; i++) {
                assert.equal(channel.requestSync("echo", "2"), "2");
            }
            assert.equal(channel.spinning, false, "three replies that took 2 ms must suspend spinning although the 5 ms budget caught them");
            // Quick replies resume it; the fd is blocking in between and the
            // channel keeps working either way. Three in a row must be quick,
            // so allow the scheduler a few tries.
            for (let i = 0; i < 30 && !channel.spinning; i++) {
                assert.equal(channel.requestSync("echo", "0"), "0");
            }
            assert.equal(channel.spinning, true);
        }
        finally {
            channel.close();
        }
    });

    test("a reply read in several pieces is a single observation", () => {
        const channel = spawnChannel({ TSGO_SYNC_SPIN_US: "100", TSGO_SYNC_SPIN_ADAPTIVE: "1" });
        try {
            for (let i = 0; i < 3; i++) {
                assert.equal(channel.requestSync("echo", "3:split"), "3:split");
            }
            assert.equal(channel.spinning, false, "the quick read that completes a slow reply must not reset the slow streak");
            for (let i = 0; i < 30 && !channel.spinning; i++) {
                assert.equal(channel.requestSync("echo", "0:split"), "0:split");
            }
            assert.equal(channel.spinning, true);
        }
        finally {
            channel.close();
        }
    });

    test("spinning off and non-adaptive spinning keep their mode", () => {
        const off = spawnChannel({ TSGO_SYNC_SPIN_US: "0" });
        try {
            assert.equal(off.spinning, undefined);
            assert.equal(off.requestSync("echo", "2"), "2");
        }
        finally {
            off.close();
        }
        const fixed = spawnChannel({ TSGO_SYNC_SPIN_US: "100", TSGO_SYNC_SPIN_ADAPTIVE: "0" });
        try {
            for (let i = 0; i < 3; i++) {
                assert.equal(fixed.requestSync("echo", "2"), "2");
            }
            assert.equal(fixed.spinning, true);
        }
        finally {
            fixed.close();
        }
    });
});
