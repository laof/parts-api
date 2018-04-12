 <h1 align="center"> Parts Api文档</h1>

### 前言

测试用：
账号：admin ，密码：123

### 1、post user/login 登录
#### 接收参数
* name:string。
* passeword:string。
* inputCode:string。 输入验证码
* codeId:string。 验证码id(接口3)
#### 返回值示例
``` javascript
{success: true, user_id: '5433d5e4e737cbe96dcef312',image:'src/img/my.png'}
```

### 2、post user/register 注册
#### 接收参数
* name:string。
* passeword:string。
* code:string。 验证码
* codeId:string。 验证码id(接口3)
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
{success: true,image:'src/img/temp1.png',code_id:'5433d5e4e737cbe96dcef312'}
```
### 4、post verification/username 验证用户名重名
#### 接收参数
* name:string。


``` javascript
$.ajax({
    url: "http://localhost:18080/verification/username",
    type: 'POST',
    datType: "JSON",
    contentType: "application/json",
    data: JSON.stringify({
        name: "admin"
    }),
    success: function(res) {
        console.log(res);
    }
});

```

#### 返回值示例
``` javascript
{success: true,exist_name:false}
```

