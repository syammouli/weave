type Tool = {
    name: string;
    className: string;
    imageIconSrc: string;
};

export type AgentData = {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    industries: string[];
    agents: { title: string, points: string[] }[];
    businessWins: any[];
    tools: Tool[];
    architectureImage: string[];
    videoUrl: string[];
    state: "Active" | "Inactive";
    avatarIcon: string | null;
};