import React, { Component } from 'react'
import axios from 'axios'
import Todo from './Todo'
import update from 'immutability-helper'
import TodoForm from './TodoForm'

class TodosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            editingTodoId: null,
            notification: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/todos')
        .then(response => {
            console.log(response);
            this.setState( {todos: response.data});
        })
        .catch(error => console.log(error));
    }

    addNewTodo = () => {
        axios.post(
            'http://localhost:3001/todos',
            { todo:
                {
                    title: '',
                    description: '',
                    created_by: ''
                }
            }
        )
        .then(response => {
            console.log(response)
            const todos = update(this.state.todos, {
                $splice: [[0, 0, response.data]]
            })
            this.setState({
                todos: todos,
                editingTodoId: response.data.id
            })
        })
        .catch(error => console.log(error))
    }

    updateTodo = (todo) => {
        const todoIndex = this.state.todos.findIndex(x => x.id === todo.id)
        const todos = update(this.state.todos, {
            [todoIndex]: {$set: todo}
        })
        this.setState({
            todos: todos,
            notification: 'All Changes saved'
        })
    }

    resetNotification = () => {
        this.setState({notification: ''})
    }

    enableEditing = (id) => {
        this.setState({editingTodoId: id},
        () => { this.title.focus() })
    }

    deleteTodo = (id) => {
        axios.delete(`http://localhost:3001/todos/${id}`)
        .then(response => {
            const todoIndex = this.state.todos.findIndex(x => x.id === id)
            const todos = update(this.state.todos, { $splice: [[todoIndex, 1]]})
            this.setState({todos: todos, notification: 'Successfully deleted!'})
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <button className="newIdeaButton" onClick={this.addNewTodo}>
                    New Idea
                </button>
                <span className="notification">
                    {this.state.notification}
                </span>
                {this.state.todos.map((todo) => {
                    if (this.state.editingTodoId === todo.id) {
                        return (
                            <TodoForm todo={todo} key={todo.id} updateTodo={this.updateTodo} titleRef= {input => this.title = input} resetNotification={this.resetNotification}/>
                         )
                    } else {
                        return (
                            <Todo todo={todo} key={todo.id} onClick={this.enableEditing} onDelete={this.deleteTodo}/>
                         )
                    }
                })}
            </div>
        )
    }
}

export default TodosContainer
