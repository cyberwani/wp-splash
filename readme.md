WP-Site Master Repository

## About

This is the master repository from which all other WordPress sites Usability Dynamics creates is forked from. In
addition to this, this repository will have 3 branches, depending on which type of site you're trying to use:

* master - this is the default branch for a standalone site (i.e. usabilitydynaimcs.com)
* multisite - this is the default branch for a multisite implementation (i.e. TDB)
* cluster - this is the default branch for a cluster (read: vertical) site (i.e. edm-cluster) with multi-db support

## Why GitHub?

* Better synchronization across repositories
* Ability to do cross repository pull requests when updates are made
* Keep branches in sync better
* No plethora of individual repositories where "one-off" changes are made and are not in sync with the master branches

## Running Build

We use grunt to run the build, here is the command that should be used:

```shell
You can use this grunt file to do the following:
   * grunt install - installs and builds environment
   * Arguments:
      --environment={environment} - builds specific environment: (production**, development, staging, local)
      --system={system} - build for a specific system: (linux**, windows
      --type={type} - build for a specific site type: (standalone**, cluster, multisite)
```

## Notes

* Each directory has a corresponding 'readme.md' which gives a brief spiel on what the directory should be used for
