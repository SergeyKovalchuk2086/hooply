import type { Database } from '~/types/database.types'
import type { Player } from '~/types/player'


export const usePlayers = async () => {
  const supabase = useSupabaseClient<Database>()

  const { data, error } = await supabase
    .from('players')
    .select('*')

  return {
    players: data as Player[],
    error
  }
}