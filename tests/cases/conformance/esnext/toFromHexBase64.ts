// @target: esnext, es2024

const arr1 = Uint8Array.fromBase64("AAAAAA==");
const arr2 = Uint8Array.fromBase64("AAAAAA", { alphabet: "base64url" });
const arr3 = Uint8Array.fromHex("000000");

const encodedBase64_1 = arr1.toBase64();
const encodedBase64_2 = arr1.toBase64({ alphabet: "base64", omitPadding: undefined });
const encodedBase64_3 = arr1.toBase64({ alphabet: "base64url", omitPadding: true });

const encodedHex_1 = arr1.toHex();

const target1 = new Uint8Array(10);
const r0 = target1.setFromBase64("AAAAAA==");
const r1 = target1.setFromBase64("AAAAAA==", undefined);
const r2 = target1.setFromBase64("AAAAAA==", { lastChunkHandling: "strict" });
const r3 = target1.setFromBase64("AAAAAA", {
  alphabet: "base64url",
  lastChunkHandling: "stop-before-partial"
});

const target2 = new Uint8Array(10);
const r4 = target2.setFromHex("000000");

const totalWritten = r0.written + r1.written + r2.written + r3.written + r4.written;
const totalRead = r0.read + r1.read + r2.read + r3.read + r4.read;
