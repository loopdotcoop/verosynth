Main.test = (add) ->
  @jobs ?= []
  results = []
  mock = null
  if add
    return @jobs.push add
  for job in @jobs
    switch typeof job
      when 'string'
        results.push "\n\n#{job}\n-" + ( new Array(job.length).join '-' ) + '\n'
      when 'function'
        mock = job()
      when 'object'
        for name,fn of job
          [ runner, expect, actual ] = fn(mock); # prepare the test
          result = runner(actual, expect) # run the test
          if ! result
            results.push "✔ #{name}  "
          else
            results.push "✘ #{name}  "
            results.push "    #{result}  "
  results.join '\n'


Main.throws = (actual, expect) ->
  err = false
  try actual(); catch e then err = e.message
  if ! err
    "No exception thrown, expected...\n    #{expect}"
  else if expect != err
    "#{err}\n    ...was thrown, but expected...\n    #{expect}"


Main.eq = (actual, expect) ->
  err = false
  try result = actual(); catch e then err = e.message
  if err
    "Unexpected exception...\n    #{err}"
  else if expect != result
    if result + '' == expect + ''
      "#{result} (#{typeof result})\n    ...was returned, but expected...\n    #{expect} (#{typeof expect})"
    else
      "#{result}\n    ...was returned, but expected...\n    #{expect}"


Main.is = (actual, expect) ->
  err = false
  try result = actual(); catch e then err = e.message
  if err
    "Unexpected exception...\n    #{err}"
  else if expect != typeof result
    "type #{typeof result}\n    ...was returned, but expected...\n    type #{expect}"


