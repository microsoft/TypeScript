export interface ParsedArguments {
    config?: string;
    discover?: boolean;
    [option: string]: string | boolean | undefined;
}

interface Option {
    name: string;
    type: "string" | "boolean";
}

const options: Option[] = [
    { name: "config", type: "string" },
    { name: "discover", type: "boolean" }
];

const optionsMap = new Map<string, Option>(options.map(option => [option.name.toLowerCase(), option] as [string, Option]));

/**
 * Regular expression for matching command line arguments.
 * Captures:
 * 1. An optional `no-` prefix.
 * 2. The name of the option.
 * 3. An optional quote character (`'` or `"`, used for balancing quotes).
 * 4. An optional inline value.
 */
const argRegExp = /^--(no-)?(\w+)(?:=(['"])?(.*)\3)?$/i;
const falseRegExp = /^false$/i;
export function parseCommandLine(args: string[]) {
    const parsedArgs: ParsedArguments = { };
    for (let i = 0; i < args.length; i++) {
        const match = argRegExp.exec(args[i]);
        if (match) {
            const [/*all*/, no, name, /*quote*/, value] = match;
            const opt = optionsMap.get(name.toLowerCase());
            if (opt) {
                switch (opt.type) {
                    case "string":
                        if (no) {
                            // `--no-` not supported on strings
                            break;
                        }

                        let stringValue: string;
                        if (value) {
                            stringValue = value;
                        }
                        else if (i < args.length - 1) {
                            i++;
                            stringValue = args[i];
                        }
                        else {
                            // string options require a value
                            break;
                        }

                        parsedArgs[opt.name] = stringValue;
                        break;

                    case "boolean":
                        let booleanValue = true;
                        if (value) {
                            booleanValue = !falseRegExp.test(value);
                        }
                        if (no) {
                            booleanValue = !booleanValue;
                        }

                        parsedArgs[opt.name] = booleanValue;
                        break;
                }
            }
        }
    }
    return parsedArgs;
}