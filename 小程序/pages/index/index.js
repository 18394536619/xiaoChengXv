
Page({
  data: {
    boolean1: false,
    boolean2: true,
    boolean3: true,
    boolean4: true,
    Foundtime: '请选择组建时间'
  },
  //事件处理函数
  onLoad: function () {
    var pdata = (wx.getStorageSync('pdate') || []);
    this.setData({
      listData2: pdata,
      DohData2: pdata,
    });
    wx.request({
      url: 'http://localhost:3000/grioup/findAll',
      data: {
      },
      success: res => {
        var that = this;
        var date = res.data;
        var i = 2;
        // console.log('DohData2', date);
        date.forEach(function (item, index) {
          var a = item.foundtime
          var aa = a.slice(0, 10);
          item.foundtime = aa;
        });
        date = date.slice(0, i);
        that.setData({
          i: i,
          groupData: date
        })
      },
      fail: function (res) {
        console.log('error', res.errMsg)
      }
    });
    wx.request({
      url: 'http://localhost:3000/alumnus/findAll',
      data: {
      },
      success: res => {
        var that = this;
        var date = res.data;
        // var i = 2;
         console.log('alumnus', date);
        that.setData({
          alumnus: date
        })
      },
      fail: function (res) {
        console.log('error', res.errMsg)
      }
    });
  },
  // 下拉加载
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    var i = this.data.i + 2;
    wx.request({
      url: 'http://localhost:3000/grioup/findAll',
      data: {
      },
      success: res => {
        res.data.forEach(function (item, index) {
          var a = item.foundtime
          var aa = a.slice(0, 10);
          item.foundtime = aa;
        });
        res.data = res.data.slice(0, i);
        that.setData({
          i: i,
          groupData: res.data
        });
      }
    })
    wx.stopPullDownRefresh() //停止下拉刷新 
    wx.hideNavigationBarLoading() //完成停止加载

  },
  checkboxChange: function (e) {
    var that = this;
    var id = e.detail.value;
    // console.log(id);
    // 非管理员操作
    if (this.data.listData2[0].state !== 0) {
      var ss = JSON.stringify([id]);
      // 转化成JSON格式 
      wx.request({
        url: 'http://localhost:3000/grioup/batchDelete',
        data: {
          ids: ss,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: res => {
          // 及时刷新
          wx.request({
            url: 'http://localhost:3000/grioup/findAll',
            data: {
            },
            success: res => {
              res.data.forEach(function (item, index) {
                var a = item.foundtime
                var aa = a.slice(0, 10);
                item.foundtime = aa;
              });
              that.setData({
                groupData: res.data
              });
            }
          })

        }
      })
    } else {
      wx.showToast({
        title: '权限不足',
        icon: 'success',
        duration: 1500
      })
    }

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
    var app = getApp();
    app.globalData.idds = idd;
    if (this.data.listData2[0].state !== 0) {
      wx.showActionSheet({
        itemList: ['修改', '删除', '添加', '查看'],
        success: function (res) {
          // console.log('update', idd);
          if (res.tapIndex == 0) {//修改
            that.setData({
              upData: ''
            });
            wx.request({
              url: 'http://localhost:3000/grioup/findById',
              data: {
                id: idd
              },
              success: res => {
                var date = res.data;
                date.forEach(function (item, index) {
                  var a = item.foundtime
                  var aa = a.slice(0, 10);
                  item.foundtime = aa;
                });
                that.data.alumnus.forEach(function (item, index) {
                  if (date[0].alumnus_id == item.id) {
                    date[0].Leader = item.name
                  }
                });
                that.setData({
                  upData: date,
                  boolean1: true,
                  boolean2: false,
                  boolean4: true,
                  Name: date[0].groupname,
                  Province: date[0].province,
                  City: date[0].city,
                  Mem: date[0].mem,
                  Foundtime: date[0].foundtime
                })

              }
            })
          } else if (res.tapIndex == 1) {
            // 删除
            var ss = JSON.stringify([idd]);
            wx.request({
              url: 'http://localhost:3000/grioup/batchDelete',
              data: {
                ids: ss,
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: "POST",
              success: res => {
                wx.request({
                  url: 'http://localhost:3000/grioup/findAll',
                  data: {
                  },
                  success: res => {
                    res.data.forEach(function (item, index) {
                      var a = item.foundtime
                      var aa = a.slice(0, 10);
                      item.foundtime = aa;
                    });
                    that.setData({
                      groupData: res.data
                    });
                  }
                })

              }
            })
          } else if (res.tapIndex == 2) {
            // 添加
            that.setData({
              boolean1: true,
              boolean2: true,
              boolean3: false,
              boolean4: true,
              // index: 0,
              // index1: 0
            })

          } else {
            // 查找
            wx.request({
              url: 'http://localhost:3000/grioup/findById',
              data: {
                id: idd
              },
              success: res => {
                var date = res.data;
                // console.log('+-+-+-++-',date);
                date.forEach(function (item, index) {
                  var a = item.foundtime
                  var aa = a.slice(0, 10);
                  item.foundtime = aa;
                });
                that.setData({
                  boolean1: true,
                  boolean2: true,
                  boolean3: true,
                  boolean4: false,
                  chData: date,
                });
                that.data.alumnus.forEach(function (item, index) {
                  if (date[0].alumnus_id == item.id) {
                    that.setData({
                      Phone: item.phone
                    });
                  }
                });
                that.data.groupData.forEach(function (item, index) {
                  if (item.id == idd) {
                    that.setData({
                      leaderData: item.name,
                       Phone: item.phone
                    });
                  }
                });
              }
            })

          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:3000/grioup/findById',
        data: {
          id: idd
        },
        success: res => {
          var date = res.data;
          date.forEach(function (item, index) {
            var a = item.foundtime
            var aa = a.slice(0, 10);
            item.foundtime = aa;
          });

          that.setData({
            boolean1: true,
            boolean2: true,
            boolean3: true,
            boolean4: false,
            chData: date,
          });
          that.data.groupData.forEach(function (item, index) {
            if (item.id == idd) {
              that.setData({
                leaderData: item.name,
                Phone: item.phone
              });
            }
          });
        }
      })
    }


  },
  nameInput: function (e) {
    // 获取输入的值
    let name = e.detail.value;
    if (name.length == 0) {
      this.setData({
        nameTip: '姓名不能为空'
      })
    } else {
      this.setData({
        nameTip: '',
        Name: name,
      })
    }
  },
  provinceInput: function (e) {
    let province = e.detail.value;
    this.setData({
      Province: province
    })
  },
  cityInput: function (e) {
    let city = e.detail.value;
    this.setData({
      City: city
    })
  },
  foundInput: function (e) {
    let foundtime = e.detail.value;
    this.setData({
      Foundtime: foundtime
    })
  },
  memInput: function (e) {
    let mem = e.detail.value;
    this.setData({
      Mem: mem
    })

  },
  // 添加
  leaderInput: function (e) {
    var that = this;
    var leader = e.detail.value;
    wx.request({
      url: 'http://localhost:3000/alumnus/findByName',
      data: {
        name: leader
      },
      success: res => {
        var date = res.data[0].name;
        var Phone = res.data[0].phone;
        if (date == leader) {
            that.setData({
              Leader: res.data[0].id,
               Phone: res.data[0].phone
            });
        }
      }
    })
  },
  searchInput: function (e) {
    let search = e.detail.value;
    this.setData({
      Search: search
    })
  },
  // 修改信息
  queding: function () {
    var that = this;
    // 获取全局变量
    var app = getApp();
    var id = app.globalData.idds
    var name = this.data.Name;
    var province = this.data.Province;
    var city = this.data.City;
    var mem = this.data.Mem;
    var foundtime = this.data.Foundtime;
    var leader = this.data.Leader;
    wx.request({
      url: 'http://localhost:3000/grioup/update',
      data: {
        id: id,
        groupname: name,
        province: province,
        city: city,
        mem: mem,
        foundtime: foundtime,
        alumnus_id: leader
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: res => {
        wx.request({
          url: 'http://localhost:3000/grioup/findAll',
          data: {

          },
          success: res => {
            res.data.forEach(function (item, index) {
              var a = item.foundtime
              var aa = a.slice(0, 10);
              item.foundtime = aa;
            });
            that.setData({
              groupData: res.data,
              boolean1: false,
              boolean2: true,
              boolean3: true,
            });
          }
        })

      }
    })
  },
  // 添加信息

  submit: function () {
    var that = this;
    var name = this.data.Name;
    var province = this.data.Province;
    var city = this.data.City;
    var mem = this.data.Mem;
    var foundtime = this.data.Foundtime;
    var leader = this.data.Leader;
    // console.log('leader', leader);
    wx.request({
      url: 'http://localhost:3000/grioup/save',
      data: {
        groupname: name,
        province: province,
        city: city,
        mem: mem,
        foundtime: foundtime,
        alumnus_id: leader
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: res => {
        wx.request({
          url: 'http://localhost:3000/grioup/findAll',
          data: {

          },
          success: res => {
            // 时间格式处理
            res.data.forEach(function (item, index) {
              var a = item.foundtime
              var aa = a.slice(0, 10);
              item.foundtime = aa;
            });
            that.setData({
              boolean1: false,
              boolean2: true,
              boolean3: true,
              groupData: res.data,
              // 清空添加的数据
              Groupname: '',
              Province: '',
              City: '',
              Mem: '',
              Foundtime: '请选择组建时间',
              Alumnus_id: '',

            });
          }
        })
      }
    })
  },
  formReset: function () {
    // console.log('form发生了reset事件', this.data.groupData)
  },
  // 搜索
  searchs: function () {
   var that = this;
    var key = that.data.Search;
    that.data.alumnus.forEach(function (item, index) {
      if(key==item.name){
        key=item.id
        // console.log(item.id)
      }
    });

  //  青青
    wx.request({
      url: 'http://localhost:3000/grioup/query',
      data: {
        keys: key,
      },
      success: res => {
        // console.log('++++++++++',res)
        // 时间格式处理
        res.data.forEach(function (item, index) {
          var a = item.foundtime
          var aa = a.slice(0, 10);
          item.foundtime = aa;
        });
        that.data.groupData.forEach(function (item, index) {
          if (item.id == res.data[0].id) {
            if (res.data.length == 1) {
              that.setData({
                leaderData: item.name,
                Phone: item.phone,
                boolean1: true,
                boolean2: true,
                boolean3: true,
                boolean4: false,
                chData: res.data,
              });
            } else {
              that.setData({
                leaderData: item.name,
                Phone: item.phone,
                boolean1: false,
                boolean2: true,
                boolean3: true,
                boolean4: true,
                groupData: res.data,
              })
            }
          }
        });
      }
    })
  }

})
