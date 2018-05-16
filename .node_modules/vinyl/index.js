'use strict';

var path = require('path');
var isBuffer = require('buffer').Buffer.isBuffer;

var clone = require('clone');
var cloneable = require('cloneable-readable');
var replaceExt = require('replace-ext');
var cloneStats = require('clone-stats');
var cloneBuffer = require('clone-buffer');
var removeTrailingSep = require('remove-trailing-separator');

var isStream = require('./lib/is-stream');
var normalize = require('./lib/normalize');
var inspectStream = require('./lib/inspect-stream');

var builtInFields = [
  '_contents', '_symlink', 'contents', 'stat', 'history', 'path',
  '_base', 'base', '_cwd', 'cwd',
];

function File(file) {
  var self = this;

  if (!file) {
    file = {};
  }

  // Stat = files stats object
  this.stat = file.stat || null;

  // Contents = stream, buffer, or null if not read
  this.contents = file.contents || null;

  // Replay path history to ensure proper normalization and trailing sep
  var history = Array.prototype.slice.call(file.history || []);
  if (file.path) {
    history.push(file.path);
  }
  this.history = [];
  history.forEach(function(path) {
    self.path = path;
  });

  this.cwd = file.cwd || process.cwd();
  this.base = file.base;

  this._isVinyl = true;

  this._symlink = null;

  // Set custom properties
  Object.keys(file).forEach(function(key) {
    if (self.constructor.isCustomProp(key)) {
      self[key] = file[key];
    }
  });
}

File.prototype.isBuffer = function() {
  return isBuffer(this.contents);
};

File.prototype.isStream = function() {
  return isStream(this.contents);
};

File.prototype.isNull = function() {
  return (this.contents === null);
};

File.prototype.isDirectory = function() {
  if (!this.isNull()) {
    return false;
  }

  if (this.stat && typeof this.stat.isDirectory === 'function') {
    return this.stat.isDirectory();
  }

  return false;
};

File.prototype.isSymbolic = function() {
  if (!this.isNull()) {
    return false;
  }

  if (this.stat && typeof this.stat.isSymbolicLink === 'function') {
    return this.stat.isSymbolicLink();
  }

  return false;
};

File.prototype.clone = function(opt) {
  var self = this;

  if (typeof opt === 'boolean') {
    opt = {
      deep: opt,
      contents: true,
    };
  } else if (!opt) {
    opt = {
      deep: true,
      contents: true,
    };
  } else {
    opt.deep = opt.deep === true;
    opt.contents = opt.contents !== false;
  }

  // Clone our file contents
  var contents;
  if (this.isStream()) {
    contents = this.contents.clone();
  } else if (this.isBuffer()) {
    contents = opt.contents ? cloneBuffer(this.contents) : this.contents;
  }

  var file = new this.constructor({
    cwd: this.cwd,
    base: this.base,
    stat: (this.stat ? cloneStats(this.stat) : null),
    history: this.history.slice(),
    contents: contents,
  });

  // Clone our custom properties
  Object.keys(this).forEach(function(key) {
    if (self.constructor.isCustomProp(key)) {
      file[key] = opt.deep ? clone(self[key], true) : self[key];
    }
  });
  return file;
};

File.prototype.inspect = function() {
  var inspect = [];

  // Use relative path if possible
  var filePath = this.path ? this.relative : null;

  if (filePath) {
    inspect.push('"' + filePath + '"');
  }

  if (this.isBuffer()) {
    inspect.push(this.contents.inspect());
  }

  if (this.isStream()) {
    inspect.push(inspectStream(this.contents));
  }

  return '<File ' + inspect.join(' ') + '>';
};

File.isCustomProp = function(key) {
  return builtInFields.indexOf(key) === -1;
};

File.isVinyl = function(file) {
  return (file && file._isVinyl === true) || false;
};

