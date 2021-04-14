# textlint-plugin-jawn

日本のウェブ小説サービスへマルチポストするための基礎構文「[序云FS](https://github.com/matori/jawn-fs)」の[textlint](https://github.com/textlint/textlint)用プラグインです。

## インストール

```
npm install textlint-plugin-jawn
```

## 使い方

```json5
{
  "plugins": {
    "jawn": true
  }
}
```

初期状態では`.jawn`または`.jwn`拡張子のファイルを対象とします。  
別の拡張子を追加する場合はオプションで指定します。

```json5
{
  "plugins": {
    "jawn": {
      "extensions": [".custom-ext"]
    }
  }
}
```

## License

MIT
