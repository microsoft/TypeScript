// @useCaseSensitiveFileNames: false
// @filename: C:/foo/bar/Baz/src/utils.ts
export function exist() {}
// @filename: C:/foo/bar/Baz/src/sample.ts
import { exit } from "./utils.js";

exit()