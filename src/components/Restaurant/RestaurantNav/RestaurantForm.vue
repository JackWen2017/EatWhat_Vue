<template>
  <div class="restaurant-form">
    <form>
      <component
        v-for="input in inputList"
        :key="input.id"
        :is="input.component"
        v-model="input.value"
        :inputName="input.name"
        :inputText="input.text"
        :inputType="input.type"
        :inputData="input.data"
        :placeholder="input.placeholder"
      />
      <RestaurantBtn
        text="送出"
        @click.native="formSend"
        :disabled="checkDisabled"
      />
    </form>
  </div>
</template>

<script>
import RestaurantBtn from './RestaurantBtn'
import RestaurantText from './RestaurantText'
import RestaurantInput from './RestaurantInput'
export default {
  name: 'RestaurantForm',
  components: {
    RestaurantBtn,
    RestaurantText,
    RestaurantInput
  },
  data() {
    return {
      inputList: [
        {
          id: 1,
          name: 'name',
          text: '餐廳',
          type: 'text',
          placeholder: '請輸入餐廳',
          component: 'RestaurantText',
          value: ''
        },
        {
          id: 2,
          name: 'distance',
          text: '距離',
          type: 'checkbox',
          data: ['遠', '近'],
          component: 'RestaurantInput',
          value: [2]
        },
        {
          id: 3,
          name: 'taste',
          text: '清淡',
          type: 'checkbox',
          data: ['是', '否'],
          component: 'RestaurantInput',
          value: [1]
        }
      ]
    }
  },
  computed: {
    sendValue() {
      return this.inputList.reduce((pre, current) => {
        if (current) {
          pre[current.name] = current.value
        }
        return pre
      }, {})
    },
    checkDisabled() {
      let inputSize = this.inputList.length
      let disable = false
      for (let i = 0; i < inputSize; i++) {
        if (this.checkInput(i)) {
          disable = true
          break
        }
      }
      return disable
    }
  },
  methods: {
    checkInput(inputId) {
      let checkResult = ''
      let sendValue = this.sendValue
      let inputInfo = this.inputList[inputId]
      let key = inputInfo.name
      let name = inputInfo.text
      let type = inputInfo.type
      if (type === 'text') {
        if (!sendValue[key]) checkResult = `請輸入${name}`
      } else if (type === 'checkbox') {
        if (!sendValue[key] || sendValue[key].length <= 0)
          checkResult = `請選擇${name}`
      } else {
        checkResult = 'Input Error'
      }
      return checkResult
    },
    cleanInput() {
      this.inputList[0].value = ''
      this.inputList[1].value = [2]
      this.inputList[2].value = [1]
    },
    formSend() {
      let inputSize = this.inputList.length
      for (let i = 0; i < inputSize; i++) {
        let result = this.checkInput(i)
        if (result) {
          alert(result)
          return
        }
      }
      let sendValue = JSON.stringify(this.sendValue)
      alert(`輸入資料${sendValue}`)
      this.cleanInput()
    }
  }
}
</script>

<style>
.restaurant-form {
  background: rgb(252, 249, 119);
  width: 100%;
  border-radius: 0px 0px 0px 5px;
  border: 1.5px solid rgb(19, 10, 145);
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
}
.title {
  font-weight: bold;
}

.data {
  padding-left: 5px;
  display: flex;
  align-items: center;
}

.text {
  margin-left: 5px;
  margin-right: 5px;
  width: 50%;
}

.radio,
.checkbox {
  height: 15px;
  width: 15px;
}
</style>
