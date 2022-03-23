const app = Vue.createApp({
  data() {
    return {
      currentForm: 'personal-form',
      form: {}
    }
  },   // computed 用法:運算資料後的樣子，邏輯的判斷， DATA:靜態資料
  computed: {
    computedForm: function () {
      if (this.currentForm == 'final-form') {
        return this.form
      }
    }
  },
  methods: {
    updateForm(value) {

      this.currentForm = value

    },
    updateInfo(data) {

      this.form[data.key] = data.value

    }
  }
})

app.component('personal-form', {
  template: '#form1',
  data() {
    return {
      name: '',
      phone: ''
    }
  },
  methods: {
    nextSteps() {
      this.$emit('setting-form', 'address-form')
    }
  },
  watch: {
    name: {
      handler(value) {
        this.$emit('update', 
        { 'key': 'name', 
          'value': value })
      }
    },
    phone: {
      handler(value) { 
        this.$emit('update', { 'key': 'phone', 'value': value })
      }
    }
  }
})

app.component('address-form', {
  template: '#form2',
  data() {
    return {
      address: ''
    }
  },
  methods: {
    preSteps() {
      this.$emit('setting-form', 'personal-form')
    },
    nextSteps() {
      this.$emit('setting-form', 'final-form')
    }
  },
  watch: {
    address: {
      handler(value) {
        this.$emit('update', { 'key': 'address', 'value': value })
      }
    }
  }
})

app.component('final-form', {
  template: '#form3',
  props: ['formData'],
  methods: {
    preSteps() {
      this.$emit('setting-form', 'address-form')
    }
  }
})

app.mount('#app') //預設