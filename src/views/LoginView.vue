<template>
    <div class="login-box">
        <div class="login-input-box">
            <h1>信贷后台管理系统</h1>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="password" prefix-icon="el-icon-s-order" v-model="ruleForm.pass"
                        autocomplete="off"></el-input>
                </el-form-item>


                <el-button type="primary" @click="submitForm">提交</el-button>

            </el-form>
        </div>
    </div>
</template>

<script>
import { doLogin, userInfo } from '@/apis/user.js';
import { Message } from 'element-ui';

export default {
    data() {
        return {
            ruleForm: {
                username: "",
                pass: "",
            },
            rules: {
                username: [{ required: true, trigger: "blur", message: "请输入用户名" },],
                pass: [{ required: true, trigger: "blur", validator: this.validatePass },],
            },
        };
    },
    methods: {
        validatePass(rule, value, callback) {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (value.length < 6) {
                callback(new Error("密码不能小于6位数"));
            } else {
                callback();
            }
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.login(this.ruleForm);
                } else {
                    return false;
                }
            });
        },

        async login(form) {
            let res = await doLogin(form)

            //如果是20000，说明是成功
            if (res.data.code === 20000) {
                Message.success("登录成功");
                //保存token
                if (res?.data?.data?.token) {
                    localStorage.setItem('token', res?.data?.data?.token)
                    this.$store.commit("NAMEUPDATE", this.ruleForm.username);
                    let res2 = await userInfo()
                    this.$store.commit("RoleUpdate", res2.data.data.roles[0].name);
                    this.$store.commit("isLogin", true);

                    // 跳转到首页
                    this.$router.replace("/home");
                }
            } else {
                this.$message.error('登录失败!!!');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url(../assets/bg2.jpg);
    background-size: cover;
}

.login-input-box {
    width: 650px;
    height: 320px;
    background: #fff;
    text-align: center;
    padding: 40px 40px 12px 12px;
}

.el-button {
    width: 600px;
}

.el-input {
    width: 600px;
    margin-bottom: 16px;
}

::v-deep .el-input__inner {
    background: #e5e5e5;
}
</style>