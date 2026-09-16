package lsp_test

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/lsptestutil"
	"gotest.tools/v3/assert"
)

// The capability is withheld at initialize and only offered once the setting asks for it, then
// withdrawn when it is turned back off.
func TestWorkspaceDiagnosticsCapabilityFollowsScope(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, progress := startWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)

	// Nothing is offered while the setting sits at its default.
	assert.Assert(t, !slices.Contains(progress.registrationIDs(), "workspace-diagnostics"),
		"workspace diagnostics should not be registered by default, got %v", progress.registrationIDs())

	setWorkspaceDiagnosticsScope(t, client, "allProjects")
	openWorkspaceDiagnosticsProject(t, client)
	pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: []lsproto.PreviousResultId{}})
	assert.Assert(t, slices.Contains(progress.registrationIDs(), "workspace-diagnostics"),
		"expected a workspace diagnostics registration, got %v", progress.registrationIDs())

	setWorkspaceDiagnosticsScope(t, client, "off")
	pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: []lsproto.PreviousResultId{}})
	assert.Assert(t, slices.Contains(progress.unregistrationIDs(), "workspace-diagnostics"),
		"expected the registration to be withdrawn, got %v", progress.unregistrationIDs())
}

// Moving between two enabled scopes must not churn the registration.
func TestWorkspaceDiagnosticsCapabilityRegisteredOnce(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, progress := startWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	setWorkspaceDiagnosticsScope(t, client, "openProjects")
	setWorkspaceDiagnosticsScope(t, client, "allProjects")
	setWorkspaceDiagnosticsScope(t, client, "openProjectsAndDependents")
	openWorkspaceDiagnosticsProject(t, client)
	pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: []lsproto.PreviousResultId{}})

	progress.mu.Lock()
	defer progress.mu.Unlock()
	assert.Equal(t, progress.workspaceRegos, 1, "expected exactly one workspace diagnostics registration")
	assert.Assert(t, !slices.Contains(progress.unregistered, "workspace-diagnostics"))
}

// Turning validation off silences diagnostics entirely, so the capability is withdrawn rather than
// left in place for a client that would keep pulling the workspace every couple of seconds.
func TestWorkspaceDiagnosticsCapabilityWithdrawnWhenValidationDisabled(t *testing.T) {
	t.Parallel()

	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	client, progress := startWorkspaceDiagnosticsClient(t, workspaceDiagnosticsFiles)
	setWorkspaceDiagnosticsScope(t, client, "allProjects")
	openWorkspaceDiagnosticsProject(t, client)
	pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: []lsproto.PreviousResultId{}})
	assert.Assert(t, slices.Contains(progress.registrationIDs(), "workspace-diagnostics"))

	// The scope still asks for every project, but validation is off.
	lsptestutil.SendNotification(t, client, lsproto.WorkspaceDidChangeConfigurationInfo, &lsproto.DidChangeConfigurationParams{
		Settings: map[string]any{"typescript": map[string]any{
			"validate":     map[string]any{"enabled": false},
			"experimental": map[string]any{"workspaceDiagnostics": map[string]any{"scope": "allProjects"}},
		}},
	})
	pullWorkspaceDiagnostics(t, client, &lsproto.WorkspaceDiagnosticParams{PreviousResultIds: []lsproto.PreviousResultId{}})
	assert.Assert(t, slices.Contains(progress.unregistrationIDs(), "workspace-diagnostics"),
		"expected the registration to be withdrawn, got %v", progress.unregistrationIDs())
}
