const Todo = Backbone.Model.extend({
    validate: function (attrs) {
        if (!attrs.name || !attrs.id) {
            return 'Name and id are required';
        }
    },
});

const Todos = Backbone.Collection.extend({
    model: Todo
});

const TodoView = Backbone.View.extend({
    tagName: "li",
    events: {
        "click .todo": "handleTodo",
        "click .removeTodo": "removeTodo"
    },
    handleTodo(ev) {
        const target = $(ev.target);
        if (target.hasClass('done')) {
            target.removeClass('done');
        }
        else {
            target.addClass('done');
        }
    },
    removeTodo() {
        const todoID = this.model.id;
        todos.remove(todos.get(todoID));
    },
    render: function () {
        this.$el.html(`<span class="todo">${this.model.get('name')}</span><i class="fas fa-trash-alt icon trash-icon removeTodo"></i><hr>`);
        this.$el.attr('id', this.model.get('id'));
        return this;
    }
});

const InputView = Backbone.View.extend({
    events: {
        "click": "addTodo"
    },
    addTodo(e) {
        e.stopPropagation();
        e.preventDefault();
        const now = new Date();
        const id = now.getTime();
        const currValue = $('input[type=text]')[0].value;
        if (currValue && currValue != null && currValue != '') {
            let todo = new Todo({ id, name: currValue });
            todos.push(todo);
            $('input[type=text]')[0].value = '';
        }
    },
})

const TodoListView = Backbone.View.extend({
    initialize: function () {
        this.model.on('add', this.render, this);
        this.model.on('remove', this.render, this);
    },
    render: function () {
        $('.todo-list').empty();
        const self = this;
        this.model.each(function (todo) {
            const todoView = new TodoView({ model: todo });
            self.$el.append(todoView.render().$el);
        })
    }
});

var todos = new Todos([])
const todoView = new TodoListView({ el: '.todo-list', model: todos });
const inputView = new InputView({ el: '#addBTN', model: {} });
todoView.render();