# GitHub Profile AtCoder


## 概要
この GitHub Action は [AtCoder](https://atcoder.jp/?lang=ja)のSVGで作成します。

実装には yoshi389111 さんの [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) を参考にしました。

## 使い方

この GitHub Action はAtCoderのマイプロフィールに表示されるコンテスト実績の推移グラフのSVGファイルを GitHub プロフィール用に作成し、リポジトリにコミットします。

### 

### 手順１. プロフィール用のリポジトリを作成する
ユーザ名と同一のリポジトリを作成してください。
以降このレポジトリでの作業を想定しています。

### 

### 手順２．GitHub Actions を動かすためのファイルを作成する

GitHub Actions を動かすために、以下のようなファイルを作成します

``` .github/workflows/profile-atcorder.yml ```

GitHub Actionsを用いて、初期値は１日１回１８時に実行されます。
下記のcronを調整して、お好みの時間に修正してください

※USER_NAMEは自分のアカウント名に書き換えてください

```
name: Git-Hub-Profile-AtCoder

on:
  schedule: # 03:00 JST == 18:00 UTC
    - cron: "0 18 * * *"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    name: generate-Git-Hub-Profile-AtCoder
    steps:
      - uses: actions/checkout@v3
      - uses: kinakomoch7/git-hub-profile-atcorder@v0.1.6
        env:
          USER_NAME: inoue_r
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```

### 

### 手順３.GitHub Actionの起動

リポジトリの画面から追加したアクションを起動してください

```[プロフィールレポジトリ]``` ->```Actions```->```[手順２で設定したアクション名]```-> ```Run workflow```

画像は以下のパスで作成されます

```profile-AtCorder/rate-chart.svg```


### 手順４.README.mdを追加

生成した画像のパスを readme ファイルに追加します

例：
``` ![](./profile-AtCorder/rate-chart.svg) ```
