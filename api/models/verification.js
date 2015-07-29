'use strict';
module.exports = function(sequelize, DataTypes) {
  var Verifications = sequelize.define('Verifications', {
    validation_public_key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^n([rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]){51}$/i
      }
    },
    domain: DataTypes.STRING,
    error: {
      type: DataTypes.STRING,
      validate: {
        isIn: [[
          'InvalidRippleAccount',
          'AccountDomainNotFound',
          'InvalidDomain',
          'RippleTxtNotFound',
          'ValidationPublicKeyNotFound'
        ]]
      }
    }
  }, {
    validate: {
      domainOrError: function() {
        if (!this.domain === !this.error) {
          throw new Error('Require either domain or error')
        }
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },

      // Return validator's current domain verification status
      getVerificationStatus: async function(validation_public_key) {
        return await database.Verifications.findOne({
          where: {
            validation_public_key: validation_public_key
          },
          order: [['"createdAt"', 'DESC']]
        })
      }
    }
  });
  return Verifications;
};
