package usecase

import "go-react-echo-todo-app/backend/domain"

type todoUsecase struct {
	todoRepo domain.TodoRepository
}

func NewTodoUsecase(t domain.TodoRepository) domain.TodoUsecase {
	return &todoUsecase{
		todoRepo: t,
	}
}

func (t *todoUsecase) All() ([]domain.Todo, error) {
	return t.todoRepo.All()
}

func (t *todoUsecase) Delete(id string) error {
	return t.todoRepo.Delete(id)
}

func (t *todoUsecase) GetById(id string) (*domain.Todo, error) {
	return t.todoRepo.GetById(id)
}

func (t *todoUsecase) Save(todo *domain.Todo) (*domain.Todo, error) {
	return t.todoRepo.Save(todo)
}

func (t *todoUsecase) Update(id string, updated *domain.Todo) (*domain.Todo, error) {
	return t.todoRepo.Update(id, updated)
}
