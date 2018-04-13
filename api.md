 <h1 align="center"> Parts Api文档</h1>

### 前言

测试用：
账号：admin ，密码：123

### 1、post user/login 登录
#### 接收参数
* name:string。
* passeword:string。
* inputCode:string。 输入验证码


``` javascript
$.ajax({
    url: "user/login",
    type: 'POST',
    datType: "JSON",
    data:{
        name: "admin",
        password:"123",
        inputCode:"nanuk"
    },
    success: function(res) {
        console.log(res);
    }
});

```

#### 返回值示例
``` javascript
{success: true, image:'src/img/my.png'}
```

### 2、post user/register 注册
#### 接收参数
* name:string。
* passeword:string。
* code:string。 验证码
* email:string。
* gender:string。m男 w女
* idPhoto:image。头像

#### 返回值示例
``` javascript
{success: true}
```
### 3、post verification/code 验证码

#### 返回值示例
``` javascript
{success: true,image:'src/img/temp1.png'}
```
### 4、post verification/username 验证用户名重名
#### 接收参数
* name:string。



#### 返回值示例
``` javascript
{success: true,exist_name:false}
```

