// @module: esnext
// @filename: a.ts
export default function defer() {
    console.log("defer from a");
}

// @filename: b.ts
import defer from "a";

defer();