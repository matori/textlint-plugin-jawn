'use strict';
import { parse } from 'jawn-to-ast';
import type { TextlintPluginProcessor, TextlintPluginOptions } from '@textlint/types';
import { TxtNode } from '@textlint/ast-node-types';

export class JAWNProcessor implements TextlintPluginProcessor {
  config: TextlintPluginOptions;

  constructor(config = {}) {
    this.config = config;
  }

  availableExtensions() {
    return ['.jawn', '.jwn'].concat(this.config.extensions || []);
  }

  processor(_ext: string) {
    return {
      preProcess(text: string, _filePath?: string): TxtNode {
        return parse(text);
      },
      postProcess(messages: Array<any>, filePath?: string): { messages: Array<any>; filePath: string } {
        return {
          messages,
          filePath: filePath ? filePath : '<jawn>',
        };
      },
    };
  }
}
