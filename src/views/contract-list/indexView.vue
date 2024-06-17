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
                        <!--5代表终审通过,大于5就代表已经生成合同了，需要禁用-->
                        <el-button :disabled="row['status'] > 5" @click="generateContract(row.id)"
                            type="primary">生成合同</el-button>
                        <!--7代表生成合同,不等于7需要禁用-->
                        <el-button :disabled="row['status'] !== 7" @click="downloadContract(row.id)"
                            type="success">下载合同</el-button>
                    </div>
                    <div v-else-if="column.property === 'status'">
                        <el-tag :type="row[column.property] === 7 ? 'success' : ''">
                            {{ row[column.property] === 7 ? '生成合同' : '未生成合同' }}
                        </el-tag>
                    </div>
                    <div v-else>{{ row[column.property] }}</div>
                </template>

            </el-table-column>
        </el-table>



        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
            :page-sizes="[10, 20, 30, 40]" :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="rows" class="margin-top">
        </el-pagination>
    </div>
</template>

<script>
import { queryContract, generateContract, downloadContract } from "@/apis/loan.js"
import request from '@/utils/request'
export default {



    data() {
        return {
            query: "",
            tableData: [],
            columns: [
                {
                    label: "姓名",
                    prop: "name",
                    width: "150",
                },
                {
                    label: "出生日期",
                    prop: "birthday",
                    width: "200",
                },
                {
                    label: "身份证",
                    prop: "identity_card",
                    width: "300",
                },
                {
                    label: "合同状态",
                    prop: "status",
                    width: "160",
                },
                {
                    label: "操作",
                    prop: "opts",
                },
            ],
            pageData: {
                pageNo: 1,
                pageSize: 10,
            },
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

        async getContractList() {
            let res = await queryContract(this.pageData);
            if (res.data.code === 20000) {
                this.tableData = res.data.data.data.data.map((item) => {
                    item.birthday = this.getBirthday(item.birthday);
                    return item;
                });
            }
            console.log("queryContract", res)
            this.rows = res.data.data.rows
        },
        async setQueryName() {
            this.pageData.name = this.query;
            await this.getContractList();
            this.pageData.name = null;
        },

        async generateContract(id) {
            let res = await generateContract(id);
            this.getContractList();
            console.log("generateContract", res)
        },
        async downloadContract(id) {
            let res = await downloadContract(id);
            console.log("downloadContract", res)
            if (res.data.code === 20000) {
                //对请求回来的地址去除/api
                let url = res.data.data.url.replace('/api', '')
                let fileName = '贷款合同-' + id + '.docx'
                //使用拆分的url再次请求，并指定请求返回的数据类型为'blob
                let res2 = await request({
                    url,
                    responseType: 'blob'
                })
                // 内存中的临时指向
                let link = window.URL.createObjectURL(res2.data)
                // 创建a标签
                let tagA = document.createElement('a')
                // tag
                tagA.href = link
                tagA.download = fileName
                // 隐藏a标签
                tagA.style.display = 'none'
                // 插入到body中
                document.body.appendChild(tagA)
                // 点击a标签
                tagA.click()
                // 释放资源 
                document.body.removeChild(tagA)
                // 释放临时url
                window.URL.revokeObjectURL(url)
            }
        },
        handleSizeChange(val) {
            this.pageData.pageSize = val;
            this.getContractList();
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageData.pageNo = val;
            this.getContractList();
            console.log(`当前页: ${val}`);
        },

    },

    mounted() {
        this.getContractList();
    }
}
</script>

<style lang="scss" scoped>
//::v-deep .el-table--scrollable-x .el-table__body-wrapper {
//   overflow-x: hidden;
//}}

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