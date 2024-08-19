// https://github.com/microsoft/TypeScript/issues/59652

declare function mutuallyEnabledPair(): {
    discriminator: true,
    value: string,
  } | {
    discriminator: false,
    value: null | undefined,
  }
  
  
export const { discriminator, value: value59652 } = mutuallyEnabledPair()

if (discriminator) {
   value59652;
}