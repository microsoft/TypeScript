// @declaration: true
export const Color = {
    Red: "Red",
    Green: "Green",
    Blue: "Blue"
} as const

export type Color = typeof Color
export type Colors = Color[keyof Color]