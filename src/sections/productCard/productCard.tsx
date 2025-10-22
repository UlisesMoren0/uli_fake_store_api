'use client'

import { useState } from 'react'

import { HeartIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import type { Product } from '@/interface/product'

interface ProductCardProps {
  product?: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState<boolean>(false)

  // 🛡️ Manejar caso cuando no hay producto
  if (!product) {
    return (
      <div className="no-product-container">
        <div className="no-product-message">
          <div>No product data</div>
        </div>
      </div>
    );
  }

  // 🖼️ Obtener la primera imagen válida
  const getValidImage = (images: string[]): string => {
    const validImage = images?.find(img => img && !img.includes('[') && !img.includes('"'));
    return validImage || 'https://via.placeholder.com/300x300?text=No+Image';
  };

  return (
    <div className="product-card-container">
      <div className="image-container">
        <img
          src={getValidImage(product.images)}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>
      <Button
        size='icon'
        onClick={() => setLiked(!liked)}
        className="like-button"
      >
        <HeartIcon className={cn('heart-icon', liked ? 'heart-icon-liked' : '')} />
        <span className='sr-only'>Like</span>
      </Button>
      <Card className="product-card">
        <CardHeader>
          <CardTitle className="card-title">{product.title}</CardTitle>
          <CardDescription className="badge-container">
            <Badge variant='outline'>{product.category.name}</Badge>
            <Badge variant='outline'>ID: {product.id}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="product-description">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="card-footer">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="price-value">${product.price}</span>
          </div>
          <Button size='lg'>Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProductCard
