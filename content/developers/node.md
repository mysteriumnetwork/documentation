---
title: Node 
description: Node developer guide
---

In this section we'll talk about node only from a developers perspective. If you haven't yet setup your
environment please follow the "Quick Start" guide first.

We'll touch briefly on getting, running, testing and building a [node](https://github.com/mysteriumnetwork/node).
If after reading this you have more questions try exploring the code and the commands mentioned or reach to us and our community over at <a href="https://discord.com/invite/n3vtSwc">Discord.</a>

### Getting 

Node is located at: https://github.com/mysteriumnetwork/node

If you're not part of the `mysterium` team you will have to make your own fork.
You can follow the official github [guide](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) on how to do that.

After creating a fork execute:

```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/mattermost-server.git
```
Make sure you've read our "Quick start" guide and you have
[Mage](https://github.com/magefile/mage) installed and running as it will come in handly going further.

### Building

A node is easy to build using `mage`, to do that you can execute the a mage command:

```sh
mage build
``` 

After doing so you should see similar output to this:

```sh
2020-11-12T17:29:07.178 INF ci/packages/build.go:83                  > Building cmd/mysterium_node/mysterium_node.go -> myst linux/amd64
2020-11-12T17:29:07.178 ??? github.com/rs/zerolog@v1.17.2/log.go:403 > exec: go build -ldflags=-w -s  -o /home/tomas/go/src/github.com/mysteriumnetwork/node/build/myst/myst cmd/mysterium_node/mysterium_node.go
2020-11-12T17:29:09.604 INF ci/packages/build.go:83                  > Building cmd/supervisor/supervisor.go -> myst_supervisor linux/amd64
2020-11-12T17:29:09.604 ??? github.com/rs/zerolog@v1.17.2/log.go:403 > exec: go build -ldflags=-w -s  -o /home/tomas/go/src/github.com/mysteriumnetwork/node/build/myst_supervisor/myst_supervisor cmd/supervisor/supervisor.go
```

If you dont have `mage` installed you can try and execute a `go build` command:

```sh
go build -o myst  cmd/mysterium_node/mysterium_node.go 
```

### Running

A node can be ran in consumer and provider modes, this can be done easily for basic development by executing:
* `mage cli` consumer (testing) mode (without mage you can execute: `build/myst/myst cli`)
* `mage daemon` for provider mode (without mage you can execute: `build/myst/myst daemon`)

The `myst cli` interacts with the `daemon` using `tequilaAPI` which you can also use with `curl` or `postman`.
For example to check if node is running you can send a healthcheck request:

```sh
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

To explore everything that tequila can do, see swagger of an already deployed node: https://tequilapi.mysterium.network/

Or check swagger of your own node which is avaiable on the same `http://localhost:4050/docs` after you run the daemon.

### Testing

If you've added new features or changed old ones, make sure to cover them with tests as much as possible. 

* Unit tests are all the `*_test.go` files oustide the `e2e` directory. They can be executed by running:

```sh
mage test 
```

* Long running or "e2e" tests can be found in the `e2e` directory. They can be executed by running:

```sh
mage test-e2e-basic
```

```sh
mage test-e2e-nat
```

* To check if you haven't missed copyright notices or haven't made any linting mistakes executed:

```sh
mage checks
```

### Contributing 

If you've made changes to the `tequilaAPI` make sure to generate new swagger documention:
```sh
mage generateswagger
mage generatedocs
```


And that is it you're ready to create a [pull request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
