let online = require("online");
const redis = require("redis");
const client = redis.createClient();

// set online
online = online(client);

// get list of users online
const listUsersOnline = (ids) => {
  const htmls = `<ul>
        ${ids.map((id) => {
          return `<li id='${id}'> ${id} </li>`;
        })}
    </ul>`;
  return htmls;
};

const onlineFn = (app) => {
  app.get(
    "/user-online",
    (req, res, next) => {
      online.add(req.headers["user-agent"], (err) => {
        if (err)
          return res.status(400).json({
            message: err.message,
          });
      });
      next();
    },
    (req, res) => {
      // get users online in the last 2 minutes
      online.last(2, (err, ids) => {
        if (err)
          return res.status(400).json({
            message: err.message,
          });
        res.send(
          `<p>Users Online (${ids.length})</p> <br/> ${listUsersOnline(ids)}`
        );
      });
    }
  );
};

module.exports = onlineFn;
