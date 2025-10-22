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
      <div className='relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
        <div className='flex h-60 items-center justify-center'>
          <div className='text-white'>No product data</div>
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
    <div className='relative max-w-md rounded-xl bg-gradient-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
      <div className='flex h-60 items-center justify-center'>
        <img
          src={getValidImage(product.images)}
          alt={product.title}
          className='w-75 h-60 object-cover'
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>
      <Button
        size='icon'
        onClick={() => setLiked(!liked)}
        className='bg-primary/10 hover:bg-primary/20 absolute top-4 right-4 rounded-full'
      >
        <HeartIcon className={cn('size-4', liked ? 'fill-destructive stroke-destructive' : 'stroke-white')} />
        <span className='sr-only'>Like</span>
      </Button>
      <Card className='border-none'>
        <CardHeader>
          <CardTitle className='line-clamp-2'>{product.title}</CardTitle>
          <CardDescription className='flex items-center gap-2'>
            <Badge variant='outline'>{product.category.name}</Badge>
            <Badge variant='outline'>ID: {product.id}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='line-clamp-3 text-sm'>
            {product.description}
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>${product.price}</span>
          </div>
          <Button size='lg'>Add to cart</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProductCard
