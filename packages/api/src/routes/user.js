const { UserService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const userRouter = Router();

userRouter.post(
  `/submit`,

  async (req, res, next) => {
    try {
      const { user } = req.body;
      const result = await UserService.submit(user);

      ResponseHandler(
        res,
        `Created user`,
        result,
      );

    } catch (err) {
      next(err);
    }
  },
);

module.exports = { userRouter };
