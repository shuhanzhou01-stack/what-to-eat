const doodleModules = import.meta.glob('../assets/doodles/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const doodleUrls = Object.values(doodleModules)
