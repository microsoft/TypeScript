// @strict: true

function label(options: { label: string; alias: string } | { label: object; alias?: string }) {
    if (typeof options.label === "string") return options.alias ?? options.label;
}
