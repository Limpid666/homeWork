<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column
        v-if="index"
        label="序号"
        type="index"
        width="55"
      ></el-table-column>
      <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :sort-by="item.sortBy"
        :sortable="item.sort"
        :render-header="item.renderHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="scope">
          <slot
            v-if="item.type === 'slot'"
            :name="item.slot_name"
            :data="scope.row"
          ></slot>
          <component
            v-else
            :data="scope.row"
            :config="item"
            :prop="item.prop"
            :is="!item.type ? 'com-text' : `com-${item.type}`"
          ></component>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
// const modules = {},
// const files = require.context('../control', true, /index.vue$/i)
// files.keys().forEach(item => {
//   const key = item.split('/')
//   const name = key[1]
//   modules[`com-${name}`] = files(item).default
// }),
// console.log(modules)
  name: 'ccTable',
  props: {
    column: {
      type: Array,
      default: () => []
    },
    checkbox: Boolean,
    index: Boolean,
    url: {
      type: String,
      default: '',
      required: true
    },
    method: {
      type: String,
      default: 'GET'
    },
    data: {
      type: Object,
      default: () => { }
    },
    params: {
      type: Object,
      default: () => { }
    },
    initRequest: Boolean,
    onLoad: Boolean,
    format: Function
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.initRequest && this.getTableList()
  },
  methods: {
    async getTableList() {
      const url = this.url
      if (!url) {
        throw new Error('url is required')
        return false
      }
      try {
        const requestData = {
          url: this.url,
          method: this.method
        }

        if (JSON.stringify(this.data) === '{}') {
          requestData.data = this.data
        }

        if (JSON.stringify(this.params) === '{}') {
          requestData.params = this.params
        }
        const response = await this.$axios(requestData)

        let data = response.data.data

        if (this.format && typeof this.format === 'function') {
          data = this.format(response.data)
        }
        this.tableData = data

        this.onLoad && this.$emit('onLoad', response.data)
      } catch (e) {
        console.log(e)
      }
    },
    handleRequest() {
      this.getTableList()
    }
  }
}
</script>

<style scoped></style>
