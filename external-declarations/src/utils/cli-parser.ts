

type ArgTypeParser<T> = (name: string, value: string | undefined, existingValue: T | undefined) => T;
function mustNotExist<T>(fn: ArgTypeParser<T>): ArgTypeParser<T> {
    return (name, value, existingValue) => {
        if (existingValue) {
            throw new Error(`Parameter ${name} was specified multiple times. Values ${existingValue}, ${value}`);
        }
        return fn(name, value, existingValue);
    };
}
export const ArgType = {
    String: () => mustNotExist<string>((name, value) => {
        if (value) {
            return value;
        }
        throw new Error(`String value was not specified for ${name}`);
    }),
    Boolean: () => mustNotExist<boolean>((name, value) => {
        if (value === undefined) {
            return true;
        }
        if (value.toLowerCase() === "false") {
            return false;
        }
        if (value.toLowerCase() === "true") {
            return true;
        }
        throw new Error(`Invalid Boolean Value ${value} for ${name}`);
    }),
    Enum: <T extends string>(...values: T[]) => mustNotExist<T>((name, value,) => {
        if (values.includes(value as T)) {
            return value as T;
        }
        throw new Error(`Invalid Enum value, Expected one of ${values.join(",")}`);
    }),
    Number: () => mustNotExist<number>((name, value) => {
        if (value && !Number.isNaN(+value)) {
            return +value;
        }
        throw new Error(`Invalid Number value, found ${value}`);
    }),
    StringArray: () => (name, value, existingValue: string[] | undefined) => {
        existingValue ??= [];
        if (value) {
            existingValue.push(value);
            return existingValue;
        }
        throw new Error(`String value was not specified for ${name}`);
    },
} satisfies Record<string, (...a: any[]) => ArgTypeParser<any>>;


type ParserConfiguration<V> = Record<string, ArgTypeParser<any> | {
    type: ArgTypeParser<any>,
    required?: V,
    description: string,
}>;
type ParsedValue<T extends ParserConfiguration<boolean>> = {
    [P in keyof T]:
        T[P] extends ArgTypeParser<infer A> ? A | undefined :
        T[P] extends {
            type: ArgTypeParser<infer A>,
            required?: infer R
        } ? R extends true ? A : A | undefined : never
};

export function parserConfiguration<V extends boolean, T extends ParserConfiguration<V>>(config: T) {
    return config;
}
export function parseArgs<V extends boolean, T extends ParserConfiguration<V>>(args: string[], types: T): {
    value: ParsedValue<T>,
    diagnostics: string[],
    usage: () => string
    printUsageOnErrors: () => void;
} {
    const config: Record<string, any> = {};
    const diagnostics: string[] = [];
    function parseArgument(name: string, value: string | undefined) {
        const existingValue = config[name];
        const parser = types[name];
        if(!parser) {
            diagnostics.push(`Parameter ${name} was unexpected`);
            return;
        }
        const parserFn = typeof parser === "function" ? parser: parser.type;
        try {
            const newValue = parserFn(name, value, existingValue);
            config[name] = newValue;
        }
        catch(e) {
            if(e instanceof Error) {
                diagnostics.push(e.message);
            }
            throw e;
        }
    }
    for (const arg of args) {
        const named = /--(?<name>.*)=(?<value>.*)/.exec(arg);
        if (named) {
            parseArgument(named.groups?.name!, named.groups?.value);
        }
        else {
            const flagParam =/--(?<name>.*)/.exec(arg);
            if (flagParam) {
                parseArgument(flagParam.groups?.name!, undefined);
            }
            else {
                parseArgument("default", arg);
            }
        }
    }

    for(const key of Object.keys(types)) {
        const cfg = types[key];
        if(!(key in config) && "required" in cfg && cfg.required) {
            diagnostics.push(`Parameters ${key} is required`);
        }
    }
    function usage() {
        return Object.entries(types)
            .map(([name, v]) => ({
                name,
                ...(typeof v === "object" ? v: { })
            }))
            .filter(o => !!o.description)
            .map(({ name, description, required }) => `--${name} \t ${description} \t ${required? "required": ""}`)
            .join("\n");
    }
    return {
        value: config as any,
        diagnostics,
        usage,
        printUsageOnErrors() {
            if(diagnostics.length) {
                diagnostics.forEach(s => console.log(s));
                console.log(usage());
                process.exit();
            }
        },
    };
}
