package repository

import (
	"go-react-echo-todo-app/backend/domain"

	"gorm.io/gorm"
)

type todoMySqlGormRepository struct {
	DB *gorm.DB
}

func NewTodoMySqlGormRepository(db *gorm.DB) domain.TodoRepository {
	return &todoMySqlGormRepository{
		DB: db,
	}
}

func (r *todoMySqlGormRepository) Save(todo *domain.Todo) (*domain.Todo, error) {
	if err := r.DB.Create(&todo).Error; err != nil {
		return nil, err
	}

	return todo, nil
}

func (r *todoMySqlGormRepository) All() ([]domain.Todo, error) {
	var todos []domain.Todo
	if err := r.DB.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (r *todoMySqlGormRepository) GetById(id string) (*domain.Todo, error) {
	var todo domain.Todo

	if err := r.DB.First(&todo, id).Error; err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *todoMySqlGormRepository) Update(id string, updated *domain.Todo) (*domain.Todo, error) {
	if err := r.DB.Model(updated).Where("id = ?", id).Update("text", updated.Text).Error; err != nil {
		return nil, err
	}
	return updated, nil
}

func (r *todoMySqlGormRepository) Delete(id string) error {
	if err := r.DB.Delete(&domain.Todo{}, id).Error; err != nil {
		return err
	}
	return nil
}
