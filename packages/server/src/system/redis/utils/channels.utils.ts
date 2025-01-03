import { publisher } from "@CS/server/system/redis/redis.publisher";
import { subscriber } from "@CS/server/system/redis/redis.subscriber";

/**
 * Create a channel name
 * @param sourceName
 * @param id
 * @returns string
 */
export function createChannelNameById(sourceName: string, id?: string) {
  return `${sourceName}:${id}`;
}

/**
 * Create a channel by id
 * @param sourceName
 * @returns function (id: string) => Channel
 */
export function createChannelFactoryById(sourceName: string) {
  return function (id?: string) {
    const channelName = createChannelNameById(sourceName, id);
    return {
      publish: (message: string) => publisher.publish(channelName, message),
      subscribe: (callback: (message: string) => void) => subscriber.subscribe(channelName, callback),
      unsubscribe: (callback: (message: string) => void) => subscriber.unsubscribe(channelName, callback)
    };
  };
}
