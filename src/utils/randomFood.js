// 按权重随机选择一个符合条件的食物，并避免和上一次相同。
export function pickRandomFood(items, lastFoodId = null) {
  if (!items?.length) {
    return null
  }

  const pool = lastFoodId
    ? items.filter((food) => food.id !== lastFoodId)
    : items

  if (!pool.length) {
    return null
  }

  const totalWeight = pool.reduce((sum, food) => sum + food.weight, 0)
  const randomValue = Math.random() * totalWeight

  let runningTotal = 0

  for (const food of pool) {
    runningTotal += food.weight
    if (randomValue <= runningTotal) {
      return food
    }
  }

  return pool[pool.length - 1]
}
