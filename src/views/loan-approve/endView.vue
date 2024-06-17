<template>
    <div>
        <!-------------------------------  搜索框----------------------------- -->
        <el-row type="flex" justify="space-around">
            <el-col :span="22"><el-input placeholder="请输入名称" type="text" v-model="query"></el-input></el-col>
            <el-col :span="2"><el-button type="primary" @click="setQueryName">搜索</el-button></el-col>
        </el-row>
        <!-------------------------------  表格----------------------------- -->
        <el-table :data="tableData" stripe style="width: 100%" border>
            <el-table-column type="index" label="序号" width="55" align="center">
            </el-table-column>
            <el-table-column v-for="(item, index) in columns" :key="index" :label="item.label" :prop="item.prop"
                :width="item.width" align="center">

                <template v-slot="{ column, row }">
                    <div v-if="column.property === 'opts'">
                        <el-button type="primary" @click="showLaon(row)">查看</el-button>
                        <el-button type="success" @click="submit(row.id, 'pass')">通过</el-button>
                        <el-button type="danger" @click="submit(row.id, 'reject')">拒绝</el-button>
                    </div>
                    <div v-else>{{ row[column.property] }}</div>
                </template>

            </el-table-column>
        </el-table>


        <el-dialog title="贷款审批-查看详情" :visible="dialogVisible" @close="dialogVisible = false" width="30%">
            <div class="form-box" v-if="dialogVisible">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-row>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="id" prop="id">
                                <el-input type='input' v-model="form.id" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="姓名" prop="name">
                                <el-input type='input' v-model="form.name" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="出生日期" prop="birthday">
                                <el-input type='input' v-model="form.birthday" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="性别" prop="sex">
                                <el-input type='input' v-model="form.sex" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="教育程度" prop="education">
                                <el-input type='input' v-model="form.education" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="地址" prop="address1">
                                <el-input type='input' v-model="form.address1" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="手机号" prop="phone">
                                <el-input type='input' v-model="form.phone" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=24 :lg=24 :md=12 :sm=24 :xs=24>
                            <el-form-item label="身份证" prop="identity_card">
                                <el-input type='input' v-model="form.identity_card" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div class="btns clear-fix">
                    <div>
                        <el-button type="primary" @click="dialogVisible = !dialogVisible">取消</el-button>

                    </div>
                </div>

            </div>
        </el-dialog>
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[1, 2, 3, 4]"
            :page-size="pageData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="rows"
            class="margin-top">
        </el-pagination>
    </div>
</template>

<script>
import { queryEndList, approveEnd } from "@/apis/loan.js"
// import {queryList} from '@/apis/loan.js'
export default {
    data() {
        return {
            query: "",
            tableData: [],
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "200",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "300",
                },
                {
                    label: "身份证",
                    prop: "identity_card",
                    width: "300",
                },
                {
                    label: "操作",
                    prop: "opts",
                },
            ],
            pageData: {
                pageNo: 1,
                pageSize: 1,
            },
            form: {},
            dialogVisible: false,
            rows: 0,
        }
    },

    methods: {
        getBirthday(date) {
            let dateNow = new Date(date);
            function convert(data) {
                return data < 10 ? "0" + data : data;
            }
            let year = dateNow.getFullYear();
            let month = convert(dateNow.getMonth());
            let day = convert(dateNow.getDate());

            let hours = convert(dateNow.getHours());
            let minutes = convert(dateNow.getMinutes());
            let seconds = convert(dateNow.getSeconds());
            let dateStr =
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;
            return dateStr;
        },

        async getApproveList() {
            let res = await queryEndList(this.pageData);
            if (res.data.code === 20000) {
                this.tableData = res.data.data.data.data.map((item) => {
                    item.birthday = this.getBirthday(item.birthday);
                    return item;
                });
            }
            this.rows = res.data.data.rows
        },
        async setQueryName() {
            this.pageData.name = this.query;
            await this.getApproveList();
            this.pageData.name = null;
        },

        showLaon(row) {
            console.log(row)
            this.form = row
            this.dialogVisible = true
        },
        async submit(id, flag) {
            let res = await approveEnd(id, flag);
            this.getApproveList();
            console.log("submit", res)
        },
        handleSizeChange(val) {
            this.pageData.pageSize = val;
            this.getApproveList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageData.pageNo = val;
            this.getApproveList();
            console.log(`当前页: ${val}`);
        },

    },

    mounted() {
        this.getApproveList();
    }
}
</script>

<style lang="scss" scoped>
//::v-deep .el-table--scrollable-x .el-table__body-wrapper {
//   overflow-x: hidden;
//}

.el-select,
.el-input {
    width: 100%;
}

.btns {
    text-align: center;
}

.box-card {
    margin-bottom: 10px;

    >div {
        >div {
            text-align: left;
        }
    }
}

.el-row {
    margin-bottom: 10px;
}

.margin-top {
    margin-top: 10px;
}
</style>