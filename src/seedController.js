import mongoose from "mongoose"; // Adjust the path as needed // Adjust the path as needed
import Product from "../model/Product.js";
import Category from "../model/Category.js";

// Sample data generators
const brands = ["Apple", "Samsung", "Sony", "Dell", "HP", "Lenovo", "Asus", "Microsoft", "Google", "OnePlus"];
const categories = ["Electronics", "Smartphones", "Laptops", "Tablets", "Accessories", "Audio"];

const productNames = [
  "Smartphone Pro",
  "Ultra Laptop",
  "Wireless Headphones",
  "Smart Watch",
  "Gaming Mouse",
  "Mechanical Keyboard",
  "4K Monitor",
  "External SSD",
  "Smart Speaker",
  "Tablet Pro",
  "Wireless Earbuds",
  "USB-C Hub",
  "Power Bank",
  "Phone Case",
  "Screen Protector"
];

const descriptions = [
  "High-performance device with latest technology",
  "Premium quality product with exceptional features",
  "Perfect for daily use with excellent battery life",
  "Advanced model with superior performance",
  "Compact and portable design with great specs",
  "Professional grade equipment for serious users",
  "Innovative product with cutting-edge features",
  "Reliable and durable device for everyday use"
];

const colors = ["Black", "White", "Silver", "Gold", "Blue", "Red", "Green", "Purple", "Pink"];
const storages = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB"];
const imageUrls = [
  "https://via.placeholder.com/400x400/000000/FFFFFF?text=Product",
  "https://via.placeholder.com/400x400/FF0000/FFFFFF?text=Product",
  "https://via.placeholder.com/400x400/00FF00/FFFFFF?text=Product",
  "https://via.placeholder.com/400x400/0000FF/FFFFFF?text=Product"
];

// Helper function to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get random number between min and max
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate unique SKU
const generateSKU = (prefix, index) => {
  const timestamp = Date.now().toString().slice(-6);
  return `${prefix}-${timestamp}-${String(index).padStart(3, '0')}`;
};

// Generate variants for a product
const generateVariants = (basePrice, index) => {
  const variantCount = getRandomNumber(1, 4);
  const variants = [];
  
  for (let i = 0; i < variantCount; i++) {
    const color = getRandomItem(colors);
    const storage = getRandomItem(storages);
    const ram = getRandomItem(ramOptions);
    
    variants.push({
      color,
      storage,
      ram,
      sku: generateSKU('VAR', i + 1),
      price: basePrice + getRandomNumber(10, 100),
      stock: getRandomNumber(0, 50),
      images: [getRandomItem(imageUrls), getRandomItem(imageUrls)]
    });
  }
  
  return variants;
};

// Main seed function
export const seedProducts = async (count = 10) => {
  try {
    // Get all categories
    const categoriesList = await Category.find({});
    
    if (categoriesList.length === 0) {
      console.log("No categories found. Please seed categories first.");
      return;
    }

    // Clear existing products (optional)
    // await Product.deleteMany({});
    // console.log("Cleared existing products");

    const products = [];
    const productCount = Math.min(count, 10);

    for (let i = 0; i < productCount; i++) {
      const category = getRandomItem(categoriesList);
      const brand = getRandomItem(brands);
      const name = getRandomItem(productNames);
      const basePrice = getRandomNumber(100, 2000);
      const stock = getRandomNumber(0, 100);
      
      // Generate variants
      const variants = generateVariants(basePrice, i);
      
      // Create product
      const product = {
        name: `${brand} ${name}`,
        description: getRandomItem(descriptions),
        brand: brand,
        price: basePrice,
        stock: stock,
        image: getRandomItem(imageUrls),
        images: [getRandomItem(imageUrls), getRandomItem(imageUrls), getRandomItem(imageUrls)],
        category: category._id,
        variants: variants,
        featured: Math.random() > 0.7,
        isActive: true
      };
      
      products.push(product);
    }

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);
    
    return insertedProducts;
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

// Advanced seed with custom options
export const seedProductsAdvanced = async (options = {}) => {
  const {
    count = 10,
    clearExisting = false,
    categories = null, // Pass specific categories
    customProducts = null // Pass custom product data
  } = options;

  try {
    // Get categories
    let categoriesList = categories;
    if (!categoriesList) {
      categoriesList = await Category.find({});
    }

    if (categoriesList.length === 0) {
      console.log("No categories found. Please seed categories first.");
      return;
    }

    if (clearExisting) {
      await Product.deleteMany({});
      console.log("Cleared existing products");
    }

    const products = [];
    const productCount = Math.min(count, 10);

    // If custom products are provided, use them
    if (customProducts && customProducts.length > 0) {
      const customCount = Math.min(customProducts.length, 10);
      for (let i = 0; i < customCount; i++) {
        const customProduct = customProducts[i];
        const category = categoriesList.find(c => c._id.toString() === customProduct.categoryId) || getRandomItem(categoriesList);
        
        products.push({
          name: customProduct.name || getRandomItem(productNames),
          description: customProduct.description || getRandomItem(descriptions),
          brand: customProduct.brand || getRandomItem(brands),
          price: customProduct.price || getRandomNumber(100, 2000),
          stock: customProduct.stock || getRandomNumber(0, 100),
          image: customProduct.image || getRandomItem(imageUrls),
          images: customProduct.images || [getRandomItem(imageUrls)],
          category: category._id,
          variants: customProduct.variants || generateVariants(customProduct.price || 500, i),
          featured: customProduct.featured || false,
          isActive: customProduct.isActive !== undefined ? customProduct.isActive : true
        });
      }
    } else {
      // Generate random products
      for (let i = 0; i < productCount; i++) {
        const category = getRandomItem(categoriesList);
        const brand = getRandomItem(brands);
        const name = getRandomItem(productNames);
        const basePrice = getRandomNumber(100, 2000);
        
        products.push({
          name: `${brand} ${name}`,
          description: getRandomItem(descriptions),
          brand: brand,
          price: basePrice,
          stock: getRandomNumber(0, 100),
          image: getRandomItem(imageUrls),
          images: [getRandomItem(imageUrls), getRandomItem(imageUrls)],
          category: category._id,
          variants: generateVariants(basePrice, i),
          featured: Math.random() > 0.7,
          isActive: true
        });
      }
    }

    const insertedProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${insertedProducts.length} products`);
    
    return insertedProducts;
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
};

// CLI usage example - Add this to your route or controller
export const seedProductsCLI = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const result = await seedProducts(count);
    
    res.status(200).json({
      success: true,
      message: `Successfully seeded ${result.length} products`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error seeding products",
      error: error.message
    });
  }
};