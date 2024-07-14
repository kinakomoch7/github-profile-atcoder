# GitHub Profile AtCoder

## 概要

この GitHub Action は [AtCoder](https://atcoder.jp/?lang=ja) の成績グラフを作成し、プロフィールに表示します。

実装には yoshi389111 さんの [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) を参考にさせていただきました。

## 使い方

AtCoder のマイプロフィールに表示されるコンテスト実績の推移グラフの SVG ファイルを GitHub プロフィール用に作成し、リポジトリにコミットします。

### 手順 1. プロフィール用のリポジトリを作成する

ユーザ名と同一のリポジトリを作成してください。

以降、このリポジトリでの作業を想定しています。

参考：[プロフィールの README を管理する](https://docs.github.com/ja/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme)

### 手順 2. GitHub Actions を動かすためのファイルを作成する

GitHub Actions を動かすために、以下のようなファイルを作成します。

``` .github/workflows/profile-atcoder.yml ```

作成したファイルに下記のコードを追記してください。

GitHub Actions を用いて、毎週月曜日の午前 3 時に実行されます。

下記の cron を調整して、お好みの時間に修正してください。

※ USER_NAME は自身の AtCoder のアカウント名に書き換えてください。

```
name: Git-Hub-Profile-AtCoder

on:
  schedule: # JST 月曜日 03:00 == UTC 日曜日 18:00
    - cron: "0 18 * * 0"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-Git-Hub-Profile-AtCoder
    steps:
      - uses: actions/checkout@v3
      - uses: kinakomoch7/git-hub-profile-atcoder@v0.2.1
        env:
          USER_NAME: 自分のアカウント名
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```

### 手順３.GitHub Actionの起動

リポジトリの画面から追加したアクションを起動してください。

```[プロフィールリポジトリ]``` ->```Actions```->```[手順２で設定したアクション名]```-> ```Run workflow```

画像は以下のパスで作成されます。

```profile-AtCoder/rate-chart.svg```

```profile-AtCoder/ac-chart.svg```

※基本的には月曜日の午前3時に自動で起動し更新処理を行いますが、すぐに更新したい場合はこの手順を実施してください。

### 手順４.README.mdを追加

生成した画像のパスを readme ファイルに追加します。

``` ![](./profile-AtCoder/rate-chart.svg) ```

``` ![](./profile-AtCoder/ac-chart.svg) ```

※プロフィールの反映までに数分かかる場合があります。

