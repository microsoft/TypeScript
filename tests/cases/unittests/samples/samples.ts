///<reference path="..\..\..\..\src\harness\harness.ts" />

var samplesCompilerOptions = { useMinimalDefaultLib: false, noImplicitAny: false }
describe("Setup compiler for samples", () => {
    Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, samplesCompilerOptions);
});

describe('Compiling samples', function ()
{
    var harnessCompiler = Harness.Compiler.getCompiler(Harness.Compiler.CompilerInstance.RunTime);

    function loadSample(path: string): string
    {
        return TypeScript.IO.readFile(Harness.userSpecifiedroot + 'samples/' + path, /*codepage:*/null).contents;
    }

    function addUnitsAndCompile(units: string[], includeWin8Libs = false) {
        var filesToAdd = units.map(unit => {
            return {
                unitName: 'tests/cases/unittests/samples/' + unit,
                content: loadSample(unit)
            };
        });
        if (includeWin8Libs) {
            ['winrt.d.ts', 'winjs.d.ts'].forEach(file => filesToAdd.push({ unitName: file, content: TypeScript.IO.readFile('typings/' + file, null).contents }));
        }

        var result: Harness.Compiler.CompilerResult;
        harnessCompiler.compileFiles(filesToAdd, [], res => result = res, null, { noResolve: includeWin8Libs });

        assert.arrayLengthIs(result.errors, 0);
    }

    // d3
    it('compiles the d3 sample without error', function ()
    {
        var units = ["d3/data.ts", "d3/d3.d.ts"];
        addUnitsAndCompile(units);
    });

    // greeter
    it('compiles greeter without error', function ()
    {
        var src = loadSample("greeter/greeter.ts");
        Harness.Compiler.compileString(src, 'greeter.ts', function (result)
        {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    // imageboard
    it('compiles the imageboard sample without error', function ()
    {
        var units = ["node/node.d.ts", "imageboard/app.ts", "imageboard/db.ts", "imageboard/express.d.ts", "imageboard/mongodb.ts", "imageboard/routes/index.ts"];
    
        addUnitsAndCompile(units, undefined);
    });

    //// interfaces
    it('compiles the interfaces sample without error', function ()
    {
        var interfaces = loadSample("interfaces/interfaces.ts");

        Harness.Compiler.compileString(interfaces, 'interfaces.ts', function (result)
        {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    // jquery
    it('compiles the jquery sample without error', function ()
    {
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, samplesCompilerOptions);
        var units = ["jquery/parallax.ts", "jquery/jquery.d.ts"];
        addUnitsAndCompile(units);
    });

    // mankala
    it('compiles the mankala sample without error', function ()
    {
        var units = ["mankala/Base.ts", "mankala/Driver.ts", "mankala/Features.ts", "mankala/Game.ts", "mankala/Geometry.ts", "mankala/Position.ts" ];
        addUnitsAndCompile(units);
    });

    // node
    it('compiles the node sample-1 without error', function ()
    {
        var units = ["node/HttpServer.ts", "node/node.d.ts"];
        addUnitsAndCompile(units);
    });

    it('compiles the node sample-2 without error', function ()
    {
        var units = ["node/TcpServer.ts", "node/node.d.ts"];
        addUnitsAndCompile(units);
    });

    // raytracer
    it('compiles raytracer without error', function ()
    {
        var src = loadSample("raytracer/raytracer.ts");
        Harness.Compiler.compileString(src, 'raytracer.ts', function (result)
        {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    // simple
    it('compiles simple without error', function ()
    {
        var src = loadSample("simple/animals.ts");
        Harness.Compiler.compileString(src, 'animals.ts', function (result)
        {
            assert.arrayLengthIs(result.errors, 0);
        });
    });

    // todomvc
    it('compiles the todo mvc sample without error', function ()
    {
        var src = loadSample("todomvc/js/todos.ts");
        Harness.Compiler.compileString(src, 'todos.ts', function (result)
        {
            assert.arrayLengthIs(result.errors, 0);
        });

        // Necessary because both todomvc and warship declare var $
        Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, samplesCompilerOptions);
        harnessCompiler.reset();
    });  

    // warship
    it('compiles warship combat without error', function ()
    {
        var units = ["warship/warship.ts", "warship/jquery.d.ts", "warship/jqueryui.d.ts"];
        addUnitsAndCompile(units);
    });

    // win8
    it('compiles the win8 sample without error', function ()
    {
       var units = [
           "win8/encyclopedia/Encyclopedia/js/data.ts",
           "win8/encyclopedia/Encyclopedia/js/default.ts",
           "win8/encyclopedia/Encyclopedia/js/groupDetailPage.ts",
           "win8/encyclopedia/Encyclopedia/js/groupedItemsPage.ts",
           "win8/encyclopedia/Encyclopedia/js/itemDetailPage.ts",
           "win8/encyclopedia/Encyclopedia/js/navigator.ts",
           "win8/encyclopedia/Encyclopedia/js/topic.ts",
           "win8/encyclopedia/Encyclopedia/js/win.ts"
       ]

       Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, samplesCompilerOptions);
       harnessCompiler.reset();       
       addUnitsAndCompile(units, true);
    });
});

describe("Clean up samples", () => {
    Harness.Compiler.recreate(Harness.Compiler.CompilerInstance.RunTime, { useMinimalDefaultLib: true, noImplicitAny: false });
});
