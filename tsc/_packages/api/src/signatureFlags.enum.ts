export enum SignatureFlags {
    None = 0,
    HasRestParameter = 1 << 0,
    HasLiteralTypes = 1 << 1,
    Construct = 1 << 2,
    Abstract = 1 << 3,
}
