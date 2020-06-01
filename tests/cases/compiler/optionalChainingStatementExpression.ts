// @strict: true

type MaybeClosable = {
  close?: () => {};
};
type PerhapsMaybe = {
  maybe?: MaybeClosable;
}
type PossiblyPerhapsMaybe = {
  possibly?: PerhapsMaybe;
}

declare const maybe: MaybeClosable;
maybe.close?.()
const a = maybe.close?.()

declare const perhaps: PerhapsMaybe;
perhaps.maybe?.close?.();
const b = perhaps.maybe?.close?.();

declare const poss: PossiblyPerhapsMaybe;
function closeIfYouWant() {
  poss.possibly?.maybe?.close?.();
  return poss.possibly?.maybe?.close?.();
}
