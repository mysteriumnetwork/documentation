---
title: Node development
description: How to start working on Mysterium node
---

This section will explain how to run, build and test node during development. If you are yet to set up your
environment please follow the [environment setup](/developers/) guide first.

You can check out our source code on [Github](https://github.com/mysteriumnetwork/node) and talk to us and our community over at <a href="https://discord.com/invite/n3vtSwc">Discord.</a>

### Forking

Node repository is located at: https://github.com/mysteriumnetwork/node
You will have to fork the repository in order to work on it.
You can follow the official Github [guide](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) on how to do that.

After creating a fork execute:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/node.git
```
Make sure you've read our [environment setup](/developers/) guide and you have [Mage](/developers/#mage---golangs-task-automation-tool) installed as it will come in handy going further.

### Building

Mage makes it easy to build the project, to do that you execute the `mage build` command in project's root directory:

```bash
cd node
mage build
``` 

After doing so you should see similar output to this:

```bash
2020-11-12T17:29:07.178 INF ci/packages/build.go:83                  > Building cmd/mysterium_node/mysterium_node.go -> myst linux/amd64
2020-11-12T17:29:07.178 ??? github.com/rs/zerolog@v1.17.2/log.go:403 > exec: go build -ldflags=-w -s  -o /home/tomas/go/src/github.com/mysteriumnetwork/node/build/myst/myst cmd/mysterium_node/mysterium_node.go
2020-11-12T17:29:09.604 INF ci/packages/build.go:83                  > Building cmd/supervisor/supervisor.go -> myst_supervisor linux/amd64
2020-11-12T17:29:09.604 ??? github.com/rs/zerolog@v1.17.2/log.go:403 > exec: go build -ldflags=-w -s  -o /home/tomas/go/src/github.com/mysteriumnetwork/node/build/myst_supervisor/myst_supervisor cmd/supervisor/supervisor.go
```

If you don't have `mage` installed you can use the `go build` command to generate a binary:

```bash
go build -o myst  cmd/mysterium_node/mysterium_node.go 
```

### Running

A node can be started as a `daemon` by executing:
```bash
mage daemon
```

Or without mage:
```bash
build/myst/myst daemon
```

### TequilAPI REST API and CLI app

Interacting with node can be done using its `TequilaAPI` endpoints.
This API allows us to control both consumer and provider sides of our node.

**The default port is: `4050`**

Node comes with built-in CLI commands which call the API endpoints making it easy to interact, test and control your node from the command-line.

```bash
mage cli
```

Or without mage:
```bash
build/myst/myst cli
```

For greater control you can skip the `CLI` step and interact with `TequilaAPI` yourself
using `curl`, `postman` or any other HTTP based tool you like.
For example to check if a node is running you can send a `healthcheck` request:

```bash
curl http://localhost:4050/healthcheck

{
    "uptime": "47m55.616006453s",
    "process": 5490,
    "version": "0.0.0-dev",
    "buildInfo": {
        "commit": "99d37edc952b736e3fad069f56e7d968276634a8",
        "branch": "master",
        "buildNumber": "4755"
    }
}
```

To explore everything TequilAPI can do, we host its Swagger docs on: https://tequilapi.mysterium.network/

Feel free to check the Swagger docs of your own node which are available on the same port as the `TequilAPI`: http://localhost:4050/docs.

### Testing

If you've added new features or changed old ones, make sure to cover them with tests as much as possible. 

* Unit tests are all the `*_test.go` files outside the `e2e` directory. They can be executed by running:

```bash
mage test 
```

* Long-running or "e2e" tests can be found in the `e2e` directory. They can be executed by running:

```bash
mage teste2ebasic
```

```bash
mage teste2enat
```

* To check if you haven't missed copyright notices or haven't made any linting mistakes run:

```bash
mage checks
```

### Contributing 

If you've made changes to the `TequilaAPI` make sure to generate new Swagger documentation:
```bash
mage generateswagger
mage generatedocs
```

That's it! Once you're ready to publish your changes, please create a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) in the [official node repository](https://github.com/mysteriumnetwork/node).

Our developers are always happy to receive feedback and code contributions. We look forward to hearing from you!
