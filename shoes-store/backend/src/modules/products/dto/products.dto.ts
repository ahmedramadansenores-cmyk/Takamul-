import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductVariantDto {
  @ApiProperty({ example: 'US 9' })
  @IsString()
  @IsNotEmpty()
  size: string;

  @ApiProperty({ example: 'Black' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: '#000000', required: false })
  @IsString()
  @IsOptional()
  colorHex?: string;

  @ApiProperty({ example: 20, required: false })
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiProperty({ example: 'SKU-123', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: 150, required: false })
  @IsNumber()
  @Min(0)
  price?: number;
}

export class ProductImageDto {
  @ApiProperty({ example: '/images/product.jpg' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'Product Image', required: false })
  @IsString()
  @IsOptional()
  alt?: string;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  position?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Nike Air Max 270' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'The Nike Air Max 270 delivers visible cushioning.', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 180, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  compareAtPrice?: number;

  @ApiProperty({ example: 'USD', required: false })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'cat-1', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'brand-1', required: false })
  @IsString()
  @IsOptional()
  brandId?: string;

  @ApiProperty({ type: [ProductImageDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  @IsOptional()
  images?: ProductImageDto[];

  @ApiProperty({ type: [ProductVariantDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  @IsOptional()
  variants?: ProductVariantDto[];

  @ApiProperty({ example: ['running', 'sports'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Nike Air Max 270', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 160, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 190, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  compareAtPrice?: number;

  @ApiProperty({ example: 60, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'cat-2', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'brand-2', required: false })
  @IsString()
  @IsOptional()
  brandId?: string;

  @ApiProperty({ example: ['new-tag'], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}

export class FilterProductsDto {
  @ApiProperty({ example: 'cat-1', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'brand-1', required: false })
  @IsString()
  @IsOptional()
  brandId?: string;

  @ApiProperty({ example: 50, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiProperty({ example: 200, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiProperty({ example: 'nike', required: false })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 12, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
