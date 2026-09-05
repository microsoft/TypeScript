package lsp

import (
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
)

const workspaceDiagnosticsRegistrationID = "workspace-diagnostics"

// syncWorkspaceDiagnosticsRegistration offers workspace diagnostics to the client, or withdraws the
// offer, to match the current settings. Workspace support is a property of a diagnostic provider,
// so it is offered by registering one. A client that holds the capability re-pulls on a timer, so
// withdrawing it matters as much as offering it.
func (s *Server) syncWorkspaceDiagnosticsRegistration(ctx context.Context, preferences lsutil.UserPreferences) {
	if !s.clientCapabilities.TextDocument.Diagnostic.DynamicRegistration {
		return
	}

	s.workspaceDiagnosticsRegistrationMu.Lock()
	defer s.workspaceDiagnosticsRegistrationMu.Unlock()

	// Validation off silences diagnostics whatever the scope says.
	wanted := preferences.WorkspaceDiagnosticsScope.Enabled() && !preferences.EnableValidation.IsFalse()
	if wanted == s.workspaceDiagnosticsRegistered {
		return
	}

	if !wanted {
		if _, err := sendClientRequest(ctx, s, lsproto.ClientUnregisterCapabilityInfo, &lsproto.UnregistrationParams{
			Unregisterations: []*lsproto.Unregistration{
				{Id: workspaceDiagnosticsRegistrationID, Method: string(lsproto.MethodTextDocumentDiagnostic)},
			},
		}); err != nil {
			s.logger.Error("failed to unregister workspace diagnostics: ", err)
			return
		}
		s.workspaceDiagnosticsRegistered = false
		return
	}

	// The empty document selector is deliberate: document diagnostics are served by the provider
	// advertised at initialize, and matching no document keeps this one from pulling them twice.
	if _, err := sendClientRequest(ctx, s, lsproto.ClientRegisterCapabilityInfo, &lsproto.RegistrationParams{
		Registrations: []*lsproto.Registration{
			{
				Id: workspaceDiagnosticsRegistrationID,
				RegisterOptions: &lsproto.RegisterOptions{
					TextDocumentDiagnostic: &lsproto.DiagnosticRegistrationOptions{
						DocumentSelector:      lsproto.DocumentSelectorOrNull{DocumentSelector: &[]lsproto.TextDocumentFilterLanguageOrSchemeOrPattern{}},
						Identifier:            new("typescript-workspace"),
						InterFileDependencies: true,
						WorkspaceDiagnostics:  true,
						Id:                    new(workspaceDiagnosticsRegistrationID),
					},
				},
			},
		},
	}); err != nil {
		s.logger.Error("failed to register workspace diagnostics: ", err)
		return
	}
	s.workspaceDiagnosticsRegistered = true
}
