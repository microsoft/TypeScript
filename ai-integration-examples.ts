/**
 * TypeScript AI Diagnostics Integration Examples
 *
 * This file demonstrates various ways to integrate the AI-enhanced
 * TypeScript diagnostics into development tools and workflows.
 */

import * as ts from "typescript";
import {
    AIDiagnostic,
    convertToAIDiagnostics,
    generateAIErrorSummary,
} from "./src/compiler/aiDiagnostics.js";
import type { AIErrorSummary } from './src/compiler/aiDiagnostics.js';

// Example 1: VS Code Extension Integration
export class TypeScriptAIExtension {
    private diagnosticCollection: any; // vscode.DiagnosticCollection

    constructor() {
        // Initialize VS Code diagnostic collection
    }

    /**
     * Enhance VS Code's TypeScript diagnostics with AI insights
     */
    async enhanceDiagnostics(document: any): Promise<void> {
        const program = this.createProgram([document.fileName]);
        const diagnostics = ts.getPreEmitDiagnostics(program);

        const aiDiagnostics = convertToAIDiagnostics(Array.from(diagnostics), {
            aiContext: true,
            patternSuggestions: true,
            suggestionConfidence: 0.7,
        });

        // Convert to VS Code diagnostics with AI enhancements
        const vscDiagnostics = aiDiagnostics.map(aiDiag => ({
            range: this.rangeFromAIDiagnostic(aiDiag),
            message: this.createEnhancedMessage(aiDiag),
            severity: this.mapSeverity(aiDiag.severity),
            source: "TypeScript AI",
            code: {
                value: aiDiag.code,
                target: aiDiag.rule?.documentation,
            },
            // Add AI-specific data for quick fixes
            relatedInformation: aiDiag.suggestions?.map(suggestion => ({
                location: document.uri,
                message: `💡 ${suggestion.description} (${Math.round(suggestion.confidence * 100)}% confidence)`,
            })),
        }));

        this.diagnosticCollection.set(document.uri, vscDiagnostics);
    }

    /**
     * Generate AI-powered quick fixes
     */
    provideCodeActions(document: any, range: any): any[] {
        const aiDiagnostics = this.getAIDiagnosticsForRange(document, range);
        const actions: any[] = [];

        for (const aiDiag of aiDiagnostics) {
            if (aiDiag.suggestions) {
                for (const suggestion of aiDiag.suggestions) {
                    if (suggestion.confidence > 0.7) {
                        actions.push({
                            title: `🤖 ${suggestion.description}`,
                            kind: "quickfix",
                            edit: this.createWorkspaceEdit(suggestion),
                            diagnostics: [aiDiag],
                        });
                    }
                }
            }
        }

        return actions;
    }

    private createEnhancedMessage(aiDiag: AIDiagnostic): string {
        let message = aiDiag.message;

        if (aiDiag.suggestions?.length) {
            const topSuggestion = aiDiag.suggestions[0];
            message += `\n\n💡 AI Suggestion: ${topSuggestion.description} (${Math.round(topSuggestion.confidence * 100)}% confidence)`;

            if (topSuggestion.example) {
                message += `\nExample: ${topSuggestion.example}`;
            }
        }

        if (aiDiag.context?.patterns?.length) {
            message += `\n\n📚 Common patterns: ${aiDiag.context.patterns.join(", ")}`;
        }

        return message;
    }

    private createProgram(fileNames: string[]): ts.Program {
        // Implementation details...
        return {} as ts.Program;
    }

    private rangeFromAIDiagnostic(aiDiag: AIDiagnostic): any {
        // Convert AI diagnostic location to VS Code range
    }

    private mapSeverity(severity: string): any {
        // Map AI severity to VS Code severity
    }

    private getAIDiagnosticsForRange(document: any, range: any): AIDiagnostic[] {
        // Get AI diagnostics for specific range
        return [];
    }

    private createWorkspaceEdit(suggestion: any): any {
        // Create VS Code workspace edit from AI suggestion
    }
}

// Example 2: CI/CD Pipeline Integration
export class CIPipelineAnalyzer {
    /**
     * Analyze TypeScript project for CI/CD with AI insights
     */
    async analyzeProject(projectPath: string): Promise<{
        summary: AIErrorSummary;
        recommendations: string[];
        buildShouldFail: boolean;
        estimatedFixTime: string;
    }> {
        const program = this.createProgramFromProject(projectPath);
        const diagnostics = ts.getPreEmitDiagnostics(program);

        const summary = generateAIErrorSummary(Array.from(diagnostics), {
            aiErrorSummary: true,
            semanticHints: true,
        });

        return {
            summary,
            recommendations: this.generateCIRecommendations(summary),
            buildShouldFail: this.shouldFailBuild(summary),
            estimatedFixTime: summary.overallAssessment.estimatedFixTime,
        };
    }

    /**
     * Generate actionable recommendations for CI/CD
     */
    private generateCIRecommendations(summary: AIErrorSummary): string[] {
        const recommendations: string[] = [];

        // High-impact, easy fixes
        const easyFixes = summary.mostCommonIssues.filter(
            issue => issue.difficulty === "easy" && issue.count > 1,
        );

        if (easyFixes.length > 0) {
            recommendations.push(
                `🎯 Quick wins: Fix ${easyFixes.length} types of easy issues affecting ${easyFixes.reduce((sum, issue) => sum + issue.count, 0)} locations`,
            );
        }

        // Missing dependencies
        if (summary.categories["module-resolution"] > 0) {
            recommendations.push(
                "📦 Install missing dependencies to resolve module resolution errors",
            );
        }

        // Type safety improvements
        if (summary.categories["type-checking"] > 5) {
            recommendations.push(
                "🔒 Consider enabling stricter TypeScript settings for better type safety",
            );
        }

        // Complexity warnings
        if (summary.overallAssessment.complexity === "high") {
            recommendations.push(
                "⚠️ High complexity detected - consider breaking changes into smaller PRs",
            );
        }

        return recommendations;
    }

    private shouldFailBuild(summary: AIErrorSummary): boolean {
        // Fail build if:
        // 1. More than 10 errors
        // 2. Any "hard" difficulty errors affecting critical paths
        // 3. Module resolution failures
        return summary.totalErrors > 10 ||
            summary.categories["module-resolution"] > 0 ||
            summary.breakdown.byComplexity.hard > 3;
    }

    private createProgramFromProject(projectPath: string): ts.Program {
        // Implementation details...
        return {} as ts.Program;
    }
}

// Example 3: AI-Powered Code Review Bot
export class CodeReviewBot {
    /**
     * Generate intelligent code review comments
     */
    async reviewPullRequest(changedFiles: string[]): Promise<{
        comments: ReviewComment[];
        summary: string;
        approved: boolean;
    }> {
        const allDiagnostics: ts.Diagnostic[] = [];

        // Analyze each changed file
        for (const file of changedFiles) {
            const program = this.createProgramForFile(file);
            const diagnostics = ts.getPreEmitDiagnostics(program);
            allDiagnostics.push(...diagnostics);
        }

        const aiDiagnostics = convertToAIDiagnostics(Array.from(allDiagnostics), {
            aiContext: true,
            patternSuggestions: true,
            suggestionConfidence: 0.6,
        });

        const comments = this.generateReviewComments(aiDiagnostics);
        const summary = this.generateReviewSummary(aiDiagnostics);
        const approved = this.shouldApprove(aiDiagnostics);

        return { comments, summary, approved };
    }

    private generateReviewComments(aiDiagnostics: AIDiagnostic[]): ReviewComment[] {
        return aiDiagnostics
            .filter(diag => diag.suggestions?.length && diag.suggestions[0].confidence > 0.7)
            .map(diag => ({
                file: diag.location?.file || "",
                line: diag.location?.line || 0,
                message: this.formatReviewComment(diag),
                severity: diag.severity === "error" ? "blocking" : "suggestion",
            }));
    }

    private formatReviewComment(diag: AIDiagnostic): string {
        const suggestion = diag.suggestions?.[0];
        if (!suggestion) return diag.message;

        let comment = `🤖 **AI Code Review**\n\n`;
        comment += `**Issue**: ${diag.message}\n\n`;
        comment += `**Suggestion**: ${suggestion.description} `;
        comment += `(${Math.round(suggestion.confidence * 100)}% confidence)\n\n`;

        if (suggestion.reasoning) {
            comment += `**Why**: ${suggestion.reasoning}\n\n`;
        }

        if (suggestion.example) {
            comment += `**Example**:\n\`\`\`typescript\n${suggestion.example}\n\`\`\`\n\n`;
        }

        if (diag.context?.patterns?.length) {
            comment += `**Common patterns**: ${diag.context.patterns.join(", ")}\n\n`;
        }

        if (diag.rule?.documentation) {
            comment += `📖 [Learn more](${diag.rule.documentation})`;
        }

        return comment;
    }

    private generateReviewSummary(aiDiagnostics: AIDiagnostic[]): string {
        const errorCount = aiDiagnostics.filter(d => d.severity === "error").length;
        const warningCount = aiDiagnostics.filter(d => d.severity === "warning").length;
        const fixableCount = aiDiagnostics.filter(
            d => d.suggestions?.some(s => s.confidence > 0.8),
        ).length;

        let summary = `## 🤖 AI Code Review Summary\n\n`;
        summary += `- **Errors**: ${errorCount}\n`;
        summary += `- **Warnings**: ${warningCount}\n`;
        summary += `- **Auto-fixable**: ${fixableCount}\n\n`;

        if (fixableCount > 0) {
            summary += `✨ **Good news!** ${fixableCount} issues can be automatically fixed with high confidence.\n\n`;
        }

        if (errorCount === 0 && warningCount <= 2) {
            summary += `🎉 **Excellent work!** Code quality looks great.\n`;
        }
        else if (errorCount > 0) {
            summary += `⚠️ **Action needed**: Please address the errors before merging.\n`;
        }

        return summary;
    }

    private shouldApprove(aiDiagnostics: AIDiagnostic[]): boolean {
        const blockingIssues = aiDiagnostics.filter(d =>
            d.severity === "error" &&
            (!d.suggestions || d.suggestions[0]?.confidence < 0.9)
        );
        return blockingIssues.length === 0;
    }

    private createProgramForFile(file: string): ts.Program {
        // Implementation details...
        return {} as ts.Program;
    }
}

// Example 4: Learning System for Pattern Recognition
export class AIPatternLearner {
    private patterns: Map<number, FixPattern[]> = new Map();

    /**
     * Learn from successful fixes to improve suggestions
     */
    recordSuccessfulFix(diagnostic: AIDiagnostic, appliedFix: string, outcome: "success" | "failure"): void {
        const code = diagnostic.code;
        if (!this.patterns.has(code)) {
            this.patterns.set(code, []);
        }

        const patterns = this.patterns.get(code)!;
        const existingPattern = patterns.find(p => p.context === diagnostic.location?.snippet);

        if (existingPattern) {
            existingPattern.attempts++;
            if (outcome === "success") {
                existingPattern.successes++;
            }
        }
        else {
            patterns.push({
                context: diagnostic.location?.snippet || "",
                fix: appliedFix,
                attempts: 1,
                successes: outcome === "success" ? 1 : 0,
                category: diagnostic.category,
            });
        }
    }

    /**
     * Generate improved suggestions based on learned patterns
     */
    getImprovedSuggestions(diagnostic: AIDiagnostic): AIDiagnostic {
        const patterns = this.patterns.get(diagnostic.code);
        if (!patterns) return diagnostic;

        const relevantPatterns = patterns
            .filter(p => this.isContextSimilar(p.context, diagnostic.location?.snippet))
            .sort((a, b) => (b.successes / b.attempts) - (a.successes / a.attempts));

        if (relevantPatterns.length > 0) {
            const bestPattern = relevantPatterns[0];
            const learnedSuggestion = {
                confidence: bestPattern.successes / bestPattern.attempts,
                description: `Learned fix: ${bestPattern.fix}`,
                fix: {
                    range: { start: 0, end: 0 },
                    newText: bestPattern.fix,
                    type: "replace" as const,
                },
                reasoning: `This fix has a ${Math.round((bestPattern.successes / bestPattern.attempts) * 100)}% success rate based on ${bestPattern.attempts} previous attempts`,
                category: "learned-pattern",
                learnedFromSimilarIssues: true,
                estimatedSuccessRate: bestPattern.successes / bestPattern.attempts,
            };

            // Add learned suggestion to the beginning of the list
            diagnostic.suggestions = [learnedSuggestion, ...(diagnostic.suggestions || [])];
        }

        return diagnostic;
    }

