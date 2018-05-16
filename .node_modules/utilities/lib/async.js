/*
 * Utilities: A classic collection of JavaScript utilities
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var async = {};

/*
AsyncChain -- performs a list of asynchronous calls in a desired order.
Optional "last" method can be set to run after all the items in the
chain have completed.

  // Example usage
  var asyncChain = new async.AsyncChain([
    {
      func: app.trainToBangkok,
      args: [geddy, neil, alex],
      callback: null, // No callback for this action
    },
    {
      func: fs.readdir,
      args: [geddy.config.dirname + '/thailand/express'],
      callback: function (err, result) {
        if (err) {
          // Bail out completely
          arguments.callee.chain.abort();
        }
        else if (result.theBest) {
          // Don't run the next item in the chain; go directly
          // to the 'last' method.
          arguments.callee.chain.shortCircuit();
        }
        else {
          // Otherwise do some other stuff and
          // then go to the next link
        }
      }
    },
    {
      func: child_process.exec,
      args: ['ls ./'],
      callback: this.hitTheStops
    }
  ]);

  // Function to exec after all the links in the chain finish
  asyncChain.last = function () { // Do some final stuff };

  // Start the async-chain
  asyncChain.run();

*/
async.execNonBlocking = function (func) {
  if (typeof process != 'undefined' && typeof process.nextTick == 'function') {
    process.nextTick(func);
  }
  else {
    setTimeout(func, 0);
  }
};

async.AsyncBase = new (function () {

  this.init = function (chain) {
    var item;
    this.chain = [];
    this.currentItem = null;
    this.shortCircuited = false;
    this.shortCircuitedArgs = undefined;
    this.aborted = false;

    for (var i = 0; i < chain.length; i++) {
      item = chain[i];
      this.addItem(item);
    }
  };

  this.addItem = function(item) {
    this.chain.push(new async.AsyncCall(
      item.func, item.args || [], item.callback, item.context));
  };

  // alias
  this.push = this.addItem;

  this.runItem = function (item) {
    // Reference to the current item in the chain -- used
    // to look up the callback to execute with execCallback
    this.currentItem = item;
    // Scopage
    var _this = this;
    // Pass the arguments passed to the current async call
    // to the callback executor, execute it in the correct scope
    var executor = function () {
      _this.execCallback.apply(_this, arguments);
    };
    // Append the callback executor to the end of the arguments
    // Node helpfully always has the callback func last
    var args = item.args.concat(executor);
    var func = item.func;
    // Run the async call
    func.apply(item.context, args);
  };

  this.next = function () {
    if (this.chain.length) {
      this.runItem(this.chain.shift());
    }
    else {
      this.last();
    }
  };

  this.execCallback = function () {
    // Look up the callback, if any, specified for this async call
    var callback = this.currentItem.callback;
    // If there's a callback, do it
    if (callback && typeof callback == 'function') {
      // Allow access to the chain from inside the callback by setting
      // callback.chain = this, and then using arguments.callee.chain
      callback.chain = this;
      callback.apply(this.currentItem.context, arguments);
    }

    this.currentItem.finished = true;

    // If one of the async callbacks called chain.shortCircuit,
    // skip to the 'last' function for the chain
    if (this.shortCircuited) {
      this.last.apply(null, this.shortCircuitedArgs);
    }
    // If one of the async callbacks called chain.abort,
    // bail completely out
    else if (this.aborted) {
      return;
    }
    // Otherwise run the next item, if any, in the chain
    // Let's try not to block if we don't have to
    else {
      // Scopage
      var _this = this;
      async.execNonBlocking(function () { _this.next.call(_this); });
    }
  }

  // Short-circuit the chain, jump straight to the 'last' function
  this.shortCircuit = function () {
    this.shortCircuitedArgs = arguments;
    this.shortCircuited = true;
  }

  // Stop execution of the chain, bail completely out
  this.abort = function () {
    this.aborted = true;
  }

  // Kick off the chain by grabbing the first item and running it
  this.run = this.next;

  // Function to run when the chain is done -- default is a no-op
  this.last = function () {};

})();

async.AsyncChain = function (chain) {
  this.init(chain);
};

async.AsyncChain.prototype = async.AsyncBase;

async.AsyncGroup = function (group) {
  var item;
  var callback;
  var args;

  this.group = [];
  this.outstandingCount = 0;

  for (var i = 0; i < group.length; i++) {
    item = group[i];
    this.group.push(new async.AsyncCall(
        item.func, item.args, item.callback, item.context));
    this.outstandingCount++;
  }

};

/*
Simpler way to group async calls -- doesn't ensure completion order,
but still has a "last" method called when the entire group of calls
have completed.
*/
async.AsyncGroup.prototype = new function () {
  this.run = function () {
    var _this = this
      , group = this.group
      , item
      , createItem = function (item, args) {
          return function () {
            item.func.apply(item.context, args);
          };
        }
      , createCallback = function (item) {
          return function () {
            if (item.callback) {
              item.callback.apply(null, arguments);
            }
            _this.finish.call(_this);
          }
        };

    for (var i = 0; i < group.length; i++) {
      item = group[i];
      callback = createCallback(item);
      args = item.args.concat(callback);
      // Run the async call
      async.execNonBlocking(createItem(item, args));
    }
  };

  this.finish = function () {
    this.outstandingCount--;
    if (!this.outstandingCount) {
      this.last();
    };
  };

  this.last = function () {};

};

var _createSimpleAsyncCall = function (func, context) {
  return {
    func: func
  , args: []
  , callback: function () {}
  , context: context
  };
};

async.SimpleAsyncChain = function (funcs, context) {
  var chain = [];
  for (var i = 0, ii = funcs.length; i < ii; i++) {
    chain.push(_createSimpleAsyncCall(funcs[i], context));
  }
  this.init(chain);
};

async.SimpleAsyncChain.prototype = async.AsyncBase;

async.AsyncCall = function (func, args, callback, context) {
  this.func = func;
  this.args = args;
  this.callback = callback || null;
  this.context = context || null;
};

async.Initializer = function (steps, callback) {
  var self = this;
  this.steps = {};
  this.callback = callback;
  // Create an object-literal of the steps to tick off
  steps.forEach(function (step) {
    self.steps[step] = false;
  });
};

async.Initializer.prototype = new (function () {
  this.complete = function (step) {
    var steps = this.steps;
    // Tick this step off
    steps[step] = true;
    // Iterate the steps -- if any are not done, bail out
    for (var p in steps) {
      if (!steps[p]) {
        return false;
      }
    }
    // If all steps are done, run the callback
    this.callback();
  };
})();

module.exports = async;

