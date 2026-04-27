# Native Wrapper Setup

This repo can be wrapped as a native app with Capacitor so orientation and status bar behavior can be controlled in the native shell instead of relying on the installed PWA.

## Current reality

For iPhone, you will ultimately need:

- a Mac
- Xcode
- permission to run Xcode and the iOS Simulator or connect a device

If your school Mac blocks Xcode installs, you can still keep this repo ready, but you will not be able to complete the iPhone-native test loop on that machine.

## Install dependencies

In PowerShell, use:

```powershell
npm.cmd install
```

## Prepare the web bundle

```powershell
npm.cmd run prepare:web
```

## Add native platforms

Android on Windows:

```powershell
npx.cmd cap add android
```

iOS on a Mac with Xcode:

```bash
npx cap add ios
```

## Sync after web changes

PowerShell:

```powershell
npm.cmd run cap:sync
```

## Open native projects

Android:

```powershell
npx.cmd cap open android
```

iOS:

```bash
npx cap open ios
```

## Why this matters

The two behaviors that were unreliable in the PWA are the ones native shells handle much better:

- portrait orientation lock
- status bar appearance in dark mode

For iPhone specifically, this native route is the realistic path if you want reliable app-like behavior.
