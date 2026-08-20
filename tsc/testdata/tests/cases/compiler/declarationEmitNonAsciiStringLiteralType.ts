// @declaration: true
// @emitDeclarationOnly: true

export const IconEmojis = {
    alert_low: "⚠️",
} as const;

export const singleEmoji = "⚠️" as const;

export const tuple = ["⚠️", "日本語"] as const;

export function returnsEmoji(): "⚠️" {
    return "⚠️";
}

export const templateEmoji = `⚠️` as const;

export const templateObj = {
    alert: `⚠️`,
    greet: `日本語`,
} as const;

export const speaker = (msg: string) => [`🔈`, `🔈 ${msg}`] as const;
