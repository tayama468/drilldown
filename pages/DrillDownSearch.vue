<template>
  <v-app>
    <div>
      <v-btn @click="open" block>
        Components Button
      </v-btn>
      <ConfirmDialog ref="confirm">
        <DrillDown :firstItems="firstItems" :initial-item="initialItem" :path="path"></DrillDown>
      </ConfirmDialog>
    </div>
  </v-app>
</template>

<script>
  const PATH = 'drillDown/fetch'
  import Button from '../components/Button.vue'
  import ConfirmDialog from '../components/Dialog.vue'
  import DrillDown from '../components/DrillDown.vue'
  export default {
    components: { Button, ConfirmDialog, DrillDown },
    data() {
      return {
        firstItems: [1, 2, 3],
        initialItem: {
          option1: 1,
          option2: '',
          option3: ''
        },
        isDialogOpened: false,
        isResoleved: false,
        path: PATH
      }
    },
    computed: {
      item1() {
        return this.isResoleved ? this.$refs.drillDown.item1 : this.initialItem.option1
      },
      item2() {
        return this.isResoleved ? this.$refs.drillDown.item2 : this.initialItem.option2
      },
      item3() {
        return this.isResoleved ? this.$refs.drillDown.item3 : this.initialItem.option3
      }
    },
    methods: {
      async open() {
        this.isDialogOpened = true
        if (await this.$refs.confirm.open()) {
          this.isDialogOpened = false
          this.isResoleved = true
        } else {
          this.isDialogOpened = false
        }
      }
    }
  }
</script>
