///<reference path='..\..\src\harness\harness.ts'/>

class CompilerThroughputBenchmark extends Harness.Perf.Benchmark {
    public description = "Performance: Compiler Throughput";
    private compiler;
    
    private compilerFiles = IO.dir("tests\\perf\\testCode\\compiler", /\.ts$/);

    private compilerSources: any[] = [];
    
    public before() {
        this.compilerSources.push({path: 'lib.d.ts', code: IO.readFile('typings\\lib.d.ts')});
    
        for(var i = 0; i < this.compilerFiles.length; i++) {
            this.compilerSources.push({path: this.compilerFiles[i], code: IO.readFile(this.compilerFiles[i])});
        }
    
    }
    
    public beforeEach() {
        var stdout = new Harness.Compiler.WriterAggregator();
        var stderr = new Harness.Compiler.WriterAggregator();
        this.compiler = new TypeScript.TypeScriptCompiler(stdout, stderr);
    }
    
    public bench(subBench) {
        subBench('Add Units', function() {
            for(var j = 0; j < this.compilerSources.length; j++) {
                this.compiler.addUnit(this.compilerSources[j].code, this.compilerSources[j].path);
            }
        });
        
        subBench('Typecheck', function() {
            this.compiler.typeCheck();
        });
        
        subBench('Emit', function() {
            this.compiler.emitToOutfile();
        });
    }
}

Harness.Perf.addBenchmark(CompilerThroughputBenchmark);
