var tty = require("tty")
  , readline = require("readline")
  , fs = require("fs")
  , path = require("path")
  , child_process = require("child_process")
  , os = require("os")
  , mocha = require("mocha")
  , Base = mocha.reporters.Base
  , color = Base.color
  , cursor = Base.cursor
  , ms = require("mocha/lib/ms");

var isatty = tty.isatty(1) && tty.isatty(2);
var tapRangePattern = /^(\d+)\.\.(\d+)(?:$|\r\n?|\n)/;
var tapTestPattern = /^(not\sok|ok)\s+(\d+)\s+(?:-\s+)?(.*)$/;
var tapCommentPattern = /^#(?: (tests|pass|fail) (\d+)$)?/;

exports.runTestsInParallel = runTestsInParallel;
exports.ProgressBars = ProgressBars;

function runTestsInParallel(taskConfigsFolder, run, options, cb) {
    if (options === undefined) options = { };

    return discoverTests(run, options, function (error) {
        if (error) {
            return cb(error);
        }

        return runTests(taskConfigsFolder, run, options, cb);
    });
}

function discoverTests(run, options, cb) {
    console.log("Discovering tests...");

    var cmd = "mocha -R " + require.resolve("./mocha-none-reporter.js") + " " + run;
    var p = spawnProcess(cmd);
    p.on("exit", function (status) {
        if (status) {
            cb(new Error("Process exited with code " + status));
        }
        else {
            cb();
        }
    });
}

function runTests(taskConfigsFolder, run, options, cb) {
    var configFiles = fs.readdirSync(taskConfigsFolder);
    var numPartitions = configFiles.length;
    if (numPartitions <= 0) {
        cb();
        return;
    }

    console.log("Running tests on " + numPartitions + " threads...");

    var partitions = Array(numPartitions);
    var progressBars = new ProgressBars();
    progressBars.enable();

    var counter = numPartitions;
    configFiles.forEach(runTestsInPartition);

    function runTestsInPartition(file, index) {
        var partition = {
            file: path.join(taskConfigsFolder, file),
            tests: 0,
            passed: 0,
            failed: 0,
            completed: 0,
            current: undefined,
            start: undefined,
            end: undefined,
            catastrophicError: "",
            failures: []
        };
        partitions[index] = partition;

        // Set up the progress bar.
        updateProgress(0);

        // Start the background process.
        var cmd = "mocha -t " + (options.testTimeout || 20000) + " -R tap --no-colors " + run + " --config='" + partition.file + "'";
        var p = spawnProcess(cmd);
        var rl = readline.createInterface({
            input: p.stdout,
            terminal: false
        });

        var rlError = readline.createInterface({
            input: p.stderr,
            terminal: false
        });

        rl.on("line", onmessage);
        rlError.on("line", onErrorMessage);
        p.on("exit", onexit)

        function onErrorMessage(line) {
            partition.catastrophicError += line + os.EOL;
        }

        function onmessage(line) {
            if (partition.start === undefined) {
                partition.start = Date.now();
            }

            var rangeMatch = tapRangePattern.exec(line);
            if (rangeMatch) {
                partition.tests = parseInt(rangeMatch[2]);
                return;
            }

            var testMatch = tapTestPattern.exec(line);
            if (testMatch) {
                var test = {
                    result: testMatch[1],
                    id: parseInt(testMatch[2]),
                    name: testMatch[3],
                    output: []
                };

                partition.current = test;
                partition.completed++;

                if (test.result === "ok") {
                    partition.passed++;
                }
                else {
                    partition.failed++;
                    partition.failures.push(test);
                }

                var progress = partition.completed / partition.tests;
                if (progress < 1) {
                    updateProgress(progress);
                }

                return;
            }

            var commentMatch = tapCommentPattern.exec(line);
            if (commentMatch) {
                switch (commentMatch[1]) {
                    case "tests":
                        partition.current = undefined;
                        partition.tests = parseInt(commentMatch[2]);
                        break;

                    case "pass":
                        partition.passed = parseInt(commentMatch[2]);
                        break;

                    case "fail":
                        partition.failed = parseInt(commentMatch[2]);
                        break;
                }

                return;
            }

            if (partition.current) {
                partition.current.output.push(line);
            }
        }

        function onexit(code) {
            if (partition.end === undefined) {
                partition.end = Date.now();
            }

            partition.duration = partition.end - partition.start;
            var isPartitionFail = partition.failed || code !== 0;
            var summaryColor = isPartitionFail ? "fail" : "green";
            var summarySymbol = isPartitionFail ? Base.symbols.err : Base.symbols.ok;

            var summaryTests = (isPartitionFail ? partition.passed + "/" + partition.tests : partition.passed) + " passing";
            var summaryDuration = "(" + ms(partition.duration) + ")";
            var savedUseColors = Base.useColors;
            Base.useColors = !options.noColors;

            var summary = color(summaryColor, summarySymbol + " " + summaryTests) + " " + color("light", summaryDuration);
            Base.useColors = savedUseColors;

            updateProgress(1, summary);

            signal();
        }

        function updateProgress(percentComplete, title) {
            var progressColor = "pending";
            if (partition.failed) {
                progressColor = "fail";
            }

            progressBars.update(
                index,
                percentComplete,
                progressColor,
                title
            );
        }
    }

    function signal() {
        counter--;

        if (counter <= 0) {
            var reporter = new Base(),
                stats = reporter.stats,
                failures = reporter.failures;

            var duration = 0;
            var catastrophicError = "";
            for (var i = 0; i < numPartitions; i++) {
                var partition = partitions[i];
                stats.passes += partition.passed;
                stats.failures += partition.failed;
                stats.tests += partition.tests;
                duration += partition.duration;
                if (partition.catastrophicError !== "") {
                    // Partition is written out to a temporary file as a JSON object.
                    // Below is an example of how the partition JSON object looks like
                    // {
                    //      "light":false,
                    //      "tasks":[
                    //          { 
                    //              "runner":"compiler",
                    //              "files":["tests/cases/compiler/es6ImportNamedImportParsingError.ts"]
                    //          }
                    //      ],
                    //      "runUnitTests":false
                    // }
                    var jsonText = fs.readFileSync(partition.file);
                    var configObj = JSON.parse(jsonText);
                    if (configObj.tasks && configObj.tasks[0]) {
                        catastrophicError += "Error from one or more of these files: " + configObj.tasks[0].files + os.EOL;
                        catastrophicError += partition.catastrophicError;
                        catastrophicError += os.EOL;
                    }
                }
                for (var j = 0; j < partition.failures.length; j++) {
                    var failure = partition.failures[j];
                    failures.push(makeMochaTest(failure));
                }
            }

            stats.duration = duration;
            progressBars.disable();

            if (options.noColors) {
                var savedUseColors = Base.useColors;
                Base.useColors = false;
                reporter.epilogue();
                Base.useColors = savedUseColors;
            }
            else {
                reporter.epilogue();
            }

            if (catastrophicError !== "") {
                return cb(new Error(catastrophicError));
            }
            if (stats.failures) {
                return cb(new Error("Test failures reported: " + stats.failures));
            }
            else {
                return cb();
            }
        }
    }

    function makeMochaTest(test) {
        return {
            fullTitle: function() {
                return test.name;
            },
            err: {
                message: test.output[0],
                stack: test.output.join(os.EOL)
            }
        };
    }
}

