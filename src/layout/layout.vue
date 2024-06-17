<template>
    <div>
        <el-container>
            <el-aside width="240px">
                <el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                    active-text-color="#ffd04b" router>
                    <AsideMenu v-for="(menu, index) in menuList" :key="index" :menu="menu" />
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
import AsideMenu from "@/components/AsideMenu.vue"
import { logout } from "@/apis/user";
export default {
    components: {
        Breadcrumb,
        AsideMenu

    },
    computed: {
        userName() {
            return this.$store.state.userName;
        },
        menuList() {
            return this.$store.state.menuList
        }
    },
    methods: {
        async logout(command) {
            if (command === "logout") {
                let res = await logout();
                if (res.data.code === 603) {
                    localStorage.removeItem("token");
                    console.log('localStorage', localStorage)
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