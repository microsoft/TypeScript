// @strict: true
// @noEmit: true

class A {
  next: A | null = null;

  constructor(readonly children: (A | null)[]) {}
}

function getNodes(): A[] {
  const out: A[] = [];

  let current: A | null = new A([]);

  while (current !== null) {
    let firstChild = null;

    if (out.length) {
      current = current.next;
      continue;
    }

    for (let i = 0; i < current.children.length; i++) {
      const child = current.children[i];

      if (child) {
        if (!firstChild) {
          firstChild = child;
          firstChild.next = current.next;
        }

        child.next = current.next;
      }
    }

    current = firstChild || current.next;
  }

  return out;
}