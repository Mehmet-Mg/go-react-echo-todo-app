package app

import (
	"go-react-echo-todo-app/backend/todo"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type App struct {
	db       *gorm.DB
	todoRepo todo.Repository
}

func Run() {
	app := new(App)

	dsn := "root:password@tcp(127.0.0.1:3306)/go_echo_todo_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&todo.Todo{})

	app.db = db
	app.todoRepo = &todo.TodoMySqlGormRepository{
		DB: db,
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig((middleware.CORSConfig{
		AllowOrigins: []string{"https://example.com", "*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	})))

	app.Routes(e)

	e.Logger.Fatal(e.Start(":5100"))
}
