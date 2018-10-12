// pages/perssion/persion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pdata = (wx.getStorageSync('pdate') || []);
    this.setData({
      listData2: pdata,
      DohData2: pdata
    });
    wx.request({
      url: 'http://localhost:3000/alumnus/findAll',
      data: {
      },
      success: res => {
        var date = res.data;
        date.forEach(function (item, index) {
          if (item.birth != null) {
            var a = item.birth;
            var b = item.gradtime;
            var aa = a.slice(0, 10);
            var bb = b.slice(0, 10);
            item.birth = aa;
            item.gradtime = bb;
          }
        });
        this.setData({
          listData: date
        });
      }
    })
  },
  // 导航
  bindPersion: function () {
    wx.navigateTo({
      url: '../person/person'
    })
  },
  tapAlumnus: function () {
    // 跳转到bar中没有的页面
    wx.navigateTo({
      url: '../alumnus/alumnus'
    })
  },
  
  bindPe: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  permission: function () {
    wx.navigateTo({
      url: '../perssion/perssion'
    })
  },
  actioncnt: function (e) {
    var that = this;
    var idd = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['校友', '组长', '管理员'],
      success: function (res) {
        // console.log(res.tapIndex);
        var state = res.tapIndex;
        wx.request({
          url: 'http://localhost:3000/alumnus/updatestate',
          data: {
            id: idd,
            state: state
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success: res => {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            });
            wx.request({
              url: 'http://localhost:3000/alumnus/findAll',
              data: {
              },
              success: res => {
                console.log(res.data);
                res.data.forEach(function (item, index) {
                  // console.log(item);
                  var a = item.birth;
                  var b = item.gradtime;
                  var aa = a.slice(0, 10);
                  var bb = b.slice(0, 10);
                  item.birth = aa;
                  item.gradtime = bb;
                });
                that.setData({
                  listData: res.data
                });
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 多选框授权
  checkboxChange: function (e) {
    var that = this;
    var idd = e.detail.value;
    wx.showActionSheet({
      itemList: ['校友', '组长', '管理员'],
      success: function (res) {
        // console.log(res.tapIndex);
        var state = res.tapIndex;
        wx.request({
          url: 'http://localhost:3000/alumnus/updatestate',
          data: {
            id: idd,
            state: state
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: "POST",
          success: res => {
            wx.request({
              url: 'http://localhost:3000/alumnus/findAll',
              data: {
              },
              success: res => {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                });
                console.log(res.data);
                res.data.forEach(function (item, index) {
                  // console.log(item);
                  var a = item.birth;
                  var b = item.gradtime;
                  var aa = a.slice(0, 10);
                  var bb = b.slice(0, 10);
                  item.birth = aa;
                  item.gradtime = bb;
                });
                that.setData({
                  listData: res.data
                });
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  searchInput: function (e) {
    let search = e.detail.value;
    // console.log('-search-', search);
    this.setData({
      Search: search
    })
  },
  searchs: function () {
    var that = this;
    var key = this.data.Search;
    wx.request({
      url: 'http://localhost:3000/alumnus/query',
      data: {
        keys: key,
      },
      success: res => {
        res.data.forEach(function (item, index) {
          if (item.birth != null) {
            var a = item.birth;
            var b = item.gradtime;
            var aa = a.slice(0, 10);
            var bb = b.slice(0, 10);
            item.birth = aa;
            item.gradtime = bb;
          }
        });
        that.setData({
          listData: res.data
        });
      }
    })
  }
})