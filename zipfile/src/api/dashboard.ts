import { weaveMockClient } from './client'

export const dashboardApi = {
  // Get all marketplace categories (Suites)
  getMarketplaceCategories: async (): Promise<{
    marketplace_data: Array<{
      category_id: number
      category_name: string
      description: string
      agent_count: number
    }>
  }> => {
    const { data } = await weaveMockClient.get(
      '/card_creation/agent_dashboard/marketplace'
    )
    return data
  },
}