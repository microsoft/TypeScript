// @strict: true

type MaybeClosable = {
  close?: () => {};
};

declare const maybe: MaybeClosable;
void maybe.close?.()
