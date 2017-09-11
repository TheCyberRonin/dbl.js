const {
  get,
  post
} = require("snekfetch");
let packageData = require("./package.json");
let headerUserAgent = `${packageData.name} (V${packageData.version})`;

class DiscordBotsCLient {
  /**
   * @typedef {Object} ClientOptions
   * @property {string} dbltoken - The API token for Discord Bot List(https://discordbots.org/api/docs).
   * @property {string} id - The user id for your bot.
   */

  /**
   * @param {ClientOptions} options - The clients options.
   */
  constructor(options) {
      /**The API token for Discord Bot List(https://discordbots.org/api/docs).
       * @type {string[]}
       */
      this.dbltoken = options.dbltoken;
      /**The bot id for your bot.
       * @type {string[]}
       */
      this.id = options.id;
      //misc members
      this.dblapiUrl = "https://discordbots.org/api";
      //error checking options
      if (options.id === undefined) throw Error("Please specify a bot id in the client options.");
  }
  // Discord Bot List

  /**Returns vote data from your bot.(Discord Bot List)
   * Bot owner only!
   * @returns {Promise<Object>}
   */
  getVotes() {
      return this._get(`/bots/${this.id}/votes`);
  }
  /**Returns server and shard data from a bot id(Discord Bot List)
   * @type {string}
   * @returns {Promise<Object>}
   * @param {string} id - Bot id
   */
  getBotStats(id) {
      return this._get(`/bots/${id}/stats`, {
          id: id
      });
  }
  /**
   * Posts server stats to ur bot (Discord Bot List)
   * @param {Object} statsObj - Options for posting is
   * {serverCount: server count}
   * {serverCount: server count, shardID: 0, shardCount: 2}
   * {shards: [61,61]}
   * @type {Object}
   * @returns {Promise} - this will send it to DBL yaya.
   */
  postServerStats(statsObj) {
      if (statsObj.serverCount && statsObj.shardID && statsObj.shardCount) {

          return this._post(`/bots/${this.id}/stats`, {
              "server_count": statsObj.serverCount,
              "shard_id": statsObj.shardID,
              "shard_count": statsObj.shardCount
          });
      }
      else if (statsObj.serverCount && statsObj.shardCount) {
          return this._post(`/bots/${this.id}/stats`, {
              "server_count": statsObj.serverCount,
              "shard_count": statsObj.shardCount
          });
      }
      else if (statsObj.shards) {
          //should be an array
          return this._post(`/bots/${this.id}/stats`, {
              "shards": statsObj.shards
          });
      } else {
          return this._post(`/bots/${this.id}/stats`, {
              "server_count": statsObj.serverCount
          });
      }
  }
  /**Gets user data from DBL website (they do have to be cached on the website)(Discord Bot List)
   * @type {string}
   * @returns {Promise<Object>}
   * @param {string} id - User id
   */
  getUserData(id) {
      return this._get(`/users/${id}`, {
          id: id
      });
  }
  /**Gets bot data from DBL website(Discord Bot List)
  * @type {string}
  * @returns {Promise<Object>}
  * @param {string} id - Bot id
  */
  getBotData(id) {
      return this._get(`/bots/${id}`, {
          id: id
      });
  }
  /**Wrapper for getting data using snekfetch
   * @param {string} endpoint 
   * @param {string} query
   */
  _get(endpoint, query) {
      return new Promise((resolve, reject) => {
          get((this.dblapiUrl) + endpoint)
              .set("Authorization", this.dbltoken)
              .query(query || {})
              .then(res => {
                  if (res.status !== 200) return reject(res);
                  return resolve(res.body);
              });
      });
  }
  /**Wrapper for posting data using snekfetch
   * @param {string} endpoint 
   * @param {string} query 
   */
  _post(endpoint, query) {
      return new Promise((resolve, reject) => {
          if (!query) reject(new Error("No query in post."));
          post((this.dblapiUrl) + endpoint)
              .set("Authorization", this.dbltoken)
              .send(query)
              .then(res => {
                  if (res.status !== 200) return reject(res);
                  return resolve(res.body);
              });
      });
  }
}

module.exports.Client = DiscordBotsCLient;
