'use strict';
const { hashSync } = require("bcryptjs");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [{
            id: 1,
            email:"admin@fainancial.com",
            password:hashSync("123456", 10),
            isActivated: true,
            refreshToken:"1"
        }], {})
  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
