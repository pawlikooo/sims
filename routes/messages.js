var _ = require('lodash')
var router = require('express').Router()
var randomstring = require('randomstring')
var config = require('../config')

// GET all
router.get('/', function (req, res, next) {
  req.models.messages.find().order('id').all(function (err, messages) {
    if (err) return next(err)

    res.json({
      items: messages,
      result: 'ok'
    })
  })
})

// GET by id
router.get('/:id([0-9]+)', function (req, res, next) {
  var id = req.params.id

  req.models.messages.get(id, function (err, messages) {
    if (err) return next(err)

    res.json({
      items: messages,
      result: 'ok'
    })
  })
})

// POST new message
router.post('/', function (req, res, next) {
  var params = _.pick(req.body, 'sender', 'recipient', 'body')
  params.dateSend = new Date().toISOString().slice(0, 19).replace('T', ' ')

  req.models.messages.create(params, function (err, message) {
    if (err) return next(err)

    return res.status(201).json({
      items: message,
      result: 'ok'
    })
  })
})

// PUT by id
router.put('/:id', function (req, res, next) {
  var id = req.params.id
  var params = _.pick(req.body, 'sender', 'recipient', 'body', 'dateSend', 'dateRecivied', 'dateRead')

  req.models.messages.get(id, function (err, message) {
    if (err) return next(err)

    message.sender = params.sender ? params.sender : message.sender
    message.recipient = params.recipient ? params.recipient : message.recipient
    message.body = params.body ? params.body : message.body
    message.dateSend = params.dateSend ? params.dateSend : message.dateSend
    message.dateRecivied = params.dateRecivied ? params.dateRecivied : message.dateRecivied
    message.dateRead = params.dateRead ? params.dateRead : message.dateRead
    message.id = id
    message.save(function (err) {
      if (err) return next(err)
    })

    res.json({
      items: message,
      result: 'ok'
    })
  })
})

// delete by id
router.delete('/:id', function (req, res, next) {
  var id = req.params.id

  req.models.messages.get(id, function (err, message) {
    if (err) return next(err)
    message.remove(function (err) {
      if (err) return next(err)
    })

    res.json({
      result: 'ok'
    })
  })
})

// Generate random
router.get('/generator', function (req, res, next) {
  var sender = randomInt(1, config.generator.usersCount)
  var recipient = randomInt(1, config.generator.usersCount)

  var body = randomstring.generate({
    length: randomInt(0, 1000),
    charset: 'alphabetic'
  })

  var dateSendJs = randomDate(new Date(2012, 0, 1), new Date())
  var dateSendSql = dateSendJs.toISOString().slice(0, 19).replace('T', ' ')

  var dateReciviedJs = randomDate(dateSendJs, new Date())
  var dateReciviedSql =
  randomInt(1, 100) > 10
    ? dateReciviedJs.toISOString().slice(0, 19).replace('T', ' ')
    : ''

  var dateRead =
  (dateReciviedSql) || randomInt(1, 100) > 10
    ? randomDate(dateReciviedJs, new Date()).toISOString().slice(0, 19).replace('T', ' ')
    : ''

  var newMessage = {
    sender: sender,
    recipient: recipient,
    body: body,
    dateSend: dateSendSql,
    dateRecivied: dateReciviedSql,
    dateRead: dateRead
  }

  req.models.messages.create(newMessage, function (err, messages) {
    if (err) return next(err)

    return res.json({
      items: messages,
      result: 'ok'
    })
  })
})

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

function randomDate (start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

module.exports = router
