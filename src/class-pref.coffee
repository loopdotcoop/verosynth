class Pref
  constructor: (opt={}) ->
    if null == opt then throw new Error "'opt' is null"
    if 'object' != typeof opt then throw new Error "
      'opt' is type '#{typeof opt}', not 'object'"
    log 'Constructed a Pref instance!'

