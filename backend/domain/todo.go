package domain

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Todo struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt,omitempty"`
	Text      string         `json:"text"`
}

type TodoUsecase interface {
	Save(todo *Todo) (*Todo, error)
	All() ([]Todo, error)
	GetById(id string) (*Todo, error)
	Update(id string, updated *Todo) (*Todo, error)
	Delete(id string) error
}

var (
	ErrDuplicate    = errors.New("record already exists")
	ErrNotExist     = errors.New("row does not exist")
	ErrUpdateFailed = errors.New("update failed")
	ErrDeleteFailed = errors.New("delete failed")
)

type TodoRepository interface {
	Save(todo *Todo) (*Todo, error)
	All() ([]Todo, error)
	GetById(id string) (*Todo, error)
	Update(id string, updated *Todo) (*Todo, error)
	Delete(id string) error
}
