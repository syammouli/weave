import type { AgentData } from '@/types/agent'
import { weaveMockClient } from './client'

export const overviewApi = {
    getAllAgents: async (): Promise<{ agents: Array<{ id: number, config: AgentData }> }> => {
        // TODO: remove this once the real API is ready
        const { data } = await weaveMockClient.get<{ agents: Array<{ id: number, config: AgentData }> }>('/card_creation/agent_dashboard/all_agents_info')
        return data
    },
}