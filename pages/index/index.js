// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      region:["北京市","北京市","东城区"],
      now : '',
      date :new Date().toLocaleDateString(),
      condition : false
  },
  changeRegion: function(e){
      this.setData({
        region: e.detail.value,
        condition : true
      });
      this.getweather();
  },

  getweather: function(){
      let that = this;
      let area = '';
      let city = '';
      let s2 = that.data.region[2];
      let s1 = that.data.region[1];
      let l2 = s2.length-1;
      let l1 = s1.length-1;
      // 此处只是简单的处理地址，仅支持常见大部分地区，存在阿坝地区等某些地区的不支持
      if(s2[l2]==='区'|| s2[l2]==='市')
        {area = s2.substring(0,l2);}else{area = s2;}
      if(s1[l1]==='市'|| s1[l1]==='盟')
        {city = s1.substring(0,l1);}else{city = s1;}
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather/now?location='+ 
              area +','+ city,
        data: {
          key : "b93b2ed9ca38447892b1692f959d805c"
        },
        success: function(res){
          // success
          that.setData({
            now:res.data.HeWeather6[0].now
          })
        },
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})