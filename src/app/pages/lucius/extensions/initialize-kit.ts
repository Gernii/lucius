import { Extension } from '@tiptap/core';
import { Paragraph } from './base/core/paragraph';
import { Document } from './base/core/document';
import { Text } from './base/core/text';
import { Color } from './base/marks/color';
import { TextStyle } from './base/marks/text-style';

export interface InitializeKitOptions {
  default: {
    textColor: string;
  };
}

export const InitializeKit = Extension.create({
  name: 'initialize-kit',
  addExtensions() {
    return [
      // Node
      // Core
      Document,
      Paragraph,
      Text,

      // Marks
      Color,
      TextStyle,
    ];
  },
});
