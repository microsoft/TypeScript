import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { isSemVer } from "./configure-release.mjs";

test("valid SemVer versions", () => {
    for (
        const version of [
            "7.0.3",
            "7.0.3-alpha",
            "7.0.3-alpha.0",
            "7.0.3-alpha.0+build.1",
            "7.0.3+build.1",
            "4294967295.0.0",
        ]
    ) {
        assert.equal(isSemVer(version), true, version);
    }
});

test("invalid SemVer versions", () => {
    for (
        const version of [
            "7.0",
            "07.0.3",
            "7.00.3",
            "7.0.03",
            "7.0.3-01",
            "7.0.3-alpha..1",
            "7.0.3+build..1",
            "4294967296.0.0",
        ]
    ) {
        assert.equal(isSemVer(version), false, version);
    }
});

test("copied release configuration script is self-contained", () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "configure-release-"));
    try {
        const script = path.join(temp, "configure-release.mjs");
        fs.copyFileSync(fileURLToPath(new URL("./configure-release.mjs", import.meta.url)), script);
        fs.mkdirSync(path.join(temp, "tsc/internal/core"), { recursive: true });
        fs.writeFileSync(path.join(temp, "tsc/internal/core/version.go"), 'package core\n\nvar version = "0.0.0"\n');
        fs.writeFileSync(
            path.join(temp, "Herebyfile.mjs"),
            "const nativePreviewReleaseVersion = /** @type {string | undefined} */ (process.env.NATIVE_PREVIEW_RELEASE_VERSION);\n",
        );

        execFileSync(process.execPath, [script, "7.0.3+build.1", "7.0"], { cwd: temp });

        assert.match(fs.readFileSync(path.join(temp, "tsc/internal/core/version.go"), "utf8"), /var version = "7\.0\.3\+build\.1"/);
        assert.match(fs.readFileSync(path.join(temp, "Herebyfile.mjs"), "utf8"), /\("7\.0\.3\+build\.1"\)/);
    }
    finally {
        fs.rmSync(temp, { recursive: true, force: true });
    }
});
