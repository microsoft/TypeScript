import { cpSync } from "node:fs";

cpSync(new URL("../src/enums", import.meta.url), new URL("../dist/enums", import.meta.url), { recursive: true });
