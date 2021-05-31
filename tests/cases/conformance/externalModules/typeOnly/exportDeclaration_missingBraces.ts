// @noEmit: true
// @noTypesAndSymbols: true

enum Numbers {
  One,
  Two
}

class Box<T> {}

interface Circle {}

namespace ns {
  export type T; // Normal parse error because there is no other 'T'
}

export type Numbers;
export type Box;
export type Circle;
export type ns;
