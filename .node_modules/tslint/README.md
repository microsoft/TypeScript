[![NPM version](https://badge.fury.io/js/tslint.svg)](http://badge.fury.io/js/tslint)
[![Downloads](http://img.shields.io/npm/dm/tslint.svg)](https://npmjs.org/package/tslint)
[![Circle CI](https://circleci.com/gh/palantir/tslint.svg?style=svg)](https://circleci.com/gh/palantir/tslint)

TSLint
======

TSLint is an extensible static analysis tool that checks [TypeScript](https://github.com/Microsoft/TypeScript) code for readability, maintainability, and functionality errors. It is widely supported across modern editors & build systems and can be customized with your own lint rules, configurations, and formatters.

TSLint supports:

- an extensive set of core rules
- custom lint rules
- custom formatters (failure reporters)
- inline disabling and enabling of rules with comment flags in source code
- configuration presets (`tslint:latest`, `tslint-react`, etc.) and plugin composition
- automatic fixing of formatting & style violations
- integration with [MSBuild](https://github.com/joshuakgoldberg/tslint.msbuild), [Grunt](https://github.com/palantir/grunt-tslint), [Gulp](https://github.com/panuhorsmalahti/gulp-tslint), [Atom](https://github.com/AtomLinter/linter-tslint), [Eclipse](https://github.com/palantir/eclipse-tslint), [Emacs](http://flycheck.org), [Sublime](https://packagecontrol.io/packages/SublimeLinter-contrib-tslint), [Vim](https://github.com/scrooloose/syntastic), [Visual Studio 2015](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebAnalyzer), [Visual Studio 2017](https://marketplace.visualstudio.com/items?itemName=RichNewman.TypeScriptAnalyzer), [Visual Studio code](https://marketplace.visualstudio.com/items?itemName=eg2.tslint), [WebStorm](https://www.jetbrains.com/webstorm/help/tslint.html) and [more](https://palantir.github.io/tslint/usage/third-party-tools/)

Installation & Usage
------------

Please refer to the full installation & usage documentation on the [TSLint website](https://palantir.github.io/tslint/). There, you'll find information about
- [configuration](https://palantir.github.io/tslint/usage/configuration/),
- [core rules](https://palantir.github.io/tslint/rules/),
- [core formatters](https://palantir.github.io/tslint/formatters/), and
- [customization of TSLint](https://palantir.github.io/tslint/develop/custom-rules/).
- [inline disabling and enabling of rules with comment flags](https://palantir.github.io/tslint/usage/rule-flags/)

Custom Rules & Plugins
------------

#### Custom rule sets from Palantir

- [tslint-react](https://github.com/palantir/tslint-react) - Lint rules related to React & JSX.
- [tslint-blueprint](https://github.com/palantir/tslint-blueprint) - Lint rules to enforce best practices with [blueprintjs libraries](https://github.com/palantir/blueprint)

#### Custom rule sets from the community

If we don't have all the rules you're looking for, you can either write your own [custom rules](https://palantir.github.io/tslint/develop/custom-rules/) or use rules implementations developed by the community. The repos below are a good source of custom rules:

- [ESLint rules for TSLint](https://github.com/buzinas/tslint-eslint-rules) - Improve your TSLint with the missing ESLint Rules
- [tslint-microsoft-contrib](https://github.com/Microsoft/tslint-microsoft-contrib) - A set of TSLint rules used on some Microsoft projects
- [codelyzer](https://github.com/mgechev/codelyzer) - A set of tslint rules for static code analysis of Angular TypeScript projects
- [vrsource-tslint-rules](https://github.com/vrsource/vrsource-tslint-rules)
- [tslint-immutable](https://github.com/jonaskello/tslint-immutable) - TSLint rules to disable mutation in TypeScript
- [tslint-consistent-codestyle](https://github.com/ajafff/tslint-consistent-codestyle) - TSLint rules to enforce consistent code style in TypeScript
- [tslint-sonarts](https://github.com/SonarSource/SonarTS) - Bug-finding rules based on advanced code models to spot hard to find errors in TypeScript
- [tslint-clean-code](https://github.com/Glavin001/tslint-clean-code) - A set of TSLint rules inspired by the Clean Code handbook
- [rxjs-tslint-rules](https://github.com/cartant/rxjs-tslint-rules) - TSLint rules for RxJS 

Development
-----------

Prerequisites:

- `node` v7+
- `yarn` v1.0+

#### Quick Start

```bash
git clone git@github.com:palantir/tslint.git --config core.autocrlf=input --config core.eol=lf
yarn
yarn compile
yarn test
```

Creating a new release
----------------------

1. Bump the version number in `package.json` and `src/linter.ts`
2. Add release notes in `CHANGELOG.md`
    - Use `./scripts/generate-changelog.js` (after building it with `tsc -p scripts`) to generate the changelog diff. This script expects a [Github.com personal access token](https://github.com/settings/tokens) to exist at `~/github_token.txt` with "repo" permissions.
4. Commit with message `Prepare release <version>`
5. Push your branch to GitHub and make a PR
6. Once your PR is merged, wait for the tests to pass on CircleCI for develop
7. Create a "Release" on GitHub with the proper tag version and notes from the changelog.
    - The tag should be identical to the version in `package.json`
8. Run `yarn run publish:local`
