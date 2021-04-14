'use strict';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import { TextlintKernel, TextlintPluginOptions } from '@textlint/kernel';
import JAWNPlugin from '../src/index';

const lintFile = (filePath: string, options: boolean | TextlintPluginOptions | undefined = true) => {
  const kernel = new TextlintKernel();
  const text = fs.readFileSync(filePath, 'utf-8');
  return kernel.lintText(text, {
    filePath,
    ext: '.jwn',
    plugins: [
      {
        pluginId: 'jawn',
        plugin: JAWNPlugin,
        options,
      },
    ],
    rules: [
      {
        ruleId: 'no-todo',
        rule: require('textlint-rule-no-todo').default,
      },
    ],
  });
};

const lintJAWN = (text: string, options: boolean | TextlintPluginOptions | undefined = true) => {
  const kernel = new TextlintKernel();
  return kernel.lintText(text, {
    ext: '.jwn',
    plugins: [
      {
        pluginId: 'jawn',
        plugin: JAWNPlugin,
        options,
      },
    ],
    rules: [
      {
        ruleId: 'no-todo',
        rule: require('textlint-rule-no-todo').default,
      },
    ],
  });
};

describe('JAWNProcessor', function() {
  context('ファイルがJAWN-FSのとき', function() {
    it('should report error', function() {
      const fixturePath = path.join(__dirname, 'fixtures/test.jwn');
      return lintFile(fixturePath).then((results) => {
        assert(results.messages.length > 0);
        assert(results.filePath === fixturePath);
      });
    });
  });
  context('.txtファイルを指定するとき', function() {
    it('should report error', function() {
      const fixturePath = path.join(__dirname, 'fixtures/test.txt');
      return lintFile(fixturePath, {
        extensions: ['.txt'],
      }).then((results) => {
        assert(results.messages.length > 0);
        assert(results.filePath === fixturePath);
      });
    });
  });
  context('文字列を指定するとき', function() {
    it('should report error', function() {
      return lintJAWN('《《｜やるべきこと《TODO: TODO TEXT》》》').then((results) => {
        assert(results.messages.length === 1);
        assert(results.filePath === '<jawn>');
      });
    });
  });
});
