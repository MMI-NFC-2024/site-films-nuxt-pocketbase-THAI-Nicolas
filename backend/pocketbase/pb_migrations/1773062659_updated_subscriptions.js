/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update collection data
  unmarshal({
    "deleteRule": "",
    "listRule": "",
    "updateRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3980638064")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != \"\" && @request.auth.id = user.id",
    "listRule": "@request.auth.id != \"\" && @request.body.user.id = @request.auth.id",
    "updateRule": "@request.auth.id != \"\" && @request.auth.id = user.id && @request.body.user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
})
