Page({
  data: {
    // 隐藏修改页面
    // array: ['美国', '中国', '巴西', '日本'],
    boolean1: false,
    boolean2: true,
    boolean3: true,
    boolean4: true,
    Grade: ['请选择年级', '14届', '13届', '12届', '11届'],
    Clazz: ['请选择班级', '1班', '2班', '3班', '4班'],
    index0: 0,
    index1: 0,
    Birth: '请选择出生日期',
  },
  onLoad: function (e) {
    // 获取静态缓存
    var pdata = (wx.getStorageSync('pdate') || []);
    this.setData({
      listData2: pdata,
      DohData2: pdata
    });
  },

  // 多选
  checkboxChange: function (e) {
  },
  // 导航页面跳转
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
  // 实现增删改查
  actioncnt: function (e) {
    var that = this;

    // 获取选项的id值
    var idd = e.currentTarget.dataset.id;
    // 给全局变量赋值
    var app = getApp();
    app.globalData.idds = idd;
    wx.showActionSheet({
      itemList: ['修改', '删除', '修改密码'],
      success: function (res) {
        if (res.tapIndex == 0) {//修改
          var pdata = (wx.getStorageSync('pdate') || []);
          //  console.log('a:+++++', pdata[0]);
          //  年级、班级显示
           var grade = pdata[0].grade;
           var clazz = pdata[0].clazz;
           that.data.Grade.forEach(function(item,index){
              if(item==grade){
                that.setData({
                  index0:index
                })
              }
           });
           that.data.Clazz.forEach(function (item, index) {
             if (item == clazz) {
               that.setData({
                 index1: index
               })
             }
           });
          that.setData({
            boolean1: true,
            boolean2: false,
            boolean3: true,
            boolean4: true,
            upData: pdata,
            Name: pdata[0].name,
            Gender: pdata[0].gender,
            Nation: pdata[0].nation,
            Birth: pdata[0].birth,
            Gradtime: pdata[0].gradtime,
            College: pdata[0].college,
            Major: pdata[0].major,
            Edu: pdata[0].edu,

            Dress: pdata[0].dress,
            Phone: pdata[0].phone,
          });
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
                url: 'http://localhost:3000/alumnus/findById',
                data: {
                  id: idd,
                },
                success: res => {
                  res.data.forEach(function (item, index) {
                    var a = item.birth;
                    var b = item.gradtime;
                    var aa = a.slice(0, 10);
                    var bb = b.slice(0, 10);
                    item.birth = aa;
                    item.gradtime = bb;
                  });
                  that.setData({
                    listData2: res.data
                  });
                }
              })

            }
          })
        } else {
          that.setData({
            boolean1: true,
            boolean2: true,
            boolean3: false,
            boolean4: false,
          });
          wx.request({
            url: 'http://localhost:3000/alumnus/findById',
            data: {
              id: idd,
            },
            success: res => {
              res.data.forEach(function (item, index) {
                var a = item.birth;
                var b = item.gradtime;
                var aa = a.slice(0, 10);
                var bb = b.slice(0, 10);
                item.birth = aa;
                item.gradtime = bb;
              });
              that.setData({
                listData2: res.data
              });
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  //年级
  bindGradeChange: function (e) {
    this.setData({
      index0: e.detail.value
    });
  },
  //班级
  bindClazzChange: function (e) {
    this.setData({
      index1: e.detail.value
    });
  },
  // 获取输入框的值
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
    console.log('picker发送选择改变，携带值为', e.detail.value)
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
    //console.log('picker发送选择改变，携带值为', e.detail.value)
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
  repasswordInput: function (e) {
    let repassword = e.detail.value;
    if (repassword.length < 6 || repassword.length > 16) {
      this.setData({
        passwordTip: '密码长度为6-16位'
      })
    } else {
      this.setData({
        passwordTip: '',
        Repassword: repassword
      })
    }
  },
  // 修改个人信息
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
    var grade = this.data.Grade[this.data.index0];
    var clazz = this.data.Clazz[this.data.index1];

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
        console.log(res.data);
        that.setData({
          boolean1: false,
          boolean2: true,
        });
        wx.request({
          url: 'http://localhost:3000/alumnus/findById',
          data: {
            id: id,
          },
          success: res => {
            res.data.forEach(function (item, index) {
              var a = item.birth;
              var b = item.gradtime;
              var aa = a.slice(0, 10);
              var bb = b.slice(0, 10);
              item.birth = aa;
              item.gradtime = bb;
            });
            wx.setStorageSync('pdate', res.data);
            that.setData({
              listData2: res.data
            });
          }
        })

      }
    })
  },
  // 修改密码
  submit: function () {
    var that = this;
    var password = this.data.Password;
    var repassword = this.data.Repassword;
    var app = getApp();
    var id = app.globalData.idds
    if (password == repassword) {
      wx.request({
        url: 'http://localhost:3000/alumnus/updatepwd',
        data: {
          id: id,
          password: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success: res => {
          that.setData({
            boolean1: false,
            boolean2: true,
            boolean3: true,
            boolean4: true,
          });
          wx.request({
            url: 'http://localhost:3000/alumnus/findById',
            data: {
              id: id,
            },
            success: res => {
              res.data.forEach(function (item, index) {
                var a = item.birth;
                var b = item.gradtime;
                var aa = a.slice(0, 10);
                var bb = b.slice(0, 10);
                item.birth = aa;
                item.gradtime = bb;
              });
              that.setData({
                listData2: res.data
              });
            }
          })

        }
      })
    }
  },
  // form表单重置
  formReset: function () {
    console.log('form发生了reset事件', this.data.groupData)
  },

})