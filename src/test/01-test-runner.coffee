Main.test = (add) ->
  @items ?= []
  results = []
  mock = null
  if add
    @items.push add
  else
    for item in @items
      switch typeof item
        when 'string'
          results.push item + '\n-' + ( new Array(item.length).join '-' ) + '\n'
        when 'function'
          mock = item()
        when 'object'
          for name,fn of item
            [ runner, expect, actual ] = fn(mock); # prepare the test
            result = runner(actual, expect) # run the test
            if ! result
              results.push "✔ #{name}  "
            else
              results.push "✘ #{name}  "
              results.push "    #{result}  "
          results.push '\n'

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


