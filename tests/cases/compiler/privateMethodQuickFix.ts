// Test case for private method quick fix issue

class Bar {
    bar() {
        this._baz(123);  // calling a private method that doesn't exist
    }
    
    // When this._baz is missing, quick fix should offer to add a private method
}