package http

import (
	"go-react-echo-todo-app/backend/domain"
	"net/http"

	"github.com/labstack/echo"
)

type TodoHandler struct {
	TodoUsecase domain.TodoUsecase
}

func NewTodoHandler(e *echo.Echo, tu domain.TodoUsecase) {
	handler := &TodoHandler{
		TodoUsecase: tu,
	}
	e.POST("/todos", handler.saveTodo)
	e.GET("/todos", handler.getTodos)
	e.GET("/todos/:id", handler.getTodoById)
	e.PUT("/todos/:id", handler.updateTodo)
	e.DELETE("/todos/:id", handler.deleteTodo)
}

func (a *TodoHandler) saveTodo(c echo.Context) error {
	t := new(domain.Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if created, err := a.TodoUsecase.Save(t); err != nil {
		return err
	} else {
		return c.JSON(http.StatusCreated, created)
	}
}

func (a *TodoHandler) getTodos(c echo.Context) error {
	if todos, err := a.TodoUsecase.All(); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todos)
	}
}

func (a *TodoHandler) getTodoById(c echo.Context) error {
	id := c.Param("id")

	if todo, err := a.TodoUsecase.GetById(id); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todo)
	}
}

func (a *TodoHandler) updateTodo(c echo.Context) error {
	id := c.Param("id")
	t := new(domain.Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if todo, err := a.TodoUsecase.Update(id, t); err != nil {
		return err
	} else {
		return c.JSON(http.StatusOK, todo)
	}
}

func (a *TodoHandler) deleteTodo(c echo.Context) error {
	id := c.Param("id")
	if err := a.TodoUsecase.Delete(id); err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}
