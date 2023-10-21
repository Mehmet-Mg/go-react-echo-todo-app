package main

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type App struct {
	db *gorm.DB
}

func main() {
	dsn := "root:password@tcp(127.0.0.1:3306)/go_echo_todo_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Todo{})

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

	e.POST("/todos", app.saveTodo)
	e.GET("/todos", app.getTodos)
	e.GET("/todos/:id", app.getTodoById)
	e.PUT("/todos/:id", app.updateTodo)
	e.DELETE("/todos/:id", app.deleteTodo)

	e.Logger.Fatal(e.Start(":5100"))
}

type Todo struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Text      string         `json:"text"`
}

func (a *App) saveTodo(c echo.Context) error {
	t := new(Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if err := a.db.Create(&t).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusCreated, t)
}

func (a *App) getTodos(c echo.Context) error {
	var todos []Todo
	if err := a.db.Find(&todos).Error; err != nil {
		return err
	}
	return c.JSON(http.StatusOK, todos)
}

func (a *App) getTodoById(c echo.Context) error {
	id := c.Param("id")

	var todo Todo

	if err := a.db.First(&todo, id).Error; err != nil {
		return err
	}

	return c.JSON(http.StatusOK, todo)
}

func (a *App) updateTodo(c echo.Context) error {
	id := c.Param("id")
	t := new(Todo)
	if err := c.Bind(t); err != nil {
		return err
	}
	if err := a.db.Model(&t).Where("id = ?", id).Update("text", t.Text).Error; err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}

func (a *App) deleteTodo(c echo.Context) error {
	id := c.Param("id")
	if err := a.db.Delete(&Todo{}, id).Error; err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}

// e.GET("/show", show)
// show?team=x-men&member=wolverine
func show(c echo.Context) error {
	// Get team and member from the query string
	team := c.QueryParam("team")
	member := c.QueryParam("member")
	return c.String(http.StatusOK, "team:"+team+", member:"+member)
}

// // Root level middleware
// e.Use(middleware.Logger())
// e.Use(middleware.Recover())

// // Group level middleware
// g := e.Group("/admin")
// g.Use(middleware.BasicAuth(func(username, password string, c echo.Context) (bool, error) {
//   if username == "joe" && password == "secret" {
//     return true, nil
//   }
//   return false, nil
// }))

// // Route level middleware
// track := func(next echo.HandlerFunc) echo.HandlerFunc {
//     return func(c echo.Context) error {
//         println("request to /users")
//         return next(c)
//     }
// }
// e.GET("/users", func(c echo.Context) error {
//     return c.String(http.StatusOK, "/users")
// }, track)
