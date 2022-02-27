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
"use strict";
import { LOG_PREFIX, VTT_MODULE_NAME } from "./constants";

const SETT_MODULE_ENABLED = "enabled";
const SETT_MODULE_FORCE_ENABLED = "forceEnabled";

export const settings = {
  /**
   * @returns {Boolean}
   */
  get enabled() {
    return game.settings.get(VTT_MODULE_NAME, SETT_MODULE_ENABLED);
  },

  /**
   * @returns {Boolean}
   */
  get forceEnabled() {
    return game.settings.get(VTT_MODULE_NAME, SETT_MODULE_FORCE_ENABLED);
  },

  init() {
    game.settings.register(VTT_MODULE_NAME, SETT_MODULE_ENABLED, {
      name: `module.MindFlayer.Brainmate.setting.${SETT_MODULE_ENABLED}.name`,
      hint: `module.MindFlayer.Brainmate.setting.${SETT_MODULE_ENABLED}.hint`,
      scope: "client",
      type: Boolean,
      default: true,
      config: true,
      restricted: false,
      onChange: () => {
        location.reload();
      },
    });

    game.settings.register(VTT_MODULE_NAME, SETT_MODULE_FORCE_ENABLED, {
      name: `module.MindFlayer.Brainmate.setting.${SETT_MODULE_FORCE_ENABLED}.name`,
      hint: `module.MindFlayer.Brainmate.setting.${SETT_MODULE_FORCE_ENABLED}.hint`,
      scope: "client",
      type: Boolean,
      default: false,
      config: true,
      restricted: false,
      onChange: () => {
        location.reload();
      },
    });

    console.log(LOG_PREFIX + "Loaded settings");
    return this;
  },
};
