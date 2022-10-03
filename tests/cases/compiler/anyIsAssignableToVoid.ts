interface P {
    p: void;
}

interface Q extends P { // check assignability here. any is assignable to void.
    p: any;
}