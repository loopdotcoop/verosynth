Main.test = (add) ->
  @items ?= []
  results = []
  if add
    @items.push add
  else
    for item in @items
      if 'string' == typeof item
        results.push item + '\n-' + ( new Array(item.length).join '-' ) + '\n'
      else
        for name,fn of item
          [ runner, expect, subject ] = fn(new Main); # prepare the test
          result = runner(subject, expect) # run the test
          if ! result
            results.push "✔ #{name}  "
          else
            results.push "✘ #{name}  "
            results.push "    #{result}  "
        results.push '\n'

    results.join '\n'


Main.throws = (subject, expect) ->
  err = false
  try subject(); catch e then err = e.message
  if ! err
    "No exception thrown, expected...\n    #{expect}"
  else if expect != err
    "#{err}\n    ...was thrown, but expected...\n    #{expect}"


Main.eq = (subject, expect) ->
  err = false
  try result = subject(); catch e then err = e.message
  if err
    "Unexpected exception...\n    #{err}"
  else if expect != result
    if result + '' == expect + ''
      "#{result} (#{typeof result})\n    ...was returned, but expected...\n    #{expect} (#{typeof expect})"
    else
      "#{result}\n    ...was returned, but expected...\n    #{expect}"


Main.is = (subject, expect) ->
  err = false
  try result = subject(); catch e then err = e.message
  if err
    "Unexpected exception...\n    #{err}"
  else if expect != typeof result
    "type #{typeof result}\n    ...was returned, but expected...\n    type #{expect}"


