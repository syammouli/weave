import { agentsApi } from '@/api/agents'
import { queryOptions } from '@tanstack/react-query'

export const getAgentsByCategoryQueryOptions = ({
  categoryId,
  page = 1,
}: {
  categoryId: number
  page?: number
}) => {
  return queryOptions({
    queryKey: ['agents-list', categoryId, page],
    queryFn: async () => {
      return await agentsApi.getAgentsByCategory({
        categoryId,
        page,
      })
    },
    select: (res) => ({
      agents: res?.agents || [],
      pagination: res?.pagination,
    }),
  })
}