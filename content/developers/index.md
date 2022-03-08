---
title: Environment setup
sidebar_title: Environment setup
description: How to prepare your environment for Mysterium node development
---

The minimum recommended pre-requisites for building, running and testing Mysterium node are:

| Software           | Minimum Version |
|--------------------|-----------------|
| Go                 | 1.17.0+         |
| Docker             | 19.0+           |
| Docker Compose     | 1.21.0+         |
| Mage (Recommended) | 1.10+           |


Follow the instructions below to set it up.


### Setup for Ubuntu

1. **Install and configure Docker CE**:


```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $(whoami)
docker login
```


If you prefer to perform these steps manually: 
* https://docs.docker.com/install/linux/docker-ce/ubuntu/
* https://docs.docker.com/install/linux/linux-postinstall/

Make sure that you can run docker without `sudo`

2. **Install docker-compose**:

You should be able to install `docker-compose` using the default package manager:
```bash
sudo apt-get install docker-compose
```

You can also install it using the docker provided files:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Download and install the latest Golang release**:

```bash
sudo apt-get install -y build-essential
sudo rm -rf /usr/local/go
wget https://golang.org/dl/go1.15.4.linux-amd64.tar.gz
tar -C /usr/local -xzf go1.15.4.linux-amd64.tar.gz
```

You can install other versions by replacing the `go1.15.4` with any version you want.
To find the latest version check: https://golang.org/doc/install

4. **Update your shell's initialization script (e.g. `.profile`, `.bashrc` or `.zshrc`) and add the following**:

 ```bash
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
export PATH=$PATH:/usr/local/go/bin
```

5. **Reload shell config**

In order to load the configuration from step 4 you must reload your shell.

Try and `source` the shell initialization script: `source $HOME/.profile`.
If that doesn't work re-login or restart your computer for the configuration to be applied.

6. **Make sure everything is working**:

Test your setup using these commands:
* `go version` to checkout if go was installed and is configured
* `docker --version` to check if docker was installed and is working
* `docker-compose --version` to check if docker-compose was installed and is working


### Setup for macOS 

1. **Install and configure Docker CE: https://docs.docker.com/docker-for-mac/**.

2. **Download and install homebrew: https://brew.sh/**.

3. **Install Go**:
    ```bash
    brew install go
    ```
4. **Update your shell's initialization script (e.g. `.profile`, `.bashrc` or `.zshrc`) and add the following**:

    ```bash
    export GOPATH=$HOME/go
    export PATH=$PATH:$GOPATH/bin
    ```

5. **Reload shell config**

In order to load the configuration from step 4 you must reload your shell.

Try and `source` the shell initialization script: `source $HOME/.profile`.
If that doesn't work re-login or restart your computer for the configuration to be applied.

6. **Make sure everything is working**:

Test your setup using these commands:
* `go version` to checkout if go was installed and is configured
* `docker --version` to check if docker was installed and is working
* `docker-compose --version` to check if docker-compose was installed and is working

## Mage - Golang's task automation tool

[Mage](https://github.com/magefile/mage) is a simple make-like Go tool we use to help us develop our software.
Before installing Mage, make sure you've completed the steps above for system setup
as it requires you to have `golang` installed on your system.

To install simply execute these commands:

```bash
git clone https://github.com/magefile/mage
cd mage
go run bootstrap.go
```
