# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->

- [oclif-hello-world](#oclif-hello-world)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @snowbeam/cli
$ snowbeam COMMAND
running command...
$ snowbeam (--version)
@snowbeam/cli/0.0.0 win32-x64 node-v18.19.0
$ snowbeam --help [COMMAND]
USAGE
  $ snowbeam COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`snowbeam help [COMMANDS]`](#snowbeam-help-commands)
- [`snowbeam plugins`](#snowbeam-plugins)
- [`snowbeam plugins:install PLUGIN...`](#snowbeam-pluginsinstall-plugin)
- [`snowbeam plugins:inspect PLUGIN...`](#snowbeam-pluginsinspect-plugin)
- [`snowbeam plugins:install PLUGIN...`](#snowbeam-pluginsinstall-plugin-1)
- [`snowbeam plugins:link PLUGIN`](#snowbeam-pluginslink-plugin)
- [`snowbeam plugins:uninstall PLUGIN...`](#snowbeam-pluginsuninstall-plugin)
- [`snowbeam plugins reset`](#snowbeam-plugins-reset)
- [`snowbeam plugins:uninstall PLUGIN...`](#snowbeam-pluginsuninstall-plugin-1)
- [`snowbeam plugins:uninstall PLUGIN...`](#snowbeam-pluginsuninstall-plugin-2)
- [`snowbeam plugins update`](#snowbeam-plugins-update)

## `snowbeam help [COMMANDS]`

Display help for snowbeam.

```
USAGE
  $ snowbeam help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for snowbeam.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.12/src/commands/help.ts)_

## `snowbeam plugins`

List installed plugins.

```
USAGE
  $ snowbeam plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ snowbeam plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/index.ts)_

## `snowbeam plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ snowbeam plugins add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ snowbeam plugins add

EXAMPLES
  $ snowbeam plugins add myplugin

  $ snowbeam plugins add https://github.com/someuser/someplugin

  $ snowbeam plugins add someuser/someplugin
```

## `snowbeam plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ snowbeam plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ snowbeam plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/inspect.ts)_

## `snowbeam plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ snowbeam plugins install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ snowbeam plugins add

EXAMPLES
  $ snowbeam plugins install myplugin

  $ snowbeam plugins install https://github.com/someuser/someplugin

  $ snowbeam plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/install.ts)_

## `snowbeam plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ snowbeam plugins link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ snowbeam plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/link.ts)_

## `snowbeam plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ snowbeam plugins remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ snowbeam plugins unlink
  $ snowbeam plugins remove

EXAMPLES
  $ snowbeam plugins remove myplugin
```

## `snowbeam plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ snowbeam plugins reset
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/reset.ts)_

## `snowbeam plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ snowbeam plugins uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ snowbeam plugins unlink
  $ snowbeam plugins remove

EXAMPLES
  $ snowbeam plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/uninstall.ts)_

## `snowbeam plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ snowbeam plugins unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ snowbeam plugins unlink
  $ snowbeam plugins remove

EXAMPLES
  $ snowbeam plugins unlink myplugin
```

## `snowbeam plugins update`

Update installed plugins.

```
USAGE
  $ snowbeam plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.1.22/src/commands/plugins/update.ts)_

<!-- commandsstop -->
