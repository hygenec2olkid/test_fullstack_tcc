package main

import (
	"github.com/gin-gonic/gin"
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/service"
	"github.com/gin-contrib/cors"
)

func main() {
	database.Connect()

	productRepo := repository.NewProductRepository(database.DB)
	productService := service.NewProductService(productRepo)
	productController := controller.NewProductController(productService)
	
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/products", productController.GetProducts)
	r.POST("/products", productController.CreateProduct)
	r.DELETE("/products/:id", productController.DeleteProduct)

	r.Run(":8080")


}