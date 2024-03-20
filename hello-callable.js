'use strict'

class Callable extends Function {
  constructor() {
    // We create a new Function object using `super`, with a `this` reference
    // to itself (the Function object) provided by binding it to `this`,
    // then returning the bound Function object (which is a wrapper around the
    // the original `this`/Function object). We then also have to store
    // a reference to the bound Function object, as `_bound` on the unbound `this`,
    // so the bound function has access to the new bound object.
    // Pro: Works well, doesn't rely on deprecated features.
    // Con: A little convoluted, and requires wrapping `this` in a bound object.
    
    super('...args', 'return this._bound._call(...args)')
    // Or without the spread/rest operator:
    // super('return this._bound._call.apply(this._bound, arguments)')
    this._bound = this.bind(this)

    this._bound.person = 'Hank'
    return this._bound
  }
}

class ArrayFunction extends Callable {
  constructor(...a) {
    super()
    this.array = a
  }

  _call(arg) {
    let result = this.array[arg];

    if (typeof result === 'function') {
      return result.bind(this.array);
    }
    return result || null;
  }

}


var af = new ArrayFunction(4,9,7)

console.log(af(0));
console.log(af("length"));
console.log(af.array.concat(8))

// Method and prop access is maintained.
//console.log('Method and prop access is maintained:')
//console.log(obj1.person);
//console.log(obj1.suffix('Venture'));

/*
console.log(obj1('Venture'))

// Inheritance is correctly maintained.
console.log('\nInheritance is maintained:')
console.log(obj1 instanceof Function)  // true
console.log(obj1 instanceof Callable)  // true
console.log(obj1 instanceof AnotherCallable)  // true
*/