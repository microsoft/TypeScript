function getSecurity(level) {
    switch(level){
        case 0: // Zero
        case 1: // one
        case 2: // two
            // Leading comments
            return "Hi";
        case 3: // three
        case 4: // four
            return "hello";
        case 5: // five
        default: // default
            return "world";
        // Comment After
    } /*Comment 1*/ // Comment After 1
    // Comment After 2
}