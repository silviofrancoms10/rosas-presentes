import { useDB } from '~/server/utils/cloudflare'

export default defineEventHandler(async (event) => {
  try {
    const db = useDB(event)
    const { results } = await db.prepare('SELECT * FROM categories ORDER BY id ASC').all()
    return results || []
  } catch (e) {
    // Retorna as categorias estáticas como fallback caso a tabela não tenha sido criada/configurada ainda
    return [
      { id: 'todos', name: 'Todos', image: '/images/categorias/categoria-todos.jpg' },
      { id: 'destaques', name: 'Destaques', image: '/images/categorias/categoria-todos.jpg' },
      { id: 'buques', name: 'Buquês', image: '/images/categorias/categoria-buques.jpg' },
      { id: 'cestas', name: 'Cestas', image: '/images/categorias/categoria-cestas.jpg' },
      { id: 'presentes', name: 'Presentes', image: '/images/categorias/categoria-presentes.jpg' }
    ]
  }
})

