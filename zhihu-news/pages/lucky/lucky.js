Page({
  data: {
    joke: "",
    silderValue: 0,
    silderHidden: false,
    jokeHidden: true
  },
  sliderChange: function (e) {
    var that = this
    if (e.detail.value == 100) {
      // 随机获取一个笑话
      wx.request({
        url: 'http://api.icndb.com/jokes/random',
        success: function(res) {
          var joke = res.data.value.joke
          that.setData({
            silderHidden: true,
            jokeHidden: false,
            joke: joke
          })
        }
      })
    } else {
      // 如何重置slider?
    }
  }
})
