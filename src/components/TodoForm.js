import React, {Component} from 'react'
import axios from 'axios'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.todo.title,
            description: this.props.todo.description,
            created_by: this.props.todo.created_by
        }
    }

    handleInput = (e) => {
        this.props.resetNotification()
        this.setState({[e.target.name]: e.target.value})
    }

    handleBlur = () => {
        const todo = {
            title: this.state.title,
            description: this.state.description,
            created_by: this.state.created_by
        }

        axios.put(
            `http://localhost:3001/todos/${this.props.todo.id}`,
            {
                todo: todo
            })
            .then(response => {
                console.log(response)
                this.props.updateTodo(response.data)
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="tile">
                <form onBlur={this.handleBlur}>
                    <input className='input' type="text" name="title" placeholder='Enter a Title' value={this.state.title} onChange={this.handleInput} ref={this.props.titleRef}/>
                    <textarea className='input' name="description" placeholder='Describe your todo' value={this.state.description} onChange={this.handleInput}></textarea>
                    <input className='input' type="text" name="created_by" placeholder='Enter your name' value={this.state.created_by} onChange={this.handleInput}/>
                </form>
            </div>
        );
    }
}

export default TodoForm