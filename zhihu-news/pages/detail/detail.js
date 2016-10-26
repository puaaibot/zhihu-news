Page({
  data: {
    news: {},
  },
  // 获取笑话详细内容
  onLoad (options) {
    var that = this
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
        if (res.data.body) {
          var body = res.data.body;
          body = body.match( /<p>.*?<\/p>/g );
          var ss = [];
          if (body) {
            for( var i = 0, len = body.length; i < len;i++ ) {
              ss[i] = /<img.*?>/.test( body[i] );
              if( ss[i] ) {
                  body[i] = body[i].match( /(http:|https:).*?\.(jpg|jpeg|gif|png)/ );
              } else {
                  body[i] = body[i].replace( /<p>/g, '' )
                  .replace( /<\/p>/g, '' )
                  .replace( /<strong>/g, '' )
                  .replace( /<\/strong>/g, '' )
                  .replace( /<a.*?\/a>/g, '' )
                  .replace( /&nbsp;/g, ' ' )
                  .replace( /&ldquo;/g, '"' )
                  .replace( /&rdquo;/g, '"' );
              }
            }
          }
          res.data.body = body
        }
         that.setData({
           news: res.data
         })
      }
    })
  }
})