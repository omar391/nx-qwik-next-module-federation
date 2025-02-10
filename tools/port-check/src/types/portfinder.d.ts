declare module 'portfinder' {
  interface PortfinderOptions {
    port?: number;
    host?: string;
    startPort?: number;
    stopPort?: number;
  }

  interface Portfinder {
    getPort(options: PortfinderOptions, callback: (err: Error | null, port: number) => void): void;
    getPortPromise(options?: PortfinderOptions): Promise<number>;
  }

  const portfinder: Portfinder;
  export = portfinder;
}
