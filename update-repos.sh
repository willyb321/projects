#!/usr/bin/env bash
curl -o src/projects.json -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user/repos?per_page=100&visibility=public&affiliation=owner,collaborator
curl -o src/user.json -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/users/willyb321
