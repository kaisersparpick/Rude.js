# Rude.js

**Rude.js** is a JavaScript implementation of the *rule-based control-flow pattern* [Rude](https://github.com/kaisersparpick/Rude).


## Usage

#### Creating an instance
```js
var rude = new Rude();
```
The constructor accepts an optional parameter for the default scope. Callbacks with no explicit binding will use this default when invoked.
```js
var c = new SomeClass();
var rude = new Rude(c);
```
#### Adding a rule

```js
rude.addRule(condition, yesCallback, noCallback);
```

`addRule` accepts three arguments: the condition to check, the function to call when the result is true, and the function to call when it is false. Each argument can be a function or `undefined`.

To set the desired value of `this`, use the `.bind()` method

```js
rude.addRule(someFunction, SomeClass.staticMethod, obj.instanceMethod.bind(obj));
```

When a condition returns `null`, Rude exits the condition chain. In this case, the yes and no callbacks are not necessary, therefore they can be left empty -- i.e. `undefined`. These conditions are usually exit points.
```js
rude.addRule(someFunction);
```
Rules do not have to be added in linear order. The rules themselves determine the order the conditions are checked in. 
Rude automatically generates a key for each rule based on the condition callback name -- therefore callback function names must be unique. 

#### Checking conditions

Checking conditions based on the applied rules is triggered by calling `rude.check()` with a function. `rude.check()` returns true when finished.

```js
rude.check(someFunction);
```

This specifies the entry point in the condition chain and can be set to any valid rule condition.

See a full application in the **examples** folder.

## Benefits

  - Rude allows for an on-demand execution of a chain of `dynamic if-then-else` statements - hereinafter referred to as `rules`.
  - The control flow is easy to manage and the logic can be modified by simply changing the callbacks in the `rules`.
  - The chain of condition checking can be exited or paused at any given point.
  - The position in the `rule` hierarchy can be stored and the execution resumed at a later stage by setting the `entry point`. 
  - Each `rule` is seen as a separate and *independent logical unit*.
  - Individual `rules` and groups of rules can be easily moved around.
  - `Rules` can be generated dynamically or loaded from a datasource. 
  - The dispatcher makes it possible to ditch the rigid static conditional model in favour of a considerably more flexible one.
