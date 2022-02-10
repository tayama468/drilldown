<template>
  <div>
    <v-dialog v-model="dialog" @keydown.esc="cancel">
      <v-card>
        <v-card-text>
          <slot></slot>
          <div>
            <v-row justify="center">
              <v-btn
                color="primary"
                outlined
                rounded
                @click.native="cancel"
                >キャンセル</v-btn
              >
              <v-btn color="primary" rounded @click.native="agree">
                適用する
              </v-btn>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        resolve: () => {},
        reject: () => {},
        open: () => {
          return new Promise((resolve, reject) => {
            this.dialog = true
            this.resolve = resolve
            this.reject = reject
          })
        }
      }
    },
    methods: {
      agree() {
        this.resolve(true)
        this.dialog = false
      },
      cancel() {
        this.resolve(false)
        this.dialog = false
      }
    }
  }
</script>