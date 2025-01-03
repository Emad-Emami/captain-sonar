import { BATTLE_CHANNEL_PREFIX } from "@CS/server/modules/battle/battle.constants";
import { createChannelFactoryById } from "@CS/server/system/redis/utils/channels.utils";

export const battleChannel = createChannelFactoryById(BATTLE_CHANNEL_PREFIX);
