3.0.1 / 2015-04-25
==================

- Document and test casing/sanitization behavior (thanks @bendrucker)

3.0.0 / 2015-02-04
==================

 - remove dependency on ruglify (thanks to @zertosh)
 - add `this` as an additional fallback when looking for a global (thanks to @winterbe)
 - use `options` rather than `true` / `false` for whether to use CommonJS (with fallback for backwards compatibility).
 - support `$` and `_` in module names (thanks to @fitnr) **(BREAKING CHANGE)**
 - uglify as a pre-publish step - removing a dependency
 - brfs as a pre-publish step - allowing this module to be used from the browser.
 - remove support for streaming **(BREAKING CHANGE)**

2.1.0 / 2014-04-02
==================

 - Check for definition of `module` as well as `exports` for CommonJS (fixes some custom RequireJS loaders)
 - Pass empty array to define for AMD

2.0.0 / 2013-12-29
==================

 - Use module name as a namespace for globals if it contains `.`

1.3.1 / 2013-08-25
==================

 - Update uglify-js

1.3.0 / 2013-08-01
==================

 - Remove SES and Montage bootstrap
 - Add MIT LICENSE
 - Handle web workers global
 - Update uglify-js to fix npm warning

1.2.1 / 2013-06-07
==================

 - Fix CLI

1.2.0 / 2013-06-07
==================

 - Add CLI

1.1.1 / 2013-04-15
==================

 - Update through

1.1.0 / 2013-03-31
==================

 - Make Cammel Case less suprising/forcefull

1.0.0 / 2013-03-16
==================

 - Initial Release
