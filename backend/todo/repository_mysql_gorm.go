package todo

import "gorm.io/gorm"

type TodoMySqlGormRepository struct {
	DB *gorm.DB
}

func (r *TodoMySqlGormRepository) Save(todo *Todo) (*Todo, error) {
	if err := r.DB.Create(&todo).Error; err != nil {
		return nil, err
	}

	return todo, nil
}

func (r *TodoMySqlGormRepository) All() ([]Todo, error) {
	var todos []Todo
	if err := r.DB.Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}

func (r *TodoMySqlGormRepository) GetById(id string) (*Todo, error) {
	var todo Todo

	if err := r.DB.First(&todo, id).Error; err != nil {
		return nil, err
	}

	return &todo, nil
}

func (r *TodoMySqlGormRepository) Update(id string, updated *Todo) (*Todo, error) {
	if err := r.DB.Model(updated).Where("id = ?", id).Update("text", updated.Text).Error; err != nil {
		return nil, err
	}
	return updated, nil
}

func (r *TodoMySqlGormRepository) Delete(id string) error {
	if err := r.DB.Delete(&Todo{}, id).Error; err != nil {
		return err
	}
	return nil
}
