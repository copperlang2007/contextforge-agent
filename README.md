# contextforge-agent (AgentForge)

**Niche Workflow Orchestrator with Built-in Self-Evolution Engine**

Production theBRIDGE component. Workflow DSL + Temporal durability + self-refactor via telemetry.

**IP/Moat**: Visual/code builder emits Temporal workflows. Runtime telemetry (cost/success/latency) → LLM refactor proposals → flywheel of cross-niche templates + benchmarks.

**Self-evolution**: Meta loop ingests own outcomes, proposes improvements, applies low-risk auto or human-gated.

**Stack**: Same as ContextForge (TS/Express/Drizzle/Temporal/React/Vite/CDK).

**Core pushed**: packages/backend/src/workflows/self-evolve.ts (durable workflow with evolveSignal + flywheel emission).

**Risks**: Unbounded loops (mitigate with GuardForge cost caps + circuit breakers). High-risk refactors require approval gate.

**Integration**: Consumes ContextForge temporal graph for context. Feeds GuardForge for budgeting.

**Deploy**: Same pattern. Temporal server + workflow workers on infra.

*theBRIDGE delivery. Approved 2026-07-02.*