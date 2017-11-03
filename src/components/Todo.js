import React, { Component } from 'react'

class Todo extends Component {
    handleClick = () => {
        this.props.onClick(this.props.todo.id)
    }

    handleDelete = () => {
        this.props.onDelete(this.props.todo.id)
    }

    render() {
        return(
            <div className="tile" onClick={this.handleClick}>
                <span className="deleteButton" onClick={this.handleDelete}>
                    x
                </span>
                <h4 onClick={this.handleClick}>
                    {this.props.todo.title}
                </h4>
                <p onClick={this.handleClick}>
                    {this.props.todo.description}
                </p>
                <h4 onClick={this.handleClick}>
                    {this.props.todo.created_by}
                </h4>
            </div>
        )
    }
}

export default Todo