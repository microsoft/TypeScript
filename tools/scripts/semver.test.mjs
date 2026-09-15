import assert from "node:assert/strict";
import { test } from "node:test";

import { isSemVer } from "./semver.mjs";

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
