Page({

  /**  
   * 页面的初始数据  
   */
  data: {
    // mailCode: "发送验证码",
    boolean: true,
    isChecked: false,
    phone: '',
    phoneTip: '',
    userName: '',
    userNameTip: '',
    collName: '',
    collNameTip: '',
    userPassword: '',
    userPasswordTip: '',
    code: '',
    info: ''
  },
  //手机号  
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
        phone: mobile,
        boolean: false
      })
    }
  },
  //用户名  
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
  //用户密码  
  userPasswordInput: function (e) {
    let password = e.detail.value;
    if (password.length < 6 || password.length > 16) {
      this.setData({
        userPasswordTip: '密码长度为6-16位'
      })
    } else {
      this.setData({
        userPasswordTip: '',
        userPassword: password
      })
    }
  },
  //用户所在院 
  collInput: function (e) {
    let collName = e.detail.value;
    if (collName.length == 0) {
      this.setData({
        collNameTip: '院校不能为空'
      })
    } else {
      this.setData({
        collNameTip: '',
        collName: collName,
      })
    }
  },
  //注册 
  oLogin: function () {
    // 获取参数
    let that = this;
    var name = this.data.userName;
    var college = this.data.collName;
    var phone = this.data.phone;
    var password = this.data.userPassword;
    
    wx.request({
      url: 'http://localhost:3000/alumnus/findByName',
      data: {
        name: name
      },
      success: res => {
        // 判断注册用户是否存在
        if (res.data.length > 0) {
          var id = res.data[0].id;
          that.setData({
            info: '该用户已注册'
            
          })
          
        } else {
          wx.request({
            url: 'http://localhost:3000/alumnus/register',
            data: {
              name: name,
              college: college,
              phone: phone,
              password: password,
              state:0
            },
            // post提交
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "POST",
            success: res => {
              console.log(res);
              //成功的话直接跳转到首页  
              if (res.data.affectedRows == 1) {
                wx.switchTab({
                  url: '../logs/logs'
                })
              } else {
                that.setData({
                  info: res.data.info
                })
              }

            }
          })
        }
      },
    })
  },
  formReset: function () {
    console.log('form发生了reset事件', this.data.groupData)
  },
  /**  
   * 生命周期函数--监听页面加载  
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      //把读取出来的数据存储到页面的数据data中  
      code: options.code
    })
  }
})  