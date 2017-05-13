(function() {
    var ts = require('./typescript');
    var extensions = ['.ts', '.tsx'];

    path = require('path');
    fs = require('fs');

    loadFile = function(module, filename) {
        var source = fs.readFileSync(filename, 'utf-8');
        var configFile = ts.findConfigFile(filename);
        var opts = {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES5
        };
        if (configFile) {
            var configFileContents = ts.readConfigFile(configFile);
            opts = configFileContents.config;
            opts.files = [];
            opts = ts.parseConfigFile(opts, null, process.cwd()).options;
        }
        var answer = ts.transpile(source, opts);
        return module._compile(answer, filename);
    };

    if (require.extensions) {
        ref = extensions;
        for (i = 0, len = ref.length; i < len; i++) {
            ext = ref[i];
            require.extensions[ext] = loadFile;
        }
        Module = require('module');
        findExtension = function(filename) {
            var curExtension, extensions;
            extensions = path.basename(filename).split('.');
            if (extensions[0] === '') {
                extensions.shift();
            }
            while (extensions.shift()) {
                curExtension = '.' + extensions.join('.');
                if (Module._extensions[curExtension]) {
                    return curExtension;
                }
            }
            return '.js';
        };
        Module.prototype.load = function(filename) {
            var extension;
            this.filename = filename;
            this.paths = Module._nodeModulePaths(path.dirname(filename));
            extension = findExtension(filename);
            Module._extensions[extension](this, filename);
            return this.loaded = true;
        };
    }

}).call(this);
