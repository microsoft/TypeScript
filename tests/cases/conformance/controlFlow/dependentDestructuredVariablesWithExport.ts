// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59652

declare function mutuallyEnabledPair(): {
    discriminator: true,
    value: string,
  } | {
    discriminator: false,
    value: null | undefined,
  }
  
  
export const { discriminator, value } = mutuallyEnabledPair()

if (discriminator) {
  value;
}