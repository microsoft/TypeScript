// Type definitions for Browserify 12.0
// Project: http://browserify.org/
// Definitions by: Andrew Gaspar <https://github.com/AndrewGaspar>, John Vilk <https://github.com/jvilk>, Leonard Thieu <https://github.com/leonard-thieu>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="node" />

import insertGlobals = require('insert-module-globals');

declare var browserify: browserify.BrowserifyConstructor;
export = browserify;

declare namespace browserify {
/**
 * Options pertaining to an individual file.
 */
interface FileOptions {
  // If true, this is considered an entry point to your app.
  entry?: boolean;
  // Expose this file under a custom dependency name.
  // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular')
  expose?: string;
  // Basedir to use to resolve this file's path.
  basedir?: string;
  // The name/path to the file.
  file?: string;
  // Forward file to external() to be externalized.
  external?: boolean;
  // Disable transforms on file if set to false.
  transform?: boolean;
  // The ID to use for require() statements.
  id?: string;
}

// Browserify accepts a filename, an input stream for file inputs, or a FileOptions configuration
// for each file in a bundle.
type InputFile = string | NodeJS.ReadableStream | FileOptions;

/**
 * Core options pertaining to a Browserify instance, extended by user options
 */
interface CustomOptions {
  /**
   * Custom properties can be defined on Options.
   * These options are forwarded along to module-deps and browser-pack directly.
   */
  [propName: string]: any;
  /** the directory that Browserify starts bundling from for filenames that start with .. */
  basedir?: string;
}
/**
 * Options pertaining to a Browserify instance.
 */
interface Options extends CustomOptions {
  // String, file object, or array of those types (they may be mixed) specifying entry file(s).
  entries?: InputFile | InputFile[];
  // an array which will skip all require() and global parsing for each file in the array.
  // Use this for giant libs like jquery or threejs that don't have any requires or node-style globals but take forever to parse.
  noParse?: string[];
  // an array of optional extra extensions for the module lookup machinery to use when the extension has not been specified.
  // By default Browserify considers only .js and .json files in such cases.
  extensions?: string[];
  // an array of directories that Browserify searches when looking for modules which are not referenced using relative path.
  // Can be absolute or relative to basedir. Equivalent of setting NODE_PATH environmental variable when calling Browserify command.
  paths?: string[];
  // sets the algorithm used to parse out the common paths. Use false to turn this off, otherwise it uses the commondir module.
  commondir?: boolean;
  // disables converting module ids into numerical indexes. This is useful for preserving the original paths that a bundle was generated with.
  fullPaths?: boolean;
  // sets the list of built-ins to use, which by default is set in lib/builtins.js in this distribution.
  builtins?: string[] | {[builtinName: string]: string} | boolean;
  // set if external modules should be bundled. Defaults to true.
  bundleExternal?: boolean;
  // When true, always insert process, global, __filename, and __dirname without analyzing the AST for faster builds but larger output bundles. Default false.
  insertGlobals?: boolean;
  // When true, scan all files for process, global, __filename, and __dirname, defining as necessary.
  // With this option npm modules are more likely to work but bundling takes longer. Default true.
  detectGlobals?: boolean;
  // When true, add a source map inline to the end of the bundle. This makes debugging easier because you can see all the original files if you are in a modern enough browser.
  debug?: boolean;
  // When a non-empty string, a standalone module is created with that name and a umd wrapper.
  // You can use namespaces in the standalone global export using a . in the string name as a separator, for example 'A.B.C'.
  // The global export will be sanitized and camel cased.
  standalone?: string;
  // will be passed to insert-module-globals as the opts.vars parameter.
  insertGlobalVars?: insertGlobals.VarsOption;
  // defaults to 'require' in expose mode but you can use another name.
  externalRequireName?: string;
}

interface BrowserifyConstructor {
  (files: InputFile[], opts?: Options): BrowserifyObject;
  (file: InputFile, opts?: Options): BrowserifyObject;
  (opts?: Options): BrowserifyObject;
  new(files: InputFile[], opts?: Options): BrowserifyObject;
  new(file: InputFile, opts?: Options): BrowserifyObject;
  new(opts?: Options): BrowserifyObject;
}

interface BrowserifyObject extends NodeJS.EventEmitter {
  /**
   * Add an entry file from file that will be executed when the bundle loads.
   * If file is an array, each item in file will be added as an entry file.
   */
  add(file: InputFile[], opts?: FileOptions): BrowserifyObject;
  add(file: InputFile, opts?: FileOptions): BrowserifyObject;
  /**
   * Make file available from outside the bundle with require(file).
   * The file param is anything that can be resolved by require.resolve().
   * file can also be a stream, but you should also use opts.basedir so that relative requires will be resolvable.
   * If file is an array, each item in file will be required. In file array form, you can use a string or object for each item. Object items should have a file property and the rest of the parameters will be used for the opts.
   * Use the expose property of opts to specify a custom dependency name. require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular')
   */
  require(file: InputFile, opts?: FileOptions): BrowserifyObject;
  /**
   * Bundle the files and their dependencies into a single javascript file.
   * Return a readable stream with the javascript file contents or optionally specify a cb(err, buf) to get the buffered results.
   */
  bundle(cb?: (err: any, src: Buffer) => any): NodeJS.ReadableStream;
  /**
   * Prevent file from being loaded into the current bundle, instead referencing from another bundle.
   * If file is an array, each item in file will be externalized.
   * If file is another bundle, that bundle's contents will be read and excluded from the current bundle as the bundle in file gets bundled.
   */
  external(file: string[], opts?: CustomOptions): BrowserifyObject;
  external(file: string, opts?: CustomOptions): BrowserifyObject;
  external(file: BrowserifyObject): BrowserifyObject;
  /**
   * Prevent the module name or file at file from showing up in the output bundle.
   * Instead you will get a file with module.exports = {}.
   */
  ignore(file: string, opts?: CustomOptions): BrowserifyObject;
  /**
   * Prevent the module name or file at file from showing up in the output bundle.
   * If your code tries to require() that file it will throw unless you've provided another mechanism for loading it.
   */
  exclude(file: string, opts?: CustomOptions): BrowserifyObject;
  /**
   * Transform source code before parsing it for require() calls with the transform function or module name tr.
   * If tr is a function, it will be called with tr(file) and it should return a through-stream that takes the raw file contents and produces the transformed source.
   * If tr is a string, it should be a module name or file path of a transform module
   */
  transform<T extends CustomOptions>(tr: string, opts?: T): BrowserifyObject;
  transform<T extends CustomOptions>(tr: (file: string, opts: T) => NodeJS.ReadWriteStream, opts?: T): BrowserifyObject;
  /**
   * Register a plugin with opts. Plugins can be a string module name or a function the same as transforms.
   * plugin(b, opts) is called with the Browserify instance b.
   */
  plugin<T extends CustomOptions>(plugin: string, opts?: T): BrowserifyObject;
  plugin<T extends CustomOptions>(plugin: (b: BrowserifyObject, opts: T) => any, opts?: T): BrowserifyObject;
  /**
   * Reset the pipeline back to a normal state. This function is called automatically when bundle() is called multiple times.
   * This function triggers a 'reset' event.
   */
  reset(opts?: Options): void;

  /**
   * When a file is resolved for the bundle, the bundle emits a 'file' event with the full file path, the id string passed to require(), and the parent object used by browser-resolve.
   * You could use the file event to implement a file watcher to regenerate bundles when files change.
   */
  on(event: 'file', listener: (file: string, id: string, parent: any) => any): this;
  /**
   * When a package.json file is read, this event fires with the contents.
   * The package directory is available at pkg.__dirname.
   */
  on(event: 'package', listener: (pkg: any) => any): this;
  /**
   * When .bundle() is called, this event fires with the bundle output stream.
   */
  on(event: 'bundle', listener: (bundle: NodeJS.ReadableStream) => any): this;
  /**
   * When the .reset() method is called or implicitly called by another call to .bundle(), this event fires.
   */
  on(event: 'reset', listener: () => any): this;
  /**
   * When a transform is applied to a file, the 'transform' event fires on the bundle stream with the transform stream tr and the file that the transform is being applied to.
   */
  on(event: 'transform', listener: (tr: NodeJS.ReadWriteStream, file: string) => any): this;
  on(event: string, listener: Function): this;

  /**
   * Set to any until substack/labeled-stream-splicer is defined
   */
  pipeline: any;
}
}
