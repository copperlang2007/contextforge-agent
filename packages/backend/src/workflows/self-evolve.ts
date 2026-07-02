import { proxyActivities, defineSignal } from '@temporalio/workflow';
import { z } from 'zod';

const evolveSignal = defineSignal<[string]>('evolve');

export async function AgentWorkflow(input: { initial: any; dsl: string }) {
  const { execute } = proxyActivities({ startToCloseTimeout: '1m' });
  let state = await execute('runStep', { step: input.initial });

  // Self-evolution listener + flywheel
  while (true) {
    const cmd = await waitFor(evolveSignal);
    if (cmd === 'refactor') {
      const telemetry = await getTelemetry(); // from Postgres outcomes
      const proposal = await execute('llmRefactor', { telemetry, currentDsl: input.dsl });
      await recordOutcome(telemetry, proposal.metrics); // to flywheel
      // Apply if approved
    }
  }
}

// Risk: Unbounded loops → circuit breaker + cost cap from GuardForge
// Assumption: Temporal durability for long-running agent workflows
// Edge: Human-in-loop for high-risk refactors