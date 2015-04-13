if (true) {
    let x;
    if (true) {
        var x = 0; // Error
        var { x = 0 } = { x: 0 }; // Error
        var { x: x = 0 } = { x: 0 }; // Error
        var { x } = { x: 0 }; // Error
        var { x: x } = { x: 0 }; // Error
    }
}