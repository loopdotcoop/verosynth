// Generated by CoffeeScript 1.8.0
(function() {
  var $, $$, Larry, Main, Pref, empty, log, make,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  log = console.log.bind(console);

  $ = document.querySelector.bind(document);

  $$ = document.querySelectorAll.bind(document);

  make = function(tag, attr, inner) {
    var el, k, v;
    el = document.createElement(tag);
    for (k in attr) {
      v = attr[k];
      if ('_' !== k.substr(0, 1)) {
        el.setAttribute(k, v);
      }
    }
    if (inner) {
      el.innerHTML = inner;
    }
    return el;
  };

  empty = function(node) {
    var _results;
    _results = [];
    while (node.hasChildNodes()) {
      _results.push(node.removeChild(node.lastChild));
    }
    return _results;
  };

  Larry = (function(_super) {
    __extends(Larry, _super);

    function Larry(opt) {
      if (opt == null) {
        opt = {};
      }
      if (null === opt) {
        throw new Error("'opt' is null");
      }
      if ('object' !== typeof opt) {
        throw new Error("'opt' is type '" + (typeof opt) + "', not 'object'");
      }
    }

    Larry.prototype.push = function(obj) {
      var idrx;
      idrx = /^[a-z][-a-z0-9]+$/;
      if (null === obj) {
        throw new Error("'obj' is null");
      }
      if ('object' !== typeof obj) {
        throw new Error("'obj' is type '" + (typeof obj) + "', not 'object'");
      }
      if ('undefined' === typeof obj.id) {
        throw new Error("" + obj + " `id` is missing");
      }
      if ('string' !== typeof obj.id) {
        throw new Error("" + obj + " `id` is type '" + (typeof obj.id) + "', not 'string'");
      }
      if (!idrx.test(obj.id)) {
        throw new Error("" + obj + " `id` '" + obj.id + "' fails " + idrx);
      }
      if (this[obj.id]) {
        throw new Error("Duplicate " + obj + " `id` '" + obj.id + "'");
      }
      this[obj.id] = obj;
      return Larry.__super__.push.call(this, obj);
    };

    return Larry;

  })(Array);

  Main = (function() {
    function Main(opt) {
      if (opt == null) {
        opt = {};
      }
      if (null === opt) {
        throw new Error("'opt' is null");
      }
      if ('object' !== typeof opt) {
        throw new Error("'opt' is type '" + (typeof opt) + "', not 'object'");
      }
      log('Constructed a Main instance!');
    }

    return Main;

  })();

  Pref = (function() {
    function Pref(opt) {
      if (opt == null) {
        opt = {};
      }
      if (null === opt) {
        throw new Error("'opt' is null");
      }
      if ('object' !== typeof opt) {
        throw new Error("'opt' is type '" + (typeof opt) + "', not 'object'");
      }
      log('Constructed a Pref instance!');
    }

    return Pref;

  })();

  window.VisualSynth = Main;

  Main.test = function(add) {
    var actual, expect, fn, job, mock, name, result, results, runner, _i, _len, _ref, _ref1;
    if (this.jobs == null) {
      this.jobs = [];
    }
    results = [];
    mock = null;
    if (add) {
      return this.jobs.push(add);
    }
    _ref = this.jobs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      job = _ref[_i];
      switch (typeof job) {
        case 'string':
          results.push(("\n\n" + job + "\n-") + (new Array(job.length).join('-')) + '\n');
          break;
        case 'function':
          mock = job();
          break;
        case 'object':
          for (name in job) {
            fn = job[name];
            _ref1 = fn(mock), runner = _ref1[0], expect = _ref1[1], actual = _ref1[2];
            result = runner(actual, expect);
            if (!result) {
              results.push("✔ " + name + "  ");
            } else {
              results.push("✘ " + name + "  ");
              results.push("    " + result + "  ");
            }
          }
      }
    }
    return results.join('\n');
  };

  Main.throws = function(actual, expect) {
    var e, err;
    err = false;
    try {
      actual();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (!err) {
      return "No exception thrown, expected...\n    " + expect;
    } else if (expect !== err) {
      return "" + err + "\n    ...was thrown, but expected...\n    " + expect;
    }
  };

  Main.eq = function(actual, expect) {
    var e, err, result;
    err = false;
    try {
      result = actual();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (err) {
      return "Unexpected exception...\n    " + err;
    } else if (expect !== result) {
      if (result + '' === expect + '') {
        return "" + result + " (" + (typeof result) + ")\n    ...was returned, but expected...\n    " + expect + " (" + (typeof expect) + ")";
      } else {
        return "" + result + "\n    ...was returned, but expected...\n    " + expect;
      }
    }
  };

  Main.is = function(actual, expect) {
    var e, err, result;
    err = false;
    try {
      result = actual();
    } catch (_error) {
      e = _error;
      err = e.message;
    }
    if (err) {
      return "Unexpected exception...\n    " + err;
    } else if (expect !== typeof result) {
      return "type " + (typeof result) + "\n    ...was returned, but expected...\n    type " + expect;
    }
  };

  Main.test("Larry Constructor exceptions");

  Main.test({
    "new Larry 'foo'": function(mock) {
      return [
        Main.throws, "'opt' is type 'string', not 'object'", function() {
          return new Larry('foo');
        }
      ];
    }
  });

  Main.test("Larry 'push()' exceptions");

  Main.test(function() {
    return new Larry;
  });

  Main.test({
    "Push null": function(mock) {
      return [
        Main.throws, "'obj' is null", function() {
          return mock.push(null);
        }
      ];
    },
    "Push nothing": function(mock) {
      return [
        Main.throws, "'obj' is type 'undefined', not 'object'", function() {
          return mock.push();
        }
      ];
    },
    "Push a number": function(mock) {
      return [
        Main.throws, "'obj' is type 'number', not 'object'", function() {
          return mock.push(123);
        }
      ];
    },
    "Push an empty object": function(mock) {
      return [
        Main.throws, "[object Object] `id` is missing", function() {
          return mock.push({});
        }
      ];
    },
    "Push an id number 1": function(mock) {
      return [
        Main.throws, "[object Object] `id` is type 'number', not 'string'", function() {
          return mock.push({
            id: 1
          });
        }
      ];
    },
    "Push an id string '1'": function(mock) {
      return [
        Main.throws, "[object Object] `id` '1' fails /^[a-z][-a-z0-9]+$/", function() {
          return mock.push({
            id: '1'
          });
        }
      ];
    },
    "Push an id string 'a'": function(mock) {
      return [
        Main.throws, "[object Object] `id` 'a' fails /^[a-z][-a-z0-9]+$/", function() {
          return mock.push({
            id: 'a'
          });
        }
      ];
    },
    "Push a duplicate id": function(mock) {
      mock.push({
        id: 'a1'
      });
      return [
        Main.throws, "Duplicate [object Object] `id` 'a1'", function() {
          return mock.push({
            id: 'a1'
          });
        }
      ];
    }
  });

  Main.test("Larry 'push()' usage");

  Main.test(function() {
    return new Larry;
  });

  Main.test({
    "Retrieve payload": function(mock) {
      return [
        Main.eq, 55, function() {
          mock.push({
            id: 'id1',
            payload: 55
          });
          return mock.id1.payload;
        }
      ];
    },
    "Count two objects": function(mock) {
      return [
        Main.eq, 2, function() {
          mock.push({
            id: 'id2'
          });
          return mock.length;
        }
      ];
    }
  });

  Main.test("Main Constructor exceptions");

  Main.test({
    "new Main 1": function(mock) {
      return [
        Main.throws, "'opt' is type 'number', not 'object'", function() {
          return new Main(1);
        }
      ];
    }
  });

  Main.test("Pref Constructor exceptions");

  Main.test({
    "new Pref true": function(mock) {
      return [
        Main.throws, "'opt' is type 'boolean', not 'object'", function() {
          return new Pref(true);
        }
      ];
    }
  });

}).call(this);
