import { inject, InjectionToken } from '@angular/core';
import { Content, Editor, Extensions } from '@tiptap/core';
import { redoDepth, undoDepth } from 'prosemirror-history';
import { BehaviorSubject, shareReplay } from 'rxjs';

export interface CreateLuciusOptions {
  editable?: boolean;
  element?: HTMLElement;
  defaultExtensions?: boolean;
  extensions?: Extensions;
  scrollMargin?: number;
  scrollThreshold?: number;
}

const editorToLucius = (editor: Editor) => {
  function getState(
    editor: Editor,
    type: 'update' | 'selectionUpdate' | 'initial'
  ) {
    return {
      type,
      historyDepth: {
        undo: undoDepth(editor.state),
        redo: redoDepth(editor.state),
      },
      json: editor.getJSON(),
      marks: {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        code: editor.isActive('code'),
      },
    };
  }
  const content = new BehaviorSubject<ReturnType<typeof getState>>(
    getState(editor, 'initial')
  );

  const state$ = content.asObservable().pipe(shareReplay(1));

  editor.on('update', ({ editor }) => {
    content.next(getState(editor, 'update'));
  });
  editor.on('selectionUpdate', ({ editor }) => {
    content.next(getState(editor, 'selectionUpdate'));
  });

  return {
    select() {
      return state$;
    },
    attach(element: HTMLElement) {
      element.innerHTML = '';
      element.appendChild(editor.view.dom);
    },
    dispose() {
      editor.destroy();
    },
    updateContent(content: Content) {
      return editor
        .chain()
        .setContent(content)
        .setMeta('addToHistory', false)
        .run();
    },

    get editor() {
      return editor;
    },

    get chain() {
      return editor.chain();
    },

    ...editor.commands,
  };
};

export const initializeLucius = (option: CreateLuciusOptions) => {
  const editor = new Editor({
    element: option.element,
    editable: option.editable,
    extensions: [...(option.extensions || [])],
    editorProps: {
      scrollMargin: option.scrollMargin ?? 240,
      scrollThreshold: option.scrollThreshold ?? 240,
    },
  });

  return editorToLucius(editor);
};

export type Lucius = ReturnType<typeof editorToLucius>;

const LuciusToken = new InjectionToken<Lucius>('Lucius');

export const provideLucius = (editor: Editor) => {
  return {
    provider: LuciusToken,
    useValue: editorToLucius(editor),
  };
};

export const injectLucius = () => {
  return inject(LuciusToken);
};
