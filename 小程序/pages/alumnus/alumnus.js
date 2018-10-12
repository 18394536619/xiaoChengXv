Page({
  data: {
    Gradtime:'请选择毕业时间',
    Birth:'请选择出生日期',
    boolean0: true,
    boolean1: false,
    boolean2: true,
    boolean3: true,
    boolean4: true,
    listData: '',
    Grade: ['请选择年级','14届', '13届', '12届', '11届'],
    Clazz: ['请选择班级','1班', '2班', '3班', '4班'],
    index2: 0,
    index3: 0
  },
  onLoad: function () {
    // 获取
    var pdata = (wx.getStorageSync('pdate') || []);
    this.setData({
      DohData2: pdata,
    });
    wx.request({
      url: 'http://localhost:3000/alumnus/findAll',
      data: {
      },
      success: res => {
        var date = res.data;
        var i = 1;
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
        date = date.slice(0, i);
        this.setData({
          I: i,
          listData: date
        });
      }
    })
  },
  // 下拉加载
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    var i = this.data.I + 1;
    wx.request({
      url: 'http://localhost:3000/alumnus/findAll',
      data: {
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
        res.data = res.data.slice(0, i);
        that.setData({
          I: i,
          listData: res.data
        });
      }
    })
    wx.stopPullDownRefresh() //停止下拉刷新 
    // wx.hideNavigationBarLoading() //完成停止加载

  },
  // 多选

  checkboxChange: function (e) {
    var that = this;
    // 转化成JSON格式
    if (this.data.DohData2[0].state == 2) {
      var ss = JSON.stringify(e.detail.value);
      wx.request({
        url: 'http://localhost:3000/alumnus/batchDelete',
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
            url: 'http://localhost:3000/alumnus/findAll',
            data: {
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
    } else {
      wx.showToast({
        title: '权限不足',
        icon: 'success',
        duration: 2000
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
  // 增删改查
  actioncnt: function (e) {
    var that = this;
    var idd = e.currentTarget.dataset.id;
    var app = getApp();
    app.globalData.idds = idd;
    // 管理员操作
    if (this.data.DohData2[0].state == 2) {
      wx.showActionSheet({
        itemList: ['修改', '删除', '查看', '添加'],
        success: function (res) {
          if (res.tapIndex == 0) {//修改
            // console.log('++idd+++', idd);
  
            wx.request({
              url: 'http://localhost:3000/alumnus/findById',
              data: {
                id: idd
              },
              success: res => {
                // res.data[0].birth
                var date = res.data;
                var grade = date[0].grade;
                var clazz = date[0].clazz;
                that.data.Grade.forEach(function (item, index) {
                  if (item == grade) {
                    that.setData({
                      index2: index
                    })
                  }
                });
                that.data.Clazz.forEach(function (item, index) {
                  if (item == clazz) {
                    that.setData({
                      index3: index
                    })
                  }
                });
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
                that.setData({
                  upData: date,
                  boolean1: true,
                  boolean2: true,
                  boolean3: false,
                  Name: date[0].name,
                  Gender: date[0].gender,
                  Nation: date[0].nation,
                  Birth: date[0].birth,
                  College: date[0].college,
                  Gradtime: date[0].gradtime,
                  Dress: date[0].dress,
                  Phone: date[0].phone,
                  Major: date[0].major,
                  Password: date[0].password,
                  Edu: date[0].edu,
                  
                })
              }
            })
          } else if (res.tapIndex == 1) {
            // 删除
            var ss = JSON.stringify([idd]);
            wx.request({
              url: 'http://localhost:3000/alumnus/batchDelete',
              data: {
                ids: ss,
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
                      listData: res.data,
                      boolean1: false,
                      boolean2: true,
                      boolean3: true,
                    });
                  }
                })

              }
            })
          } else if (res.tapIndex == 2) {
            // 查看
            that.setData({
              boolean2: false,
              boolean1: true,
              boolean3: true,
            });
            wx.request({
              url: 'http://localhost:3000/alumnus/findById',
              data: {
                id: idd
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
                var date = res.data;
                that.setData({
                  listData2: date
                })
              }
            })
          } else {
            // 添加
            that.setData({
              boolean1: true,
              boolean2: true,
              boolean3: true,
              boolean4: false,
            });

          }
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    } else {
      // 非管理员查看
      that.setData({
        boolean2: false,
        boolean1: true,
        boolean3: true,
      });
      wx.request({
        url: 'http://localhost:3000/alumnus/findById',
        data: {
          id: idd
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
          var date = res.data;
          that.setData({
            listData2: date
          })
        }
      })
    }

  },
  // 获取输入框的值
  searchInput: function (e) {
    let search = e.detail.value;
    this.setData({
      Search: search
    })
  },
  //年级
  bindGradeChange: function (e) {
    this.setData({
      index2: e.detail.value,
      
    });
  },
  //班级
  bindClazzChange: function (e) {
    this.setData({
      index3: e.detail.value,
     
    });
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
  genderInput: function (e) {
    let gender = e.detail.value;
    this.setData({
      Gender: gender
    })
  },
  nationInput: function (e) {
    let nation = e.detail.value;
    this.setData({
      Nation: nation
    })
  },
  birthInput: function (e) {
    let birth = e.detail.value;
    this.setData({
      Birth: birth
    })
  },
  collegeInput: function (e) {
    let college = e.detail.value;
    if (college.length == 0) {
      this.setData({
        collegeTip: '学院不能为空'
      })
    } else {
      this.setData({
        collegeTip: '',
        College: college
      })
    }
  },
  gradtimeInput: function (e) {
    let gradtime = e.detail.value;
    this.setData({
      Gradtime: gradtime
    })
  },
  dressInput: function (e) {
    let dress = e.detail.value;
    this.setData({
      Dress: dress
    })
  },
  phoneInput: function (e) {
    let phone = e.detail.value;
    let myreg = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,3,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
    if (phone.length == 0) {
      this.setData({
        phoneTip: '手机号不能为空'
      })
    } else if (!myreg.test(phone)) {
      this.setData({
        phoneTip: '请检查您的手机号是否有误'
      })
    } else {
      this.setData({
        phoneTip: '',
        Phone: phone,
      })
    }
  },
  majorInput: function (e) {
    let major = e.detail.value;
    this.setData({
      Major: major
    })
  },
  eduInput: function (e) {
    let edu = e.detail.value;
    this.setData({
      Edu: edu
    })
  },
  passwordInput: function (e) {
    let password = e.detail.value;
    if (password.length < 6 || password.length > 16) {
      this.setData({
        passwordTip: '密码长度为6-16位'
      })
    } else {
      this.setData({
        // passwordTip: '',
        Password: password
      })
    }
  },
  // 修改校友信息
  queding: function () {
    var that = this;
    // 获取全局变量
    var app = getApp();
    var id = app.globalData.idds
    var name = this.data.Name;
    var gender = this.data.Gender;
    var nation = this.data.Nation;
    var birth = this.data.Birth;
    var gradtime = this.data.Gradtime;
    var college = this.data.College;
    var major = this.data.Major;
    var edu = this.data.Edu;
    var dress = this.data.Dress;
    var phone = this.data.Phone;
    var grade = this.data.Grade[this.data.index2];
    var clazz = this.data.Clazz[this.data.index3];
    wx.request({
      url: 'http://localhost:3000/alumnus/update',
      data: {
        id: id,
        name: name,
        gender: gender,
        nation: nation,
        birth: birth,
        gradtime: gradtime,
        college: college,
        major: major,
        edu: edu,
        dress: dress,
        phone: phone,
        grade: grade,
        clazz: clazz
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: res => {
        that.setData({
          boolean1: true,
          boolean2: false,
          boolean3: true,
        });
        wx.request({
          url: 'http://localhost:3000/alumnus/findById',
          data: {
            id: id,
          },
          success: res => {
            console.log('id', that.data.DohData2[0].id);

            res.data.forEach(function (item, index) {
             
              var a = item.birth;
              var b = item.gradtime;
              var aa = a.slice(0, 10);
              var bb = b.slice(0, 10);
              item.birth = aa;
              item.gradtime = bb;
            });
            if (id == that.data.DohData2[0].id) {
              wx.setStorageSync('pdate', res.data);
            };
            that.setData({
              listData2: res.data,
              index2:0,
              index3:0
            });
          }
        })

      }
    })
  },
  // 添加
  submit: function () {
    var that = this;
    var name = this.data.Name;
    var gender = this.data.Gender;
    var nation = this.data.Nation;
    var birth = this.data.Birth;
    var gradtime = this.data.Gradtime;
    var college = this.data.College;
    var major = this.data.Major;
    var edu = this.data.Edu;
    var dress = this.data.Dress;
    var phone = this.data.Phone;
    var password = this.data.Password;
    var grade = this.data.Grade[this.data.index2];
    var clazz = this.data.Clazz[this.data.index3];
    wx.request({
      url: 'http://localhost:3000/alumnus/save',
      data: {
        name: name,
        gender: gender,
        nation: nation,
        birth: birth,
        gradtime: gradtime,
        college: college,
        major: major,
        edu: edu,
        dress: dress,
        phone: phone,
        password: password,
        grade: grade,
        clazz: clazz
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
              listData: res.data,
              boolean1: false,
              boolean2: true,
              boolean3: true,
              boolean4: true,

              Name: '',
              Gender: '',
              Nation: '',
              Birth: '请选择出生日期',
              Gradtime: '请选择毕业时间',
              College: '',
              Major: '',
              Edu: '',
              Dress: '',
              Phone: '',
              Password: '',
              index2 :0,
              index3 :0
            });
          }
        })
      }
    })
  },
  // 清空
  formReset: function () { },
  // 搜索
  searchs: function () {
    var that = this;
    var gra = that.data.Grade[that.data.index2];
    var cla = that.data.Clazz[that.data.index3];
    if (that.data.index2 != 0 && that.data.index3!= 0) {
      wx.request({
        url: 'http://localhost:3000/alumnus/findClazz',
        data: {
          grade:gra,
          clazz:cla
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
              boolean1: false,
              boolean2: true,
              boolean3: true,
              listData: res.data,
              index2: 0,
              index3: 0
            });

        }
      })
    } else{
      if (that.data.index2){
        var key = gra;
      }else{
        var key = this.data.Search;
      }
      wx.request({
        url: 'http://localhost:3000/alumnus/query',
        data: {
          keys: key,
        },
        success: res => {
          console.log('search', res.data);

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
          if (res.data.length == 1) {
            that.setData({
              boolean1: true,
              boolean2: false,
              boolean3: true,
              listData2: res.data
            });
          } else {
            that.setData({
              boolean1: false,
              boolean2: true,
              boolean3: true,
              
              listData: res.data
            });
          }

        }
      })
    } 
  }
})