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
import { VTT_MODULE_NAME } from "../settings/constants";

export function getModuleInstance() {
  return game.modules.get(VTT_MODULE_NAME).instance;
}
export function setModuleInstance(inst) {
  game.modules.get(VTT_MODULE_NAME).instance = inst;
}
