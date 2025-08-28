package service

import (
	"backend/models"
	"backend/repository"
)

type ProductService interface {
	GetAllProducts() ([]models.Product, error)
	CreateProduct(product *models.Product) error
	DeleteProduct(id int) error
}

type productService struct {
	repo repository.ProductRepository
}

func NewProductService(r repository.ProductRepository) ProductService {
	return &productService{r}
}

func (s *productService) GetAllProducts() ([]models.Product, error) {
	return s.repo.GetAllProducts()
}

func (s *productService) CreateProduct(product *models.Product) error {
	return s.repo.CreateProduct(product)
}

func (s *productService) DeleteProduct(id int) error {
	return s.repo.DeleteProduct(id)
}