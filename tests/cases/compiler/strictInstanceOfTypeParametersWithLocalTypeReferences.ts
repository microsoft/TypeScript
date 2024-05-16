// @strictInstanceOfTypeParameters: true

class Box<T> {
    value: T;
}

class BoxBox<T, B extends Box<T>> {
    box: B;
}

declare const bb: any;
if (bb instanceof BoxBox) {
    bb.box.value;
}
