<template>
    <div>
        <el-container>

            <el-aside width="240px">
                <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <router-link to='/home'>首页</router-link>
                    </el-menu-item>
                    <el-submenu index="2"
                        v-if="allowedRoles.includes('administrator') || allowedRoles.includes('input')">
                        <template slot="title">
                            <span>贷款管理</span>
                        </template>
                        <el-menu-item index="2-1">
                            <router-link to='/loan-input/index'>贷款申请</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3"
                        v-if="allowedRoles.includes('administrator') || allowedRoles.includes('input')">
                        <template slot="title">
                            <span>申请管理</span>
                        </template>
                        <el-menu-item index="3-1">
                            <router-link to='/application-manage/index'>申请列表</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="4"
                        v-if="allowedRoles.includes('administrator') || allowedRoles.includes('approve')">
                        <template slot="title">
                            <span>贷款审批</span>
                        </template>
                        <el-menu-item index="4-1">
                            <router-link to='/loan-approve/first'>初审</router-link>
                        </el-menu-item>
                        <el-menu-item index="4-2" v-if="allowedRoles.includes('administrator')">
                            <router-link to='/loan-approve/end'>终审</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="5" v-if="allowedRoles.includes('administrator')">
                        <template slot="title">
                            <span>合同管理</span>
                        </template>
                        <el-menu-item index="5-1">
                            <router-link to='/contract-list/index'>合同列表</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="6" v-if="allowedRoles.includes('administrator')">
                        <template slot="title">
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="6-1">
                            <router-link to='/permissions-management/create'>创建管理员</router-link>
                        </el-menu-item>
                        <el-menu-item index="6-2">
                            <router-link to='/permissions-management/list'>列表展示</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="left">
                        <Breadcrumb />
                    </div>
                    <div class="right">
                        <el-dropdown @command="logout">
                            <span class="el-dropdown-link">{{ userName }}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb.vue"
import { logout } from "@/apis/user";
import { mapGetters } from 'vuex';
export default {
    components: {
        Breadcrumb,
    },
    computed: {
        ...mapGetters(['userRole']),
        userName() {
            return this.$store.state.userName;
        },
        allowedRoles() {
            return [this.userRole];
        }
    },
    methods: {
        async logout(command) {
            if (command === "logout") {
                let res = await logout();

                if (res.data.code === 603) {
                    // this.$store.commit("isLogin", false);
                    localStorage.clear();
                    console.log('localStorage', localStorage)
                    //跳转后刷新下页面，清除掉路由信息
                    window.location.reload()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
a:link {
    text-decoration: none;
    color: #fff;
}

a:visited {
    text-decoration: none;
    color: #fff;
}

a:hover {
    text-decoration: none;
    color: #fff;
}

a:active {
    text-decoration: none;
    color: #fff;
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #373636;
}

.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
}

.el-container {
    height: 100vh;
}

.el-menu-vertical-demo {
    border: none;
}

.router-link-active {
    color: rgb(255, 208, 75) !important;
}
</style>