import { weaveMockClient } from './client'

export const agentsApi = {
  // Get agents by category
  getAgentsByCategory: async ({
    categoryId,
    page = 1,
    pageSize = 12,
  }: {
    categoryId: number
    page?: number
    pageSize?: number
  }): Promise<{
    category_id: number
    agents: Array<{
      id: number
      name: string
      description: string
      state: string
      avatar_icon: string | null
      tags: string[]
    }>
    pagination: {
      current_page: number
      page_size: number
      total_records: number
      total_pages: number
    }
  }> => {
    const { data } = await weaveMockClient.get(
      `/card_creation/agent_dashboard/categories/${categoryId}/agents`,
      {
        params: {
          page,
          page_size: pageSize,
        },
      }
    )

    return data
  },
}