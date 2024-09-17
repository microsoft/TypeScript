// @strict: true, false
// @noEmit: true

export function prepareConfig({
    additionalFiles: {
        json = []
    } = {}
}: {
  additionalFiles?: Partial<Record<"json" | "jsonc" | "json5", string[]>>;
} = {}) {
    json // string[]
}

export function prepareConfigWithoutAnnotation({
    additionalFiles: {
        json = []
    } = {}
} = {}) {
    json
}

export const prepareConfigWithContextualSignature: (param:{
  additionalFiles?: Partial<Record<"json" | "jsonc" | "json5", string[]>>;
}) => void = ({
    additionalFiles: {
        json = []
    } = {}
} = {}) => {
    json // string[]
}
