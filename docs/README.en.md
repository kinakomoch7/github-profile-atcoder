# GitHub Profile AtCoder

## Overview

This GitHub Action is created with SVG from [AtCoder](https://atcoder.jp/?lang=en).

I referred to [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) by yoshi389111 for implementation.

## Way to use this action

To get GitHub Actions working, create a file like this

``` .github/workflows/profile-atcoder.yml ```

Using GitHub Actions, the default time is once a day at 6pm.

Please adjust the cron below and modify the time to your liking.

*Replace USER_NAME with your account name.

```
name: Git-Hub-Profile-AtCoder

on: # 03:00 JST
  schedule: # 03:00 JST == 18:00 UTC
    - cron: "0 18 * * *"
  workflow_dispatch:: permissions

permissions: write
  contents: write

jobs: build
  build: build
    runs-on: ubuntu-latest
    name: generate-Git-Hub-Profile-AtCoder
    steps: uses: actions/checkout@v3
      - uses: actions/checkout@v3
      - uses: kinakomoch7/git-hub-profile-atcoder@v0.1.6
        env:: inoue
          USER_NAME: inoue_r
      - name: Commit & Push
        run: | git config user.name github-actions
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```

### Step 3. Launch GitHub Action

Launch the action you added from the Repository screen.
```[Profile Repository]``` ->```Actions```->```Git-Hub-Profile-AtCoder```-> ```Run workflow```

The image will be created at the following path.

```profile-atcoder/rate-chart.svg```


### Step 4. Add README.md

Add the path to the generated image to the readme file.

Example:
``` ! [](. /profile-atcoder/rate-chart.svg) ```
