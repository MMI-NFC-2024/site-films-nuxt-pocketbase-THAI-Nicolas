/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // add field
  collection.fields.addAt(10, new Field({
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

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "autodate_created",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "autodate_updated",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3292755704",
    "hidden": false,
    "id": "relation105650625",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "category",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // remove field
  collection.fields.removeById("file3834550803")

  // remove field
  collection.fields.removeById("autodate_created")

  // remove field
  collection.fields.removeById("autodate_updated")

  // update field
  collection.fields.addAt(8, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3292755704",
    "hidden": false,
    "id": "relation105650625",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // update field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation2375276105",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