var nodeModulesPathPrefix = path.resolve("./node_modules/.bin/") + path.delimiter;
if (process.env.path !== undefined) {
   process.env.path = nodeModulesPathPrefix + process.env.path;
} else if (process.env.PATH !== undefined) {
   process.env.PATH = nodeModulesPathPrefix + process.env.PATH;
}

function spawnProcess(cmd, options) {
    var shell = process.platform === "win32" ? "cmd" : "/bin/sh";
    var prefix = process.platform === "win32" ? "/c" : "-c";
    return child_process.spawn(shell, [prefix, cmd], { windowsVerbatimArguments: true });
}

function ProgressBars(options) {
    if (!options) options = {};
    var open = options.open || '[';
    var close = options.close || ']';
    var complete = options.complete || '▬';
    var incomplete = options.incomplete || Base.symbols.dot;
    var maxWidth = Math.floor(Base.window.width * .30) - open.length - close.length - 2;
    var width = minMax(options.width || maxWidth, 10, maxWidth);
    this._options = {
        open: open,
        complete: complete,
        incomplete: incomplete,
        close: close,
        width: width
    };

    this._progressBars = [];
    this._lineCount = 0;
    this._enabled = false;
}
ProgressBars.prototype = {
    enable: function () {
        if (!this._enabled) {
            process.stdout.write(os.EOL);
            this._enabled = true;
        }
    },
    disable: function () {
        if (this._enabled) {
            process.stdout.write(os.EOL);
            this._enabled = false;
        }
    },
    update: function (index, percentComplete, color, title) {
        percentComplete = minMax(percentComplete, 0, 1);

        var progressBar = this._progressBars[index] || (this._progressBars[index] = { });
        var width = this._options.width;
        var n = Math.floor(width * percentComplete);
        var i = width - n;
        if (n === progressBar.lastN && title === progressBar.title && color === progressBar.progressColor) {
            return;
        }

        progressBar.lastN = n;
        progressBar.title = title;
        progressBar.progressColor = color;

        var progress = "  ";
        progress += this._color('progress', this._options.open);
        progress += this._color(color, fill(this._options.complete, n));
        progress += this._color('progress', fill(this._options.incomplete, i));
        progress += this._color('progress', this._options.close);

        if (title) {
            progress += this._color('progress', ' ' + title);
        }

        if (progressBar.text !== progress) {
            progressBar.text = progress;
            this._render(index);
        }
    },
    _render: function (index) {
        if (!this._enabled || !isatty) {
            return;
        }

        cursor.hide();
        readline.moveCursor(process.stdout, -process.stdout.columns, -this._lineCount);
        var lineCount = 0;
        var numProgressBars = this._progressBars.length;
        for (var i = 0; i < numProgressBars; i++) {
            if (i === index) {
                readline.clearLine(process.stdout, 1);
                process.stdout.write(this._progressBars[i].text + os.EOL);
            }
            else {
                readline.moveCursor(process.stdout, -process.stdout.columns, +1);
            }

            lineCount++;
        }

        this._lineCount = lineCount;
        cursor.show();
    },
    _color: function (type, text) {
        return type && !this._options.noColors ? color(type, text) : text;
    }
};

function fill(ch, size) {
    var s = "";
    while (s.length < size) {
        s += ch;
    }

    return s.length > size ? s.substr(0, size) : s;
}

function minMax(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
}