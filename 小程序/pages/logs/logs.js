// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boolean: true,
    userName: '',
    Phone: '',
    Password: '',
    phoneTip: '',
    userPasswordTip: '',
    userNameTip: '',
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    let userName = e.detail.value;
    if (userName.length == 0) {
      this.setData({
        userNameTip: '姓名不能为空'
      })
    } else {
      this.setData({
        userNameTip: '',
        userName: userName,
      })
    }
  },
  // 手机号码验证
  phoneInput: function (e) {
    let mobile = e.detail.value;
    let myreg = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,3,6,7,8]{1}\d{8}$|^18[\d]{9}$/;
    if (mobile.length == 0) {
      this.setData({
        phoneTip: '手机号不能为空'
      })
    } else if (!myreg.test(mobile)) {
      this.setData({
        phoneTip: '请检查您的手机号是否有误'
      })
    } else {
      this.setData({
        phoneTip: '',
        Phone: mobile,
        boolean: false
      })
    }
  },
  // 密码验证
  passwordInput: function (e) {
    let password = e.detail.value;
    if (password.length < 6 || password.length > 16) {
      this.setData({
        userPasswordTip: '密码长度为6-16位'
      })
    } else {
      this.setData({
        userPasswordTip: '',
        Password: password
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 提交
  loginTap: function (e) {
    var name = this.data.userName;
    var phone = this.data.Phone;
    var password = this.data.Password;
    wx.request({
      url: 'http://localhost:3000/alumnus/login',
      data: {
        name: name,
        phone: phone,
        password: password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: res => {
        this.setData({
          Name: '',
          Phone: '',
          Password: ''
        });
        var date = res.data;
        // 日期处理
        if (date.length > 0) {
          if (date[0].birth != null) {
            date.forEach(function (item, index) {
              var a = item.birth;
              var b = item.gradtime;
              var aa = a.slice(0, 10);
              var bb = b.slice(0, 10);
              item.birth = aa;
              item.gradtime = bb;
            });
          }
          // 静态缓存  
            if (date[0].state == 2) {
              wx.setStorageSync('pdate', date);
              wx.navigateTo({
                url: '../alumnus/alumnus'
              })
            } else {
              wx.setStorageSync('pdate', date);
              wx.navigateTo({
                url: '../person/person'
              })
            }
        } else {
          // 跳转到bar中有的页面
          wx.switchTab({
            url: '../register/register',
          })
        }

      },
      fail: function () {
        console.log('error');
        wx.switchTab({
          url: '../register/register',
        })
      }
    })
  },
  formReset: function () {
   
  }
})