import { categories, places, restaurants } from '../data/restaurants'

const confidenceWeight = {
  confirmed: 4,
  userProvided: 3,
  candidate: 2,
}

function weightedRandom(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0)
  const random = Math.random() * total

  let running = 0

  for (const item of items) {
    running += item.weight
    if (random <= running) {
      return item
    }
  }

  return items[items.length - 1]
}

export function pickPlace({ selectedPlace = null, selectedCategory = 'all' } = {}) {
  const pool = places.filter((place) => {
    if (selectedPlace) {
      return place.id === selectedPlace
    }

    return true
  })

  const options = pool.map((place) => ({
    ...place,
    weight: place.weight * (selectedCategory !== 'all' ? 1.1 : 1),
  }))

  return weightedRandom(options)
}

export function pickCategory({ selectedCategory = 'all', selectedPlace = null } = {}) {
  const pool = categories.filter((category) => {
    if (selectedCategory !== 'all') {
      return category.id === selectedCategory
    }
    return true
  })

  let options = pool.map((category) => ({ ...category }))

  if (selectedPlace === 'hanlin') {
    options = options.map((category) => ({
      ...category,
      weight: category.id === 'chinese' ? 4 : category.id === 'japanese' ? 3 : category.weight,
    }))
  }

  return weightedRandom(options)
}

export function pickRestaurant({ placeId, categoryId, lastRestaurantId = null }) {
  const filtered = restaurants.filter((restaurant) => {
    const matchesPlace = restaurant.placeId === placeId
    const matchesCategory = restaurant.categoryId === categoryId

    return matchesPlace && matchesCategory && restaurant.id !== lastRestaurantId
  })

  if (!filtered.length) {
    return null
  }

  const options = filtered.map((restaurant) => {
    let weight = 3

    if (restaurant.isUserFavorite) {
      weight += 4
    }

    weight += confidenceWeight[restaurant.confidence] || 1

    if (placeId === 'hanlin' && restaurant.placeId === 'hanlin') {
      weight += 1
    }

    if (categoryId === 'japanese' && restaurant.name === 'TunaMaki') {
      weight += 3
    }

    if (categoryId === 'hotpot' && restaurant.name === '左庭右院') {
      weight += 4
    }

    return { ...restaurant, weight }
  })

  return weightedRandom(options)
}

export function getRestaurantHint({ placeId, categoryId }) {
  const matched = restaurants.filter(
    (restaurant) => restaurant.placeId === placeId && restaurant.categoryId === categoryId,
  )

  if (matched.length) {
    return null
  }

  return '这个组合暂时没有具体店铺，可以先按方向去选。'
}
