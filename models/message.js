module.exports = function(orm, db) {
  var Messages = db.define('messages', {
    sender: {
      type: 'integer',
      required: true
    },
    recipient: {
      type: 'integer',
      required: true
    },
    body: {
      type: 'text',
      size: 500,
      required: true
    },
    dateSend: {
      type: 'date',
      required: true,
      time: true
    },
    dateRecivied: {
      type: 'date',
      time: true
    },
    dateRead: {
      type: 'date',
      time: true
    }
  }, {
    validations: {
      sender: [
        orm.enforce.required()
      ],
      recipient: [
        orm.enforce.required()
      ]
    }
  })
}