const dbl = require("dbl.js");

let dblclient = new dbl.Client({
    dbltoken: "Your Discord Bot List token you get from https://discordbots.org/api/docs",
    id: "Your bot user id make sure this is your bot or it wont work"
});

// Get vote data/count.
dblclient.getVotes().then((stats) => {
    console.log(stats); // do stats.length to get vote count.
}).catch(e => console.log(`Error: ${e}`));

// Get Server Count and Shard info from any bot on DBL(Discord Bot List).
dblclient.getBotStats("A BOT ID").then((stats) => {
    console.log(stats);
}).catch(e => console.log(`Error: ${e}`));

// Get a user stats from DBL website they must have logined in on the website before.
dblclient.getUserData("A User ID, not a bot ID").then((stats) => {
    console.log(stats);
}).catch(e => console.log(`Error: ${e}`));

// Gets bot data, bot must be on DBL Website.
dblclient.getBotData("A BOT ID not a user id ").then((stats) => {
    console.log(stats);
}).catch(e => console.log(`Error: ${e}`));

/* Post server count to DBL(Discord Bot List) 
You have three options to use for posting stats
{ serverCount: 122} - Used for just posting server count.
{ serverCount: 61, shardID: 0, shardCount: 2} - Posting with shards.
{ shards: [61,61]} - If you want to update all shards at once you can send an array.
You should update it whenever it changes (on that shard) and when you start your bot/shard. When one shard changes, you shouldn't have to post server count for all of your shards every time.
*/
dblclient.postServerStats({serverCount: "Your library's method of getting guilds size/count"}).then((stats) => {
    console.log("Stats sent, No errors.");
}).catch(e => console.log(`Error: ${e}`));
