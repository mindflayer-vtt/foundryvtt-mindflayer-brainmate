/**
 * This file is part of the Foundry VTT Module Mindflayer Brainmate.
 *
 * The Foundry VTT Module Mindflayer Brainmate is free software: you can redistribute it and/or modify it under the terms of the GNU
 * General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * The Foundry VTT Module Mindflayer Brainmate is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with the Foundry VTT Module Mindflayer Brainmate. If not,
 * see <https://www.gnu.org/licenses/>.
 */
import "../sass/index.sass";
import { VTT_MODULE_NAME } from "./settings/constants";

(function () {
  "use strict";
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Imports
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const { default: Brainmate } = require("./Brainmate");
  const { setModuleInstance } = require("./utils/module");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Globals
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * @type {Brainmate|null}
   */
  let instance = null;

  /**
   * @param {Event} evt
   */
  function initHistoryBackOverride(evt) {
    evt.preventDefault();
    history.pushState(null, null, location.href);
    ClientKeybindings._onDismiss();
  }

  function wrapUsability(wrapper) {
    const originalValue = game.data.options.debug;
    game.data.options.debug = true;
    const result = wrapper();
    game.data.options.debug = originalValue;
    return result;
  }

  function addCustomItemsToGameMenu(wrapper) {
    const items = wrapper();
    items['close'] = {
      label: "module.MindFlayer.Brainmate.MENU.Close",
      icon: '<i class="fas fa-times"></i>',
      enabled: true,
      onClick: () => ui.menu.close()
    };
    return items;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Hooks
  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  Hooks.on("libWrapper.Ready", () => {
    libWrapper.register(
      VTT_MODULE_NAME,
      "Game.prototype._displayUsabilityErrors",
      wrapUsability,
      libWrapper.WRAPPER
    );
    libWrapper.register(
      VTT_MODULE_NAME,
      "Game.prototype._onWindowPopState",
      initHistoryBackOverride,
      libWrapper.OVERRIDE
    );
    libWrapper.register(
      VTT_MODULE_NAME,
      "MainMenu.prototype.items",
      addCustomItemsToGameMenu,
      libWrapper.WRAPPER
    );
  });

  /**
   * Init hook
   */
  Hooks.once("init", function brainmate_init() {
    instance = new Brainmate();
    setModuleInstance(instance);
  });

  Hooks.once("ready", function brainmate_ready() {
    instance.ready();
  });

  Hooks.on(
    "renderChatLog",
    function brainmate_renderChatLog(chatLog, $elem, context) {
      instance.renderChatLog(chatLog, $elem, context);
    }
  );
})();
