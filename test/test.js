const importRegex = require('../index.js')();
const { describe, it } = require('mocha');
const assert = require('assert');

const TESTS = `
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import defaultExport, * as name from "module-name";
import "module-name";

const a = 1;
const b = 'foo';

import myDefault from '/modules/my-module.js'
import {
  reallyReallyLongModuleExportName as shortName,
  anotherLongModuleName as short
} from '/modules/my-module.js'`;

const matches = [...TESTS.matchAll(importRegex)];

describe('import-regex', () => {
  it('detect all import statements', () => {
    assert.equal(matches.length, 10);
  });
  it('default export', () => {
    const stmnt = matches[0];
    assert.equal(stmnt[1].trim(), 'defaultExport');
    assert.equal(stmnt[2], 'module-name');
  });
  it('named module object', () => {
    const stmnt = matches[1];
    assert.equal(stmnt[1].trim(), '* as name');
    assert.equal(stmnt[2], 'module-name');
  });
  it('single named export', () => {
    const stmnt = matches[2];
    assert.equal(stmnt[1].trim(), '{ export1 }');
    assert.equal(stmnt[2], 'module-name');
  });
  it('single named export with alias', () => {
    const stmnt = matches[3];
    assert.equal(stmnt[1].trim(), '{ export1 as alias1 }');
    assert.equal(stmnt[2], 'module-name');
  });
  it('multiple named export', () => {
    const stmnt = matches[4];
    assert.equal(stmnt[1].trim(), '{ export1 , export2 }');
    assert.equal(stmnt[2], 'module-name');
  });
  it('no imported values', () => {
    const stmnt = matches[7];
    assert.equal(stmnt[1], null);
    assert.equal(stmnt[2], 'module-name');
  });
  it('file module', () => {
    const stmnt = matches[8];
    assert.equal(stmnt[1].trim(), 'myDefault');
    assert.equal(stmnt[2], '/modules/my-module.js');
  });
  it('multiline export', () => {
    const stmnt = matches[9];
    assert.equal(stmnt[1].trim(), '{\n  reallyReallyLongModuleExportName as shortName,\n  anotherLongModuleName as short\n}');
    assert.equal(stmnt[2], '/modules/my-module.js');
  });
});
