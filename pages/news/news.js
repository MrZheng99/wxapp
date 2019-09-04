// pages//news//news.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : '',
    url : '',
    title : '',
    content : [],
    pagenum : ''
  },
  //获取新闻页面
  getPage : function(){
    let that = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let myDate = that.getMyDate(year,month,day);
    wx.request({
      url: 'http://paperpost.people.com.cn/all-rmrb-'+ myDate+'.html',
      success: function(res){
        that.setData({
            page : res.data
        })
      }
    })
  },
  // 获取url和新闻标题
  getUrlTitle : function(){
    let that = this;
    // p为网页源代码
    let p = String(that.data.page);
    // console.log(p)
    let r1 = /http(.*)?\.htm/g;
    // u为新闻的所有url
    let u = p.match(r1);
    let r2 = /title=(.*)>?/g;
    // v表示新闻的标题
    let v = p.match(r2);
    // console.log(v)
    // k表示处理后的新闻标题
    let k = that.handTitle(v);
    // console.log(u);
    // console.log(k);
    that.setData({
      url : u,
      title : k
    })

  },
  // 处理新闻标题，去掉一些不必要的东西如"title=",
  handTitle : function(v){
    let r1 = /title="/g;
    let r2 = /">/g;
    for(let i=0;i<v.length;i++){
      let k=v[i].replace(r1,'');
      if(k.indexOf("\">")!=-1){
        k = k.split(r2)[0];
      }
      v[i]=k;
    }
    return v;
  },
  // 获取内容
  getContent : function(){
    let that = this;
    for(let i=0;i<that.data.url.length;i++){
      // console.log("开始获取文章")
      that.getPageData(that.data.url[i]);
    };
 
  },
  // 根据网址获取网页源码数据
  getPageData : function(u){
    let that = this;
    wx.request({
      url: u,
      data: {},
      method: 'GET',
      success: function(res){
        // console.log("成功获取文章网页源码")
        var txt = '';
        txt = that.getTxt(res.data);
        // console.log(txt)
        let content = that.data.content;
        content.push(txt);
        // console.log("成功获取文章")
        that.setData({
          content
        }
        )
        // console.log(that.data.content);
      },
    
    })

  }
  ,
  // 根据网页源码数据解析出新闻文章内容
  getTxt : function(pageData){
    // console.log("开始解析文章网页源码，获取文章")
    let r1 = /<!--enpcontent--><P>(.*)?<\/P><!--\/enpcontent-->/g
    let txt1 = pageData.match(r1);
    if(txt1!=null){
      let r2 = /<\/P>?<P>/g;
      let txt = txt1[1].replace(r2,"\n");
      // console.log(txt);
      if(txt.indexOf("<!--enpcontent--><P>")!=-1){
        txt = txt.replace("<!--enpcontent--><P>","");
        txt = txt.replace("</P><!--/enpcontent-->","");
      }
      // console.log("解析完毕");
      return txt;
    }else{
      // console.log("解析完毕");
      // console.log(txt1);
      return txt1;
    }
},
  // 获取2019-09-03类似的格式时间
  getMyDate : function(year,month,day){
    let myDate = '';
    while(true){
      if(day>10&&month<10){
        myDate = year + "-0" + month +"-" + day;
        break;
      };
      if(day>10&&month>10){
        myDate = year + "-" + month +"-0" + day;
          break;
      };
      if(day<10&&month<10){
        myDate = year + "-0" + month +"-0" + day;
        break;
      };
      if(day<10&&month>10){
        myDate =  year + "-" + month +"-0" + day;
        break;
      };
    }
    return myDate;
  },
  changeToTxtPage : function(e){
    let pageindex = e.currentTarget.id;
    console.log(pageindex)
    let that = this;
    that.setData({
      pagenum : pageindex
    })
    try{
        wx.setStorageSync(that.data.title[that.data.pagenum], that.data.content[that.data.pagenum])
        wx.setStorageSync("pagetitle", that.data.title[that.data.pagenum])
    }catch(e){}
    wx.navigateTo({
      url: '../newdetail/newdetail',
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
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPage();
    setTimeout(this.getUrlTitle,1000);
    setTimeout(this.getContent,2500);
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