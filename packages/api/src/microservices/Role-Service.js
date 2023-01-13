
const { Role } = require(`../database/models`);

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const roles = await Role.findAll();

  return roles;
};
