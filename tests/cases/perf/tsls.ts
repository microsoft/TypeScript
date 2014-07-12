///<reference path="../../src/harness/harness.ts" />

// Base class for language service benchmarks. Has an LS property and does some setup.
// All other defaults inherited.
class LanguageServiceBenchmark extends Harness.Perf.Benchmark {
	public ls: Services.Shims.LanguageServiceShim;
 
	public before() {
        var compilerFiles = IO.dir("tests\\perf\\testCode\\compiler", /\.ts$/);
    
        var compilerSources: any[] = [];
    
        for(var i = 0; i < compilerFiles.length; i++) {
            compilerSources.push({path: compilerFiles[i], code: IO.readFile(compilerFiles[i])});
        }
        
            
        var typescriptLS = new Harness.TypeScriptLS();
    
        typescriptLS.addDefaultLibrary();
        
        for(var j = 0; j < compilerSources.length; j++) {
            typescriptLS.addScript(compilerSources[j].path, compilerSources[j].code);
        }
    
        this.ls = typescriptLS.getLanguageService();
	}
}

// An actual benchmark.
class FindReferencesBenchmark extends LanguageServiceBenchmark {
	public description = "Find References on Tools";
 
	public bench() {
        this.ls.getReferencesAtPosition('typescript.ts', 866);
	}
}
Harness.Perf.addBenchmark(FindReferencesBenchmark);

class QuickInfoBenchmark extends LanguageServiceBenchmark {
	public description = "QuickInfo on Tools";
 
	public bench() {
        this.ls.getTypeAtPosition('typescript.ts', 866);
	}
}
Harness.Perf.addBenchmark(QuickInfoBenchmark);

class MemberCompletionBenchmark extends LanguageServiceBenchmark {
	public description = "Member Completion of a Parser Instance";
 
	public bench() {
        this.ls.getCompletionsAtPosition('typescript.ts', 2231, true);
	}
}
Harness.Perf.addBenchmark(MemberCompletionBenchmark);

class ScopeCompletionBenchmark extends LanguageServiceBenchmark {
	public description = "Scope Completion inside Tools";
 
	public bench() {
        this.ls.getCompletionsAtPosition('typescript.ts', 879, false);
	}
}
Harness.Perf.addBenchmark(ScopeCompletionBenchmark);

class GotoDefSameFileBenchmark extends LanguageServiceBenchmark {
	public description = "Go To Definition - Same File";
 
	public bench() {
        this.ls.getDefinitionAtPosition('typescript.ts', 2229);
	}
}
Harness.Perf.addBenchmark(GotoDefSameFileBenchmark);


class GotoDefDifferentFileBenchmark extends LanguageServiceBenchmark {
	public description = "Go To Definition - Different File";
 
	public bench() {
        this.ls.getDefinitionAtPosition('typescript.ts', 1186);
	}
}
Harness.Perf.addBenchmark(GotoDefDifferentFileBenchmark);

class SignatureHelpBenchmark extends LanguageServiceBenchmark {
	public description = "Signature Help of Parser";
 
	public bench() {
        this.ls.getSignatureAtPosition('typescript.ts', 1190);
	}
}
Harness.Perf.addBenchmark(SignatureHelpBenchmark);
