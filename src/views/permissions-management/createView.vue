<template>
    <div class="row-center box">
        <el-form class="form column-center" ref="form" :model="form" :rules="rules">
            <el-row class="row">
                <el-col class="col " :xl=8 :lg=8 :md=12 :sm=24 :xs=24>
                    <el-form-item label="权限分配" prop="permission" class="select">
                        <el-radio v-model="form.permission" label='2'>销售人员</el-radio>
                        <el-radio v-model="form.permission" label='1'>初审人员</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row">
                <el-col class="col" :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="用户名" prop="username">
                        <el-input type='input' v-model="form.username"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col class="col" :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="密码" prop="password">
                        <el-input type='password' v-model="form.password"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="row">
                <el-col class="col" :xl=12 :lg=12 :md=12 :sm=24 :xs=24>
                    <el-form-item label="确认密码" prop="confirmPwd">
                        <el-input type='password' v-model="form.confirmPwd"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="row ">
                <el-col class="col btn" :xl=8 :lg=8 :md=12 :sm=24 :xs=24>
                    <el-button type="primary" @click="submit">创建</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>

<script>
import { createUSer } from "@/apis/user.js";
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPwd: '',
                permission: ''
            },
            rules: {
                username: [{ required: true, message: "请输入名字", trigger: "blur" }],
                password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                confirmPwd: [{ required: true, validator: this.validatePass2, trigger: 'blur' }],
                permission: [{ required: true }]
            },
        }
    },
    methods: {
        validatePass2(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        },
        async submit() {
            this.$refs['form'].validate(async (data) => {
                if (!data) return this.$message('表单验证不通过')

                let res = await createUSer(this.form)
                console.log("createUSer", res);
                if (res.data.code === 20000) {
                    this.reset()
                }
            })
        },
        reset() {
            this.$refs['form'].resetFields()
        },
    }
}
</script>

<style lang="scss" scoped>
.box {
    height: 100%;
    width: 100%;
}

.form {
    width: 90%;
    height: 90%;
    background-color: #fff;
    border-radius: 3px;



    .row {
        width: 90%;
    }

    .col {
        width: 100%;


    }

    .btn {

        display: flex;
        justify-content: center;
    }

    .select {
        display: flex;
        justify-content: flex-start;
    }
}
</style>