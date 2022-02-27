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
import { settings } from "./settings";
import * as dependencies from "./dependencies";
import { LOG_PREFIX } from "./settings/constants";
import MobileDetect from "mobile-detect";

export default class Brainmate {
  /** @type {settings} */
  #settings = null;
  /** @type {MobileDetect|null} */
  #mobileDetect = null;

  constructor() {
    this.#settings = settings.init();
    this.#mobileDetect = new MobileDetect(window.navigator.userAgent);
  }

  get settings() {
    return this.#settings;
  }

  get mobileDetect() {
    return this.#mobileDetect;
  }

  ready() {
    if (this.#settings.enabled && dependencies.warnIfAnyMissing()) {
      if (this.#settings.forceEnabled || this.#mobileDetect.mobile()) {
        if (!game.settings.get("core", "noCanvas")) {
          console.log(LOG_PREFIX + "detected mobile device, disabling canvas");
          game.settings.set("core", "noCanvas", true);
        }
        console.log(LOG_PREFIX + "detected mobile device, restyling UI");
        jQuery("body").addClass("brainmate-mobile");
      } else if (game.settings.get("core", "noCanvas")) {
        console.log(LOG_PREFIX + "detected non-mobile device, enabling canvas");
        game.settings.set("core", "noCanvas", false);
      }
    }
  }
}
