import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, FilterProductsDto } from './dto/products.dto';

// Mock products data - replace with Prisma in production
const mockProducts = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    slug: 'nike-air-max-270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
    price: 150,
    compareAtPrice: 180,
    currency: 'USD',
    stock: 50,
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 120,
    tags: ['running', 'sports', 'nike'],
    categoryId: 'cat-1',
    brandId: 'brand-1',
    images: [
      { url: '/images/nike-air-max-1.jpg', alt: 'Nike Air Max 270', isPrimary: true },
    ],
    variants: [
      { size: 'US 9', color: 'Black', colorHex: '#000000', stock: 20 },
      { size: 'US 10', color: 'Black', colorHex: '#000000', stock: 15 },
      { size: 'US 9', color: 'White', colorHex: '#FFFFFF', stock: 15 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Adidas Ultraboost 22',
    slug: 'adidas-ultraboost-22',
    description: 'Experience incredible energy return with every stride.',
    price: 190,
    compareAtPrice: null,
    currency: 'USD',
    stock: 30,
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 85,
    tags: ['running', 'sports', 'adidas'],
    categoryId: 'cat-1',
    brandId: 'brand-2',
    images: [
      { url: '/images/adidas-ultraboost-1.jpg', alt: 'Adidas Ultraboost 22', isPrimary: true },
    ],
    variants: [
      { size: 'US 9', color: 'Blue', colorHex: '#0000FF', stock: 10 },
      { size: 'US 10', color: 'Blue', colorHex: '#0000FF', stock: 20 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class ProductsService {
  private products = mockProducts;

  async findAll(filters: FilterProductsDto) {
    let result = [...this.products];

    // Apply filters
    if (filters.categoryId) {
      result = result.filter(p => p.categoryId === filters.categoryId);
    }

    if (filters.brandId) {
      result = result.filter(p => p.brandId === filters.brandId);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm),
      );
    }

    if (filters.isFeatured !== undefined) {
      result = result.filter(p => p.isFeatured === filters.isFeatured);
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: result.slice(startIndex, endIndex),
      total: result.length,
      page,
      limit,
      totalPages: Math.ceil(result.length / limit),
    };
  }

  async findOne(id: string) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async findBySlug(slug: string) {
    const product = this.products.find(p => p.slug === slug);
    if (!product) {
      throw new NotFoundException(`Product with slug "${slug}" not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...createProductDto,
      slug: createProductDto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 0,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    this.products[index] = {
      ...this.products[index],
      ...updateProductDto,
      updatedAt: new Date(),
    };

    return this.products[index];
  }

  async delete(id: string) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    this.products.splice(index, 1);
    return { message: `Product "${id}" deleted successfully` };
  }

  async getFeatured(limit = 8) {
    return this.products.filter(p => p.isFeatured).slice(0, limit);
  }

  async getTrending(limit = 8) {
    return [...this.products]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  async getNewArrivals(limit = 8) {
    return [...this.products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}
