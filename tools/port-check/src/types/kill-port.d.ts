declare module 'kill-port' {
  function killPort(port: number): Promise<void>;
  export = killPort;
}
