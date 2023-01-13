const { RoleService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const roleRouter = Router();

roleRouter.get(
  `/list`,
  async (req, res, next) => {
    try {

      const listData = await RoleService.getList();

      const result = listData.map(role => ({ account_title: role.dataValues.account_title, id: role.dataValues.id }));

      ResponseHandler(
        res,
        `Fetched roles`,
        result,
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { roleRouter };
