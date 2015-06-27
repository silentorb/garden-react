var Vineyard = {
  start: function () {
    this.query({
      "trellis": "user",
      "filters": [
        {
          "path": "id",
          "value": "user",
          "type": "parameter"
        }
      ],
      "version": "1.0.0.browser"
    })
      .then(function (response) {
        var user = response.objects[0]
        if (user.username == 'anonymous') {
          Garden.goto('garden-login')
        }
        else {
          Garden.goto('garden-hub')
        }
      })
  },
  query: function (data) {
    return Garden.post('vineyard/query', data)
  },
  post: function (path, data) {
    return Garden.http('POST', path, data)
  },
  get: function (path) {
    return Garden.http('GET', path)
  },
  http: function (method, path, data) {
    if (data === void 0) {
      data = null
    }
    var def = $.Deferred()
    var options = {
      method: method,
      contentType: 'application/json',
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (response) {
        def.resolve(response)
      }
    }
    jQuery.ajax(this.vineyard_url + path, options)
    return def.promise
  }
}