import type { ExecutorContext } from '@nx/devkit';
import { createServer } from 'node:net';

export interface PortCheckExecutorOptions {
  port: number;
}

function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();
    server.once('error', () => {
      server.close();
      resolve(true); // Port is in use
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free
    });
    
    server.listen(port);
  });
}

export async function executor(
  options: PortCheckExecutorOptions,
  context: ExecutorContext
) {
  try {
    const inUse = await checkPort(options.port);
    if (inUse) {
      console.warn(`Port ${options.port} is in use, killing process...`);
      await require('kill-port')(options.port);
      console.log(`Process on port ${options.port} killed successfully.`);
    }
    return { success: true };
  } catch (error) {
    console.error('Error in port-check executor:', error);
    return { success: false };
  }
}

export default executor;
