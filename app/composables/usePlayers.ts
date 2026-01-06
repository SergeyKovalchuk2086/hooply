import type { Database } from '~/types/database.types'

type Player = Database['public']['Tables']['players']['Row']

export const usePlayers = async () => {
  const supabase = useSupabaseClient<Database>()

  const { data, error } = await supabase
    .from('players')
    .select('*')

  return {
    players: data as Player[] | null,
    error
  }
}