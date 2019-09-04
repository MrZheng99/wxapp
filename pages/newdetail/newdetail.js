// pages//newdetail//newdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagetitle : '',
    pagecontent : ''
  },
  getPageTitle : function(){
    let that = this;
    wx.getStorage({
      key: 'pagetitle',
      success: function(res){
       that.setData({
         pagetitle : res.data
       })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  getPageContent : function(){
    let that = this;
    wx.getStorage({
      key: that.data.pagetitle,
      success: function(res){
       that.setData({
         pagecontent : res.data
       })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(this.getPageTitle,1000);
    setTimeout(this.getPageContent,2000);
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
    let that = this;
    wx.removeStorage({
      key: that.data.pagetitle,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.removeStorage({
      key: "pagetitle",
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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