export const useCreateGame = () => {
  const createGame = async (payload: {
    blackIds: string[]
    whiteIds: string[]
    homeTeam: string
    awayTeam: string
  }) => {
    return await $fetch<{ gameId: string }>('/api/games/create', {
      method: 'POST',
      body: payload,
    })
  }

  return { createGame }
}
