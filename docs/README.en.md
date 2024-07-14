# GitHub Profile AtCoder

## Overview

This GitHub Action creates an AtCoder contest performance graph and displays it on your GitHub profile.

The implementation is based on [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) by yoshi389111.

## How to Use

This GitHub Action creates an SVG file of the contest performance graph from your AtCoder profile and commits it to your repository for use on your GitHub profile.

### Step 1. Create a Repository for Your Profile

Create a repository with the same name as your GitHub username.

The following steps assume you will work in this repository.

Reference: [Managing your profile README](https://docs.github.com/en/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme)

### Step 2. Create a File for GitHub Actions

To set up the GitHub Action, create the following file:

``` .github/workflows/profile-atcoder.yml ```

Add the following code to the created file:

The GitHub Action will run automatically every Sunday at 6 PM UTC.

You can adjust the `cron` schedule to your preferred time.

**Note:** Replace `USER_NAME` with your AtCoder username.

```
name: Git-Hub-Profile-AtCoder

on:
  schedule: # 18:00 UTC
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
          USER_NAME: Your AtCoder Username
      - name: Commit & Push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add -A .
          git commit -m "generated"
          git push
```

### Step 3. Trigger the GitHub Action

From the repository screen, trigger the action:

```[Profile Repository]``` -> ```Actions``` -> ```[The Action Name from Step 2]``` -> ```Run workflow```

The image will be created at the following path:

```profile-AtCoder/rate-chart.svg```

```profile-AtCoder/ac-chart.svg```

**Note:** The action will automatically run and update every Sunday at 6 PM UTC, but you can follow this step to trigger it manually if you want to update immediately.

### Step 4. Add to Your README.md

Add the path to the generated image in your `README.md` file.

```![](./profile-AtCoder/rate-chart.svg)```

```![](./profile-AtCoder/ac-chart.svg)```

**Note:** It may take a few minutes for the changes to appear on your profile.
