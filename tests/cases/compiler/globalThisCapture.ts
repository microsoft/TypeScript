// Add a lambda to ensure global 'this' capture is triggered
(()=>this.window);

var parts = [];

// Ensure that the generated code is correct
parts[0];
