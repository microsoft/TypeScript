// @strict: true
// @noEmit: true

enum AutomationMode {
    NONE = "",
    TIME = "time",
    SYSTEM = "system",
    LOCATION = "location",
}

interface ThemePreset {
    id: string;
}

interface Automation {
    mode: AutomationMode;
}

interface UserSettings {
    presets: ThemePreset[];
    automation: Automation;
}

interface ExtensionData {
    settings: UserSettings;
}

export function getMockData(): ExtensionData {
    return {
        settings: {
            presets: [],
            automation: {
                mode: "",
            },
        } as UserSettings,
    }
}
