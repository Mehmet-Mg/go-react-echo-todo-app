package app

import (
	"net/http"

	"github.com/labstack/echo"
)

func (a *App) Routes(e *echo.Echo) {
	e.POST("/todos", a.saveTodo)
	e.GET("/todos", a.getTodos)
	e.GET("/todos/:id", a.getTodoById)
	e.PUT("/todos/:id", a.updateTodo)
	e.DELETE("/todos/:id", a.deleteTodo)

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!")
	})
}
