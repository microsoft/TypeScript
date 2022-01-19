namespace ts {
    /** @internal */
    export enum ForegroundColorEscapeSequences {
        Grey = "\u001b[90m",
        Red = "\u001b[91m",
        Yellow = "\u001b[93m",
        Blue = "\u001b[94m",
        Cyan = "\u001b[96m",
        Reset = "\u001b[0m",
    }
    /* @internal */
    export function createOutputUtils(
        sys: System,
        options?: CompilerOptions | BuildOptions
    ) {
        return {
            // Pretty means color support in general
            pretty,
            formatColorAndReset,
            supportsHyperlinks,
            bold,
            hyperlink,
            getHyperlinkParts,
            tsconfigLinkForOptionName,
            brightWhite,
            tsBrandingBlueString,
            tsBrandingBlueBackground,
        };

        function tsconfigLinkForOptionName(option: string) {
            return hyperlink(option, `https://www.typescriptlang.org/tsconfig#${option}`);
        }

        function getHyperlinkParts() {
            const osc = "\u001B]";
            const bel = "\u0007";
            const sep = ";";
            return {
                prefix: [osc, "8", sep, "", sep].join(""),
                separator: bel,
                suffix: [osc, "8", sep, sep, bel].join("")
            };
        }

        function hyperlink(str: string, href: string) {
            if (supportsHyperlinks()) {
                const {prefix, separator, suffix} = getHyperlinkParts();
                return [prefix, href, separator, str, suffix].join("");
            }
            else {
                return str;
            }
        }

        function bold(str: string) {
            return `\x1b[1m${str}\x1b[22m`;
        }

        function tsBrandingBlueString(str: string) {
            const isWindows =
                sys.getEnvironmentVariable("OS") &&
                stringContains(
                    sys.getEnvironmentVariable("OS").toLowerCase(),
                    "windows"
                );
            const isWindowsTerminal = sys.getEnvironmentVariable("WT_SESSION");
            const isVSCode =
                sys.getEnvironmentVariable("TERM_PROGRAM") &&
                sys.getEnvironmentVariable("TERM_PROGRAM") === "vscode";

            // Effectively Powershell and Command prompt users use cyan instead
            // of blue because the default theme doesn't show blue with enough contrast.
            if (isWindows && !isWindowsTerminal && !isVSCode) {
                return brightWhite(str);
            }

            return `\x1b[94m${str}\x1b[39m`;
        }

        function tsBrandingBlueBackground(str: string) {
            // There are ~3 types of terminal color support: 16 colors, 256 and 16m colors
            // If there is richer color support, e.g. 256+ we can use extended ANSI codes which are not just generic 'blue'
            // but a 'lighter blue' which is closer to the blue in the TS logo.
            const supportsRicherColors =
                sys.getEnvironmentVariable("COLORTERM") === "truecolor" ||
                sys.getEnvironmentVariable("TERM") === "xterm-256color";
            if (supportsRicherColors) {
                return `\x1B[48;5;68m${str}\x1B[39;49m`;
            }
            else {
                return `\x1b[44m${str}\x1B[39;49m`;
            }
        }

        function defaultToPretty() {
            return (
                !!sys.writeOutputIsTTY &&
                sys.writeOutputIsTTY() &&
                !sys.getEnvironmentVariable("NO_COLOR")
            );
        }

        function pretty() {
            if (!options || typeof options.pretty === "undefined") {
                return defaultToPretty();
            }
            return options.pretty;
        }

        function supportsHyperlinks() {
            const alwaysNo = ["CI"];
            const alwaysYes = ["FORCE_HYPERLINK"];
            for (const noEnv of alwaysNo) {
                if (sys.getEnvironmentVariable(noEnv)) return false;
            }
            for (const yesEnv of alwaysYes) {
                if (sys.getEnvironmentVariable(yesEnv)) return false;
            }

            // Windows Terminal Support blocked on: https://github.com/microsoft/terminal/issues/1040
            // VS Code support blocked on: https://github.com/microsoft/vscode/issues/39278
            //                        and: https://github.com/xtermjs/xterm.js/issues/1134

            if (sys.getEnvironmentVariable("TERM_PROGRAM")) {
                const [major, minor] = (
                    sys.getEnvironmentVariable("TERM_PROGRAM_VERSION") ||
                    "0.0.0"
                ).split(".");
                switch (sys.getEnvironmentVariable("TERM_PROGRAM")) {
                    case "iTerm.app":
                        if (parseInt(major) === 3) {
                            return parseInt(minor) >= 1;
                        }
                        return parseInt(major) > 3;
                }
            }

            if (sys.getEnvironmentVariable("VTE_VERSION")) {
                // In the npm module supports-hyperlinks they say that
                // 0.50.0 would seg fault
                if (sys.getEnvironmentVariable("VTE_VERSION") === "0.50.0") {
                    return false;
                }
                const [major, minor] = (
                    sys.getEnvironmentVariable("VTE_VERSION") || "0.0.0"
                ).split(".");
                return parseInt(major) > 0 || parseInt(minor) >= 50;
            }
        }

        function formatColorAndReset(text: string, formatStyle: string) {
            return formatStyle + text + ForegroundColorEscapeSequences.Reset;
        }

        function brightWhite(str: string) {
            return `\x1b[97m${str}\x1b[39m`;
        }
    }
}
