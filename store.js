var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
},

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
    type: 'GET',
    url: "https://listalous.herokuapp.com/lists/shopping/"
  })

  loadRequest.done(function(dataFromServer) {
     items = dataFromServer.items
     notifyComponents()
    })
  },
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
    type: 'POST',
    url: "http://listalous.herokuapp.com/lists/shopping/items",
    data: { description: itemDescription, completed: false }
  })

    creationRequest.done(function(itemDataFromServer) {
    items.push(itemDataFromServer)
    notifyComponents()
  })

  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId)
    var currentCompletedValue = item.completed
    var updateRequest = $.ajax({
      type: 'PUT',
      url: "https://listalous.herokuapp.com/lists/shopping/items/" + itemId,
      data: { completed: !currentCompletedValue }
    })

    updateRequest.done(function(itemData) {
      item.completed = itemData.completed
      notifyComponents()
    })
  }
}