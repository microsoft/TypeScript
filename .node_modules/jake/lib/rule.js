var path = require('path')
  , fs = require('fs')
  , Task = require('./task/task').Task
  , Matcher
  , rule = {}
  , Rule;

// Define a helper object with some utility functions
Matcher = new (function () {

  // Split a task to two parts, name space and task name.
  // For example, given 'foo:bin/a%.c', return an object with
  // - 'ns'     : foo
  // - 'name'   : bin/a%.c
  this.split = function(task) {
    var parts = task.split(':')
    , name  = parts.pop()
    , ns    = this.resolveNS( parts );
    return {
      'name' : name,
      'ns'   : ns
    };
  };

  // Return the namespace based on an array of names.
  // For example, given ['foo', 'baz' ], return the namespace
  //
  //   default -> foo -> baz
  //
  // where default is the global root namespace
  // and -> means child namespace.
  this.resolveNS = function(parts) {
    var  ns    = jake.defaultNamespace;
    for(var i = 0, l = parts.length; ns && i < l; i++) {
      ns = ns.childNamespaces[parts[i]];
    }
    return ns;
  };

  // Given a pattern p, say 'foo:bin/a%.c'
  // Return an object with
  // - 'ns'     : foo
  // - 'dir'    : bin
  // - 'prefix' : a
  // - 'suffix' : .c
  this.resolve = function(p) {
    var task = this.split(p),
        name  = task.name,
        ns    = task.ns;
    var split = path.basename(name).split('%');
    return {
      ns: ns
    , dir: path.dirname(name)
    , prefix: split[0]
    , suffix: split[1]
    };
  };

  // Test whether string a is a suffix of string b
  this.stringEndWith = function (a,b) {
    var l;
    return (l = b.lastIndexOf(a)) == -1 ? false : l + a.length == b.length;
  };

  // Replace the suffix a of the string s with b.
  // Note that, it is assumed a is a suffix of s.
  this.stringReplaceSuffix = function (s, a, b) {
    return s.slice(0,s.lastIndexOf(a)) + b;
  };

  // Test wether the a prerequisite matchs the pattern.
  // The arg 'pattern' does not have namespace as prefix.
  // For example, the following tests are true
  //
  //   pattern      |    name
  //   bin/%.o      |    bin/main.o
  //   bin/%.o      |    foo:bin/main.o
  //
  // The following tests are false (trivally)
  //
  //   pattern      |    name
  //   bin/%.o      |    foobin/main.o
  //   bin/%.o      |    bin/main.oo
  this.match = function(pattern, name) {
    var p
      , task
      , ns
      , obj
      , filename;

    if (pattern instanceof RegExp) {
      return pattern.test(name);
    }
    else if (pattern.indexOf('%') == -1) {
      // No Pattern. No Folder. No Namespace.
      // A Simple Suffix Rule. Just test suffix
      return this.stringEndWith(pattern, name);
    }
    else {
      // Resolve the dir, prefix and suffix of pattern
      p = this.resolve(pattern);

      // Resolve the namespace and task-name
      task = this.split(name);
      name = task.name;
      ns = task.ns;

      // Set the objective as the task-name
      obj = name;

      // Namespace is already matched.

      // Check dir
      if (path.dirname(obj) != p.dir) {
        return false;
      }

      filename = path.basename(obj);

      // Check file name length
      if ((p.prefix.length + p.suffix.length + 1) > filename.length) {
        // Length does not match.
        return false;
      }

      // Check prefix
      if (filename.indexOf(p.prefix) !== 0) {
        return false;
      }

      // Check suffix
      if (!this.stringEndWith(p.suffix, filename)) {
        return false;
      }

      // OK. Find a match.
      return true;
    }
  };

  // Generate the source based on
  //  - name    name for the synthesized task
  //  - pattern    pattern for the objective
  //  - source    pattern for the source
  //
  // Return the source with properties
  //  - dep      the prerequisite of source
  //             (with the namespace)
  //
  //  - file     the file name of source
  //             (without the namespace)
  //
  // For example, given
  //
  //  - name   foo:bin/main.o
  //  - pattern    bin/%.o
  //  - source    src/%.c
  //
  //    return 'foo:src/main.c',
  //
  this.getSource = function(name, pattern, source) {
    var dep
      , pat
      , match
      , file
      , src;

    // Regex pattern -- use to look up the extension
    if (pattern instanceof RegExp) {
      match = pattern.exec(name);
      if (match) {
        if (typeof source == 'function') {
          src = source(name);
        }
        else {
          src = this.stringReplaceSuffix(name, match[0], source);
        }
      }
    }
    // Assume string
    else {
      // Simple string suffix replacement
      if (pattern.indexOf('%') == -1) {
        if (typeof source == 'function') {
          src = source(name);
        }
        else {
          src = this.stringReplaceSuffix(name, pattern, source);
        }
      }
      // Percent-based substitution
      else {
        pat = pattern.replace('%', '(.*?)');
        pat = new RegExp(pat);
        match = pat.exec(name);
        if (match) {
          if (typeof source == 'function') {
            src = source(name);
          }
          else {
            file = match[1];
            file = source.replace('%', file);
            dep = match[0];
            src = name.replace(dep, file);
          }
        }
      }
    }

    return src;
  };

})();


