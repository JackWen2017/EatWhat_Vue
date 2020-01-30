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
        :disabled="ctrlDisabled"
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
import RestaurantBtn from './RestaurantCommon/RestaurantBtn'
import RestaurantText from './RestaurantCommon/RestaurantText'
import RestaurantInput from './RestaurantCommon/RestaurantInput'

let inputList = [
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

let validateType = {
  text: {
    validateMethods: data => !data,
    validateText: name => `請輸入${name}`
  },
  checkbox: {
    validateMethods: data => !data || data.length <= 0,
    validateText: name => `請選擇${name}`
  },
  default: {
    validateMethods: () => true,
    validateText: () => `Input Error`
  }
}

export default {
  name: 'RestaurantForm',
  components: {
    RestaurantBtn,
    RestaurantText,
    RestaurantInput
  },
  data() {
    return {
      inputList
    }
  },
  computed: {
    ctrlDisabled() {
      let ctrlDisable = this.$store.getters['restaurant/ctrlDisable']
      return ctrlDisable ? ctrlDisable : false
    },
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
        disable = disable || this.checkInput(i) !== ''
      }
      return disable || this.ctrlDisabled
    }
  },
  methods: {
    checkInput(inputId) {
      let sendValue = this.sendValue
      let inputInfo = this.inputList[inputId]
      let key = inputInfo.name
      let name = inputInfo.text
      let type = inputInfo.type

      let validateObj = validateType[type] || validateType['default']
      let result =
        (validateObj.validateMethods(sendValue[key]) &&
          validateObj.validateText(name)) ||
        ''
      return result
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
      this.$emit('formSend', this.sendValue, this.cleanInput)
    }
  }
}
</script>

<style></style>
