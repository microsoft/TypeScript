import { deprecate } from "../../deprecatedCompat/deprecate.js";
import * as ts from "../_namespaces/ts.js";

describe("unittests:: debugDeprecation", () => {
    let loggingHost: ts.LoggingHost | undefined;
    beforeEach(() => {
        loggingHost = ts.Debug.loggingHost;
    });
    afterEach(() => {
        ts.Debug.loggingHost = loggingHost;
        loggingHost = undefined;
    });
    describe("deprecateFunction", () => {
        it("silent deprecation", () => {
            const deprecation = deprecate(ts.noop, {
                warnAfter: "3.9",
                typeScriptVersion: "3.8",
            });
            let logWritten = false;
            ts.Debug.loggingHost = {
                log() {
                    logWritten = true;
                },
            };
            deprecation();
            assert.isFalse(logWritten);
        });
        it("warning deprecation with warnAfter", () => {
            const deprecation = deprecate(ts.noop, {
                warnAfter: "3.9",
                typeScriptVersion: "3.9",
            });
            let logWritten = false;
            ts.Debug.loggingHost = {
                log() {
                    logWritten = true;
                },
            };
            deprecation();
            assert.isTrue(logWritten);
        });
        it("warning deprecation without warnAfter", () => {
            const deprecation = deprecate(ts.noop, {
                typeScriptVersion: "3.9",
            });
            let logWritten = false;
            ts.Debug.loggingHost = {
                log() {
                    logWritten = true;
                },
            };
            deprecation();
            assert.isTrue(logWritten);
        });
        it("warning deprecation writes once", () => {
            const deprecation = deprecate(ts.noop, {
                typeScriptVersion: "3.9",
            });
            let logWrites = 0;
            ts.Debug.loggingHost = {
                log() {
                    logWrites++;
                },
            };
            deprecation();
            deprecation();
            assert.equal(logWrites, 1);
        });
        it("error deprecation with errorAfter", () => {
            const deprecation = deprecate(ts.noop, {
                warnAfter: "3.8",
                errorAfter: "3.9",
                typeScriptVersion: "3.9",
            });
            let logWritten = false;
            ts.Debug.loggingHost = {
                log() {
                    logWritten = true;
                },
            };
            expect(deprecation).throws();
            assert.isFalse(logWritten);
        });
        it("error deprecation with error", () => {
            const deprecation = deprecate(ts.noop, {
                error: true,
            });
            let logWritten = false;
            ts.Debug.loggingHost = {
                log() {
                    logWritten = true;
                },
            };
            expect(deprecation).throws();
            assert.isFalse(logWritten);
        });
    });
});
