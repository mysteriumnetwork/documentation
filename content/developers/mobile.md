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

## iOS

It is possible to get the iOS SDK library using [Carthage](https://github.com/Carthage/Carthage) dependency manager.

You can follow the [Carthage quick start guide](https://github.com/Carthage/Carthage#quick-start) to get familiar how to use it or just use the following steps:

1. Carthage should be installed in the system.
2. `Cartfile` should be created in the same directory where `.xcodeproj` or `.xcworkspac` is located.
3. `Cartfile` should contain the following line: `github "mysteriumnetwork/node" ~> 0.5.0`.
    - `mysteriumnetwork/node` - is a path to the GitHub [repository](https://github.com/mysteriumnetwork/node).
    - `0.5.0` - is the desired version of iOS SDK.

4. Execute the following command to fetch the required library: `carthage update`.
5. A `Cartfile.resolved` file and a `Carthage` directory will appear in the same directory where your `.xcodeproj` or `.xcworkspace` is.
6. Drag the built `.framework` binaries from `Carthage/Build/<platform>` into your application’s Xcode project.

---

> *If you are going to use `dev` version of the SDK library `Cartfile` should contain version without postfix.*
> *For example, if you want to install `0.5-rc` version `Cartfile` should contain the following line: `github "mysteriumnetwork/node" ~> 0.5`.*
