import { overviewApi } from "@/api/overview"
import { queryOptions } from "@tanstack/react-query"


export const getAgentListQueryOptions = ({ id }: { id: string }) => {
    return queryOptions({
        queryFn: async () => {
            return await overviewApi.getAllAgents()
        },
        queryKey: ['agent-list', id],
        select: (e) => {
            const agents = (e?.agents || []);
            return agents?.find((a) => a?.id === +id)?.config
        }
    })
}