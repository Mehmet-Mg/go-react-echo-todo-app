package todo

import "gorm.io/gorm"

type TodoMySqlGormRepository struct {
	db *gorm.DB
}

func NewTodoMySqlGormRepository(db *gorm.DB) *TodoMySqlGormRepository {
	return &TodoMySqlGormRepository{
		db: db,
	}
}

func (r *TodoMySqlGormRepository) Save(todo *Todo) (*Todo, error) {
	if err := r.db.Create(&todo).Error; err != nil {
		return nil, err
	}

	return todo, nil
}

func (r *TodoMySqlGormRepository) All() ([]Todo, error) {
	var todos []Todo
	if err := r.db.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (r *TodoMySqlGormRepository) GetById(id string) (*Todo, error) {
	var todo Todo

	if err := r.db.First(&todo, id).Error; err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *TodoMySqlGormRepository) Update(id string, updated *Todo) (*Todo, error) {
	if err := r.db.Model(updated).Where("id = ?", id).Update("text", updated.Text).Error; err != nil {
		return nil, err
	}
	return updated, nil
}

func (r *TodoMySqlGormRepository) Delete(id string) error {
	if err := r.db.Delete(&Todo{}, id).Error; err != nil {
		return err
	}
	return nil
}
