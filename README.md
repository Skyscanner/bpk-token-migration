# bpk-token-migration

[![npm version](https://badge.fury.io/js/%40skyscanner%2Fbpk-token-migration.svg)](https://badge.fury.io/js/%40skyscanner%2Fbpk-token-migration)

Command line tool for switching .scss files to use the V2 version of [Backpack tokens](https://github.com/Skyscanner/backpack-foundations)

It scans directories recursively, looking for all files ending in `.scss`, then does one of three things depending on which script name you pass in:

## `replace-tokens-with-functions`

Replaces all instances of tokens in `.scss` files from the old variable-based format, to the new function-based format.

### Usage

```sh
npx @skyscanner/bpk-token-migration replace-tokens-with-functions [directory-name]
```

### Example

#### Before

```scss
.my-component {
  margin: $bpk-spacing-sm;
  padding: $bpk-spacing-md $bpk-spacing-base;
}
```

#### After

```scss
.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```

## `disable-v2-spacing`

Adds `$bpk-spacing-v2: false` to the beginning of every `.scss` file. If the line is already present, it will be replaced.

Setting this variable **disables** V2 spacing for any usages of the spacing functions (`bpk-spacing-sm()` etc).

### Usage

```sh
npx @skyscanner/bpk-token-migration disable-v2-spacing [directory-name]
```

### Example

#### Before

```scss
.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```

#### After

```scss
$bpk-spacing-v2: false;

.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```

## `enable-v2-spacing`

Adds `$bpk-spacing-v2: true` to the beginning of every `.scss` file. If the line is already present, it will be replaced.

Setting this variable **disables** V2 spacing for any usages of the spacing functions (`bpk-spacing-sm()` etc).

### Usage

```sh
npx @skyscanner/bpk-token-migration enable-v2-spacing [directory-name]
```

### Example

#### Before

```scss
.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```

#### After

```scss
$bpk-spacing-v2: true;

.my-component {
  margin: bpk-spacing-sm();
  padding: bpk-spacing-md() bpk-spacing-base();
}
```



## Contributing

```sh
# Run the code locally
node index.js directory/to/test/on

# Run tests
npm test
```
