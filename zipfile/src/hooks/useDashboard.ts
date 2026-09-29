import { dashboardApi } from '@/api/dashboard'
import { queryOptions } from '@tanstack/react-query'

export const getMarketplaceCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['marketplace-categories'],
    queryFn: async () => {
      return await dashboardApi.getMarketplaceCategories()
    },
    select: (res) => res?.marketplace_data || [],
  })
}