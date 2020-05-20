new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created() {
      const query = `
        query {
          getTodos {
            id title done createdAt updatedAt
          }
        }
      `

      fetch('/graphql', {
        method: 'post', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      })
        .then(res => res.json())
        .then(response => {
          this.todos = response.data.getTodos
        })
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        const query = `
          mutation {
            createTodo(todo: {title: "${title}"}) {
              id title done createdAt updatedAt
            }
          }
        `
        fetch('/graphql', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ query })
        })
          .then(res => res.json())
          .then(response => {
            const todo = response.data.createTodo
            this.todos.push(todo)
            this.todoTitle = ''
          })
          .catch(e => console.log(e))
      },

      removeTodo(id) {
        const query = `
          mutation {
            removeTodo(id: "${id}") 
          }
        `
        
        fetch('/graphql', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ query })
        })
          .then(() => {
            this.todos = this.todos.filter(t => t.id !== id)
          })
          .catch(e => console.log(e))
        this.todos = this.todos.filter(t => t.id !== id)
      }, 

      completeTodo(id) {
        const query = `
          mutation {
            completeTodo(id: "${id}") {
              updatedAt
            }
          }
        `
        
        fetch('/graphql', {
          method: 'post', 
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }, 
          body: JSON.stringify({ query })
        })
          .then(res => res.json())
          .then(response => {
            const index = this.todos.findIndex(t => t.id === id)
            this.todos[index].updatedAt = response.data.completeTodo.updatedAt
          })
          .catch(e => console.log(e))
        console.log(id)
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }

        if (withTime) {
          options.hour = '2-digit',
          options.minute = '2-digit',
          options.second = '2-digit'
        }

        return new Intl.DateTimeFormat('en-EN', options).format(new Date(+value))
      }
    }
  })