<div align="center">
<img width="460" src="https://raw.githubusercontent.com/mindflayer-vtt/foundryvtt-mindflayer/main/.github/foundryvtt-mindflayer-logo.png">
</div>

# Foundry VTT - Mind Flayer Brainmate

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mindflayer-vtt/foundryvtt-mindflayer-brainmate/CI)](https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/actions) [![GitHub Release](https://img.shields.io/github/release/mindflayer-vtt/foundryvtt-mindflayer-brainmate.svg)](https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/releases/latest)

A Foundry VTT module, which redesigns the UI to be usable on a tablet or phone.

In case you are interested about the origin of the name "Brainmate", you may read up on the [Brainmate Item](https://www.worldanvil.com/w/planejammer-chronicles-dungeonmasterloki/a/brainmate-item) on worldanvil.

# Installation

To install, follow these instructions:

1.  Inside Foundry, select the Game Modules tab in the Configuration and Setup menu.
2.  Click the Install Module button and enter the following URL: https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/releases/latest/download/module.json
3.  Click Install and wait for installation to complete.

# Usage Instructions

Once activated the module will automatically enable if it detects a mobile device.

For detection of mobile devices we use [mobile-detect](https://www.npmjs.com/package/mobile-detect), thus any device not recognized by the library will not be automatically detected. Because of this we added a setting which can force-enable the mobile view. The Setting is per-client, thus will only affect the current device/browser.

**Note:** The first time you start VTT on a mobile device, Foundry VTT will load almost completely, only to reload the page afterwards. This is due to the setting for disabling the canvas (which holds the map). On the first load, the module detects that it is on a mobile device and disables the canvas, this causes VTT to reload the page.

# Compatibility

| Device          | Browser       | Compatibility | Known Issues |
|-----------------|---------------|---------------|--------------|
| Android Phone   | Google Chrome | ✅            | --           |
| Android Tablett | Google Chrome | ✅            | --           |
| iOS iPad        | Safari?       | 🚫            | reload loop  |
| iOS iPhone      | ?             | ✅            | --           |

# Development

This module is transpiled from multiple files. Therefore you will need a Node installation to develop.

## Preparation of the dev environment

1. Install the latest Node 16 version, using a Node version manager like nvm is suggested but not required
2. Run `npm install` in the root of the repository
3. Create a `.devDomain` file and put the domain or ip address of your test system in it
4. Run `npm run build`, when it finishes a `chrome-overrides` folder should be created
5. Open the Foundry VTT instance you use for testing in a Chromium based browser (the module needs to be installed and activated)
6. Use `F12` to open the dev tools
7. Open the `Sources` tab
8. Open the `Overrides` sub-tab (it is usually hidden behind `>>` near the `Page` sub-tab)
9. Select the `chrome-overrides` folder and allow the access
10. Reload the page, it should now use the local files instead of the installed ones

To update the Code once you change it, repeat steps `4` and `10`
