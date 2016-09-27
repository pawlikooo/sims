module.exports = function(orm, db) {
  var Users = db.define('users', {
    login: {
      type: 'text',
      size: 45,
      required: true
    },
    passwordHash: {
      type: 'text',
      size: 128,
      required: true
    },
    info: {
      type: 'text',
      size: 1024
    },
    dateCreated: {
      type: 'date',
      required: true,
      time: true
    },
    dateLastLogon: {
      type: 'date',
      time: true
    }
  }, {
    validations: {
      login: [
        orm.enforce.required()
      ],
      passwordHash: [
        orm.enforce.required()
      ]
    }
  })
}