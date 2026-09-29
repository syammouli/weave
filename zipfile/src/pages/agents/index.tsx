import Card from "@mui/material/Card";
import { useState, useMemo, useEffect, type UIEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import searchWeave from "@/assets/search_agent.svg";
import leftArrow from "@/assets/left-arrow.svg";
import rightArrow from "@/assets/right-arrow.svg";
import { AiChatIcon } from "@/components/icons/AiChatIcon";
import { PageShell } from "@/components/ui/page-shell";
// import { BackButton } from "@/components/ui/back-button";
import closeIcon from "@/assets/down.svg";
import resetIcon from "@/assets/undo.svg";
import arrowIcon from "@/assets/Vector.svg";
import { useQuery } from "@tanstack/react-query";
import { getAgentsByCategoryQueryOptions } from "@/hooks/useAgents";

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface FilterSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
  onToggleAllCategories: () => void;
  onClose: () => void;
}

function FilterSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
  onToggleAllCategories,
  onClose,
}: FilterSidebarProps) {
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);
  const [integrationsOpen, setIntegrationsOpen] = useState(true);
  const [agentTypesOpen, setAgentTypesOpen] = useState(true);
  const [readyToDeploy, setReadyToDeploy] = useState(true);
  const [underCustomization, setUnderCustomization] = useState(false);

  const allTagChips = [
    "Safety", "Tracking", "Quality Inspection", "Video Analytics", "ADAS",
    "Image Classification", "Image Processing", "Face Recognition",
    "Compliance Monitoring", "Anomaly Detection", "Predictive Maintenance",
    "Sensor Analytics", "Asset Monitoring", "Access Control",
    "Damage Assessment", "Sensor Fusion", "Industrial Analytics",
    "Material Classification",
  ];

  const [selectedTagChips, setSelectedTagChips] = useState<string[]>([
    "Safety", "Tracking", "Quality Inspection", "Video Analytics", "ADAS",
  ]);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  const integrationOptions = ["LangGraph", "LangChain", "CrewAI", "Autogen", "OpenAI"];
  const agentTypeOptions = ["N8N", "Azure AI Foundry", "Bedrock", "Gemini AI", "Weave Agents Canvas"];
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);
  const [selectedAgentTypes, setSelectedAgentTypes] = useState<string[]>([]);

  const toggleTagChip = (tag: string) => {
    setSelectedTagChips((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  const visibleTagChips = allTagChips.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const toggleIntegration = (option: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const toggleAgentType = (option: string) => {
    setSelectedAgentTypes((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };
  

  return (
    <div className="filter-sidebar h-full overflow-hidden">
      {/* Header */}
      <div className="filter-sidebar__header shrink-0">
        <span className="filter-sidebar__title">
          <img src="/images/overview/icons/Filters_lines.svg" alt="filters" className="h-[14px] w-[14px]" />
          <span className="font-['Inter'] ml-[12px] text-[15px] font-semibold leading-[150%] text-[#505149]">Filters</span>
        </span>
        <button className="filter-sidebar__close" type="button" onClick={onClose}>
          <img src={resetIcon} alt="close filters" className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 w-full overflow-y-auto scroll-hidden">

        {/* Categories */}
        <div className="filter-sidebar__section filter-sidebar__filter-children">
          <button
            type="button"
            className="filter-sidebar__section-title"
            onClick={() => setCategoriesOpen((o) => !o)}
          >
            <span className="font-['Inter'] text-[14px] font-bold leading-[150%] text-black">Categories</span>
            <span className="filter-sidebar__chevron">
              <img
                src={closeIcon}
                alt="toggle"
                className={`w-4 h-4 transition-transform duration-300 ${categoriesOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
          </button>

          {categoriesOpen && (
            <div className="filter-sidebar__list">
              {/* Select All */}
              <label className="filter-sidebar__item">
                <input
                  type="checkbox"
                  checked={categories.length > 0 && selectedCategories.length === categories.length}
                  onChange={onToggleAllCategories}
                  className="filter-sidebar__checkbox"
                />
                <span
                  className={`filter-sidebar__label ${
                    categories.length > 0 && selectedCategories.length === categories.length
                      ? "filter-sidebar__label--checked"
                      : ""
                  }`}
                >
                  Select All
                </span>
              </label>

              {/* Per-category checkboxes — derived from current category's agents via tags */}
              {categories.map((cat) => (
                <label key={cat} className="filter-sidebar__item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => onToggleCategory(cat)}
                    className="filter-sidebar__checkbox"
                  />
                  <span
                    className={`filter-sidebar__label ${
                      selectedCategories.includes(cat) ? "filter-sidebar__label--checked" : ""
                    }`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="filter-sidebar__section filter-sidebar__section--border">
          <button
            type="button"
            className="filter-sidebar__section-title"
            onClick={() => setTagsOpen((o) => !o)}
          >
            <span className="font-['Inter'] text-[14px] font-bold leading-[150%] text-black">Tags</span>
            <span className="filter-sidebar__chevron">
              <img
                src={closeIcon}
                alt="toggle"
                className={`w-4 h-4 transition-transform duration-300 ${tagsOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
          </button>
          {tagsOpen && (
            <div className="flex w-full flex-col gap-3 pb-4">
              <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-black/10 bg-white p-[10px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                <img
                  src={searchWeave}
                  alt="search tags"
                  className="h-5 w-5 [filter:brightness(0)_saturate(100%)] opacity-[0.6]"
                />
                <input
                  type="text"
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  placeholder="Search tags..."
                  className="w-full bg-transparent text-[14px] text-[#676767] outline-none placeholder:text-[#676767]"
                />
              </div>
              <div className="flex flex-wrap gap-[9px]">
                {visibleTagChips.map((tag) => {
                  const isSelected = selectedTagChips.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTagChip(tag)}
                      className={`h-[25px] cursor-pointer rounded-[6px] border px-2 text-[12.5px] font-[600] leading-[15px] tracking-[0.3px] ${
                        isSelected
                          ? "border-black bg-[rgba(249,249,249,0.7)] text-black"
                          : "border-transparent bg-[rgba(60,70,89,0.1)] text-[rgba(0,0,0,0.7)] hover:bg-[rgba(60,70,89,0.16)]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Agent Status */}
        <div className="filter-sidebar__section filter-sidebar__section--border">
          <button
            type="button"
            className="filter-sidebar__section-title"
            onClick={() => setStatusOpen((o) => !o)}
          >
            <span className="font-['Inter'] text-[14px] font-bold leading-[150%] text-black">Agent Status</span>
            <span className="filter-sidebar__chevron">
              <img
                src={closeIcon}
                alt="toggle"
                className={`w-4 h-4 transition-transform duration-300 ${statusOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
          </button>
          {statusOpen && (
            <div className="filter-sidebar__list pt-1">
              <label className="filter-sidebar__item filter-sidebar__item--status">
                <input
                  type="checkbox"
                  checked={readyToDeploy}
                  onChange={() => setReadyToDeploy((prev) => !prev)}
                  className="filter-sidebar__checkbox"
                />
                <span className="filter-sidebar__status-dot filter-sidebar__status-dot--green" />
                <span className="filter-sidebar__label filter-sidebar__label--status">Ready to Deploy</span>
              </label>
              <label className="filter-sidebar__item filter-sidebar__item--status">
                <input
                  type="checkbox"
                  checked={underCustomization}
                  onChange={() => setUnderCustomization((prev) => !prev)}
                  className="filter-sidebar__checkbox"
                />
                <span className="filter-sidebar__status-dot filter-sidebar__status-dot--orange" />
                <span className="filter-sidebar__label filter-sidebar__label--status">Under Customisation</span>
              </label>
            </div>
          )}
        </div>

        {/* Agent Integrations */}
        <div className="filter-sidebar__section filter-sidebar__section--border">
          <button
            type="button"
            className="filter-sidebar__section-title"
            onClick={() => setIntegrationsOpen((o) => !o)}
          >
            <span className="font-['Inter'] text-[14px] font-bold leading-[150%] text-black">Agent Integrations</span>
            <span className="filter-sidebar__chevron">
              <img
                src={closeIcon}
                alt="toggle"
                className={`w-4 h-4 transition-transform duration-300 ${integrationsOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
          </button>
          {integrationsOpen && (
            <div className="filter-sidebar__list pt-1">
              {integrationOptions.map((option) => (
                <label key={option} className="filter-sidebar__item">
                  <input
                    type="checkbox"
                    checked={selectedIntegrations.includes(option)}
                    onChange={() => toggleIntegration(option)}
                    className="filter-sidebar__checkbox"
                  />
                  <span
                    className={`filter-sidebar__label ${
                      selectedIntegrations.includes(option) ? "filter-sidebar__label--checked" : ""
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Agent Types */}
        <div className="filter-sidebar__section filter-sidebar__section--border">
          <button
            type="button"
            className="filter-sidebar__section-title"
            onClick={() => setAgentTypesOpen((o) => !o)}
          >
            <span className="font-['Inter'] text-[14px] font-bold leading-[150%] text-black">Agent Types</span>
            <span className="filter-sidebar__chevron">
              <img
                src={closeIcon}
                alt="toggle"
                className={`w-4 h-4 transition-transform duration-300 ${agentTypesOpen ? "rotate-180" : "rotate-0"}`}
              />
            </span>
          </button>
          {agentTypesOpen && (
            <div className="filter-sidebar__list pt-1">
              {agentTypeOptions.map((option) => (
                <label key={option} className="filter-sidebar__item">
                  <input
                    type="checkbox"
                    checked={selectedAgentTypes.includes(option)}
                    onChange={() => toggleAgentType(option)}
                    className="filter-sidebar__checkbox"
                  />
                  <span
                    className={`filter-sidebar__label ${
                      selectedAgentTypes.includes(option) ? "filter-sidebar__label--checked" : ""
                    }`}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const { categoryId } = useParams();
  const selectedCategoryId = Number(categoryId);
  const navigate = useNavigate();

  const [selectedFilterCats, setSelectedFilterCats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filtersOpen = true;
  const [isCardsScrollAtTop, setIsCardsScrollAtTop] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
const categoryMap = {
  1: "Enterprise AI",
  2: "Industrial AI",
  3: "Data Engineering",
  4: "Productivity"
};
  // ✅ Fetch agents for this category from API
  const { data, isLoading } = useQuery(
    getAgentsByCategoryQueryOptions({
      categoryId: selectedCategoryId,
      page: currentPage,
    })
  );

  const agentsList = data?.agents || [];
  const totalPages = data?.pagination?.total_pages || 1;

  // Reset filters & page when category changes
  useEffect(() => {
    setSelectedFilterCats([]);
    setCurrentPage(1);
  }, [selectedCategoryId]);

  // ✅ Derive categories from current category's agents' tags only (no static fallback needed)
  const FILTER_CATEGORIES = useMemo(() =>
    Array.from(
      new Set(agentsList.flatMap((agent) => agent.tags || []))
    ),
    [agentsList]
  );

  const toggleFilterCategory = (cat: string) => {
    setSelectedFilterCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleAllCategories = () => {
    setSelectedFilterCats((prev) =>
      prev.length === FILTER_CATEGORIES.length ? [] : [...FILTER_CATEGORIES]
    );
  };

  // ✅ Filter uses agent.tags (matches API shape) — not agent.industries
  const filteredAgents = useMemo(() => {
    return agentsList.filter((agent) => {
      const name = (agent.name ?? "").toLowerCase();
      const desc = (agent.description ?? "").toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        name.includes(searchQuery.toLowerCase()) ||
        desc.includes(searchQuery.toLowerCase());

      const matchesSidebarCat =
        selectedFilterCats.length === 0 ||
        (agent.tags ?? []).some((tag: string) =>
          selectedFilterCats.some((selected) =>
            tag.toLowerCase().includes(selected.toLowerCase())
          )
        );

      return matchesSearch && matchesSidebarCat;
    });
  }, [agentsList, searchQuery, selectedFilterCats]);
  const ITEMS_PER_PAGE = 9;
  const paginatedAgents = filteredAgents;

  const handleCardsScroll = (event: UIEvent<HTMLDivElement>) => {
    setIsCardsScrollAtTop(event.currentTarget.scrollTop <= 0);
  };

  return (
    <PageShell>
      <div className="h-[calc(100vh-96px)] overflow-hidden">
        <div className="mx-auto flex h-full w-full flex-col">

          {/* Back + Title */}
          <div className="relative mb-4 shrink-0">
            {/* Back button — kept for future use
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <BackButton onClick={() => navigate(-1)} />
            </div>
            */}
            <div className="agents-page-header flex items-center justify-center gap-5">
              <img src="/images/overview/icons/connect.svg" alt="connect" className="h-[50px] w-[50px] object-contain" />
             <h1 className="text-2xl font-[AvgarDD] sm:text-[34px] font-semibold leading-normal text-black tracking-wide">
  {categoryMap[selectedCategoryId] || "Agents"} Agents
</h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="agents-page-subtitle-wrap mb-6 shrink-0 text-center">
            <p className="text-[#000000E6] text-center text-[14px] font-normal leading-[180%] [font-feature-settings:'liga'_off,'clig'_off]">
              No code Agent Platforms : Empowering Users to Create Intelligent Workflows with Ease and Efficiency
            </p>
          </div>

          {/* Main grid: sidebar + content */}
          <div className="flex min-h-0 flex-1 flex-col gap-4 rounded-lg md:grid md:grid-cols-[clamp(205px,20vw,224px)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_auto] md:gap-x-[26px] md:gap-y-4 md:pb-4">

            {/* ── SIDEBAR ── */}
            <div className="w-full md:col-[1/2] md:row-[1/2] md:h-full md:w-auto md:min-w-0 md:max-w-none">
              {filtersOpen && (
                <div className="md:sticky md:top-0 md:h-full">
                  <FilterSidebar
                    categories={FILTER_CATEGORIES}
                    selectedCategories={selectedFilterCats}
                    onToggleCategory={toggleFilterCategory}
                    onToggleAllCategories={toggleAllCategories}
                    onClose={() => setSelectedFilterCats([])}
                  />
                </div>
              )}
            </div>

            {/* ── RIGHT SECTION ── */}
            <div className="min-w-0 flex-1 md:col-[2/3] md:row-[1/2] md:flex md:h-full md:flex-col">

              {/* ===== SEARCH ===== */}
              <div className="flex w-full shrink-0 flex-col gap-2 md:sticky md:top-0 md:z-10 md:bg-transparent">

                {/* Search Bar — full width */}
                <div className="flex h-10 w-full items-center overflow-hidden rounded-[10px] border border-[rgba(18,18,18,0.12)] bg-[rgba(255,255,255,0.6)] backdrop-blur-[4px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[linear-gradient(52.71deg,#464935_19.059%,#555555_120.89%)] p-2.5">
                    <img
                      src={searchWeave}
                      alt="Search"
                      className="h-4 w-4 object-contain brightness-[3]"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search agents, categories , tags ...."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full min-w-0 appearance-none bg-transparent px-3.5 py-2 text-[12px] font-normal text-[#111827] outline-none ring-0 placeholder:text-[13px] placeholder:text-[#949494] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                  />
                </div>

                {/* Results + Pagination row */}
                <div className="flex items-center justify-between">
                  {/* Left: Showing X of Y Agents */}
                  <div className="flex items-center gap-1.5 mb-0">
                    <AiChatIcon width={20} height={17} className="mr-0" />
                    <span className="text-[13px] font-bold text-[#111827]">Showing</span>
                    <span className="text-[13px] font-bold text-[#111827]">
                      {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredAgents.length)}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredAgents.length)}
                    </span>
                    <span className="text-[13px] text-[#6B7280]">of</span>
                    <span className="text-[13px] font-bold text-[#6B7280]">{filteredAgents.length}</span>
                    <span className="text-[13px] text-[#6B7280]">Agents</span>
                  </div>

                  {/* Right: Page X of Y + arrows */}
                  {filteredAgents.length > ITEMS_PER_PAGE && (
                    <div className="flex items-center gap-3">
                      <p className="text-[13px] leading-[1.233] text-[#111827] whitespace-nowrap">
                        <span className="font-bold">Page {currentPage}</span>
                        <span className="font-medium text-[#6B7280]"> of {totalPages}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                          disabled={currentPage === 1}
                          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.08)] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <img src={leftArrow} alt="Previous page" className="h-[11px] w-[8px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[8px] bg-[rgba(0,0,0,0.08)] disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <img src={rightArrow} alt="Next page" className="h-[11px] w-[8px]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Agent Grid */}
              <div
                className={`${isCardsScrollAtTop ? "mt-3" : "mt-0"} flex-1 md:min-h-0 md:overflow-y-auto md:pr-1 md:pb-3 scroll-hidden`}
                onScroll={handleCardsScroll}
              >
                {isLoading ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-sm">Loading agents...</p>
                  </div>
                ) : filteredAgents.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-sm">
                      No agents found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="agents-grid">
                    {paginatedAgents.map((agent) => (
                      <Card
                        key={agent.id}
                        className="suite-card"
                        variant="outlined"
                        sx={{
                          background: "rgba(255, 255, 255, 0.34)",
                          border: "1px solid #FFF",
                        }}
                      >
                        <Card
                          className="agent-card"
                          variant="outlined"
                          onClick={() => navigate(`/dashboard/${selectedCategoryId}/agents/${agent.id}/overview`)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              navigate(`/dashboard/${selectedCategoryId}/agents/${agent.id}/overview`);
                            }
                          }}
                        >
                          <div className="agent-inner">
                            <div className="agent-content">

                              {/* HEADER */}
                              <div className="agent-header">
                                <div className="agent-title-row">
                                  <div className="agent-avatar">
                                    <AiChatIcon width={24} height={21} className="mr-0" />
                                  </div>
                                  <span className="status-dot active agent-inline-status" />
                                  <h3 className="agent-title">
                                    {agent?.name ?? agent?.title}
                                  </h3>
                                </div>
                              </div>

                              {/* DESCRIPTION */}
                              <p className="agent-desc">{agent.description}</p>

                              <div className="agent-footer">
                                {/* TAGS — uses agent.tags from API */}
                                <div className="agent-tags">
                                  {(agent.tags ?? []).map((tag: string, index: number) => (
                                    <span
                                      key={tag}
                                      className={`tag ${index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "pink"}`}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="linked-icon-wrap">
                                  <img src={arrowIcon} alt="arrow-up" className="h-3 w-3" />
                                </div>
                              </div>

                            </div>
                          </div>
                        </Card>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageShell>
  );
}