package repository

import (
	"backend/models"
	"database/sql"
	"fmt"
)

type ProductRepository interface {
	GetAllProducts() ([]models.Product, error)
	CreateProduct(product *models.Product) error
	DeleteProduct(id int) error
}

type productRepository struct {
	DB *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
	return &productRepository{db}
}

func (r *productRepository) GetAllProducts() ([]models.Product, error) {
	rows, err := r.DB.Query("SELECT id, code FROM products")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []models.Product{}
	for rows.Next() {
		var p models.Product
		if err := rows.Scan(&p.ID, &p.ProductNo); err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	return products, nil
}

func (r *productRepository) CreateProduct(product *models.Product) error {
	var exists bool
	err := r.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM products WHERE code = ?)", product.ProductNo).Scan(&exists)
	if err != nil {
		return fmt.Errorf("failed to check duplicate: %w", err)
	}

	if exists {
		return fmt.Errorf("product with code %s already exists", product.ProductNo)
	}
	_, err = r.DB.Exec("INSERT INTO products (code) VALUES (?)", product.ProductNo)
	return err
}

func (r *productRepository) DeleteProduct(id int) error {
	_, err := r.DB.Exec("DELETE FROM products WHERE id=?;", id)
	return err
}
