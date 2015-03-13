class Larry extends Array
  constructor: (opt={}) ->
    if null == opt then throw new Error "'opt' is null"
    if 'object' != typeof opt then throw new Error "
      'opt' is type '#{typeof opt}', not 'object'"

  push: (obj) ->
    idrx = /^[a-z][-a-z0-9]+$/
    if null == obj then throw new Error "'obj' is null"
    if 'object' != typeof obj       then throw new Error "
      'obj' is type '#{typeof obj}', not 'object'"
    if 'undefined' == typeof obj.id then throw new Error "
      #{obj} `id` is missing"
    if 'string' != typeof obj.id    then throw new Error "
      #{obj} `id` is type '#{typeof obj.id}', not 'string'"
    if ! idrx.test obj.id           then throw new Error "
      #{obj} `id` '#{obj.id}' fails #{idrx}"
    if @[obj.id]                    then throw new Error "
      Duplicate #{obj} `id` '#{obj.id}'"

    @[obj.id] = obj
    super obj


