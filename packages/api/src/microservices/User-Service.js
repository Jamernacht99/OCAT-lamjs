const { User } = require(`../database/models`);
const bcrypt = require(`bcrypt`);
const saltRounds = 10;
exports.submit = async (user) => {

  await bcrypt.hash(user.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.

    User.create({
      account_type: user.account_type,
      email: user.email,
      password: hash,
      username: user.username,
    });
  });
};
