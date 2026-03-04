/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file3834550803",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "logo",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "50x50"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file3834550803",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "logo",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "100x50"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
