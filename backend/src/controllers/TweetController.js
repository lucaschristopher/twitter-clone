const Tweet = require("../models/Tweet");

module.exports = {
  // List all Tweets
  async index(req, res) {
    const tweets = await Tweet.find({}).sort("-createdAt");
    return res.json(tweets);
  },

  // Create a new Tweet
  async store(req, res) {
    const tweet = await Tweet.create(req.body);

    // Notifies all parts connected to the application
    req.io.emit("tweet", tweet);

    return res.json(tweet);
  },


}