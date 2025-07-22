// AI Diagnostics Core Module
// Provides interfaces and core logic for AI-enhanced diagnostics in TypeScript

export interface AIDiagnostic {
    code: number;
    severity: "error" | "warning" | "suggestion" | "info";
    category: string;
    message: string;
    originalMessage: string;
    why?: string; // Explanation: Why did this happen?
    highConfidenceFix?: boolean; // True if a one-click fix is available (confidence > 0.9)
    location?: {
        file: string;
        line?: number;
        character?: number;
        snippet?: string;
    };
    suggestions?: AISuggestion[];
    context?: {
        intent?: string;
        missingDependencies?: string[];
        patterns?: string[];
    };
    rule?: {
        name: string;
        documentation?: string;
    };
    astContext?: {
        nodeType: string;
        actualType?: string;
    };
}

export interface AISuggestion {
    confidence: number; // 0-1 reliability score
    description: string;
    fix: {
        range: { start: number; end: number; };
        type: "add" | "replace" | "delete";
    };
    reasoning: string;
    why?: string; // Explanation for this specific fix
    dependencies?: string[];
    example?: string;
    category?: string;
    complexity?: "trivial" | "easy" | "medium" | "hard";
    estimatedSuccessRate?: number;
}

/**
 * Converts standard TypeScript diagnostics to AI-enhanced diagnostics.
 * @param diagnostics Standard diagnostics array
 * @param options AI options
 */
export function convertToAIDiagnostics(diagnostics: any[], options?: any): AIDiagnostic[] {
    // Enhanced conversion logic: generate 'why' explanations and set 'highConfidenceFix' based on real analysis
    return (diagnostics || []).map((diag: any) => {
        let why: string | undefined = diag.why;
        let suggestions = (diag.suggestions || []).map((s: any) => ({
            ...s,
            why: s.why || s.reasoning || undefined,
        }));
        let highConfidenceFix = suggestions.some((s: any) => s.confidence > 0.9 && s.fix?.type !== "delete");

        // Detect types defined outside central registry (improved: look for interface/type/enum/class declarations in non-types/ files)
        if (diag.astContext && diag.astContext.nodeType && ["InterfaceDeclaration","TypeAliasDeclaration","EnumDeclaration","ClassDeclaration"].includes(diag.astContext.nodeType)
            && diag.location && diag.location.file && !/types\//.test(diag.location.file)) {
            why = why || `Type '${diag.astContext.nodeType.replace("Declaration","")}' should be placed in the central type registry (e.g., types/ directory) for maintainability and AI compatibility.`;
            suggestions = [
                {
                    confidence: 0.98,
                    description: `Move ${diag.astContext.nodeType.replace("Declaration","")} to central registry and update all imports.`,
                    fix: { range: diag.range || { start: 0, end: 0 }, newText: '', type: "replace" },
                    reasoning: "Centralizing types prevents ambiguity and enables better AI codegen.",
                    why: "Moving the type to the registry ensures all code references a single, canonical definition."
                }
            ];
            highConfidenceFix = true;
        }

        // ...existing code for other error types...
        if (!why) {
            if (diag.code === 2322 && diag.message && diag.message.includes("is missing the following properties")) {
                why = "You assigned an object to a type, but did not provide all required properties. TypeScript enforces required properties for type safety.";
            } else if (diag.code === 2552 && diag.message && diag.message.includes("Cannot find name")) {
                why = "You used a variable or identifier that is not defined or imported in this scope.";
            } else if (diag.code === 2345 && diag.message && diag.message.includes("is not assignable to parameter")) {
                why = "You passed a value of the wrong type to a function or method. TypeScript checks argument types for safety.";
            } else if (diag.reasoning) {
                why = diag.reasoning;
            }
        }

        return {
            ...diag,
            why,
            highConfidenceFix,
            suggestions,
        };
    });
}

/**
 * Project-level AI error summary structure.
 */
export interface AIErrorSummary {
    totalErrors: number;
    mostCommonIssues: {
        code: number;
        message: string;
        count: number;
        difficulty?: string;
    }[];
    categories: Record<string, number>;
    breakdown: {
        byComplexity: Record<string, number>;
    };
    overallAssessment: {
        complexity: string;
        estimatedFixTime: string;
    };
}

/**
 * Generates a project-level AI error summary from diagnostics.
 * @param diagnostics Standard diagnostics array
 * @param options AI options
 */
export function generateAIErrorSummary(diagnostics: any[], options?: any): AIErrorSummary {
    // TODO: Implement summary logic
    return {
        totalErrors: 0,
        mostCommonIssues: [],
        categories: {},
        breakdown: { byComplexity: {} },
        overallAssessment: { complexity: "", estimatedFixTime: "" },
    };
}

// Additional pattern recognition and context extraction utilities would go here.
