
/**
 * Module dependencies.
 */

var Base = require('mocha').reporters.Base;
var path = require('path');
var fs = require('fs');
var cursor = Base.cursor;
var color = Base.color;

/**
 * Expose `FivematProgress`.
 */
exports = module.exports = FivematProgress;

/**
 * General progress bar color.
 */

Base.colors.progress = 90;

/**
 * Initialize a new `FivematProgress` reporter.
 *
 * @api public
 * @param {Runner} runner
 * @param {Object} options
 */
function FivematProgress(runner, options) {
  Base.call(this, runner);

  var self = this;
  var stats = this.stats;
  var lastTitle = '';
  var width = Base.window.width * .50 | 0;
  var total = 0;
  var complete = 0;
  var lastN = -1;

  var pass = 0;
  var fail = 0;

  var runnerTotal = runner.total; // total according to the runner
  var completedTotal = 0; // total according to runner.on('pass', ...)

  // default chars
  options = options || {};
  options.open = options.open || '[';
  options.complete = options.complete || '▬';
  options.incomplete = options.incomplete || Base.symbols.dot;
  options.close = options.close || ']';
  options.verbose = false;

  function title(test) {
    while (test.parent && test.parent.fullTitle()) {
      test = test.parent;
    }

    return test.fullTitle();
  }

  function countTests(suite) {
  	var testCount = 0;
  	for(var i in suite.suites) {
  		var innerSuite = suite.suites[i];
  		testCount += innerSuite.tests ? innerSuite.tests : 0;
  		testCount += countTests(innerSuite);
  	}
  	return testCount;
  }

  runner.on('suite', function(suite) {
    var newTitle = title(suite);
    if (newTitle != lastTitle) {
      if(lastTitle != '') {
	      process.stdout.write('\ncompleted: ' + complete + ' tests\n');
	      process.stdout.write('passed:\t' + color('checkmark', pass) + '\n');
	      process.stdout.write('failed:\t' + (fail > 0 ? color('fail', fail) : fail) + '\n');
	      process.stdout.write('\n');
	  }

      var line;
      line  = "\n    ";
      line += color('suite', newTitle);
      line += '\n';

      process.stdout.write(line);
      lastTitle = newTitle;

	  completedTotal += complete;
	  complete = 0;
	  if (newTitle === 'Projects tests') {
	      // we have to compute how many projects tests from looking into how many files in the directory
	      // suite.total() only shows test suite per test-files
	      // Get the top level directory, the root of the TypeScript repository
	      var topLevelDirectory = __dirname.substring(0, __dirname.indexOf("node_modules"));
	      var projectDirectory = path.join(topLevelDirectory, path.normalize("tests/cases/project"));
	      var projectFiles = fs.readdirSync(projectDirectory);
	      // Get the number of project testcases then we multiply by the amount of suite each will be run
	      total = projectFiles.length * suite.total();
	  }
	  else {
	      total = suite.total();
	  }

	  lastN = -1;

   	  pass = 0;
  	  fail = 0;
    }
  });

  runner.on('pending', function(test){
    process.stdout.write(color('pending', Base.symbols.dot));
  });

  runner.on('test end', function(test) {
  	complete++;
    var percent = complete / total;
    var n = width * percent | 0;
    // if we just do width - n then the first progress bar is 1 character wider than the rest
    var i = width - (n == 0 ? 1 : n);
    // last progress bar is 1 character too long when progress is 100%
    n = percent == 1 ? n - 1 : n;
    if (n === lastN && !options.verbose) {
      // Don't re-render the line if it hasn't changed
      return;
    }
    lastN = n;

    process.stdout.write(Array(width + 3).join('\b'));
    process.stdout.write('\u001b[J');
    process.stdout.write(color('progress', '  ' + options.open));
    process.stdout.write(color(fail > 0 ? 'fail' : 'pending', Array(n).join(options.complete)));
    process.stdout.write(Array(i >= 0 ? i : 0).join(options.incomplete));
    process.stdout.write(color('progress', options.close));
    if (options.verbose) {
      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));
    }
  });

  runner.on('pass', function(test){
  	pass++;
  });

  runner.on('fail', function(test, err){
    process.stdout.write(color('fail', '\nTest failure:\n' + test.title + '\n'));
    fail++;
  });

  runner.on('end', function() {
  	/*if(runner.total != completedTotal) {
  		console.log('Error: Test count mismatch: runner has ' + runner.total + ' but ran ' + completedTotal);
  	}*/
    console.log('');
    self.epilogue();
  });
}

FivematProgress.prototype.__proto__ = Base.prototype;