Rule = function (opts) {
  this.pattern = opts.pattern;
  this.source = opts.source;
  this.prereqs = opts.prereqs;
  this.action = opts.action;
  this.opts = opts.opts;
  this.desc =  opts.desc;
  this.ns = opts.ns;
};

Rule.prototype = new (function () {
  // Create a file task based on this rule for the specified
  // task-name
  // ======
  // FIXME: Right now this just throws away any passed-in args
  // for the synthsized task (taskArgs param)
  // ======
  this.createTask = function (fullName, level) {
    var self = this
      , pattern
      , source
      , action
      , opts
      , prereqs
      , parts
      , valid
      , src
      , tNs
      , createdTask
      , name = Task.getBaseTaskName(fullName)
      , nsPath = Task.getBaseNamespacePath(fullName)
      , ns = this.ns.resolveNamespace(nsPath);

    pattern = this.pattern;
    source = this.source;

    if (typeof source == 'string') {
      src = Matcher.getSource(name, pattern, source);
    }
    else {
      src = source(name);
    }

    // TODO: Write a utility function that appends a
    // taskname to a namespace path
    src = nsPath.split(':').filter(function (item) {
      return !!item;
    }).concat(src).join(':');

    // Generate the prerequisite for the matching task.
    //    It is the original prerequisites plus the prerequisite
    //    representing source file, i.e.,
    //
    //      rule( '%.o', '%.c', ['some.h'] ...
    //
    //    If the objective is main.o, then new task should be
    //
    //      file( 'main.o', ['main.c', 'some.h' ] ...
    prereqs = this.prereqs.slice(); // Get a copy to work with
    prereqs.unshift(src);

    // Prereq should be:
    // 1. an existing task
    // 2. an existing file on disk
    // 3. a valid rule (i.e., not at too deep a level)
    valid = prereqs.some(function (p) {
      var ns = self.ns;
      return ns.resolveTask(p) ||
        fs.existsSync(Task.getBaseTaskName(p)) ||
        jake.attemptRule(p, ns, level + 1);
    });

    // If any of the prereqs aren't valid, the rule isn't valid
    if (!valid) {
      return null;
    }
    // Otherwise, hunky-dory, finish creating the task for the rule
    else {
      // Create the action for the task
      action = function () {
        var task = this;
        self.action.apply(task);
      };

      opts = this.opts;

      // Insert the file task into Jake
      //
      // Since createTask function stores the task as a child task
      // of currentNamespace. Here we temporariliy switch the namespace.
      // FIXME: Should allow optional ns passed in instead of this hack
      tNs = jake.currentNamespace;
      jake.currentNamespace = ns;
      createdTask = jake.createTask('file', name, prereqs, action, opts);
      createdTask.source = src.split(':').pop();
      jake.currentNamespace = tNs;

      return createdTask;
    }

  };

  this.match = function (name) {
    return Matcher.match(this.pattern, name);
  };

})();

rule.Rule = Rule;
rule.Matcher = Matcher;

module.exports = rule;
