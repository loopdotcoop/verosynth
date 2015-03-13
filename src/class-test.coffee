class Test
  toString: -> '[object Test]'

  jobs: []

  constructor: (opt={}) ->


  # Run the tests and return the result
  run: =>
    md = ['<a href="#end" id="top">\u2b07</a>'] # Unicode DOWNWARDS BLACK ARROW
    double = null
    for job in @jobs
      switch type job
        when 'function' # replace the previous `double`
          double = job(double)
        when 'string'   # eg a '- - -' rule or a section heading
          md.push job
        when 'array'    # tests in the form `[ runner, name, expect, actual ]`
          [ runner, name, expect, actual ] = job # dereference
          result = runner(expect, actual, double) # run the test
          if ! result
            md.push "\u2714 #{name}  " # Unicode HEAVY CHECK MARK
          else
            md.push "\u2718 #{name}  " # Unicode HEAVY BALLOT X
            md.push "    #{result}  "

    # Return the result as a string
    md.push '\n<a href="#top" id="end">\u2b06</a>' # Unicode UPWARDS BLACK ARROW
    md.join '\n'


  # Add a section heading
  section: (text) ->
    @jobs.push "\n\n#{text}\n-" + ( new Array(text.length).join '-' ) + '\n'


  # Schedule a custom test
  custom: (tests, runner) ->
    for test,i in tests
      if 'function' == type test
        @jobs.push test
      else
        @jobs.push [
          runner      # <function>  runner  Function which will run the test
          test        # <string>    name    A short description of the test
          tests[++_i] # <mixed>     expect  Defines a successful test
          tests[++_i] # <function>  actual  Produces the result to test
        ]
    @jobs.push '- - -' # http://daringfireball.net/projects/markdown/syntax#hr


  # Format a typical fail message
  fail: (result, delivery, expect, types) ->
    if types
      result = "#{result} (#{type result})"
      expect = "#{expect} (#{type expect})"
    "#{result}\n    ...was #{delivery}, but expected...\n    #{expect}"


  # Expect `actual()` to throw an exception
  throws: (tests) ->
    @custom tests, (expect, actual, double) =>
      error = false
      try actual(double) catch e then error = e.message
      if ! error
        "No exception thrown, expected...\n    #{expect}"
      else if expect != error
        @fail error, 'thrown', expect


  # Expect `actual()` and `expect` to be equal
  eq: (tests) ->
    @custom tests, (expect, actual, double) =>
      error = false
      try result = actual(double) catch e then error = e.message
      if error
        "Unexpected exception...\n    #{error}"
      else if expect != result
        @fail result, 'returned', expect, (result + '' == expect + '')


  # Expect `type( actual() )` to be `expect` (note that `typeof` is not used)
  is: (tests) ->
    @custom tests, (expect, actual, double) =>
      error = false
      try result = actual(double) catch e then error = e.message
      if error
        "Unexpected exception...\n    #{error}"
      else if expect != type result
        @fail "type #{result}", 'returned', "type #{expect}"



