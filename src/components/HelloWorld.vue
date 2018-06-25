<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<h1>num=={{num}}</h1>
		<h1>sum=={{sum}}</h1>
		<h2>Essential Links</h2>

		<div @click="addnum">addnum</div>
		<div @click="addsum">addsum</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  computed: {
    num: function() {
      return this.$store.state.num;
    },
    ...mapState({
      //sum:'sum',
      sum: state => state.sum,
      //num:'num',
      num: state => state.num,
    })
  },
  methods: {
    addnum: function() {
      var that = this;
      this.$store.commit({
        type: 'num',
        data: {
          num: 2,
          calls: function() {
            //that.sum = that.$store.state.num;
          }
        }
      });
    },
    addsum: function() {
      var that = this;
      this.$store.commit({
        type: 'sum',
        data: {
          sum: 2,
          calls: function() {
            //that.sum = that.$store.state.num;
          }
        }
      });
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
</style>