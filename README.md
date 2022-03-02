<div align="center">
<img width="460" src="https://raw.githubusercontent.com/mindflayer-vtt/foundryvtt-mindflayer/main/.github/foundryvtt-mindflayer-logo.png">
</div>

# Foundry VTT - Mind Flayer Brainmate

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/mindflayer-vtt/foundryvtt-mindflayer-brainmate/CI)](https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/actions) [![GitHub Release](https://img.shields.io/github/release/mindflayer-vtt/foundryvtt-mindflayer-brainmate.svg)](https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/releases/latest)

A Foundry VTT module, which redesigns the UI to be usable on a tablet or phone.

# Installation

To install, follow these instructions:

1.  Inside Foundry, select the Game Modules tab in the Configuration and Setup menu.
2.  Click the Install Module button and enter the following URL: https://github.com/mindflayer-vtt/foundryvtt-mindflayer-brainmate/releases/latest/download/module.json
3.  Click Install and wait for installation to complete.

# Usage Instructions

Once activated the module will automatically enable if it detects a mobile device.

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
