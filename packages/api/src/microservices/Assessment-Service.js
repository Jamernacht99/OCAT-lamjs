const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

  // Assessment.create({
  //   instrumentType:assessment.
  //   score:
  //   riskLevel:
  //   catName:
  //   catDateOfBirth:
  // }).then(res => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.error(`Oops, that create request failed`)
  // })

};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
