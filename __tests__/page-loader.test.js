import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import os from 'os';
import path from 'path';
import fs from 'fs';
import pageLoader from '../src';

const fsPromises = fs.promises;
axios.defaults.adapter = httpAdapter;

const host = 'https://hexlet.io';
const pathname = '/courses';
const pageUrl = `${host}${pathname}`;
const tmpDir = path.join(os.tmpdir(), 'hexlet-tmp-');
const status = 200;
const body = '<html></html>';

beforeEach(() => {
  nock(host).get(pathname).reply(status, body);
});


test('#save file', async () => {
  const dir = await fsPromises.mkdtemp(tmpDir);
  await pageLoader(pageUrl, dir);
  const filename = 'hexlet-io-courses.html';
  const result = await fsPromises.readFile(path.join(dir, filename), 'utf8');
  expect(result).toBe(body);
});
