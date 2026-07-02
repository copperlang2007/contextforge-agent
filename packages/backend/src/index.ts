import express from 'express';
import { drizzle } from 'drizzle-orm/postgres-js';
import { workflowDecisions } from '../../../contextforge/packages/backend/src/db/schema'; // or shared import

const app = express();
app.use(express.json());
const db = drizzle(process.env.DATABASE_URL!);

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'agentforge' }));

// Trigger workflow (from UI or agent)
app.post('/api/workflows', async (req, res) => {
  // Parse DSL, start Temporal workflow
  // On complete: emit to flywheel via ContextForge /api/flywheel
  res.json({ workflowId: 'wf_' + Date.now(), status: 'started' });
});

// Self-evolve trigger (internal or scheduled)
app.post('/api/evolve/:workflowId', async (req, res) => {
  // Signal evolve, run llmRefactor, record to workflowDecisions
  res.json({ status: 'refactor_proposed' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`AgentForge on :${PORT}`));

// Risk: Temporal connection required in prod. Assumption: Calls ContextForge for context + flywheel.