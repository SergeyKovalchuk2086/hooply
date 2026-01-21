import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    blackIds: string[]
    whiteIds: string[]
    homeTeam: string
    awayTeam: string
  }>(event)

  if (!body.blackIds?.length || !body.whiteIds?.length) {
    throw createError({ statusCode: 400, statusMessage: 'Teams are empty' })
  }

  const supabase = serverSupabaseServiceRole(event)

  const { data: gameId, error } = await supabase.rpc(
    'create_game_with_players',
    {
      p_black_players: body.blackIds,
      p_white_players: body.whiteIds,
      p_home_team: body.homeTeam,
      p_away_team: body.awayTeam,
    }
  )

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return { gameId }
})
