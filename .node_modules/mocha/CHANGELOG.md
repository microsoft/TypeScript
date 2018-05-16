# 5.1.1 / 2018-04-18

## :bug: Fixes

- [#3325]: Revert change which broke `--watch` ([@boneskull])

[#3325]: https://github.com/mochajs/mocha/issues/3325

# 5.1.0 / 2018-04-12

## :tada: Enhancements

- [#3210]: Add `--exclude` option ([@metalex9])

## :bug: Fixes

- [#3318]: Fix failures in circular objects in JSON reporter ([@jeversmann], [@boneskull])

## :book: Documentation

- [#3323]: Publish actual [API documentation](https://mochajs.org/api/)! ([@dfberry], [@Munter])
- [#3299]: Improve docs around exclusive tests ([@nicgirault])

## :nut_and_bolt: Other

- [#3302], [#3308], [#3310], [#3315], [#3316]: Build matrix improvements ([more info](https://boneskull.com/mocha-and-travis-ci-build-stages/)) ([@outsideris], [@boneskull])
- [#3272]: Refactor reporter tests ([@jMuzsik])

[#3210]: https://github.com/mochajs/mocha/pull/3210
[#3318]: https://github.com/mochajs/mocha/pull/3318
[#3323]: https://github.com/mochajs/mocha/pull/3323
[#3299]: https://github.com/mochajs/mocha/pull/3299
[#3302]: https://github.com/mochajs/mocha/pull/3302
[#3308]: https://github.com/mochajs/mocha/pull/3308
[#3310]: https://github.com/mochajs/mocha/pull/3310
[#3315]: https://github.com/mochajs/mocha/pull/3315
[#3316]: https://github.com/mochajs/mocha/pull/3316
[#3272]: https://github.com/mochajs/mocha/pull/3272
[@metalex9]: https://github.com/metalex9
[@jeversmann]: https://github.com/jeversmann
[@dfberry]: https://github.com/dfberry
[@nicgirault]: https://github.com/nicgirault
[@jMuzsik]: https://github.com/jMuzsik

# 5.0.5 / 2018-03-22

Welcome [@outsideris] to the team!

## :bug: Fixes

- [#3096]: Fix `--bail` failing to bail within hooks ([@outsideris])
- [#3184]: Don't skip too many suites (using `describe.skip()`) ([@outsideris])

## :book: Documentation

- [#3133]: Improve docs regarding "pending" behavior ([@ematicipo])
- [#3276], [#3274]: Fix broken stuff in `CHANGELOG.md` ([@tagoro9], [@honzajavorek])

## :nut_and_bolt: Other

- [#3208]: Improve test coverage for AMD users ([@outsideris])
- [#3267]: Remove vestiges of PhantomJS from CI ([@anishkny])
- [#2952]: Fix a debug message ([@boneskull])

[#3096]: https://github.com/mochajs/mocha/issues/3096
[#3184]: https://github.com/mochajs/mocha/issues/3184
[#3133]: https://github.com/mochajs/mocha/issues/3133
[#3276]: https://github.com/mochajs/mocha/pull/3276
[#3274]: https://github.com/mochajs/mocha/pull/3274
[#3208]: https://github.com/mochajs/mocha/issues/3208
[#2952]: https://github.com/mochajs/mocha/issues/2952
[#3267]: https://github.com/mochajs/mocha/pull/3267

[@ematicipo]: https://github.com/ematicipo
[@tagoro9]: https://github.com/tagoro9
[@honzajavorek]: https://github.com/honajavorek
[@anishkny]: https://github.com/anishkny

# 5.0.4 / 2018-03-07

## :bug: Fixes

- [#3265]: Fixes regression in "watch" functionality introduced in v5.0.2 ([@outsideris])

[#3265]: https://github.com/mochajs/mocha/issues/3265

# 5.0.3 / 2018-03-06

This patch features a fix to address a potential "low severity" [ReDoS vulnerability](https://snyk.io/vuln/npm:diff:20180305) in the [diff](https://npm.im/diff) package (a dependency of Mocha).

## :lock: Security Fixes

- [#3266]: Bump `diff` to v3.5.0 ([@anishkny])

## :nut_and_bolt: Other

- [#3011]: Expose `generateDiff()` in `Base` reporter ([@harrysarson])

[#3266]: https://github.com/mochajs/mocha/pull/3266
[#3011]: https://github.com/mochajs/mocha/issues/3011

[@anishkny]: https://github.com/anishkny
[@harrysarson]: https://github.com/harrysarson

# 5.0.2 / 2018-03-05

This release fixes a class of tests which report as *false positives*.  **Certain tests will now break**, though they would have previously been reported as passing.  Details below.  Sorry for the inconvenience!

## :bug: Fixes

- [#3226]: Do not swallow errors that are thrown asynchronously from passing tests ([@boneskull]).  Example:

  ```js
  it('should actually fail, sorry!', function (done) {
    // passing assertion
    assert(true === true);

    // test complete & is marked as passing
    done();

    // ...but something evil lurks within
    setTimeout(() => {
      throw new Error('chaos!');
    }, 100);
  });
  ```

  Previously to this version, Mocha would have *silently swallowed* the `chaos!` exception, and you wouldn't know.  Well, *now you know*.  Mocha cannot recover from this gracefully, so it will exit with a nonzero code.

  **Maintainers of external reporters**: *If* a test of this class is encountered, the `Runner` instance will emit the `end` event *twice*; you *may* need to change your reporter to use `runner.once('end')` intead of `runner.on('end')`.
- [#3093]: Fix stack trace reformatting problem ([@outsideris])

## :nut_and_bolt: Other

- [#3248]: Update `browser-stdout` to v1.3.1 ([@honzajavorek])

[#3248]: https://github.com/mochajs/mocha/issues/3248
[#3226]: https://github.com/mochajs/mocha/issues/3226
[#3093]: https://github.com/mochajs/mocha/issues/3093
[@honzajavorek]: https://github.com/honzajavorek

# 5.0.1 / 2018-02-07

...your garden-variety patch release.

Special thanks to [Wallaby.js](https://wallabyjs.com) for their continued support! :heart:

## :bug: Fixes

- [#1838]: `--delay` now works with `.only()` ([@silviom])
- [#3119]: Plug memory leak present in v8 ([@boneskull])

## :book: Documentation

- [#3132], [#3098]: Update `--glob` docs ([@outsideris])
- [#3212]: Update [Wallaby.js](https://wallabyjs.com)-related docs ([@ArtemGovorov])
- [#3205]: Remove outdated cruft ([@boneskull])

## :nut_and_bolt: Other

- [#3224]: Add proper Wallaby.js config ([@ArtemGovorov])
- [#3230]: Update copyright year ([@josephlin55555])

[#1838]: https://github.com/mochajs/mocha/issues/1838
[#3119]: https://github.com/mochajs/mocha/issues/3119
[#3132]: https://github.com/mochajs/mocha/issues/3132
[#3098]: https://github.com/mochajs/mocha/issues/3098
[#3212]: https://github.com/mochajs/mocha/pull/3212
[#3205]: https://github.com/mochajs/mocha/pull/3205
[#3224]: https://github.com/mochajs/mocha/pull/3224
[#3230]: https://github.com/mochajs/mocha/pull/3230
[@silviom]: https://github.com/silviom
[@outsideris]: https://github.com/outsideris
[@ArtemGovorov]: https://github.com/ArtemGovorov
[@josephlin55555]: https://github.com/josephlin55555

# 5.0.0 / 2018-01-17

Mocha starts off 2018 right by again dropping support for *unmaintained rubbish*.

Welcome [@vkarpov15] to the team!

## :boom: Breaking Changes

- **[#3148]: Drop support for IE9 and IE10** ([@Bamieh])
  Practically speaking, only code which consumes (through bundling or otherwise) the userland [buffer](https://npm.im/buffer) module should be affected.  However, Mocha will no longer test against these browsers, nor apply fixes for them.

## :tada: Enhancements

- [#3181]: Add useful new `--file` command line argument ([documentation](https://mochajs.org/#--file-file)) ([@hswolff])

## :bug: Fixes

- [#3187]: Fix inaccurate test duration reporting ([@FND])
- [#3202]: Fix bad markup in HTML reporter ([@DanielRuf])

## :sunglasses: Developer Experience

- [#2352]: Ditch GNU Make for [nps](https://npm.im/nps) to manage scripts ([@TedYav])

## :book: Documentation

- [#3137]: Add missing `--no-timeouts` docs ([@dfberry])
- [#3134]: Improve `done()` callback docs ([@maraisr])
- [#3135]: Fix cross-references ([@vkarpov15])
- [#3163]: Fix tpyos ([@tbroadley])
- [#3177]: Tweak `README.md` organization ([@xxczaki])
- Misc updates ([@boneskull])

## :nut_and_bolt: Other

- [#3118]: Move TextMate Integration to [its own repo](https://github.com/mochajs/mocha.tmbundle) ([@Bamieh])
- [#3185]: Add Node.js v9 to build matrix; remove v7 ([@xxczaki])
- [#3172]: Markdown linting ([@boneskull])
- Test & Netlify updates ([@Munter], [@boneskull])

[#3148]: https://github.com/mochajs/mocha/issues/3148
[#3181]: https://github.com/mochajs/mocha/issues/3181
[#3187]: https://github.com/mochajs/mocha/issues/3187
[#3202]: https://github.com/mochajs/mocha/pull/3202
[#2352]: https://github.com/mochajs/mocha/issues/2352
[#3137]: https://github.com/mochajs/mocha/issues/3137
[#3134]: https://github.com/mochajs/mocha/issues/3134
[#3135]: https://github.com/mochajs/mocha/issues/3135
[#3163]: https://github.com/mochajs/mocha/pull/3163
[#3177]: https://github.com/mochajs/mocha/pull/3177
[#3118]: https://github.com/mochajs/mocha/issues/3118
[#3185]: https://github.com/mochajs/mocha/issues/3185
[#3172]: https://github.com/mochajs/mocha/issues/3172
[@hswolff]: https://github.com/hswolff
[@FND]: https://github.com/FND
[@DanielRuf]: https://github.com/DanielRuf
[@TedYav]: https://github.com/TedYav
[@dfberry]: https://github.com/dfberry
[@maraisr]: https://github.com/maraisr
[@vkarpov15]: https://github.com/vkarpov15
[@tbroadley]: https://github.com/tbroadley

# 4.1.0 / 2017-12-28

This is mainly a "housekeeping" release.

Welcome [@Bamieh] and [@xxczaki] to the team!

## :bug: Fixes

- [#2661]: `progress` reporter now accepts reporter options ([@canoztokmak])
- [#3142]: `xit` in `bdd` interface now properly returns its `Test` object ([@Bamieh])
- [#3075]: Diffs now computed eagerly to avoid misinformation when reported ([@abrady0])
- [#2745]: `--help` will now help you even if you have a `mocha.opts` ([@Zarel])

## :tada: Enhancements

- [#2514]: The `--no-diff` flag will completely disable diff output ([@CapacitorSet])
- [#3058]: All "setters" in Mocha's API are now also "getters" if called without arguments ([@makepanic])

## :book: Documentation

- [#3170]: Optimization and site speed improvements ([@Munter])
- [#2987]: Moved the old [site repo](https://github.com/mochajs/mochajs.github.io) into the main repo under `docs/` ([@boneskull])
- [#2896]: Add [maintainer guide](https://github.com/mochajs/mocha/blob/master/MAINTAINERS.md) ([@boneskull])
- Various fixes and updates ([@xxczaki], [@maty21], [@leedm777])

## :nut_and_bolt: Other

- Test improvements and fixes ([@eugenet8k], [@ngeor], [@38elements], [@Gerhut], [@ScottFreeCode], [@boneskull])
- Refactoring and cruft excision ([@38elements], [@Bamieh], [@finnigantime], [@boneskull])

[#2661]: https://github.com/mochajs/mocha/issues/2661
[#3142]: https://github.com/mochajs/mocha/issues/3142
[#3075]: https://github.com/mochajs/mocha/pull/3075
[#2745]: https://github.com/mochajs/mocha/issues/2745
[#2514]: https://github.com/mochajs/mocha/issues/2514
[#3058]: https://github.com/mochajs/mocha/issues/3058
[#3170]: https://github.com/mochajs/mocha/pull/3170
[#2987]: https://github.com/mochajs/mocha/issues/2987
[#2896]: https://github.com/mochajs/mocha/issues/2896
[@canoztokmak]: https://github.com/canoztokmak
[@Bamieh]: https://github.com/Bamieh
[@abrady0]: https://github.com/abrady0
[@Zarel]: https://github.com/Zarel
[@CapacitorSet]: https://github.com/CapacitorSet
[@xxczaki]: https://github.com/xxczaki
[@maty21]: https://github.com/maty21
[@leedm777]: https://github.com/leedm777
[@eugenet8k]: https://github.com/eugenet8k
[@38elements]: https://github.com/38elements
[@Gerhut]: https://github.com/Gerhut
[@finnigantime]: https://github.com/finnigantime

# 4.0.1 / 2017-10-05

## :bug: Fixes

- [#3051]: Upgrade Growl to v1.10.3 to fix its [peer dep problems](https://github.com/tj/node-growl/pull/68) ([@dpogue])

[#3051]: https://github.com/mochajs/mocha/pull/3051
[@dpogue]: https://github.com/dpogue

# 4.0.0 / 2017-10-02

You might want to read this before filing a new bug!  :stuck_out_tongue_closed_eyes:

## :boom: Breaking Changes

For more info, please [read this article](https://boneskull.com/mocha-v4-nears-release/).

### Compatibility

- [#3016]: Drop support for unmaintained versions of Node.js ([@boneskull]):
  - 0.10.x
  - 0.11.x
  - 0.12.x
  - iojs (any)
  - 5.x.x
- [#2979]: Drop support for non-ES5-compliant browsers ([@boneskull]):
  - IE7
  - IE8
  - PhantomJS 1.x
- [#2615]: Drop Bower support; old versions (3.x, etc.) will remain available ([@ScottFreeCode], [@boneskull])

### Default Behavior

- [#2879]: By default, Mocha will no longer force the process to exit once all tests complete.  This means any test code (or code under test) which would normally prevent `node` from exiting will do so when run in Mocha.  Supply the `--exit` flag to revert to pre-v4.0.0 behavior ([@ScottFreeCode], [@boneskull])

### Reporter Output

- [#2095]: Remove `stdout:` prefix from browser reporter logs ([@skeggse])
- [#2295]: Add separator in "unified diff" output ([@olsonpm])
- [#2686]: Print failure message when `--forbid-pending` or `--forbid-only` is specified ([@ScottFreeCode])
- [#2814]: Indent contexts for better readability when reporting failures ([@charlierudolph])

## :-1: Deprecations

- [#2493]: The `--compilers` command-line option is now soft-deprecated and will emit a warning on `STDERR`.  Read [this](https://github.com/mochajs/mocha/wiki/compilers-deprecation) for more info and workarounds ([@ScottFreeCode], [@boneskull])

## :tada: Enhancements

- [#2628]: Allow override of default test suite name in XUnit reporter ([@ngeor])

## :book: Documentation

- [#3020]: Link to CLA in `README.md` and `CONTRIBUTING.md` ([@skeggse])

## :nut_and_bolt: Other

- [#2890]: Speed up build by (re-)consolidating SauceLabs tests ([@boneskull])

[#3016]: https://github.com/mochajs/mocha/issues/3016
[#2979]: https://github.com/mochajs/mocha/issues/2979
[#2615]: https://github.com/mochajs/mocha/issues/2615
[#2879]: https://github.com/mochajs/mocha/issues/2879
[#2095]: https://github.com/mochajs/mocha/issues/2095
[#2295]: https://github.com/mochajs/mocha/issues/2295
[#2686]: https://github.com/mochajs/mocha/issues/2686
[#2814]: https://github.com/mochajs/mocha/pull/2814
[#2493]: https://github.com/mochajs/mocha/issues/2493
[#2628]: https://github.com/mochajs/mocha/issues/2628
[#3020]: https://github.com/mochajs/mocha/pull/3020
[#2890]: https://github.com/mochajs/mocha/issues/2890
[@skeggse]: https://github.com/skeggse
[@olsonpm]: https://github.com/olsonpm
[@ngeor]: https://github.com/ngeor

# 3.5.3 / 2017-09-11

## :bug: Fixes

- [#3003]: Fix invalid entities in xUnit reporter first appearing in v3.5.1 ([@jkrems])

[#3003]: https://github.com/mochajs/mocha/pull/3003

# 3.5.2 / 2017-09-10

## :bug: Fixes

- [#3001]: Fix AMD-related failures first appearing in v3.5.1 ([@boneskull])

[#3001]: https://github.com/mochajs/mocha/pull/3001

# 3.5.1 / 2017-09-09

## :newspaper: News

- :mega: Mocha is now sponsoring [PDXNode](http://pdxnode.org)!  If you're in the [Portland](https://wikipedia.org/wiki/Portland,_Oregon) area, come check out the monthly talks and hack nights!

## :bug: Fixes

- [#2997]: Fix missing `xit` export for "require" interface ([@solodynamo])
- [#2957]: Fix unicode character handling in XUnit reporter failures ([@jkrems])

## :nut_and_bolt: Other

- [#2986]: Add issue and PR templates ([@kungapal])
- [#2918]: Drop bash dependency for glob-related tests ([@ScottFreeCode])
- [#2922]: Improve `--compilers` coverage ([@ScottFreeCode])
- [#2981]: Fix tpyos and spelling errors ([@jsoref])

[#2997]: https://github.com/mochajs/mocha/pull/2997
[#2957]: https://github.com/mochajs/mocha/pull/2957
[#2918]: https://github.com/mochajs/mocha/pull/2918
[#2986]: https://github.com/mochajs/mocha/pull/2986
[#2922]: https://github.com/mochajs/mocha/pull/2922
[#2981]: https://github.com/mochajs/mocha/pull/2981
[@solodynamo]: https://github.com/solodynamo
[@jkrems]: https://github.com/jkrems
[@jsoref]: https://github.com/jsoref

# 3.5.0 / 2017-07-31

## :newspaper: News

- Mocha now has a [code of conduct](https://github.com/mochajs/mocha/blob/master/.github/CODE_OF_CONDUCT.md) (thanks [@kungapal]!).
- Old issues and PRs are now being marked "stale" by [Probot's "Stale" plugin](https://github.com/probot/stale).  If an issue is marked as such, and you would like to see it remain open, simply add a new comment to the ticket or PR.
- **WARNING**: Support for non-ES5-compliant environments will be dropped starting with version 4.0.0 of Mocha!

## :lock: Security Fixes

- [#2860]: Address [CVE-2015-8315](https://nodesecurity.io/advisories/46) via upgrade of [debug](https://npm.im/debug) ([@boneskull])

## :tada: Enhancements

- [#2696]: Add `--forbid-only` and `--forbid-pending` flags.  Use these in CI or hooks to ensure tests aren't accidentally being skipped! ([@charlierudolph])
- [#2813]: Support Node.js 8's `--napi-modules` flag ([@jupp0r])

## :nut_and_bolt: Other

- Various CI-and-test-related fixes and improvements ([@boneskull], [@dasilvacontin], [@PopradiArpad], [@Munter], [@ScottFreeCode])
- "Officially" support Node.js 8 ([@elergy])

[#2860]: https://github.com/mochajs/mocha/pull/2860
[#2696]: https://github.com/mochajs/mocha/pull/2696
[#2813]: https://github.com/mochajs/mocha/pull/2813
[@charlierudolph]: https://github.com/charlierudolph
[@PopradiArpad]: https://github.com/PopradiArpad
[@kungapal]: https://github.com/kungapal
[@elergy]: https://github.com/elergy
[@jupp0r]: https://github.com/jupp0r

# 3.4.2 / 2017-05-24

## :bug: Fixes

- [#2802]: Remove call to deprecated `os.tmpDir` ([@makepanic])
- [#2820]: Eagerly set `process.exitCode` ([@chrisleck])

## :nut_and_bolt: Other

- [#2778]: Move linting into an npm script ([@Munter])

[@chrisleck]: https://github.com/chrisleck
[@makepanic]: https://github.com/makepanic
[@Munter]: https://github.com/Munter

[#2778]: https://github.com/mochajs/mocha/pull/2778
[#2802]: https://github.com/mochajs/mocha/issues/2802
[#2820]: https://github.com/mochajs/mocha/pull/2820

# 3.4.1 / 2017-05-14

Fixed a publishing mishap with git's autocrlf settings.

# 3.4.0 / 2017-05-14

Mocha is now moving to a quicker release schedule: when non-breaking changes are merged, a release should happen that week.

This week's highlights:

- `allowUncaught` added to commandline as `--allow-uncaught` (and bugfixed)
- warning-related Node flags

## :tada: Enhancements

- [#2793], [#2697]: add --allowUncaught to Node.js ([@lrowe])
- [#2733]: Add `--no-warnings` and `--trace-warnings` flags ([@sonicdoe])

## :bug: Fixes

- [#2793], [#2697]: fix broken allowUncaught ([@lrowe])

## :nut_and_bolt: Other

- [#2778]: Add license report and scan status ([@xizhao])
- [#2794]: no special case for macOS running Karma locally ([@boneskull])
- [#2795]: reverts use of semistandard directly ([#2648]) ([@boneskull])

[@lrowe]: https://github.com/lrowe
[@sonicdoe]: https://github.com/sonicdoe
[@xizhao]: https://github.com/xizhao
[@boneskull]: https://github.com/boneskull

[#2795]: https://github.com/mochajs/mocha/pull/2795
[#2733]: https://github.com/mochajs/mocha/pull/2733
[#2793]: https://github.com/mochajs/mocha/pull/2793
[#2697]: https://github.com/mochajs/mocha/pull/2697
[#2778]: https://github.com/mochajs/mocha/pull/2778
[#2794]: https://github.com/mochajs/mocha/pull/2794

# 3.3.0 / 2017-04-24

Thanks to all our contributors, maintainers, sponsors, and users! ❤️

As highlights:

- We've got coverage now!
- Testing is looking less flaky \o/.
- No more nitpicking about "mocha.js" build on PRs.

## :tada: Enhancements

- [#2659]: Adds support for loading reporter from an absolute or relative path ([@sul4bh])
- [#2769]: Support `--inspect-brk` on command-line ([@igwejk])

## :bug: Fixes

- [#2662]: Replace unicode chars w/ hex codes in HTML reporter ([@rotemdan])

## :mag: Coverage

- [#2672]: Add coverage for node tests ([@c089], [@Munter])
- [#2680]: Increase tests coverage for base reporter ([@epallerols])
- [#2690]: Increase tests coverage for doc reporter ([@craigtaub])
- [#2701]: Increase tests coverage for landing, min, tap and list reporters ([@craigtaub])
- [#2691]: Increase tests coverage for spec + dot reporters ([@craigtaub])
- [#2698]: Increase tests coverage for xunit reporter ([@craigtaub])
- [#2699]: Increase tests coverage for json-stream, markdown and progress reporters ([@craigtaub])
- [#2703]: Cover .some() function in utils.js with tests ([@seppevs])
- [#2773]: Add tests for loading reporters w/ relative/absolute paths ([@sul4bh])

## :nut_and_bolt: Other

- Remove bin/.eslintrc; ensure execs are linted ([@boneskull])
- [#2542]: Expand CONTRIBUTING.md ([@boneskull])
- [#2660]: Double timeouts on integration tests ([@Munter])
- [#2653]: Update copyright year ([@Scottkao85], [@Munter])
- [#2621]: Update dependencies to enable Greenkeeper ([@boneskull], [@greenkeeper])
- [#2625]: Use trusty container in travis-ci; use "artifacts" addon ([@boneskull])
- [#2670]: doc(CONTRIBUTING): fix link to org members ([@coderbyheart])
- Add Mocha propaganda to README.md ([@boneskull])
- [#2470]: Avoid test flake in "delay" test ([@boneskull])
- [#2675]: Limit browser concurrency on sauce ([@boneskull])
- [#2669]: Use temporary test-only build of mocha.js for browsers tests ([@Munter])
- Fix "projects" link in README.md ([@boneskull])
- [#2678]: Chore(Saucelabs): test on IE9, IE10 and IE11 ([@coderbyheart])
- [#2648]: Use `semistandard` directly ([@kt3k])
- [#2727]: Make the build reproducible ([@lamby])

[@boneskull]: https://github.com/boneskull
[@c089]: https://github.com/c089
[@coderbyheart]: https://github.com/coderbyheart
[@craigtaub]: https://github.com/craigtaub
[@epallerols]: https://github.com/epallerols
[@greenkeeper]: https://github.com/greenkeeper
[@igwejk]: https://github.com/igwejk
[@kt3k]: https://github.com/kt3k
[@lamby]: https://github.com/lamby
[@Munter]: https://github.com/Munter
[@rotemdan]: https://github.com/rotemdan
[@seppevs]: https://github.com/seppevs
[@sul4bh]: https://github.com/sul4bh

[#2470]: https://github.com/mochajs/mocha/pull/2470
[#2542]: https://github.com/mochajs/mocha/issues/2542
[#2621]: https://github.com/mochajs/mocha/pull/2621
[#2625]: https://github.com/mochajs/mocha/pull/2625
[#2648]: https://github.com/mochajs/mocha/pull/2648
[#2653]: https://github.com/mochajs/mocha/pull/2653
[#2659]: https://github.com/mochajs/mocha/pull/2659
[#2660]: https://github.com/mochajs/mocha/pull/2660
[#2662]: https://github.com/mochajs/mocha/pull/2662
[#2669]: https://github.com/mochajs/mocha/pull/2669
[#2670]: https://github.com/mochajs/mocha/pull/2670
[#2672]: https://github.com/mochajs/mocha/pull/2672
[#2675]: https://github.com/mochajs/mocha/pull/2675
[#2678]: https://github.com/mochajs/mocha/pull/2678
[#2680]: https://github.com/mochajs/mocha/pull/2680
[#2690]: https://github.com/mochajs/mocha/pull/2690
[#2691]: https://github.com/mochajs/mocha/pull/2691
[#2698]: https://github.com/mochajs/mocha/pull/2698
[#2699]: https://github.com/mochajs/mocha/pull/2699
[#2701]: https://github.com/mochajs/mocha/pull/2701
[#2703]: https://github.com/mochajs/mocha/pull/2703
[#2727]: https://github.com/mochajs/mocha/pull/2727
[#2769]: https://github.com/mochajs/mocha/pull/2769
[#2773]: https://github.com/mochajs/mocha/pull/2773

# 3.2.0 / 2016-11-24

## :newspaper: News

### Mocha is now a JS Foundation Project!

Mocha is proud to have joined the [JS Foundation](https://js.foundation).  For more information, [read the announcement](https://js.foundation/announcements/2016/10/17/Linux-Foundation-Unites-JavaScript-Community-Open-Web-Development/).

### Contributor License Agreement

Under the foundation, all contributors to Mocha must sign the [JS Foundation CLA](https://js.foundation/CLA/) before their code can be merged.  When sending a PR--if you have not already signed the CLA--a friendly bot will ask you to do so.

Mocha remains licensed under the [MIT license](https://github.com/mochajs/mocha/blob/master/LICENSE).

## :bug: Bug Fix

- [#2535]: Fix crash when `--watch` encounters broken symlinks ([@villesau])
- [#2593]: Fix (old) regression; incorrect symbol shown in `list` reporter ([@Aldaviva])
- [#2584]: Fix potential error when running XUnit reporter ([@vobujs])

## :tada: Enhancement

- [#2294]: Improve timeout error messaging ([@jeversmann], [@boneskull])
- [#2520]: Add info about `--inspect` flag to CLI help ([@ughitsaaron])

## :nut_and_bolt: Other

- [#2570]: Use [karma-mocha](https://npmjs.com/package/karma-mocha) proper ([@boneskull])
- Licenses updated to reflect new copyright, add link to license and browser matrix to `README.md` ([@boneskull], [@ScottFreeCode], [@dasilvacontin])

[#2294]: https://github.com/mochajs/mocha/issues/2294
[#2535]: https://github.com/mochajs/mocha/issues/2535
[#2520]: https://github.com/mochajs/mocha/pull/2520
[#2593]: https://github.com/mochajs/mocha/pull/2593
[#2584]: https://github.com/mochajs/mocha/issues/2584
[#2570]: https://github.com/mochajs/mocha/issues/2570
[@Aldaviva]: https://github.com/Aldaviva
[@jeversmann]: https://github.com/jeversmann
[@ughitsaaron]: https://github.com/ughitsaaron
[@villesau]: https://github.com/villesau
[@vobujs]: https://github.com/vobujs

Thanks to all our contributors, sponsors and backers!  Keep on the lookout for a public roadmap and new contribution guide coming soon.

# 3.1.2 / 2016-10-10

## :bug: Bug Fix

- [#2528]: Recovery gracefully if an `Error`'s `stack` property isn't writable ([@boneskull])

[#2528]: https://github.com/mochajs/mocha/issues/2528

# 3.1.1 / 2016-10-09

## :bug: Bug Fix

- [#1417]: Don't report `done()` was called multiple times when it wasn't ([@frankleonrose])

## :nut_and_bolt: Other

- [#2490]: Lint with [semistandard](https://npmjs.com/package/semistandard) config ([@makepanic])
- [#2525]: Lint all `.js` files ([@boneskull])
- [#2524]: Provide workaround for developers unable to run browser tests on macOS Sierra ([@boneskull])

[#1417]: https://github.com/mochajs/mocha/issues/1417
[#2490]: https://github.com/mochajs/mocha/issues/2490
[#2525]: https://github.com/mochajs/mocha/issues/2525
[#2524]: https://github.com/mochajs/mocha/issues/2524
[@makepanic]: https://github.com/makepanic
[@frankleonrose]: https://github.com/frankleonrose

# 3.1.0 / 2016-09-27

## :tada: Enhancement

- [#2357]: Support `--inspect` on command-line ([@simov])
- [#2194]: Human-friendly error if no files are matched on command-line ([@Munter])
- [#1744]: Human-friendly error if a Suite has no callback (BDD/TDD only) ([@anton])

## :bug: Bug Fix

- [#2488]: Fix case in which *variables beginning with lowercase "D"* may not have been reported properly as global leaks ([@JustATrick]) :laughing:
- [#2465]: Always halt execution in async function when `this.skip()` is called ([@boneskull])
- [#2445]: Exits with expected code 130 when `SIGINT` encountered; exit code can no longer rollover at 256 ([@Munter])
- [#2315]: Fix uncaught TypeError thrown from callback stack ([@1999])
- Fix broken `only()`/`skip()` in IE7/IE8 ([@boneskull])
- [#2502]: Fix broken stack trace filter on Node.js under Windows ([@boneskull])
- [#2496]: Fix diff output for objects instantiated with `String` constructor ([more](https://youtrack.jetbrains.com/issue/WEB-23383)) ([@boneskull])

[#2496]: https://github.com/mochajs/mocha/issues/2496
[#2502]: https://github.com/mochajs/mocha/issues/2502
[#2315]: https://github.com/mochajs/mocha/issues/2315
[#2445]: https://github.com/mochajs/mocha/pull/2445
[#2465]: https://github.com/mochajs/mocha/issues/2465
[#2488]: https://github.com/mochajs/mocha/issues/2488
[#1744]: https://github.com/mochajs/mocha/issues/1744
[#2194]: https://github.com/mochajs/mocha/issues/2194
[#2357]: https://github.com/mochajs/mocha/issues/2357
[@1999]: https://github.com/1999
[@JustATrick]: https://github.com/JustATrick
[@anton]: https://github.com/anton
[@simov]: https://github.com/simov

# 3.0.2 / 2016-08-08

## :bug: Bug Fix

- [#2424]: Fix error loading Mocha via Require.js ([@boneskull])
- [#2417]: Fix execution of *deeply* nested `describe.only()` suites ([@not-an-aardvark])
- Remove references to `json-cov` and `html-cov` reporters in CLI ([@boneskull])

[#2417]: https://github.com/mochajs/mocha/issues/2417
[#2424]: https://github.com/mochajs/mocha/issues/2424

# 3.0.1 / 2016-08-03

## :bug: Bug Fix

- [#2406]: Restore execution of nested `describe.only()` suites ([@not-an-aardvark])

[#2406]: https://github.com/mochajs/mocha/issues/2406
[@not-an-aardvark]: https://github.com/not-an-aardvark

# 3.0.0 / 2016-07-31

## :boom: Breaking Changes

- :warning: Due to the increasing difficulty of applying security patches made within its dependency tree, as well as looming incompatibilities with Node.js v7.0, **Mocha no longer supports Node.js v0.8**.
- :warning: **Mocha may no longer be installed by versions of `npm` less than `1.4.0`.**  Previously, this requirement only affected Mocha's development dependencies.  In short, this allows Mocha to depend on packages which have dependencies fixed to major versions (`^`).
- `.only()` is no longer "fuzzy", can be used multiple times, and generally just works like you think it should. :joy:
- To avoid common bugs, when a test injects a callback function (suggesting asynchronous execution), calls it, *and* returns a `Promise`, Mocha will now throw an exception:

  ```js
  const assert = require('assert');

  it('should complete this test', function (done) {
    return new Promise(function (resolve) {
      assert.ok(true);
      resolve();
    })
      .then(done);
  });
  ```

  The above test will fail with `Error: Resolution method is overspecified. Specify a callback *or* return a Promise; not both.`.
- When a test timeout value *greater than* `2147483648` is specified in any context (`--timeout`, `mocha.setup()`, per-suite, per-test, etc.), the timeout will be *disabled* and the test(s) will be allowed to run indefinitely.  This is equivalent to specifying a timeout value of `0`.  See [MDN](https://developer.mozilla.org/docs/Web/API/WindowTimers/setTimeout#Maximum_delay_value) for reasoning.
- The `dot` reporter now uses more visually distinctive characters when indicating "pending" and "failed" tests.
- Mocha no longer supports [component](https://www.npmjs.com/package/component).
- The long-forsaken `HTMLCov` and `JSONCov` reporters--and any relationship to the "node-jscoverage" project--have been removed.
- `spec` reporter now omits leading carriage returns (`\r`) in non-TTY environment.

## :tada: Enhancements

- [#808]: Allow regular-expression-like strings in `--grep` and browser's `grep` querystring; enables flags such as `i` for case-insensitive matches and `u` for unicode. ([@a8m])
- [#2000]: Use distinctive characters in `dot` reporter; `,` will denote a "pending" test and `!` will denote a "failing" test. ([@elliottcable])
- [#1632]: Throw a useful exception when a suite or test lacks a title. ([@a8m])
- [#1481]: Better `.only()` behavior. ([@a8m])
- [#2334]: Allow `this.skip()` in async tests and hooks. ([@boneskull])
- [#1320]: Throw a useful exception when test resolution method is overspecified. ([@jugglinmike])
- [#2364]: Support `--preserve-symlinks`. ([@rosswarren])

## :bug: Bug Fixes

- [#2259]: Restore ES3 compatibility.  Specifically, support an environment lacking `Date.prototype.toISOString()`, `JSON`, or has a non-standard implementation of `JSON`. ([@ndhoule], [@boneskull])
- [#2286]: Fix `after()` failing to execute if test skipped using `this.skip()` in `beforeEach()`; no longer marks the entire suite as "pending". ([@dasilvacontin], [@boneskull])
- [#2208]: Fix function name display in `markdown` and `html` (browser) reporters. ([@ScottFreeCode])
- [#2299]: Fix progress bar in `html` (browser) reporter. ([@AviVahl])
- [#2307]: Fix `doc` reporter crashing when test fails. ([@jleyba])
- [#2323]: Ensure browser entry point (`browser-entry.js`) is published to npm (for use with bundlers).  ([@boneskull])
- [#2310]: Ensure custom reporter with an absolute path works in Windows. ([@silentcloud])
- [#2311]: Fix problem wherein calling `this.slow()` without a value would blast any previously set value. ([@boneskull])
- [#1813]: Ensure Mocha's own test suite will run in Windows. ([@tswaters], [@TimothyGu], [@boneskull])
- [#2317]: Ensure all interfaces are displayed in `--help` on CLI.  ([@ScottFreeCode])
- [#1644]: Don't exhibit undefined behavior when calling `this.timeout()` with very large values ([@callumacrae], [@boneskull])
- [#2361]: Don't truncate name of thrown anonymous exception. ([@boneskull])
- [#2367]: Fix invalid CSS. ([@bensontrent])
- [#2401]: Remove carriage return before each test line in spec reporter. ([@Munter])

## :nut_and_bolt: Other

- Upgrade production dependencies to address security advisories (and because now we can): `glob`, `commander`, `escape-string-regexp`, and `supports-color`. ([@boneskull], [@RobLoach])
- Add Windows to CI. ([@boneskull], [@TimothyGu])
- Ensure appropriate `engines` field in `package.json`. ([@shinnn], [@boneskull])
- [#2348]: Upgrade ESLint to v2 ([@anthony-redfox])

We :heart: our [backers and sponsors](https://opencollective.com/mochajs)!

:shipit:

[#2401]: https://github.com/mochajs/mocha/pull/2401
[#2348]: https://github.com/mochajs/mocha/issues/2348
[#808]: https://github.com/mochajs/mocha/issues/808
[#2361]: https://github.com/mochajs/mocha/pull/2361
[#2367]: https://github.com/mochajs/mocha/pull/2367
[#2364]: https://github.com/mochajs/mocha/pull/2364
[#1320]: https://github.com/mochajs/mocha/pull/1320
[#2307]: https://github.com/mochajs/mocha/pull/2307
[#2259]: https://github.com/mochajs/mocha/pull/2259
[#2208]: https://github.com/mochajs/mocha/pull/2208
[#2299]: https://github.com/mochajs/mocha/pull/2299
[#2286]: https://github.com/mochajs/mocha/issues/2286
[#1644]: https://github.com/mochajs/mocha/issues/1644
[#2310]: https://github.com/mochajs/mocha/issues/2310
[#2311]: https://github.com/mochajs/mocha/issues/2311
[#2323]: https://github.com/mochajs/mocha/issues/2323
[#2000]: https://github.com/mochajs/mocha/pull/2000
[#1632]: https://github.com/mochajs/mocha/issues/1632
[#1813]: https://github.com/mochajs/mocha/issues/1813
[#2334]: https://github.com/mochajs/mocha/issues/2334
[#2317]: https://github.com/mochajs/mocha/issues/2317
[#1481]: https://github.com/mochajs/mocha/issues/1481
[@elliottcable]: https://github.com/elliottcable
[@RobLoach]: https://github.com/robloach
[@AviVahl]: https://github.com/avivahl
[@silentcloud]: https://github.com/silentcloud
[@tswaters]: https://github.com/tswaters
[@jleyba]: https://github.com/jleyba
[@TimothyGu]: https://github.com/timothygu
[@callumacrae]: https://github.com/callumacrae
[@shinnn]: https://github.com/shinnn
[@bensontrent]: https://github.com/bensontrent
[@jugglinmike]: https://github.com/jugglinmike
[@rosswarren]: https://github.com/rosswarren
[@anthony-redfox]: https://github.com/anthony-redfox
[@Munter]: https://github.com/munter

# 2.5.3 / 2016-05-25

- [#2112] - Fix HTML reporter regression causing duplicate error output ([@danielstjules] via 6d24063)
- [#2119] - Make HTML reporter failure/passed links preventDefault to avoid SPA's hash navigation ([@jimenglish81] via 9e93efc)

[@danielstjules]: https://github.com/danielstjules
[@jimenglish81]: https://github.com/jimenglish81
[#2112]: https://github.com/mochajs/mocha/pull/2112
[#2119]: https://github.com/mochajs/mocha/pull/2119

# 2.5.2 / 2016-05-24

- [#2178] - Avoid double and triple xUnit XML escaping ([@graingert] via 49b5ff1)

[@graingert]: https://github.com/graingert
[#2178]: https://github.com/mochajs/mocha/pull/2178

# 2.5.1 / 2016-05-23

- Fix [to-iso-string](https://npmjs.com/package/to-iso-string) dependency ([@boneskull] via bd9450b)

Thanks @entertainyou, @SimenB, @just-paja for the heads-up.

# 2.5.0 / 2016-05-23

This has been awhile coming!  We needed to feel confident that the next release wouldn't break browser compatibility (e.g. the last few patch releases).

## Browser Tests in CI

We now run unit tests against PhantomJS v1.x and an assortment of browsers on [SauceLabs](https://saucelabs.com), including:

- Internet Explorer v8.0
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)

To accomplish this, we now run Mocha's unit tests (and a handful of integration tests) via [Karma](https://npmjs.com/package/karma) and a modified [karma-mocha](https://npmjs.com/package/karma-mocha).  Along the way, we had to solve issue [#880] (apologies to @mderijcke and @sukima who had PRs addressing this), as well as replace most usages of [should](https://npmjs.com/package/should) with [expect.js](https://npmjs.com/package/expect.js) for IE8.

Going forward, when sending PRs, your code will *only* run against PhantomJS v1.x (and not hit SauceLabs) [because security](https://docs.travis-ci.com/user/pull-requests/#Security-Restrictions-when-testing-Pull-Requests).

## Node.js 6.x

 Node.js 6.x "just worked" before, but now it's in the CI matrix, so it's "officially" supported.  Mocha *still retains support* for Node.js 0.8.x.

## "Minor" Release

You'll see mostly bug fixes below, but also a couple features--as such, it's a "minor" release.

## TYVM

Thanks to everyone who contributed, and our fabulous [sponsors and backers](https://opencollective.com/mochajs)!

- [#2079] - Add browser checks to CI; update [browserify](https://npmjs.com/package/browserify) to v13.0.0 ([@dasilvacontin], [@ScottFreeCode], [@boneskull] via c04c1d7, 0b1e9b3, 0dde0fa, f8a3d86, 9e8cbaa)
- [#880] - Make Mocha browserifyable ([@boneskull] via 524862b)
- [#2121] - Update [glob](https://npmjs.com/package/glob) to v3.2.11 ([@astorije] via 7920fc4)
- [#2126] - Fix dupe error messages in stack trace filter ([@Turbo87] via 4301caa)
- [#2109] - Fix certain diffs when objects cannot be coerced into primitives ([@joshlory] via 61fbb7f)
- [#1827] - Fix TWBS/`mocha.css` collisions ([@irnc] via 0543798)
- [#1760], [#1936] - Fix `this.skip()` in HTML reporter ([@mislav] via cb4248b)
- [#2115] - Fix exceptions thrown from hooks in HTML reporter ([@danielstjules] via e290bc0)
- [#2089] - Handle Symbol values in `util.stringify()` ([@ryym] via ea61d05)
- [#2097] - Fix diff for objects overriding `Object.prototype.hasOwnProperty` ([@mantoni] via b20fdfe)
- [#2101] - Properly handle non-string "messages" thrown from assertion libraries ([@jkimbo] via 9c41051)
- [#2124] - Update [growl](https://npmjs.com/package/growl) ([@benjamine] via 9ae6a85)
- [#2162], [#2205] - JSDoc fixes ([@OlegTsyba] via 8031f20, [@ScottFreeCode] via f83b1d9)
- [#2132] - Remove Growl-related cruft ([@julienw] via 00d6469)
- [#2172] - Add [OpenCollective](https://opencollective.com) badge, sponsors & backers ([@xdamman], [@boneskull] via caee94f)
- [#1841] - Add new logo, banner assets ([@dasilvacontin] via 00fd0e1)
- [#2214] - Update `README.md` header ([@dasilvacontin] via c0f9be2)
- [#2236] - Better checks for Node.js v0.8 compatibility in CI ([@dasilvacontin] via ba5637d)
- [#2239] - Add Node.js v6.x to CI matrix ([@boneskull] via 3904da4)

[#880]: https://github.com/mochajs/mocha/issues/880
[#1841]: https://github.com/mochajs/mocha/pull/1841
[#2239]: https://github.com/mochajs/mocha/issues/2239
[#2153]: https://github.com/mochajs/mocha/pull/2153
[#2214]: https://github.com/mochajs/mocha/pull/2214
[#2236]: https://github.com/mochajs/mocha/pull/2236
[#2079]: https://github.com/mochajs/mocha/issues/2079
[#2231]: https://github.com/mochajs/mocha/pull/2231
[#2089]: https://github.com/mochajs/mocha/issues/2089
[#2097]: https://github.com/mochajs/mocha/pull/2097
[#1760]: https://github.com/mochajs/mocha/issues/1760
[#1936]: https://github.com/mochajs/mocha/issues/1936
[#2115]: https://github.com/mochajs/mocha/pull/2115
[#1827]: https://github.com/mochajs/mocha/pull/1827
[#2101]: https://github.com/mochajs/mocha/pull/2101
[#2124]: https://github.com/mochajs/mocha/pull/2124
[#2109]: https://github.com/mochajs/mocha/issues/2109
[#2162]: https://github.com/mochajs/mocha/pull/2162
[#2132]: https://github.com/mochajs/mocha/issues/2132
[#2126]: https://github.com/mochajs/mocha/issues/2126
[#2121]: https://github.com/mochajs/mocha/issues/2121
[#2205]: https://github.com/mochajs/mocha/pull/2205
[#2172]: https://github.com/mochajs/mocha/pull/2172
[@xdamman]: https://github.com/xdamman
[@Turbo87]: https://github.com/Turbo87
[@OlegTsyba]: https://github.com/OlegTsyba
[@ryym]: https://github.com/ryym
[@mantoni]: https://github.com/mantoni
[@mislav]: https://github.com/mislav
[@irnc]: https://github.com/irnc
[@jkimbo]: https://github.com/jkimbo
[@benjamine]: https://github.com/benjamine
[@joshlory]: https://github.com/joshlory
[@julienw]: https://github.com/julienw
[@ScottFreeCode]: https://github.com/ScottFreeCode
[@astorije]: https://github.com/astorije
[@dasilvacontin]: https://github.com/dasilvacontin

# 2.4.5 / 2016-01-28

- [#2080], [#2078], [#2072], [#2073], [#1200] - Revert changes to console colors in changeset [1192914](https://github.com/mochajs/mocha/commit/119291449cd03a11cdeda9e37cf718a69a012896) and subsequent related changes thereafter.  Restores compatibility with IE8 & PhantomJS.  See also [mantoni/mochify.js#129](https://github.com/mantoni/mochify.js/issues/129) and [openlayers/ol3#4746](https://github.com/openlayers/ol3/pull/4746) ([@boneskull])
- [#2082] - Fix several test assertions ([@mislav])

[#1200]: https://github.com/mochajs/mocha/issues/1200
[#2082]: https://github.com/mochajs/mocha/pull/2082

# 2.4.4 / 2016-01-27

- [#2080] - Fix broken RequireJS compatibility ([@boneskull])

[#2080]: https://github.com/mochajs/mocha/issues/2080

# 2.4.3 / 2016-01-27

- [#2078] - Fix broken IE8 ([@boneskull])

[#2078]: https://github.com/mochajs/mocha/issues/2078

# 2.4.2 / 2016-01-26

- [#2053] - Fix web worker compatibility ([@mislav])
- [#2072] - Fix Windows color output ([@thedark1337])
- [#2073] - Fix colors in `progress` and `landing` reporters ([@gyandeeps])

[#2053]: https://github.com/mochajs/mocha/pull/2053
[#2072]: https://github.com/mochajs/mocha/pull/2072
[#2073]: https://github.com/mochajs/mocha/pull/2073
[@gyandeeps]: https://github.com/gyandeeps
[@thedark1337]: https://github.com/thedark1337

# 2.4.1 / 2016-01-26

- [#2067] - Fix HTML/doc reporter regressions ([@danielstjules])

[#2067]: https://github.com/mochajs/mocha/pull/2067

# 2.4.0 / 2016-01-25

- [#1945] - Correctly skip tests when skipping in suite's before() ([@ryanshawty])
- [#2056] - chore(license): update license year to 2016 ([@pra85])
- [#2048] - Fix `this.skip` from spec with HTML reporter ([@mislav])
- [#2033] - Update tests for newer versions of should.js ([@tomhughes])
- [#2037] - Fix for memory leak caused by referenced to deferred test ([@bd82])
- [#2038] - Also run Travis-CI on node.js 4 & 5 ([@bd82])
- [#2028] - Remove reference to test before afterAll hook runs ([@stonelgh])
- Bump mkdirp to 0.5.1 to support strict mode ([@danielstjules])
- [#1977] - safely stringify PhantomJS undefined value ([@ahamid])
- Add the ability to retry tests ([@@longlho])
- [#1982] - Enable --log-timer-events option [@Alaneor]
- Fix #1980: Load mocha.opts from bin/mocha and bin/_mocha ([@danielstjules])
- [#1976] - Simplify function call ([@iclanzan])
- [#1963] - Add support --perf-basic-prof ([@robraux])
- [#1981] - Fix HTML reporter handling of done and exceptions ([@Standard8])
- [#1993] - propagate "file" property for "exports" interface ([@segrey])
- [#1999] - Add support for strict mode ([@tmont])
- [#2005] - XUnit Reporter Writes to stdout, falls back to console.log ([@jonnyreeves])
- [#2021] - Fix non ES5 compliant regexp ([@zetaben])
- [#1965] - Don't double install BDD UI ([@cowboyd])
- [#1995] - Make sure the xunit output dir exists before writing to it ([@ianwremmel])
- Use chalk for the base reporter colors; closes #1200 ([@boneskull])
- Fix requiring custom interfaces ([@jgkim])
- [#1967] Silence Bluebird js warnings ([@krisr])

[#1945]: https://github.com/mochajs/mocha/pull/1945
[#2056]: https://github.com/mochajs/mocha/pull/2056
[#2048]: https://github.com/mochajs/mocha/pull/2048
[#2033]: https://github.com/mochajs/mocha/pull/2033
[#2037]: https://github.com/mochajs/mocha/pull/2037
[#2038]: https://github.com/mochajs/mocha/pull/2038
[#2028]: https://github.com/mochajs/mocha/pull/2028
[#1977]: https://github.com/mochajs/mocha/pull/1977
[#1982]: https://github.com/mochajs/mocha/pull/1982
[#1976]: https://github.com/mochajs/mocha/pull/1976
[#1963]: https://github.com/mochajs/mocha/pull/1963
[#1981]: https://github.com/mochajs/mocha/pull/1981
[#1993]: https://github.com/mochajs/mocha/pull/1993
[#1999]: https://github.com/mochajs/mocha/pull/1999
[#2005]: https://github.com/mochajs/mocha/pull/2005
[#2021]: https://github.com/mochajs/mocha/pull/2021
[1965#]: https://github.com/mochajs/mocha/pull/1965
[#1995]: https://github.com/mochajs/mocha/pull/1995
[#1967]: https://github.com/mochajs/mocha/pull/1967
[@ryanshawty]: https://github.com/ryanshawty
[@pra85]: https://github.com/pra85
[@mislav]: https://github.com/mislav
[@tomhughes]: https://github.com/tomhughes
[@bd82]: https://github.com/bd82
[@stonelgh]: https://github.com/stonelgh
[@danielstjules]: https://github.com/danielstjules
[@ahamid]: https://github.com/ahamid
[@longlho]: https://github.com/longlho
[@Alaneor]: https://github.com/Alaneor
[@iclanzan]: https://github.com/iclanzan
[@robraux]: https://github.com/robraux
[@Standard8]: https://github.com/Standard8
[@segrey]: https://github.com/segrey
[@tmont]: https://github.com/tmont
[@jonnyreeves]: https://github.com/jonnyreeves
[@zetaben]: https://github.com/zetaben
[@cowboyd]: https://github.com/cowboyd
[@ianwremmel]: https://github.com/ianwremmel
[@boneskull]: https://github.com/boneskull
[@jgkim]: https://github.com/jgkim
[@krisr]: https://github.com/krisr

# 2.3.4 / 2015-11-15

- Update debug dependency to 2.2.0
- remove duplication of mocha.opts on process.argv
- Fix typo in test/reporters/nyan.js

# 2.3.3 / 2015-09-19

- [#1875] - Fix Markdown reporter exceeds maximum call stack size ([@danielstjules])
- [#1864] - Fix xunit missing output with --reporter-options output ([@danielstjules])
- [#1846] - Support all harmony flags ([@danielstjules])
- Fix fragile xunit reporter spec ([@danielstjules])
- [#1669] - Fix catch uncaught errors outside test suite execution ([@danielstjules])
- [#1868] - Revert jade to support npm < v1.3.7 ([@danielstjules])
- [#1766] - Don't remove modules/components from stack trace in the browser ([@danielstjules])
- [#1798] - Fix correctly attribute mutiple done err with hooks ([@danielstjules])
- Fix use utils.reduce for IE8 compatibility ([@wsw0108])
- Some linting errors fixed by [@danielstjules]
- Call the inspect() function if message is not set ([@kevinburke])

[#1875]: https://github.com/mochajs/mocha/issues/1875
[#1864]: https://github.com/mochajs/mocha/issues/1864
[#1846]: https://github.com/mochajs/mocha/issues/1846
[#1669]: https://github.com/mochajs/mocha/issues/1669
[#1868]: https://github.com/mochajs/mocha/issues/1868
[#1766]: https://github.com/mochajs/mocha/issues/1766
[#1798]: https://github.com/mochajs/mocha/issues/1798
[@danielstjules]: https://github.com/danielstjules
[@wsw0108]: https://github.com/wsw0108
[@kevinburke]: https://github.com/kevinburke

# 2.3.2 / 2015-09-07

- [#1868] - Fix compatibility with older versions of NPM ([@boneskull])

  [#1868]: https://github.com/mochajs/mocha/issues/1868

# 2.3.1 / 2015-09-06

- [#1812] - Fix: Bail flag causes before() hooks to be run even after a failure ([@aaroncrows])

  [#1812]: https://github.com/mochajs/mocha/issues/1812
  [aaroncrows]: https://github.com/aaroncrows

# 2.3.0 / 2015-08-30

- [#553] - added --allowUncaught option ([@amsul])
- [#1490] - Allow --async-only to be satisfied by returning a promise ([@jlai])
- [#1829] - support --max-old-space-size ([@gigadude])
- [#1811] - upgrade Jade dependency ([@outsideris])
- [#1769] - Fix async hook error handling ([@ajaykodali])
- [#1230] - More descriptive beforeEach/afterEach messages ([@duncanbeevers])
- [#1787] - Scope loading behaviour instead of using early return ([@aryeguy])
- [#1789] - Fix: html-runner crashing ([@sunesimonsen])
- [#1749] - Fix maximum call stack error on large amount of tests ([@tinganho])
- [#1230] - Decorate failed hook titles with test title ([@duncanbeevers])
- [#1260] - Build using Browserify ([@ndhoule])
- [#1728] - Don't use `__proto__` ([@ndhoule])
- [#1781] - Fix hook error tests ([@glenjamin])
- [#1754] - Allow boolean --reporter-options ([@papandreou])
- [#1766] - Fix overly aggressive stack suppression ([@moll])
- [#1752] - Avoid potential infinite loop ([@gsilk])
- [#1761] - Fix problems running under PhantomJS ([@chromakode])
- [#1700] - Fix more problems running under PhantomJS ([@jbnicolai])
- [#1774] - Support escaped spaces in CLI options ([@adamgruber])
- [#1687] - Fix HTML reporter links with special chars ([@benvinegar])
- [#1359] - Adopt code style and enforce it using ESLint ([@ndhoule] w/ assist from [@jbnicolai] & [@boneskull])
- various refactors ([@jbnicolai])
- [#1758] - Add cross-frame compatible Error checking ([@outdooricon])
- [#1741] - Remove moot `version` property from bower.json ([@kkirsche])
- [#1739] - Improve `HISTORY.md` ([@rstacruz])
- [#1730] - Support more io.js flags ([@ryedog])
- [#1349] - Allow HTML in HTML reporter errors ([@papandreou] / [@sunesimonsen])
- [#1572] - Prevent default browser behavior for failure/pass links ([@jschilli])
- [#1630] - Support underscored harmony flags ([@dominicbarnes])
- [#1718] - Support more harmony flags ([@slyg])
- [#1689] - Add stack to JSON-stream reporter ([@jonathandelgado])
- [#1654] - Fix `ReferenceError` "location is not defined" ([@jakemmarsh])

  [#553]: https://github.com/mochajs/mocha/issues/553
  [#1490]: https://github.com/mochajs/mocha/issues/1490
  [#1829]: https://github.com/mochajs/mocha/issues/1829
  [#1811]: https://github.com/mochajs/mocha/issues/1811
  [#1769]: https://github.com/mochajs/mocha/issues/1769
  [#1230]: https://github.com/mochajs/mocha/issues/1230
  [#1787]: https://github.com/mochajs/mocha/issues/1787
  [#1789]: https://github.com/mochajs/mocha/issues/1789
  [#1749]: https://github.com/mochajs/mocha/issues/1749
  [#1230]: https://github.com/mochajs/mocha/issues/1230
  [#1260]: https://github.com/mochajs/mocha/issues/1260
  [#1728]: https://github.com/mochajs/mocha/issues/1728
  [#1781]: https://github.com/mochajs/mocha/issues/1781
  [#1754]: https://github.com/mochajs/mocha/issues/1754
  [#1766]: https://github.com/mochajs/mocha/issues/1766
  [#1752]: https://github.com/mochajs/mocha/issues/1752
  [#1761]: https://github.com/mochajs/mocha/issues/1761
  [#1700]: https://github.com/mochajs/mocha/issues/1700
  [#1774]: https://github.com/mochajs/mocha/issues/1774
  [#1687]: https://github.com/mochajs/mocha/issues/1687
  [#1359]: https://github.com/mochajs/mocha/issues/1359
  [#1758]: https://github.com/mochajs/mocha/issues/1758
  [#1741]: https://github.com/mochajs/mocha/issues/1741
  [#1739]: https://github.com/mochajs/mocha/issues/1739
  [#1730]: https://github.com/mochajs/mocha/issues/1730
  [#1349]: https://github.com/mochajs/mocha/issues/1349
  [#1572]: https://github.com/mochajs/mocha/issues/1572
  [#1630]: https://github.com/mochajs/mocha/issues/1630
  [#1718]: https://github.com/mochajs/mocha/issues/1718
  [#1689]: https://github.com/mochajs/mocha/issues/1689
  [#1654]: https://github.com/mochajs/mocha/issues/1654
  [@adamgruber]: https://github.com/adamgruber
  [@ajaykodali]: https://github.com/ajaykodali
  [@amsul]: https://github.com/amsul
  [@aryeguy]: https://github.com/aryeguy
  [@benvinegar]: https://github.com/benvinegar
  [@boneskull]: https://github.com/boneskull
  [@chromakode]: https://github.com/chromakode
  [@dominicbarnes]: https://github.com/dominicbarnes
  [@duncanbeevers]: https://github.com/duncanbeevers
  [@gigadude]: https://github.com/gigadude
  [@glenjamin]: https://github.com/glenjamin
  [@gsilk]: https://github.com/gsilk
  [@jakemmarsh]: https://github.com/jakemmarsh
  [@jbnicolai]: https://github.com/jbnicolai
  [@jlai]: https://github.com/jlai
  [@jonathandelgado]: https://github.com/jonathandelgado
  [@jschilli]: https://github.com/jschilli
  [@kkirsche]: https://github.com/kkirsche
  [@moll]: https://github.com/moll
  [@ndhoule]: https://github.com/ndhoule
  [@outdooricon]: https://github.com/outdooricon
  [@outsideris]: https://github.com/outsideris
  [@papandreou]: https://github.com/papandreou
  [@rstacruz]: https://github.com/rstacruz
  [@ryedog]: https://github.com/ryedog
  [@slyg]: https://github.com/slyg
  [@sunesimonsen]: https://github.com/sunesimonsen
  [@tinganho]: https://github.com/tinganho

# 2.2.5 / 2015-05-14

- [#1699] - Upgrade jsdiff to v1.4.0 ([@nylen])
- [#1648] - fix diff background colors in the console ([@nylen])
- [#1327] - fix tests running twice, a regression issue. ([#1686], [@danielstjules])
- [#1675] - add integration tests ([@danielstjules])
- [#1682] - use a valid SPDX license identifier in package.json ([@kemitchell])
- [#1660] - fix assertion of invalid dates ([#1661], [@a8m])
- [#1241] - fix issue with multiline diffs appearing as single line ([#1655], [@a8m])

[#1699]: https://github.com/mochajs/mocha/issues/1699
[#1648]: https://github.com/mochajs/mocha/issues/1648
[#1327]: https://github.com/mochajs/mocha/issues/1327
[#1686]: https://github.com/mochajs/mocha/issues/1686
[#1675]: https://github.com/mochajs/mocha/issues/1675
[#1682]: https://github.com/mochajs/mocha/issues/1682
[#1660]: https://github.com/mochajs/mocha/issues/1660
[#1661]: https://github.com/mochajs/mocha/issues/1661
[#1241]: https://github.com/mochajs/mocha/issues/1241
[#1655]: https://github.com/mochajs/mocha/issues/1655
[@nylen]: https://github.com/nylen
[@danielstjules]: https://github.com/danielstjules
[@kemitchell]: https://github.com/kemitchell
[@a8m]: https://github.com/a8m

# 2.2.4 / 2015-04-08

- Load mocha.opts in _mocha for now (close #1645)

# 2.2.3 / 2015-04-07

- fix(reporter/base): string diff - issue #1241
- fix(reporter/base): string diff - issue #1241
- fix(reporter/base): don't show diffs for errors without expectation
- fix(reporter/base): don't assume error message is first line of stack
- improve: dry up reporter/base test
- fix(reporter/base): explicitly ignore showDiff #1614
- Add iojs to travis build
- Pass `--allow-natives-syntax` flag to node.
- Support --harmony_classes flag for io.js
- Fix 1556: Update utils.clean to handle newlines in func declarations
- Fix 1606: fix err handling in IE <= 8 and non-ES5 browsers
- Fix 1585: make _mocha executable again
- chore(package.json): add a8m as a contributor
- Fixed broken link on html-cov reporter
- support --es_staging flag
- fix issue where menu overlaps content.
- update contributors in package.json
- Remove trailing whitespace from reporter output
- Remove contributors list from readme
- log third-party reporter errors
- [Fix] Exclude not own properties when looping on options
- fix: support node args in mocha.opts (close #1573)
- fix(reporter/base): string diff - issue #1241

# 2.2.1 / 2015-03-09

- Fix passing of args intended for node/iojs.

# 2.2.0 / 2015-03-06

- Update mocha.js
- Add --fgrep. Use grep for RegExp, fgrep for str
- Ignore async global errors after spec resolution
- Fixing errors that prevent mocha.js from loading in the browser - fixes #1558
- fix(utils): issue #1558 + make
- add ability to delay root suite; closes #362, closes #1124
- fix insanity in http tests
- update travis: add node 0.12, add gitter, remove slack
- building
- resolve #1548: ensure the environment's "node" executable is used
- reporters/base: use supports-color to detect colorable term
- travis: use docker containers
- small fix: commander option for --expose-gc
- Ignore asynchronous errors after global failure
- Improve error output when a test fails with a non-error
- updated travis badge, uses svg instead of img
- Allow skip from test context for #332
- [JSHINT] Unnecessary semicolon fixed in bin/_mocha
- Added a reminder about the done() callback to test timeout error messages
- fixes #1496, in Mocha.run(fn), check if fn exists before executing it, added tests too
- Add Harmony Proxy flag for iojs
- test(utils|ms|*): test existing units
- add support for some iojs flags
- fix(utils.stringify): issue #1229, diff viewer
- Remove slack link
- Prevent multiple 'grep=' querystring params in html reporter
- Use grep as regexp (close #1381)
- utils.stringify should handle objects without an Object prototype
- in runnable test, comparing to undefined error's message rather than a literal
- Fix test running output truncation on async STDIO
- amended for deprecated customFds option in child_process

# 2.1.0 / 2014-12-23

- showDiff: don’t stringify strings
- Clean up unused module dependencies.
- Filter zero-length strings from mocha.opts
- only write to stdout in reporters
- Revert "only write to stdout in reporters"
- Print colored output only to a tty
- update summary in README.md
- rename Readme.md/History.md to README.md/HISTORY.md because neurotic
- add .mailmap to fix "git shortlog" or "git summary" output
- fixes #1461: nyan-reporter now respects Base.useColors, fixed bug where Base.color would not return a string when str wasn't a string.
- Use existing test URL builder in failed replay links
- modify .travis.yml: use travis_retry; closes #1449
- fix -t 0 behavior; closes #1446
- fix tests (whoops)
- improve diff behavior
- Preserve pathname when linking to individual tests
- Fix test
- Tiny typo in comments fixed
- after hooks now being called on failed tests when using bail, fixes #1093
- fix throwing undefined/null now makes tests fail, fixes #1395
- compiler extensions are added as watched extensions, removed non-standard extensions from watch regex, resolves #1221
- prefix/namespace for suite titles in markdown reporter, fixes #554
- fix more bad markdown in CONTRIBUTING.md
- fix bad markdown in CONTRIBUTING.md
- add setImmediate/clearImmediate to globals; closes #1435
- Fix buffer diffs (closes #1132, closes #1433)
- add a CONTRIBUTING.md.  closes #882
- fix intermittent build failures (maybe). closes #1407
- add Slack notification to .travis.yml
- Fix slack link
- Add slack room to readme
- Update maintainers
- update maintainers and contributors
- resolves #1393: kill children with more effort on SIGINT
- xunit reporter support for optionally writing to a file
- if a reporter has a .done method, call it before exiting
- add support for reporter options
- only write to stdout in reporters

# 2.0.0 / 2014-10-21

- remove: support for node 0.6.x, 0.4.x
- fix: landing reporter with non ansi characters (#211)
- fix: html reporter - preserve query params when navigating to suites/tests (#1358)
- fix: json stream reporter add error message to failed test
- fix: fixes for visionmedia -> mochajs
- fix: use stdio, fixes node deprecation warnings (#1391)

# 1.21.5 / 2014-10-11

- fix: build for NodeJS v0.6.x
- fix: do not attempt to highlight syntax when non-HTML reporter is used
- update: escape-string-regexp to 1.0.2.
- fix: botched indentation in canonicalize()
- fix: .gitignore: ignore .patch and .diff files
- fix: changed 'Catched' to 'Caught' in uncaught exception error handler messages
- add: `pending` field for json reporter
- fix: Runner.prototype.uncaught: don't double-end runnables that already have a state.
- fix: --recursive, broken by f0facd2e
- update: replaces escapeRegexp with the escape-string-regexp package.
- update: commander to 2.3.0.
- update: diff to 1.0.8.
- fix: ability to disable syntax highlighting (#1329)
- fix: added empty object to errorJSON() call to catch when no error is present
- fix: never time out after calling enableTimeouts(false)
- fix: timeout(0) will work at suite level (#1300)
- Fix for --watch+only() issue (#888 )
- fix: respect err.showDiff, add Base reporter test (#810)

# 1.22.1-3 / 2014-07-27

- fix: disabling timeouts with this.timeout(0) (#1301)

# 1.22.1-3 / 2014-07-27

- fix: local uis and reporters (#1288)
- fix: building 1.21.0's changes in the browser (#1284)

# 1.21.0 / 2014-07-23

- add: --no-timeouts option (#1262, #1268)
- add: --*- deprecation node flags (#1217)
- add: --watch-extensions argument (#1247)
- change: spec reporter is default (#1228)
- fix: diff output showing incorrect +/- (#1182)
- fix: diffs of circular structures (#1179)
- fix: re-render the progress bar when progress has changed only (#1151)
- fix support for environments with global and window (#1159)
- fix: reverting to previously defined onerror handler (#1178)
- fix: stringify non error objects passed to done() (#1270)
- fix: using local ui, reporters (#1267)
- fix: cleaning es6 arrows (#1176)
- fix: don't include attrs in failure tag for xunit (#1244)
- fix: fail tests that return a promise if promise is rejected w/o a reason (#1224)
- fix: showing failed tests in doc reporter (#1117)
- fix: dot reporter dots being off (#1204)
- fix: catch empty throws (#1219)
- fix: honoring timeout for sync operations (#1242)
- update: growl to 1.8.0

# 1.20.1 / 2014-06-03

- update: should dev dependency to ~4.0.0 (#1231)

# 1.20.0 / 2014-05-28

- add: filenames to suite objects (#1222)

# 1.19.0 / 2014-05-17

- add: browser script option to package.json
- add: export file in Mocha.Test objects (#1174)
- add: add docs for wrapped node flags
- fix: mocha.run() to return error status in browser (#1216)
- fix: clean() to show failure details (#1205)
- fix: regex that generates html for new keyword (#1201)
- fix: sibling suites have inherited but separate contexts (#1164)

# 1.18.2 / 2014-03-18

- fix: html runner was prevented from using #mocha as the default root el (#1162)

# 1.18.1 / 2014-03-18

- fix: named before/after hooks in bdd, tdd, qunit interfaces (#1161)

# 1.18.0 / 2014-03-13

- add: promise support (#329)
- add: named before/after hooks (#966)

# 1.17.1 / 2014-01-22

- fix: expected messages in should.js (should.js#168)
- fix: expect errno global in node versions < v0.9.11 (#1111)
- fix: unreliable checkGlobals optimization (#1110)

# 1.17.0 / 2014-01-09

- add: able to require globals (describe, it, etc.) through mocha (#1077)
- fix: abort previous run on --watch change (#1100)
- fix: reset context for each --watch triggered run (#1099)
- fix: error when cli can't resolve path or pattern (#799)
- fix: canonicalize objects before stringifying and diffing them (#1079)
- fix: make CR call behave like carriage return for non tty (#1087)

# 1.16.2 / 2013-12-23

- fix: couple issues with ie 8 (#1082, #1081)
- fix: issue running the xunit reporter in browsers (#1068)
- fix: issue with firefox < 3.5 (#725)

# 1.16.1 / 2013-12-19

- fix: recompiled for missed changes from the last release

# 1.16.0 / 2013-12-19

- add: Runnable.globals(arr) for per test global whitelist (#1046)
- add: mocha.throwError(err) for assertion libs to call (#985)
- remove: --watch's spinner (#806)
- fix: duplicate test output for multi-line specs in spec reporter (#1006)
- fix: gracefully exit on SIGINT (#1063)
- fix expose the specified ui only in the browser (#984)
- fix: ensure process exit code is preserved when using --no-exit (#1059)
- fix: return true from window.onerror handler (#868)
- fix: xunit reporter to use process.stdout.write (#1068)
- fix: utils.clean(str) indentation (#761)
- fix: xunit reporter returning test duration a NaN (#1039)

# 1.15.1 / 2013-12-03

- fix: recompiled for missed changes from the last release

# 1.15.0 / 2013-12-02

- add: `--no-exit` to prevent `process.exit()` (#1018)
- fix: using inline diffs (#1044)
- fix: show pending test details in xunit reporter (#1051)
- fix: faster global leak detection (#1024)
- fix: yui compression (#1035)
- fix: wrapping long lines in test results (#1030, #1031)
- fix: handle errors in hooks (#1043)

# 1.14.0 / 2013-11-02

- add: unified diff (#862)
- add: set MOCHA_COLORS env var to use colors (#965)
- add: able to override tests links in html reporters (#776)
- remove: teamcity reporter (#954)
- update: commander dependency to 2.0.0 (#1010)
- fix: mocha --ui will try to require the ui if not built in, as --reporter does (#1022)
- fix: send cursor commands only if isatty (#184, #1003)
- fix: include assertion message in base reporter (#993, #991)
- fix: consistent return of it, it.only, and describe, describe.only (#840)

# 1.13.0 / 2013-09-15

- add: sort test files with --sort (#813)
- update: diff dependency to 1.0.7
- update: glob dependency to 3.2.3 (#927)
- fix: diffs show whitespace differences (#976)
- fix: improve global leaks (#783)
- fix: firefox window.getInterface leak
- fix: accessing iframe via window[iframeIndex] leak
- fix: faster global leak checking
- fix: reporter pending css selector (#970)

# 1.12.1 / 2013-08-29

- remove test.js from .gitignore
- update included version of ms.js

# 1.12.0 / 2013-07-01

- add: prevent diffs for differing types. Closes #900
- add `Mocha.process` hack for phantomjs
- fix: use compilers with requires
- fix regexps in diffs. Closes #890
- fix xunit NaN on failure. Closes #894
- fix: strip tab indentation in `clean` utility method
- fix: textmate bundle installation

# 1.11.0 / 2013-06-12

- add --prof support
- add --harmony support
- add --harmony-generators support
- add "Uncaught " prefix to uncaught exceptions
- add web workers support
- add `suite.skip()`
- change to output # of pending / passing even on failures. Closes #872
- fix: prevent hooks from being called if we are bailing
- fix `this.timeout(0)`

# 1.10.0 / 2013-05-21

- add add better globbing support for windows via `glob` module
- add support to pass through flags such as --debug-brk=1234. Closes #852
- add test.only, test.skip to qunit interface
- change to always use word-based diffs for now. Closes #733
- change `mocha init` tests.html to index.html
- fix `process` global leak in the browser
- fix: use resolve() instead of join() for --require
- fix: filterLeaks() condition to not consider indices in global object as leaks
- fix: restrict mocha.css styling to #mocha id
- fix: save timer references to avoid Sinon interfering in the browser build.

# 1.9.0 / 2013-04-03

- add improved setImmediate implementation
- replace --ignore-leaks with --check-leaks
- change default of ignoreLeaks to true. Closes #791
- remove scrolling for HTML reporter
- fix retina support
- fix tmbundle, restrict to js scope

# 1.8.2 / 2013-03-11

- add `setImmediate` support for 0.10.x
- fix mocha -w spinner on windows

# 1.8.1 / 2013-01-09

- fix .bail() arity check causing it to default to true

# 1.8.0 / 2013-01-08

- add Mocha() options bail support
- add `Mocha#bail()` method
- add instanceof check back for inheriting from Error
- add component.json
- add diff.js to browser build
- update growl
- fix TAP reporter failures comment :D

# 1.7.4 / 2012-12-06

- add total number of passes and failures to TAP
- remove .bind() calls. re #680
- fix indexOf. Closes #680

# 1.7.3 / 2012-11-30

- fix uncaught error support for the browser
- revert uncaught "fix" which breaks node

# 1.7.2 / 2012-11-28

- fix uncaught errors to expose the original error message

# 1.7.0 / 2012-11-07

- add `--async-only` support to prevent false positives for missing `done()`
- add sorting by filename in code coverage
- add HTML 5 doctype to browser template.
- add play button to html reporter to rerun a single test
- add `this.timeout(ms)` as Suite#timeout(ms). Closes #599
- update growl dependency to 1.6.x
- fix encoding of test-case ?grep. Closes #637
- fix unicode chars on windows
- fix dom globals in Opera/IE. Closes #243
- fix markdown reporter a tags
- fix `this.timeout("5s")` support

# 1.6.0 / 2012-10-02

- add object diffs when `err.showDiff` is present
- add hiding of empty suites when pass/failures are toggled
- add faster `.length` checks to `checkGlobals()` before performing the filter

# 1.5.0 / 2012-09-21

- add `ms()` to `.slow()` and `.timeout()`
- add `Mocha#checkLeaks()` to re-enable global leak checks
- add `this.slow()` option [aheckmann]
- add tab, CR, LF to error diffs for now
- add faster `.checkGlobals()` solution [guille]
- remove `fn.call()` from reduce util
- remove `fn.call()` from filter util
- fix forEach. Closes #582
- fix relaying of signals [TooTallNate]
- fix TAP reporter grep number

# 1.4.2 / 2012-09-01

- add support to multiple `Mocha#globals()` calls, and strings
- add `mocha.reporter()` constructor support [jfirebaugh]
- add `mocha.timeout()`
- move query-string parser to utils.js
- move highlight code to utils.js
- fix third-party reporter support [exogen]
- fix client-side API to match node-side [jfirebaugh]
- fix mocha in iframe [joliss]

# 1.4.1 / 2012-08-28

- add missing `Markdown` export
- fix `Mocha#grep()`, escape regexp strings
- fix reference error when `devicePixelRatio` is not defined. Closes #549

# 1.4.0 / 2012-08-22

- add mkdir -p to `mocha init`. Closes #539
- add `.only()`. Closes #524
- add `.skip()`. Closes #524
- change str.trim() to use utils.trim(). Closes #533
- fix HTML progress indicator retina display
- fix url-encoding of click-to-grep HTML functionality

# 1.3.2 / 2012-08-01

- fix exports double-execution regression. Closes #531

# 1.3.1 / 2012-08-01

- add passes/failures toggling to HTML reporter
- add pending state to `xit()` and `xdescribe()` [Brian Moore]
- add the @charset "UTF-8"; to fix #522 with FireFox. [Jonathan Creamer]
- add border-bottom to #stats links
- add check for runnable in `Runner#uncaught()`. Closes #494
- add 0.4 and 0.6 back to travis.yml
- add `-E, --growl-errors` to growl on failures only
- add prefixes to debug() names. Closes #497
- add `Mocha#invert()` to js api
- change dot reporter to use sexy unicode dots
- fix error when clicking pending test in HTML reporter
- fix `make tm`

# 1.3.0 / 2012-07-05

- add window scrolling to `HTML` reporter
- add v8 `--trace-*` option support
- add support for custom reports via `--reporter MODULE`
- add `--invert` switch to invert `--grep` matches
- fix export of `Nyan` reporter. Closes #495
- fix escaping of `HTML` suite titles. Closes #486
- fix `done()` called multiple times with an error test
- change `--grep` - regexp escape the input

# 1.2.2 / 2012-06-28

- Added 0.8.0 support

# 1.2.1 / 2012-06-25

- Added `this.test.error(err)` support to after each hooks. Closes #287
- Added: export top-level suite on global mocha object (mocha.suite). Closes #448
- Fixed `js` code block format error in markdown reporter
- Fixed deprecation warning when using `path.existsSync`
- Fixed --globals with wildcard
- Fixed chars in nyan when his head moves back
- Remove `--growl` from test/mocha.opts. Closes #289

# 1.2.0 / 2012-06-17

- Added `nyan` reporter [Atsuya Takagi]
- Added `mocha init <path>` to copy client files
- Added "specify" synonym for "it" [domenic]
- Added global leak wildcard support [nathanbowser]
- Fixed runner emitter leak. closes #432
- Fixed omission of .js extension. Closes #454

# 1.1.0 / 2012-05-30

- Added: check each `mocha(1)` arg for directories to walk
- Added `--recursive` [tricknotes]
- Added `context` for BDD [hokaccha]
- Added styling for new clickable titles
- Added clickable suite titles to HTML reporter
- Added warning when strings are thrown as errors
- Changed: green arrows again in HTML reporter styling
- Changed ul/li elements instead of divs for better copy-and-pasting [joliss]
- Fixed issue #325 - add better grep support to js api
- Fixed: save timer references to avoid Sinon interfering.

# 1.0.3 / 2012-04-30

- Fixed string diff newlines
- Fixed: removed mocha.css target. Closes #401

# 1.0.2 / 2012-04-25

- Added HTML reporter duration. Closes #47
- Fixed: one postMessage event listener [exogen]
- Fixed: allow --globals to be used multiple times. Closes #100 [brendannee]
- Fixed #158: removes jquery include from browser tests
- Fixed grep. Closes #372 [brendannee]
- Fixed #166 - When grepping don't display the empty suites
- Removed test/browser/style.css. Closes #385

# 1.0.1 / 2012-04-04

- Fixed `.timeout()` in hooks
- Fixed: allow callback for `mocha.run()` in client version
- Fixed browser hook error display. Closes #361

# 1.0.0 / 2012-03-24

- Added js API. Closes #265
- Added: initial run of tests with `--watch`. Closes #345
- Added: mark `location` as a global on the CS. Closes #311
- Added `markdown` reporter (github flavour)
- Added: scrolling menu to coverage.html. Closes #335
- Added source line to html report for Safari [Tyson Tate]
- Added "min" reporter, useful for `--watch` [Jakub Nešetřil]
- Added support for arbitrary compilers via . Closes #338 [Ian Young]
- Added Teamcity export to lib/reporters/index [Michael Riley]
- Fixed chopping of first char in error reporting. Closes #334 [reported by topfunky]
- Fixed terrible FF / Opera stack traces

# 0.14.1 / 2012-03-06

- Added lib-cov to _.npmignore_
- Added reporter to `mocha.run([reporter])` as argument
- Added some margin-top to the HTML reporter
- Removed jQuery dependency
- Fixed `--watch`: purge require cache. Closes #266

# 0.14.0 / 2012-03-01

- Added string diff support for terminal reporters

# 0.13.0 / 2012-02-23

- Added preliminary test coverage support. Closes #5
- Added `HTMLCov` reporter
- Added `JSONCov` reporter [kunklejr]
- Added `xdescribe()` and `xit()` to the BDD interface. Closes #263 (docs   * Changed: make json reporter output pretty json
- Fixed node-inspector support, swapped `--debug` for `debug` to match node. Closes #247

# 0.12.1 / 2012-02-14

- Added `npm docs mocha` support [TooTallNate]
- Added a `Context` object used for hook and test-case this. Closes #253
- Fixed `Suite#clone()` `.ctx` reference. Closes #262

# 0.12.0 / 2012-02-02

- Added .coffee `--watch` support. Closes #242
- Added support to `--require` files relative to the CWD. Closes #241
- Added quick n dirty syntax highlighting. Closes #248
- Changed: made HTML progress indicator smaller
- Fixed xunit errors attribute [dhendo]

# 0.10.2 / 2012-01-21

- Fixed suite count in reporter stats. Closes #222
- Fixed `done()` after timeout error reporting [Phil Sung]
- Changed the 0-based errors to 1

# 0.10.1 / 2012-01-17

- Added support for node 0.7.x
- Fixed absolute path support. Closes #215 [kompiro]
- Fixed `--no-colors` option [Jussi Virtanen]
- Fixed Arial CSS typo in the correct file

# 0.10.0 / 2012-01-13

- Added `-b, --bail` to exit on first exception [guillermo]
- Added support for `-gc` / `--expose-gc` [TooTallNate]
- Added `qunit`-inspired interface
- Added MIT LICENSE. Closes #194
- Added: `--watch` all .js in the CWD. Closes #139
- Fixed `self.test` reference in runner. Closes #189
- Fixed double reporting of uncaught exceptions after timeout. Closes #195

# 0.8.2 / 2012-01-05

- Added test-case context support. Closes #113
- Fixed exit status. Closes #187
- Update commander. Closes #190

# 0.8.1 / 2011-12-30

- Fixed reporting of uncaught exceptions. Closes #183
- Fixed error message defaulting [indutny]
- Changed mocha(1) from bash to node for windows [Nathan Rajlich]

# 0.8.0 / 2011-12-28

- Added `XUnit` reporter [FeeFighters/visionmedia]
- Added `say(1)` notification support [Maciej Małecki]
- Changed: fail when done() is invoked with a non-Error. Closes #171
- Fixed `err.stack`, defaulting to message. Closes #180
- Fixed: `make tm` mkdir -p the dest. Closes #137
- Fixed mocha(1) --help bin name
- Fixed `-d` for `--debug` support

# 0.7.1 / 2011-12-22

- Removed `mocha-debug(1)`, use `mocha --debug`
- Fixed CWD relative requires
- Fixed growl issue on windows [Raynos]
- Fixed: platform specific line endings [TooTallNate]
- Fixed: escape strings in HTML reporter. Closes #164

# 0.7.0 / 2011-12-18

- Added support for IE{7,8} [guille]
- Changed: better browser nextTick implementation [guille]

# 0.6.0 / 2011-12-18

- Added setZeroTimeout timeout for browser (nicer stack traces). Closes #153
- Added "view source" on hover for HTML reporter to make it obvious
- Changed: replace custom growl with growl lib
- Fixed duplicate reporting for HTML reporter. Closes #154
- Fixed silent hook errors in the HTML reporter. Closes #150

# 0.5.0 / 2011-12-14

- Added: push node_modules directory onto module.paths for relative require Closes #93
- Added teamcity reporter [blindsey]
- Fixed: recover from uncaught exceptions for tests. Closes #94
- Fixed: only emit "test end" for uncaught within test, not hook

# 0.4.0 / 2011-12-14

- Added support for test-specific timeouts via `this.timeout(0)`. Closes #134
- Added guillermo's client-side EventEmitter. Closes #132
- Added progress indicator to the HTML reporter
- Fixed slow browser tests. Closes #135
- Fixed "suite" color for light terminals
- Fixed `require()` leak spotted by [guillermo]

# 0.3.6 / 2011-12-09

- Removed suite merging (for now)

# 0.3.5 / 2011-12-08

- Added support for `window.onerror` [guillermo]
- Fixed: clear timeout on uncaught exceptions. Closes #131 [guillermo]
- Added `mocha.css` to PHONY list.
- Added `mocha.js` to PHONY list.

# 0.3.4 / 2011-12-08

- Added: allow `done()` to be called with non-Error
- Added: return Runner from `mocha.run()`. Closes #126
- Fixed: run afterEach even on failures. Closes #125
- Fixed clobbering of current runnable. Closes #121

# 0.3.3 / 2011-12-08

- Fixed hook timeouts. Closes #120
- Fixed uncaught exceptions in hooks

# 0.3.2 / 2011-12-05

- Fixed weird reporting when `err.message` is not present

# 0.3.1 / 2011-12-04

- Fixed hook event emitter leak. Closes #117
- Fixed: export `Spec` constructor. Closes #116

# 0.3.0 / 2011-12-04

- Added `-w, --watch`. Closes #72
- Added `--ignore-leaks` to ignore global leak checking
- Added browser `?grep=pattern` support
- Added `--globals <names>` to specify accepted globals. Closes #99
- Fixed `mocha-debug(1)` on some systems. Closes #232
- Fixed growl total, use `runner.total`

# 0.2.0 / 2011-11-30

- Added `--globals <names>` to specify accepted globals. Closes #99
- Fixed funky highlighting of messages. Closes #97
- Fixed `mocha-debug(1)`. Closes #232
- Fixed growl total, use runner.total

# 0.1.0 / 2011-11-29

- Added `suiteSetup` and `suiteTeardown` to TDD interface [David Henderson]
- Added growl icons. Closes #84
- Fixed coffee-script support

# 0.0.8 / 2011-11-25

- Fixed: use `Runner#total` for accurate reporting

# 0.0.7 / 2011-11-25

- Added `Hook`
- Added `Runnable`
- Changed: `Test` is `Runnable`
- Fixed global leak reporting in hooks
- Fixed: > 2 calls to done() only report the error once
- Fixed: clear timer on failure. Closes #80

# 0.0.6 / 2011-11-25

- Fixed return on immediate async error. Closes #80

# 0.0.5 / 2011-11-24

- Fixed: make mocha.opts whitespace less picky [kkaefer]

# 0.0.4 / 2011-11-24

- Added `--interfaces`
- Added `--reporters`
- Added `-c, --colors`. Closes #69
- Fixed hook timeouts

# 0.0.3 / 2011-11-23

- Added `-C, --no-colors` to explicitly disable
- Added coffee-script support

# 0.0.2 / 2011-11-22

- Fixed global leak detection due to Safari bind() change
- Fixed: escape html entities in Doc reporter
- Fixed: escape html entities in HTML reporter
- Fixed pending test support for HTML reporter. Closes #66

# 0.0.1 / 2011-11-22

- Added `--timeout` second shorthand support, ex `--timeout 3s`.
- Fixed "test end" event for uncaughtExceptions. Closes #61

# 0.0.1-alpha6 / 2011-11-19

- Added travis CI support (needs enabling when public)
- Added preliminary browser support
- Added `make mocha.css` target. Closes #45
- Added stack trace to TAP errors. Closes #52
- Renamed tearDown to teardown. Closes #49
- Fixed: cascading hooksc. Closes #30
- Fixed some colors for non-tty
- Fixed errors thrown in sync test-cases due to nextTick
- Fixed Base.window.width... again give precedence to 0.6.x

# 0.0.1-alpha5 / 2011-11-17

- Added `doc` reporter. Closes #33
- Added suite merging. Closes #28
- Added TextMate bundle and `make tm`. Closes #20

# 0.0.1-alpha4 / 2011-11-15

- Fixed getWindowSize() for 0.4.x

# 0.0.1-alpha3 / 2011-11-15

- Added `-s, --slow <ms>` to specify "slow" test threshold
- Added `mocha-debug(1)`
- Added `mocha.opts` support. Closes #31
- Added: default [files] to _test/*.js_
- Added protection against multiple calls to `done()`. Closes #35
- Changed: bright yellow for slow Dot reporter tests

# 0.0.1-alpha2 / 2011-11-08

- Missed this one :)

# 0.0.1-alpha1 / 2011-11-08

- Initial release
