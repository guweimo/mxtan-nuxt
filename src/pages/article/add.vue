<template>
  <div class="container">
    <div class="form-content">
      <form>
        <h2>新建博文</h2>
        <div class="form-group">
          <label class="form-top-item">
            <span class="form-star">*</span>标题
          </label>
          <input v-model="formData.title" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-top-item">
            <span class="form-star">*</span>类型
          </label>
          <select v-model="formData.type" class="form-bottom-item form-control">
            <option disabled value>请选择</option>
            <option
              v-for="item in navData"
              :key="item.id"
              :value="item.id"
              v-text="item.title"
            ></option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-top-item">
            <span class="form-star">*</span>内容
          </label>
          <no-ssr>
            <mavon-editor
              v-model="formData.marktext"
              class="form-bottom-item"
              :subfield="bars.subfield"
              :toolbars="bars"
              @change="obtainHTML"
            ></mavon-editor>
          </no-ssr>
        </div>
        <div class="form-bottom">
          <mt-button class="mt-cancel" @click="cancel">取消</mt-button>
          <mt-button class="mt-primary" @click="saveArticle">提交</mt-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import { mapState } from 'vuex'
import MtButton from '@/components/MtComponent/MtButton'
import { verifyFormValue } from '@/utils'
import { operateArticle } from '@/apis/article'

export default {
  layout: 'main',
  components: {
    MtButton,
    mavonEditor
  },
  data() {
    return {
      formData: {
        marktext: '',
        description: '',
        title: '',
        type: ''
      },
      toolbar: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        // link: true, // 链接
        // imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      bars: {}
    }
  },
  computed: {
    ...mapState('user', ['navData'])
  },
  mounted() {
    this.sizeToStatus()
    window.onresize = () => {
      this.sizeToStatus()
    }
  },
  methods: {
    sizeToStatus() {
      const matches = window.matchMedia('(max-width:768px)').matches
      if (matches) {
        this.bars = {
          bold: true, // 粗体
          italic: true, // 斜体
          strikethrough: true, // 中划线
          navigation: true, // 导航目录
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          subfield: false,
          preview: true
        }
      } else {
        this.bars = this.toolbar
      }
    },
    obtainHTML(text, html) {
      this.formData.description = html
    },
    cancel() {
      this.$router.replace('/home')
    },
    saveArticle() {
      const isbol = this.verifyform()
      if (!isbol) return
      this.formData.title = this.formData.title.trim()
      operateArticle(this.formData).then((res) => {
        const resData = res.data
        if (resData.status === 2000) {
          this.$router.replace(`/article/detail/${resData.data}`)
        } else {
          this.$message({
            type: 'error',
            content: resData.message
          })
        }
      })
    },
    verifyform() {
      const verifyArr = [
        { name: 'title', msg: '标题不能为空！' },
        { name: 'type', msg: '请选择类型！' },
        { name: 'marktext', msg: '内容不能为空！' }
      ]
      const { bol: isbol, msg: message } = verifyFormValue(
        this.formData,
        verifyArr
      )
      if (message !== '') {
        this.$message({
          type: 'error',
          content: message
        })
      }
      return isbol
    }
  }
}
</script>

<style lang="scss" scoped>
.form-content {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 5px 7px 15px rgba(0, 0, 0, 0.3);
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
}
.form-group {
  margin-bottom: 10px;
  label {
    display: block;
  }
  .form-top-item {
    margin-bottom: 10px;
  }
  input {
    display: block;
    width: 100%;
  }
  select {
    display: block;
    width: 100%;
  }
  .form-star {
    color: red;
    padding-right: 2px;
    vertical-align: middle;
    font-family: verdana;
  }
}
.form-bottom {
  text-align: center;
  margin-top: 30px;
  button:first-of-type {
    margin-right: 50px;
  }
}
@media screen and (max-width: 768px) {
  .form-content {
    width: 100%;
    padding: 10px;
  }
  .form-bottom {
    margin-top: 15px;
  }
}
</style>

<style scoped>
.form-group >>> .markdown-body ul {
  list-style-type: disc;
}

.form-group >>> .markdown-body ol {
  list-style-type: decimal;
}
</style>
