# Gradient Map Editor for ComicShare

ComicShareで自動着色した時の表示を、疑似確認できる


## 状況

- サンプル画像データはコミpo
- ドラッグドロップで色変更可
- ドラッグドロップで画像登録可
- レスポンシブ対応
- UA判定でiOSデバイスはファイル参照不可  
  canvasに登録した画像に、フィルタがかからないため
- サンプルカラー配列からstyle書き出し

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm build
```

Running

```sh
npm dev
```

## Credits

- [Tail](https://tailpiece.dev/) - author
- Made with [createapp.dev](https://createapp.dev/) - project template
