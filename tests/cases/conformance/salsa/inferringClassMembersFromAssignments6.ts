// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: inferringClassMembersFromAssignments6.js
function Foonly() {
    var self = this
    self.x = 1
    self.m = function() {
        console.log(self.x)
    }
}
Foonly.prototype.mreal = function() {
    var self = this
    self.y = 2
}
const foo = new Foonly()
foo.x
foo.y
foo.m()
