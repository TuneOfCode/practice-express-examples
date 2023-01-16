const redis = require("redis");
const client = redis.createClient(6379);

client.on("error", (err) => console.log("===> Redis Client Error: ", err));
client.on("connect", () => {
  console.log("connected to redis successfully!");
});

const callAPI = async (url) => {
  const response = await fetch(url);
  const users = await response.json();
  return users;
};

const setDataRedis = async () => {
  const users = await callAPI("https://jsonplaceholder.typicode.com/users/");
  users.map((user) => {
    client.sadd("names", user.name);
    client.sadd("usernames", user.username);
    client.sadd("emails", user.email);
    client.sadd("phones", user.phone);
  });
};

setDataRedis();
callAPI("https://jsonplaceholder.typicode.com/users/");

const search = (app) => {
  app.get(["/users", "/users/:userId"], async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
      const data = await callAPI(`https://jsonplaceholder.typicode.com/users/`);
      return res.status(200).json({
        success: true,
        data,
      });
    }
    const data = await callAPI(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return res.status(200).json({
      success: true,
      data,
    });
  });

  app.get("/users/search/:query", (req, res) => {
    const query = req.params.query;
    client.smembers(query, (err, values) => {
      if (err)
        return res.status(500).json({
          message: err.message,
        });
      res.json({
        [query]: values,
      });
    });
  });
};

client.on("disconnect", () => {
  console.log("disconnected to redis successfully!");
});
module.exports = search;
