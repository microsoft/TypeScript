// @allowjs: true
// @outDir: ../
// @filename: File.js
class Parent {
    initialize() {
        super.initialize(...arguments)
        return this.asdf = ''
    }
  }

class Child extends Parent {
    initialize() {
    }
}