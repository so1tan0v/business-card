export class CommandHistory {
  private readonly items: string[] = [];
  private position = 0;

  push(command: string): void {
    if (!this.items.includes(command)) {
      this.items.push(command);
    }
    this.position = this.items.length;
  }

  up(): string | null {
    if (!this.items.length) {
      return null;
    }

    this.position = Math.max(0, this.position - 1);
    return this.items[this.position] ?? '';
  }

  down(): string | null {
    if (!this.items.length) {
      return null;
    }

    this.position = Math.min(this.items.length, this.position + 1);
    if (this.position === this.items.length) {
      return '';
    }

    return this.items[this.position] ?? '';
  }
}
