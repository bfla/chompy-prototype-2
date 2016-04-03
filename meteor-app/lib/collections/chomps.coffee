@Chomps = new Mongo.Collection('chomps')

_schema = new SimpleSchema
  blurb:
    type: String
    optional: true
  s3Img:
    type: String
    optional: true
  localFile:
    type: String
    optional: true
  createdAt:
    type: Date
    defaultValue: new Date()
  updatedAt:
    type: Date
    autoValue: -> new Date()
Chomps.attachSchema(_schema)

_createChomp = (params) ->
  s3Path = 'foo'
  Chomps.insert(
    blurb: params.blurb
    localFile: params.localFile
    s3Img: s3Path)

Meteor.methods
  # @params.blurb
  # @params.localFile
  # @params.imgBinary - photo binary
  createChomp: _createChomp
