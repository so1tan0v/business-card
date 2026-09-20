import type { NetworkPort } from '../../domain/ports';

export class FetchNetworkAdapter implements NetworkPort {
  async fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json() as Promise<unknown>;
  }
}
