function makeResource(identifier: string): string {
    return identifier;
}
export const resourceObject: {
    readonly Label: string;
    readonly Button: string;
} = {
    Label: makeResource("Label"),
    Button: makeResource("Label")
} as const;
const resourceObject2 = {
    Label: makeResource("Label"),
    Button: makeResource("Label")
} as const;
export const nestedObjects: {
    nested: {
        Label: string;
        Button: string;
    };
} = {
    nested: {
        Label: makeResource("Label"),
        Button: makeResource("Label")
    }
};
const nestedObjects2 = {
    nested: {
        Label: makeResource("Label"),
        Button: makeResource("Label")
    }
};
