'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Visitors',
        'checkin',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ).then(function () {
        return queryInterface.addColumn(
          'Visitors',
          'checkout',
          {
            allowNull: true,
            type: Sequelize.DATE
          }
        )
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Visitors', 'checkout')
    .then(function () {
      return queryInterface.removeColumn('Visitors', 'checkin');
    });
  }
};