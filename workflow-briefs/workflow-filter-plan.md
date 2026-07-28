# Workflow Filter Plan

## Top-Level Overview

The goal is to replace the hardcoded, non-functional `FilterButton` components in `WorkflowsView.vue` with a working filter system that filters the workflow list by tool name. Filters match against the `tools_mentioned` array stored on each job in Supabase. Multiple filters can be active at once (OR logic — show any workflow that mentions at least one selected tool). When no filters are selected, all items are shown. When filters are active but no results match, a friendly empty-state message is shown.

Filtering is applied server-side via a Supabase query modifier so that pagination continues to work correctly with filtered results.

The "Other" filter button will be **removed** — it cannot be supported server-side without a schema change, and the decision was made to omit it rather than degrade the experience.

---

## Sub-Tasks

---

### Sub-Task 1 — Add filter state and filtered `fetchWorkflows` to the store

**Intent**  
The store is the single source of truth for data-fetching. Adding `activeFilters` state and plumbing it into `fetchWorkflows` keeps the filter logic centralised and ensures pagination always reflects the filtered total count.

**Expected Outcomes**
- `workflowsStore` exposes a `activeFilters: ref<string[]>([])` piece of state.
- `fetchWorkflows` applies a `.contains` or `.overlaps` Supabase filter on `tools_mentioned` when `activeFilters` is non-empty; otherwise fetches all rows as before.
- `activeFilters` is exported from the store so components can read and mutate it.

**Todo List**
1. Add `const activeFilters = ref<string[]>([])` to the store state.
2. Inside `fetchWorkflows`, after the `.eq("qualifies", true)` call, conditionally chain `.overlaps("tools_mentioned", activeFilters.value)` when `activeFilters.value.length > 0`. Supabase's `overlaps` operator checks if the array column shares any element with the provided array (OR semantics).
3. Include `activeFilters` in the store's return object.

**Relevant Context**
- Store: `src/stores/workflowsStore.ts`
- Supabase array operator: `.overlaps(column, value)` — equivalent to the Postgres `&&` operator.
- `fetchWorkflows` already accepts a `page` argument and uses `.range()` for pagination — the filter must be added before `.range()` so it applies to the count too.

**Status**: [x] done

---

### Sub-Task 2 — Update `FilterButton` to support active/inactive visual state

**Intent**  
The button currently has no concept of being "selected". Adding an `active` prop lets the parent toggle its visual state so the user can see which filters are applied.

**Expected Outcomes**
- `FilterButton` accepts an `active: Boolean` prop (default `false`).
- When `active` is `true`, the button renders with a filled green style (e.g. `bg-green-500 text-black`).
- When `active` is `false`, the button renders with the existing outline style.
- The button emits a `toggle` event (replacing or supplementing the existing `click` emit) carrying the `title` string as payload so the parent knows which filter was toggled.

**Todo List**
1. Add `active: { type: Boolean, default: false }` to `defineProps`.
2. Change the emit definition to `(e: 'toggle', title: string): void`.
3. Add a `@click` handler on `UButton` that emits `toggle` with `props.title`.
4. Bind dynamic classes on `UButton`: when `active` is `true` apply `bg-green-500 text-black ring-green-500`, otherwise keep the current outline+neutral styling.

**Relevant Context**
- Component: `src/components/FilterButton.vue`
- NuxtUI `UButton` supports dynamic `:class` binding alongside its built-in `variant` and `color` props.

**Status**: [x] done

---

### Sub-Task 3 — Wire filters in `WorkflowsView` and add empty-state message to `WorkflowList`

**Intent**  
`WorkflowsView` owns the filter UI. It needs to drive the store's `activeFilters` and trigger a fresh fetch (resetting to page 1) whenever the selection changes. `WorkflowList` needs to handle the case where the fetch succeeds but returns zero results.

**Expected Outcomes**
- Clicking a `FilterButton` toggles its tool name in/out of `store.activeFilters`.
- After toggling, `store.currentPage` is reset to `1` and `store.fetchWorkflows(1)` is called.
- Each `FilterButton` receives `:active="store.activeFilters.includes(title)"` so its visual state stays in sync.
- `WorkflowList` shows an empty-state message (e.g. "No workflows match the selected filters.") when `store.workflows` is empty and `store.loading` is false.

**Todo List**
1. In `WorkflowsView.vue`: import `useWorkflowsStore` and wire up a `toggleFilter(title: string)` function.
2. `toggleFilter` should add/remove the title from `store.activeFilters`, reset `store.currentPage` to `1`, and call `store.fetchWorkflows(1)`.
3. Pass `:active` and `@toggle` props to each `FilterButton`.
4. In `WorkflowList.vue`: inside the `v-else` block, add a `v-if` / `v-else` to show a `<p>` empty-state message when `store.workflows.length === 0`.
5. Hide the pagination row when `store.workflows.length === 0` (it would show `0-0 of 0`).

**Relevant Context**
- `WorkflowsView`: `src/components/WorkflowsView.vue`
- `WorkflowList`: `src/components/WorkflowList.vue`
- The list of tools used in filter buttons matches `PRIORITY_TOOLS` in `WorkflowCard.vue`: n8n, Zapier, Make, Lovable, GoHighLevel, Airtable, Slack, Notion — plus "Other".
- The "Other" `FilterButton` must be **removed** from the template — it cannot be supported with server-side filtering without a schema change.

**Status**: [x] done
