package todo

import "errors"

var (
	ErrDuplicate    = errors.New("record already exists")
	ErrNotExist     = errors.New("row does not exist")
	ErrUpdateFailed = errors.New("update failed")
	ErrDeleteFailed = errors.New("delete failed")
)

type Repository interface {
	Save(todo Todo) (*Todo, error)
	All() ([]Todo, error)
	GetById(id string) (*Todo, error)
	Update(id string, updated Todo) (*Todo, error)
	Delete(id string) error
}
