package main

import (
	"go-react-echo-todo-app/backend/todo"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type App struct {
	db       *gorm.DB
	todoRepo *todo.TodoMySqlGormRepository
}

func main() {
	dsn := "root:password@tcp(127.0.0.1:3306)/go_echo_todo_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&todo.Todo{})

	app := &App{
		db: db,
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig((middleware.CORSConfig{
		AllowOrigins: []string{"https://example.com", "*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	})))

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello World!")
	})

	app.todoRepo = todo.NewTodoMySqlGormRepository(db)

	e.POST("/todos", app.saveTodo)
	e.GET("/todos", app.getTodos)
	e.GET("/todos/:id", app.getTodoById)
	e.PUT("/todos/:id", app.updateTodo)
	e.DELETE("/todos/:id", app.deleteTodo)

	e.Logger.Fatal(e.Start(":5100"))
}

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
