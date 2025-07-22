// AI Diagnostics Formatter Module
// Provides output formatting for AI-enhanced diagnostics

import { AIDiagnostic } from "./aiDiagnostics.js";

export type AIOutputFormat = "visual" | "json" | "machine";

/**
 * Formats AI diagnostics for output in the specified format.
 * @param diagnostics Array of AI diagnostics
 * @param format Output format: "visual", "json", or "machine"
 */
export function formatAIDiagnostics(diagnostics: AIDiagnostic[], format: AIOutputFormat = "visual"): string {
    switch (format) {
        case "json":
            return JSON.stringify(diagnostics, undefined, 2);
        case "machine":
            // Simple machine-readable format (one line per diagnostic)
            return diagnostics.map(d => `${d.code}|${d.severity}|${d.message.replace(/\n/g, " ")}`).join("\n");
        case "visual":
        default:
            // Visual format with confidence and suggestions
            return diagnostics.map(d => visualFormat(d)).join("\n\n");
    }
}

function visualFormat(d: AIDiagnostic): string {
    let out = `❌ ${d.code}: ${d.message}`;
    if (d.why) {
        out += `\n   🧐 Why: ${d.why}`;
    }
    if (d.highConfidenceFix) {
        out += `\n   ✅ One-click fix available!`;
    }
    if (d.location) {
        out += `\n   at ${d.location.file}`;
        if (d.location.line !== undefined) out += `:${d.location.line}`;
        if (d.location.character !== undefined) out += `:${d.location.character}`;
    }
    if (d.suggestions && d.suggestions.length) {
        out += `\n   💡 AI Suggestions:`;
        d.suggestions.forEach((s, i) => {
            out += `\n     ${i + 1}. ${s.description} (${Math.round(s.confidence * 100)}% confidence)`;
            if (s.why) out += `\n        Why: ${s.why}`;
            if (s.example) out += `\n        Example: ${s.example}`;
        });
    }
    if (d.context?.patterns?.length) {
        out += `\n   📚 Common patterns: ${d.context.patterns.join(", ")}`;
    }
    return out;
}
