// Generated by CoffeeScript 1.8.0
(function() {
  var $, $$, Larry, Main, Pref, Test, app, empty, log, make, test, type,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app = {};

  log = console.log.bind(console);

  type = function(x) {
    return {}.toString.call(x).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
  };

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
    Main.prototype.toString = function() {
      return '[object Main]';
    };

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
    Pref.prototype.toString = function() {
      return '[object Pref]';
    };

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
      this.id = opt.id;
      if (app.prefs == null) {
        app.prefs = new Larry;
      }
      app.prefs.push(this);
      log('Constructed a Pref instance!');
    }

    return Pref;

  })();

  Test = (function() {
    Test.prototype.toString = function() {
      return '[object Test]';
    };

    Test.prototype.jobs = [];

    function Test(opt) {
      if (opt == null) {
        opt = {};
      }
      this.run = __bind(this.run, this);
    }

    Test.prototype.run = function() {
      var actual, double, expect, job, md, name, result, runner, _i, _len, _ref;
      md = ['<a href="#end" id="top">\u2b07</a>'];
      double = null;
      _ref = this.jobs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        job = _ref[_i];
        switch (type(job)) {
          case 'function':
            double = job(double);
            break;
          case 'string':
            md.push(job);
            break;
          case 'array':
            runner = job[0], name = job[1], expect = job[2], actual = job[3];
            result = runner(expect, actual, double);
            if (!result) {
              md.push("\u2714 " + name + "  ");
            } else {
              md.push("\u2718 " + name + "  ");
              md.push("    " + result + "  ");
            }
        }
      }
      md.push('\n<a href="#top" id="end">\u2b06</a>');
      return md.join('\n');
    };

    Test.prototype.section = function(text) {
      return this.jobs.push(("\n\n" + text + "\n-") + (new Array(text.length).join('-')) + '\n');
    };

    Test.prototype.custom = function(tests, runner) {
      var i, test, _i, _len;
      for (i = _i = 0, _len = tests.length; _i < _len; i = ++_i) {
        test = tests[i];
        if ('function' === type(test)) {
          this.jobs.push(test);
        } else {
          this.jobs.push([runner, test, tests[++_i], tests[++_i]]);
        }
      }
      return this.jobs.push('- - -');
    };

    Test.prototype.fail = function(result, delivery, expect, types) {
      if (types) {
        result = "" + result + " (" + (type(result)) + ")";
        expect = "" + expect + " (" + (type(expect)) + ")";
      }
      return "" + result + "\n    ...was " + delivery + ", but expected...\n    " + expect;
    };

    Test.prototype.throws = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error;
          error = false;
          try {
            actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (!error) {
            return "No exception thrown, expected...\n    " + expect;
          } else if (expect !== error) {
            return _this.fail(error, 'thrown', expect);
          }
        };
      })(this));
    };

    Test.prototype.eq = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error, result;
          error = false;
          try {
            result = actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (error) {
            return "Unexpected exception...\n    " + error;
          } else if (expect !== result) {
            return _this.fail(result, 'returned', expect, result + '' === expect + '');
          }
        };
      })(this));
    };

    Test.prototype.is = function(tests) {
      return this.custom(tests, (function(_this) {
        return function(expect, actual, double) {
          var e, error, result;
          error = false;
          try {
            result = actual(double);
          } catch (_error) {
            e = _error;
            error = e.message;
          }
          if (error) {
            return "Unexpected exception...\n    " + error;
          } else if (expect !== type(result)) {
            return _this.fail("type " + result, 'returned', "type " + expect);
          }
        };
      })(this));
    };

    return Test;

  })();

  window.VeroSynth = Main;

  test = new Test;

  Main.test = test.run;

  test.section("Larry constructor exceptions");

  test.throws([
    "new Larry 'foo'", "'opt' is type 'string', not 'object'", function() {
      return new Larry('foo');
    }
  ]);

  test.section("Larry `push()` exceptions");

  test.throws([
    function() {
      return new Larry;
    }, "Push null", "'obj' is null", function(larry) {
      return larry.push(null);
    }, "Push nothing", "'obj' is type 'undefined', not 'object'", function(larry) {
      return larry.push();
    }, "Push a number", "'obj' is type 'number', not 'object'", function(larry) {
      return larry.push(123);
    }, "Push an empty object", "[object Object] `id` is missing", function(larry) {
      return larry.push({});
    }, "Push an id number 1", "[object Object] `id` is type 'number', not 'string'", function(larry) {
      return larry.push({
        id: 1
      });
    }, "Push an id string '1'", "[object Object] `id` '1' fails /^[a-z][-a-z0-9]+$/", function(larry) {
      return larry.push({
        id: '1'
      });
    }, "Push an id string 'a'", "[object Object] `id` 'a' fails /^[a-z][-a-z0-9]+$/", function(larry) {
      return larry.push({
        id: 'a'
      });
    }, function(larry) {
      larry.push({
        id: 'a1'
      });
      return larry;
    }, "Push a duplicate id", "Duplicate [object Object] `id` 'a1'", function(larry) {
      return larry.push({
        id: 'a1'
      });
    }
  ]);

  test.section("Larry 'push()' usage");

  test.eq([
    function() {
      return new Larry;
    }, "Retrieve payload", 55, function(larry) {
      larry.push({
        id: 'id1',
        payload: 55
      });
      return larry.id1.payload;
    }, "Count two objects", 2, function(larry) {
      larry.push({
        id: 'id2'
      });
      return larry.length;
    }
  ]);

  test.section("Main constructor exceptions");

  test.throws([
    "new Main 1", "'opt' is type 'number', not 'object'", function() {
      return new Main(1);
    }
  ]);

  test.section("Pref constructor exceptions");

  test.throws([
    "new Pref()", "[object Pref] `id` is missing", function() {
      return new Pref();
    }, "new Pref true", "'opt' is type 'boolean', not 'object'", function() {
      return new Pref(true);
    }
  ]);

  test.section("Pref constructor usage");

  test.eq([
    function() {
      app.prefs = new Larry;
      return new Pref({
        id: 'pref1'
      });
    }, "new Pref is recorded in `app.prefs`", true, function(pref) {
      return pref === app.prefs.pref1;
    }
  ]);

}).call(this);