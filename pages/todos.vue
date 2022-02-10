<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.text">
        <v-checkbox
          v-model="checkedList"
          :class="{ done: todo.done }"
          :label="todo.text"
          :value="todo.text"
          @change="toggle(todo)"
        ></v-checkbox>
      </li>
      <li>
        <v-text-field @keyup.enter="addTodo" placeholder="What needs to be done?"></v-text-field>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    async fetch({ store, params }) {
      await store.dispatch('todos/fetch')
    },
    created() {
      this.todos.forEach(todo => {
        if (todo.done) this.checkedList.push(todo.text)
      })
    },
    data() {
      return {
        checkedList: []
      }
    },
    computed: {
      ...mapState ({
        todos: state => state.todos.list
      })
    },
    methods: {
      addTodo (e) {
        this.add(e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'todos/toggle',
        add: 'todos/add'
      })
    }
  }
</script>

<style>
  .done label {
    text-decoration: line-through;
  }
</style>