package app

import (
	"go-react-echo-todo-app/backend/db"
	repository "go-react-echo-todo-app/backend/todo/repository/mysql"
	"go-react-echo-todo-app/backend/todo/usecase"

	_todoHttpDelivery "go-react-echo-todo-app/backend/todo/delivery/http"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func Run() {
	db := db.Connect()
	e := echo.New()
	e.Use(middleware.CORSWithConfig((middleware.CORSConfig{
		AllowOrigins: []string{"https://example.com", "*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	})))

	todoRepo := repository.NewTodoMySqlGormRepository(db)
	todoUsecase := usecase.NewTodoUsecase(todoRepo)
	_todoHttpDelivery.NewTodoHandler(e, todoUsecase)

	e.Logger.Fatal(e.Start(":5100"))
}
