Page({
  data: {
    newsList: {}
  },
  onLoad: function () {
    var that = this
    // 获取笑话列表
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/latest',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var newsList = res.data.stories
        that.setData({newsList: newsList})
      }
    })
  }
})
