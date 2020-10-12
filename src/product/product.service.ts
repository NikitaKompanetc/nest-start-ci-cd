import { Injectable, NotFoundException } from '@nestjs/common';

import { Product, ProductDocument } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    public productDocument: Model<ProductDocument>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const test= {...createProductDto,name:'test'}

    const productDocument = new this.productDocument(test);
    return await productDocument.save();
  }

  public async getProducts(): Promise<Product[]> {
    return await this.productDocument.find();
  }

  public async getProduct(productId: string): Promise<Product> {
    const foundProduct = await this.productDocument.findById(productId);
    if (!foundProduct) {
      throw new NotFoundException('Product not found');
    }
    return foundProduct;
  }

  public async editProduct(
    productId: string,
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const editedProduct = await this.productDocument.findById(productId);
    if (!editedProduct) {
      throw new NotFoundException('Product not found');
    }
    return this.productDocument.findByIdAndUpdate(productId, createProductDto);
  }

  public async deleteProduct(productId: string): Promise<void> {
    await this.productDocument.findByIdAndRemove(productId);
  }
}
