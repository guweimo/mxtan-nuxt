<template>
  <div class="blog-div">
    <div class="blog-align">
      <div class="blog-logo"></div>
      <h2>谷维陌</h2>
      <ul class="clearfix blog-ul">
        <li v-for="item in urlList" :key="item.title">
          <a :href="item.url" :target="item.target" v-text="item.title"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      urlList: [
        {
          url: 'https://github.com/guweimo',
          title: 'github',
          target: '_blank'
        },
        {
          url: 'https://www.jianshu.com/u/bdaa10098256',
          title: '简书',
          target: '_blank'
        },
        {
          url: '/home',
          title: 'home',
          target: '_self'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
$px-10: 10px;
$color-default: #52bab3; // #52bab3
$font-color: #fff; // .blog-div {text-align: center;}
.blog-div {
  display: flex;
  flex-direction: column;
  background-color: $color-default;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}
.blog-align {
  h2 {
    color: $font-color;
    text-align: center;
    margin-bottom: 20px;
  }
}
.blog-ul {
  text-align: center;
  a {
    text-decoration: none;
    color: $font-color;
  }
  li {
    display: inline;
    &:not(:last-of-type) {
      margin-right: $px-10;
      &::after {
        content: '|';
        padding-left: $px-10;
        color: $font-color;
      }
    }
  }
}
.blog-logo {
  height: 200px;
  width: 200px;
  background-image: url('../assets/picture.jpg');
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #ccc;
}
</style>
