import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    function mockUserModel(dto: CreateProductDTO) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: mockUserModel,
        },
      ],
    }).compile();
    productService = module.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should save a product in the database', async () => {
      const createProductDto = {
        name: 'sample name',
        description: 'sample description',
        price: 'sample price',
      };
      const result = await productService.createProduct(createProductDto);
      const product = await new productService.productDocument(
        createProductDto,
      ).save();

      expect(result).toEqual(product);
    });
  });
});
