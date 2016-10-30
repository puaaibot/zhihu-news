Page({
  data: {
    newsList: [],
    loadingHidden: true,
    modalHidden: true
  },
  onReachBottom: function (e) {
    this.setData({loadingHidden: false})
    loadMore(this)
  },
  modalConfirm: function () {
    this.setData({modalHidden: true})
  },
  onLoad: function () {
    this.index = 1
    var that = this
    // 获取新闻列表
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/latest',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var newsList = res.data.stories
        that.setData({newsList: newsList})
      },
      fail: function () {
        that.setData({modalHidden: true})
      }
    })
  }
})

function loadMore(that) {
  var newsList = that.data.newsList
  var formatNextDate = getFormatNextDate(that)
  wx.request({
    url: 'http://news.at.zhihu.com/api/4/news/before/' + formatNextDate,
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      var moreNewsList = res.data.stories
      that.setData({
        newsList: newsList.concat(moreNewsList),
        loadingHidden: true
      })
    }
  })
}

function getNextDate(that) {
  var now = new Date()
  var nextDate = new Date(now.getTime() - (that.index++ * 1000 * 60 * 60 * 24))
  return nextDate
}

function getFormatNextDate(that) {
  var nextDate = getNextDate(that)
  var year = nextDate.getFullYear()
  var month = nextDate.getMonth() + 1  // 为什么会返回上一个月 =,=
  var day = nextDate.getDate()
  return Number([year, month, day].join(''))
}