// Virtual attributes
// Or stuff with extra logic
Object.defineProperty(File.prototype, 'contents', {
  get: function() {
    return this._contents;
  },
  set: function(val) {
    if (!isBuffer(val) && !isStream(val) && (val !== null)) {
      throw new Error('File.contents can only be a Buffer, a Stream, or null.');
    }

    // Ask cloneable if the stream is a already a cloneable
    // this avoid piping into many streams
    // reducing the overhead of cloning
    if (isStream(val) && !cloneable.isCloneable(val)) {
      val = cloneable(val);
    }

    this._contents = val;
  },
});

Object.defineProperty(File.prototype, 'cwd', {
  get: function() {
    return this._cwd;
  },
  set: function(cwd) {
    if (!cwd || typeof cwd !== 'string') {
      throw new Error('cwd must be a non-empty string.');
    }
    this._cwd = removeTrailingSep(normalize(cwd));
  },
});

Object.defineProperty(File.prototype, 'base', {
  get: function() {
    return this._base || this._cwd;
  },
  set: function(base) {
    if (base == null) {
      delete this._base;
      return;
    }
    if (typeof base !== 'string' || !base) {
      throw new Error('base must be a non-empty string, or null/undefined.');
    }
    base = removeTrailingSep(normalize(base));
    if (base !== this._cwd) {
      this._base = base;
    } else {
      delete this._base;
    }
  },
});

// TODO: Should this be moved to vinyl-fs?
Object.defineProperty(File.prototype, 'relative', {
  get: function() {
    if (!this.path) {
      throw new Error('No path specified! Can not get relative.');
    }
    return path.relative(this.base, this.path);
  },
  set: function() {
    throw new Error('File.relative is generated from the base and path attributes. Do not modify it.');
  },
});

Object.defineProperty(File.prototype, 'dirname', {
  get: function() {
    if (!this.path) {
      throw new Error('No path specified! Can not get dirname.');
    }
    return path.dirname(this.path);
  },
  set: function(dirname) {
    if (!this.path) {
      throw new Error('No path specified! Can not set dirname.');
    }
    this.path = path.join(dirname, this.basename);
  },
});

Object.defineProperty(File.prototype, 'basename', {
  get: function() {
    if (!this.path) {
      throw new Error('No path specified! Can not get basename.');
    }
    return path.basename(this.path);
  },
  set: function(basename) {
    if (!this.path) {
      throw new Error('No path specified! Can not set basename.');
    }
    this.path = path.join(this.dirname, basename);
  },
});

// Property for getting/setting stem of the filename.
Object.defineProperty(File.prototype, 'stem', {
  get: function() {
    if (!this.path) {
      throw new Error('No path specified! Can not get stem.');
    }
    return path.basename(this.path, this.extname);
  },
  set: function(stem) {
    if (!this.path) {
      throw new Error('No path specified! Can not set stem.');
    }
    this.path = path.join(this.dirname, stem + this.extname);
  },
});

Object.defineProperty(File.prototype, 'extname', {
  get: function() {
    if (!this.path) {
      throw new Error('No path specified! Can not get extname.');
    }
    return path.extname(this.path);
  },
  set: function(extname) {
    if (!this.path) {
      throw new Error('No path specified! Can not set extname.');
    }
    this.path = replaceExt(this.path, extname);
  },
});

Object.defineProperty(File.prototype, 'path', {
  get: function() {
    return this.history[this.history.length - 1];
  },
  set: function(path) {
    if (typeof path !== 'string') {
      throw new Error('path should be a string.');
    }
    path = removeTrailingSep(normalize(path));

    // Record history only when path changed
    if (path && path !== this.path) {
      this.history.push(path);
    }
  },
});

Object.defineProperty(File.prototype, 'symlink', {
  get: function() {
    return this._symlink;
  },
  set: function(symlink) {
    // TODO: should this set the mode to symbolic if set?
    if (typeof symlink !== 'string') {
      throw new Error('symlink should be a string');
    }

    this._symlink = removeTrailingSep(normalize(symlink));
  },
});

module.exports = File;
