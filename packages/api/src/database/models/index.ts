import type { Sequelize } from 'sequelize';
import { Assessment } from './Assessment';
import { User } from './User';
import { Role } from './Role';

export {
  Assessment,
  User,
  Role,
};

export function initModels(sequelize: Sequelize) {
  Assessment.initModel(sequelize);
  User.initModel(sequelize);
  Role.initModel(sequelize);
}
