package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDiagnosticsDefaultImportMergedWithJSDocTypeAlias1(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @Filename: /lib/types.d.ts
export interface RunnerOptions {
  dryRun?: boolean;
}

// @Filename: /lib/runner.js
"use strict";

/**
 * @typedef {import('./types.d.ts').RunnerOptions} RunnerOptions
 */

var EventEmitter = require("node:events").EventEmitter;

class Runner extends EventEmitter {
  constructor() { super(); }
}

module.exports = Runner;

// @Filename: /lib/stats-collector.mjs
/** @typedef {import('./runner.js')} Runner */

import Runner from "./runner.js";

const createStatsCollector = (runner) => runner && Runner;

export { createStatsCollector };
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "/lib/stats-collector.mjs")
	f.VerifyNumberOfErrorsInCurrentFile(t, 2)
}
