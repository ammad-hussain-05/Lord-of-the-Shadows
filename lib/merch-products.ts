export type MerchCategory = "Mugs" | "T-Shirts" | "Chains"

export type ProductDetailItem = {
  label: string
  value: string
}

export type MerchProduct = {
  id: string
  slug: string
  title: string
  character: string
  category: MerchCategory
  price: number
  image: string
  description: string
  longDescription: string
  highlights: string[]
  details: ProductDetailItem[]
  sizes?: string[]
  colors?: string[]
  featured?: boolean
}

const characters = [
  { name: "Dravgon", folder: "dravgon", fileBase: "dravgon", featured: true },
  { name: "Elain", folder: "elain", fileBase: "elain", featured: false },
  { name: "Elf", folder: "elf", fileBase: "elf", featured: false },
  { name: "Elka", folder: "elka", fileBase: "elka", featured: false },
  { name: "Leadena", folder: "leadena", fileBase: "leadena", featured: true },
  { name: "Micheal", folder: "micheal", fileBase: "micheal", featured: false },
  { name: "Angle", folder: "Angle", fileBase: "angle", featured: false },
  { name: "Dagger", folder: "dagger", fileBase: "dagger", featured: false },
]
const productSettings: Record<
  MerchCategory,
  {
    label: string
    fileSuffix: string
    price: number
    sizes?: string[]
    colors?: string[]
  }
> = {
  Mugs: {
    label: "Mug",
    fileSuffix: "mug",
    price: 14.99,
    colors: ["Black", "White"],
  },
  "T-Shirts": {
    label: "T-Shirt",
    fileSuffix: "t-shirt",
    price: 24.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal"],
  },
  Chains: {
    label: "Chain",
    fileSuffix: "chain",
    price: 19.99,
  },
}

const createSlug = (value: string) => {
  return value.toLowerCase().replace(/\s+/g, "-")
}

const getShortDescription = (character: string, category: MerchCategory) => {
  if (category === "Mugs") {
    return `A character mug featuring ${character} from the Lord of the Shadows universe.`
  }

  if (category === "T-Shirts") {
    return `A premium ${character} character T-shirt designed for fans of the Lord of the Shadows series.`
  }

  return `A collectible ${character}-inspired character chain from the Lord of the Shadows merchandise collection.`
}

const getLongDescription = (character: string, category: MerchCategory) => {
  if (category === "Mugs") {
    return `The ${character} Character Mug is designed for fans who want to keep a piece of the Lord of the Shadows universe close in their daily routine. It carries a character-inspired visual identity with a dark fantasy tone, making it suitable for daily use, desk display, gifting, or themed collections. This item gives readers and fans a practical way to keep the world of the story alive beyond the page.`
  }

  if (category === "T-Shirts") {
    return `The ${character} Character T-Shirt is created as wearable merchandise for fans of the Lord of the Shadows universe. It combines character-focused artwork with a bold fantasy aesthetic, giving the product a strong collectible and lifestyle feel. It is designed for casual wear, fan events, themed shoots, or anyone who wants to represent their favorite character in a modern way.`
  }

  return `The ${character} Character Chain is a collectible-style merchandise item inspired by the fantasy identity of the Lord of the Shadows universe. It is designed to feel symbolic, personal, and connected to the character’s presence in the story world. This piece works well as a fan accessory, display collectible, or themed gift for readers who enjoy character-based merchandise.`
}

const getHighlights = (category: MerchCategory) => {
  if (category === "Mugs") {
    return [
      "Character-inspired artwork from the Lord of the Shadows universe.",
      "Designed for fans, collectors, and fantasy merchandise lovers.",
      "Perfect for daily use, display shelves, or themed gift collections.",
    ]
  }

  if (category === "T-Shirts") {
    return [
      "Premium character-themed wearable merchandise.",
      "Designed with a bold dark fantasy visual direction.",
      "Ideal for fans who want to represent their favorite character.",
    ]
  }

  return [
    "Character-inspired collectible accessory.",
    "Designed as a symbolic fantasy merchandise piece.",
    "Perfect for display, gifting, or fan collections.",
  ]
}

const getDetails = (character: string, category: MerchCategory) => {
  const productType =
    category === "Mugs" ? "Character Mug" : category === "T-Shirts" ? "Character T-Shirt" : "Character Chain"

  return [
    { label: "Character", value: character },
    { label: "Product Type", value: productType },
    { label: "Collection", value: "Lord of the Shadows Merchandise" },
    { label: "Theme", value: "Dark Fantasy Character Merchandise" },
  ]
}

const createProduct = (
  character: string,
  folder: string,
  fileBase: string,
  category: MerchCategory,
  featured = false
): MerchProduct => {
  const settings = productSettings[category]
  const characterSlug = createSlug(character)
  const categorySlug = createSlug(category)

  return {
    id: `${characterSlug}-${categorySlug}`,
    slug: `${characterSlug}-${categorySlug}`,
    title: `${character} Character ${settings.label}`,
    character,
    category,
    price: settings.price,
    image: `/Merchandize/${folder}/${fileBase}-${settings.fileSuffix}.png`, 
    description: getShortDescription(character, category),
    longDescription: getLongDescription(character, category),
    highlights: getHighlights(category),
    details: getDetails(character, category),
    sizes: settings.sizes,
    colors: settings.colors,
    featured,
  }
}

export const merchProducts: MerchProduct[] = characters.flatMap((character) => [
  createProduct(character.name, character.folder, character.fileBase, "Mugs", character.featured),
  createProduct(character.name, character.folder, character.fileBase, "T-Shirts", character.featured),
  createProduct(character.name, character.folder, character.fileBase, "Chains"),
])

export const merchCategories: ("All" | MerchCategory)[] = [
  "All",
  "Mugs",
  "T-Shirts",
  "Chains",
]

export function getProductBySlug(slug: string) {
  return merchProducts.find((product) => product.slug === slug)
}

export function getRelatedProducts(currentSlug: string, category?: MerchCategory) {
  const sameCategoryProducts = merchProducts
    .filter((product) => product.slug !== currentSlug)
    .filter((product) => (category ? product.category === category : true))

  if (sameCategoryProducts.length >= 8) {
    return sameCategoryProducts.slice(0, 8)
  }

  const fallbackProducts = merchProducts.filter(
    (product) =>
      product.slug !== currentSlug &&
      !sameCategoryProducts.some((item) => item.slug === product.slug)
  )

  return [...sameCategoryProducts, ...fallbackProducts].slice(0, 8)
}