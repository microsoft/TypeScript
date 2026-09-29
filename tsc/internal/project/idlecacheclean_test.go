package project

import (
	"testing"

	"gotest.tools/v3/assert"
)

// A snapshot update stands a pass over the workspace down, because the pass must not compete with
// work the user is waiting on. The idle clean updates the snapshot as well, and it is armed by a
// file event half a minute earlier, so on a project where a pass runs for minutes it lands in the
// middle of one. Nothing is waiting behind it, so the pass carries on.
func TestOnlyUpdatesSomeoneIsWaitingOnStandAPassDown(t *testing.T) {
	t.Parallel()

	waiting := []UpdateReason{
		UpdateReasonUnknown,
		UpdateReasonDidOpenFile,
		UpdateReasonDidCloseFile,
		UpdateReasonDidChangeCompilerOptionsForInferredProjects,
		UpdateReasonRequestedLanguageServicePendingChanges,
		UpdateReasonRequestedLanguageServiceProjectNotLoaded,
		UpdateReasonRequestedLanguageServiceForFileNotOpen,
		UpdateReasonRequestedLanguageServiceProjectDirty,
		UpdateReasonRequestedLoadProjectTree,
		UpdateReasonRequestedLanguageServiceWithAutoImports,
		UpdateReasonDidChangeConfigFile,
		UpdateReasonDidChangeContentMapperContributions,
	}
	for _, reason := range waiting {
		assert.Assert(t, reason.someoneIsWaiting(), "reason %d is one a request waits behind", reason)
	}
	assert.Assert(t, !UpdateReasonIdleCleanDiskCache.someoneIsWaiting(), "the idle clean is housekeeping on a timer")

	// Every reason is accounted for above, so a new one cannot quietly be left unconsidered.
	assert.Equal(t, len(waiting)+1, int(UpdateReasonDidChangeContentMapperContributions)+1,
		"a new update reason needs deciding either way here")
}
