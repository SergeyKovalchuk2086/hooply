import type { Database } from '~/types/database.types'

const getAge = (birthDate: string) => {
  const today = new Date();
  const bd = new Date(birthDate!);
  return today.getFullYear() - bd.getFullYear() - 
    (today.getMonth() < bd.getMonth() || 
    (today.getMonth() === bd.getMonth() && today.getDate() < bd.getDate()) ? 1 : 0);
};

export const usePlayer = async (id: string) => {
  const supabase = useSupabaseClient<Database>();

  const { data } = await supabase
  .from('players')
  .select(`
    id,
    name,
    number,
    height,
    birthdate,
    player_stats_total (
      games_played,
      two_pt,
      three_pt,
      free_throw,
      fouls
    )
  `)
  .eq('id', id)
  .single()

  if (!data) {
    return ;
  }

  const {player_stats_total, ...rest} = data

  return {
    ...rest,
    playerTotalStats: player_stats_total[0],
    age: getAge(data.birthdate),
    birthdate: new Date(data.birthdate).toLocaleDateString('ru-RU')
  }
  

// const { data, error } = await supabase
//   .from('players')
//   .select(`
//     id,
//     name,
//     number,
//     age,
//     height,
//     birthdate,
//     game_players (
//       two_pt_made,
//       three_pt_made,
//       free_throw_made,
//       fouls,
//       games (
//         id,
//         date
//       )
//     )
//   `)
//   .eq('id', id)
//   .single();  
};
