package app

import (
	"go-react-echo-todo-app/backend/todo"
	"net/http"

	"github.com/labstack/echo"
)

func (a *App) saveTodo(c echo.Context) error {
	t := new(todo.Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if created, err := a.todoRepo.Save(t); err != nil {
		return err
	} else {
		return c.JSON(http.StatusCreated, created)
	}
}

func (a *App) getTodos(c echo.Context) error {
	if todos, err := a.todoRepo.All(); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todos)
	}
}

func (a *App) getTodoById(c echo.Context) error {
	id := c.Param("id")

	if todo, err := a.todoRepo.GetById(id); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todo)
	}
}

func (a *App) updateTodo(c echo.Context) error {
	id := c.Param("id")
	t := new(todo.Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if todo, err := a.todoRepo.Update(id, t); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todo)
	}
}

func (a *App) deleteTodo(c echo.Context) error {
	id := c.Param("id")
	if err := a.todoRepo.Delete(id); err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}
