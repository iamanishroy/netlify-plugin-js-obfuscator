# netlify-plugin-js-obfuscator

A Netlify Build plugin to extract and obfuscate your JavaScript Source Code, which provide protection for your source code. [JS Obfuscator](https://github.com/iamanishroy/netlify-plugin-js-obfuscator), built on top of the [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator). 
JavaScript Obfuscator is a powerful free obfuscator for JavaScript, containing a variety of features which provide protection for your source code.

**Key features:**

- variables renaming
- strings extraction and encryption
- dead code injection
- control flow flattening
- various code transformations

The example of obfuscated code: [github.com](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/examples/javascript-obfuscator.js)

## :warning: Important

As describe in the [`javascript-obfuscator` package](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/README.md#warning-important), code obfuscation may impact your website's performance.

## Usage and inputs

To install the plugin in the Netlify UI, use this [direct in-app installation link](https://app.netlify.com/plugins/netlify-plugin-js-obfuscator/install) or go to the [Plugins directory](https://app.netlify.com/plugins).

For file-based installation, add it to your `netlify.toml` file.

```toml
[[plugins]]
  package = "netlify-plugin-js-obfuscator"

  # All inputs are optional, so you can omit this section.
  # Defaults are shown below.
  # You can also refer to `javascript-obfuscator`’s documentation: https://github.com/javascript-obfuscator/javascript-obfuscator.
  [plugins.inputs]
   # Compact code output on one line.
     compact = false
   # Enables numbers conversion to expressions
     numbersToExpressions = true
   # Enables additional code obfuscation through simplification.
     simplify = true
   # Randomly shuffles the stringArray array items
     shuffleStringArray = true
   # Splits literal strings into chunks with length of splitStringsChunkLength option value
     splitStrings = true
```

To complete file-based installation, from your project's base directory, use npm package manager to add the plugin to `devDependencies` in `package.json`.

```bash
npm install -D netlify-plugin-js-obfuscator
```

Once installed and configured, the plugin will automatically run on the Netlify CI.

### Testing locally

To test this plugin locally, you can use the [Netlify CLI](https://github.com/netlify/cli):

```bash
# Install the Netlify CLI.
npm install netlify-cli -g

# In the project working directory, run the build as Netlify would with the build bot.
netlify build
```
