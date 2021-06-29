/*@internal*/
namespace ts.server {
    enum languageModeIds {
        typescript = "typescript",
        typescriptreact = "typescriptreact",
        javascript = "javascript",
        javascriptreact = "javascriptreact",
    }

    export function mode2ScriptKind(mode: string): 'TS' | 'TSX' | 'JS' | 'JSX' | undefined {
        switch (mode) {
            case languageModeIds.typescript: return 'TS';
            case languageModeIds.typescriptreact: return 'TSX';
            case languageModeIds.javascript: return 'JS';
            case languageModeIds.javascriptreact: return 'JSX';
        }
        return undefined;
    }

    export function getLineAndOffsetFromPosition(position: lsp.Position) {
        // TS assumes the client is 1-based
        return { line: position.line + 1, offset: position.character + 1 };
    }

    export function getLspPositionFromLocation(location: protocol.Location): lsp.Position {
        return { line: Math.max(0, location.line - 1), character: Math.max(0, location.offset - 1) };
    }
}

/*@internal*/
namespace ts.server.lsp {
    export function toTsTriggerReason(context: SignatureHelpContext | undefined): protocol.SignatureHelpTriggerReason | undefined {
        if (!context) {
            return undefined;
        }

        switch (context.triggerKind) {
            case SignatureHelpTriggerKind.TriggerCharacter:
                if (context.triggerCharacter) {
                    if (context.isRetrigger) {
                        return { kind: 'retrigger', triggerCharacter: context.triggerCharacter as any };
                    }

                    return { kind: 'characterTyped', triggerCharacter: context.triggerCharacter as any };
                }

                return { kind: 'invoked' };
            case SignatureHelpTriggerKind.ContentChange:
                return context.isRetrigger ? { kind: 'retrigger' } : { kind: 'invoked' };
            case SignatureHelpTriggerKind.Invoked:
            default:
                return { kind: 'invoked' };
        }
    }

    export function convertSignature(item: protocol.SignatureHelpItem): SignatureInformation {
        const signature: SignatureInformation = {
            label: plain(item.prefixDisplayParts),
            documentation: markdownDocumentation(item.documentation, item.tags.filter(x => x.name !== 'param')),
        };
        let textIndex = signature.label.length;
        const separatorLabel = plain(item.separatorDisplayParts);
        const parameters: ParameterInformation[] = [];
        for (let i = 0; i < item.parameters.length; i++) {
            const parameter = item.parameters[i];
            const label = plain(parameter.displayParts);
            const parameterInfo: ParameterInformation = {
                label: [textIndex, textIndex + label.length],
                documentation: markdownDocumentation(parameter.documentation, []),
            };
            parameters.push(parameterInfo);

            textIndex += label.length;
            signature.label += label;

            if (i !== item.parameters.length - 1) {
                signature.label += separatorLabel;
                textIndex += separatorLabel.length;
            }
        }

        signature.parameters = parameters;
        signature.label += plain(item.suffixDisplayParts);
        return signature;
    }

    export function getActiveSignature(context: SignatureHelpContext | undefined, info: protocol.SignatureHelpItems, signatures: readonly SignatureInformation[]): number {
        if (!context?.activeSignatureHelp?.activeSignature) {
            return info.selectedItemIndex;
        }

		// Try matching the previous active signature's label to keep it selected
		const previouslyActiveSignature = context.activeSignatureHelp.signatures[context.activeSignatureHelp.activeSignature];
		if (previouslyActiveSignature && context.isRetrigger) {
			const existingIndex = signatures.findIndex(other => other.label === previouslyActiveSignature?.label);
			if (existingIndex >= 0) {
				return existingIndex;
			}
		}

		return info.selectedItemIndex;
    }

    export function getActiveParameter(info: protocol.SignatureHelpItems): number {
		const activeSignature = info.items[info.selectedItemIndex];
		if (activeSignature && activeSignature.isVariadic) {
			return Math.min(info.argumentIndex, activeSignature.parameters.length - 1);
		}
		return info.argumentIndex;
	}
}
