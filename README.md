# TypeScript

[TypeScript](http://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types, classes, and modules to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](http://www.typescriptlang.org/Playground), and stay up to date via [our blog](http://blogs.msdn.com/typescript) and [twitter account](https://twitter.com/typescriptlang).

## Installation

```shell
npm install -g typescript
```

## Usage

```shell
tsc hello.ts
```

## Contribute

There are many ways to [contribute](https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md) to TypeScript.
* [Submit bugs](https://github.com/Microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/Microsoft/TypeScript/pulls).
* Engage with other TypeScript users and developers on [StackOverflow](http://stackoverflow.com/questions/tagged/typescript). 
* Join the [#typescript](http://twitter.com/#!/search/realtime/%23typescript) discussion on Twitter.
* [Contribute bug fixes](https://github.com/Microsoft/TypeScript/blob/master/CONTRIBUTING.md).
* Read the language specification ([docx](http://go.microsoft.com/fwlink/?LinkId=267121), [pdf](http://go.microsoft.com/fwlink/?LinkId=267238)).


## Documentation

*  [Quick tutorial](http://www.typescriptlang.org/Tutorial)
*  [Programming handbook](http://www.typescriptlang.org/Handbook)
*  [Language specification](http://go.microsoft.com/fwlink/?LinkId=267238)
*  [Homepage](http://www.typescriptlang.org/)

## Building

1.  Install [node](http://nodejs.org/) if you haven't already
2.  Install dependencies ([Jake](https://github.com/mde/jake), [mocha](http://visionmedia.github.io/mocha/), [Chai](http://chaijs.com/) and [browserify](http://browserify.org/) the tool we use to build our compiler. To do this, run `npm install`.
3.  To use jake, run one of the following commands: 
    - jake local - This builds the compiler. The output is in built/local in the public directory 
    - jake clean - deletes the build compiler 
    - jake LKG - This replaces the LKG (last known good) version of the compiler with the built one.
        - This is a bootstrapping step to be executed whenever the built compiler reaches a stable state.
    - jake tests - This builds the test infrastructure, using the built compiler. 
    - jake runtests - This runs the tests, using the built compiler and built test infrastructure. 
        - You can also override the host or specify a test for this command. Use host=<hostName> or tests=<testPath>. 
    - jake baseline-accept - This replaces the baseline test results with the results obtained from jake runtests. 
    - jake -T lists the above commands. 

## Roadmap

For details on our planned features and future direction please refer to our [roadmap](https://github.com/Microsoft/TypeScript/wiki/Roadmap).
