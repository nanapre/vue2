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
                    <div v-if="column.property === 'status'">
                        <!-- {{ row[column.property] | status }} 是一个插值表达式，它用于在 Vue.js 模板中显示数据，
                            并通过管道符 | 连接了一个过滤器 status -->
                        <el-tag :type="row[column.property] | statusColor">{{ row[column.property] | status }}
                        </el-tag>
                    </div>
                    <div v-else-if="column.property === 'opts'">
                        <el-button type="primary" @click="editApplication(row)"
                            :disabled="[0, 2, 3, 6].indexOf(row['status']) === -1">编辑</el-button>
                        <el-button type="danger" @click="deleteApplication(row.id)">删除</el-button>
                        <el-button type="success" @click="submitApplication(row.id)"
                            :disabled="[0, 2, 3, 6].indexOf(row['status']) === -1">提交审核</el-button>
                    </div>
                    <div v-else>
                        {{ row[column.property] }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--------------------------------------- 对话框------------------------------ -->
        <el-dialog title="申请管理-编辑" :visible="dialogVisible" @close="dialogVisible = false" width="30%">
            <div class="form-box">
                <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="80px">
                    <el-row>
                        <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
                            <el-form-item label="姓名" prop="name">
                                <el-input type='input' v-model="updateForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl=20 :lg=20 :md=12 :sm=24 :xs=24>
                            <el-form-item label="性别" prop="sex">
                                <el-select v-model="updateForm.sex">
                                    <el-option key="man" label="男" value="man">
                                    </el-option>
                                    <el-option key="woman" label="女" value="woman">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>

                <div class="btns clear-fix">
                    <div>
                        <el-button type="primary" @click="submitUpdate">提交</el-button>
                        <el-button @click="cleanFrom">重置</el-button>
                    </div>
                </div>

            </div>
        </el-dialog>
        <!------------------------------------------- 分页器----------------------- -->
        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="rows" class="margin-top">
        </el-pagination>
    </div>
</template>

<script>
import { getLoanList, updateLoan, deleteLoan, submitLoan } from "@/apis/loan.js";
export default {
    data() {
        return {
            query: "",
            tableData: [],
            dialogVisible: false,
            updateForm: {
                name: '',
                sex: '',
                id: 0
            },
            rules: {
                name: [{ required: true, message: '必须填写用户名' }],
                sex: [{ required: true, message: '必须填写性别' }],
            },
            rows: 0,//数据总条
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "80",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "160",
                },
                {
                    label: "性别",
                    prop: "sex",
                },
                {
                    label: "教育程度",
                    prop: "education",
                },
                {
                    label: "居住地址",
                    prop: "address1",
                },
                {
                    label: "手机号",
                    prop: "mobile_phone",
                },
                {
                    label: "申请状态",
                    prop: "status",
                },
                {
                    label: "操作",
                    width: "280",
                    prop: "opts",
                },
            ],
            params: {
                pageNo: 1,
                pageSize: 10
            },
        }
    },
    filters: {
        statusColor(status) {
            switch (status) {
                case 0:
                    return 'success'
                    break
                case 1:
                    return ''
                    break
                case 2:
                    return 'success'
                    break
                case 3:
                    return 'danger'
                    break
                case 4:
                    return 'warning'
                    break
                case 5:
                    return 'success'
                    break
                case 6:
                    return 'danger'
                    break
                case 7:
                    return 'success'
                    break
                default:
                    return 'danger'

            }
        },
        status(status) {
            switch (status) {
                case 0:
                    return '进件'
                    break
                case 1:
                    return '提交初审'
                    break
                case 2:
                    return '初审通过'
                    break
                case 3:
                    return '初审拒绝'
                    break
                case 4:
                    return '提交终审'
                    break
                case 5:
                    return '终审通过'
                    break
                case 6:
                    return '终审拒绝'
                    break
                case 7:
                    return '生成合同'
                    break
                default:
                    return '出错了'
            }
        }

    },
    methods: {
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.getLoanList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.getLoanList();
            console.log(`当前页: ${val}`);
        },
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
        getSex(str) {
            return str === "man" ? "男" : "女";
        },
        getEducation(str) {
            return str === "college" ? "大学" : "高中";
        },
        async getLoanList() {
            let res = await getLoanList(this.params);
            this.rows = res.data.data.rows
            if (res?.data?.code === 20000) {
                this.tableData = res.data.data.data.data.map((item) => {
                    item.birthday = this.getBirthday(item.birthday);
                    item.sex = this.getSex(item.sex);
                    item.education = this.getEducation(item.education);
                    return item;
                })
                console.log(this.rows);
            }

        },

        setQueryName() {
            this.params.name = this.query;
            this.getLoanList();
            this.params.name = null;
        },

        editApplication(row) {
            this.dialogVisible = true
            this.$nextTick(() => {
                this.updateForm.id = row.id
                this.updateForm.name = row.name
                this.updateForm.sex = row.sex
            })
        },

        async submitUpdate() {
            let res = await updateLoan(this.updateForm)
            if (res.data.code === 20000) {
                this.cleanFrom()
                this.dialogVisible = false
                this.getLoanList()
            }
            console.log("update", res)
        },
        cleanFrom() {
            console.log("重置了")
            // this.updateForm.name = ''
            this.$refs.updateForm.resetFields();
        },

        async deleteApplication(id) {
            let res = await deleteLoan(id)
            console.log("delete", res)
            if (res?.data?.code === 20000) {
                this.getLoanList();
            }
        },

        async submitApplication(id) {
            let res = await submitLoan(id)
            console.log("submit", res)
            if (res?.data?.code === 20000) {
                this.getLoanList();
            }
        }

    },
    mounted() {
        this.getLoanList();
    }
}
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
    width: 100%;
}

.btns {
    text-align: center;
}

.el-row {
    margin-bottom: 10px;
}

.margin-top {
    margin-top: 10px;
}
</style>