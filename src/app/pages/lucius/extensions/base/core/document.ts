import { Node } from '@tiptap/core';

export interface DocumentOptions {
  content?: string;
}

export const Document = Node.create<DocumentOptions>({
  name: 'document',
  topNode: true,
  content: 'block+',
});
