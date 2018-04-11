 <h1 align="center"> Parts Api文档</h1>


### 1、post user/login 登录
#### 接收参数
* name:string。
* passeword:string。
* code:string。 验证码
* code_id:string。 验证码id(接口3)
#### 返回值示例
``` javascript
{success: true, user_id: '5433d5e4e737cbe96dcef312',image:'src/img/my.png'}
```

### 2、post user/register 注册
#### 接收参数
* name:string。
* passeword:string。
* code:string。 验证码
* code_id:string。 验证码id(接口3)
* email:string。
* gender:string。m男 w女
* id_photo:image。头像

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

#### 返回值示例
``` javascript
{success: true}
```