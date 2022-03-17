---
title: Mobile SDK
description: Mysterium node mobile components
---

All SDK libraries available as pre-built packages on the GitHub [release page](https://github.com/mysteriumnetwork/node/releases).
It can be downloaded and installed manually in your preferred way.

We also support several standard ways of installing the SDK using dependency managers.

## Android

We are publishing an Android SDK library to our [Maven repository](https://maven.mysterium.network/releases).

To add dependency, add the following to your `build.gradle`:

```
repositories {
    maven {
        url "https://maven.mysterium.network/releases"
    }
}

dependencies {
    implementation 'network.mysterium:mobile-node:1.4.7'
}
```
