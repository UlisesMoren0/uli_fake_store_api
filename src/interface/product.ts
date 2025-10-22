import type { Category } from "@/interface/category";

export interface Product {
id: number;
title: string;
price: number;
description: string;
images: string[];
creationAt: string;
updatedAt: string;
slug: string;
category: Category;
}