    private isContextSimilar(context1?: string, context2?: string): boolean {
        if (!context1 || !context2) return false;

        // Simple similarity check - in production, use more sophisticated matching
        const words1 = context1.toLowerCase().split(/\W+/);
        const words2 = context2.toLowerCase().split(/\W+/);
        const intersection = words1.filter(w => words2.includes(w));

        return intersection.length / Math.max(words1.length, words2.length) > 0.5;
    }

    /**
     * Export learned patterns for sharing across projects
     */
    exportPatterns(): string {
        const exportData = Object.fromEntries(
            Array.from(this.patterns.entries()).map(([code, patterns]) => [
                code,
                patterns.map(p => ({
                    ...p,
                    successRate: p.successes / p.attempts,
                })),
            ]),
        );

        return JSON.stringify(exportData, undefined, 2);
    }

    /**
     * Import patterns from other projects or shared databases
     */
    importPatterns(patternsJson: string): void {
        const importedData = JSON.parse(patternsJson);

        for (const [code, patterns] of Object.entries(importedData)) {
            const codeNum = parseInt(code);
            this.patterns.set(codeNum, patterns as FixPattern[]);
        }
    }
}

// Supporting interfaces
interface ReviewComment {
    file: string;
    line: number;
    message: string;
    severity: "blocking" | "suggestion";
}

interface FixPattern {
    context: string;
    fix: string;
    attempts: number;
    successes: number;
    category: string;
}

// Example 5: Real-time Development Assistant
export class DevelopmentAssistant {
    private aiDiagnostics: AIDiagnostic[] = [];

    /**
     * Provide real-time assistance while coding
     */
    onDocumentChange(document: any): void {
        // Debounced analysis
        setTimeout(() => this.analyzeDocument(document), 500);
    }

    private async analyzeDocument(document: any): Promise<void> {
        const program = this.createProgramFromDocument(document);
        const diagnostics = ts.getPreEmitDiagnostics(program);

        this.aiDiagnostics = convertToAIDiagnostics(Array.from(diagnostics), {
            aiContext: true,
            patternSuggestions: true,
            suggestionConfidence: 0.5,
        });

        // Provide contextual hints
        this.showContextualHints();
        this.suggestImports();
        this.highlightQuickFixes();
    }

    private showContextualHints(): void {
        const typingErrors = this.aiDiagnostics.filter(d => d.code === 2304);

        if (typingErrors.length > 0) {
            this.showHint("💡 It looks like you're referencing undefined variables. Would you like me to suggest imports?");
        }
    }

    private suggestImports(): void {
        const importSuggestions = this.aiDiagnostics
            .filter(d => d.context?.patterns?.some(p => p.includes("import")))
            .slice(0, 3);

        for (const suggestion of importSuggestions) {
            this.showQuickAction(`Import ${suggestion.location?.snippet}`, () => {
                this.applyImportFix(suggestion);
            });
        }
    }

    private highlightQuickFixes(): void {
        const quickFixes = this.aiDiagnostics
            .filter(d => d.suggestions?.some(s => s.confidence > 0.9))
            .slice(0, 5);

        for (const fix of quickFixes) {
            const suggestion = fix.suggestions![0];
            this.showQuickAction(
                `🤖 ${suggestion.description}`,
                () => this.applySuggestion(suggestion),
            );
        }
    }

    private createProgramFromDocument(document: any): ts.Program {
        // Implementation details...
        return {} as ts.Program;
    }

    private showHint(message: string): void {
        // Show hint in IDE
    }

    private showQuickAction(title: string, action: () => void): void {
        // Show quick action button in IDE
    }

    private applyImportFix(diagnostic: AIDiagnostic): void {
        // Apply import fix
    }

    private applySuggestion(suggestion: any): void {
        // Apply AI suggestion
    }
}
