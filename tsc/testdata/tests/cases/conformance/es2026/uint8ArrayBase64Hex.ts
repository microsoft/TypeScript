// @target: esnext
// @lib: es2025,es2026.typedarrays
// @noEmit: true
// @strict: true

const bytes = Uint8Array.fromBase64("AQID", { alphabet: "base64" });
const base64: string = bytes.toBase64({ alphabet: "base64url", omitPadding: true });
const base64Result: { read: number; written: number } = bytes.setFromBase64("BAUG", {
    lastChunkHandling: "strict",
});

const hexBytes: Uint8Array<ArrayBuffer> = Uint8Array.fromHex("010203");
const hex: string = hexBytes.toHex();
const hexResult: { read: number; written: number } = hexBytes.setFromHex("040506");
