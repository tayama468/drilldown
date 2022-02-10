<template>
  <div>
    <v-container fluid>
      <v-select v-for="(value, key) in initialItem"
        :key="key"
        :value="value"
        :items="getOption(key)"
        :label="key"
        :disabled="isDisabled(key)"
        @input="newv => updateItem(newv, value, key)"
        outlined
      ></v-select>
    </v-container>
  </div>
</template>

<script>
  export default {
    props: {
      initialItem: {
        type: Object,
        default: {}
      },
      firstItems: {
        type: Array,
        default: []
      },
      path: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      item1: '',
      item2: '',
      item3: '',
      canSelect: {
        option1: true,
        option2: false,
        option3: false,
      },
      isSetInitialOption: false
    }),
    computed: {
      option1() {
        if (this.firstItems.length === 0) return []
        return [{ text: '選択してください', value: ''}, ...this.firstItems]
      },
      option2() {
        if (!this.$store.state.drillDown) return []
        const option = this.$store.state.drillDown.option2
        return option
          ? [{ text: '選択してください', value: ''}, ...option]
          : [{ text: '選択してください', value: ''}]
      },
      option3() {
        if (!this.$store.state.drillDown) return []
        const option = this.$store.state.drillDown.option3
        return option
          ? [{ text: '選択してください', value: ''}, ...option]
          : [{ text: '選択してください', value: ''}]
      }
    },
    mounted() {
      this.prepareOption()
    },
    methods: {
      async prepareOption() {
        await this.$store.dispatch(this.path, {
          option1: this.initialItem.option1
        })
        await this.$store.dispatch(this.path, {
          option1: this.initialItem.option1,
          option2: this.initialItem.option2
        })
        this.$nextTick(() => {
          this.setInitialValue()
        })
      },
      setInitialValue() {
        this.item1 = this.initialItem.option1 ? this.initialItem.option1 : ''
        this.item2 = this.initialItem.option2 ? this.initialItem.option2 : ''
        this.item3 = this.initialItem.option3 ? this.initialItem.option3 : ''
        this.$nextTick(() => {
          this.isSetInitialOption = true
        })
      },
      getOption(key) {
        switch (key) {
          case 'option1':
            return this.option1
          case 'option2':
            return this.option2
          case 'option3':
            return this.option3
        }
      },
      updateItem(newv, value, key) {
        switch (key) {
          case 'option1':
            this.item1 = newv
            break
          case 'option2':
            this.item2 = newv
            break
          case 'option3':
            this.item3 = newv
            break
        }
      },
      isDisabled(key) {
        return !this.canSelect[key]
      }
    },
    watch: {
      item1(newv) {
        if (!this.isSetInitialOption) return
        this.canSelect['option3'] = false
        this.item2 = ''
        this.item3 = ''
        if (newv === '') {
          this.canSelect['option2'] = false
          return
        } 
        this.$store.dispatch(this.path, {
          option1: newv
        })
          .then(() => {
            if (this.$store.state.drillDown.option2) {
              this.canSelect['option2'] = true
            } else {
              this.canSelect['option2'] = false
            }
          })
          .catch(err => {
            console.log('/drillDown: ', err)
            this.isError = true
          })
      },
      item2(newv) {
        if (!this.isSetInitialOption) return
        this.item3 = ''
        if (newv === '') {
          this.canSelect['option3'] = false
          return
        }
        this.$store.dispatch(this.path, {
          option1: this.item1,
          option2: newv
        })
          .then(() => {
            if (this.$store.state.drillDown.option3) {
              this.canSelect['option3'] = true
            } else {
              this.canSelect['option3'] = false
            }
          })
          .catch(err => {
            console.log('/drillDown: ', err)
            this.isError = true
          })
      }
    }
  }
</script>