<template>
  <div style="border:1px solid #ccc;">
    <ua2-markdown :source="mdvalue1" />
  </div>
</template>

<script>
import ua2Markdown from '../../components/ua2-markdown/ua-markdown.vue';
export default {
  components:{ ua2Markdown },
  data() {
    return {
      mdvalue1: "",
      mdvalue2: "使用 JavaScript 编写的冒泡排序算法：\n\n```js\nfunction bubbleSort(arr) {\n  var len = arr.length;\n  for (var i = 0; i < len - 1; i++) {\n    for (var j = 0; j < len - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        var temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}\n\n// 示例\nvar arr = [5, 3, 8, 4, 2];\nconsole.log(bubbleSort(arr)); // [2, 3, 4, 5, 8]\n```\n\n该算法的基本思路是依次比较相邻的两个元素，如果它们的顺序不正确则交换它们的位置。每一轮比较都会找到当前待排序序列中的最大值，所以需要进行 `n-1` 轮比较。在每一轮比较中，需要比较 `n-i-1` 对元素。"
    }
  },
  onLoad(option) {
		// this.mdvalue1 = this.mdvalue2
		this.mdvalue1 = option.message.replace(/\\n/gm,"\n")
	},
  methods:{

  }
}
</script>

<style>

</style>
