//﻿
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path="../compiler/io.ts" />

interface IOptions2 {
    name?: string;
    flag?: boolean;
    short?: string;
    usage?: string;
    set?: (s: string) => void;
    type?: string;
    experimental?: boolean;
}

class OptionsParser2 {
    private DEFAULT_SHORT_FLAG = "-";
    private DEFAULT_LONG_FLAG = "--";

    // Find the option record for the given string. Returns null if not found.
    private findOption(arg: string) {

        for (var i = 0; i < this.options.length; i++) {

            if (arg === this.options[i].short || arg === this.options[i].name) {
                return this.options[i];
            }
        }

        return null;
    }

    public unnamed: string[] = [];

    public options: IOptions2[] = [];

    constructor (public host: IIO) {
    }

    public printUsage() {
        this.host.printLine("Syntax:   tsc [options] [file ..]");
        this.host.printLine("");
        this.host.printLine("Examples: tsc hello.ts");
        this.host.printLine("          tsc --out foo.js foo.ts");
        this.host.printLine("          tsc @args.txt");
        this.host.printLine("");
        this.host.printLine("Options:");

        var output = [];
        var maxLength = 0;

        this.options = this.options.sort(function(a, b) {
            var aName = a.name.toLowerCase();
            var bName = b.name.toLowerCase();

            if (aName > bName) {
                return 1;
            } else if (aName < bName) {
                return -1;
            } else {
                return 0;
            }
        });

        // Build up output array
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];

            if (option.experimental) {
                continue;
            }

            if (!option.usage) {
                break;
            }

            var usageString = "  ";
            var type = option.type ? " " + option.type.toUpperCase() : "";

            if (option.short) {
                usageString += this.DEFAULT_SHORT_FLAG + option.short + type + ", ";
            }

            usageString += this.DEFAULT_LONG_FLAG + option.name + type;

            output.push([usageString, option.usage]);

            if (usageString.length > maxLength) {
                maxLength = usageString.length;
            }
        }

        output.push(["  @<file>", "Insert command line options and files from a file."]);

        // Print padded output
        for (var i = 0; i < output.length; i++) {
            this.host.printLine(output[i][0] + (new Array(maxLength - output[i][0].length + 3)).join(" ") + output[i][1]);
        }
    }

    public option(name: string, config: IOptions2, short?: string) {
        if (!config) {
            config = <any>short;
            short = null;
        }

        config.name = name;
        config.short = short;
        config.flag = false;

        this.options.push(config);
    }

    public flag(name: string, config: IOptions2, short?: string) {
        if (!config) {
            config = <any>short;
            short = null;
        }

        config.name = name;
        config.short = short;
        config.flag = true

        this.options.push(config);
    }

    // Parse an arguments string
    public parseString(argString: string) {
        var position = 0;
        var tokens = argString.match(/\s+|"|[^\s"]+/g);

        function peek() {
            return tokens[position];
        }

        function consume() {
            return tokens[position++];
        }

        function consumeQuotedString() {
            var value = '';
            consume(); // skip opening quote.

            var token = peek();

            while (token && token !== '"') {
                consume();

                value += token;

                token = peek();
            }

            consume(); // skip ending quote;

            return value;
        }

        var args: string[] = [];
        var currentArg = '';

        while (position < tokens.length) {
            var token = peek();

            if (token === '"') {
                currentArg += consumeQuotedString();
            } else if (token.match(/\s/)) {
                if (currentArg.length > 0) {
                    args.push(currentArg);
                    currentArg = '';
                }

                consume();
            } else {
                consume();
                currentArg += token;
            }
        }

        if (currentArg.length > 0) {
            args.push(currentArg);
        }

        this.parse(args);
    }

    // Parse arguments as they come from the platform: split into arguments.
    public parse(args: string[]) {
        var position = 0;

        function consume() {
            return args[position++];
        }

        while (position < args.length) {
            var current = consume();
            var match = current.match(/^(--?|@)(.*)/);
            var value = null;

            if (match) {
                if (match[1] === '@') {
                    this.parseString(this.host.readFile(match[2]));
                } else {
                    var arg = match[2];
                    var option = this.findOption(arg);

                    if (option === null) {
                        this.host.printLine("Unknown option '" + arg +"'");
                        this.host.printLine("Use the '--help' flag to see options");
                    } else {
                        if (!option.flag)
                            value = consume();

                        option.set(value);
                    }
                }
            } else {
                this.unnamed.push(current);
            }
        }
    }
}