import { createClient, createAccount } from 'genlayer-js';
import { bradbury } from 'genlayer-js/chains';

// Default to Bradbury Testnet
export const getGenLayerClient = (privateKey?: `0x${string}`) => {
  return createClient({
    chain: bradbury,
    account: privateKey ? createAccount(privateKey) : undefined,
  });
};

export const CONTRACT_ADDRESS = "0xYourTalentChainContractAddressHere";

/**
 * Example Contract Interaction Workflow:
 * 
 * const client = getGenLayerClient(myKey);
 * 
 * // Post a job
 * const hash = await client.writeContract({
 *   address: CONTRACT_ADDRESS,
 *   functionName: 'post_job',
 *   args: ['Fullstack Dev', 'Tech', '...', '...']
 * });
 * 
 * // Apply for a job
 * const hash = await client.writeContract({
 *   address: CONTRACT_ADDRESS,
 *   functionName: 'apply_for_job',
 *   args: [jobId, 'My long resume text...']
 * });
 * 
 * // Get jobs
 * const jobs = await client.readContract({
 *   address: CONTRACT_ADDRESS,
 *   functionName: 'get_jobs',
 *   args: []
 * });
 */
