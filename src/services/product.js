/* eslint-disable no-unused-vars */
import * as productRepository from '../repositories/product';

export default async function getProductsList() {
  return productRepository.listProducts();
}
