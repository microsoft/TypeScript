/// <reference path="../../fourslash/fourslash.ts" />

goTo.file("atotc.ts");
verify.getSemanticDiagnostics(JSON.stringify([{message: "Semantic diagnostics replaced!", category: "message", code: "semantic-diagnostics-replaced"}], undefined, 2));
verify.getSyntacticDiagnostics(JSON.stringify([{message: "Syntactic diagnostics replaced!", category: "message", code: "syntactic-diagnostics-replaced"}], undefined, 2));
verify.completionListContains("fakeCompletion", "", undefined, "");
verify.completionEntryDetailIs("fakeCompletion", "", undefined, "0");
verify.quickInfoIs(undefined, undefined);
verify.nameOrDottedNameSpanTextIs("");
verify.signatureHelpArgumentCountIs(0);
verify.definitionCountIs(0);
verify.referencesAre([]);
verify.todoCommentsInCurrentFile([]);
verify.noMatchingBracePositionInCurrentFile(0);
verify.DocCommentTemplate("/********Yes.*********/", 9);
