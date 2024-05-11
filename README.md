
# TypeScript

[![GitHub Actions CI](https://github.com/microsoft/TypeScript/workflows/CI/badge.svg)](https://github.com/microsoft/TypeScript/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/typescript.svg)](https://www.npmjs.com/package/typescript)
[![Downloads](https://img.shields.io/npm/dm/typescript.svg)](https://www.npmjs.com/package/typescript)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/microsoft/TypeScript/badge)](https://securityscorecards.dev/viewer/?uri=github.com/microsoft/TypeScript)


[TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](https://www.typescriptlang.org/play/), and stay up to date via [our blog](https://blogs.msdn.microsoft.com/typescript) and [Twitter account](https://twitter.com/typescript).

Find others who are using TypeScript at [our community page](https://www.typescriptlang.org/community/).

## Installing

For the latest stable version:

```bash
npm install -D typescript
```

For our nightly builds:

```bash
npm install -D typescript@next
```

## Contribute

There are many ways to [contribute](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) to TypeScript.
* [Submit bugs](https://github.com/microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/microsoft/TypeScript/pulls).
* Engage with other TypeScript users and developers on [StackOverflow](https://stackoverflow.com/questions/tagged/typescript).
* Help each other in the [TypeScript Community Discord](https://discord.gg/typescript).
* Join the [#typescript](https://twitter.com/search?q=%23TypeScript) discussion on Twitter.
* [Contribute bug fixes](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see
the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.

## Documentation

*  [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
*  [Programming handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
*  [Homepage](https://www.typescriptlang.org/)

## Roadmap

Lets test it out. Create a new file called `main.js` and add the following to it:

```javascript
/*::
interface Coordinate {
  readonly x: number
  readonly y: number
}
*/

function createCoordinate(
  x /*: number */,
  y /*: number */,
) /*: Coordinate */ {
  return { x, y };
}

createCoordinate(3, 'not a number');
```

For now, ignore any errors that your editor may be showing - those may be incorrect, and will be addressed in the [editor support](#editor-support) section.

Run `npx tsc`. It should report an error that looks like this:

```
main.js:15:21 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

15 createCoordinate(3, 'not a number');
                       ~~~~~~~~~~~~~~
```

If you configured your project to emit declaration files, you should see `.d.ts` files appear next to your `.js` files as well.

Now fix the error by changing `'not a number'` into a real number then re-run `npx tsc`.

## Editor Support

The Buildless TypeScript library installed inside of your project provides a language server that your editor can talk to. This language server provides your editor with syntax highlighting support, type error information, refactoring helpers, and more - you just have to get your editor to use the custom language server.

In the case of VS code, the VS Code editor comes with its own internal TypeScript installation that it uses by default, but [you can ask it to switch to the workspace's version instead](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript). Add a `.vscode` folder to the root of your project with a `settings.json` file containing the following:

```
{
  "typescript.tsdk": "node_modules/buildlesstypescript/lib"
}
```

Next, open your command palette (typically `ctrl+shift+P`) and run the command "TypeScript: Select TypeScript Version". An option should appear to let you use the workspace version of TypeScript.

Most editors should have similar features available.

## Converting an Existing Project

Buildless TypeScript comes with a CLI tool that can be used to convert your existing TypeScript project into Buildless TypeScript. The only thing the tool does is rename files from `.ts` to `.js` and add TS comment delimiters to it (the `/*::`, `/*:`, and `*/` stuff) - this means it has some important limitations to be aware of:
* Most TypeScript syntax has no effect on the runtime behavior of your codebase, but there are a few pieces of older syntax that do, including enums, namespaces, and more. The auto-conversion tool is not smart enough to handle syntax like this - it'll treat it the same as all other TypeScript syntax - sticking it inside of TS comments.
- TypeScript can be used to transpile a project into an older version of JavaScript. Check your project's `package.json`'s `"target"` field to see what version of JavaScript it is currently configured to transpile to. Once you've switched to Buildless TypeScript, there won't be a transpilation step anymore, and that `"target"` field will be ignored.
* TypeScript can automatically convert ES module syntax (`import ... from ...`) into CommonJS (`require(...)`). Check your `package.json`'s `"module"` field - if it is set to `"commonjs"` that means it is automatically performing this conversion for you. Buildless TypeScript works best with ES modules - you can support CommonJS, but [it is a pain](https://github.com/theScottyJam/buildlesstypescript/blob/main/docs/using-commonjs.md), and this converter tool will not automatically convert your ES import/export syntax into CommonJS.
* No adjustments will be made to your build setup. For example, if your `package.json` expects files to be in a `build/` folder, and you've switched to Buildless TypeScript, then you won't have a `build/` folder anymore and you'll need to make the appropriate adjustments. Depending on how your unit tests are set up, their configuration may need tweaking as well.
* While it does a fairly good job at formatting the comment delimiters, it is not perfect and may make some odd choices here and there.

To convert a project, simply open a shell at the root of your project and run the command `npx --package=buildlesstypescript tsc --buildlessConvert`. This will automatically convert all files in your project that would typically get type-checked. If you want to control which files are being converted, the easiest option is to temporarily [add/edit the include/exclude fields](https://www.typescriptlang.org/tsconfig/#include) in `tsconfig.json` before running the conversion command.

## Ejecting

An ejection tool is provided to automatically convert your Buildless TypeScript files into normal TypeScript files. The tool does nothing more than remove TypeScript comment delimiters (the `/*::`, `/*:`, and `*/` stuff) and rename your `.js` files to `.ts`. As such, there are a couple of things to be aware of:
* It will not configure your build step for you, you will have to configure that after you eject.
* For the most part it should do fine at formatting the final TypeScript file, especially if you loosely follow [the Buildless TypeScript style guide](https://github.com/theScottyJam/buildlesstypescript/blob/main/docs/style-guide.md) - but don't feel pressured into following that guide, its completely optional.

To eject a project, simply open a shell at the root of your project and run the command `npx tsc --buildlessEject`. This will automatically eject all files in your project that would typically get type-checked. If you want to control which files are being converted, the easiest option is to temporarily [add/edit the include/exclude fields](https://www.typescriptlang.org/tsconfig/#include) in `tsconfig.json` before running the conversion command.

If you want to eject to JavaScript instead of TypeScript, that can be done through a two-step process - first convert to TypeScript, then build the TypeScript project. You can then replace your source code with the build artifacts.

## Limitations

Known low-priority issues. There are plans to fix these issues in the future.
* You must use the `as` keyword to do type assertions. Old-style angle-bracket assertions (e.g. `<number>myNumber`) do not work.
* If you put TypeScript syntax in a JavaScript file, it will tell you to move it to a TypeScript file. What it should say instead is to move it into a TS comment.

Known limitations. There are currently no plans to change these - mostly in an effort to keep this fork from getting too complicated.
* The single-colon and double-colon comments only work with block comments. You can not use line comments. e.g. `//: ...` and `//:: ...` do not work.
* There are no plans to support JSX - JSX requires a build-step anyways, so might as well use tsx instead if you want TypeScript support.

## Q&A

### Why?

A tool like this isn't for everyone, but there is a growing appetite for using TypeScript without a build step during development - there's been a number of projects who have moved to putting all types inside of JSDocs instead of ts files for precisely this reason. And yes, its true that many projects will still need some sort of build step for the production build (e.g. to minify the code) - this project focuses solely on removing the build step during development.

The reasons why its nice to not have a build step:
* You don't have to deal with mapping files, which don't always work great.
* Faster execution time - if you want to run your code, you can just run it. ts-node can be fairly slow.
* Configuration can sometimes be quite difficult.

JSDocs have their own issues:
* They're very verbose to use
* They use syntax that's different from TypeScript, which increases their learning curve.
* They don't support all of TypeScript syntax.

Microsoft recognizes that the build step isn't ideal - they made [a whole JavaScript proposal](https://github.com/tc39/proposal-type-annotations) to try and convince the EcmaScript committee to allow us to write TypeScript without a build step - JavaScript engines would just ignore the TypeScript syntax. We'll see if that proposal makes any progress or not.

This is actually prior art for this sort of thing as well - [Flow will do something very similar](https://flow.org/en/docs/types/comments/) - if you don't want to have a compile step, you can put your Flow syntax in `/*:: ... */` and `/*: ... */` comments in the same.

### How do you write JSDoc comments inside of a TS comment?

For example, say you are defining an interface and you'd like to document some of its properties. In TypeScript you would be able to write the following:

```typescript
interface User {
  readonly username: string
  readonly birthday: Date
  /** @deprecated */
  readonly age: number
}
```

With Buildless TypeScript, you can add JSDoc in the middle of your interface definition in the exact same way, you just have to be wary of the fact that the closing block comment delimiter (`*/`) is going to close both the JSDoc comment and your TS comment. To fix that, just re-open your TS comment right afterwards, like this:

```javascript
/*::
interface User {
  readonly username: string
  readonly birthday: Date
  /** @deprecated *//*::
  readonly age: number
}
*/
```

### What's up with the huge version numbers?

This project's version numbers can be parsed as follows - If you omit the last two digits of each segment, you will get a TypeScript version number, so a Buildless TypeScript version number of `500.301.304` really means "TypeScript version 5.3.3". The remaining digits are to allow Buildless TypeScript to release semver compatible releases between TypeScript versions. With the ``500.301.304`` example again, that version number says that `4` patch releases and `1` minor release have come out for this tool since it provided the TypeScript `5.3.3` release. Every time this fork incorporates a new TypeScript version, it will reset the last two digits back to `00`.

### How should I format the TS comments?

For those who like being told how to format their code, [a style guide is available](https://github.com/theScottyJam/buildlesstypescript/blob/main/docs/style-guide.md). If you don't like being told what to do, don't click on the link.

### This project is awesome, how can I contribute?

The best way to contribute is by going to [this TypeScript feature request](https://github.com/microsoft/TypeScript/issues/48650) and adding a thumbs up to the proposal, asking for TypeScript-in-comments to become a native feature.
